<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\LegalDocument;
use App\Models\NotificationPreference;
use App\Models\PatientInterest;
use App\Models\PatientLegalConsent;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function create()
    {
        $legalDocuments = LegalDocument::where('applies_to_signup', true)->get();
        $availableInterests = [
            'Diet & Nutrition',
            'Cycle & Periods',
            'Training & Movement',
            'Family Planning',
            'Mental Wellbeing',
            "Men's Health",
            'Preventive Health',
        ];

        return view('auth.register', compact('legalDocuments', 'availableInterests'));
    }

    public function store(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'phone_e164' => $validated['phone_e164'],
                'date_of_birth' => $validated['date_of_birth'],
                'biological_sex' => $validated['biological_sex'],
                'password' => Hash::make($validated['password']),
                'status' => 'ACTIVE',
                'is_mfa_active' => false,
            ]);

            // Save accepted legal documents
            foreach ($validated['accepted_documents'] as $docId) {
                PatientLegalConsent::create([
                    'user_id' => $user->id,
                    'legal_document_id' => $docId,
                    'accepted_at' => now(),
                ]);
            }

            // Save interests
            if (!empty($validated['interests'])) {
                foreach ($validated['interests'] as $interest) {
                    PatientInterest::create([
                        'user_id' => $user->id,
                        'interest' => $interest,
                    ]);
                }
            }

            // Create default notification preferences
            NotificationPreference::create([
                'user_id' => $user->id,
                'timezone' => 'UTC',
                'medication_reminders' => true,
                'cycle_reminders' => true,
                'screening_reminders' => true,
                'email_notifications' => true,
            ]);

            return $user;
        });

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('today')->with('success', 'Welcome to HealthBridge! Your encrypted health account is ready.');
    }
}

