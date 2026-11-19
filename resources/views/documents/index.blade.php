<x-layouts.patient>
    <x-slot:title>Documents Vault - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Encrypted Document Vault</h1>
                <p class="text-sm text-gray-500">Securely store and organize lab reports, scans, discharge summaries, and prescriptions.</p>
            </div>
            <a href="{{ route('documents.upload') }}" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload Document
            </a>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            <a href="{{ route('documents.index') }}" class="px-3 py-1.5 rounded-xl text-xs font-bold {{ !$category ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">All Documents</a>
            @foreach ($categories as $k => $label)
                <a href="{{ route('documents.index', ['category' => $k]) }}" class="px-3 py-1.5 rounded-xl text-xs font-bold {{ $category === $k ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">{{ $label }}</a>
            @endforeach
        </div>

        @if ($documents->isEmpty())
            <div class="rounded-2xl bg-white p-12 text-center border border-gray-100 shadow-sm">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 class="text-base font-bold text-gray-900">Your health vault is empty</h3>
                <p class="mt-1 text-sm text-gray-500">Upload your PDF reports, lab results, and prescription images for encrypted storage.</p>
                <div class="mt-4">
                    <a href="{{ route('documents.upload') }}" class="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700">Upload First Document</a>
                </div>
            </div>
        @else
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @foreach ($documents as $doc)
                    <div class="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <span class="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 uppercase">
                                    {{ str_replace('_', ' ', $doc->category) }}
                                </span>
                                <span>{{ number_format($doc->size_bytes / 1024, 0) }} KB</span>
                            </div>
                            <h3 class="text-base font-bold text-gray-900">{{ $doc->title }}</h3>
                            <p class="text-xs text-gray-400 font-mono mt-1 truncate">{{ $doc->file_name }}</p>

                            @if ($doc->notes)
                                <p class="mt-2 text-xs text-gray-600 line-clamp-2">{{ $doc->notes }}</p>
                            @endif
                        </div>

                        <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                            <a href="{{ route('documents.download', $doc->id) }}" class="inline-flex items-center gap-1 text-emerald-600 hover:underline">
                                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                Download
                            </a>
                            <form method="POST" action="{{ route('documents.destroy', $doc->id) }}" onsubmit="return confirm('Delete this file from vault?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-rose-500 hover:text-rose-700">Delete</button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-4">
                {{ $documents->links() }}
            </div>
        @endif
    </div>
</x-layouts.patient>

