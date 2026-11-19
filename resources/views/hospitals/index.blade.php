<x-layouts.patient>
    <x-slot:title>Connected Hospitals & Clinics - HealthBridge</x-slot:title>

    <div class="space-y-6" x-data="{ showConnectModal: false }">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Connected Hospital Feeds</h1>
                <p class="text-sm text-gray-500">Live clinical integrations with certified hospital EHR systems and diagnostic labs.</p>
            </div>
            <div>
                <button @click="showConnectModal = true" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Connect Hospital EMR
                </button>
            </div>
        </div>

        <!-- Connections List -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            @if($connections->isEmpty())
                <div class="p-12 text-center text-sm text-gray-500">
                    <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    </div>
                    <h3 class="text-base font-bold text-gray-900">No hospital connections yet</h3>
                    <p class="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Link your patient MRN (Medical Record Number) to import official clinical discharge summaries, lab tests, and hospital prescriptions automatically.</p>
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($connections as $conn)
                        <div class="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/75 transition">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h3 class="text-sm font-bold text-gray-900">{{ $conn->hospital_name }}</h3>
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold {{ $conn->status === 'CONNECTED' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600' }}">
                                            {{ $conn->status }}
                                        </span>
                                        @if($conn->is_hidden)
                                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">Hidden from Timeline</span>
                                        @endif
                                    </div>
                                    <div class="text-xs text-gray-400 mt-0.5">
                                        MRN: <strong class="text-gray-700 font-mono">{{ $conn->patient_mrn }}</strong> &bull; Last Synced: {{ $conn->last_sync_at ? $conn->last_sync_at->diffForHumans() : 'Never' }}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <form action="{{ route('hospitals.toggle-hide', $conn->id) }}" method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <button type="submit" class="px-3.5 py-1.5 border border-gray-200 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-100">
                                        {{ $conn->is_hidden ? 'Unhide Records' : 'Hide from Feed' }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <!-- Connect Hospital Modal -->
        <div x-show="showConnectModal" class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" style="display: none;">
            <div @click.away="showConnectModal = false" class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl space-y-5">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold text-gray-900">Link Hospital EMR Feed</h3>
                    <button @click="showConnectModal = false" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                <form action="{{ route('hospitals.connect') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Select Facility or Enter Name</label>
                        <input type="text" name="hospital_name" required placeholder="e.g. Cedarcrest Hospital, Apex Diagnostics"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Patient MRN / Hospital ID</label>
                        <input type="text" name="patient_mrn" required placeholder="e.g. MRN-847291"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm font-mono shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                        <p class="text-[11px] text-gray-400 mt-1">Found on your appointment cards or hospital invoice receipts.</p>
                    </div>

                    <div class="pt-3 flex justify-end gap-2 border-t border-gray-100">
                        <button type="button" @click="showConnectModal = false" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700">Cancel</button>
                        <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">Authorize & Connect</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-layouts.patient>

