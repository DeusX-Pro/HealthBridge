<?php

namespace App\Http\Controllers\Patient;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient.appointments.doctor.user');
        return inertia(
            'dashboard/patient/appointments/index', [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
            'type' => 'required|in:telehealth,in-person,volunteer',
            'reason' => 'nullable|string',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $patient = $user->patient;

        $patient->appointments()->create(array_merge($validated, [
            'uuid' => (string) \Illuminate\Support\Str::uuid(),
            'status' => 'pending',
        ]));

        return redirect()->back()->with('success', 'Appointment booked successfully.');
    }
}
