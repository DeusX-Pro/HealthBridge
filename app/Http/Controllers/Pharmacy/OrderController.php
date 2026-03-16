<?php

namespace App\Http\Controllers\Pharmacy;

use App\Http\Controllers\Controller;
use App\Models\PharmacyOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class OrderController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if (!$pharmacy) {
            return redirect()->route('pharmacy.profile')->with('error', 'Please complete your pharmacy profile setup first.');
        }

        $orders = PharmacyOrder::where('pharmacy_id', $pharmacy->id)
            ->with(['patient.user', 'items.medicine'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/pharmacy/orders/index', [
            'orders' => $orders
        ]);
    }

    public function show(PharmacyOrder $order): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if ($order->pharmacy_id !== $pharmacy->id) {
            abort(403);
        }

        $order->load(['patient.user', 'items.medicine', 'prescription.doctor.user']);

        return Inertia::render('dashboard/pharmacy/orders/show', [
            'order' => $order
        ]);
    }

    public function updateStatus(Request $request, PharmacyOrder $order): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $pharmacy = $user->pharmacy;

        if ($order->pharmacy_id !== $pharmacy->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'rejection_reason' => 'nullable|string',
            'pharmacy_note' => 'nullable|string',
        ]);

        $order->update([
            'status' => $validated['status'],
            'rejection_reason' => $validated['rejection_reason'] ?? $order->rejection_reason,
            'pharmacy_note' => $validated['pharmacy_note'] ?? $order->pharmacy_note,
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
