<x-layouts.patient>
    <x-slot:title>Health Checklists - HealthBridge</x-slot:title>

    <div class="space-y-6" x-data="{ showCreateModal: false }">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Health & Care Checklists</h1>
                <p class="text-sm text-gray-500">Organize hospital bags, appointment questions, surgery prep, and symptom monitoring.</p>
            </div>
            <div>
                <button @click="showCreateModal = true" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    New Checklist
                </button>
            </div>
        </div>

        @if($checklists->isEmpty())
            <div class="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                </div>
                <h3 class="text-base font-bold text-gray-900">No checklists created</h3>
                <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Create checklists for upcoming doctor consultations, hospital bags, medication routines, or recovery procedures.</p>
            </div>
        @else
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($checklists as $cl)
                    @php
                        $total = $cl->items->count();
                        $completed = $cl->items->where('is_checked', true)->count();
                        $pct = $total > 0 ? round(($completed / $total) * 100) : 0;
                    @endphp
                    <a href="{{ route('checklists.show', $cl->id) }}" class="block p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition">
                        <div class="flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800">
                                {{ $cl->category }}
                            </span>
                            <span class="text-xs font-bold {{ $pct === 100 ? 'text-emerald-600' : 'text-gray-500' }}">
                                {{ $completed }}/{{ $total }} done ({{ $pct }}%)
                            </span>
                        </div>

                        <h3 class="text-base font-bold text-gray-900 mt-3">{{ $cl->title }}</h3>

                        <div class="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
                            <div class="bg-emerald-500 h-2 rounded-full transition-all duration-300" style="width: {{ $pct }}%"></div>
                        </div>

                        <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                            <span>Created {{ $cl->created_at->diffForHumans() }}</span>
                            <span class="text-emerald-600 font-bold group-hover:underline">Open &rarr;</span>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif

        <!-- Create Modal -->
        <div x-show="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" style="display: none;">
            <div @click.away="showCreateModal = false" class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl space-y-5">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold text-gray-900">Create New Checklist</h3>
                    <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                <form action="{{ route('checklists.store') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Checklist Title</label>
                        <input type="text" name="title" required placeholder="e.g. Doctor Questions, Post-Surgery Kit"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                        <select name="category" class="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs">
                            <option value="CONSULTATION">Doctor Consultation</option>
                            <option value="HOSPITAL">Hospital Bag / Admission</option>
                            <option value="MEDICATION">Medication Routine</option>
                            <option value="RECOVERY">Post-Procedure Recovery</option>
                            <option value="GENERAL">General Health</option>
                        </select>
                    </div>

                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" @click="showCreateModal = false" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700">Cancel</button>
                        <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">Create Checklist</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-layouts.patient>

