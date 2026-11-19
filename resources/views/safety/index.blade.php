<x-layouts.patient>
    <x-slot:title>Crisis Safety Plan - HealthBridge</x-slot:title>

    <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    <span>Personal Safety & Crisis Plan</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        Priority Access
                    </span>
                </h1>
                <p class="text-sm text-gray-500">A clear, step-by-step action plan for emotional crises, distress, and emergencies.</p>
            </div>
            <div>
                <a href="{{ route('safety.edit') }}" class="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    Edit Safety Plan
                </a>
            </div>
        </div>

        <!-- 24/7 Immediate Help Banner -->
        <div class="bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-6 text-white shadow-md">
            <h2 class="text-lg font-bold">In Immediate Danger?</h2>
            <p class="text-xs text-rose-100 mt-1">If you are experiencing a life-threatening emergency or feel you cannot stay safe right now:</p>
            <div class="mt-4 flex flex-wrap gap-3">
                <a href="tel:988" class="inline-flex items-center px-4 py-2 bg-white text-rose-700 font-extrabold text-xs rounded-xl shadow-sm hover:bg-rose-50 transition">
                    Call / Text 988 (Lifeline)
                </a>
                <a href="tel:911" class="inline-flex items-center px-4 py-2 bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm hover:bg-rose-800 border border-white/20 transition">
                    Call 911 / Local Emergency
                </a>
            </div>
        </div>

        <!-- Safety Plan Sections -->
        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <!-- Step 1: Warning Signs -->
            <div class="border-b border-gray-100 pb-5">
                <div class="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">1</span>
                    Warning Signs (Thoughts, images, feelings, or behaviors that a crisis may be developing)
                </div>
                <div class="mt-3 pl-8">
                    @if(!empty($plan->warning_signs))
                        <ul class="list-disc space-y-1 text-xs text-gray-700">
                            @foreach($plan->warning_signs as $sign)
                                <li>{{ $sign }}</li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-xs text-gray-400 italic">No warning signs listed yet.</p>
                    @endif
                </div>
            </div>

            <!-- Step 2: Internal Coping Strategies -->
            <div class="border-b border-gray-100 pb-5">
                <div class="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">2</span>
                    Internal Coping Strategies (Things I can do on my own without contacting anyone)
                </div>
                <div class="mt-3 pl-8">
                    @if(!empty($plan->coping_strategies))
                        <ul class="list-disc space-y-1 text-xs text-gray-700">
                            @foreach($plan->coping_strategies as $coping)
                                <li>{{ $coping }}</li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-xs text-gray-400 italic">No coping strategies listed yet.</p>
                    @endif
                </div>
            </div>

            <!-- Step 3: Trusted Personal Contacts -->
            <div class="border-b border-gray-100 pb-5">
                <div class="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span class="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs">3</span>
                    Trusted Contacts & Family Members
                </div>
                <div class="mt-3 pl-8">
                    @if(!empty($plan->emergency_contacts))
                        <ul class="list-disc space-y-1 text-xs text-gray-700">
                            @foreach($plan->emergency_contacts as $contact)
                                <li>
                                    @if(is_array($contact))
                                        <strong>{{ $contact['name'] ?? '' }}</strong>
                                        @if(!empty($contact['phone']))
                                            &bull; <a href="tel:{{ $contact['phone'] }}" class="text-sky-700 hover:underline font-mono font-semibold">{{ $contact['phone'] }}</a>
                                        @endif
                                    @else
                                        {{ $contact }}
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-xs text-gray-400 italic">No trusted contacts listed yet.</p>
                    @endif
                </div>
            </div>

            <!-- Step 4: Professional Contacts -->
            <div class="border-b border-gray-100 pb-5">
                <div class="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span class="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs">4</span>
                    Healthcare Professionals & Clinicians
                </div>
                <div class="mt-3 pl-8">
                    @if(!empty($plan->professional_contacts))
                        <ul class="list-disc space-y-1 text-xs text-gray-700">
                            @foreach($plan->professional_contacts as $prof)
                                <li>
                                    @if(is_array($prof))
                                        <strong>{{ $prof['name'] ?? '' }}</strong>
                                        @if(!empty($prof['phone']))
                                            &bull; <a href="tel:{{ $prof['phone'] }}" class="text-purple-700 hover:underline font-mono font-semibold">{{ $prof['phone'] }}</a>
                                        @endif
                                    @else
                                        {{ $prof }}
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-xs text-gray-400 italic">No professional contacts listed yet.</p>
                    @endif
                </div>
            </div>

            <!-- Step 5: Environment Safety -->
            <div>
                <div class="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs">5</span>
                    Making the Physical Environment Safe
                </div>
                <div class="mt-3 pl-8">
                    @if($plan->environment_safety)
                        <p class="text-xs text-gray-700 whitespace-pre-line">{{ $plan->environment_safety }}</p>
                    @else
                        <p class="text-xs text-gray-400 italic">No environment safety measures specified yet.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-layouts.patient>
