<?php

namespace App\Http\Controllers\MedicalLab;

use App\Http\Controllers\Controller;
use App\Models\MedicalLabService;
use App\Models\Medicallab;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');
        $medicallab = $user->medicallab;

        if (!$medicallab) {
            return redirect()->route('medical-lab.profile')->with('error', 'Please complete your medical lab profile setup first.');
        }

        $services = MedicalLabService::where('medicallab_id', $medicallab->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = MedicalLabService::where('medicallab_id', $medicallab->id)
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values();

        return Inertia::render('dashboard/medical-lab/services/index', [
            'services' => $services,
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
        $user->load('medicallab');
        $medicallab = $user->medicallab;

        if (!$medicallab) {
            return redirect()->route('medical-lab.profile')->with('error', 'Please complete your medical lab profile setup first.');
        }

        $categories = MedicalLabService::where('medicallab_id', $medicallab->id)
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray();

        // Default categories if none exist
        $defaultCategories = ['Hematology', 'Chemistry', 'Urine Analysis', 'Radiology', 'Microbiology', 'Immunology', 'Cardiology', 'Pathology', 'Genetics', 'Toxicology', 'Diagnostic'];
        $availableCategories = !empty($categories) ? $categories : $defaultCategories;

        return Inertia::render('dashboard/medical-lab/services/create', [
            'categories' => $availableCategories,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicalLabService $service): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');
        $medicallab = $user->medicallab;

        if (!$medicallab) {
            return redirect()->route('medical-lab.profile')->with('error', 'Please complete your medical lab profile setup first.');
        }

        // Ensure the service belongs to the medical lab
        if ($service->medicallab_id !== $medicallab->id) {
            abort(403, 'Unauthorized action.');
        }

        $categories = MedicalLabService::where('medicallab_id', $medicallab->id)
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray();

        // Default categories if none exist
        $defaultCategories = ['Hematology', 'Chemistry', 'Urine Analysis', 'Radiology', 'Microbiology', 'Immunology', 'Cardiology', 'Pathology', 'Genetics', 'Toxicology', 'Diagnostic'];
        $availableCategories = !empty($categories) ? $categories : $defaultCategories;

        return Inertia::render('dashboard/medical-lab/services/edit', [
            'service' => $service,
            'categories' => $availableCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');
        $medicallab = $user->medicallab;

        if (!$medicallab) {
            return redirect()->route('medical-lab.profile')->with('error', 'Please complete your medical lab profile setup first.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive',
        ]);

        MedicalLabService::create([
            'uuid' => (string) Str::uuid(),
            'medicallab_id' => $medicallab->id,
            'name' => $validated['name'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'duration' => $validated['duration'] ?? null,
            'status' => $validated['status'] ?? 'active',
        ]);

        return redirect()->route('medical-lab.services.index')->with('success', 'Service created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MedicalLabService $service): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');
        $medicallab = $user->medicallab;

        if (!$medicallab) {
            return redirect()->route('medical-lab.profile')->with('error', 'Please complete your medical lab profile setup first.');
        }

        // Ensure the service belongs to the medical lab
        if ($service->medicallab_id !== $medicallab->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive',
        ]);

        $service->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'duration' => $validated['duration'] ?? null,
            'status' => $validated['status'] ?? $service->status,
        ]);

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalLabService $service): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');
        $medicallab = $user->medicallab;

        if (!$medicallab) {
            return redirect()->route('medical-lab.profile')->with('error', 'Please complete your medical lab profile setup first.');
        }

        // Ensure the service belongs to the medical lab
        if ($service->medicallab_id !== $medicallab->id) {
            abort(403, 'Unauthorized action.');
        }

        $service->delete();

        return redirect()->route('medical-lab.services.index')->with('success', 'Service deleted successfully.');
    }
}
