<?php

namespace App\Http\Middleware;

use App\Models\LegalDocument;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireLegalConsents
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user) {
            $requiredDocIds = LegalDocument::where('applies_to_signup', true)->pluck('id')->toArray();
            $acceptedDocIds = $user->legalConsents()->pluck('legal_document_id')->toArray();

            $unaccepted = array_diff($requiredDocIds, $acceptedDocIds);
            if (!empty($unaccepted) && !$request->routeIs('legal.*') && !$request->routeIs('logout')) {
                return redirect()->route('legal.outstanding');
            }
        }

        return $next($request);
    }
}

