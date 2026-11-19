<x-layouts.patient>
    <x-slot:title>Today - Health Glance</x-slot:title>

    <div class="space-y-6">
        <!-- Hero Card -->
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 p-6 md:p-8 text-white shadow-xl">
            <div class="relative z-10 max-w-2xl">
                <div class="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm mb-3">
                    <span class="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    {{ now()->format('l, F j, Y') }}
                </div>
                <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">Good day, {{ $user->first_name }}</h1>
                <p class="mt-2 text-sm md:text-base text-emerald-50 leading-relaxed">
                    Your health vault is secured with end-to-end encryption. Here is your daily overview of medications, vitals, and wellness logs.
                </p>

                <!-- Quick Action Pills -->
                <div class="mt-6 flex flex-wrap gap-2.5">
                    <a href="{{ route('measurements.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-50 transition-colors">
                        <svg class="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Log Vitals
                    </a>
                    <a href="{{ route('diary.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white border border-white/20 hover:bg-white/20 transition-colors">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        Health Note
                    </a>
                    <a href="{{ route('documents.upload') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white border border-white/20 hover:bg-white/20 transition-colors">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Upload Doc
                    </a>
                    @if ($user->isFemale())
                        <a href="{{ route('cycle.index') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/80 px-3.5 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-colors">
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
                            Cycle Log
                        </a>
                    @elseif ($user->isMale())
                        <a href="{{ route('mens-health.index') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-sky-500/80 px-3.5 py-2 text-xs font-bold text-white hover:bg-sky-500 transition-colors">
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="14" r="6"/><line x1="14.5" x2="21" y1="9.5" y2="3"/><polyline points="15 3 21 3 21 9"/></svg>
                            Self-Exam
                        </a>
                    @endif
                </div>
            </div>

            <!-- Background Decorative Rings -->
            <div class="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        </div>

        <!-- 3-Column Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left 2 Cols: Schedule & Domain Cards -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Medications Today Schedule -->
                <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                            </div>
                            <h2 class="text-base font-bold text-gray-900">Today's Medication Doses</h2>
                        </div>
                        <a href="{{ route('medications.index') }}" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Manage Schedule &rarr;</a>
                    </div>

                    @if (empty($todayDoses))
                        <div class="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500 border border-dashed border-gray-200">
                            No medication doses scheduled for today.
                            <div class="mt-2">
                                <a href="{{ route('medications.create') }}" class="font-semibold text-emerald-600 hover:underline">Add your first prescription or OTC medicine</a>
                            </div>
                        </div>
                    @else
                        <div class="divide-y divide-gray-100">
                            @foreach ($todayDoses as $dose)
                                <div class="py-3 flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <span class="inline-flex items-center justify-center font-mono text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-700">
                                            {{ $dose['time'] }}
                                        </span>
                                        <div>
                                            <p class="text-sm font-bold text-gray-900">{{ $dose['name'] }}</p>
                                            <p class="text-xs text-gray-500">{{ $dose['dose'] }}</p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        @if ($dose['status'] === 'TAKEN')
                                            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                                                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                                Taken
                                            </span>
                                            <form method="POST" action="{{ route('medications.doses.undo', $dose['medication_id']) }}">
                                                @csrf
                                                @method('DELETE')
                                                <input type="hidden" name="time" value="{{ $dose['time'] }}">
                                                <button type="submit" class="text-xs text-gray-400 hover:text-gray-600">Undo</button>
                                            </form>
                                        @elseif ($dose['status'] === 'SKIPPED')
                                            <span class="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-bold text-gray-700">
                                                Skipped
                                            </span>
                                            <form method="POST" action="{{ route('medications.doses.undo', $dose['medication_id']) }}">
                                                @csrf
                                                @method('DELETE')
                                                <input type="hidden" name="time" value="{{ $dose['time'] }}">
                                                <button type="submit" class="text-xs text-gray-400 hover:text-gray-600">Undo</button>
                                            </form>
                                        @else
                                            <form method="POST" action="{{ route('medications.doses.log', $dose['medication_id']) }}" class="inline">
                                                @csrf
                                                <input type="hidden" name="time" value="{{ $dose['time'] }}">
                                                <input type="hidden" name="status" value="TAKEN">
                                                <button type="submit" class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors">
                                                    Take
                                                </button>
                                            </form>
                                            <form method="POST" action="{{ route('medications.doses.log', $dose['medication_id']) }}" class="inline">
                                                @csrf
                                                <input type="hidden" name="time" value="{{ $dose['time'] }}">
                                                <input type="hidden" name="status" value="SKIPPED">
                                                <button type="submit" class="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
                                                    Skip
                                                </button>
                                            </form>
                                        @endif
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>

                <!-- Specialized Domain Card: Cycle (Female) or Men's Health (Male) -->
                @if ($user->isFemale())
                    <div class="rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-6 border border-rose-100 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
                                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
                                </div>
                                <div>
                                    <h3 class="text-base font-bold text-gray-900">Cycle Tracking & Reproductive Privacy Shield</h3>
                                    <p class="text-xs text-rose-800">
                                        @if ($cycleInfo['hasLoggedToday'])
                                            You logged today's symptoms. Notes and intimacy are encrypted.
                                        @else
                                            You haven't logged today's flow, temperature, or mood yet.
                                        @endif
                                    </p>
                                </div>
                            </div>
                            <a href="{{ route('cycle.index') }}" class="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition-colors">
                                Open Tracker
                            </a>
                        </div>
                    </div>
                @elseif ($user->isMale())
                    <div class="rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 p-6 border border-sky-100 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
                                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="14" r="6"/><line x1="14.5" x2="21" y1="9.5" y2="3"/><polyline points="15 3 21 3 21 9"/></svg>
                                </div>
                                <div>
                                    <h3 class="text-base font-bold text-gray-900">Men's Preventive Health</h3>
                                    <p class="text-xs text-sky-800">
                                        @if ($mensHealthInfo['lastExam'])
                                            Last monthly exam logged on {{ Carbon\Carbon::parse($mensHealthInfo['lastExam']->log_date)->format('M d, Y') }}.
                                        @else
                                            No routine self-exam logged yet. Regular monthly checks protect your health.
                                        @endif
                                    </p>
                                </div>
                            </div>
                            <a href="{{ route('mens-health.index') }}" class="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition-colors">
                                View Guidance
                            </a>
                        </div>
                    </div>
                @endif

                <!-- Nutrition & Water Glance -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Calories Logged</span>
                            <p class="mt-1 text-2xl font-black text-gray-900">{{ number_format($caloriesToday) }} <span class="text-xs font-normal text-gray-500">kcal</span></p>
                            <a href="{{ route('nutrition.index') }}" class="mt-2 inline-block text-xs font-semibold text-emerald-600 hover:underline">Log Meal &rarr;</a>
                        </div>
                        <div class="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 0-5 5v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a5 5 0 0 0-5-5Z"/></svg>
                        </div>
                    </div>
                    <div class="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Water Intake</span>
                            <p class="mt-1 text-2xl font-black text-gray-900">{{ number_format($totalWater ?? $waterToday) }} <span class="text-xs font-normal text-gray-500">ml</span></p>
                            <a href="{{ route('nutrition.index') }}" class="mt-2 inline-block text-xs font-semibold text-emerald-600 hover:underline">Add Glass &rarr;</a>
                        </div>
                        <div class="h-12 w-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Vitals Summary, Health Fact & Featured Reads -->
            <div class="space-y-6">
                <!-- Vitals Summary Card -->
                <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-base font-bold text-gray-900">Latest Vitals</h3>
                        <a href="{{ route('measurements.index') }}" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700">All Vitals &rarr;</a>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                            <span class="text-xs font-medium text-gray-600">Blood Pressure</span>
                            <span class="text-sm font-bold text-gray-900">
                                {{ $latestBp ? "{$latestBp->value}/{$latestBp->value2} mmHg" : 'Not recorded' }}
                            </span>
                        </div>
                        <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                            <span class="text-xs font-medium text-gray-600">Weight</span>
                            <span class="text-sm font-bold text-gray-900">
                                {{ $latestWeight ? "{$latestWeight->value} {$latestWeight->unit}" : 'Not recorded' }}
                            </span>
                        </div>
                        <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                            <span class="text-xs font-medium text-gray-600">Blood Glucose</span>
                            <span class="text-sm font-bold text-gray-900">
                                {{ $latestGlucose ? "{$latestGlucose->value} {$latestGlucose->unit}" : 'Not recorded' }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Health Fact ("Did you know?") -->
                @if ($fact)
                    <div class="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-5 border border-amber-200">
                        <div class="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                            <svg class="h-4 w-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                            Did You Know? ({{ $fact->category }})
                        </div>
                        <p class="text-xs text-gray-700 leading-relaxed">{{ $fact->fact }}</p>
                        <p class="mt-2 text-[10px] text-gray-400">Source: {{ $fact->source }}</p>
                    </div>
                @endif

                <!-- Featured Articles -->
                <div class="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 class="text-base font-bold text-gray-900 mb-3">Health Library</h3>
                    <div class="divide-y divide-gray-100">
                        @foreach ($articles as $art)
                            <div class="py-3">
                                <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{{ $art->category->name }}</span>
                                <a href="{{ route('articles.show', $art->slug) }}" class="block text-sm font-bold text-gray-900 hover:text-emerald-600 mt-0.5 line-clamp-1">
                                    {{ $art->title }}
                                </a>
                                <p class="text-xs text-gray-500 line-clamp-2 mt-1">{{ $art->summary }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-layouts.patient>

