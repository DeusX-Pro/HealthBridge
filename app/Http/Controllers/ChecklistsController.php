<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\ChecklistItem;
use Illuminate\Http\Request;

class ChecklistsController extends Controller
{
    public function index()
    {
        $checklists = Checklist::with('items')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return view('checklists.index', compact('checklists'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:64'],
        ]);

        $checklist = Checklist::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'category' => $validated['category'],
        ]);

        return redirect()->route('checklists.show', $checklist->id)->with('success', 'Checklist created.');
    }

    public function show(string $id)
    {
        $checklist = Checklist::with('items')->where('user_id', auth()->id())->findOrFail($id);
        return view('checklists.show', compact('checklist'));
    }

    public function addItem(Request $request, string $id)
    {
        $checklist = Checklist::where('user_id', auth()->id())->findOrFail($id);

        $request->validate(['label' => ['required', 'string', 'max:255']]);

        ChecklistItem::create([
            'checklist_id' => $checklist->id,
            'label' => $request->input('label'),
            'is_checked' => false,
            'sort_order' => $checklist->items()->count(),
        ]);

        return back()->with('success', 'Item added.');
    }

    public function toggleItem(Request $request, string $checklistId, string $itemId)
    {
        $checklist = Checklist::where('user_id', auth()->id())->findOrFail($checklistId);
        $item = ChecklistItem::where('checklist_id', $checklist->id)->findOrFail($itemId);

        $item->update([
            'is_checked' => !$item->is_checked,
        ]);

        return back();
    }

    public function destroy(string $id)
    {
        $checklist = Checklist::where('user_id', auth()->id())->findOrFail($id);
        $checklist->delete();

        return redirect()->route('checklists.index')->with('success', 'Checklist deleted.');
    }
}

