<x-layouts.patient>
    <x-slot:title>Cycle Tracking - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <!-- Sub-nav Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    <span>Cycle & Reproductive Tracking</span>
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        End-to-End Encrypted
                    </span>
                </h1>
                <p class="text-sm text-gray-500">Private, client-shielded tracking for your menstrual cycle, ovulation, and symptoms.</p>
            </div>
            <div class="flex items-center gap-2">
                <a href="{{ route('cycle.calendar') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="21" x2="21" y2="21"/></svg>
                    Calendar
                </a>
                <a href="{{ route('cycle.insights') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                    Insights
                </a>
                <a href="{{ route('contraception.index') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    Contraception
                </a>
                <a href="{{ route('cycle.learn') }}" class="inline-flex items-center px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    Guides
                </a>
            </div>
        </div>

        <!-- Cycle Wheel & Status Hero -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                <div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm uppercase tracking-wider">
                        Current Phase
                    </span>
                    <h2 class="text-3xl font-extrabold mt-3 tracking-tight">{{ $phase }} Phase</h2>
                    <p class="text-rose-100 text-sm mt-1">Day <strong class="text-white text-lg">{{ $cycleDay }}</strong> of your current cycle</p>
                </div>

                <!-- Circular Visual Indicator -->
                <div class="py-8 flex justify-center">
                    <div class="relative w-44 h-44 rounded-full border-8 border-white/20 flex flex-col items-center justify-center bg-white/10 shadow-inner">
                        <span class="text-4xl font-extrabold tracking-tight">{{ $cycleDay }}</span>
                        <span class="text-xs uppercase tracking-wider font-semibold text-rose-100 mt-1">Cycle Day</span>
                    </div>
                </div>

                <div class="border-t border-white/20 pt-4 text-xs text-rose-100 space-y-1">
                    @if($prediction)
                        <div class="flex justify-between">
                            <span>Next Period:</span>
                            <strong class="text-white">{{ \Carbon\Carbon::parse($prediction->predicted_next_period_start)->format('M d') }}</strong>
                        </div>
                        <div class="flex justify-between">
                            <span>Estimated Ovulation:</span>
                            <strong class="text-white">{{ \Carbon\Carbon::parse($prediction->predicted_ovulation_date)->format('M d') }}</strong>
                        </div>
                    @else
                        <div class="text-rose-100">Log your period to generate AI cycle predictions.</div>
                    @endif
                </div>
            </div>

            <!-- Daily Symptoms Logger -->
            <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <h2 class="text-lg font-bold text-gray-900 mb-1">Log Daily Symptoms & Signs</h2>
                <p class="text-xs text-gray-500 mb-6">Encrypted on save with your zero-knowledge key before database persistence.</p>

                <form action="{{ route('cycle.log') }}" method="POST" class="space-y-5">
                    @csrf
                    <div>
                        <label for="log_date" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                        <input type="date" id="log_date" name="log_date" value="{{ old('log_date', now()->toDateString()) }}"
                               class="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-rose-500 focus:ring-rose-500">
                    </div>

                    <!-- Flow Intensity -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menstrual Flow</label>
                        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            @foreach(['NONE' => 'None', 'SPOTTING' => 'Spotting', 'LIGHT' => 'Light', 'MEDIUM' => 'Medium', 'HEAVY' => 'Heavy'] as $val => $lbl)
                                <label class="cursor-pointer">
                                    <input type="radio" name="flow_intensity" value="{{ $val }}" class="peer sr-only" {{ old('flow_intensity', $todayLog?->flow_intensity ?? 'NONE') === $val ? 'checked' : '' }}>
                                    <div class="text-center p-2 rounded-xl border border-gray-200 text-xs font-semibold peer-checked:bg-rose-50 peer-checked:border-rose-500 peer-checked:text-rose-700 transition">
                                        {{ $lbl }}
                                    </div>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <!-- Vitals: BBT -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="bbt_celsius" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Basal Body Temperature (°C)</label>
                            <input type="number" step="0.01" min="34" max="42" id="bbt_celsius" name="bbt_celsius"
                                   value="{{ old('bbt_celsius', $todayLog?->bbt_celsius) }}" placeholder="e.g. 36.65"
                                   class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500">
                        </div>
                        <div>
                            <label for="cervical_mucus" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cervical Fluid</label>
                            <select id="cervical_mucus" name="cervical_mucus" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500">
                                <option value="">-- None noted --</option>
                                <option value="DRY" {{ old('cervical_mucus', $todayLog?->cervical_mucus) === 'DRY' ? 'selected' : '' }}>Dry / Sticky</option>
                                <option value="CREAMY" {{ old('cervical_mucus', $todayLog?->cervical_mucus) === 'CREAMY' ? 'selected' : '' }}>Creamy</option>
                                <option value="WATERY" {{ old('cervical_mucus', $todayLog?->cervical_mucus) === 'WATERY' ? 'selected' : '' }}>Watery</option>
                                <option value="EGGWHITE" {{ old('cervical_mucus', $todayLog?->cervical_mucus) === 'EGGWHITE' ? 'selected' : '' }}>Egg White (Peak Fertility)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Symptoms Multi-select checkboxes -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Common Symptoms</label>
                        <div class="flex flex-wrap gap-2">
                            @php
                                $symptomList = ['cramps' => 'Cramps', 'headache' => 'Headache', 'bloating' => 'Bloating', 'tender_breasts' => 'Tender Breasts', 'fatigue' => 'Fatigue', 'acne' => 'Acne', 'backache' => 'Backache', 'nausea' => 'Nausea'];
                                $activeSymptoms = old('symptoms', $todayLog?->symptoms ?? []);
                            @endphp
                            @foreach($symptomList as $key => $title)
                                <label class="cursor-pointer">
                                    <input type="checkbox" name="symptoms[]" value="{{ $key }}" class="peer sr-only" {{ in_array($key, $activeSymptoms) ? 'checked' : '' }}>
                                    <div class="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium peer-checked:bg-rose-50 peer-checked:border-rose-400 peer-checked:text-rose-700 transition">
                                        {{ $title }}
                                    </div>
                                </label>
                            @endforeach
                        </div>
                    </div>

                    <!-- Mood -->
                    <div>
                        <label for="mood" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Mood</label>
                        <select id="mood" name="mood" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500">
                            <option value="">-- How are you feeling today? --</option>
                            <option value="calm" {{ old('mood', $todayLog?->mood) === 'calm' ? 'selected' : '' }}>😌 Calm & Relaxed</option>
                            <option value="happy" {{ old('mood', $todayLog?->mood) === 'happy' ? 'selected' : '' }}>😊 Happy & Energetic</option>
                            <option value="mood_swings" {{ old('mood', $todayLog?->mood) === 'mood_swings' ? 'selected' : '' }}>🎢 Mood Swings</option>
                            <option value="irritable" {{ old('mood', $todayLog?->mood) === 'irritable' ? 'selected' : '' }}>😠 Irritable</option>
                            <option value="sad" {{ old('mood', $todayLog?->mood) === 'sad' ? 'selected' : '' }}>😢 Low / Sad</option>
                            <option value="anxious" {{ old('mood', $todayLog?->mood) === 'anxious' ? 'selected' : '' }}>😰 Anxious</option>
                        </select>
                    </div>

                    <!-- Encrypted Notes -->
                    <div>
                        <label for="notes" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Encrypted Notes (Private to you)</label>
                        <textarea id="notes" name="notes" rows="2" placeholder="Private notes, physical observations, or thoughts..."
                                  class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500"></textarea>
                    </div>

                    <div class="pt-2 flex justify-end">
                        <button type="submit" class="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition">
                            Save Daily Log
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- BBT Trend Curve -->
        @if(count($chartLogs) > 0)
        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h3 class="text-sm font-bold text-gray-900 mb-1">Basal Body Temperature & Flow Log (Last 30 Days)</h3>
            <p class="text-xs text-gray-400 mb-4">A sustained 0.2°C to 0.5°C rise typically confirms ovulation.</p>

            <div class="overflow-x-auto">
                <div class="min-w-[600px] flex items-end gap-2 h-40 pt-6 px-2 border-b border-gray-200">
                    @foreach($chartLogs as $item)
                        @php
                            $heightPercent = 20;
                            if ($item['bbt']) {
                                // Scale 35.5 - 37.5 C to 10% - 100%
                                $heightPercent = min(100, max(10, (($item['bbt'] - 35.5) / 2.0) * 100));
                            }
                        @endphp
                        <div class="flex-1 flex flex-col items-center gap-1 group relative">
                            @if($item['bbt'])
                                <div class="w-full rounded-t-md bg-rose-400 group-hover:bg-rose-600 transition" style="height: {{ $heightPercent }}%"></div>
                                <span class="text-[9px] text-gray-400 -rotate-45 origin-left truncate mt-1">{{ $item['date'] }}</span>
                                <div class="absolute -top-7 hidden group-hover:block bg-gray-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap z-10">
                                    {{ $item['bbt'] }}°C &bull; {{ $item['flow'] }}
                                </div>
                            @else
                                <div class="w-full h-1 bg-gray-200 rounded"></div>
                                <span class="text-[9px] text-gray-300 -rotate-45 origin-left truncate mt-1">{{ $item['date'] }}</span>
                            @endif
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        @endif
    </div>
</x-layouts.patient>

