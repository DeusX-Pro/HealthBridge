<x-layouts.public>
    <x-slot:title>Unlock Clinician Upload Gateway - HealthBridge</x-slot:title>

    <div class="max-w-md mx-auto my-12">
        <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
            <div class="text-center">
                <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                </div>
                <h1 class="text-xl font-bold text-gray-900">Clinician Upload Gateway</h1>
                <p class="text-xs text-gray-500 mt-1">
                    Upload medical records, visit summaries, or lab results directly into <strong class="text-gray-900">{{ $link->user->name }}</strong>'s vault.
                </p>
            </div>

            <form action="{{ route('public.add.unlock', ['token' => $token]) }}" method="POST" class="space-y-4">
                @csrf
                <div>
                    <label for="passcode" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Enter Upload Passcode</label>
                    <input type="password" id="passcode" name="passcode" required autofocus placeholder="Passcode provided by the patient"
                           class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                    @error('passcode')
                        <p class="text-xs text-rose-600 mt-1.5">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" class="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm transition">
                    Unlock Upload Portal
                </button>
            </form>

            <div class="border-t border-gray-100 pt-4 text-center text-[11px] text-gray-400">
                Created for: <strong class="text-gray-600">{{ $link->recipient_name }}</strong><br>
                Submissions: {{ $link->submissions_count }} of {{ $link->max_submissions }} allowed
            </div>
        </div>
    </div>
</x-layouts.public>

