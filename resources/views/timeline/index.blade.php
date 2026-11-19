<x-layouts.patient>
    <x-slot:title>Health Timeline - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Health Timeline</h1>
                <p class="text-sm text-gray-500">Your unified chronological feed of clinical visits, diary notes, lab tests, and uploaded reports.</p>
            </div>
            <div class="flex items-center gap-2">
                <a href="{{ route('diary.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Diary Entry
                </a>
            </div>
        </div>

        <!-- Filter Pills & Search -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <!-- Category Filter Pills -->
            <div class="flex flex-wrap items-center gap-2">
                @php
                    $filters = [
                        'ALL' => 'All Events',
                        'CLINICAL' => 'Clinical Records',
                        'DIARY' => 'My Diary Notes',
                        'DOCUMENTS' => 'Vault Documents',
                        'MEASUREMENTS' => 'Vitals & Stats',
                    ];
                @endphp
                @foreach ($filters as $k => $label)
                    <a href="{{ route('timeline.index', ['category' => $k, 'q' => $search]) }}"
                       class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors {{ $currentFilter === $k ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">
                        {{ $label }}
                    </a>
                @endforeach
            </div>

            <!-- Search Bar -->
            <form method="GET" action="{{ route('timeline.index') }}" class="relative sm:w-64">
                <input type="hidden" name="category" value="{{ $currentFilter }}">
                <input type="text" name="q" value="{{ $search }}" placeholder="Search events..."
                       class="w-full rounded-xl border border-gray-300 pl-9 pr-4 py-2 text-xs text-gray-900 focus:border-emerald-500 focus:ring-emerald-500">
                <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            </form>
        </div>

        <!-- Timeline Stream -->
        @if ($events->isEmpty())
            <div class="rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <h3 class="text-base font-bold text-gray-900">No events found in this category</h3>
                <p class="mt-1 text-sm text-gray-500">Try selecting "All Events" or log your first entry.</p>
                <div class="mt-6">
                    <a href="{{ route('diary.create') }}" class="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700">Add Entry</a>
                </div>
            </div>
        @else
            <div class="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-8 ml-3 sm:ml-4">
                @foreach ($events as $event)
                    <div class="relative group">
                        <!-- Timeline Dot Marker -->
                        <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-emerald-100 border border-emerald-500">
                            <span class="h-2 w-2 rounded-full bg-emerald-600"></span>
                        </div>

                        <!-- Event Card -->
                        <div class="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                <div class="flex items-center gap-2">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase
                                        {{ $event['type'] === 'CLINICAL_RECORD' ? 'bg-purple-100 text-purple-800' : '' }}
                                        {{ $event['type'] === 'DIARY_ENTRY' ? 'bg-emerald-100 text-emerald-800' : '' }}
                                        {{ $event['type'] === 'DOCUMENT' ? 'bg-amber-100 text-amber-800' : '' }}
                                        {{ $event['type'] === 'MEASUREMENT' ? 'bg-blue-100 text-blue-800' : '' }}">
                                        {{ str_replace('_', ' ', $event['category']) }}
                                    </span>
                                    <h3 class="text-base font-bold text-gray-900">{{ $event['title'] }}</h3>
                                </div>
                                <time class="text-xs font-mono text-gray-500">
                                    {{ \Carbon\Carbon::parse($event['date'])->format('M d, Y') }}
                                </time>
                            </div>

                            @if (!empty($event['summary']))
                                <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed">{{ $event['summary'] }}</p>
                            @endif

                            @if (!empty($event['tags']))
                                <div class="mt-3 flex flex-wrap gap-1.5">
                                    @foreach ($event['tags'] as $tag)
                                        <span class="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">#{{ $tag }}</span>
                                    @endforeach
                                </div>
                            @endif

                            @if ($event['type'] === 'DIARY_ENTRY')
                                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end">
                                    <a href="{{ route('diary.show', $event['id']) }}" class="text-xs font-semibold text-emerald-600 hover:underline">View Details & Notes &rarr;</a>
                                </div>
                            @elseif ($event['type'] === 'DOCUMENT')
                                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end">
                                    <a href="{{ route('documents.download', $event['id']) }}" class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline">
                                        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                        Download Secure File
                                    </a>
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>

            @if ($events->hasPages())
                <div class="mt-6 flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                    {{ $events->links() }}
                </div>
            @endif
        @endif
    </div>
</x-layouts.patient>

