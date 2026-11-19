<x-layouts.patient>
    <x-slot:title>Cycle Calendar - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <a href="{{ route('cycle.index') }}" class="text-xs font-semibold text-rose-600 hover:underline">&larr; Back to Cycle Overview</a>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Cycle Calendar</h1>
                <p class="text-sm text-gray-500">Monthly overview of menstrual flow, symptoms, and cycle phases.</p>
            </div>

            @php
                $prevMonth = $startOfMonth->copy()->subMonth()->format('Y-m');
                $nextMonth = $startOfMonth->copy()->addMonth()->format('Y-m');
            @endphp
            <div class="flex items-center gap-3">
                <a href="{{ route('cycle.calendar', ['month' => $prevMonth]) }}" class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </a>
                <span class="text-base font-bold text-gray-900 min-w-32 text-center">{{ $startOfMonth->format('F Y') }}</span>
                <a href="{{ route('cycle.calendar', ['month' => $nextMonth]) }}" class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>

        <!-- Monthly Calendar Grid -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-4 sm:p-6">
            <div class="grid grid-cols-7 gap-px text-center text-xs font-semibold text-gray-500 border-b border-gray-100 pb-3 mb-3">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>

            <div class="grid grid-cols-7 gap-2">
                @php
                    $startDayOfWeek = $startOfMonth->dayOfWeek; // 0 for Sunday
                    $daysInMonth = $startOfMonth->daysInMonth;
                @endphp

                @for($i = 0; $i < $startDayOfWeek; $i++)
                    <div class="min-h-24 p-2 bg-gray-50/50 rounded-xl border border-transparent"></div>
                @endfor

                @for($day = 1; $day <= $daysInMonth; $day++)
                    @php
                        $dateStr = $startOfMonth->copy()->day($day)->toDateString();
                        $log = $logs->get($dateStr);
                        $isToday = $dateStr === now()->toDateString();
                    @endphp
                    <div class="min-h-24 p-2.5 rounded-xl border {{ $isToday ? 'border-rose-400 bg-rose-50/20 ring-1 ring-rose-400' : 'border-gray-100 hover:border-gray-200' }} flex flex-col justify-between">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold {{ $isToday ? 'text-rose-700' : 'text-gray-800' }}">{{ $day }}</span>
                            @if($log && in_array($log->flow_intensity, ['MEDIUM', 'HEAVY']))
                                <span class="w-2.5 h-2.5 rounded-full bg-rose-500" title="Period: {{ $log->flow_intensity }}"></span>
                            @elseif($log && in_array($log->flow_intensity, ['LIGHT', 'SPOTTING']))
                                <span class="w-2.5 h-2.5 rounded-full bg-pink-300" title="Flow: {{ $log->flow_intensity }}"></span>
                            @endif
                        </div>

                        @if($log)
                            <div class="space-y-1 my-1">
                                @if($log->bbt_celsius)
                                    <div class="text-[10px] text-amber-700 font-mono">{{ $log->bbt_celsius }}°C</div>
                                @endif
                                @if($log->cervical_mucus)
                                    <div class="text-[9px] text-teal-600 truncate">{{ $log->cervical_mucus }}</div>
                                @endif
                                @if($log->symptoms && count($log->symptoms) > 0)
                                    <div class="text-[9px] text-purple-600">{{ count($log->symptoms) }} symptom(s)</div>
                                @endif
                            </div>
                        @else
                            <div></div>
                        @endif

                        <div class="text-right">
                            <span class="text-[9px] text-gray-300">&nbsp;</span>
                        </div>
                    </div>
                @endfor
            </div>
        </div>
    </div>
</x-layouts.patient>

