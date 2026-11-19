<x-layouts.public>
    <x-slot:title>Unlock Shared Medical Records - HealthBridge</x-slot:title>

    <div class="max-w-md mx-auto my-12">
        <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
            <div class="text-center">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h1 class="text-xl font-bold text-gray-900">Protected Clinical Records</h1>
                <p class="text-xs text-gray-500 mt-1">
                    You have been authorized by <strong class="text-gray-900">{{ $link->user->name }}</strong> to review their health records.
                </p>
            </div>

            <form action="{{ route('public.view.unlock', ['token' => $token]) }}" method="POST" class="space-y-4">
                @csrf
                <div>
                    <label for="passcode" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Enter Secret Passcode</label>
                    <input type="password" id="passcode" name="passcode" required autofocus placeholder="Passcode provided by the patient"
                           class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('passcode')
                        <p class="text-xs text-rose-600 mt-1.5">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition">
                    Unlock Records
                </button>
            </form>

            <div class="border-t border-gray-100 pt-4 text-center text-[11px] text-gray-400">
                Authorized for: <strong class="text-gray-600">{{ $link->recipient_name }}</strong><br>
                Link valid until: {{ $link->expires_at->format('M d, Y h:i A') }}
            </div>
        </div>
    </div>
</x-layouts.public>

