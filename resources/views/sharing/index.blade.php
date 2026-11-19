<x-layouts.patient>
    <x-slot:title>Sharing & Privacy Access - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <!-- Sub-nav Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                    <span>Sharing & Clinical Access Control</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Zero-Trust
                    </span>
                </h1>
                <p class="text-sm text-gray-500">You have 100% control over who sees your health data. Generate timed, passcode-protected links with instant revocation.</p>
            </div>
            <div class="flex items-center gap-2">
                <a href="{{ route('sharing.view-links') }}" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    View Links
                </a>
                <a href="{{ route('sharing.add-links') }}" class="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm">
                    Upload Add Links
                </a>
            </div>
        </div>

        <!-- Quick Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <a href="{{ route('sharing.view-links') }}" class="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 transition">
                <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active View Links</div>
                <div class="text-3xl font-extrabold text-gray-900 mt-2">{{ $viewLinks->where('status', 'ACTIVE')->count() }}</div>
                <div class="text-xs text-emerald-600 font-semibold mt-1">Manage view access &rarr;</div>
            </a>

            <a href="{{ route('sharing.add-links') }}" class="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 transition">
                <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Upload Add Links</div>
                <div class="text-3xl font-extrabold text-gray-900 mt-2">{{ $addLinks->where('status', 'ACTIVE')->count() }}</div>
                <div class="text-xs text-emerald-600 font-semibold mt-1">Manage upload links &rarr;</div>
            </a>

            <a href="{{ route('sharing.submissions') }}" class="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 transition">
                <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Submissions</div>
                <div class="text-3xl font-extrabold text-amber-600 mt-2">{{ $pendingSubmissionsCount }}</div>
                <div class="text-xs text-amber-700 font-semibold mt-1">Review clinician uploads &rarr;</div>
            </a>

            <a href="{{ route('sharing.history') }}" class="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-300 transition">
                <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Security Audit Trail</div>
                <div class="text-3xl font-extrabold text-sky-600 mt-2">Logs</div>
                <div class="text-xs text-sky-700 font-semibold mt-1">View access history &rarr;</div>
            </a>
        </div>

        <!-- Active View Links Preview Table -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h2 class="text-base font-bold text-gray-900">Active View Links</h2>
                    <p class="text-xs text-gray-400 mt-0.5">Time-limited links shared with doctors, family members, or specialists.</p>
                </div>
                <a href="{{ route('sharing.view-links') }}" class="text-xs font-bold text-emerald-600 hover:underline">View All &rarr;</a>
            </div>

            @if($viewLinks->isEmpty())
                <div class="p-8 text-center text-xs text-gray-400">
                    No view links created yet. Click "View Links" above to generate a secure doctor portal link.
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($viewLinks->take(5) as $link)
                        <div class="p-4 sm:px-6 flex items-center justify-between">
                            <div>
                                <div class="text-sm font-bold text-gray-900">{{ $link->recipient_name }}</div>
                                <div class="text-xs text-gray-400 mt-0.5">
                                    Expires: {{ $link->expires_at->format('M d, Y') }} &bull; Access count: {{ $link->access_count }}
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold {{ $link->status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600' }}">
                                    {{ $link->status }}
                                </span>
                                @if($link->status === 'ACTIVE')
                                    <form action="{{ route('sharing.view-links.revoke', $link->id) }}" method="POST" onsubmit="return confirm('Revoke this link immediately?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-xs text-rose-600 hover:text-rose-800 font-bold">Revoke</button>
                                    </form>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

