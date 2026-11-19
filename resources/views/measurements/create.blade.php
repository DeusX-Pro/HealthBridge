<x-layouts.patient>
    <x-slot:title>Log Vitals - HealthBridge</x-slot:title>

    <div class="max-w-xl mx-auto space-y-6" x-data="{ selectedType: '{{ old('measurement_type', 'WEIGHT') }}' }">
        <div>
            <a href="{{ route('measurements.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Vitals</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-2">Log Health Measurement</h1>
        </div>

        <form method="POST" action="{{ route('measurements.store') }}" class="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            @csrf

            <div>
                <label for="measurement_type" class="block text-sm font-medium text-gray-700">Measurement Type</label>
                <select id="measurement_type" name="measurement_type" x-model="selectedType" required
                        class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                    @foreach ($types as $k => $info)
                        <option value="{{ $k }}" data-unit="{{ $info['defaultUnit'] }}">{{ $info['name'] }} ({{ $info['defaultUnit'] }})</option>
                    @endforeach
                </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="value" class="block text-sm font-medium text-gray-700">
                        <span x-text="selectedType === 'BLOOD_PRESSURE' ? 'Systolic (Top)' : 'Reading Value'">Reading Value</span>
                    </label>
                    <input id="value" name="value" type="number" step="0.1" required value="{{ old('value') }}" placeholder="e.g. 70"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>

                <div x-show="selectedType === 'BLOOD_PRESSURE'">
                    <label for="value2" class="block text-sm font-medium text-gray-700">Diastolic (Bottom)</label>
                    <input id="value2" name="value2" type="number" step="0.1" value="{{ old('value2') }}" placeholder="e.g. 80"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>

                <div x-show="selectedType !== 'BLOOD_PRESSURE'">
                    <label for="unit" class="block text-sm font-medium text-gray-700">Unit</label>
                    <input id="unit" name="unit" type="text" required value="{{ old('unit', 'kg') }}"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="measured_at" class="block text-sm font-medium text-gray-700">Date & Time</label>
                    <input id="measured_at" name="measured_at" type="datetime-local" required value="{{ old('measured_at', now()->format('Y-m-d\TH:i')) }}"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
                <div>
                    <label for="context" class="block text-sm font-medium text-gray-700">Context (Optional)</label>
                    <input id="context" name="context" type="text" value="{{ old('context') }}" placeholder="Fasting, post-workout, resting"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('measurements.index') }}" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700">Save Measurement</button>
            </div>
        </form>
    </div>
</x-layouts.patient>

