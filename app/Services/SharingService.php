<?php

namespace App\Services;

use App\Models\AddLink;
use App\Models\SharingSubmission;
use App\Models\SubmissionFile;
use App\Models\User;
use App\Models\ViewLink;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SharingService
{
    public function createViewLink(User $user, string $recipientName, array $sections, string $passcode, int $validDays = 7): ViewLink
    {
        return ViewLink::create([
            'user_id' => $user->id,
            'token' => Str::random(32),
            'passcode_hash' => Hash::make($passcode),
            'recipient_name' => $recipientName,
            'sections' => $sections,
            'status' => 'ACTIVE',
            'expires_at' => now()->addDays($validDays),
        ]);
    }

    public function createAddLink(User $user, string $recipientName, string $passcode, ?string $purpose = null, int $validDays = 3, int $maxSubmissions = 1): AddLink
    {
        return AddLink::create([
            'user_id' => $user->id,
            'token' => Str::random(32),
            'passcode_hash' => Hash::make($passcode),
            'recipient_name' => $recipientName,
            'purpose' => $purpose,
            'status' => 'ACTIVE',
            'max_submissions' => $maxSubmissions,
            'submission_count' => 0,
            'expires_at' => now()->addDays($validDays),
        ]);
    }

    public function processPublicSubmission(AddLink $link, array $attributes, array $files = []): SharingSubmission
    {
        return DB::transaction(function () use ($link, $attributes, $files) {
            $lockedLink = AddLink::where('id', $link->id)->lockForUpdate()->firstOrFail();

            if ($lockedLink->status !== 'ACTIVE' || $lockedLink->expires_at->isPast() || $lockedLink->submission_count >= $lockedLink->max_submissions) {
                abort(403, 'This Add Link is no longer valid or has reached its maximum submissions.');
            }

            $submission = SharingSubmission::create([
                'user_id' => $lockedLink->user_id,
                'add_link_id' => $lockedLink->id,
                'clinic_name' => $attributes['clinic_name'],
                'clinician_name' => $attributes['clinician_name'],
                'visit_date' => $attributes['visit_date'],
                'visit_type' => $attributes['visit_type'] ?? 'Consultation',
                'summary' => $attributes['summary'] ?? null,
                'medications_data' => $attributes['medications'] ?? null,
                'status' => 'PENDING',
            ]);

            foreach ($files as $file) {
                if ($file instanceof UploadedFile) {
                    $path = $file->storeAs('submissions/' . $submission->id, Str::random(32) . '.' . $file->getClientOriginalExtension(), 'local');
                    SubmissionFile::create([
                        'submission_id' => $submission->id,
                        'file_name' => $file->getClientOriginalName(),
                        'storage_path' => $path,
                        'content_type' => $file->getMimeType(),
                        'size_bytes' => $file->getSize(),
                    ]);
                }
            }

            $lockedLink->increment('submission_count');
            if ($lockedLink->submission_count >= $lockedLink->max_submissions) {
                $lockedLink->update(['status' => 'USED']);
            }

            return $submission;
        });
    }
}

