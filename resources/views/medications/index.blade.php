<x-layouts.patient>
    <x-slot:title>Medications - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Medications & Dose Tracking</h1>
                <p class="text-sm text-gray-500">Manage prescriptions, over-the-counter supplements, and log daily scheduled doses.</p>
            </div>
            <a href="{{ route('medications.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Medication
            </a>
        </div>

        <!-- Today's Schedule Card -->
        <div class="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
            <h2 class="text-base font-bold text-gray-900 mb-4">Today's Dose Schedule</h2>
            @if (empty($schedule))
                <div class="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
                    No medication doses scheduled for today.
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach ($schedule as $item)
                        <div class="py-3 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <span class="font-mono text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-700">{{ $item['time'] }}</span>
                                <div>
                                    <a href="{{ route('medications.show', $item['medication']->id) }}" class="text-sm font-bold text-gray-900 hover:text-emerald-600">{{ $item['medication']->name }}</a>
                                    <p class="text-xs text-gray-500">{{ $item['medication']->dose }}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                @if ($item['status'] === 'TAKEN')
                                    <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                                        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                        Taken
                                    </span>
                                    <form method="POST" action="{{ route('medications.doses.undo', $item['medication']->id) }}">
                                        @csrf
                                        @method('DELETE')
                                        <input type="hidden" name="time" value="{{ $item['time'] }}">
                                        <button type="submit" class="text-xs text-gray-400 hover:text-gray-600">Undo</button>
                                    </form>
                                @elseif ($item['status'] === 'SKIPPED')
                                    <span class="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-bold text-gray-700">Skipped</span>
                                    <form method="POST" action="{{ route('medications.doses.undo', $item['medication']->id) }}">
                                        @csrf
                                        @method('DELETE')
                                        <input type="hidden" name="time" value="{{ $item['time'] }}">
                                        <button type="submit" class="text-xs text-gray-400 hover:text-gray-600">Undo</button>
                                    </form>
                                @else
                                    <form method="POST" action="{{ route('medications.doses.log', $item['medication']->id) }}" class="inline">
                                        @csrf
                                        <input type="hidden" name="time" value="{{ $item['time'] }}">
                                        <input type="hidden" name="status" value="TAKEN">
                                        <button type="submit" class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700">Take</button>
                                    </form>
                                    <form method="POST" action="{{ route('medications.doses.log', $item['medication']->id) }}" class="inline">
                                        @csrf
                                        <input type="hidden" name="time" value="{{ $item['time'] }}">
                                        <input type="hidden" name="status" value="SKIPPED">
                                        <button type="submit" class="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200">Skip</button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Active Medications List -->
        <div class="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm space-y-4">
            <h2 class="text-base font-bold text-gray-900">Active Prescriptions & Regimens</h2>

            @if ($activeMedications->isEmpty())
                <p class="text-sm text-gray-500">No active medications registered.</p>
            @else
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    @foreach ($activeMedications as $med)
                        <div class="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                            <div>
                                <h3 class="text-sm font-bold text-gray-900">{{ $med->name }}</h3>
                                <p class="text-xs text-gray-500">{{ $med->dose }} &bull; Times: {{ implode(', ', $med->dose_times ?? []) }}</p>
                                <p class="text-[10px] text-gray-400 mt-1">Started {{ $med->start_date->format('M d, Y') }}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <a href="{{ route('medications.show', $med->id) }}" class="text-xs font-semibold text-emerald-600 hover:underline">View</a>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

