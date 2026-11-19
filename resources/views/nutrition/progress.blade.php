<x-layouts.patient>
    <x-slot:title>Nutrition Progress - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div>
            <a href="{{ route('nutrition.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Nutrition</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">7-Day Progress & Trends</h1>
            <p class="text-sm text-gray-500">Weekly intake trends for daily calories and hydration volume.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Calorie Intake Trend -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h3 class="text-base font-bold text-gray-900 mb-1">Daily Calorie Intake (Last 7 Days)</h3>
                <p class="text-xs text-gray-400 mb-6">Bar heights reflect daily recorded calories.</p>

                <div class="flex items-end gap-3 h-48 pt-6 px-2 border-b border-gray-200">
                    @foreach($pastDays as $day)
                        @php
                            $heightPercent = min(100, max(5, round(($day['calories'] / 3000) * 100)));
                        @endphp
                        <div class="flex-1 flex flex-col items-center gap-1 group relative">
                            <div class="w-full rounded-t-lg bg-emerald-500 group-hover:bg-emerald-600 transition" style="height: {{ $heightPercent }}%"></div>
                            <span class="text-[10px] text-gray-500 truncate mt-1">{{ explode(',', $day['date'])[0] }}</span>
                            <div class="absolute -top-7 hidden group-hover:block bg-gray-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap z-10">
                                {{ number_format($day['calories']) }} kcal
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Hydration Trend -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h3 class="text-base font-bold text-gray-900 mb-1">Daily Hydration (Last 7 Days)</h3>
                <p class="text-xs text-gray-400 mb-6">Water volume consumed against 2,500 ml target.</p>

                <div class="flex items-end gap-3 h-48 pt-6 px-2 border-b border-gray-200">
                    @foreach($pastDays as $day)
                        @php
                            $heightPercent = min(100, max(5, round(($day['water'] / 3000) * 100)));
                        @endphp
                        <div class="flex-1 flex flex-col items-center gap-1 group relative">
                            <div class="w-full rounded-t-lg bg-sky-500 group-hover:bg-sky-600 transition" style="height: {{ $heightPercent }}%"></div>
                            <span class="text-[10px] text-gray-500 truncate mt-1">{{ explode(',', $day['date'])[0] }}</span>
                            <div class="absolute -top-7 hidden group-hover:block bg-gray-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap z-10">
                                {{ number_format($day['water']) }} ml
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <!-- Tabular Breakdown -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <h3 class="text-base font-bold text-gray-900">Summary Data Table</h3>
            </div>
            <div class="divide-y divide-gray-100">
                @foreach($pastDays as $day)
                    <div class="p-4 sm:px-6 flex items-center justify-between">
                        <div class="text-sm font-bold text-gray-900">{{ $day['date'] }}</div>
                        <div class="flex items-center gap-6 text-xs">
                            <div>Calories: <strong class="text-emerald-600 font-bold">{{ number_format($day['calories']) }} kcal</strong></div>
                            <div>Water: <strong class="text-sky-600 font-bold">{{ number_format($day['water']) }} ml</strong></div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</x-layouts.patient>

