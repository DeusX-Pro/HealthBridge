<x-layouts.patient>
    <x-slot:title>Edit {{ $medication->name }} - HealthBridge</x-slot:title>

    <div class="max-w-xl mx-auto space-y-6">
        <div>
            <a href="{{ route('medications.show', $medication->id) }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Medication Details</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-2">Edit Medication</h1>
            <p class="text-sm text-gray-500">Update dosage strength, administration instructions, or schedule.</p>
        </div>

        <form method="POST" action="{{ route('medications.update', $medication->id) }}" class="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            @csrf
            @method('PUT')

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Medication Name</label>
                <input id="name" name="name" type="text" required value="{{ old('name', $medication->name) }}" placeholder="e.g. Amoxicillin or Vitamin D3"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('name') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="dose" class="block text-sm font-medium text-gray-700">Dosage Strength / Form</label>
                <input id="dose" name="dose" type="text" required value="{{ old('dose', $medication->dose) }}" placeholder="e.g. 500mg tablet or 2 drops"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('dose') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Dose Times of Day</label>
                @php
                    $times = old('dose_times', $medication->dose_times ?? ['08:00']);
                @endphp
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3" id="dose-times-container">
                    @foreach($times as $index => $t)
                        <input type="time" name="dose_times[]" required value="{{ $t }}" class="rounded-xl border border-gray-300 px-3 py-2 text-xs">
                    @endforeach
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="start_date" class="block text-sm font-medium text-gray-700">Start Date</label>
                    <input id="start_date" name="start_date" type="date" required value="{{ old('start_date', $medication->start_date ? \Carbon\Carbon::parse($medication->start_date)->toDateString() : '') }}"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
                <div>
                    <label for="end_date" class="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                    <input id="end_date" name="end_date" type="date" value="{{ old('end_date', $medication->end_date ? \Carbon\Carbon::parse($medication->end_date)->toDateString() : '') }}"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
            </div>

            <div>
                <label for="instructions" class="block text-sm font-medium text-gray-700">Instructions & Notes</label>
                <textarea id="instructions" name="instructions" rows="3" placeholder="Take with food, avoid citrus..."
                          class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">{{ old('instructions', $medication->instructions) }}</textarea>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('medications.show', $medication->id) }}" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700">Save Changes</button>
            </div>
        </form>
    </div>
</x-layouts.patient>

