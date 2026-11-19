<x-layouts.guest>
    <x-slot:title>Sign In - HealthBridge</x-slot:title>
    <x-slot:heading>Sign in to your Health Vault</x-slot:heading>

    <form method="POST" action="{{ route('login.store') }}" class="space-y-6">
        @csrf

        <div>
            <label for="login" class="block text-sm font-medium text-gray-700">Email or Phone Number</label>
            <div class="mt-1">
                <input id="login" name="login" type="text" autocomplete="username" required
                       value="{{ old('login') }}"
                       placeholder="e.g. user@example.com or +234..."
                       class="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            </div>
            @error('login')
                <p class="mt-2 text-sm text-rose-600">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <a href="{{ route('password.request') }}" class="text-sm font-semibold text-emerald-600 hover:text-emerald-500">Forgot password?</a>
            </div>
            <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="current-password" required
                       class="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            </div>
            @error('password')
                <p class="mt-2 text-sm text-rose-600">{{ $message }}</p>
            @enderror
        </div>

        <div class="flex items-center">
            <input id="remember" name="remember" type="checkbox"
                   class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
            <label for="remember" class="ml-2 block text-sm text-gray-900">Keep me signed in</label>
        </div>

        <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all">
                Sign In
            </button>
        </div>

        <div class="pt-4 text-center text-sm text-gray-500 border-t border-gray-100">
            Don't have an account?
            <a href="{{ route('register') }}" class="font-semibold text-emerald-600 hover:text-emerald-500">Create one now</a>
        </div>
    </form>
</x-layouts.guest>

