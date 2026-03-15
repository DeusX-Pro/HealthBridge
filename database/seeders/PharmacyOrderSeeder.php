<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PharmacyOrder;
use App\Models\PharmacyOrderItem;
use App\Models\Pharmacy;
use App\Models\Patient;
use App\Models\Medicine;
use App\Models\Prescription;
use Illuminate\Support\Str;

class PharmacyOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = Patient::all();
        $pharmacies = Pharmacy::all();
        $medicines = Medicine::all();

        if ($patients->isEmpty() || $pharmacies->isEmpty() || $medicines->isEmpty()) {
            return;
        }

        foreach ($patients as $patient) {
            $pharmacy = $pharmacies->random();
            $prescription = $patient->prescriptions()->where('status', 'active')->first();

            // 1. Prescription-based order
            if ($prescription) {
                $order = PharmacyOrder::create([
                    'uuid' => (string) Str::uuid(),
                    'patient_id' => $patient->id,
                    'pharmacy_id' => $pharmacy->id,
                    'prescription_id' => $prescription->id,
                    'order_type' => 'prescription',
                    'total_amount' => 0,
                    'status' => 'processing',
                    'delivery_address' => $patient->address ?? fake()->address(),
                    'payment_status' => 'paid',
                ]);

                $total = 0;
                foreach ($prescription->items as $item) {
                    $price = rand(1000, 5000);
                    $qty = rand(1, 2);
                    $subtotal = $price * $qty;
                    $total += $subtotal;

                    PharmacyOrderItem::create([
                        'pharmacy_order_id' => $order->id,
                        'medicine_id' => $item->medicine_id,
                        'quantity' => $qty,
                        'unit_price' => $price,
                        'subtotal' => $subtotal,
                    ]);
                }
                $order->update(['total_amount' => $total]);
            }

            // 2. Direct store order
            $order2 = PharmacyOrder::create([
                'uuid' => (string) Str::uuid(),
                'patient_id' => $patient->id,
                'pharmacy_id' => $pharmacy->id,
                'order_type' => 'direct',
                'total_amount' => 0,
                'status' => 'pending',
                'delivery_address' => $patient->address ?? fake()->address(),
                'payment_status' => 'pending',
            ]);

            $total2 = 0;
            $randomMeds = $medicines->random(rand(1, 3));
            foreach ($randomMeds as $med) {
                $price = rand(500, 3000);
                $qty = rand(1, 4);
                $subtotal = $price * $qty;
                $total2 += $subtotal;

                PharmacyOrderItem::create([
                    'pharmacy_order_id' => $order2->id,
                    'medicine_id' => $med->id,
                    'quantity' => $qty,
                    'unit_price' => $price,
                    'subtotal' => $subtotal,
                ]);
            }
            $order2->update(['total_amount' => $total2]);
        }
    }
}
