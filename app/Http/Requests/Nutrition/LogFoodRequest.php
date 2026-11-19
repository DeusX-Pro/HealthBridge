<?php

namespace App\Http\Requests\Nutrition;

use Illuminate\Foundation\Http\FormRequest;

class LogFoodRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'food_id' => ['nullable', 'exists:foods,id'],
            'custom_name' => ['nullable', 'string', 'max:120'],
            'log_date' => ['required', 'date'],
            'meal_slot' => ['required', 'in:BREAKFAST,LUNCH,DINNER,SNACK'],
            'servings' => ['required', 'numeric', 'min:0.1', 'max:20'],
            'kcal' => ['required', 'numeric', 'min:1', 'max:5000'],
            'protein_g' => ['nullable', 'numeric', 'min:0'],
            'carb_g' => ['nullable', 'numeric', 'min:0'],
            'fat_g' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
