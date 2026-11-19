<?php

namespace App\Services;

use App\Models\Food;
use App\Models\NutritionPlan;
use App\Models\NutritionProfile;
use App\Models\User;
use Carbon\Carbon;

class NutritionEngine
{
    /**
     * Calculate Daily Calorie & Macro Targets based on Mifflin-St Jeor formula.
     */
    public function calculateTargets(User $user, NutritionProfile $profile, ?float $currentWeightKg = null, ?float $heightCm = null): array
    {
        $weight = $currentWeightKg ?: ($profile->target_weight_kg ?: 70.0);
        $height = $heightCm ?: 170.0;
        $age = Carbon::parse($user->date_of_birth)->age ?: 30;

        // Mifflin-St Jeor Equation
        // Men: BMR = 10W + 6.25H - 5A + 5
        // Women: BMR = 10W + 6.25H - 5A - 161
        if ($user->isMale()) {
            $bmr = (10 * $weight) + (6.25 * $height) - (5 * $age) + 5;
        } else {
            $bmr = (10 * $weight) + (6.25 * $height) - (5 * $age) - 161;
        }

        $multiplier = match ($profile->activity_level) {
            'SEDENTARY' => 1.2,
            'LIGHT' => 1.375,
            'MODERATE' => 1.55,
            'ACTIVE' => 1.725,
            'VERY_ACTIVE' => 1.9,
            default => 1.4,
        };

        $tdee = (int) round($bmr * $multiplier);

        $calorieTarget = match ($profile->goal) {
            'LOSE' => max(1200, $tdee - 500),
            'GAIN' => $tdee + 400,
            default => $tdee,
        };

        // Macro breakdown based on diet type
        $macroPercentages = match ($profile->diet_type) {
            'HIGH_PROTEIN' => ['protein' => 0.35, 'fat' => 0.25, 'carb' => 0.40],
            'LOW_CARB' => ['protein' => 0.30, 'fat' => 0.50, 'carb' => 0.20],
            'VEGAN', 'VEGETARIAN' => ['protein' => 0.20, 'fat' => 0.25, 'carb' => 0.55],
            default => ['protein' => 0.25, 'fat' => 0.30, 'carb' => 0.45],
        };

        $proteinGrams = (int) round(($calorieTarget * $macroPercentages['protein']) / 4);
        $carbGrams = (int) round(($calorieTarget * $macroPercentages['carb']) / 4);
        $fatGrams = (int) round(($calorieTarget * $macroPercentages['fat']) / 9);

        return [
            'calories' => $calorieTarget,
            'protein_g' => $proteinGrams,
            'carb_g' => $carbGrams,
            'fat_g' => $fatGrams,
        ];
    }

    /**
     * Generate 7-day structured meal plan.
     */
    public function generatePlan(User $user, NutritionProfile $profile): NutritionPlan
    {
        $targets = $this->calculateTargets($user, $profile);

        $availableFoods = Food::where(function ($q) use ($user) {
            $q->whereNull('user_id')->orWhere('user_id', $user->id);
        })->where('is_hidden', false)->get();

        $days = [];
        $dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        $getFoodsForSlot = function (array $categories, int $count) use ($availableFoods) {
            $upperCategories = array_map('strtoupper', $categories);
            $matched = $availableFoods->filter(fn($f) => in_array(strtoupper($f->category), $upperCategories));
            if ($matched->count() < $count) {
                $matched = $matched->concat($availableFoods);
            }
            return $matched->unique('id')->shuffle()->take($count)->values();
        };

        foreach ($dayNames as $dayIndex => $dayName) {
            $breakfastFoods = $getFoodsForSlot(['Breakfast', 'GRAIN', 'FRUIT', 'DAIRY'], 2);
            $lunchFoods = $getFoodsForSlot(['Main', 'MEAL', 'PROTEIN', 'VEGETABLE'], 2);
            $dinnerFoods = $getFoodsForSlot(['Dinner', 'Main', 'MEAL', 'PROTEIN'], 2);
            $snackFoods = $getFoodsForSlot(['Snack', 'FRUIT', 'DAIRY'], 1);

            $days[] = [
                'day' => $dayIndex + 1,
                'day_name' => $dayName,
                'meals' => [
                    'BREAKFAST' => $breakfastFoods->map(fn($f) => ['food_id' => $f->id, 'name' => $f->name, 'kcal' => $f->kcal, 'servings' => 1])->toArray(),
                    'LUNCH' => $lunchFoods->map(fn($f) => ['food_id' => $f->id, 'name' => $f->name, 'kcal' => $f->kcal, 'servings' => 1])->toArray(),
                    'DINNER' => $dinnerFoods->map(fn($f) => ['food_id' => $f->id, 'name' => $f->name, 'kcal' => $f->kcal, 'servings' => 1])->toArray(),
                    'SNACK' => $snackFoods->map(fn($f) => ['food_id' => $f->id, 'name' => $f->name, 'kcal' => $f->kcal, 'servings' => 1])->toArray(),
                ]
            ];
        }

        return NutritionPlan::create([
            'user_id' => $user->id,
            'status' => 'ACTIVE',
            'start_date' => Carbon::today()->toDateString(),
            'calorie_target' => $targets['calories'],
            'protein_target_g' => $targets['protein_g'],
            'carb_target_g' => $targets['carb_g'],
            'fat_target_g' => $targets['fat_g'],
            'days_data' => $days,
        ]);
    }
}

