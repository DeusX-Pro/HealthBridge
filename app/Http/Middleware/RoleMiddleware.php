<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user) {
            if ($user->role === 'admin') {
                return redirect()->route('admin.dashboard');
            } elseif ($user->role === 'doctor') {
                return redirect()->route('doctor.dashboard');
            } elseif ($user->role === 'patient') {
                return redirect()->route('patient.dashboard');
            } elseif ($user->role === 'pharmacy') {
                return redirect()->route('pharmacy.dashboard');
            } elseif ($user->role === 'medical_lab') {
                return redirect()->route('medical-lab.dashboard');
            } else {
                return redirect()->back();
            }
        }
        // If no user is authenticated
        return redirect()->route('login');
    }
}
