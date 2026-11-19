<x-layouts.guest>
    <x-slot:title>Create Patient Account - HealthBridge</x-slot:title>
    <x-slot:heading>Create your Encrypted Health Account</x-slot:heading>

    <form method="POST" action="{{ route('register.store') }}" class="space-y-5">
        @csrf

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
                <input id="first_name" name="first_name" type="text" required value="{{ old('first_name') }}"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('first_name') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
                <input id="last_name" name="last_name" type="text" required value="{{ old('last_name') }}"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('last_name') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input id="email" name="email" type="email" required value="{{ old('email') }}"
                   placeholder="you@example.com"
                   class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            @error('email') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="phone_e164" class="block text-sm font-medium text-gray-700">Phone Number (E.164)</label>
            <input id="phone_e164" name="phone_e164" type="tel" required value="{{ old('phone_e164') }}"
                   placeholder="+2348012345678"
                   class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            @error('phone_e164') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input id="date_of_birth" name="date_of_birth" type="date" required value="{{ old('date_of_birth') }}"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('date_of_birth') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="biological_sex" class="block text-sm font-medium text-gray-700">Biological Sex</label>
                <select id="biological_sex" name="biological_sex" required
                        class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                    <option value="">Select...</option>
                    <option value="FEMALE" {{ old('biological_sex') === 'FEMALE' ? 'selected' : '' }}>Female (Enables Cycle Shield)</option>
                    <option value="MALE" {{ old('biological_sex') === 'MALE' ? 'selected' : '' }}>Male (Enables Men's Health)</option>
                </select>
                @error('biological_sex') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input id="password" name="password" type="password" required
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('password') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input id="password_confirmation" name="password_confirmation" type="password" required
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            </div>
        </div>

        <!-- Health Interests -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What areas would you like on your dashboard?</label>
            <div class="grid grid-cols-2 gap-2 text-xs">
                @foreach ($availableInterests as $interest)
                    <label class="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" name="interests[]" value="{{ $interest }}" class="rounded text-emerald-600 focus:ring-emerald-500">
                        <span>{{ $interest }}</span>
                    </label>
                @endforeach
            </div>
        </div>

        <!-- Legal Terms Agreement -->
        <div class="space-y-2 pt-2 border-t border-gray-100">
            <p class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Required Legal Consents</p>
            @foreach ($legalDocuments as $doc)
                <div class="flex items-start">
                    <input id="doc_{{ $doc->id }}" name="accepted_documents[]" value="{{ $doc->id }}" type="checkbox" required
                           class="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
                    <label for="doc_{{ $doc->id }}" class="ml-2 block text-xs text-gray-600">
                        I agree to the <a href="{{ route('legal.show', $doc->slug) }}" target="_blank" class="font-semibold text-emerald-600 hover:underline">{{ $doc->title }} (v{{ $doc->version }})</a>
                    </label>
                </div>
            @endforeach
            @error('accepted_documents') <p class="text-xs text-rose-600">{{ $message }}</p> @enderror
        </div>

        <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all">
                Create Free Account
            </button>
        </div>

        <div class="pt-2 text-center text-sm text-gray-500 border-t border-gray-100">
            Already have an account?
            <a href="{{ route('login') }}" class="font-semibold text-emerald-600 hover:text-emerald-500">Sign in instead</a>
        </div>
    </form>
</x-layouts.guest>

