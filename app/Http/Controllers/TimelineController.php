<?php

namespace App\Http\Controllers;

use App\Models\ClinicalRecord;
use App\Models\DiaryEntry;
use App\Models\Document;
use App\Models\Measurement;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class TimelineController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $filter = $request->query('category', 'ALL');
        $search = $request->query('q');

        $events = collect();
        $limitPerCategory = $filter === 'ALL' ? 50 : 100;

        // 1. Clinical Records
        if ($filter === 'ALL' || $filter === 'CLINICAL') {
            $records = ClinicalRecord::where('user_id', $user->id)
                ->when($search, fn($q) => $q->where('title', 'like', "%{$search}%"))
                ->latest('recorded_at')
                ->take($limitPerCategory)
                ->get()
                ->map(fn($r) => [
                    'id' => $r->id,
                    'type' => 'CLINICAL_RECORD',
                    'category' => $r->category,
                    'title' => $r->title,
                    'date' => $r->recorded_at,
                    'summary' => $r->clinical_data['summary'] ?? ($r->clinical_data['notes'] ?? ''),
                    'details' => $r->clinical_data,
                    'icon' => 'stethoscope',
                ]);
            $events = $events->concat($records);
        }

        // 2. Diary Entries
        if ($filter === 'ALL' || $filter === 'DIARY') {
            $diary = DiaryEntry::where('user_id', $user->id)
                ->when($search, fn($q) => $q->where('title', 'like', "%{$search}%")->orWhere('search_text', 'like', "%{$search}%"))
                ->latest('entry_date')
                ->take($limitPerCategory)
                ->get()
                ->map(fn($d) => [
                    'id' => $d->id,
                    'type' => 'DIARY_ENTRY',
                    'category' => $d->entry_type,
                    'title' => $d->title,
                    'date' => $d->entry_date,
                    'summary' => $d->data['notes'] ?? ($d->search_text ?? ''),
                    'details' => $d->data,
                    'tags' => $d->tags,
                    'icon' => 'book-open',
                ]);
            $events = $events->concat($diary);
        }

        // 3. Documents
        if ($filter === 'ALL' || $filter === 'DOCUMENTS') {
            $docs = Document::where('user_id', $user->id)
                ->when($search, fn($q) => $q->where('title', 'like', "%{$search}%"))
                ->latest('document_date')
                ->take($limitPerCategory)
                ->get()
                ->map(fn($doc) => [
                    'id' => $doc->id,
                    'type' => 'DOCUMENT',
                    'category' => $doc->category,
                    'title' => $doc->title,
                    'date' => $doc->document_date,
                    'summary' => $doc->notes ?? $doc->file_name,
                    'details' => ['file_name' => $doc->file_name, 'size_bytes' => $doc->size_bytes],
                    'tags' => $doc->tags,
                    'icon' => 'file-text',
                ]);
            $events = $events->concat($docs);
        }

        // 4. Measurements
        if ($filter === 'ALL' || $filter === 'MEASUREMENTS') {
            $measurements = Measurement::where('user_id', $user->id)
                ->latest('measured_at')
                ->take($limitPerCategory)
                ->get()
                ->map(fn($m) => [
                    'id' => $m->id,
                    'type' => 'MEASUREMENT',
                    'category' => $m->measurement_type,
                    'title' => str_replace('_', ' ', $m->measurement_type) . ": {$m->value} " . ($m->value2 ? "/ {$m->value2} " : "") . $m->unit,
                    'date' => $m->measured_at,
                    'summary' => $m->context ? "Context: {$m->context}" : '',
                    'details' => ['value' => $m->value, 'value2' => $m->value2, 'unit' => $m->unit],
                    'icon' => 'activity',
                ]);
            $events = $events->concat($measurements);
        }

        // Sort descending by date
        $sortedEvents = $events->sortByDesc(fn($e) => $e['date'])->values();

        // Paginate results
        $page = (int) $request->query('page', 1);
        $perPage = 15;
        $paginatedEvents = new LengthAwarePaginator(
            $sortedEvents->forPage($page, $perPage)->values(),
            $sortedEvents->count(),
            $perPage,
            $page,
            [
                'path' => route('timeline.index'),
                'query' => $request->query(),
            ]
        );

        return view('timeline.index', [
            'events' => $paginatedEvents,
            'currentFilter' => $filter,
            'search' => $search,
        ]);
    }
}

