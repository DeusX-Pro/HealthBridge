<x-layouts.patient>
    <x-slot:title>Security Audit Trail - Sharing</x-slot:title>

    <div class="space-y-6">
        <div>
            <a href="{{ route('sharing.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Sharing Hub</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Access History & Security Audit Trail</h1>
            <p class="text-sm text-gray-500">Tamper-evident audit log of every credential grant, link access, document view, and record import.</p>
        </div>

        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            @if($logs->isEmpty())
                <div class="p-12 text-center text-sm text-gray-500">
                    No access history records found.
                </div>
            @else
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-100">
                        <thead class="bg-gray-50/75">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actor / User</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resource</th>
                                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white">
                            @foreach($logs as $log)
                                <tr class="hover:bg-gray-50/75 transition">
                                    <td class="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                        {{ $log->created_at->format('M d, Y h:i:s A') }}
                                    </td>
                                    <td class="px-6 py-4 text-xs font-bold text-gray-900 whitespace-nowrap">
                                        {{ $log->actor_name }}
                                    </td>
                                    <td class="px-6 py-4 text-xs whitespace-nowrap">
                                        <span class="px-2 py-0.5 rounded text-[10px] font-bold {{ $log->actor_type === 'PATIENT' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700' }}">
                                            {{ $log->actor_type }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-xs font-semibold text-gray-800 whitespace-nowrap">
                                        {{ str_replace('_', ' ', $log->action) }}
                                    </td>
                                    <td class="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                        {{ $log->resource_type }}
                                    </td>
                                    <td class="px-6 py-4 text-right text-xs font-mono text-gray-400 whitespace-nowrap">
                                        {{ $log->ip_address ?: '127.0.0.1' }}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="p-4 border-t border-gray-100">
                    {{ $logs->links() }}
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

