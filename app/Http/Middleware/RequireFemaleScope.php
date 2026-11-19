<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireFemaleScope
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user || !$user->isFemale()) {
            return redirect()->route('today')->with('error', 'Cycle tracking and reproductive features are restricted to female profiles.');
        }

        return $next($request);
    }
}

