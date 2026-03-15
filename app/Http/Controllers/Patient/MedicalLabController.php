<?php

namespace App\Http\Controllers\Patient;

use App\Models\LabOrder;
use App\Models\Medicallab;
use App\Models\MedicalLabService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class MedicalLabController extends Controller
{
    public function index(): Response
    {
        $labs = Medicallab::with('services')->get();
        return inertia('dashboard/patient/medical_labs/index', [
            'labs' => $labs,
        ]);
    }

    public function show(Medicallab $lab): Response
    {
        $lab->load('services');
        return inertia('dashboard/patient/medical_labs/show', [
            'lab' => $lab,
        ]);
    }

    public function storeOrder(Request $request): RedirectResponse
    {
        $request->validate([
            'service_id' => 'required|exists:medical_lab_services,id',
        ]);

        $service = MedicalLabService::findOrFail($request->service_id);
        
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient');

        LabOrder::create([
            'patient_id' => $user->patient->id,
            'medicallab_id' => $service->medicallab_id,
            'service_id' => $service->id,
            'price' => $service->price,
            'status' => 'pending'
        ]);

        return redirect()->route('patient.lab-results')->with('success', 'Lab test ordered successfully.');
    }
}
