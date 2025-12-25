<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PharmacyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if (!$user || $user->role !== 'pharmacy') {
            return redirect()->route('dashboard')->with('error', 'You do not have permission to access this page.');
        }

        // Check if pharmacy profile exists
        if (!$user->pharmacy) {
            // Allow access to profile page to complete setup
            if (!$request->routeIs('pharmacy.profile')) {
                return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
            }
        }

        return $next($request);
    }
}
