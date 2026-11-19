<x-layouts.patient>
    <x-slot:title>Health Articles & Guides - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Clinician-Reviewed Health Library</h1>
                <p class="text-sm text-gray-500">Evidence-based medical articles, preventative care guidelines, and lifestyle medicine.</p>
            </div>
            <div>
                <a href="{{ route('articles.saved') }}" class="inline-flex items-center px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-sm gap-2">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                    Saved Articles
                </a>
            </div>
        </div>

        <!-- Categories Filter -->
        <div class="flex flex-wrap items-center gap-2">
            <a href="{{ route('articles.index') }}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold {{ empty($categorySlug) ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">
                All Topics
            </a>
            @foreach($categories as $cat)
                <a href="{{ route('articles.index', ['category' => $cat->slug]) }}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold {{ $categorySlug === $cat->slug ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">
                    {{ $cat->name }}
                </a>
            @endforeach
        </div>

        <!-- Articles Grid -->
        @if($articles->isEmpty())
            <div class="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                <p class="text-sm text-gray-500">No articles found in this category.</p>
            </div>
        @else
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($articles as $art)
                    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-3">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                                    {{ $art->category->name ?? 'General' }}
                                </span>
                                <span class="text-[11px] text-gray-400 font-medium">{{ $art->read_time_minutes ?? 4 }} min read</span>
                            </div>

                            <a href="{{ route('articles.show', $art->slug) }}" class="block group">
                                <h3 class="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition leading-snug">{{ $art->title }}</h3>
                                <p class="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">{{ $art->excerpt }}</p>
                            </a>
                        </div>

                        <div class="px-6 py-4 bg-gray-50/75 border-t border-gray-100 flex items-center justify-between text-xs">
                            <span class="text-gray-400">{{ \Carbon\Carbon::parse($art->published_at)->format('M d, Y') }}</span>
                            <form action="{{ route('articles.bookmark', $art->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="text-xs font-semibold {{ in_array($art->id, $bookmarkedIds) ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600' }}">
                                    {{ in_array($art->id, $bookmarkedIds) ? '★ Saved' : '☆ Save' }}
                                </button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="p-4">
                {{ $articles->appends(['category' => $categorySlug])->links() }}
            </div>
        @endif
    </div>
</x-layouts.patient>

