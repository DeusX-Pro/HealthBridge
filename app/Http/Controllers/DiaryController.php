<?php

namespace App\Http\Controllers;

use App\Models\Annotation;
use App\Models\DiaryEntry;
use Illuminate\Http\Request;

class DiaryController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $type = $request->query('type');
        $tag = $request->query('tag');

        $entries = DiaryEntry::where('user_id', $user->id)
            ->when($type, fn($q) => $q->where('entry_type', $type))
            ->when($tag, fn($q) => $q->whereJsonContains('tags', $tag))
            ->orderByDesc('entry_date')
            ->paginate(15);

        $entryTypes = [
            'CONSULTATION' => 'Consultation',
            'DIAGNOSIS' => 'Diagnosis',
            'PROCEDURE' => 'Procedure',
            'VACCINATION' => 'Vaccination',
            'ALLERGY' => 'Allergy',
            'FAMILY_HISTORY' => 'Family History',
            'SYMPTOM' => 'Symptom',
            'NOTE' => 'Note',
        ];

        return view('diary.index', compact('entries', 'entryTypes', 'type', 'tag'));
    }

    public function create()
    {
        $entryTypes = [
            'CONSULTATION' => 'Doctor / Clinic Consultation',
            'DIAGNOSIS' => 'Diagnosis / Finding',
            'PROCEDURE' => 'Procedure / Surgery',
            'VACCINATION' => 'Vaccination / Immunization',
            'ALLERGY' => 'Allergy / Reaction',
            'FAMILY_HISTORY' => 'Family Medical History',
            'SYMPTOM' => 'Symptom Log',
            'NOTE' => 'Personal Health Note',
        ];

        return view('diary.create', compact('entryTypes'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'entry_type' => ['required', 'string'],
            'entry_date' => ['required', 'date'],
            'title' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'clinician' => ['nullable', 'string', 'max:255'],
            'facility' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string'], // comma-separated
        ]);

        $tags = [];
        if (!empty($validated['tags'])) {
            $tags = array_values(array_filter(array_map('trim', explode(',', $validated['tags']))));
        }

        $data = [
            'notes' => $validated['notes'] ?? '',
            'clinician' => $validated['clinician'] ?? '',
            'facility' => $validated['facility'] ?? '',
        ];

        $searchText = "{$validated['title']} " . ($validated['notes'] ?? '') . " " . implode(' ', $tags);

        DiaryEntry::create([
            'user_id' => auth()->id(),
            'entry_type' => $validated['entry_type'],
            'entry_date' => $validated['entry_date'],
            'title' => $validated['title'],
            'data' => $data,
            'tags' => $tags,
            'origin' => 'SELF',
            'search_text' => $searchText,
        ]);

        return redirect()->route('diary.index')->with('success', 'Diary entry saved successfully.');
    }

    public function show(string $id)
    {
        $entry = DiaryEntry::where('user_id', auth()->id())->findOrFail($id);
        $annotations = Annotation::where('user_id', auth()->id())
            ->where('target_type', 'DIARY_ENTRY')
            ->where('target_id', $entry->id)
            ->latest()
            ->get();

        return view('diary.show', compact('entry', 'annotations'));
    }

    public function edit(string $id)
    {
        $entry = DiaryEntry::where('user_id', auth()->id())->findOrFail($id);
        $entryTypes = [
            'CONSULTATION' => 'Doctor / Clinic Consultation',
            'DIAGNOSIS' => 'Diagnosis / Finding',
            'PROCEDURE' => 'Procedure / Surgery',
            'VACCINATION' => 'Vaccination / Immunization',
            'ALLERGY' => 'Allergy / Reaction',
            'FAMILY_HISTORY' => 'Family Medical History',
            'SYMPTOM' => 'Symptom Log',
            'NOTE' => 'Personal Health Note',
        ];

        return view('diary.edit', compact('entry', 'entryTypes'));
    }

    public function update(Request $request, string $id)
    {
        $entry = DiaryEntry::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'entry_type' => ['required', 'string'],
            'entry_date' => ['required', 'date'],
            'title' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'clinician' => ['nullable', 'string', 'max:255'],
            'facility' => ['nullable', 'string', 'max:255'],
            'tags' => ['nullable', 'string'],
        ]);

        $tags = [];
        if (!empty($validated['tags'])) {
            $tags = array_values(array_filter(array_map('trim', explode(',', $validated['tags']))));
        }

        $data = [
            'notes' => $validated['notes'] ?? '',
            'clinician' => $validated['clinician'] ?? '',
            'facility' => $validated['facility'] ?? '',
        ];

        $searchText = "{$validated['title']} " . ($validated['notes'] ?? '') . " " . implode(' ', $tags);

        $entry->update([
            'entry_type' => $validated['entry_type'],
            'entry_date' => $validated['entry_date'],
            'title' => $validated['title'],
            'data' => $data,
            'tags' => $tags,
            'search_text' => $searchText,
        ]);

        return redirect()->route('diary.show', $entry->id)->with('success', 'Diary entry updated.');
    }

    public function destroy(string $id)
    {
        $entry = DiaryEntry::where('user_id', auth()->id())->findOrFail($id);
        $entry->delete();

        return redirect()->route('diary.index')->with('success', 'Diary entry moved to trash.');
    }

    public function addAnnotation(Request $request, string $id)
    {
        $entry = DiaryEntry::where('user_id', auth()->id())->findOrFail($id);

        $request->validate(['body' => ['required', 'string', 'max:2000']]);

        Annotation::create([
            'user_id' => auth()->id(),
            'target_type' => 'DIARY_ENTRY',
            'target_id' => $entry->id,
            'body' => $request->input('body'),
        ]);

        return back()->with('success', 'Note added to entry.');
    }
}

