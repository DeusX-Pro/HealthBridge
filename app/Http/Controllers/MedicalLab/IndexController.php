<?php

namespace App\Http\Controllers\MedicalLab;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use App\Models\MedicalLabService;

class IndexController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');

        $totalServices = MedicalLabService::where('medicallab_id', $user->medicallab->id)->count();

        return inertia(
            'dashboard/medical-lab/dashboard/index',
            [
                'user' => $user,
                'totalServices' => $totalServices,
                'walletBalance' => $user->balance(),
            ]
        );
    }
}
