<?php

namespace App\Http\Controllers\Doctor;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TeleMedicineController extends Controller
{
    //
        public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('doctor');
        return inertia(
            'dashboard/doctor/telemedicine/index',
            [
                'user' => $user,
            ]
        );
    }
}
