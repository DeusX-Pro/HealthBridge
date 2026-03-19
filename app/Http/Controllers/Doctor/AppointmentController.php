<?php

namespace App\Http\Controllers\Doctor;

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
        $user->load(['doctor.appointments.patient.user']);
        return inertia(
            'dashboard/doctor/appointment/index',
            [
                'user' => $user,
            ]
        );
    }

    public function update(Request $request, \App\Models\Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        $appointment->update($validated);

        return redirect()->back()->with('success', 'Appointment status updated.');
    }
}
