<?php

namespace App\Http\Requests\Sharing;

use Illuminate\Foundation\Http\FormRequest;

class CreateAddLinkRequest extends FormRequest
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
            'purpose' => ['nullable', 'string', 'max:255'],
            'valid_days' => ['nullable', 'integer', 'between:1,30'],
            'max_submissions' => ['nullable', 'integer', 'between:1,10'],
        ];
    }
}
