<x-layouts.patient>
    <x-slot:title>Account Settings - HealthBridge</x-slot:title>

    <div class="space-y-6 max-w-4xl mx-auto">
        <div>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Account & Security Settings</h1>
            <p class="text-sm text-gray-500">Manage your patient demographics, privacy credentials, and notification schedules.</p>
        </div>

        <!-- Settings Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-gray-200 pb-3">
            <a href="{{ route('settings.index') }}" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm">
                Profile & Health Interests
            </a>
            <a href="{{ route('settings.security') }}" class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Security & Two-Factor
            </a>
            <a href="{{ route('settings.notifications') }}" class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Notifications & Schedules
            </a>
        </div>

        <!-- Profile Form Card -->
        <form action="{{ route('settings.profile') }}" method="POST" class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            @csrf
            @method('PUT')

            <div class="border-b border-gray-100 pb-4">
                <h2 class="text-base font-bold text-gray-900">Demographic Information</h2>
                <p class="text-xs text-gray-400 mt-0.5">Used by clinical algorithms for age-specific and sex-specific reference ranges.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="first_name" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">First Name</label>
                    <input type="text" id="first_name" name="first_name" required value="{{ old('first_name', $user->first_name) }}"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('first_name') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label for="last_name" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Name</label>
                    <input type="text" id="last_name" name="last_name" required value="{{ old('last_name', $user->last_name) }}"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('last_name') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="email" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input type="email" id="email" name="email" required value="{{ old('email', $user->email) }}"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('email') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label for="phone_e164" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number (E.164 format)</label>
                    <input type="text" id="phone_e164" name="phone_e164" required value="{{ old('phone_e164', $user->phone_e164) }}"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('phone_e164') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="date_of_birth" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                    <input type="date" id="date_of_birth" name="date_of_birth" required value="{{ old('date_of_birth', $user->date_of_birth ? $user->date_of_birth->toDateString() : '') }}"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @error('date_of_birth') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Biological Sex (Immutable)</label>
                    <div class="flex items-center h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700">
                        {{ $user->sex }} (Assigned for clinical reference ranges)
                    </div>
                </div>
            </div>

            <!-- Health Interests -->
            <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Health Interests & Daily Tracking Topics</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    @foreach($allInterests as $item)
                        <label class="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" name="interests[]" value="{{ $item }}" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" {{ in_array($item, $interests) ? 'checked' : '' }}>
                            <span class="text-xs font-medium text-gray-800">{{ $item }}</span>
                        </label>
                    @endforeach
                </div>
            </div>

            <div class="pt-4 flex justify-end border-t border-gray-100">
                <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Save Profile Changes
                </button>
            </div>
        </form>
    </div>
</x-layouts.patient>

