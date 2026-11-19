<?php

namespace App\Http\Controllers;

use App\Http\Requests\Community\StoreCommentRequest;
use App\Http\Requests\Community\StorePostRequest;
use App\Models\CommunityChannel;
use App\Models\CommunityComment;
use App\Models\CommunityPost;
use App\Models\CommunityProfile;
use App\Models\CommunityReport;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CommunityController extends Controller
{
    private function getOrCreatePseudonym(): string
    {
        $profile = CommunityProfile::firstOrCreate(
            ['user_id' => auth()->id()],
            ['pseudonym' => 'Member_' . Str::upper(Str::random(6))]
        );
        return $profile->pseudonym;
    }

    public function index()
    {
        $channels = CommunityChannel::orderBy('sort_order')->get();
        $recentPosts = CommunityPost::with('channel')->latest()->take(15)->get();
        $pseudonym = $this->getOrCreatePseudonym();

        return view('community.index', compact('channels', 'recentPosts', 'pseudonym'));
    }

    public function channel(string $slug)
    {
        $channel = CommunityChannel::where('slug', $slug)->firstOrFail();
        $posts = CommunityPost::where('channel_id', $channel->id)->latest()->paginate(15);
        $pseudonym = $this->getOrCreatePseudonym();

        return view('community.channel', compact('channel', 'posts', 'pseudonym'));
    }

    public function createPost()
    {
        $channels = CommunityChannel::orderBy('sort_order')->get();
        $pseudonym = $this->getOrCreatePseudonym();

        return view('community.create-post', compact('channels', 'pseudonym'));
    }

    public function storePost(StorePostRequest $request)
    {
        $pseudonym = $this->getOrCreatePseudonym();
        $validated = $request->validated();

        $post = CommunityPost::create([
            'channel_id' => $validated['channel_id'],
            'user_id' => auth()->id(),
            'pseudonym' => $pseudonym,
            'title' => $validated['title'],
            'body' => $validated['body'],
        ]);

        return redirect()->route('community.post', $post->id)->with('success', 'Your post has been published.');
    }

    public function post(string $id)
    {
        $post = CommunityPost::with(['channel', 'comments'])->findOrFail($id);
        $pseudonym = $this->getOrCreatePseudonym();

        return view('community.show-post', compact('post', 'pseudonym'));
    }

    public function storeComment(StoreCommentRequest $request, string $id)
    {
        $post = CommunityPost::findOrFail($id);
        $pseudonym = $this->getOrCreatePseudonym();

        CommunityComment::create([
            'post_id' => $post->id,
            'user_id' => auth()->id(),
            'pseudonym' => $pseudonym,
            'body' => $request->input('body'),
        ]);

        return back()->with('success', 'Comment posted.');
    }

    public function report(Request $request)
    {
        $validated = $request->validate([
            'target_type' => ['required', 'in:POST,COMMENT'],
            'target_id' => ['required', 'string'],
            'reason' => ['required', 'string', 'max:255'],
        ]);

        CommunityReport::create([
            'user_id' => auth()->id(),
            'target_type' => $validated['target_type'],
            'target_id' => $validated['target_id'],
            'reason' => $validated['reason'],
        ]);

        return back()->with('success', 'Thank you. The report has been flagged for moderation.');
    }
}

