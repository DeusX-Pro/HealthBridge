<?php

namespace App\Http\Controllers;

use App\Http\Requests\Medications\StoreMedicationRequest;
use App\Models\DoseLog;
use App\Models\Medication;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MedicationsController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $today = Carbon::today()->toDateString();

        $activeMedications = Medication::where('user_id', $user->id)
            ->where(function ($q) use ($today) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', $today);
            })
            ->orderBy('name')
            ->get();

        $pastMedications = Medication::where('user_id', $user->id)
            ->whereNotNull('end_date')
            ->where('end_date', '<', $today)
            ->orderByDesc('end_date')
            ->get();

        // Build today's schedule (Batch pre-fetched to eliminate N+1)
        $doseLogs = DoseLog::whereIn('medication_id', $activeMedications->pluck('id'))
            ->whereDate('scheduled_at', $today)
            ->get()
            ->keyBy(fn($l) => $l->medication_id . '_' . Carbon::parse($l->scheduled_at)->format('H:i'));

        $schedule = [];
        foreach ($activeMedications as $med) {
            foreach ($med->dose_times ?? [] as $time) {
                $timeKey = Carbon::parse($time)->format('H:i');
                $log = $doseLogs->get("{$med->id}_{$timeKey}");

                $schedule[] = [
                    'medication' => $med,
                    'time' => $time,
                    'status' => $log ? $log->status : 'PENDING',
                    'log_id' => $log ? $log->id : null,
                ];
            }
        }
        usort($schedule, fn($a, $b) => strcmp($a['time'], $b['time']));

        return view('medications.index', compact('activeMedications', 'pastMedications', 'schedule'));
    }

    public function create()
    {
        return view('medications.create');
    }

    public function store(StoreMedicationRequest $request)
    {
        $validated = $request->validated();

        Medication::create([
            'user_id' => auth()->id(),
            'source' => 'SELF',
            'name' => $validated['name'],
            'dose' => $validated['dose'],
            'instructions' => $validated['instructions'] ?? '',
            'dose_times' => $validated['dose_times'],
            'timezone' => auth()->user()->notificationPreference?->timezone ?? 'UTC',
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'] ?? null,
        ]);

        return redirect()->route('medications.index')->with('success', 'Medication added to your schedule.');
    }

    public function show(string $id)
    {
        $medication = Medication::where('user_id', auth()->id())->findOrFail($id);
        $recentDoses = DoseLog::where('medication_id', $medication->id)
            ->latest('scheduled_at')
            ->take(30)
            ->get();

        return view('medications.show', compact('medication', 'recentDoses'));
    }

    public function edit(string $id)
    {
        $medication = Medication::where('user_id', auth()->id())->findOrFail($id);
        return view('medications.edit', compact('medication'));
    }

    public function update(StoreMedicationRequest $request, string $id)
    {
        $medication = Medication::where('user_id', auth()->id())->findOrFail($id);
        $validated = $request->validated();

        $medication->update([
            'name' => $validated['name'],
            'dose' => $validated['dose'],
            'instructions' => $validated['instructions'] ?? '',
            'dose_times' => $validated['dose_times'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'] ?? null,
        ]);

        return redirect()->route('medications.show', $medication->id)->with('success', 'Medication updated.');
    }

    public function destroy(string $id)
    {
        $medication = Medication::where('user_id', auth()->id())->findOrFail($id);
        $medication->delete();

        return redirect()->route('medications.index')->with('success', 'Medication removed.');
    }

    public function logDose(Request $request, string $id)
    {
        $medication = Medication::where('user_id', auth()->id())->findOrFail($id);

        $request->validate([
            'time' => ['required', 'string'],
            'status' => ['required', 'in:TAKEN,SKIPPED'],
        ]);

        $today = Carbon::today()->toDateString();
        $time = $request->input('time');
        $scheduledAt = Carbon::parse("{$today} {$time}")->toDateTimeString();

        DoseLog::updateOrCreate(
            [
                'medication_id' => $medication->id,
                'user_id' => auth()->id(),
                'scheduled_at' => $scheduledAt,
            ],
            [
                'status' => $request->input('status'),
            ]
        );

        return back()->with('success', 'Dose recorded.');
    }

    public function undoDose(Request $request, string $id)
    {
        $medication = Medication::where('user_id', auth()->id())->findOrFail($id);

        $request->validate([
            'time' => ['required', 'string'],
        ]);

        $today = Carbon::today()->toDateString();
        $time = $request->input('time');
        $scheduledAt = Carbon::parse("{$today} {$time}")->toDateTimeString();

        DoseLog::where('medication_id', $medication->id)
            ->where('scheduled_at', $scheduledAt)
            ->delete();

        return back()->with('info', 'Dose status reset.');
    }
}

