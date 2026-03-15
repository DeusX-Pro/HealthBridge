<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class IndexController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('pharmacy');

        $totalMedicines = \App\Models\Medicine::where('pharmacy_id', $user->pharmacy->id)->count();

        return inertia(
            'dashboard/pharmacy/dashboard/index',
            [
                'user' => $user,
                'totalMedicines' => $totalMedicines,
                'walletBalance' => $user->balance(),
            ]
        );
    }
}
