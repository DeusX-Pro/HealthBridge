@extends('layouts.patient')

@section('title', $medication->name . ' - Medications')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <a href="{{ route('medications.index') }}" class="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                Back to Medications
            </a>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <span>{{ $medication->name }}</span>
                @if($medication->source === 'HOSPITAL')
                    <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">Hospital Prescribed</span>
                @else
                    <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">Self Tracked</span>
                @endif
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Dose: <strong class="text-gray-800 dark:text-gray-200">{{ $medication->dose }}</strong></p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('medications.edit', $medication->id) }}" class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                Edit
            </a>
            <form action="{{ route('medications.destroy', $medication->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this medication and all dose logs? This cannot be undone.');">
                @csrf
                @method('DELETE')
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-red-200 dark:border-red-800 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    Delete
                </button>
            </form>
        </div>
    </div>

    <!-- Medication Details Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Medication Schedule & Instructions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <dt class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Scheduled Daily Times</dt>
                <dd class="mt-2 flex flex-wrap gap-2">
                    @forelse($medication->dose_times ?? [] as $t)
                        <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            {{ \Carbon\Carbon::parse($t)->format('h:i A') }}
                        </span>
                    @empty
                        <span class="text-sm text-gray-400">As needed / No fixed schedule</span>
                    @endforelse
                </dd>
            </div>

            <div>
                <dt class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Schedule Period</dt>
                <dd class="mt-2 text-sm text-gray-900 dark:text-gray-100 font-medium">
                    Started: {{ $medication->start_date ? \Carbon\Carbon::parse($medication->start_date)->format('M d, Y') : 'Unknown' }}
                    @if($medication->end_date)
                        <span class="text-gray-400 mx-1">→</span>
                        Ends: {{ \Carbon\Carbon::parse($medication->end_date)->format('M d, Y') }}
                    @else
                        <span class="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">Ongoing</span>
                    @endif
                </dd>
            </div>

            <div class="md:col-span-2">
                <dt class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Doctor Instructions / Guidance</dt>
                <dd class="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    {{ $medication->instructions ?: 'No specific dietary or administration instructions noted.' }}
                </dd>
            </div>
        </div>
    </div>

    <!-- Dose History Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Recent Dosage History (Last 30 entries)</h2>

        @if($recentDoses->isEmpty())
            <div class="text-center py-8">
                <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">No doses have been recorded for this medication yet.</p>
                <p class="text-xs text-gray-400 mt-1">Doses marked on your Today or Medications page will appear here.</p>
            </div>
        @else
            <div class="overflow-hidden border border-gray-100 dark:border-gray-700 rounded-xl">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled Time</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Logged At</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                        @foreach($recentDoses as $dose)
                            <tr>
                                <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                                    {{ \Carbon\Carbon::parse($dose->scheduled_at)->format('M d, Y - h:i A') }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    @if($dose->status === 'TAKEN')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                            ✓ Taken
                                        </span>
                                    @elseif($dose->status === 'SKIPPED')
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            ✕ Skipped
                                        </span>
                                    @else
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                                            {{ $dose->status }}
                                        </span>
                                    @endif
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                    {{ $dose->updated_at ? $dose->updated_at->diffForHumans() : '-' }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</div>
@endsection

