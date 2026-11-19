<x-layouts.public>
    <x-slot:title>Link Inactive or Expired - HealthBridge</x-slot:title>

    <div class="max-w-md mx-auto my-12 text-center">
        <div class="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-4">
            <div class="w-14 h-14 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h1 class="text-xl font-extrabold text-gray-900">Link Inactive or Expired</h1>
            <p class="text-xs text-gray-600 leading-relaxed">
                {{ $message ?? 'This sharing link has reached its expiration date, exceeded permitted submissions, or has been revoked by the patient.' }}
            </p>
            <p class="text-[11px] text-gray-400">
                If you believe this is an error, please request a new secure link from the patient.
            </p>
        </div>
    </div>
</x-layouts.public>

