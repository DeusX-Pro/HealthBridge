<x-layouts.patient>
    <x-slot:title>Upload Add Links - Sharing</x-slot:title>

    <div class="space-y-6" x-data="{ showModal: false }">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <a href="{{ route('sharing.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Sharing Hub</a>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Upload Add Links</h1>
                <p class="text-sm text-gray-500">Allow doctors, labs, or clinics to securely upload visit notes and medical documents directly into your review staging queue.</p>
            </div>
            <div>
                <button @click="showModal = true" class="px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Create Add Link
                </button>
            </div>
        </div>

        @if(session('generated_link'))
            <div class="p-6 bg-slate-900 text-white rounded-3xl space-y-2">
                <div class="flex items-center gap-2 font-bold text-sm text-emerald-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Add Link Created!
                </div>
                <p class="text-xs text-slate-300">Give this upload gateway link and your passcode to your doctor or clinic:</p>
                <div class="flex items-center gap-2 mt-2">
                    <input type="text" readonly value="{{ session('generated_link') }}" class="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white">
                    <button onclick="navigator.clipboard.writeText('{{ session('generated_link') }}'); alert('Link copied to clipboard!');" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-emerald-700">
                        Copy
                    </button>
                </div>
            </div>
        @endif

        <!-- Add Links Table -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            @if($addLinks->isEmpty())
                <div class="p-12 text-center text-sm text-gray-500">
                    No upload links created yet. Click "Create Add Link" above.
                </div>
            @else
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-100">
                        <thead class="bg-gray-50/75">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Clinician / Clinic</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Expires</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submissions</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white">
                            @foreach($addLinks as $link)
                                <tr class="hover:bg-gray-50/75 transition">
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-bold text-gray-900">{{ $link->recipient_name }}</div>
                                        <div class="text-xs text-gray-400 font-mono mt-0.5">Token: {{ substr($link->token, 0, 8) }}...</div>
                                    </td>
                                    <td class="px-6 py-4 text-xs text-gray-600">
                                        {{ $link->purpose ?: 'General clinical consultation' }}
                                    </td>
                                    <td class="px-6 py-4 text-xs text-gray-600">
                                        {{ $link->expires_at->format('M d, Y') }}
                                        <div class="text-[10px] text-gray-400">({{ $link->expires_at->diffForHumans() }})</div>
                                    </td>
                                    <td class="px-6 py-4 text-xs font-bold text-gray-800">
                                        {{ $link->submissions_count }} / {{ $link->max_submissions }}
                                    </td>
                                    <td class="px-6 py-4 text-xs">
                                        <span class="px-2.5 py-0.5 rounded-full font-bold {{ $link->status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600' }}">
                                            {{ $link->status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-right text-xs">
                                        @if($link->status === 'ACTIVE')
                                            <form action="{{ route('sharing.add-links.revoke', $link->id) }}" method="POST" onsubmit="return confirm('Revoke this link immediately?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-rose-600 hover:text-rose-900 font-bold">
                                                    Revoke
                                                </button>
                                            </form>
                                        @else
                                            <span class="text-gray-400">Revoked</span>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="p-4 border-t border-gray-100">
                    {{ $addLinks->links() }}
                </div>
            @endif
        </div>

        <!-- Create Add Link Modal -->
        <div x-show="showModal" class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" style="display: none;">
            <div @click.away="showModal = false" class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl space-y-5">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold text-gray-900">Create Upload Add Link</h3>
                    <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                <form action="{{ route('sharing.add-links.store') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Clinician / Clinic Name</label>
                        <input type="text" name="recipient_name" required placeholder="e.g. Dr. Jane Adeyemi, Apex Medical"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Purpose / Notes</label>
                        <input type="text" name="purpose" placeholder="e.g. Routine consultation notes & lab attachment"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Secret Passcode</label>
                            <input type="password" name="passcode" required placeholder="Set 6+ char passcode"
                                   class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Valid Days</label>
                            <select name="valid_days" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                                <option value="1">1 Day</option>
                                <option value="3" selected>3 Days</option>
                                <option value="7">7 Days</option>
                                <option value="14">14 Days</option>
                            </select>
                        </div>
                    </div>

                    <div class="pt-3 flex justify-end gap-2 border-t border-gray-100">
                        <button type="button" @click="showModal = false" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700">Cancel</button>
                        <button type="submit" class="px-5 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm">Generate Add Link</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-layouts.patient>

