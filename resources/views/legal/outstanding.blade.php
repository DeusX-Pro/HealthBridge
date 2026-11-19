<x-layouts.guest>
    <x-slot:title>Terms Update Required - HealthBridge</x-slot:title>
    <x-slot:heading>Updated Terms of Service</x-slot:heading>

    <div class="mb-6 text-sm text-gray-600">
        We have updated our terms and privacy protections. Please review and accept the documents below to continue accessing your health vault.
    </div>

    <form method="POST" action="{{ route('legal.accept') }}" class="space-y-6">
        @csrf

        <div class="space-y-4">
            @foreach ($documents as $doc)
                <div class="p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <div class="flex items-start">
                        <input id="doc_{{ $doc->id }}" name="document_ids[]" value="{{ $doc->id }}" type="checkbox" required
                               class="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500">
                        <div class="ml-3">
                            <label for="doc_{{ $doc->id }}" class="text-sm font-bold text-gray-900 block cursor-pointer">
                                {{ $doc->title }} (v{{ $doc->version }})
                            </label>
                            <p class="text-xs text-gray-500 line-clamp-2 mt-1">{{ Str::limit($doc->body, 120) }}</p>
                            <a href="{{ route('legal.show', $doc->slug) }}" target="_blank" class="mt-2 inline-block text-xs font-semibold text-emerald-600 hover:underline">Read full document &rarr;</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div>
            <button type="submit"
                    class="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:from-green-700 hover:to-emerald-700 transition-all">
                Accept and Continue to Dashboard
            </button>
        </div>
    </form>
</x-layouts.guest>

