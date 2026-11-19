<?php

namespace App\Http\Controllers;

use App\Http\Requests\Sharing\CreateAddLinkRequest;
use App\Http\Requests\Sharing\CreateViewLinkRequest;
use App\Models\AccessHistoryLog;
use App\Models\AddLink;
use App\Models\DiaryEntry;
use App\Models\Document;
use App\Models\Medication;
use App\Models\SharingSubmission;
use App\Models\ViewLink;
use App\Services\AuditLoggerService;
use App\Services\SharingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SharingController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $viewLinks = ViewLink::where('user_id', $user->id)->latest()->get();
        $addLinks = AddLink::where('user_id', $user->id)->latest()->get();
        $pendingSubmissionsCount = SharingSubmission::where('user_id', $user->id)->where('status', 'PENDING')->count();

        return view('sharing.index', compact('viewLinks', 'addLinks', 'pendingSubmissionsCount'));
    }

    public function viewLinks()
    {
        $viewLinks = ViewLink::where('user_id', auth()->id())->latest()->paginate(15);
        return view('sharing.view-links', compact('viewLinks'));
    }

    public function storeViewLink(CreateViewLinkRequest $request, SharingService $sharing, AuditLoggerService $audit)
    {
        $validated = $request->validated();
        $user = auth()->user();

        $link = $sharing->createViewLink(
            $user,
            $validated['recipient_name'],
            $validated['sections'],
            $validated['passcode'],
            $validated['valid_days'] ?? 7
        );

        $audit->log($user, 'PATIENT', $user->name, 'CREATED_VIEW_LINK', 'VIEW_LINK', $link->id);

        return redirect()->route('sharing.view-links')
            ->with('success', "View Link created for {$link->recipient_name}. Token: {$link->token}")
            ->with('generated_link', route('public.view', ['token' => $link->token]));
    }

    public function revokeViewLink(string $id, AuditLoggerService $audit)
    {
        $link = ViewLink::where('user_id', auth()->id())->findOrFail($id);
        $link->update(['status' => 'REVOKED']);

        $audit->log(auth()->user(), 'PATIENT', auth()->user()->name, 'REVOKED_VIEW_LINK', 'VIEW_LINK', $link->id);

        return back()->with('success', 'View Link revoked immediately.');
    }

    public function addLinks()
    {
        $addLinks = AddLink::where('user_id', auth()->id())->latest()->paginate(15);
        return view('sharing.add-links', compact('addLinks'));
    }

    public function storeAddLink(CreateAddLinkRequest $request, SharingService $sharing, AuditLoggerService $audit)
    {
        $validated = $request->validated();
        $user = auth()->user();

        $link = $sharing->createAddLink(
            $user,
            $validated['recipient_name'],
            $validated['passcode'],
            $validated['purpose'] ?? null,
            $validated['valid_days'] ?? 3,
            $validated['max_submissions'] ?? 1
        );

        $audit->log($user, 'PATIENT', $user->name, 'CREATED_ADD_LINK', 'ADD_LINK', $link->id);

        return redirect()->route('sharing.add-links')
            ->with('success', "Upload Add Link created for {$link->recipient_name}. Token: {$link->token}")
            ->with('generated_link', route('public.add', ['token' => $link->token]));
    }

    public function revokeAddLink(string $id, AuditLoggerService $audit)
    {
        $link = AddLink::where('user_id', auth()->id())->findOrFail($id);
        $link->update(['status' => 'REVOKED']);

        $audit->log(auth()->user(), 'PATIENT', auth()->user()->name, 'REVOKED_ADD_LINK', 'ADD_LINK', $link->id);

        return back()->with('success', 'Add Link revoked.');
    }

    public function submissions()
    {
        $submissions = SharingSubmission::with(['addLink', 'files'])
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(15);

        return view('sharing.submissions', compact('submissions'));
    }

    public function acceptSubmission(Request $request, string $id, AuditLoggerService $audit)
    {
        $submission = SharingSubmission::with('files')->where('user_id', auth()->id())->findOrFail($id);

        DB::transaction(function () use ($submission, $audit) {
            // 1. Create a diary entry from the submission
            DiaryEntry::create([
                'user_id' => auth()->id(),
                'entry_type' => 'CONSULTATION',
                'entry_date' => $submission->visit_date,
                'title' => "Visit to {$submission->clinic_name} ({$submission->clinician_name})",
                'data' => [
                    'summary' => $submission->summary,
                    'clinician' => $submission->clinician_name,
                    'facility' => $submission->clinic_name,
                    'visit_type' => $submission->visit_type,
                ],
                'origin' => 'LINK',
                'source_submission_id' => $submission->id,
                'search_text' => "{$submission->clinic_name} {$submission->clinician_name} {$submission->summary}",
            ]);

            // 2. Attach any uploaded files to Documents Vault with real content checksum
            foreach ($submission->files as $file) {
                $absPath = Storage::disk('local')->path($file->storage_path);
                $sha256 = file_exists($absPath) ? hash_file('sha256', $absPath) : hash('sha256', $file->storage_path);

                Document::create([
                    'user_id' => auth()->id(),
                    'title' => "{$submission->clinic_name} - {$file->file_name}",
                    'category' => 'DISCHARGE_SUMMARY',
                    'document_date' => $submission->visit_date,
                    'file_name' => $file->file_name,
                    'storage_path' => $file->storage_path,
                    'content_type' => $file->content_type,
                    'size_bytes' => $file->size_bytes,
                    'sha256' => $sha256,
                    'origin' => 'LINK',
                    'submission_id' => $submission->id,
                ]);
            }

            // 3. Mark submission accepted
            $submission->update(['status' => 'ACCEPTED']);

            $audit->log(auth()->user(), 'PATIENT', auth()->user()->name, 'ACCEPTED_SUBMISSION', 'SUBMISSION', $submission->id);
        });

        return back()->with('success', 'Clinic visit record and uploaded files have been added to your health timeline.');
    }

    public function rejectSubmission(string $id, AuditLoggerService $audit)
    {
        $submission = SharingSubmission::where('user_id', auth()->id())->findOrFail($id);
        $submission->update(['status' => 'REJECTED']);

        $audit->log(auth()->user(), 'PATIENT', auth()->user()->name, 'REJECTED_SUBMISSION', 'SUBMISSION', $submission->id);

        return back()->with('info', 'Submission marked as rejected.');
    }

    public function history()
    {
        $logs = AccessHistoryLog::where('user_id', auth()->id())->latest()->paginate(25);
        return view('sharing.history', compact('logs'));
    }
}

