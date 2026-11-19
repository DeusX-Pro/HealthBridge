<x-layouts.patient>
    <x-slot:title>Nutrition Profile & Targets - HealthBridge</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('nutrition.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Nutrition</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Nutrition & Calorie Profile</h1>
            <p class="text-sm text-gray-500">Configure your daily activity, fitness goals, and dietary guidelines for calculated Mifflin-St Jeor targets.</p>
        </div>

        <form action="{{ route('nutrition.profile.save') }}" method="POST" class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            @csrf

            <div>
                <label for="goal" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Health & Weight Goal</label>
                <select id="goal" name="goal" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    <option value="MAINTAIN" {{ old('goal', $profile->goal) === 'MAINTAIN' ? 'selected' : '' }}>Maintain Weight & Optimize Health</option>
                    <option value="LOSE" {{ old('goal', $profile->goal) === 'LOSE' ? 'selected' : '' }}>Gradual Fat Loss</option>
                    <option value="GAIN" {{ old('goal', $profile->goal) === 'GAIN' ? 'selected' : '' }}>Lean Muscle & Healthy Weight Gain</option>
                    <option value="HEALTHY" {{ old('goal', $profile->goal) === 'HEALTHY' ? 'selected' : '' }}>Metabolic Wellness & Longevity</option>
                </select>
                @error('goal') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="activity_level" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Daily Physical Activity Level</label>
                <select id="activity_level" name="activity_level" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    <option value="SEDENTARY" {{ old('activity_level', $profile->activity_level) === 'SEDENTARY' ? 'selected' : '' }}>Sedentary (Desk job, little intentional exercise)</option>
                    <option value="LIGHT" {{ old('activity_level', $profile->activity_level) === 'LIGHT' ? 'selected' : '' }}>Lightly Active (1–3 light exercise sessions/week)</option>
                    <option value="MODERATE" {{ old('activity_level', $profile->activity_level) === 'MODERATE' ? 'selected' : '' }}>Moderately Active (3–5 moderate workouts/week)</option>
                    <option value="ACTIVE" {{ old('activity_level', $profile->activity_level) === 'ACTIVE' ? 'selected' : '' }}>Very Active (6–7 heavy workouts/week)</option>
                    <option value="VERY_ACTIVE" {{ old('activity_level', $profile->activity_level) === 'VERY_ACTIVE' ? 'selected' : '' }}>Extremely Active (Athletic training / physical labor)</option>
                </select>
                @error('activity_level') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="diet_type" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Dietary Philosophy</label>
                <select id="diet_type" name="diet_type" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    <option value="BALANCED" {{ old('diet_type', $profile->diet_type) === 'BALANCED' ? 'selected' : '' }}>Balanced Whole Foods (50% Carb, 20% Protein, 30% Fat)</option>
                    <option value="HIGH_PROTEIN" {{ old('diet_type', $profile->diet_type) === 'HIGH_PROTEIN' ? 'selected' : '' }}>High Protein (30% Protein for recovery & satiety)</option>
                    <option value="VEGETARIAN" {{ old('diet_type', $profile->diet_type) === 'VEGETARIAN' ? 'selected' : '' }}>Vegetarian</option>
                    <option value="VEGAN" {{ old('diet_type', $profile->diet_type) === 'VEGAN' ? 'selected' : '' }}>Vegan (100% Plant-Based)</option>
                    <option value="PESCATARIAN" {{ old('diet_type', $profile->diet_type) === 'PESCATARIAN' ? 'selected' : '' }}>Pescatarian</option>
                    <option value="LOW_CARB" {{ old('diet_type', $profile->diet_type) === 'LOW_CARB' ? 'selected' : '' }}>Low Carb / Ketogenic</option>
                    <option value="LOW_SUGAR" {{ old('diet_type', $profile->diet_type) === 'LOW_SUGAR' ? 'selected' : '' }}>Low Glycemic / Low Sugar</option>
                </select>
                @error('diet_type') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="target_weight_kg" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Target Weight (kg, optional)</label>
                    <input type="number" step="0.5" id="target_weight_kg" name="target_weight_kg" value="{{ old('target_weight_kg', $profile->target_weight_kg) }}"
                           placeholder="e.g. 68" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                </div>
                <div>
                    <label for="pace_kg_per_week" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pace (kg/week, optional)</label>
                    <input type="number" step="0.1" id="pace_kg_per_week" name="pace_kg_per_week" value="{{ old('pace_kg_per_week', $profile->pace_kg_per_week) }}"
                           placeholder="e.g. 0.5" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                </div>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('nutrition.index') }}" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Save Profile & Calculate Targets
                </button>
            </div>
        </form>
    </div>
</x-layouts.patient>

