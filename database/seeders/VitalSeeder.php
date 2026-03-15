<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Vital;
use App\Models\Patient;

class VitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = Patient::all();

        foreach ($patients as $patient) {
            // Seed multiple vitals for history
            for ($i = 0; $i < 10; $i++) {
                Vital::create([
                    'patient_id' => $patient->id,
                    'blood_pressure' => rand(110, 130) . '/' . rand(70, 90),
                    'blood_sugar' => rand(80, 110) . ' mg/dL',
                    'heart_rate' => rand(60, 100),
                    'temperature' => rand(360, 375) / 10, // 36.0 to 37.5
                    'weight' => rand(65, 85),
                    'height' => 175,
                    'bmi' => 22.5,
                    'recorded_at' => now()->subDays($i),
                ]);
            }
        }
    }
}
