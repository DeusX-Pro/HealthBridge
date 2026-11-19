<x-layouts.guest>
    <x-slot:title>Forgot Password - HealthBridge</x-slot:title>
    <x-slot:heading>Reset your Password</x-slot:heading>

    <div class="mb-4">
        <p class="text-sm text-gray-600">Enter your registered email address and we will generate a secure reset link.</p>
    </div>

    @if (session('demo_reset_link'))
        <div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 break-all">
            <strong>Development Link:</strong> <a href="{{ session('demo_reset_link') }}" class="underline">{{ session('demo_reset_link') }}</a>
        </div>
    @endif

    <form method="POST" action="{{ route('password.email') }}" class="space-y-6">
        @csrf

        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <div class="mt-1">
                <input id="email" name="email" type="email" required value="{{ old('email') }}"
                       class="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            </div>
            @error('email')
                <p class="mt-2 text-sm text-rose-600">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:from-green-700 hover:to-emerald-700 transition-all">
                Send Reset Link
            </button>
        </div>

        <div class="text-center text-sm text-gray-500">
            <a href="{{ route('login') }}" class="font-semibold text-emerald-600 hover:text-emerald-500">&larr; Return to Sign In</a>
        </div>
    </form>
</x-layouts.guest>

