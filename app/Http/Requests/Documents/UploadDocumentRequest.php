<?php

namespace App\Http\Requests\Documents;

use Illuminate\Foundation\Http\FormRequest;

class UploadDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:LAB_REPORT,PRESCRIPTION,IMAGING,DISCHARGE_SUMMARY,INSURANCE,OTHER'],
            'document_date' => ['required', 'date'],
            'file' => ['required', 'file', 'mimes:pdf,jpeg,png,jpg', 'max:25600'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'tags' => ['nullable', 'array'],
        ];
    }
}
