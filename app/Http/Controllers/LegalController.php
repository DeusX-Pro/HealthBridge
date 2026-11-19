<?php

namespace App\Http\Controllers;

use App\Models\LegalDocument;
use App\Models\PatientLegalConsent;
use Illuminate\Http\Request;

class LegalController extends Controller
{
    public function signupTerms()
    {
        $documents = LegalDocument::where('applies_to_signup', true)->get();
        return view('legal.signup', compact('documents'));
    }

    public function outstanding()
    {
        $user = auth()->user();
        $requiredDocIds = LegalDocument::where('applies_to_signup', true)->pluck('id')->toArray();
        $acceptedDocIds = $user->legalConsents()->pluck('legal_document_id')->toArray();

        $outstandingIds = array_diff($requiredDocIds, $acceptedDocIds);
        $documents = LegalDocument::whereIn('id', $outstandingIds)->get();

        if ($documents->isEmpty()) {
            return redirect()->route('today');
        }

        return view('legal.outstanding', compact('documents'));
    }

    public function accept(Request $request)
    {
        $request->validate([
            'document_ids' => ['required', 'array', 'min:1'],
            'document_ids.*' => ['exists:legal_documents,id'],
        ]);

        $user = auth()->user();
        foreach ($request->input('document_ids') as $docId) {
            PatientLegalConsent::firstOrCreate([
                'user_id' => $user->id,
                'legal_document_id' => $docId,
            ], [
                'accepted_at' => now(),
            ]);
        }

        return redirect()->route('today')->with('success', 'Thank you for reviewing and accepting the updated terms.');
    }

    public function show(string $slug)
    {
        $document = LegalDocument::where('slug', $slug)->firstOrFail();
        return view('legal.show', compact('document'));
    }
}

