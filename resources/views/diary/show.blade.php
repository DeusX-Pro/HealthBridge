<x-layouts.patient>
    <x-slot:title>{{ $entry->title }} - Diary</x-slot:title>

    <div class="max-w-3xl mx-auto space-y-6">
        <div>
            <a href="{{ route('diary.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Diary</a>
            <div class="mt-2 flex items-center justify-between">
                <div>
                    <span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 uppercase">
                        {{ str_replace('_', ' ', $entry->entry_type) }}
                    </span>
                    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">{{ $entry->title }}</h1>
                    <p class="text-xs text-gray-500 font-mono mt-0.5">Logged for {{ $entry->entry_date->format('l, F j, Y') }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <a href="{{ route('diary.edit', $entry->id) }}" class="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">Edit</a>
                    <form method="POST" action="{{ route('diary.destroy', $entry->id) }}" onsubmit="return confirm('Delete this diary entry?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100">Delete</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Details Card -->
        <div class="rounded-2xl bg-white p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            @if (!empty($entry->data['clinician']) || !empty($entry->data['facility']))
                <div class="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 text-xs">
                    @if (!empty($entry->data['clinician']))
                        <div>
                            <span class="text-gray-400 block">Clinician</span>
                            <span class="font-bold text-gray-900">{{ $entry->data['clinician'] }}</span>
                        </div>
                    @endif
                    @if (!empty($entry->data['facility']))
                        <div>
                            <span class="text-gray-400 block">Facility</span>
                            <span class="font-bold text-gray-900">{{ $entry->data['facility'] }}</span>
                        </div>
                    @endif
                </div>
            @endif

            <div class="prose prose-sm max-w-none text-gray-800 whitespace-pre-line leading-relaxed">
                {{ $entry->data['notes'] ?? 'No notes recorded.' }}
            </div>

            @if (!empty($entry->tags))
                <div class="pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                    @foreach ($entry->tags as $tag)
                        <span class="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">#{{ $tag }}</span>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Annotations Panel -->
        <div class="rounded-2xl bg-white p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h2 class="text-base font-bold text-gray-900">Personal Annotations & Follow-ups</h2>

            @if ($annotations->isEmpty())
                <p class="text-xs text-gray-500">No follow-up notes added yet.</p>
            @else
                <div class="space-y-3">
                    @foreach ($annotations as $ann)
                        <div class="p-3.5 rounded-xl bg-gray-50 text-xs text-gray-700 border border-gray-100">
                            <p class="leading-relaxed">{{ $ann->body }}</p>
                            <span class="text-[10px] text-gray-400 mt-2 block">{{ $ann->created_at->diffForHumans() }}</span>
                        </div>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ route('diary.annotations.store', $entry->id) }}" class="mt-4 pt-4 border-t border-gray-100">
                @csrf
                <label for="body" class="block text-xs font-semibold text-gray-700 mb-1">Add Note</label>
                <textarea id="body" name="body" rows="2" required placeholder="Write a reminder, question for doctor, or symptom update..."
                          class="w-full rounded-xl border border-gray-300 p-3 text-xs text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"></textarea>
                <div class="mt-2 flex justify-end">
                    <button type="submit" class="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700">Add Note</button>
                </div>
            </form>
        </div>
    </div>
</x-layouts.patient>

