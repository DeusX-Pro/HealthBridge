<?php

namespace App\Http\Controllers\MedicalLab;

use App\Models\LabOrder;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');

        $orders = LabOrder::where('medicallab_id', $user->medicallab->id)
            ->with(['patient.user', 'service'])
            ->latest()
            ->get();

        return inertia('dashboard/medical-lab/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function updateStatus(Request $request, LabOrder $order): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        if ($order->medicallab_id !== $user->medicallab->id) {
            abort(403);
        }

        $order->update(['status' => $request->status]);

        return back()->with('success', 'Order status updated.');
    }
}
