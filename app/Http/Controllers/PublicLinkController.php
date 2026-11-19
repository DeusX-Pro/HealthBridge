<?php

namespace App\Http\Controllers;

use App\Models\AddLink;
use App\Models\Document;
use App\Models\SharingSubmission;
use App\Models\SubmissionFile;
use App\Models\ViewLink;
use App\Services\AuditLoggerService;
use App\Services\SharingService;
use App\Services\VaultService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class PublicLinkController extends Controller
{
    // --- Public View Link ---

    public function showViewLink(Request $request, string $token)
    {
        $link = ViewLink::where('token', $token)->firstOrFail();

        if ($link->status !== 'ACTIVE' || $link->expires_at->isPast()) {
            return view('public.expired', ['message' => 'This secure View Link has expired or has been revoked by the patient.']);
        }

        $sessionKey = "view_link_unlocked_{$token}";
        $isUnlocked = $request->session()->get($sessionKey, false);

        if (!$isUnlocked) {
            return view('public.view-unlock', compact('link', 'token'));
        }

        $user = $link->user;
        $sections = $link->sections ?? [];

        $clinicalRecords = in_array('TIMELINE', $sections) ? $user->clinicalRecords()->latest('recorded_at')->get() : collect();
        $diaryEntries = in_array('DIARY', $sections) ? $user->diaryEntries()->latest('entry_date')->get() : collect();
        $medications = in_array('MEDICATIONS', $sections) ? $user->medications()->get() : collect();
        $measurements = in_array('MEASUREMENTS', $sections) ? $user->measurements()->latest('measured_at')->take(20)->get() : collect();
        $documents = in_array('DOCUMENTS', $sections) ? $user->documents()->latest('document_date')->get() : collect();

        return view('public.view-content', compact(
            'link',
            'token',
            'user',
            'sections',
            'clinicalRecords',
            'diaryEntries',
            'medications',
            'measurements',
            'documents'
        ));
    }

    public function unlockViewLink(Request $request, string $token, AuditLoggerService $audit)
    {
        $link = ViewLink::where('token', $token)->firstOrFail();

        $request->validate(['passcode' => ['required', 'string']]);

        if (!Hash::check($request->input('passcode'), $link->passcode_hash)) {
            return back()->withErrors(['passcode' => 'Incorrect passcode. Please try again.']);
        }

        $request->session()->put("view_link_unlocked_{$token}", true);

        $audit->log($link->user, 'VIEW_LINK', $link->recipient_name, 'ACCESSED_VIEW_LINK', 'VIEW_LINK', $link->id);

        return redirect()->route('public.view', ['token' => $token]);
    }

    public function downloadViewDocument(Request $request, string $token, string $docId, VaultService $vault, AuditLoggerService $audit)
    {
        $link = ViewLink::where('token', $token)->firstOrFail();

        if ($link->status !== 'ACTIVE' || $link->expires_at->isPast()) {
            abort(403, 'This View Link has expired or has been revoked.');
        }

        if (!$request->session()->get("view_link_unlocked_{$token}", false)) {
            abort(403, 'Unauthorized. Please enter the passcode to unlock this view.');
        }

        $sections = is_array($link->sections) ? $link->sections : json_decode($link->sections ?? '[]', true);
        if (!in_array('DOCUMENTS', $sections, true)) {
            abort(403, 'Document access has not been granted for this View Link.');
        }

        $document = Document::where('user_id', $link->user_id)->findOrFail($docId);

        $audit->log($link->user, 'VIEW_LINK', $link->recipient_name, 'DOWNLOADED_DOCUMENT', 'DOCUMENT', $document->id);

        return $vault->downloadResponse($document);
    }

    // --- Public Add Link ---

    public function showAddLink(Request $request, string $token)
    {
        $link = AddLink::where('token', $token)->firstOrFail();

        if ($link->status !== 'ACTIVE' || $link->expires_at->isPast()) {
            return view('public.expired', ['message' => 'This Add Link has expired, reached its submission limit, or been revoked.']);
        }

        $sessionKey = "add_link_unlocked_{$token}";
        $isUnlocked = $request->session()->get($sessionKey, false);

        if (!$isUnlocked) {
            return view('public.add-unlock', compact('link', 'token'));
        }

        return view('public.add-form', compact('link', 'token'));
    }

    public function unlockAddLink(Request $request, string $token)
    {
        $link = AddLink::where('token', $token)->firstOrFail();

        $request->validate(['passcode' => ['required', 'string']]);

        if (!Hash::check($request->input('passcode'), $link->passcode_hash)) {
            return back()->withErrors(['passcode' => 'Incorrect passcode. Please try again.']);
        }

        $request->session()->put("add_link_unlocked_{$token}", true);

        return redirect()->route('public.add', ['token' => $token]);
    }

    public function submitAddLink(Request $request, string $token, SharingService $sharing, AuditLoggerService $audit)
    {
        $link = AddLink::where('token', $token)->firstOrFail();

        if (!$request->session()->get("add_link_unlocked_{$token}", false)) {
            abort(403, 'Unauthorized.');
        }

        $validated = $request->validate([
            'clinic_name' => ['required', 'string', 'max:255'],
            'clinician_name' => ['required', 'string', 'max:255'],
            'visit_date' => ['required', 'date'],
            'visit_type' => ['required', 'string', 'max:64'],
            'summary' => ['nullable', 'string', 'max:5000'],
            'files' => ['nullable', 'array', 'max:5'],
            'files.*' => ['file', 'mimes:pdf,jpeg,png,jpg', 'max:25600'],
        ]);

        $files = $request->file('files') ?? [];
        $sharing->processPublicSubmission($link, $validated, $files);

        $audit->log($link->user, 'ADD_LINK', $validated['clinician_name'], 'SUBMITTED_VISIT_RECORDS', 'ADD_LINK', $link->id);

        $request->session()->forget("add_link_unlocked_{$token}");

        return view('public.submitted', ['patientName' => $link->user->name]);
    }
}

