<x-layouts.guest>
    <x-slot:title>Two-Factor Challenge - HealthBridge</x-slot:title>
    <x-slot:heading>Two-Factor Authentication</x-slot:heading>

    <div class="mb-4 text-center">
        <p class="text-sm text-gray-600">Enter the 6-digit security code from your authenticator app to complete sign-in.</p>
    </div>

    <form method="POST" action="{{ route('auth.mfa.verify') }}" class="space-y-6">
        @csrf

        <div>
            <label for="code" class="block text-sm font-medium text-gray-700 text-center">Authenticator Code</label>
            <div class="mt-2 flex justify-center">
                <input id="code" name="code" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="6" autofocus required
                       placeholder="123456"
                       class="block w-48 text-center tracking-widest text-2xl font-mono rounded-xl border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
            </div>
            @error('code')
                <p class="mt-2 text-center text-sm text-rose-600">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:from-green-700 hover:to-emerald-700 transition-all">
                Verify and Continue
            </button>
        </div>

        <div class="text-center">
            <a href="{{ route('login') }}" class="text-xs text-gray-500 hover:text-gray-700">&larr; Back to login</a>
        </div>
    </form>
</x-layouts.guest>

