<?php

namespace App\Http\Requests\Sharing;

use Illuminate\Foundation\Http\FormRequest;

class CreateViewLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'recipient_name' => ['required', 'string', 'max:255'],
            'passcode' => ['required', 'string', 'min:4', 'max:32'],
            'sections' => ['required', 'array', 'min:1'],
            'sections.*' => ['string'],
            'valid_days' => ['nullable', 'integer', 'between:1,30'],
        ];
    }
}
