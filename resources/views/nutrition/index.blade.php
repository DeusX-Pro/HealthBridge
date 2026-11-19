<x-layouts.patient>
    <x-slot:title>Nutrition & Hydration - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <!-- Top Sub-Navigation -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Nutrition & Hydration</h1>
                <p class="text-sm text-gray-500">Track macro-nutrients, daily caloric targets, and hydration logs.</p>
            </div>
            <div class="flex items-center gap-2">
                <a href="{{ route('nutrition.foods') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    Food Library
                </a>
                <a href="{{ route('nutrition.plans') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    Meal Plans
                </a>
                <a href="{{ route('nutrition.progress') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    Progress
                </a>
                <a href="{{ route('nutrition.profile') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm">
                    Targets & Profile
                </a>
            </div>
        </div>

        @if(!$profile)
            <div class="p-6 bg-amber-50 border border-amber-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h3 class="text-base font-bold text-amber-900">Configure Your Nutrition Targets</h3>
                    <p class="text-xs text-amber-700 mt-1">Set your health goals, activity level, and dietary preferences to calculate personalized Mifflin-St Jeor caloric and macronutrient targets.</p>
                </div>
                <a href="{{ route('nutrition.profile') }}" class="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Set Up Profile &rarr;
                </a>
            </div>
        @endif

        <!-- Day Selector & Calorie Summary Card -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Calorie & Macro Target Progress Card -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Caloric Budget</span>
                        <input type="date" value="{{ $date }}" onchange="window.location.href = '{{ route('nutrition.index') }}?date=' + this.value"
                               class="text-xs rounded-lg border border-gray-200 px-2.5 py-1 text-gray-700">
                    </div>

                    @php
                        $targetCalories = $targets ? ($targets['calories'] ?? $targets['target_kcal'] ?? 2000) : 0;
                        $kcalPercent = $targetCalories > 0 ? min(100, round(($totalKcal / $targetCalories) * 100)) : 0;
                    @endphp

                    <div class="mt-4 flex items-baseline gap-2">
                        <span class="text-4xl font-extrabold text-gray-900">{{ number_format($totalKcal) }}</span>
                        @if($targets)
                            <span class="text-sm font-semibold text-gray-400">/ {{ number_format($targetCalories) }} kcal</span>
                        @else
                            <span class="text-sm font-semibold text-gray-400">kcal consumed</span>
                        @endif
                    </div>

                    <div class="w-full bg-gray-100 rounded-full h-3 mt-3 overflow-hidden">
                        <div class="bg-emerald-500 h-3 rounded-full transition-all duration-500" style="width: {{ $kcalPercent }}%"></div>
                    </div>
                </div>

                <!-- Macros Breakdown -->
                <div class="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100 text-center">
                    <div>
                        <div class="text-[11px] font-semibold text-gray-400 uppercase">Protein</div>
                        <div class="text-lg font-extrabold text-emerald-600 mt-0.5">{{ number_format($totalProtein, 1) }}g</div>
                        @if($targets) <div class="text-[10px] text-gray-400">Target: {{ $targets['protein_g'] }}g</div> @endif
                    </div>
                    <div>
                        <div class="text-[11px] font-semibold text-gray-400 uppercase">Carbs</div>
                        <div class="text-lg font-extrabold text-amber-600 mt-0.5">{{ number_format($totalCarb, 1) }}g</div>
                        @if($targets) <div class="text-[10px] text-gray-400">Target: {{ $targets['carb_g'] }}g</div> @endif
                    </div>
                    <div>
                        <div class="text-[11px] font-semibold text-gray-400 uppercase">Fat</div>
                        <div class="text-lg font-extrabold text-rose-600 mt-0.5">{{ number_format($totalFat, 1) }}g</div>
                        @if($targets) <div class="text-[10px] text-gray-400">Target: {{ $targets['fat_g'] }}g</div> @endif
                    </div>
                </div>
            </div>

            <!-- Water Hydration Card -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hydration</span>
                        <span class="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">Target: 2,500 ml</span>
                    </div>

                    <div class="mt-4 flex items-baseline gap-2">
                        <span class="text-4xl font-extrabold text-sky-600">{{ number_format($totalWater) }}</span>
                        <span class="text-sm font-semibold text-gray-400">/ 2,500 ml</span>
                    </div>

                    @php
                        $waterPercent = min(100, round(($totalWater / 2500) * 100));
                    @endphp
                    <div class="w-full bg-gray-100 rounded-full h-3 mt-3 overflow-hidden">
                        <div class="bg-sky-500 h-3 rounded-full transition-all duration-500" style="width: {{ $waterPercent }}%"></div>
                    </div>
                </div>

                <!-- Quick Water Add -->
                <div class="mt-6 pt-6 border-t border-gray-100">
                    <div class="text-xs font-semibold text-gray-500 mb-2">Quick Add Water:</div>
                    <div class="flex gap-2">
                        <form action="{{ route('nutrition.water') }}" method="POST" class="flex-1">
                            @csrf
                            <input type="hidden" name="log_date" value="{{ $date }}">
                            <input type="hidden" name="amount_ml" value="250">
                            <button type="submit" class="w-full py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl border border-sky-200 transition">
                                +250 ml (Glass)
                            </button>
                        </form>
                        <form action="{{ route('nutrition.water') }}" method="POST" class="flex-1">
                            @csrf
                            <input type="hidden" name="log_date" value="{{ $date }}">
                            <input type="hidden" name="amount_ml" value="500">
                            <button type="submit" class="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition">
                                +500 ml (Bottle)
                            </button>
                        </form>
                    </div>

                    @if($waterLogs->isNotEmpty())
                        <div class="mt-3 flex flex-wrap gap-1.5">
                            @foreach($waterLogs as $w)
                                <form action="{{ route('nutrition.water.delete', $w->id) }}" method="POST" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="inline-flex items-center text-[10px] bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-2 py-0.5 rounded-full" title="Click to remove">
                                        {{ $w->amount_ml }}ml &times;
                                    </button>
                                </form>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>

            <!-- Quick Log Food Form -->
            <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3">Quick Log Item</h3>
                <form action="{{ route('nutrition.log') }}" method="POST" class="space-y-3">
                    @csrf
                    <input type="hidden" name="log_date" value="{{ $date }}">

                    <div>
                        <label class="block text-[11px] font-semibold text-gray-400 uppercase">Meal Slot</label>
                        <select name="meal_slot" class="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs">
                            <option value="BREAKFAST">Breakfast</option>
                            <option value="LUNCH">Lunch</option>
                            <option value="DINNER">Dinner</option>
                            <option value="SNACK">Snack</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-[11px] font-semibold text-gray-400 uppercase">Food Name / Description</label>
                        <input type="text" name="custom_name" required placeholder="e.g. Grilled Chicken Salad"
                               class="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs">
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-[11px] font-semibold text-gray-400 uppercase">Calories (kcal)</label>
                            <input type="number" step="1" name="kcal" required placeholder="e.g. 450"
                                   class="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs">
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-gray-400 uppercase">Servings</label>
                            <input type="number" step="0.5" name="servings" value="1.0" min="0.1"
                                   class="w-full rounded-xl border border-gray-300 px-3 py-1.5 text-xs">
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Protein (g)</label>
                            <input type="number" step="0.1" name="protein_g" placeholder="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Carb (g)</label>
                            <input type="number" step="0.1" name="carb_g" placeholder="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Fat (g)</label>
                            <input type="number" step="0.1" name="fat_g" placeholder="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                            Log Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Meals Logged List Grouped by Slot -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-base font-bold text-gray-900">Meals Logged for {{ \Carbon\Carbon::parse($date)->format('F d, Y') }}</h3>
                <span class="text-xs text-gray-500 font-medium">{{ $foodLogs->count() }} items</span>
            </div>

            @if($foodLogs->isEmpty())
                <div class="p-10 text-center text-sm text-gray-500">
                    No meals or snacks recorded for this date.
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach(['BREAKFAST' => 'Breakfast', 'LUNCH' => 'Lunch', 'DINNER' => 'Dinner', 'SNACK' => 'Snacks'] as $slotKey => $slotName)
                        @php
                            $slotItems = $foodLogs->where('meal_slot', $slotKey);
                        @endphp
                        @if($slotItems->isNotEmpty())
                            <div class="p-4 sm:px-6 bg-gray-50/50">
                                <div class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{{ $slotName }}</div>
                                <div class="space-y-2">
                                    @foreach($slotItems as $item)
                                        <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                                            <div>
                                                <div class="text-sm font-bold text-gray-900">
                                                    {{ $item->custom_name ?: ($item->food ? $item->food->name : 'Logged Food') }}
                                                </div>
                                                <div class="text-xs text-gray-400">
                                                    {{ $item->servings }} serving(s) &bull; {{ number_format($item->kcal) }} kcal &bull; P: {{ $item->protein_g }}g &bull; C: {{ $item->carb_g }}g &bull; F: {{ $item->fat_g }}g
                                                </div>
                                            </div>
                                            <form action="{{ route('nutrition.food.delete', $item->id) }}" method="POST" onsubmit="return confirm('Remove this food log?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-gray-400 hover:text-red-600 p-1">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </form>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>
