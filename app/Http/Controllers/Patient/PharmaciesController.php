<?php

namespace App\Http\Controllers\Patient;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PharmaciesController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient');

        $pharmacies = \App\Models\Pharmacy::with('user')
            ->where('status', 'approved')
            ->get();

        return inertia(
            'dashboard/patient/pharmacies/index',
            [
                'user' => $user,
                'pharmacies' => $pharmacies,
            ]
        );
    }

    public function show(\App\Models\Pharmacy $pharmacy): Response
    {
        $pharmacy->load(['user', 'medicines.category', 'medicines.brand']);
        
        return inertia(
            'dashboard/patient/pharmacies/show',
            [
                'pharmacy' => $pharmacy,
            ]
        );
    }
}
