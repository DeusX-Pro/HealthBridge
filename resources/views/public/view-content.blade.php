<x-layouts.public>
    <x-slot:title>Shared Records: {{ $user->name }} - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <!-- Patient Banner Header -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                        Authorized Patient Health Summary
                    </span>
                    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $user->name }}</h1>
                    <div class="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Sex: <strong class="text-gray-800">{{ $user->sex }}</strong></span>
                        @if($user->date_of_birth)
                            <span>DOB: <strong class="text-gray-800">{{ $user->date_of_birth->format('M d, Y') }}</strong> ({{ $user->date_of_birth->age }} yrs)</span>
                        @endif
                        <span>Recipient: <strong class="text-gray-800">{{ $link->recipient_name }}</strong></span>
                    </div>
                </div>

                <div class="text-xs text-gray-400 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div>Link Expires: <strong class="text-gray-700">{{ $link->expires_at->format('M d, Y h:i A') }}</strong></div>
                    <div>Access Mode: <span class="text-emerald-600 font-semibold">Read Only</span></div>
                </div>
            </div>

            <!-- Permitted Sections Pills -->
            <div class="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
                <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Authorized Sections:</span>
                @foreach($sections as $sec)
                    <span class="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                        {{ $sec }}
                    </span>
                @endforeach
            </div>
        </div>

        <!-- 1. Clinical Records / Timeline Section -->
        @if(in_array('TIMELINE', $sections))
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 class="text-base font-bold text-gray-900">Hospital & Clinical Records (Timeline)</h2>
                @if($clinicalRecords->isEmpty())
                    <p class="text-xs text-gray-400 italic">No clinical timeline events recorded.</p>
                @else
                    <div class="divide-y divide-gray-100">
                        @foreach($clinicalRecords as $rec)
                            <div class="py-3">
                                <div class="flex items-center justify-between">
                                    <h4 class="text-sm font-bold text-gray-900">{{ $rec->title }}</h4>
                                    <span class="text-xs text-gray-400">{{ \Carbon\Carbon::parse($rec->recorded_at)->format('M d, Y') }}</span>
                                </div>
                                <p class="text-xs text-gray-600 mt-1">{{ $rec->summary }}</p>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        @endif

        <!-- 2. Diary / Consultations Section -->
        @if(in_array('DIARY', $sections))
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 class="text-base font-bold text-gray-900">Consultation Notes & Patient Diary</h2>
                @if($diaryEntries->isEmpty())
                    <p class="text-xs text-gray-400 italic">No diary entries available.</p>
                @else
                    <div class="divide-y divide-gray-100">
                        @foreach($diaryEntries as $d)
                            <div class="py-3">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">{{ $d->entry_type }}</span>
                                        <h4 class="text-sm font-bold text-gray-900">{{ $d->title }}</h4>
                                    </div>
                                    <span class="text-xs text-gray-400">{{ \Carbon\Carbon::parse($d->entry_date)->format('M d, Y') }}</span>
                                </div>
                                @if(is_array($d->data) && !empty($d->data['summary']))
                                    <p class="text-xs text-gray-600 mt-1 whitespace-pre-line">{{ $d->data['summary'] }}</p>
                                @endif
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        @endif

        <!-- 3. Medications Section -->
        @if(in_array('MEDICATIONS', $sections))
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 class="text-base font-bold text-gray-900">Active Prescriptions & Medications</h2>
                @if($medications->isEmpty())
                    <p class="text-xs text-gray-400 italic">No current medications recorded.</p>
                @else
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        @foreach($medications as $med)
                            <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div class="text-sm font-bold text-gray-900">{{ $med->name }}</div>
                                <div class="text-xs text-emerald-700 font-semibold mt-0.5">Dose: {{ $med->dose }}</div>
                                @if($med->instructions)
                                    <div class="text-xs text-gray-500 mt-1">{{ $med->instructions }}</div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        @endif

        <!-- 4. Measurements / Vitals Section -->
        @if(in_array('MEASUREMENTS', $sections) || in_array('VITALS', $sections))
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 class="text-base font-bold text-gray-900">Recent Vitals & Biometrics</h2>
                @if($measurements->isEmpty())
                    <p class="text-xs text-gray-400 italic">No measurements recorded.</p>
                @else
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-100 text-xs">
                            <thead class="bg-gray-50/75">
                                <tr>
                                    <th class="px-4 py-2.5 text-left font-semibold text-gray-500">Date</th>
                                    <th class="px-4 py-2.5 text-left font-semibold text-gray-500">Biometric</th>
                                    <th class="px-4 py-2.5 text-left font-semibold text-gray-500">Value</th>
                                    <th class="px-4 py-2.5 text-left font-semibold text-gray-500">Context</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                @foreach($measurements as $m)
                                    <tr>
                                        <td class="px-4 py-2 text-gray-500 whitespace-nowrap">{{ \Carbon\Carbon::parse($m->measured_at)->format('M d, Y h:i A') }}</td>
                                        <td class="px-4 py-2 font-bold text-gray-900">{{ str_replace('_', ' ', $m->measurement_type) }}</td>
                                        <td class="px-4 py-2 font-semibold text-emerald-700">{{ $m->value }}@if($m->value2)/{{ $m->value2 }}@endif {{ $m->unit }}</td>
                                        <td class="px-4 py-2 text-gray-400 capitalize">{{ $m->context ?: '-' }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
            </div>
        @endif

        <!-- 5. Documents Vault Section -->
        @if(in_array('DOCUMENTS', $sections))
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4">
                <h2 class="text-base font-bold text-gray-900">Medical Documents & Lab Results</h2>
                @if($documents->isEmpty())
                    <p class="text-xs text-gray-400 italic">No documents shared in this vault.</p>
                @else
                    <div class="space-y-2">
                        @foreach($documents as $doc)
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100/75 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs uppercase">
                                        {{ pathinfo($doc->file_name, PATHINFO_EXTENSION) ?: 'DOC' }}
                                    </div>
                                    <div>
                                        <div class="text-sm font-bold text-gray-900">{{ $doc->title }}</div>
                                        <div class="text-xs text-gray-400">{{ $doc->category }} &bull; {{ \Carbon\Carbon::parse($doc->document_date)->format('M d, Y') }} &bull; {{ number_format($doc->file_size / 1024, 1) }} KB</div>
                                    </div>
                                </div>
                                <div>
                                    <a href="{{ route('public.view.download', ['token' => $token, 'docId' => $doc->id]) }}" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                        Download
                                    </a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif
            </div>
        @endif
    </div>
</x-layouts.public>

