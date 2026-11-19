<?php

namespace App\Http\Controllers;

use App\Models\SafetyPlan;
use Illuminate\Http\Request;

class SafetyPlanController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $plan = $user->safetyPlan ?: new SafetyPlan();

        return view('safety.index', compact('plan'));
    }

    public function edit()
    {
        $user = auth()->user();
        $plan = $user->safetyPlan ?: new SafetyPlan();

        return view('safety.edit', compact('plan'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'warning_signs' => ['nullable', 'string'],
            'coping_strategies' => ['nullable', 'string'],
            'emergency_contacts' => ['nullable', 'string'],
            'professional_contacts' => ['nullable', 'string'],
            'environment_safety' => ['nullable', 'string', 'max:2000'],
        ]);

        $toList = fn(?string $val) => $val ? array_values(array_filter(array_map('trim', explode("\n", $val)))) : [];

        SafetyPlan::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'warning_signs' => $toList($validated['warning_signs'] ?? null),
                'coping_strategies' => $toList($validated['coping_strategies'] ?? null),
                'emergency_contacts' => $toList($validated['emergency_contacts'] ?? null),
                'professional_contacts' => $toList($validated['professional_contacts'] ?? null),
                'environment_safety' => $validated['environment_safety'] ?? null,
            ]
        );

        return redirect()->route('safety.index')->with('success', 'Safety plan saved.');
    }
}

