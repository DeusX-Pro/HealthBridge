<?php

namespace App\Http\Requests\Medications;

use Illuminate\Foundation\Http\FormRequest;

class StoreMedicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'dose' => ['required', 'string', 'max:128'],
            'instructions' => ['nullable', 'string', 'max:2000'],
            'dose_times' => ['required', 'array', 'min:1'],
            'dose_times.*' => ['string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ];
    }
}
