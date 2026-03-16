<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use App\Models\PharmacyOrder;
use App\Models\PharmacyOrderItem;
use App\Models\Medicine;
use App\Models\Pharmacy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class PharmacyOrderController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $patient = $user->patient;

        $orders = PharmacyOrder::where('patient_id', $patient->id)
            ->with(['pharmacy', 'items.medicine'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/patient/pharmacies/orders', [
            'orders' => $orders
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $patient = $user->patient;

        $validated = $request->validate([
            'pharmacy_id' => 'required|exists:pharmacies,id',
            'prescription_id' => 'nullable|exists:prescriptions,id',
            'order_type' => 'required|in:direct,prescription',
            'delivery_address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.medicine_id' => 'required|exists:medicines,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated, $patient) {
            $order = PharmacyOrder::create([
                'uuid' => (string) Str::uuid(),
                'patient_id' => $patient->id,
                'pharmacy_id' => $validated['pharmacy_id'],
                'prescription_id' => $validated['prescription_id'] ?? null,
                'order_type' => $validated['order_type'],
                'total_amount' => 0, // Will update after items
                'status' => 'pending',
                'delivery_address' => $validated['delivery_address'],
                'payment_status' => 'pending',
            ]);

            $totalAmount = 0;
            foreach ($validated['items'] as $itemData) {
                $medicine = Medicine::findOrFail($itemData['medicine_id']);
                
                $unitPrice = $medicine->price; 
                $subtotal = $unitPrice * $itemData['quantity'];
                
                PharmacyOrderItem::create([
                    'pharmacy_order_id' => $order->id,
                    'medicine_id' => $medicine->id,
                    'quantity' => $itemData['quantity'],
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ]);

                $totalAmount += $subtotal;
            }

            $order->update(['total_amount' => $totalAmount]);

            return redirect()->route('patient.pharmacy.orders')->with('success', 'Order placed successfully.');
        });
    }

    public function show(PharmacyOrder $order): Response
    {
        // Ensure the order belongs to the authenticated patient
        if ($order->patient_id !== Auth::user()->patient->id) {
            abort(403);
        }

        $order->load(['pharmacy', 'items.medicine']);

        return Inertia::render('dashboard/patient/pharmacies/order-details', [
            'order' => $order
        ]);
    }
}
