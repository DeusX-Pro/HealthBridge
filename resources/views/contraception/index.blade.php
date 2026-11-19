<x-layouts.patient>
    <x-slot:title>Contraception Management - HealthBridge</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('cycle.index') }}" class="text-xs font-semibold text-rose-600 hover:underline">&larr; Back to Cycle Overview</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Contraception Plan</h1>
            <p class="text-sm text-gray-500">Track birth control methods, replacement schedules, and daily intake reminders.</p>
        </div>

        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <form action="{{ route('contraception.update') }}" method="POST" class="space-y-6">
                @csrf
                @method('PUT')

                <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Primary Method</label>
                    <div class="space-y-2">
                        @foreach($methods as $key => $label)
                            <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer {{ old('method', $plan->method) === $key ? 'bg-rose-50/50 border-rose-300 ring-1 ring-rose-300' : '' }}">
                                <input type="radio" name="method" value="{{ $key }}" class="text-rose-600 focus:ring-rose-500" {{ old('method', $plan->method) === $key ? 'checked' : '' }}>
                                <span class="text-sm font-medium text-gray-900">{{ $label }}</span>
                            </label>
                        @endforeach
                    </div>
                </div>

                <div>
                    <label for="start_date" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Start / Insertion Date</label>
                    <input type="date" id="start_date" name="start_date" value="{{ old('start_date', $plan->start_date ? \Carbon\Carbon::parse($plan->start_date)->toDateString() : '') }}"
                           class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500">
                </div>

                <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <input type="checkbox" id="reminder_active" name="reminder_active" value="1" class="rounded text-rose-600 focus:ring-rose-500 w-4 h-4" {{ old('reminder_active', $plan->reminder_active) ? 'checked' : '' }}>
                    <label for="reminder_active" class="text-xs font-medium text-gray-700">
                        Enable daily taking / replacement reminder notifications
                    </label>
                </div>

                <div class="pt-4 flex justify-end">
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition">
                        Update Contraception Plan
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-layouts.patient>

