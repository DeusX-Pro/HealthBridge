<x-layouts.patient>
    <x-slot:title>Health Diary - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Personal Health Diary</h1>
                <p class="text-sm text-gray-500">Record your consultations, symptoms, diagnoses, vaccinations, and private observations.</p>
            </div>
            <a href="{{ route('diary.create') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Entry
            </a>
        </div>

        <!-- Filter Bar -->
        <div class="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            <a href="{{ route('diary.index') }}" class="px-3 py-1.5 rounded-xl text-xs font-bold {{ !$type ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">All Types</a>
            @foreach ($entryTypes as $k => $label)
                <a href="{{ route('diary.index', ['type' => $k]) }}" class="px-3 py-1.5 rounded-xl text-xs font-bold {{ $type === $k ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">{{ $label }}</a>
            @endforeach
        </div>

        @if ($entries->isEmpty())
            <div class="rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                <h3 class="text-base font-bold text-gray-900">No diary entries found</h3>
                <p class="mt-1 text-sm text-gray-500">Document your clinical history and notes to keep a complete record.</p>
                <div class="mt-4">
                    <a href="{{ route('diary.create') }}" class="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700">Add First Note</a>
                </div>
            </div>
        @else
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @foreach ($entries as $entry)
                    <div class="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 uppercase">
                                    {{ str_replace('_', ' ', $entry->entry_type) }}
                                </span>
                                <time>{{ $entry->entry_date->format('M d, Y') }}</time>
                            </div>
                            <h3 class="text-base font-bold text-gray-900">{{ $entry->title }}</h3>
                            <p class="mt-2 text-sm text-gray-600 line-clamp-3">{{ $entry->data['notes'] ?? '' }}</p>

                            @if (!empty($entry->tags))
                                <div class="mt-3 flex flex-wrap gap-1">
                                    @foreach ($entry->tags as $t)
                                        <span class="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">#{{ $t }}</span>
                                    @endforeach
                                </div>
                            @endif
                        </div>

                        <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                            <a href="{{ route('diary.show', $entry->id) }}" class="text-emerald-600 hover:underline">Read Details &rarr;</a>
                            <div class="flex items-center gap-3">
                                <a href="{{ route('diary.edit', $entry->id) }}" class="text-gray-400 hover:text-gray-600">Edit</a>
                                <form method="POST" action="{{ route('diary.destroy', $entry->id) }}" onsubmit="return confirm('Delete this diary entry?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-rose-500 hover:text-rose-700">Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-4">
                {{ $entries->links() }}
            </div>
        @endif
    </div>
</x-layouts.patient>

