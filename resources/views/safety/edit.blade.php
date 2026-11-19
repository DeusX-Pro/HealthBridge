<x-layouts.patient>
    <x-slot:title>Edit Safety Plan - HealthBridge</x-slot:title>

    <div class="max-w-3xl mx-auto space-y-6">
        <div>
            <a href="{{ route('safety.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Safety Plan</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Edit Safety & Crisis Plan</h1>
            <p class="text-sm text-gray-500">Enter one item per line for each of the safety plan sections.</p>
        </div>

        <form action="{{ route('safety.update') }}" method="POST" class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            @csrf
            @method('PUT')

            <div>
                <label for="warning_signs" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    1. Warning Signs (One per line)
                </label>
                <p class="text-xs text-gray-400 mb-2">Thoughts, behaviors, mood shifts, or sensations that indicate things are getting harder.</p>
                <textarea id="warning_signs" name="warning_signs" rows="4" placeholder="Unable to sleep&#10;Isolating from friends&#10;Racing negative thoughts"
                          class="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-mono">{{ old('warning_signs', is_array($plan->warning_signs) ? implode("\n", $plan->warning_signs) : '') }}</textarea>
            </div>

            <div>
                <label for="coping_strategies" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    2. Internal Coping Strategies (One per line)
                </label>
                <p class="text-xs text-gray-400 mb-2">Things I can do by myself to soothe or distract.</p>
                <textarea id="coping_strategies" name="coping_strategies" rows="4" placeholder="10-minute deep breathing or meditation&#10;Listening to calming playlist&#10;Taking a walk in the park"
                          class="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-mono">{{ old('coping_strategies', is_array($plan->coping_strategies) ? implode("\n", $plan->coping_strategies) : '') }}</textarea>
            </div>

            <div>
                <label for="emergency_contacts" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    3. Trusted Contacts & Family (One per line)
                </label>
                <p class="text-xs text-gray-400 mb-2">People I feel safe reaching out to.</p>
                <textarea id="emergency_contacts" name="emergency_contacts" rows="3" placeholder="Sister: +1 555-0192&#10;Best friend Alex: +1 555-0143"
                          class="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-mono">{{ old('emergency_contacts', is_array($plan->emergency_contacts) ? implode("\n", array_map(fn($c) => is_array($c) ? ($c['name'] . (isset($c['phone']) ? ': ' . $c['phone'] : '')) : $c, $plan->emergency_contacts)) : '') }}</textarea>
            </div>

            <div>
                <label for="professional_contacts" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    4. Healthcare Professionals & Hotlines (One per line)
                </label>
                <p class="text-xs text-gray-400 mb-2">Therapist, psychiatrist, or clinic contacts.</p>
                <textarea id="professional_contacts" name="professional_contacts" rows="3" placeholder="Dr. Sarah Jenkins (Therapist): +1 555-0188&#10;988 Crisis Lifeline (24/7)"
                          class="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-mono">{{ old('professional_contacts', is_array($plan->professional_contacts) ? implode("\n", array_map(fn($c) => is_array($c) ? ($c['name'] . (isset($c['phone']) ? ': ' . $c['phone'] : '')) : $c, $plan->professional_contacts)) : '') }}</textarea>
            </div>

            <div>
                <label for="environment_safety" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    5. Making My Environment Safe
                </label>
                <p class="text-xs text-gray-400 mb-2">Steps to secure medications, remove harmful items, or stay in a comfortable space.</p>
                <textarea id="environment_safety" name="environment_safety" rows="3" placeholder="Hand over excess medications to family member, stay in living room with pets..."
                          class="w-full rounded-xl border border-gray-300 p-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">{{ old('environment_safety', $plan->environment_safety) }}</textarea>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('safety.index') }}" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Save Safety Plan
                </button>
            </div>
        </form>
    </div>
</x-layouts.patient>
