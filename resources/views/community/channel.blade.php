<x-layouts.patient>
    <x-slot:title>#{{ $channel->name }} - Community</x-slot:title>

    <div class="space-y-6">
        <div>
            <a href="{{ route('community.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to All Channels</a>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2 border-b border-gray-200 pb-4">
                <div>
                    <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <span># {{ $channel->name }}</span>
                    </h1>
                    <p class="text-sm text-gray-500 mt-0.5">{{ $channel->description }}</p>
                </div>
                <div>
                    <a href="{{ route('community.post.create') }}" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Post in this Channel
                    </a>
                </div>
            </div>
        </div>

        <!-- Channel Posts -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            @if($posts->isEmpty())
                <div class="p-12 text-center text-sm text-gray-500">
                    No discussions in #{{ $channel->name }} yet. Start the first post!
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($posts as $post)
                        <a href="{{ route('community.post', $post->id) }}" class="block p-5 sm:px-6 hover:bg-gray-50/75 transition">
                            <div class="flex items-center gap-2 mb-1.5">
                                <span class="text-xs font-mono font-bold text-gray-600">{{ $post->pseudonym }}</span>
                                <span class="text-xs text-gray-400">&bull;</span>
                                <span class="text-xs text-gray-400">{{ $post->created_at->diffForHumans() }}</span>
                            </div>

                            <h3 class="text-base font-bold text-gray-900">{{ $post->title }}</h3>
                            <p class="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{{ $post->body }}</p>

                            <div class="mt-3 flex items-center gap-4 text-xs text-gray-400">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                    {{ $post->comments()->count() }} comments
                                </span>
                            </div>
                        </a>
                    @endforeach
                </div>

                <div class="p-4 border-t border-gray-100">
                    {{ $posts->links() }}
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

