<?php

namespace App\Http\Controllers;

use App\Models\PatientScreeningSetting;
use App\Models\SelfExamLog;
use App\Services\ReproductivePrivacyService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MensHealthController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $settings = $user->screeningSettings ?: new PatientScreeningSetting();
        $recentLogs = SelfExamLog::where('user_id', $user->id)->orderByDesc('log_date')->take(12)->get();
        $lastExam = $recentLogs->first();

        return view('mens-health.index', compact('user', 'settings', 'recentLogs', 'lastExam'));
    }

    public function log(Request $request, ReproductivePrivacyService $privacy)
    {
        $validated = $request->validate([
            'log_date' => ['required', 'date'],
            'finding' => ['required', 'in:NORMAL,CHANGE_NOTICED,PAIN,UNSURE'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $encryptedNotes = null;
        if (!empty($validated['notes'])) {
            $encryptedNotes = $privacy->encryptSensitiveData(auth()->user(), $validated['notes']);
        }

        SelfExamLog::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'log_date' => $validated['log_date'],
            ],
            [
                'finding' => $validated['finding'],
                'encrypted_notes' => $encryptedNotes,
            ]
        );

        return back()->with('success', 'Monthly self-exam recorded.');
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'self_exam_reminder_active' => ['boolean'],
            'family_history_prostate' => ['boolean'],
            'family_history_testicular' => ['boolean'],
        ]);

        PatientScreeningSetting::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'self_exam_reminder_active' => $request->boolean('self_exam_reminder_active'),
                'family_history_prostate' => $request->boolean('family_history_prostate'),
                'family_history_testicular' => $request->boolean('family_history_testicular'),
            ]
        );

        return back()->with('success', 'Screening preferences updated.');
    }

    public function learn()
    {
        return view('mens-health.learn');
    }
}

