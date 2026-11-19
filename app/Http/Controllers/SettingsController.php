<?php

namespace App\Http\Controllers;

use App\Models\MfaFactor;
use App\Models\NotificationPreference;
use App\Models\PatientInterest;
use App\Services\MfaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $interests = $user->interests()->pluck('interest')->toArray();
        $allInterests = [
            'Diet & Nutrition',
            'Cycle & Periods',
            'Training & Movement',
            'Family Planning',
            'Mental Wellbeing',
            "Men's Health",
            'Preventive Health',
        ];

        return view('settings.index', compact('user', 'interests', 'allInterests'));
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:128'],
            'last_name' => ['required', 'string', 'max:128'],
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
            'phone_e164' => ['required', 'string', 'unique:users,phone_e164,' . $user->id],
            'date_of_birth' => ['required', 'date'],
            'interests' => ['nullable', 'array'],
        ]);

        $user->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone_e164' => $validated['phone_e164'],
            'date_of_birth' => $validated['date_of_birth'],
        ]);

        $user->interests()->delete();
        foreach ($validated['interests'] ?? [] as $interest) {
            PatientInterest::create([
                'user_id' => $user->id,
                'interest' => $interest,
            ]);
        }

        return back()->with('success', 'Profile details updated.');
    }

    public function security(MfaService $mfa)
    {
        $user = auth()->user();
        $factor = MfaFactor::where('user_id', $user->id)->where('factor_type', 'totp')->first();

        $setupSecret = null;
        $otpAuthUrl = null;
        if (!$user->is_mfa_active) {
            $setupSecret = session('mfa_setup_secret') ?: $mfa->generateSecret();
            session(['mfa_setup_secret' => $setupSecret]);
            $otpAuthUrl = $mfa->getOtpAuthUrl($user->email, $setupSecret);
        }

        $sessions = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderByDesc('last_activity')
            ->get();

        return view('settings.security', compact('user', 'factor', 'setupSecret', 'otpAuthUrl', 'sessions'));
    }

    public function updatePassword(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return back()->withErrors(['current_password' => 'The provided current password is incorrect.']);
        }

        $user->update(['password' => Hash::make($validated['new_password'])]);

        return back()->with('success', 'Password changed successfully.');
    }

    public function activateMfa(Request $request, MfaService $mfa)
    {
        $user = auth()->user();
        $secret = session('mfa_setup_secret');

        if (!$secret) {
            return back()->withErrors(['code' => 'MFA setup session expired. Please refresh.']);
        }

        $request->validate(['code' => ['required', 'string', 'size:6']]);

        if (!$mfa->verifyCode($secret, $request->input('code'))) {
            return back()->withErrors(['code' => 'Invalid 6-digit code. Please check your authenticator app.']);
        }

        MfaFactor::updateOrCreate(
            ['user_id' => $user->id, 'factor_type' => 'totp'],
            [
                'secret_ciphertext' => Crypt::encryptString($secret),
                'verified_at' => now(),
            ]
        );

        $user->update(['is_mfa_active' => true]);
        session()->forget('mfa_setup_secret');

        return back()->with('success', 'Two-Factor Authentication is now enabled for your account.');
    }

    public function disableMfa(Request $request)
    {
        $user = auth()->user();
        $request->validate(['password' => ['required', 'string']]);

        if (!Hash::check($request->input('password'), $user->password)) {
            return back()->withErrors(['password' => 'Password verification required to disable 2FA.']);
        }

        $user->update(['is_mfa_active' => false]);
        MfaFactor::where('user_id', $user->id)->delete();

        return back()->with('info', 'Two-Factor Authentication disabled.');
    }

    public function notifications()
    {
        $user = auth()->user();
        $prefs = $user->notificationPreference ?: new NotificationPreference();
        $notifications = $user->notifications()->latest()->paginate(20);

        return view('settings.notifications', compact('prefs', 'notifications'));
    }

    public function updateNotificationPreferences(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'timezone' => ['required', 'string'],
            'medication_reminders' => ['boolean'],
            'cycle_reminders' => ['boolean'],
            'screening_reminders' => ['boolean'],
            'email_notifications' => ['boolean'],
        ]);

        NotificationPreference::updateOrCreate(
            ['user_id' => $user->id],
            [
                'timezone' => $validated['timezone'],
                'medication_reminders' => $request->boolean('medication_reminders'),
                'cycle_reminders' => $request->boolean('cycle_reminders'),
                'screening_reminders' => $request->boolean('screening_reminders'),
                'email_notifications' => $request->boolean('email_notifications'),
            ]
        );

        return back()->with('success', 'Notification preferences updated.');
    }

    public function markAllNotificationsRead()
    {
        auth()->user()->notifications()->whereNull('read_at')->update(['read_at' => now()]);
        return back()->with('success', 'All notifications marked as read.');
    }
}

