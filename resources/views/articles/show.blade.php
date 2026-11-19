<x-layouts.patient>
    <x-slot:title>{{ $article->title }} - HealthBridge</x-slot:title>

    <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
            <a href="{{ route('articles.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Health Library</a>
            <form action="{{ route('articles.bookmark', $article->id) }}" method="POST">
                @csrf
                <button type="submit" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold {{ $isBookmarked ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-gray-700 hover:bg-gray-50' }}">
                    <svg class="w-4 h-4 {{ $isBookmarked ? 'text-emerald-600 fill-current' : 'text-gray-400' }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                    {{ $isBookmarked ? 'Saved to Bookmarks' : 'Bookmark Article' }}
                </button>
            </form>
        </div>

        <article class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm space-y-6">
            <div class="border-b border-gray-100 pb-6">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800">
                    {{ $article->category->name ?? 'General Health' }}
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 leading-tight tracking-tight">{{ $article->title }}</h1>
                <div class="text-xs text-gray-400 mt-2 flex items-center gap-3">
                    <span>Published: {{ \Carbon\Carbon::parse($article->published_at)->format('F d, Y') }}</span>
                    <span>&bull;</span>
                    <span>{{ $article->read_time_minutes ?? 5 }} min read</span>
                    <span>&bull;</span>
                    <span class="text-emerald-700 font-semibold">Clinician-Reviewed</span>
                </div>
            </div>

            @if($article->excerpt)
                <div class="text-sm font-medium text-gray-700 italic border-l-4 border-emerald-500 pl-4 py-1">
                    {{ $article->excerpt }}
                </div>
            @endif

            <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4 whitespace-pre-line text-sm">
                {{ $article->content ?? $article->body }}
            </div>
        </article>
    </div>
</x-layouts.patient>

