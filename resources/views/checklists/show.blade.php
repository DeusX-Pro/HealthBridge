<x-layouts.patient>
    <x-slot:title>{{ $checklist->title }} - Checklist</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('checklists.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Checklists</a>
            <div class="flex items-center justify-between mt-2">
                <div>
                    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $checklist->title }}</h1>
                    <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {{ $checklist->category }}
                    </span>
                </div>
                <form action="{{ route('checklists.destroy', $checklist->id) }}" method="POST" onsubmit="return confirm('Delete this checklist and all its items?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition" title="Delete Checklist">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </form>
            </div>
        </div>

        <!-- Add Item Form -->
        <div class="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
            <form action="{{ route('checklists.items.store', $checklist->id) }}" method="POST" class="flex gap-2">
                @csrf
                <input type="text" name="label" required placeholder="Add a new checklist item..."
                       class="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500">
                <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Add
                </button>
            </form>
        </div>

        <!-- Items List -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            @if($checklist->items->isEmpty())
                <div class="p-10 text-center text-sm text-gray-500">
                    No items yet. Type an item above and click Add!
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($checklist->items as $item)
                        <div class="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 transition">
                            <form action="{{ route('checklists.items.toggle', [$checklist->id, $item->id]) }}" method="POST" class="flex items-center gap-3 flex-1 cursor-pointer">
                                @csrf
                                @method('PATCH')
                                <input type="checkbox" onChange="this.form.submit()" {{ $item->is_checked ? 'checked' : '' }}
                                       class="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 cursor-pointer">
                                <span class="text-sm font-medium {{ $item->is_checked ? 'line-through text-gray-400' : 'text-gray-900' }}">
                                    {{ $item->label }}
                                </span>
                            </form>
                            @if($item->is_checked)
                                <span class="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Completed</span>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

