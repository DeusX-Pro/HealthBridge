<?php

namespace App\Http\Controllers\Patient;

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
        $user->load(['patient.appointments.doctor.user', 'patient.vitals', 'patient.prescriptions.doctor.user']);

        $nextAppointment = $user->patient->appointments()
            ->where('appointment_date', '>=', now()->format('Y-m-d'))
            ->where('status', 'confirmed')
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->first();

        $latestVitals = $user->patient->vitals()
            ->orderBy('recorded_at', 'desc')
            ->first();

        $activePrescriptions = $user->patient->prescriptions()
            ->where('status', 'active')
            ->get();

        $allPharmacyOrders = $user->patient->pharmacyOrders()
            ->with(['pharmacy', 'items.medicine'])
            ->latest()
            ->get();

        $allLabOrders = $user->patient->labOrders()
            ->with(['medicallab', 'service'])
            ->latest()
            ->get();

        return inertia(
            'dashboard/patient/dashboard/index',
            [
                'user' => $user,
                'nextAppointment' => $nextAppointment,
                'latestVitals' => $latestVitals,
                'activePrescriptions' => $activePrescriptions,
                'pharmacyOrders' => $allPharmacyOrders,
                'labOrders' => $allLabOrders,
                'walletBalance' => $user->balance(),
            ]
        );
    }
}
