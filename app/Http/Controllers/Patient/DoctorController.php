<?php

namespace App\Http\Controllers\Patient;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    //
        public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient');

        $doctors = \App\Models\Doctor::with('user')
            ->where('status', 'approved')
            ->get();

        return inertia(
            'dashboard/patient/doctors/index', [
            'user' => $user,
            'doctors' => $doctors,
        ]);
    }

    public function show(\App\Models\Doctor $doctor): Response
    {
        $doctor->load(['user']);
        
        return inertia(
            'dashboard/patient/doctors/show',
            [
                'doctor' => $doctor,
            ]
        );
    }
}
