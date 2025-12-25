<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\MedicineCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
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

        $categories = MedicineCategory::where('pharmacy_id', $pharmacy->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('dashboard/pharmacy/inventory/categories/create');
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicineCategory $category): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the category belongs to the pharmacy
        if ($category->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('dashboard/pharmacy/inventory/categories/edit', [
            'category' => $category,
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
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,inactive',
        ]);

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (MedicineCategory::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('medicine_categories', 'public');
        }

        MedicineCategory::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $user->id,
            'pharmacy_id' => $pharmacy->id,
            'name' => $validated['name'],
            'slug' => $uniqueSlug,
            'description' => $validated['description'] ?? null,
            'image' => $imagePath,
            'status' => $validated['status'] ?? 'active',
        ]);

        return redirect()->route('pharmacy.inventory.categories')->with('success', 'Category created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MedicineCategory $category): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the category belongs to the pharmacy
        if ($category->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,inactive',
        ]);

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        if ($category->slug !== $slug) {
            $counter = 1;
            while (MedicineCategory::where('slug', $uniqueSlug)->where('id', '!=', $category->id)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
        } else {
            $uniqueSlug = $category->slug;
        }

        $imagePath = $category->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image && \Storage::disk('public')->exists($category->image)) {
                \Storage::disk('public')->delete($category->image);
            }
            $imagePath = $request->file('image')->store('medicine_categories', 'public');
        }

        $category->update([
            'name' => $validated['name'],
            'slug' => $uniqueSlug,
            'description' => $validated['description'] ?? null,
            'image' => $imagePath,
            'status' => $validated['status'] ?? $category->status,
        ]);

        return redirect()->route('pharmacy.inventory.categories')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicineCategory $category): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the category belongs to the pharmacy
        if ($category->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete image if exists
        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()->route('pharmacy.inventory.categories')->with('success', 'Category deleted successfully.');
    }
}
