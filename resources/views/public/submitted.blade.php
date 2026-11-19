<x-layouts.public>
    <x-slot:title>Records Submitted Successfully - HealthBridge</x-slot:title>

    <div class="max-w-md mx-auto my-12 text-center">
        <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-4">
            <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h1 class="text-xl font-extrabold text-gray-900">Submission Received</h1>
            <p class="text-xs text-gray-600 leading-relaxed">
                Thank you. Your clinical notes and attached documents have been safely transmitted and encrypted into <strong class="text-gray-900">{{ $patientName }}</strong>'s private health queue.
            </p>
            <p class="text-[11px] text-gray-400">
                The patient will review and accept these records into their permanent timeline. You may now close this window.
            </p>
        </div>
    </div>
</x-layouts.public>

