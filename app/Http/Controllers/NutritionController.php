<?php

namespace App\Http\Controllers;

use App\Http\Requests\Nutrition\LogFoodRequest;
use App\Http\Requests\Nutrition\NutritionProfileRequest;
use App\Models\Food;
use App\Models\FoodLog;
use App\Models\NutritionPlan;
use App\Models\NutritionProfile;
use App\Models\WaterLog;
use App\Services\NutritionEngine;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NutritionController extends Controller
{
    public function index(Request $request, NutritionEngine $engine)
    {
        $user = auth()->user();
        $date = $request->query('date', Carbon::today()->toDateString());

        $profile = $user->nutritionProfile;
        $targets = null;
        if ($profile) {
            $targets = $engine->calculateTargets($user, $profile);
        }

        // Daily logs for selected date
        $foodLogs = FoodLog::with('food')
            ->where('user_id', $user->id)
            ->where('log_date', $date)
            ->get();

        $waterLogs = WaterLog::where('user_id', $user->id)
            ->where('log_date', $date)
            ->get();

        $totalKcal = $foodLogs->sum('kcal');
        $totalProtein = $foodLogs->sum('protein_g');
        $totalCarb = $foodLogs->sum('carb_g');
        $totalFat = $foodLogs->sum('fat_g');
        $totalWater = $waterLogs->sum('amount_ml');

        $activePlan = NutritionPlan::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->latest()
            ->first();

        return view('nutrition.index', compact(
            'date',
            'profile',
            'targets',
            'foodLogs',
            'waterLogs',
            'totalKcal',
            'totalProtein',
            'totalCarb',
            'totalFat',
            'totalWater',
            'activePlan'
        ));
    }

    public function profile()
    {
        $user = auth()->user();
        $profile = $user->nutritionProfile ?: new NutritionProfile();

        return view('nutrition.profile', compact('profile'));
    }

    public function saveProfile(NutritionProfileRequest $request)
    {
        $validated = $request->validated();

        NutritionProfile::updateOrCreate(
            ['user_id' => auth()->id()],
            $validated
        );

        return redirect()->route('nutrition.index')->with('success', 'Nutrition profile updated.');
    }

    public function foods(Request $request)
    {
        $user = auth()->user();
        $search = $request->query('q');

        $foods = Food::where(function ($q) use ($user) {
            $q->whereNull('user_id')->orWhere('user_id', $user->id);
        })
        ->where('is_hidden', false)
        ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
        ->orderBy('name')
        ->paginate(20);

        return view('nutrition.foods', compact('foods', 'search'));
    }

    public function storeFood(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'category' => ['required', 'string'],
            'serving_label' => ['required', 'string', 'max:64'],
            'serving_grams' => ['required', 'numeric', 'min:1'],
            'kcal' => ['required', 'numeric', 'min:1'],
            'protein_g' => ['nullable', 'numeric', 'min:0'],
            'carb_g' => ['nullable', 'numeric', 'min:0'],
            'fat_g' => ['nullable', 'numeric', 'min:0'],
            'fibre_g' => ['nullable', 'numeric', 'min:0'],
            'is_vegetarian' => ['boolean'],
        ]);

        Food::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'category' => $validated['category'],
            'serving_label' => $validated['serving_label'],
            'serving_grams' => $validated['serving_grams'],
            'kcal' => $validated['kcal'],
            'protein_g' => $validated['protein_g'] ?? 0,
            'carb_g' => $validated['carb_g'] ?? 0,
            'fat_g' => $validated['fat_g'] ?? 0,
            'fibre_g' => $validated['fibre_g'] ?? 0,
            'is_vegetarian' => $request->boolean('is_vegetarian'),
        ]);

        return back()->with('success', 'Custom food added to your library.');
    }

    public function logFood(LogFoodRequest $request)
    {
        $validated = $request->validated();

        FoodLog::create([
            'user_id' => auth()->id(),
            'food_id' => $validated['food_id'] ?? null,
            'custom_name' => $validated['custom_name'] ?? null,
            'log_date' => $validated['log_date'],
            'meal_slot' => $validated['meal_slot'],
            'servings' => $validated['servings'],
            'kcal' => $validated['kcal'],
            'protein_g' => $validated['protein_g'] ?? 0,
            'carb_g' => $validated['carb_g'] ?? 0,
            'fat_g' => $validated['fat_g'] ?? 0,
        ]);

        return back()->with('success', 'Food logged.');
    }

    public function deleteFoodLog(string $id)
    {
        FoodLog::where('user_id', auth()->id())->findOrFail($id)->delete();
        return back()->with('info', 'Item removed.');
    }

    public function addWater(Request $request)
    {
        $validated = $request->validate([
            'log_date' => ['required', 'date'],
            'amount_ml' => ['required', 'integer', 'min:50', 'max:5000'],
        ]);

        WaterLog::create([
            'user_id' => auth()->id(),
            'log_date' => $validated['log_date'],
            'amount_ml' => $validated['amount_ml'],
        ]);

        return back()->with('success', 'Water intake logged.');
    }

    public function deleteWater(string $id)
    {
        WaterLog::where('user_id', auth()->id())->findOrFail($id)->delete();
        return back()->with('info', 'Water entry removed.');
    }

    public function generatePlan(NutritionEngine $engine)
    {
        $user = auth()->user();
        $profile = $user->nutritionProfile;

        if (!$profile) {
            return redirect()->route('nutrition.profile')->with('error', 'Please configure your nutrition profile first.');
        }

        $engine->generatePlan($user, $profile);

        return redirect()->route('nutrition.plans')->with('success', 'A personalized 7-day meal plan has been generated!');
    }

    public function plans()
    {
        $plans = NutritionPlan::where('user_id', auth()->id())->latest()->get();
        return view('nutrition.plans', compact('plans'));
    }

    public function progress()
    {
        $user = auth()->user();
        $pastDays = collect();

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i)->toDateString();
            $calories = (int) FoodLog::where('user_id', $user->id)->where('log_date', $date)->sum('kcal');
            $water = (int) WaterLog::where('user_id', $user->id)->where('log_date', $date)->sum('amount_ml');

            $pastDays->push([
                'date' => Carbon::parse($date)->format('D, M d'),
                'calories' => $calories,
                'water' => $water,
            ]);
        }

        return view('nutrition.progress', compact('pastDays'));
    }
}

