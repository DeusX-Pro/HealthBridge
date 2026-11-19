<x-layouts.patient>
    <x-slot:title>Clinician Submissions - Sharing</x-slot:title>

    <div class="space-y-6">
        <div>
            <a href="{{ route('sharing.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Sharing Hub</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Pending Clinician Submissions</h1>
            <p class="text-sm text-gray-500">Review and approve records uploaded by your healthcare providers before they enter your permanent health diary.</p>
        </div>

        @if($submissions->isEmpty())
            <div class="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <h3 class="text-base font-bold text-gray-900">No pending submissions</h3>
                <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">When clinicians use your Add Links to submit visit notes or lab documents, they will appear here for your review.</p>
            </div>
        @else
            <div class="space-y-4">
                @foreach($submissions as $sub)
                    <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                            <div>
                                <div class="flex items-center gap-2">
                                    <h3 class="text-base font-bold text-gray-900">{{ $sub->clinic_name }}</h3>
                                    <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold {{ $sub->status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700' : ($sub->status === 'REJECTED' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700') }}">
                                        {{ $sub->status }}
                                    </span>
                                </div>
                                <div class="text-xs text-gray-500 mt-0.5">
                                    Clinician: <strong class="text-gray-800">{{ $sub->clinician_name }}</strong> &bull; Visit Date: {{ \Carbon\Carbon::parse($sub->visit_date)->format('M d, Y') }} &bull; Type: {{ $sub->visit_type }}
                                </div>
                            </div>

                            @if($sub->status === 'PENDING')
                                <div class="flex items-center gap-2">
                                    <form action="{{ route('sharing.submissions.accept', $sub->id) }}" method="POST">
                                        @csrf
                                        <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                                            Accept & Import to Vault
                                        </button>
                                    </form>
                                    <form action="{{ route('sharing.submissions.reject', $sub->id) }}" method="POST" onsubmit="return confirm('Reject this submission?');">
                                        @csrf
                                        <button type="submit" class="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-xl">
                                            Reject
                                        </button>
                                    </form>
                                </div>
                            @endif
                        </div>

                        <!-- Summary Notes -->
                        @if($sub->summary)
                            <div>
                                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Clinical Summary</h4>
                                <div class="text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed whitespace-pre-line">{{ $sub->summary }}</div>
                            </div>
                        @endif

                        <!-- Attached Files -->
                        @if($sub->files->isNotEmpty())
                            <div>
                                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Attached Documents ({{ $sub->files->count() }})</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    @foreach($sub->files as $file)
                                        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                                                PDF
                                            </div>
                                            <div class="min-w-0 flex-1">
                                                <div class="text-xs font-bold text-gray-900 truncate">{{ $file->file_name }}</div>
                                                <div class="text-[10px] text-gray-400">{{ number_format($file->file_size / 1024, 1) }} KB</div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endif
                    </div>
                @endforeach

                <div class="p-4">
                    {{ $submissions->links() }}
                </div>
            </div>
        @endif
    </div>
</x-layouts.patient>

