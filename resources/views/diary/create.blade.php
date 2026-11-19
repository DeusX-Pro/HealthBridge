<x-layouts.patient>
    <x-slot:title>New Diary Entry - HealthBridge</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('diary.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Diary</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-2">New Health Diary Entry</h1>
            <p class="text-sm text-gray-500">Record a doctor visit, procedure, symptom, or private wellness note.</p>
        </div>

        <form method="POST" action="{{ route('diary.store') }}" class="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="entry_type" class="block text-sm font-medium text-gray-700">Entry Type</label>
                    <select id="entry_type" name="entry_type" required
                            class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                        @foreach ($entryTypes as $type => $label)
                            <option value="{{ $type }}" {{ old('entry_type') === $type ? 'selected' : '' }}>{{ $label }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="entry_date" class="block text-sm font-medium text-gray-700">Date</label>
                    <input id="entry_date" name="entry_date" type="date" required value="{{ old('entry_date', now()->toDateString()) }}"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
            </div>

            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                <input id="title" name="title" type="text" required value="{{ old('title') }}" placeholder="e.g. Annual Cardiology Checkup or Mild Migraine"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('title') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="clinician" class="block text-sm font-medium text-gray-700">Doctor / Clinician (Optional)</label>
                    <input id="clinician" name="clinician" type="text" value="{{ old('clinician') }}" placeholder="e.g. Dr. Jane Smith"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
                <div>
                    <label for="facility" class="block text-sm font-medium text-gray-700">Facility / Clinic (Optional)</label>
                    <input id="facility" name="facility" type="text" value="{{ old('facility') }}" placeholder="e.g. St. Jude Hospital"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
            </div>

            <div>
                <label for="notes" class="block text-sm font-medium text-gray-700">Clinical Details & Personal Notes</label>
                <textarea id="notes" name="notes" rows="5" placeholder="Write observations, doctor recommendations, symptoms, or medication instructions..."
                          class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">{{ old('notes') }}</textarea>
            </div>

            <div>
                <label for="tags" class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input id="tags" name="tags" type="text" value="{{ old('tags') }}" placeholder="heart, checkup, routine"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('diary.index') }}" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700">Save Entry</button>
            </div>
        </form>
    </div>
</x-layouts.patient>

