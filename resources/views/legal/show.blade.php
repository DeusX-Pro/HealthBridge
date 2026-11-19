<x-layouts.guest>
    <x-slot:title>{{ $document->title }} - HealthBridge</x-slot:title>
    <x-slot:heading>{{ $document->title }}</x-slot:heading>

    <div class="prose prose-sm text-gray-700 space-y-4">
        <div class="flex items-center justify-between text-xs text-gray-500 border-b pb-2">
            <span>Version: {{ $document->version }}</span>
            <span>Published: {{ $document->published_at ? $document->published_at->format('M d, Y') : 'Active' }}</span>
        </div>

        <div class="whitespace-pre-line text-sm leading-relaxed text-gray-800">
            {{ $document->body }}
        </div>

        <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
            <button onclick="window.close()" class="text-xs text-gray-500 hover:text-gray-700">Close Window</button>
            <a href="javascript:history.back()" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back</a>
        </div>
    </div>
</x-layouts.guest>

