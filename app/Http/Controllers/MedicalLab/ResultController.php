<?php

namespace App\Http\Controllers\MedicalLab;

use App\Models\LabOrder;
use App\Models\LabResult;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class ResultController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');

        $results = LabResult::whereHas('order', function ($query) use ($user) {
            $query->where('medicallab_id', $user->medicallab->id);
        })->with('order.patient.user')->latest()->get();

        return inertia('dashboard/medical-lab/upload-results/index', [
            'results' => $results,
        ]);
    }

    public function store(Request $request, LabOrder $order): RedirectResponse
    {
        $request->validate([
            'result_data' => 'nullable|array',
            'file' => 'nullable|file|mimes:pdf,jpg,png|max:5120',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        if ($order->medicallab_id !== $user->medicallab->id) {
            abort(403);
        }

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('lab-results', 'public');
        }

        LabResult::create([
            'lab_order_id' => $order->id,
            'result_data' => $request->result_data,
            'file_path' => $filePath,
            'performed_at' => now(),
        ]);

        $order->update(['status' => 'completed']);

        return redirect()->route('medical-lab.orders')->with('success', 'Results uploaded and order completed.');
    }
}
