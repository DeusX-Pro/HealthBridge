<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\MedicineSubcategory;
use App\Models\MedicineCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        $subcategories = MedicineSubcategory::where('pharmacy_id', $pharmacy->id)
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = MedicineCategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/subcategories/index', [
            'subcategories' => $subcategories,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        $categories = MedicineCategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/subcategories/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicineSubcategory $subcategory): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the subcategory belongs to the pharmacy
        if ($subcategory->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        $categories = MedicineCategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/subcategories/edit', [
            'subcategory' => $subcategory,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:medicine_categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,inactive',
        ]);

        // Verify category belongs to pharmacy
        $category = MedicineCategory::findOrFail($validated['category_id']);
        if ($category->pharmacy_id !== $pharmacy->id) {
            return redirect()->back()->withErrors(['category_id' => 'Invalid category selected.']);
        }

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (MedicineSubcategory::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('medicine_subcategories', 'public');
        }

        MedicineSubcategory::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $user->id,
            'pharmacy_id' => $pharmacy->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => $uniqueSlug,
            'description' => $validated['description'] ?? null,
            'image' => $imagePath,
            'status' => $validated['status'] ?? 'active',
        ]);

        return redirect()->back()->with('success', 'Subcategory created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MedicineSubcategory $subcategory): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the subcategory belongs to the pharmacy
        if ($subcategory->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:medicine_categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,inactive',
        ]);

        // Verify category belongs to pharmacy
        $category = MedicineCategory::findOrFail($validated['category_id']);
        if ($category->pharmacy_id !== $pharmacy->id) {
            return redirect()->back()->withErrors(['category_id' => 'Invalid category selected.']);
        }

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        if ($subcategory->slug !== $slug) {
            $counter = 1;
            while (MedicineSubcategory::where('slug', $uniqueSlug)->where('id', '!=', $subcategory->id)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
        } else {
            $uniqueSlug = $subcategory->slug;
        }

        $imagePath = $subcategory->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($subcategory->image && \Storage::disk('public')->exists($subcategory->image)) {
                \Storage::disk('public')->delete($subcategory->image);
            }
            $imagePath = $request->file('image')->store('medicine_subcategories', 'public');
        }

        $subcategory->update([
            'name' => $validated['name'],
            'category_id' => $validated['category_id'],
            'slug' => $uniqueSlug,
            'description' => $validated['description'] ?? null,
            'image' => $imagePath,
            'status' => $validated['status'] ?? $subcategory->status,
        ]);

        return redirect()->route('pharmacy.inventory.subcategories')->with('success', 'Subcategory updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicineSubcategory $subcategory): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the subcategory belongs to the pharmacy
        if ($subcategory->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete image if exists
        if ($subcategory->image && Storage::disk('public')->exists($subcategory->image)) {
            Storage::disk('public')->delete($subcategory->image);
        }

        $subcategory->delete();

        return redirect()->route('pharmacy.inventory.subcategories')->with('success', 'Subcategory deleted successfully.');
    }
}
