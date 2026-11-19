<?php

namespace App\Http\Controllers;

use App\Http\Requests\Measurements\StoreMeasurementRequest;
use App\Models\Measurement;
use Illuminate\Http\Request;

class MeasurementsController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $type = $request->query('type', 'WEIGHT');

        $measurements = Measurement::where('user_id', $user->id)
            ->where('measurement_type', $type)
            ->orderByDesc('measured_at')
            ->paginate(15);

        // Chart data for trend graph (last 20 readings chronological)
        $chartData = Measurement::where('user_id', $user->id)
            ->where('measurement_type', $type)
            ->orderBy('measured_at')
            ->take(20)
            ->get()
            ->map(fn($m) => [
                'date' => $m->measured_at->format('M d'),
                'value' => $m->value,
                'value2' => $m->value2,
            ]);

        $latestValues = Measurement::where('user_id', $user->id)
            ->latest('measured_at')
            ->get()
            ->groupBy('measurement_type')
            ->map(fn($group) => $group->first());

        $types = [
            'WEIGHT' => ['name' => 'Weight', 'defaultUnit' => 'kg', 'icon' => 'scale'],
            'BLOOD_PRESSURE' => ['name' => 'Blood Pressure', 'defaultUnit' => 'mmHg', 'icon' => 'activity'],
            'GLUCOSE' => ['name' => 'Blood Glucose', 'defaultUnit' => 'mg/dL', 'icon' => 'droplet'],
            'HEART_RATE' => ['name' => 'Resting Heart Rate', 'defaultUnit' => 'bpm', 'icon' => 'heart'],
            'TEMPERATURE' => ['name' => 'Body Temperature', 'defaultUnit' => '°C', 'icon' => 'thermometer'],
            'OXYGEN' => ['name' => 'Oxygen Saturation', 'defaultUnit' => '%', 'icon' => 'wind'],
            'SLEEP' => ['name' => 'Sleep Duration', 'defaultUnit' => 'hours', 'icon' => 'moon'],
        ];

        return view('measurements.index', compact('measurements', 'type', 'types', 'chartData', 'latestValues'));
    }

    public function create()
    {
        $types = [
            'WEIGHT' => ['name' => 'Weight', 'defaultUnit' => 'kg'],
            'BLOOD_PRESSURE' => ['name' => 'Blood Pressure', 'defaultUnit' => 'mmHg'],
            'GLUCOSE' => ['name' => 'Blood Glucose', 'defaultUnit' => 'mg/dL'],
            'HEART_RATE' => ['name' => 'Resting Heart Rate', 'defaultUnit' => 'bpm'],
            'TEMPERATURE' => ['name' => 'Body Temperature', 'defaultUnit' => '°C'],
            'OXYGEN' => ['name' => 'Oxygen Saturation', 'defaultUnit' => '%'],
            'SLEEP' => ['name' => 'Sleep Duration', 'defaultUnit' => 'hours'],
        ];

        return view('measurements.create', compact('types'));
    }

    public function store(StoreMeasurementRequest $request)
    {
        $validated = $request->validated();

        Measurement::create([
            'user_id' => auth()->id(),
            'measurement_type' => $validated['measurement_type'],
            'value' => $validated['value'],
            'value2' => $validated['value2'] ?? null,
            'unit' => $validated['unit'],
            'context' => $validated['context'] ?? null,
            'measured_at' => $validated['measured_at'],
            'source' => 'SELF',
        ]);

        return redirect()->route('measurements.index', ['type' => $validated['measurement_type']])
            ->with('success', 'Measurement recorded successfully.');
    }

    public function show(string $id)
    {
        $measurement = Measurement::where('user_id', auth()->id())->findOrFail($id);
        return view('measurements.show', compact('measurement'));
    }

    public function destroy(string $id)
    {
        $measurement = Measurement::where('user_id', auth()->id())->findOrFail($id);
        $type = $measurement->measurement_type;
        $measurement->delete();

        return redirect()->route('measurements.index', ['type' => $type])
            ->with('success', 'Reading deleted.');
    }
}

