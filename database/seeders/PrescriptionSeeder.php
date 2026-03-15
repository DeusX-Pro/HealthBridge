<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prescription;
use App\Models\PrescriptionItem;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Medicine;
use Illuminate\Support\Str;

class PrescriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = Patient::all();
        $doctors = Doctor::all();
        $medicines = Medicine::all();

        if ($patients->isEmpty() || $doctors->isEmpty() || $medicines->isEmpty()) {
            return;
        }

        foreach ($patients as $patient) {
            // Active Prescription
            $prescription1 = Prescription::create([
                'uuid' => (string) Str::uuid(),
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'notes' => 'Follow instructional dosages strictly.',
                'status' => 'active',
            ]);

            $selectedMeds = $medicines->random(rand(1, 3));
            foreach ($selectedMeds as $med) {
                PrescriptionItem::create([
                    'prescription_id' => $prescription1->id,
                    'medicine_id' => $med->id,
                    'dosage' => '500mg',
                    'frequency' => '3 times daily',
                    'duration' => '7 days',
                    'instructions' => 'Take after meals',
                ]);
            }

            // Completed Prescription
            $prescription2 = Prescription::create([
                'uuid' => (string) Str::uuid(),
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'notes' => 'Previous medication history.',
                'status' => 'completed',
            ]);

            $selectedMeds2 = $medicines->random(rand(1, 2));
            foreach ($selectedMeds2 as $med) {
                PrescriptionItem::create([
                    'prescription_id' => $prescription2->id,
                    'medicine_id' => $med->id,
                    'dosage' => '1000IU',
                    'frequency' => 'Once daily',
                    'duration' => '30 days',
                    'instructions' => 'Take in the morning',
                ]);
            }
        }
    }
}
