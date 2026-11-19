<x-layouts.patient>
    <x-slot:title>Community & Peer Support - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    <span>Community & Peer Support</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Pseudonymous
                    </span>
                </h1>
                <p class="text-sm text-gray-500">
                    Safe, moderated spaces to share experiences. You are posting as: <strong class="text-emerald-700 font-mono">{{ $pseudonym }}</strong>
                </p>
            </div>
            <div>
                <a href="{{ route('community.post.create') }}" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    New Discussion Post
                </a>
            </div>
        </div>

        <!-- Channels Grid -->
        <div>
            <h2 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Browse Channels</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                @foreach($channels as $channel)
                    <a href="{{ route('community.channel', $channel->slug) }}" class="p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                        <div>
                            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-2">
                                #
                            </div>
                            <h3 class="text-sm font-bold text-gray-900">{{ $channel->name }}</h3>
                            <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ $channel->description }}</p>
                        </div>
                        <div class="mt-4 pt-2 border-t border-gray-100 text-[11px] text-emerald-600 font-bold">
                            View channel &rarr;
                        </div>
                    </a>
                @endforeach
            </div>
        </div>

        <!-- Recent Posts Feed -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-base font-bold text-gray-900">Recent Community Discussions</h2>
                <span class="text-xs text-gray-400">Live conversations</span>
            </div>

            @if($recentPosts->isEmpty())
                <div class="p-12 text-center text-sm text-gray-500">
                    No community posts yet. Be the first to start a conversation!
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($recentPosts as $post)
                        <a href="{{ route('community.post', $post->id) }}" class="block p-5 sm:px-6 hover:bg-gray-50/75 transition">
                            <div class="flex items-center gap-2 mb-1.5">
                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                                    # {{ $post->channel->name ?? 'General' }}
                                </span>
                                <span class="text-xs text-gray-400">&bull;</span>
                                <span class="text-xs font-mono text-gray-500">{{ $post->pseudonym }}</span>
                                <span class="text-xs text-gray-400">&bull;</span>
                                <span class="text-xs text-gray-400">{{ $post->created_at->diffForHumans() }}</span>
                            </div>

                            <h3 class="text-sm font-bold text-gray-900">{{ $post->title }}</h3>
                            <p class="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{{ $post->body }}</p>

                            <div class="mt-3 flex items-center gap-4 text-xs text-gray-400">
                                <span class="flex items-center gap-1">
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                    {{ $post->comments_count ?? $post->comments()->count() }} comments
                                </span>
                            </div>
                        </a>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

