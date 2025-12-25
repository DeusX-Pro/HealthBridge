<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\MedicineBrand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class BrandController extends Controller
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

        $brands = MedicineBrand::where('pharmacy_id', $pharmacy->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/pharmacy/inventory/brands/index', [
            'brands' => $brands,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('dashboard/pharmacy/inventory/brands/create');
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicineBrand $brand): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the brand belongs to the pharmacy
        if ($brand->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('dashboard/pharmacy/inventory/brands/edit', [
            'brand' => $brand,
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
            'manufacturer' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,inactive',
        ]);

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (MedicineBrand::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('medicine_brands', 'public');
        }

        MedicineBrand::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $user->id,
            'pharmacy_id' => $pharmacy->id,
            'name' => $validated['name'],
            'slug' => $uniqueSlug,
            'description' => $validated['description'] ?? null,
            'manufacturer' => $validated['manufacturer'] ?? null,
            'country' => $validated['country'] ?? null,
            'image' => $imagePath,
            'status' => $validated['status'] ?? 'active',
        ]);

        return redirect()->route('pharmacy.inventory.brands')->with('success', 'Brand created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MedicineBrand $brand): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the brand belongs to the pharmacy
        if ($brand->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'manufacturer' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,inactive',
        ]);

        $slug = Str::slug($validated['name']);
        $uniqueSlug = $slug;
        if ($brand->slug !== $slug) {
            $counter = 1;
            while (MedicineBrand::where('slug', $uniqueSlug)->where('id', '!=', $brand->id)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
        } else {
            $uniqueSlug = $brand->slug;
        }

        $imagePath = $brand->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($brand->image && Storage::disk('public')->exists($brand->image)) {
                Storage::disk('public')->delete($brand->image);
            }
            $imagePath = $request->file('image')->store('medicine_brands', 'public');
        }

        $brand->update([
            'name' => $validated['name'],
            'slug' => $uniqueSlug,
            'description' => $validated['description'] ?? null,
            'manufacturer' => $validated['manufacturer'] ?? null,
            'country' => $validated['country'] ?? null,
            'image' => $imagePath,
            'status' => $validated['status'] ?? $brand->status,
        ]);

        return redirect()->back()->with('success', 'Brand updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicineBrand $brand): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        // Ensure the brand belongs to the pharmacy
        if ($brand->pharmacy_id !== $pharmacy->id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete image if exists
        if ($brand->image && Storage::disk('public')->exists($brand->image)) {
            Storage::disk('public')->delete($brand->image);
        }

        $brand->delete();

        return redirect()->route('pharmacy.inventory.brands')->with('success', 'Brand deleted successfully.');
    }
}
