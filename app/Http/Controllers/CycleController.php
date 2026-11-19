<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cycle\DailyLogRequest;
use App\Models\CycleRecord;
use App\Models\DailySymptomLog;
use App\Services\CyclePredictionService;
use App\Services\ReproductivePrivacyService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CycleController extends Controller
{
    public function index(CyclePredictionService $predictor)
    {
        $user = auth()->user();
        $today = Carbon::today()->toDateString();

        $latestCycle = CycleRecord::where('user_id', $user->id)
            ->latest('cycle_start_date')
            ->first();

        $prediction = $user->cyclePredictions()->first();
        if (!$prediction && $latestCycle) {
            $prediction = $predictor->recalculatePredictions($user);
        }

        // Calculate current cycle day
        $cycleDay = 1;
        $phase = 'Follicular';
        if ($latestCycle) {
            $diff = Carbon::parse($latestCycle->cycle_start_date)->diffInDays(Carbon::today());
            $cycleDay = $diff + 1;

            if ($cycleDay <= 5) {
                $phase = 'Menstrual';
            } elseif ($cycleDay <= 13) {
                $phase = 'Follicular';
            } elseif ($cycleDay <= 16) {
                $phase = 'Ovulation';
            } else {
                $phase = 'Luteal';
            }
        }

        // Today's log
        $todayLog = DailySymptomLog::where('user_id', $user->id)->where('log_date', $today)->first();

        // Recent 30 daily logs for chart (BBT temperature curve & pain trends)
        $chartLogs = DailySymptomLog::where('user_id', $user->id)
            ->orderBy('log_date')
            ->take(30)
            ->get()
            ->map(fn($log) => [
                'date' => Carbon::parse($log->log_date)->format('M d'),
                'bbt' => $log->bbt_celsius,
                'flow' => $log->flow_intensity,
            ]);

        return view('cycle.index', compact('user', 'latestCycle', 'prediction', 'cycleDay', 'phase', 'todayLog', 'chartLogs'));
    }

    public function calendar(Request $request)
    {
        $user = auth()->user();
        $month = $request->query('month', now()->format('Y-m'));
        $startOfMonth = Carbon::parse($month . '-01')->startOfMonth();
        $endOfMonth = $startOfMonth->copy()->endOfMonth();

        $logs = DailySymptomLog::where('user_id', $user->id)
            ->whereBetween('log_date', [$startOfMonth->toDateString(), $endOfMonth->toDateString()])
            ->get()
            ->keyBy(fn($l) => Carbon::parse($l->log_date)->toDateString());

        return view('cycle.calendar', compact('month', 'startOfMonth', 'endOfMonth', 'logs'));
    }

    public function log(DailyLogRequest $request, ReproductivePrivacyService $privacy, CyclePredictionService $predictor)
    {
        $user = auth()->user();
        $validated = $request->validated();
        $logDate = $validated['log_date'];

        // If flow indicates menstrual bleeding (MEDIUM or HEAVY)
        $isPeriodBleeding = in_array($validated['flow_intensity'], ['MEDIUM', 'HEAVY']);

        // Find active open cycle
        $activeCycle = CycleRecord::where('user_id', $user->id)
            ->whereNull('cycle_end_date')
            ->latest('cycle_start_date')
            ->first();

        $cycleId = null;

        if ($activeCycle) {
            $daysDiff = Carbon::parse($activeCycle->cycle_start_date)->diffInDays(Carbon::parse($logDate), false);

            if ($isPeriodBleeding && $daysDiff >= 18) {
                // Prior cycle concludes on the day before the new period begins
                $cycleEndDate = Carbon::parse($logDate)->subDay()->toDateString();
                $activeCycle->update([
                    'cycle_end_date' => $cycleEndDate,
                    'cycle_length_days' => max(1, (int) $daysDiff),
                ]);

                // Initialize new cycle
                $newCycle = CycleRecord::create([
                    'user_id' => $user->id,
                    'cycle_start_date' => $logDate,
                ]);
                $cycleId = $newCycle->id;
            } elseif ($daysDiff >= 0) {
                // Falls within current active cycle
                $cycleId = $activeCycle->id;
            } else {
                // Backdated log
                $cycleId = $activeCycle->id;
            }
        } elseif ($isPeriodBleeding) {
            // First recorded cycle for this patient
            $newCycle = CycleRecord::create([
                'user_id' => $user->id,
                'cycle_start_date' => $logDate,
            ]);
            $cycleId = $newCycle->id;
        } else {
            // Find historic closed cycle covering this date if applicable
            $closedCycle = CycleRecord::where('user_id', $user->id)
                ->where('cycle_start_date', '<=', $logDate)
                ->where('cycle_end_date', '>=', $logDate)
                ->first();
            $cycleId = $closedCycle?->id;
        }

        // Encrypt sensitive notes
        $encryptedNotes = null;
        if (!empty($validated['notes'])) {
            $encryptedNotes = $privacy->encryptSensitiveData($user, $validated['notes']);
        }

        DailySymptomLog::updateOrCreate(
            [
                'user_id' => $user->id,
                'log_date' => $logDate,
            ],
            [
                'cycle_id' => $cycleId,
                'flow_intensity' => $validated['flow_intensity'],
                'bbt_celsius' => $validated['bbt_celsius'] ?? null,
                'cervical_mucus' => $validated['cervical_mucus'] ?? null,
                'ovulation_test' => $validated['ovulation_test'] ?? null,
                'pregnancy_test' => $validated['pregnancy_test'] ?? null,
                'symptoms' => $validated['symptoms'] ?? [],
                'mood' => $validated['mood'] ?? null,
                'sexual_activity' => $validated['sexual_activity'] ?? null,
                'encrypted_notes' => $encryptedNotes,
            ]
        );

        // Recalculate predictions
        $predictor->recalculatePredictions($user);

        return back()->with('success', 'Daily symptoms recorded.');
    }

    public function insights()
    {
        $user = auth()->user();
        $cycles = CycleRecord::where('user_id', $user->id)->orderByDesc('cycle_start_date')->take(12)->get();
        $avgCycleLength = (int) round($cycles->whereNotNull('cycle_length_days')->avg('cycle_length_days') ?: 28);

        return view('cycle.insights', compact('cycles', 'avgCycleLength'));
    }

    public function learn()
    {
        return view('cycle.learn');
    }
}

