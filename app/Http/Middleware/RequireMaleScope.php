<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireMaleScope
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if (!$user || !$user->isMale()) {
            return redirect()->route('today')->with('error', "Men's health features are restricted to male profiles.");
        }

        return $next($request);
    }
}

