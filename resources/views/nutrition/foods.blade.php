<x-layouts.patient>
    <x-slot:title>Food Library - HealthBridge</x-slot:title>

    <div class="space-y-6" x-data="{ showAddModal: false }">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
                <a href="{{ route('nutrition.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Nutrition</a>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Food & Ingredient Library</h1>
                <p class="text-sm text-gray-500">Verified nutritional data and custom foods created by you.</p>
            </div>
            <div class="flex items-center gap-3">
                <button @click="showAddModal = true" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Add Custom Food
                </button>
            </div>
        </div>

        <!-- Search Bar -->
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <form action="{{ route('nutrition.foods') }}" method="GET" class="flex gap-3">
                <input type="text" name="q" value="{{ $search }}" placeholder="Search foods (e.g. Oatmeal, Chicken breast, Jollof rice, Avocado)..."
                       class="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500">
                <button type="submit" class="px-5 py-2 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-sm">
                    Search
                </button>
                @if($search)
                    <a href="{{ route('nutrition.foods') }}" class="px-3 py-2 border border-gray-200 text-xs font-semibold rounded-xl text-gray-600 hover:bg-gray-50 flex items-center">
                        Clear
                    </a>
                @endif
            </form>
        </div>

        <!-- Food List -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            @if($foods->isEmpty())
                <div class="p-12 text-center text-sm text-gray-500">
                    No foods found matching your query. Click "Add Custom Food" above to add it to your library.
                </div>
            @else
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-100">
                        <thead class="bg-gray-50/75">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Food Item</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Serving Size</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calories</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Protein</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Carbs</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fat</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 bg-white">
                            @foreach($foods as $f)
                                <tr class="hover:bg-gray-50/75 transition">
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-bold text-gray-900">{{ $f->name }}</div>
                                        <div class="text-xs text-gray-400 capitalize">{{ strtolower(str_replace('_', ' ', $f->category)) }}</div>
                                    </td>
                                    <td class="px-6 py-4 text-xs text-gray-600 font-medium">
                                        {{ $f->serving_label }} ({{ $f->serving_grams }}g)
                                    </td>
                                    <td class="px-6 py-4 text-xs font-bold text-gray-900">
                                        {{ number_format($f->kcal) }} kcal
                                    </td>
                                    <td class="px-6 py-4 text-xs font-semibold text-emerald-600">
                                        {{ $f->protein_g }}g
                                    </td>
                                    <td class="px-6 py-4 text-xs font-semibold text-amber-600">
                                        {{ $f->carb_g }}g
                                    </td>
                                    <td class="px-6 py-4 text-xs font-semibold text-rose-600">
                                        {{ $f->fat_g }}g
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="p-4 border-t border-gray-100">
                    {{ $foods->appends(['q' => $search])->links() }}
                </div>
            @endif
        </div>

        <!-- Add Custom Food Modal -->
        <div x-show="showAddModal" class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" style="display: none;">
            <div @click.away="showAddModal = false" class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl space-y-5">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold text-gray-900">Add Custom Food Item</h3>
                    <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                <form action="{{ route('nutrition.foods.store') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Food Name</label>
                        <input type="text" name="name" required placeholder="e.g. Homemade Jollof Rice"
                               class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                            <select name="category" class="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs">
                                <option value="MEAL">Prepared Meal</option>
                                <option value="PROTEIN">Protein / Meat / Fish</option>
                                <option value="GRAIN">Grains & Starches</option>
                                <option value="VEGETABLE">Vegetables</option>
                                <option value="FRUIT">Fruit</option>
                                <option value="DAIRY">Dairy & Plant Milk</option>
                                <option value="SNACK">Snacks & Treats</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Serving Label</label>
                            <input type="text" name="serving_label" required placeholder="e.g. 1 plate, 1 bowl"
                                   class="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Serving Grams</label>
                            <input type="number" step="1" name="serving_grams" required value="100"
                                   class="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Calories (kcal)</label>
                            <input type="number" step="1" name="kcal" required placeholder="e.g. 320"
                                   class="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs">
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-2">
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Protein (g)</label>
                            <input type="number" step="0.1" name="protein_g" value="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Carb (g)</label>
                            <input type="number" step="0.1" name="carb_g" value="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Fat (g)</label>
                            <input type="number" step="0.1" name="fat_g" value="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                        <div>
                            <label class="block text-[10px] font-semibold text-gray-400 uppercase">Fibre (g)</label>
                            <input type="number" step="0.1" name="fibre_g" value="0" class="w-full rounded-xl border border-gray-300 px-2 py-1 text-xs">
                        </div>
                    </div>

                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" @click="showAddModal = false" class="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700">Cancel</button>
                        <button type="submit" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">Save Food</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-layouts.patient>

