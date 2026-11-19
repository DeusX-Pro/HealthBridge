<x-layouts.patient>
    <x-slot:title>Meal Plans - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <a href="{{ route('nutrition.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Nutrition</a>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Personalized Meal Plans</h1>
                <p class="text-sm text-gray-500">Automated 7-day clinical meal plans structured to meet your specific caloric and macronutrient targets.</p>
            </div>
            <div>
                <form action="{{ route('nutrition.plan.generate') }}" method="POST">
                    @csrf
                    <button type="submit" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                        Generate New 7-Day Plan
                    </button>
                </form>
            </div>
        </div>

        @if($plans->isEmpty())
            <div class="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <h3 class="text-base font-bold text-gray-900">No meal plans created yet</h3>
                <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Click "Generate New 7-Day Plan" above to compile a structured, balanced weekly nutrition plan tailored to your profile.</p>
            </div>
        @else
            <div class="space-y-6">
                @foreach($plans as $plan)
                    <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                            <div>
                                <div class="flex items-center gap-3">
                                    <h3 class="text-lg font-bold text-gray-900">{{ $plan->name }}</h3>
                                    <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        {{ $plan->status }}
                                    </span>
                                </div>
                                <div class="text-xs text-gray-400 mt-1">Generated: {{ $plan->created_at->format('M d, Y h:i A') }}</div>
                            </div>
                            <div class="text-right">
                                <span class="text-xs text-gray-400">Target Budget:</span>
                                <span class="text-base font-extrabold text-emerald-600 ml-1">{{ number_format($plan->daily_calorie_target) }} kcal/day</span>
                            </div>
                        </div>

                        <!-- 7-Day Accordion / Grid -->
                        @if(is_array($plan->plan_data))
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                @foreach($plan->plan_data as $dayName => $dayMeals)
                                    <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                                        <div class="text-xs font-bold text-gray-700 uppercase tracking-wider pb-1 border-b border-gray-200">
                                            {{ ucfirst($dayName) }}
                                        </div>
                                        @if(is_array($dayMeals))
                                            @foreach($dayMeals as $mealName => $details)
                                                <div class="text-xs">
                                                    <span class="font-bold text-gray-800 capitalize">{{ $mealName }}:</span>
                                                    <span class="text-gray-600 block mt-0.5">
                                                        {{ is_array($details) ? ($details['name'] ?? json_encode($details)) : $details }}
                                                    </span>
                                                </div>
                                            @endforeach
                                        @endif
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</x-layouts.patient>

