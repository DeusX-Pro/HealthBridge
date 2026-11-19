<x-layouts.patient>
    <x-slot:title>Saved Articles - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div>
            <a href="{{ route('articles.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Health Library</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Saved Articles & Reading List</h1>
            <p class="text-sm text-gray-500">Articles you have bookmarked for quick reference.</p>
        </div>

        @if($bookmarkedArticles->isEmpty())
            <div class="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                </div>
                <h3 class="text-base font-bold text-gray-900">No saved articles yet</h3>
                <p class="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Explore our clinician-reviewed articles and click "Save" to build your personal reading list.</p>
            </div>
        @else
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($bookmarkedArticles as $art)
                    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between overflow-hidden">
                        <div class="p-6">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                                {{ $art->category->name ?? 'General' }}
                            </span>
                            <a href="{{ route('articles.show', $art->slug) }}" class="block mt-2 group">
                                <h3 class="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition leading-snug">{{ $art->title }}</h3>
                                <p class="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">{{ $art->excerpt }}</p>
                            </a>
                        </div>
                        <div class="px-6 py-4 bg-gray-50/75 border-t border-gray-100 flex items-center justify-between text-xs">
                            <span class="text-gray-400">{{ \Carbon\Carbon::parse($art->published_at)->format('M d, Y') }}</span>
                            <form action="{{ route('articles.bookmark', $art->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="text-xs font-semibold text-rose-600 hover:text-rose-800">
                                    Remove
                                </button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="p-4">
                {{ $bookmarkedArticles->links() }}
            </div>
        @endif
    </div>
</x-layouts.patient>

