<x-layouts.patient>
    <x-slot:title>Men's Health & Screenings - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    <span>Men's Health & Preventative Screenings</span>
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Encrypted
                    </span>
                </h1>
                <p class="text-sm text-gray-500">Confidential tracking for routine self-examinations, prostate health guidelines, and clinical reminders.</p>
            </div>
            <div>
                <a href="{{ route('mens-health.learn') }}" class="inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    <svg class="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    Self-Exam & Health Guide
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left: Status & Reminders Card -->
            <div class="space-y-6">
                <div class="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-3xl p-6 text-white shadow-md">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white uppercase tracking-wider">
                        Self-Exam Status
                    </span>
                    @if($lastExam)
                        <h3 class="text-2xl font-extrabold mt-3 tracking-tight">{{ \Carbon\Carbon::parse($lastExam->log_date)->diffForHumans() }}</h3>
                        <p class="text-sky-100 text-xs mt-1">Last exam: {{ \Carbon\Carbon::parse($lastExam->log_date)->format('F d, Y') }}</p>
                        <div class="mt-4 pt-3 border-t border-white/20 text-xs text-sky-100 flex items-center justify-between">
                            <span>Reported Result:</span>
                            <strong class="text-white font-semibold">{{ $lastExam->finding }}</strong>
                        </div>
                    @else
                        <h3 class="text-2xl font-extrabold mt-3 tracking-tight">No Exam Recorded</h3>
                        <p class="text-sky-100 text-xs mt-1">Urological guidelines recommend a quick monthly check.</p>
                    @endif
                </div>

                <!-- Screening Settings -->
                <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <h3 class="text-sm font-bold text-gray-900 mb-3">Screening Settings & Risk Factors</h3>
                    <form action="{{ route('mens-health.settings') }}" method="POST" class="space-y-3">
                        @csrf
                        @method('PUT')

                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="self_exam_reminder_active" value="1" class="rounded text-sky-600 focus:ring-sky-500 w-4 h-4" {{ $settings->self_exam_reminder_active ? 'checked' : '' }}>
                            <span class="text-xs text-gray-700">Monthly self-exam reminder</span>
                        </label>

                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="family_history_prostate" value="1" class="rounded text-sky-600 focus:ring-sky-500 w-4 h-4" {{ $settings->family_history_prostate ? 'checked' : '' }}>
                            <span class="text-xs text-gray-700">Family history of prostate issues</span>
                        </label>

                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="family_history_testicular" value="1" class="rounded text-sky-600 focus:ring-sky-500 w-4 h-4" {{ $settings->family_history_testicular ? 'checked' : '' }}>
                            <span class="text-xs text-gray-700">Family history of testicular cancer</span>
                        </label>

                        <div class="pt-3">
                            <button type="submit" class="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm">
                                Save Preferences
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Right: Log Exam Form & History -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">Record Monthly Self-Exam</h3>
                    <p class="text-xs text-gray-500 mb-5">Confidential check log stored securely in your private vault.</p>

                    <form action="{{ route('mens-health.log') }}" method="POST" class="space-y-4">
                        @csrf
                        <div>
                            <label for="log_date" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Examination</label>
                            <input type="date" id="log_date" name="log_date" value="{{ old('log_date', now()->toDateString()) }}"
                                   class="rounded-xl border border-gray-300 px-3.5 py-2 text-sm text-gray-800 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Findings</label>
                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                @foreach(['NORMAL' => 'Normal / No changes', 'CHANGE_NOTICED' => 'Change noticed', 'PAIN' => 'Pain / Discomfort', 'UNSURE' => 'Unsure / Consult Doctor'] as $val => $lbl)
                                    <label class="cursor-pointer">
                                        <input type="radio" name="finding" value="{{ $val }}" class="peer sr-only" {{ old('finding', 'NORMAL') === $val ? 'checked' : '' }}>
                                        <div class="text-center p-3 rounded-xl border border-gray-200 text-xs font-semibold peer-checked:bg-sky-50 peer-checked:border-sky-500 peer-checked:text-sky-700 transition">
                                            {{ $lbl }}
                                        </div>
                                    </label>
                                @endforeach
                            </div>
                        </div>

                        <div>
                            <label for="notes" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Private Notes (Zero-knowledge encrypted)</label>
                            <textarea id="notes" name="notes" rows="2" placeholder="Any sensations, observations, or questions for your doctor..."
                                      class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-sky-500"></textarea>
                        </div>

                        <div class="pt-2 flex justify-end">
                            <button type="submit" class="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition">
                                Save Exam Record
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Exam History -->
                <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div class="p-5 border-b border-gray-100">
                        <h3 class="text-sm font-bold text-gray-900">Exam History (Last 12 checks)</h3>
                    </div>

                    @if($recentLogs->isEmpty())
                        <div class="p-8 text-center text-xs text-gray-500">
                            No self-exam history recorded yet.
                        </div>
                    @else
                        <div class="divide-y divide-gray-100">
                            @foreach($recentLogs as $log)
                                <div class="p-4 sm:px-6 flex items-center justify-between">
                                    <div>
                                        <div class="text-sm font-bold text-gray-900">{{ \Carbon\Carbon::parse($log->log_date)->format('F d, Y') }}</div>
                                        <div class="text-xs text-gray-400 mt-0.5">{{ \Carbon\Carbon::parse($log->log_date)->diffForHumans() }}</div>
                                    </div>
                                    <div>
                                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold {{ $log->finding === 'NORMAL' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700' }}">
                                            {{ $log->finding }}
                                        </span>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-layouts.patient>

