<?php

namespace App\Http\Controllers;

use App\Http\Requests\Documents\UploadDocumentRequest;
use App\Models\Document;
use App\Services\VaultService;
use Illuminate\Http\Request;

class DocumentsController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $category = $request->query('category');
        $tag = $request->query('tag');

        $documents = Document::where('user_id', $user->id)
            ->when($category, fn($q) => $q->where('category', $category))
            ->when($tag, fn($q) => $q->whereJsonContains('tags', $tag))
            ->orderByDesc('document_date')
            ->paginate(15);

        $categories = [
            'LAB_REPORT' => 'Lab Reports',
            'PRESCRIPTION' => 'Prescriptions',
            'IMAGING' => 'Imaging & Scans',
            'DISCHARGE_SUMMARY' => 'Discharge Summaries',
            'INSURANCE' => 'Insurance & Claims',
            'OTHER' => 'Other Documents',
        ];

        return view('documents.index', compact('documents', 'categories', 'category', 'tag'));
    }

    public function create()
    {
        $categories = [
            'LAB_REPORT' => 'Lab Report / Test Result',
            'PRESCRIPTION' => 'Prescription',
            'IMAGING' => 'Imaging / Radiology / Scan',
            'DISCHARGE_SUMMARY' => 'Hospital Discharge Summary',
            'INSURANCE' => 'Insurance Document',
            'OTHER' => 'Other Health Document',
        ];

        return view('documents.upload', compact('categories'));
    }

    public function store(UploadDocumentRequest $request, VaultService $vault)
    {
        $file = $request->file('file');
        $validated = $request->validated();

        $vault->storeDocument(auth()->user(), $file, $validated);

        return redirect()->route('documents.index')->with('success', 'Document securely stored in your encrypted vault.');
    }

    public function show(string $id)
    {
        $document = Document::where('user_id', auth()->id())->findOrFail($id);
        return view('documents.show', compact('document'));
    }

    public function download(string $id, VaultService $vault)
    {
        $document = Document::where('user_id', auth()->id())->findOrFail($id);
        return $vault->downloadResponse($document);
    }

    public function destroy(string $id)
    {
        $document = Document::where('user_id', auth()->id())->findOrFail($id);
        $document->delete();

        return redirect()->route('documents.index')->with('success', 'Document removed.');
    }
}

