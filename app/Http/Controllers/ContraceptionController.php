<?php

namespace App\Http\Controllers;

use App\Models\ContraceptionPlan;
use Illuminate\Http\Request;

class ContraceptionController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $plan = $user->contraceptionPlan ?: new ContraceptionPlan(['method' => 'NONE']);

        $methods = [
            'NONE' => 'No active method',
            'PILL' => 'Birth Control Pill (Oral)',
            'CONDOM' => 'Condoms (Barrier)',
            'IUD_HORMONAL' => 'Hormonal IUD (e.g. Mirena, Kyleena)',
            'IUD_COPPER' => 'Copper IUD (Non-hormonal)',
            'IMPLANT' => 'Arm Implant (Nexplanon)',
            'INJECTION' => 'Contraceptive Injection (Depo-Provera)',
            'PATCH' => 'Contraceptive Skin Patch',
            'RING' => 'Vaginal Ring (NuvaRing)',
            'DIAPHRAGM' => 'Diaphragm / Cervical Cap',
        ];

        return view('contraception.index', compact('plan', 'methods'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'method' => ['required', 'string'],
            'start_date' => ['nullable', 'date'],
            'reminder_active' => ['boolean'],
        ]);

        ContraceptionPlan::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'method' => $validated['method'],
                'start_date' => $validated['start_date'] ?? null,
                'reminder_active' => $request->boolean('reminder_active'),
            ]
        );

        return back()->with('success', 'Contraception plan updated.');
    }
}

