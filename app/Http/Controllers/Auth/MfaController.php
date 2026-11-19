<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\MfaVerifyRequest;
use App\Models\MfaFactor;
use App\Models\User;
use App\Services\MfaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class MfaController extends Controller
{
    public function create(Request $request)
    {
        if (!$request->session()->has('auth.mfa_user_id')) {
            return redirect()->route('login');
        }

        return view('auth.mfa');
    }

    public function verify(MfaVerifyRequest $request, MfaService $mfa)
    {
        $userId = $request->session()->get('auth.mfa_user_id');
        if (!$userId) {
            return redirect()->route('login');
        }

        $user = User::findOrFail($userId);
        $factor = MfaFactor::where('user_id', $user->id)
            ->where('factor_type', 'totp')
            ->first();

        if (!$factor) {
            return redirect()->route('login')->withErrors(['login' => 'MFA configuration error.']);
        }

        $secret = Crypt::decryptString($factor->secret_ciphertext);
        if (!$mfa->verifyCode($secret, $request->input('code'))) {
            return back()->withErrors(['code' => 'Invalid or expired 6-digit authenticator code.']);
        }

        $request->session()->forget('auth.mfa_user_id');
        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(route('today'))->with('success', 'Two-factor verification successful.');
    }
}

