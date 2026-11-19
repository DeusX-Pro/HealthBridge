<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleBookmark;
use App\Models\ArticleCategory;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');
        $categories = ArticleCategory::orderBy('sort_order')->get();

        $articles = Article::with('category')
            ->when($categorySlug, function ($q) use ($categorySlug) {
                $q->whereHas('category', fn($cq) => $cq->where('slug', $categorySlug));
            })
            ->latest('published_at')
            ->paginate(12);

        $bookmarkedIds = ArticleBookmark::where('user_id', auth()->id())->pluck('article_id')->toArray();

        return view('articles.index', compact('articles', 'categories', 'categorySlug', 'bookmarkedIds'));
    }

    public function show(string $slug)
    {
        $article = Article::with('category')->where('slug', $slug)->firstOrFail();
        $isBookmarked = ArticleBookmark::where('user_id', auth()->id())->where('article_id', $article->id)->exists();

        return view('articles.show', compact('article', 'isBookmarked'));
    }

    public function saved()
    {
        $bookmarkedArticles = Article::whereHas('bookmarks', fn($q) => $q->where('user_id', auth()->id()))
            ->with('category')
            ->latest()
            ->paginate(12);

        return view('articles.saved', compact('bookmarkedArticles'));
    }

    public function toggleBookmark(string $id)
    {
        $bookmark = ArticleBookmark::where('user_id', auth()->id())->where('article_id', $id)->first();

        if ($bookmark) {
            $bookmark->delete();
            $status = 'Bookmark removed.';
        } else {
            ArticleBookmark::create([
                'user_id' => auth()->id(),
                'article_id' => $id,
            ]);
            $status = 'Article saved to your bookmarks.';
        }

        return back()->with('success', $status);
    }
}

