<?php

namespace App\Http\Requests\Nutrition;

use Illuminate\Foundation\Http\FormRequest;

class NutritionProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'activity_level' => ['required', 'in:SEDENTARY,LIGHT,MODERATE,ACTIVE,VERY_ACTIVE'],
            'goal' => ['required', 'in:LOSE,GAIN,MAINTAIN,HEALTHY'],
            'diet_type' => ['required', 'in:BALANCED,HIGH_PROTEIN,VEGETARIAN,VEGAN,PESCATARIAN,LOW_CARB,LOW_SUGAR'],
            'target_weight_kg' => ['nullable', 'numeric', 'between:30,300'],
            'target_date' => ['nullable', 'date', 'after:today'],
            'pace_kg_per_week' => ['nullable', 'numeric', 'between:0,2'],
        ];
    }
}
