<?php

namespace App\Http\Controllers\Doctor;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PrescriptionController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load(['doctor.prescriptions.patient.user', 'doctor.prescriptions.items.medicine']);
        return inertia(
            'dashboard/doctor/prescription/index',
            [
                'user' => $user,
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'notes' => 'nullable|string',
            'items' => 'required|array',
            'items.*.medicine_id' => 'required|exists:medicines,id',
            'items.*.dosage' => 'required|string',
            'items.*.frequency' => 'required|string',
            'items.*.duration' => 'required|string',
            'items.*.instructions' => 'nullable|string',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $doctor = $user->doctor;

        \Illuminate\Support\Facades\DB::transaction(function () use ($validated, $doctor) {
            $prescription = $doctor->prescriptions()->create([
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'patient_id' => $validated['patient_id'],
                'notes' => $validated['notes'],
                'status' => 'active',
            ]);

            foreach ($validated['items'] as $item) {
                $prescription->items()->create($item);
            }
        });

        return redirect()->back()->with('success', 'Prescription created successfully.');
    }
}
