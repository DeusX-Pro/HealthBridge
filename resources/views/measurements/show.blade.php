<x-layouts.patient>
    <x-slot:title>Vital Reading Details - HealthBridge</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('measurements.index', ['type' => $measurement->measurement_type]) }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to {{ ucwords(strtolower(str_replace('_', ' ', $measurement->measurement_type))) }} History</a>
            <div class="flex items-center justify-between mt-2">
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Vital Reading Details</h1>
                <form action="{{ route('measurements.destroy', $measurement->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this recorded reading?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="inline-flex items-center px-3 py-1.5 border border-red-200 text-xs font-medium rounded-xl text-red-600 bg-red-50 hover:bg-red-100">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        Delete Reading
                    </button>
                </form>
            </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div class="flex items-center justify-between border-b border-gray-100 pb-6">
                <div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
                        {{ ucwords(strtolower(str_replace('_', ' ', $measurement->measurement_type))) }}
                    </span>
                    <div class="text-3xl font-extrabold text-gray-900">
                        {{ $measurement->value }}@if($measurement->value2)/{{ $measurement->value2 }}@endif
                        <span class="text-lg font-medium text-gray-500">{{ $measurement->unit }}</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm font-semibold text-gray-900">{{ \Carbon\Carbon::parse($measurement->measured_at)->format('M d, Y') }}</div>
                    <div class="text-xs text-gray-400">{{ \Carbon\Carbon::parse($measurement->measured_at)->format('h:i A') }}</div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recording Source</h3>
                    <p class="mt-1 text-sm font-medium text-gray-800">
                        @if($measurement->source === 'HOSPITAL')
                            <span class="text-blue-600 font-semibold">Hospital EMR Clinical Record</span>
                        @elseif($measurement->source === 'DEVICE')
                            <span class="text-indigo-600 font-semibold">Connected Medical Device / Wearable</span>
                        @else
                            <span class="text-gray-700">Self Recorded by Patient</span>
                        @endif
                    </p>
                </div>

                @if($measurement->context)
                <div>
                    <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Measurement Context</h3>
                    <p class="mt-1 text-sm font-medium text-gray-800 capitalize">{{ str_replace('_', ' ', $measurement->context) }}</p>
                </div>
                @endif
            </div>

            @if($measurement->notes)
            <div class="border-t border-gray-100 pt-6">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Notes & Symptoms</h3>
                <p class="mt-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{{ $measurement->notes }}</p>
            </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

