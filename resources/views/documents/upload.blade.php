<x-layouts.patient>
    <x-slot:title>Upload Document - HealthBridge Vault</x-slot:title>

    <div class="max-w-xl mx-auto space-y-6">
        <div>
            <a href="{{ route('documents.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Vault</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-2">Upload Medical Document</h1>
            <p class="text-sm text-gray-500">Store clinical lab reports, imaging, or prescriptions with SHA-256 integrity checks.</p>
        </div>

        <form method="POST" action="{{ route('documents.store') }}" enctype="multipart/form-data" class="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            @csrf

            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Document Title</label>
                <input id="title" name="title" type="text" required value="{{ old('title') }}" placeholder="e.g. Complete Blood Count (CBC) Lab"
                       class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                @error('title') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" name="category" required
                            class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                        @foreach ($categories as $k => $label)
                            <option value="{{ $k }}" {{ old('category') === $k ? 'selected' : '' }}>{{ $label }}</option>
                        @endforeach
                    </select>
                </div>
                <div>
                    <label for="document_date" class="block text-sm font-medium text-gray-700">Document Date</label>
                    <input id="document_date" name="document_date" type="date" required value="{{ old('document_date', now()->toDateString()) }}"
                           class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                </div>
            </div>

            <div>
                <label for="file" class="block text-sm font-medium text-gray-700">Select File (PDF, PNG, JPG up to 25MB)</label>
                <input id="file" name="file" type="file" required accept=".pdf,.png,.jpg,.jpeg"
                       class="mt-1 block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer">
                @error('file') <p class="mt-1 text-xs text-rose-600">{{ $message }}</p> @enderror
            </div>

            <div>
                <label for="notes" class="block text-sm font-medium text-gray-700">Notes & Diagnosis Details</label>
                <textarea id="notes" name="notes" rows="3" placeholder="Summary or instructions from physician..."
                          class="mt-1 block w-full rounded-xl border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">{{ old('notes') }}</textarea>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <a href="{{ route('documents.index') }}" class="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Cancel</a>
                <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700">Upload to Vault</button>
            </div>
        </form>
    </div>
</x-layouts.patient>

