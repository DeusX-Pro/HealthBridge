<x-layouts.patient>
    <x-slot:title>{{ $document->title }} - Vault Document</x-slot:title>

    <div class="max-w-3xl mx-auto space-y-6">
        <div>
            <a href="{{ route('documents.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Health Vault</a>
            <div class="flex items-center justify-between mt-2">
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $document->title }}</h1>
                <div class="flex items-center gap-2">
                    <a href="{{ route('documents.download', $document->id) }}" class="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        Download
                    </a>
                    <form action="{{ route('documents.destroy', $document->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to permanently delete this document from your vault?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="inline-flex items-center px-3 py-2 border border-red-200 text-xs font-medium rounded-xl text-red-600 bg-red-50 hover:bg-red-100">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div class="flex flex-wrap items-center gap-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {{ str_replace('_', ' ', $document->category) }}
                </span>
                <span class="text-xs text-gray-400">Recorded date: <strong class="text-gray-700">{{ \Carbon\Carbon::parse($document->document_date)->format('F d, Y') }}</strong></span>
            </div>

            <!-- File Details Box -->
            <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs uppercase">
                        {{ pathinfo($document->file_name, PATHINFO_EXTENSION) ?: 'DOC' }}
                    </div>
                    <div>
                        <div class="text-sm font-semibold text-gray-900 truncate max-w-sm">{{ $document->file_name }}</div>
                        <div class="text-xs text-gray-400">{{ number_format($document->file_size / 1024, 1) }} KB &bull; {{ $document->mime_type }}</div>
                    </div>
                </div>
                <div class="hidden sm:block text-right">
                    <span class="inline-flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        SHA-256 Verified
                    </span>
                </div>
            </div>

            @if($document->tags && count($document->tags) > 0)
            <div>
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</h3>
                <div class="flex flex-wrap gap-1.5">
                    @foreach($document->tags as $tag)
                        <span class="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">#{{ $tag }}</span>
                    @endforeach
                </div>
            </div>
            @endif

            @if($document->notes)
            <div>
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</h3>
                <div class="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{{ $document->notes }}</div>
            </div>
            @endif

            <div class="border-t border-gray-100 pt-4 text-xs text-gray-400 space-y-1">
                <div>Document ID: <code class="text-gray-600">{{ $document->id }}</code></div>
                @if($document->sha256_hash)
                    <div class="truncate">Integrity Hash: <code class="text-gray-600">{{ $document->sha256_hash }}</code></div>
                @endif
            </div>
        </div>
    </div>
</x-layouts.patient>

