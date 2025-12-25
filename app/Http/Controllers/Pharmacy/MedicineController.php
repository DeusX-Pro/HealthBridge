<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use App\Models\MedicineCategory;
use App\Models\MedicineSubcategory;
use App\Models\MedicineBrand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class MedicineController extends Controller
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

        $medicines = Medicine::where('pharmacy_id', $pharmacy->id)
            ->with(['category', 'subcategory', 'brand'])
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = MedicineCategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        $subcategories = MedicineSubcategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        $brands = MedicineBrand::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/medicines/index', [
            'medicines' => $medicines,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'brands' => $brands,
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

        $subcategories = MedicineSubcategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        $brands = MedicineBrand::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/medicines/create', [
            'categories' => $categories,
            'subcategories' => $subcategories,
            'brands' => $brands,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicine $medicine): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the medicine belongs to the pharmacy
        if ($medicine->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        $categories = MedicineCategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        $subcategories = MedicineSubcategory::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        $brands = MedicineBrand::where('pharmacy_id', $pharmacy->id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/medicines/edit', [
            'medicine' => $medicine,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'brands' => $brands,
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
            'subcategory_id' => 'nullable|exists:medicine_subcategories,id',
            'brand_id' => 'nullable|exists:medicine_brands,id',
            'generic_name' => 'nullable|string|max:255',
            'dosage_form' => 'required|string|max:255',
            'strength' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_restricted' => 'nullable|boolean',
            'min_age' => 'nullable|integer|min:0|max:120',
            'requires_id_verification' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive,discontinued',
        ]);

        // Verify category belongs to pharmacy
        $category = MedicineCategory::findOrFail($validated['category_id']);
        if ($category->pharmacy_id !== $pharmacy->id) {
            return redirect()->back()->withErrors(['category_id' => 'Invalid category selected.']);
        }

        // Verify subcategory if provided
        if (isset($validated['subcategory_id'])) {
            $subcategory = MedicineSubcategory::findOrFail($validated['subcategory_id']);
            if ($subcategory->pharmacy_id !== $pharmacy->id) {
                return redirect()->back()->withErrors(['subcategory_id' => 'Invalid subcategory selected.']);
            }
        }

        // Verify brand if provided
        if (isset($validated['brand_id'])) {
            $brand = MedicineBrand::findOrFail($validated['brand_id']);
            if ($brand->pharmacy_id !== $pharmacy->id) {
                return redirect()->back()->withErrors(['brand_id' => 'Invalid brand selected.']);
            }
        }

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (Medicine::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $images[] = $image->store('medicines', 'public');
            }
        }

        Medicine::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $user->id,
            'pharmacy_id' => $pharmacy->id,
            'category_id' => $validated['category_id'],
            'subcategory_id' => $validated['subcategory_id'] ?? null,
            'brand_id' => $validated['brand_id'] ?? null,
            'name' => $validated['name'],
            'slug' => $uniqueSlug,
            'generic_name' => $validated['generic_name'] ?? null,
            'dosage_form' => $validated['dosage_form'],
            'strength' => $validated['strength'] ?? null,
            'description' => $validated['description'] ?? null,
            'images' => !empty($images) ? json_encode($images) : null,
            'is_restricted' => $validated['is_restricted'] ?? false,
            'min_age' => $validated['min_age'] ?? null,
            'requires_id_verification' => $validated['requires_id_verification'] ?? false,
            'status' => $validated['status'] ?? 'active',
        ]);

        return redirect()->route('pharmacy.inventory.medicines')->with('success', 'Medicine created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medicine $medicine): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the medicine belongs to the pharmacy
        if ($medicine->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:medicine_categories,id',
            'subcategory_id' => 'nullable|exists:medicine_subcategories,id',
            'brand_id' => 'nullable|exists:medicine_brands,id',
            'generic_name' => 'nullable|string|max:255',
            'dosage_form' => 'required|string|max:255',
            'strength' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_restricted' => 'nullable|boolean',
            'min_age' => 'nullable|integer|min:0|max:120',
            'requires_id_verification' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive,discontinued',
        ]);

        // Verify category belongs to pharmacy
        $category = MedicineCategory::findOrFail($validated['category_id']);
        if ($category->pharmacy_id !== $pharmacy->id) {
            return redirect()->back()->withErrors(['category_id' => 'Invalid category selected.']);
        }

        // Verify subcategory if provided
        if (isset($validated['subcategory_id'])) {
            $subcategory = MedicineSubcategory::findOrFail($validated['subcategory_id']);
            if ($subcategory->pharmacy_id !== $pharmacy->id) {
                return redirect()->back()->withErrors(['subcategory_id' => 'Invalid subcategory selected.']);
            }
        }

        // Verify brand if provided
        if (isset($validated['brand_id'])) {
            $brand = MedicineBrand::findOrFail($validated['brand_id']);
            if ($brand->pharmacy_id !== $pharmacy->id) {
                return redirect()->back()->withErrors(['brand_id' => 'Invalid brand selected.']);
            }
        }

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        if ($medicine->slug !== $slug) {
            $counter = 1;
            while (Medicine::where('slug', $uniqueSlug)->where('id', '!=', $medicine->id)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
        } else {
            $uniqueSlug = $medicine->slug;
        }

        $images = json_decode($medicine->images ?? '[]', true) ?: [];
        if ($request->hasFile('images')) {
            // Delete old images if exists
            foreach ($images as $oldImage) {
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            $images = [];
            foreach ($request->file('images') as $image) {
                $images[] = $image->store('medicines', 'public');
            }
        }

        $medicine->update([
            'name' => $validated['name'],
            'category_id' => $validated['category_id'],
            'subcategory_id' => $validated['subcategory_id'] ?? null,
            'brand_id' => $validated['brand_id'] ?? null,
            'slug' => $uniqueSlug,
            'generic_name' => $validated['generic_name'] ?? null,
            'dosage_form' => $validated['dosage_form'],
            'strength' => $validated['strength'] ?? null,
            'description' => $validated['description'] ?? null,
            'images' => !empty($images) ? json_encode($images) : null,
            'is_restricted' => $validated['is_restricted'] ?? $medicine->is_restricted,
            'min_age' => $validated['min_age'] ?? $medicine->min_age,
            'requires_id_verification' => $validated['requires_id_verification'] ?? $medicine->requires_id_verification,
            'status' => $validated['status'] ?? $medicine->status,
        ]);

        return redirect()->back()->with('success', 'Medicine updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicine $medicine): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the medicine belongs to the pharmacy
        if ($medicine->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete images if exists
        $images = json_decode($medicine->images ?? '[]', true) ?: [];
        foreach ($images as $image) {
            if (Storage::disk('public')->exists($image)) {
                Storage::disk('public')->delete($image);
            }
        }

        $medicine->delete();

        return redirect()->route('pharmacy.inventory.medicines')->with('success', 'Medicine deleted successfully.');
    }
}
