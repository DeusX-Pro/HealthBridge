<?php

namespace App\Http\Controllers;

use App\Models\ConnectedHospital;
use App\Models\Tenant;
use Illuminate\Http\Request;

class HospitalsController extends Controller
{
    public function index()
    {
        $connections = ConnectedHospital::where('user_id', auth()->id())->latest()->get();
        $directory = Tenant::where('status', 'ACTIVE')->get();

        return view('hospitals.index', compact('connections', 'directory'));
    }

    public function connect(Request $request)
    {
        $validated = $request->validate([
            'hospital_name' => ['required', 'string', 'max:255'],
            'patient_mrn' => ['required', 'string', 'max:128'],
            'tenant_id' => ['nullable', 'string'],
        ]);

        ConnectedHospital::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'hospital_name' => $validated['hospital_name'],
            ],
            [
                'patient_mrn' => $validated['patient_mrn'],
                'tenant_id' => $validated['tenant_id'] ?? null,
                'status' => 'CONNECTED',
                'last_sync_at' => now(),
            ]
        );

        return back()->with('success', "Connected to {$validated['hospital_name']}. Syncing clinical records.");
    }

    public function toggleHide(string $id)
    {
        $connection = ConnectedHospital::where('user_id', auth()->id())->findOrFail($id);
        $connection->update(['is_hidden' => !$connection->is_hidden]);

        return back()->with('info', $connection->is_hidden ? 'Hospital feed hidden.' : 'Hospital feed unhidden.');
    }
}

