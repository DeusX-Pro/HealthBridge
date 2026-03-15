<?php

namespace App\Http\Controllers\Doctor;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load(['doctor.appointments.patient.user']);

        $upcomingAppointments = $user->doctor->appointments()
            ->where('appointment_date', '>=', now()->format('Y-m-d'))
            ->where('status', 'confirmed')
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->get();

        $todayAppointmentsCount = $user->doctor->appointments()
            ->where('appointment_date', now()->format('Y-m-d'))
            ->count();

        $totalPatientsCount = $user->doctor->appointments()
            ->distinct('patient_id')
            ->count();

        return inertia(
            'dashboard/doctor/dashboard/index',
            [
                'user' => $user,
                'upcomingAppointments' => $upcomingAppointments,
                'todayAppointmentsCount' => $todayAppointmentsCount,
                'totalPatientsCount' => $totalPatientsCount,
                'walletBalance' => $user->balance(),
            ]
        );
    }
}
