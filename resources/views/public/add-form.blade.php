<x-layouts.public>
    <x-slot:title>Submit Clinical Records: {{ $link->user->name }} - HealthBridge</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div class="border-b border-gray-100 pb-5 mb-5">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                    Authorized Record Ingestion
                </span>
                <h1 class="text-xl font-extrabold text-gray-900 tracking-tight">Submit Records for {{ $link->user->name }}</h1>
                <p class="text-xs text-gray-500 mt-1">
                    Uploaded records are staged for patient review and encrypted into their permanent personal health record.
                </p>
            </div>

            <form action="{{ route('public.add.submit', ['token' => $token]) }}" method="POST" enctype="multipart/form-data" class="space-y-5">
                @csrf

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="clinic_name" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Clinic / Hospital / Facility</label>
                        <input type="text" id="clinic_name" name="clinic_name" required value="{{ old('clinic_name') }}" placeholder="e.g. Cedarcrest Hospital"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                        @error('clinic_name') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label for="clinician_name" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Clinician / Doctor Name</label>
                        <input type="text" id="clinician_name" name="clinician_name" required value="{{ old('clinician_name', $link->recipient_name) }}" placeholder="e.g. Dr. Jane Adeyemi"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                        @error('clinician_name') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="visit_date" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Service / Visit</label>
                        <input type="date" id="visit_date" name="visit_date" required value="{{ old('visit_date', now()->toDateString()) }}"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                        @error('visit_date') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label for="visit_type" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Encounter Type</label>
                        <select id="visit_type" name="visit_type" required class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900">
                            <option value="CONSULTATION">Outpatient Consultation</option>
                            <option value="LAB_RESULT">Diagnostic / Lab Result</option>
                            <option value="DISCHARGE_SUMMARY">Inpatient Discharge Summary</option>
                            <option value="PROCEDURE">Surgical / Clinical Procedure</option>
                            <option value="PRESCRIPTION">Prescription Refill / Order</option>
                            <option value="OTHER">Other Clinical Encounter</option>
                        </select>
                        @error('visit_type') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                    </div>
                </div>

                <div>
                    <label for="summary" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Clinical Summary / Consultation Notes</label>
                    <textarea id="summary" name="summary" rows="5" placeholder="Document patient presentation, diagnosis, treatment plan, and follow-up guidance..."
                              class="w-full rounded-xl border border-gray-300 p-3.5 text-sm shadow-sm focus:border-slate-900 focus:ring-slate-900 leading-relaxed">{{ old('summary') }}</textarea>
                    @error('summary') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Attach Reports / Lab PDFs (Up to 5 files, 25MB max each)</label>
                    <input type="file" name="files[]" multiple accept=".pdf,.jpg,.jpeg,.png"
                           class="w-full rounded-xl border border-gray-300 p-2 text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200">
                    @error('files') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                    @error('files.*') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
                </div>

                <div class="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" class="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm transition">
                        Submit Records to Patient Vault
                    </button>
                </div>
            </form>
        </div>
    </div>
</x-layouts.public>

