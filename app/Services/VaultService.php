<?php

namespace App\Services;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VaultService
{
    private array $allowedMimes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
    ];

    public function storeDocument(User $user, UploadedFile $file, array $attributes): Document
    {
        $mime = $file->getMimeType();
        if (!in_array($mime, $this->allowedMimes)) {
            throw new \InvalidArgumentException('Only PDF, JPG, and PNG files are supported in the health vault.');
        }

        $size = $file->getSize();
        $sha256 = hash_file('sha256', $file->getRealPath());

        $randomKey = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('vault/' . $user->id, $randomKey, 'local');

        return Document::create([
            'user_id' => $user->id,
            'title' => $attributes['title'] ?? $file->getClientOriginalName(),
            'category' => $attributes['category'] ?? 'OTHER',
            'document_date' => $attributes['document_date'] ?? now()->toDateString(),
            'tags' => $attributes['tags'] ?? [],
            'notes' => $attributes['notes'] ?? null,
            'file_name' => $file->getClientOriginalName(),
            'storage_path' => $path,
            'content_type' => $mime,
            'size_bytes' => $size,
            'sha256' => $sha256,
            'scan_status' => 'CLEAN',
            'origin' => $attributes['origin'] ?? 'SELF',
            'search_text' => ($attributes['title'] ?? '') . ' ' . ($attributes['notes'] ?? ''),
        ]);
    }

    public function downloadResponse(Document $document)
    {
        if (!Storage::disk('local')->exists($document->storage_path)) {
            abort(404, 'File not found in storage.');
        }

        return Storage::disk('local')->download($document->storage_path, $document->file_name, [
            'Content-Type' => $document->content_type,
        ]);
    }
}

