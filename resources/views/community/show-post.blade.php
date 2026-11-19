<x-layouts.patient>
    <x-slot:title>{{ $post->title }} - Community</x-slot:title>

    <div class="max-w-3xl mx-auto space-y-6" x-data="{ showReportModal: false, reportType: 'POST', reportId: '{{ $post->id }}' }">
        <div>
            <a href="{{ route('community.channel', $post->channel->slug ?? '') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to #{{ $post->channel->name ?? 'Channel' }}</a>
        </div>

        <!-- Post Body Card -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800">
                        # {{ $post->channel->name ?? 'General' }}
                    </span>
                    <span class="text-xs text-gray-400">&bull;</span>
                    <span class="text-xs font-mono font-bold text-gray-600">{{ $post->pseudonym }}</span>
                    <span class="text-xs text-gray-400">&bull;</span>
                    <span class="text-xs text-gray-400">{{ $post->created_at->diffForHumans() }}</span>
                </div>
                <button @click="showReportModal = true; reportType = 'POST'; reportId = '{{ $post->id }}'" class="text-xs text-gray-400 hover:text-rose-600 transition flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                    Report
                </button>
            </div>

            <h1 class="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">{{ $post->title }}</h1>
            <div class="text-sm text-gray-700 leading-relaxed whitespace-pre-line pt-2">{{ $post->body }}</div>
        </div>

        <!-- Comments Section -->
        <div class="space-y-4">
            <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
                <span>Comments</span>
                <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">{{ $post->comments->count() }}</span>
            </h2>

            <!-- Add Comment Form -->
            <form action="{{ route('community.comment.store', $post->id) }}" method="POST" class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
                @csrf
                <div class="text-xs text-gray-500">
                    Replying as: <strong class="text-emerald-700 font-mono">{{ $pseudonym }}</strong>
                </div>
                <textarea name="body" required rows="3" placeholder="Share thoughtful support, relevant advice, or clinical questions..."
                          class="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"></textarea>
                <div class="flex justify-end">
                    <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                        Post Comment
                    </button>
                </div>
            </form>

            <!-- Comments List -->
            @if($post->comments->isEmpty())
                <div class="bg-white rounded-2xl border border-gray-100 p-8 text-center text-xs text-gray-400">
                    No comments yet. Start the conversation!
                </div>
            @else
                <div class="space-y-3">
                    @foreach($post->comments as $comment)
                        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs space-y-2">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="text-xs font-mono font-bold text-emerald-800">{{ $comment->pseudonym }}</span>
                                    <span class="text-xs text-gray-300">&bull;</span>
                                    <span class="text-[11px] text-gray-400">{{ $comment->created_at->diffForHumans() }}</span>
                                </div>
                                <button @click="showReportModal = true; reportType = 'COMMENT'; reportId = '{{ $comment->id }}'" class="text-[11px] text-gray-300 hover:text-rose-600">
                                    Report
                                </button>
                            </div>
                            <div class="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{{ $comment->body }}</div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Moderation Report Modal -->
        <div x-show="showReportModal" class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" style="display: none;">
            <div @click.away="showReportModal = false" class="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-bold text-gray-900">Report Content to Moderators</h3>
                    <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                <form action="{{ route('community.report') }}" method="POST" class="space-y-4">
                    @csrf
                    <input type="hidden" name="target_type" :value="reportType">
                    <input type="hidden" name="target_id" :value="reportId">

                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reason for Report</label>
                        <select name="reason" required class="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs">
                            <option value="SPAM">Spam or commercial promotion</option>
                            <option value="HARASSMENT">Harassment or abusive language</option>
                            <option value="MEDICAL_MISINFORMATION">Dangerous medical advice / misinformation</option>
                            <option value="PRIVACY_VIOLATION">Personal data or privacy leak</option>
                            <option value="OTHER">Other violation</option>
                        </select>
                    </div>

                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" @click="showReportModal = false" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700">Cancel</button>
                        <button type="submit" class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm">Submit Report</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-layouts.patient>

