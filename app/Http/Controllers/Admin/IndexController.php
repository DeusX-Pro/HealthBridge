<?php

namespace App\Http\Controllers\Admin;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    //
    public function index(): Response
    {
        $totalUsers = \App\Models\User::count();
        $totalDoctors = \App\Models\Doctor::count();
        $totalPatients = \App\Models\Patient::count();
        $totalPharmacies = \App\Models\Pharmacy::count();
        $totalLabs = \App\Models\Medicallab::count();

        return inertia(
            'dashboard/admin/index',
            [
                'stats' => [
                    'totalUsers' => $totalUsers,
                    'totalDoctors' => $totalDoctors,
                    'totalPatients' => $totalPatients,
                    'totalPharmacies' => $totalPharmacies,
                    'totalLabs' => $totalLabs,
                ],
            ]
        );
    }
}
