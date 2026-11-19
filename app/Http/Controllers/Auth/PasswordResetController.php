<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    public function forgot()
    {
        return view('auth.forgot-password');
    }

    public function sendLink(ForgotPasswordRequest $request)
    {
        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if ($user) {
            $token = Str::random(60);
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $email],
                ['token' => Hash::make($token), 'created_at' => now()]
            );

            // In local/demo, we can redirect or show the link for testing
            session()->flash('demo_reset_link', route('password.reset', ['token' => $token, 'email' => $email]));
        }

        return back()->with('status', 'If an account exists with that email address, a password reset link has been prepared.');
    }

    public function edit(string $token)
    {
        $email = request()->query('email');
        if (!$email) {
            return redirect()->route('password.request')->withErrors(['email' => 'Invalid password reset request.']);
        }

        $record = DB::table('password_reset_tokens')->where('email', $email)->first();
        if (!$record || !Hash::check($token, $record->token)) {
            return redirect()->route('password.request')->withErrors(['email' => 'This password reset link is invalid or has already been used.']);
        }

        $expireMinutes = config('auth.passwords.users.expire', 60);
        if (\Carbon\Carbon::parse($record->created_at)->addMinutes($expireMinutes)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            return redirect()->route('password.request')->withErrors(['email' => 'This password reset link has expired. Please request a new one.']);
        }

        return view('auth.reset-password', compact('token', 'email'));
    }

    public function update(ResetPasswordRequest $request)
    {
        $email = $request->input('email');
        $token = $request->input('token');

        $record = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$record || !Hash::check($token, $record->token)) {
            return back()->withErrors(['email' => 'This password reset token is invalid or has already been used.']);
        }

        $expireMinutes = config('auth.passwords.users.expire', 60);
        if (\Carbon\Carbon::parse($record->created_at)->addMinutes($expireMinutes)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $email)->delete();
            return back()->withErrors(['email' => 'This password reset token has expired. Please request a new reset link.']);
        }

        $user = User::where('email', $email)->firstOrFail();
        $user->update(['password' => Hash::make($request->input('password'))]);

        DB::table('password_reset_tokens')->where('email', $email)->delete();

        return redirect()->route('login')->with('success', 'Your password has been reset. Please sign in with your new password.');
    }
}

