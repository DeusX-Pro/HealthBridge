<?php

namespace App\Http\Requests\Cycle;

use Illuminate\Foundation\Http\FormRequest;

class DailyLogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isFemale();
    }

    public function rules(): array
    {
        return [
            'log_date' => ['required', 'date'],
            'flow_intensity' => ['required', 'in:NONE,LIGHT,MEDIUM,HEAVY,SPOTTING'],
            'bbt_celsius' => ['nullable', 'numeric', 'between:34,42'],
            'cervical_mucus' => ['nullable', 'string', 'max:32'],
            'ovulation_test' => ['nullable', 'string', 'max:16'],
            'pregnancy_test' => ['nullable', 'string', 'max:16'],
            'symptoms' => ['nullable', 'array'],
            'mood' => ['nullable', 'string', 'max:64'],
            'sexual_activity' => ['nullable', 'array'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
