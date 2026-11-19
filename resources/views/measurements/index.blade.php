<x-layouts.patient>
    <x-slot:title>Vitals & Measurements - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Vitals & Body Measurements</h1>
                <p class="text-sm text-gray-500">Track weight, blood pressure, glucose, temperature, and resting heart rate over time.</p>
            </div>
            <a href="{{ route('measurements.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Log New Reading
            </a>
        </div>

        <!-- Metric Switcher Pills -->
        <div class="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            @foreach ($types as $k => $info)
                <a href="{{ route('measurements.index', ['type' => $k]) }}"
                   class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors {{ $type === $k ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">
                    {{ $info['name'] }}
                </a>
            @endforeach
        </div>

        <!-- Trend Graph Card -->
        @if ($chartData->isNotEmpty())
            <div class="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h2 class="text-base font-bold text-gray-900">{{ $types[$type]['name'] }} Trend</h2>
                        <p class="text-xs text-gray-500">Recent readings history</p>
                    </div>
                    @if (isset($latestValues[$type]))
                        <div class="text-right">
                            <span class="text-xs text-gray-400">Latest</span>
                            <p class="text-xl font-black text-gray-900">
                                {{ $latestValues[$type]->value }}
                                @if ($latestValues[$type]->value2) / {{ $latestValues[$type]->value2 }} @endif
                                <span class="text-xs font-normal text-gray-500">{{ $latestValues[$type]->unit }}</span>
                            </p>
                        </div>
                    @endif
                </div>

                <!-- Simple SVG Data Trend Representation -->
                <div class="h-32 flex items-end gap-2 pt-4 px-2 border-b border-gray-200">
                    @php
                        $maxVal = $chartData->max('value') ?: 100;
                        $minVal = $chartData->min('value') ?: 0;
                        $range = max(1, $maxVal - $minVal);
                    @endphp
                    @foreach ($chartData as $pt)
                        @php
                            $heightPercent = max(15, min(100, round((($pt['value'] - $minVal) / $range) * 85 + 15)));
                        @endphp
                        <div class="flex-1 flex flex-col items-center group relative">
                            <div class="absolute -top-7 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap transition-opacity pointer-events-none">
                                {{ $pt['value'] }}{{ $pt['value2'] ? '/' . $pt['value2'] : '' }} ({{ $pt['date'] }})
                            </div>
                            <div class="w-full bg-emerald-500 rounded-t group-hover:bg-emerald-600 transition-all" style="height: {{ $heightPercent }}%;"></div>
                            <span class="text-[9px] text-gray-400 mt-1 truncate max-w-full">{{ $pt['date'] }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        <!-- Readings Log Table -->
        <div class="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-4 border-b border-gray-100">
                <h3 class="text-sm font-bold text-gray-900">History Log</h3>
            </div>

            @if ($measurements->isEmpty())
                <div class="p-8 text-center text-sm text-gray-500">
                    No readings logged for {{ $types[$type]['name'] }} yet.
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach ($measurements as $m)
                        <div class="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div>
                                <span class="text-base font-bold text-gray-900">
                                    {{ $m->value }}
                                    @if ($m->value2) / {{ $m->value2 }} @endif
                                    <span class="text-xs font-normal text-gray-500">{{ $m->unit }}</span>
                                </span>
                                @if ($m->context)
                                    <span class="ml-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{{ $m->context }}</span>
                                @endif
                                <p class="text-xs text-gray-400 mt-0.5">{{ $m->measured_at->format('M d, Y - h:i A') }}</p>
                            </div>

                            <form method="POST" action="{{ route('measurements.destroy', $m->id) }}" onsubmit="return confirm('Delete this reading?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-xs text-gray-400 hover:text-rose-600">Delete</button>
                            </form>
                        </div>
                    @endforeach
                </div>

                <div class="p-4 border-t border-gray-100">
                    {{ $measurements->appends(['type' => $type])->links() }}
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

