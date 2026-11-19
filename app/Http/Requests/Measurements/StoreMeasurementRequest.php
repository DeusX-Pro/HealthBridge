<?php

namespace App\Http\Requests\Measurements;

use Illuminate\Foundation\Http\FormRequest;

class StoreMeasurementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'measurement_type' => ['required', 'in:WEIGHT,HEIGHT,WAIST,BLOOD_PRESSURE,HEART_RATE,TEMPERATURE,GLUCOSE,OXYGEN,SLEEP'],
            'value' => ['required', 'numeric'],
            'value2' => ['nullable', 'numeric'],
            'unit' => ['required', 'string', 'max:16'],
            'context' => ['nullable', 'string', 'max:32'],
            'measured_at' => ['required', 'date'],
        ];
    }
}
