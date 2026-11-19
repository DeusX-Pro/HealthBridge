<x-layouts.patient>
    <x-slot:title>Security & Authentication - HealthBridge</x-slot:title>

    <div class="space-y-6 max-w-4xl mx-auto">
        <div>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Security & Authentication</h1>
            <p class="text-sm text-gray-500">Protect your encrypted vault with strong credentials and RFC 6238 Two-Factor Authentication.</p>
        </div>

        <!-- Settings Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-gray-200 pb-3">
            <a href="{{ route('settings.index') }}" class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Profile & Health Interests
            </a>
            <a href="{{ route('settings.security') }}" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm">
                Security & Two-Factor
            </a>
            <a href="{{ route('settings.notifications') }}" class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Notifications & Schedules
            </a>
        </div>

        <!-- Two-Factor Authentication (TOTP) Card -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                    <div class="flex items-center gap-2">
                        <h2 class="text-base font-bold text-gray-900">Two-Factor Authentication (TOTP)</h2>
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold {{ $user->is_mfa_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200' }}">
                            {{ $user->is_mfa_active ? 'Active & Protected' : 'Not Configured' }}
                        </span>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Requires an authenticator app (Google Authenticator, 1Password, Authy) upon sign-in.</p>
                </div>
            </div>

            @if($user->is_mfa_active)
                <div class="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        </div>
                        <div>
                            <div class="text-sm font-bold text-emerald-900">Your account is secured with 2FA</div>
                            <div class="text-xs text-emerald-700 mt-0.5">Factor type: Time-Based One-Time Password (TOTP)</div>
                        </div>
                    </div>

                    <!-- Disable MFA form -->
                    <form action="{{ route('settings.security.mfa.disable') }}" method="POST" onsubmit="return confirm('Are you sure you want to disable Two-Factor Authentication? This decreases account security.');" class="flex items-center gap-2">
                        @csrf
                        <input type="password" name="password" required placeholder="Enter password to disable" class="rounded-xl border border-gray-300 px-3 py-1.5 text-xs">
                        <button type="submit" class="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm">
                            Disable 2FA
                        </button>
                    </form>
                </div>
            @else
                <!-- Setup MFA Wizard -->
                <div class="space-y-5">
                    <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Step 1: Add to your Authenticator App</h3>
                        <p class="text-xs text-gray-700">Open Google Authenticator, Authy, or 1Password and scan or enter this setup key:</p>

                        <div class="p-3 bg-white rounded-xl border border-gray-200 font-mono text-xs text-center font-bold text-emerald-700 tracking-widest select-all">
                            {{ $setupSecret }}
                        </div>
                        <p class="text-[11px] text-gray-400">Authenticator URI: <code class="text-gray-600 break-all">{{ $otpAuthUrl }}</code></p>
                    </div>

                    <form action="{{ route('settings.security.mfa.activate') }}" method="POST" class="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
                        @csrf
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Step 2: Verify 6-digit Code</h3>
                        <div class="flex items-center gap-3">
                            <input type="text" name="code" required maxlength="6" placeholder="123456"
                                   class="w-40 text-center font-mono text-lg font-bold tracking-widest rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                            <button type="submit" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                                Verify & Activate 2FA
                            </button>
                        </div>
                        @error('code') <p class="text-xs text-rose-600">{{ $message }}</p> @enderror
                    </form>
                </div>
            @endif
        </div>

        <!-- Change Password Card -->
        <form action="{{ route('settings.password') }}" method="POST" class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-5">
            @csrf
            @method('PUT')

            <div class="border-b border-gray-100 pb-4">
                <h2 class="text-base font-bold text-gray-900">Change Password</h2>
                <p class="text-xs text-gray-400 mt-0.5">Ensure your new password contains at least 8 characters with a mix of letters and numbers.</p>
            </div>

            <div>
                <label for="current_password" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Password</label>
                <input type="password" id="current_password" name="current_password" required
                       class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                @error('current_password') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="new_password" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                    <input type="password" id="new_password" name="new_password" required minlength="8"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('new_password') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label for="new_password_confirmation" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Confirm New Password</label>
                    <input type="password" id="new_password_confirmation" name="new_password_confirmation" required minlength="8"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                </div>
            </div>

            <div class="pt-3 flex justify-end">
                <button type="submit" class="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm">
                    Update Password
                </button>
            </div>
        </form>
    </div>
</x-layouts.patient>

