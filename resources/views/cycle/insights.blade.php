<x-layouts.patient>
    <x-slot:title>Cycle Insights - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div>
            <a href="{{ route('cycle.index') }}" class="text-xs font-semibold text-rose-600 hover:underline">&larr; Back to Cycle Overview</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Cycle Insights & Statistics</h1>
            <p class="text-sm text-gray-500">Historical analytics, cycle regularity, and duration trends.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Average Cycle Length</div>
                <div class="mt-2 flex items-baseline gap-2">
                    <span class="text-3xl font-extrabold text-gray-900">{{ $avgCycleLength }}</span>
                    <span class="text-sm font-medium text-gray-500">days</span>
                </div>
                <div class="mt-1 text-xs text-gray-400">Typical range: 21 - 35 days</div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recorded Cycles</div>
                <div class="mt-2 flex items-baseline gap-2">
                    <span class="text-3xl font-extrabold text-rose-600">{{ $cycles->count() }}</span>
                    <span class="text-sm font-medium text-gray-500">cycles</span>
                </div>
                <div class="mt-1 text-xs text-gray-400">Last 12 months</div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Regularity Status</div>
                <div class="mt-2 text-xl font-bold text-emerald-600">
                    @if($cycles->count() >= 3)
                        Regular
                    @else
                        Gathering data
                    @endif
                </div>
                <div class="mt-1 text-xs text-gray-400">Calculated across your logged cycles</div>
            </div>
        </div>

        <!-- Past Cycles Table -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <h3 class="text-base font-bold text-gray-900">Recorded Cycles History</h3>
            </div>

            @if($cycles->isEmpty())
                <div class="p-8 text-center text-sm text-gray-500">
                    No cycle records found. Mark your flow as Medium or Heavy to record a cycle start.
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($cycles as $c)
                        <div class="p-4 sm:px-6 flex items-center justify-between">
                            <div>
                                <div class="text-sm font-bold text-gray-900">
                                    Started: {{ \Carbon\Carbon::parse($c->cycle_start_date)->format('M d, Y') }}
                                </div>
                                <div class="text-xs text-gray-400 mt-0.5">
                                    @if($c->cycle_end_date)
                                        Ended: {{ \Carbon\Carbon::parse($c->cycle_end_date)->format('M d, Y') }}
                                    @else
                                        Active Cycle
                                    @endif
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold {{ $c->cycle_length_days ? 'bg-rose-50 text-rose-700' : 'bg-gray-100 text-gray-600' }}">
                                    {{ $c->cycle_length_days ? $c->cycle_length_days . ' days' : 'In Progress' }}
                                </span>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

