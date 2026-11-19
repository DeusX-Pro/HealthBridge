<x-layouts.patient>
    <x-slot:title>Create Discussion Post - HealthBridge</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('community.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Community</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Create Discussion Post</h1>
            <p class="text-sm text-gray-500">
                Posting pseudonomously as <strong class="text-emerald-700 font-mono">{{ $pseudonym }}</strong>. Your real identity is never displayed.
            </p>
        </div>

        <form action="{{ route('community.post.store') }}" method="POST" class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-5">
            @csrf

            <div>
                <label for="channel_id" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Select Channel</label>
                <select id="channel_id" name="channel_id" required class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    <option value="">-- Choose a discussion channel --</option>
                    @foreach($channels as $c)
                        <option value="{{ $c->id }}" {{ old('channel_id') === $c->id ? 'selected' : '' }}># {{ $c->name }} ({{ $c->description }})</option>
                    @endforeach
                </select>
                @error('channel_id') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="title" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                <input type="text" id="title" name="title" required value="{{ old('title') }}" placeholder="What question, topic, or experience would you like to discuss?"
                       class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                @error('title') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="body" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Post Content</label>
                <textarea id="body" name="body" rows="6" required placeholder="Share your experience, questions, or helpful tips for other patients..."
                          class="w-full rounded-xl border border-gray-300 p-3.5 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 leading-relaxed">{{ old('body') }}</textarea>
                @error('body') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('community.index') }}" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Publish Post
                </button>
            </div>
        </form>
    </div>
</x-layouts.patient>

