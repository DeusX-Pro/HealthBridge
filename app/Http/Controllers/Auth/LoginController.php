<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }

    public function store(LoginRequest $request)
    {
        $login = $request->input('login');
        $password = $request->input('password');

        $user = User::where('email', $login)
            ->orWhere('phone_e164', $login)
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return back()->withInput($request->only('login'))->withErrors([
                'login' => 'Invalid email/phone or password.',
            ]);
        }

        if ($user->status === 'SUSPENDED') {
            return back()->withErrors([
                'login' => 'This account has been suspended. Please contact patient support.',
            ]);
        }

        if ($user->is_mfa_active) {
            $request->session()->put('auth.mfa_user_id', $user->id);
            return redirect()->route('auth.mfa');
        }

        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        return redirect()->intended(route('today'))->with('success', 'Signed in successfully.');
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('info', 'You have been signed out.');
    }
}

