<?php

namespace Database\Seeders;

use App\Models\Medicallab;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MedicallabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labUsers = User::where('role', 'medical_lab')->get();

        $tests = [
            'Blood Test', 'Urine Analysis', 'X-Ray', 'Ultrasound', 
            'ECG', 'CT Scan', 'MRI', 'HIV Test', 'Malaria Test'
        ];

        foreach ($labUsers as $user) {
            if (!$user->medicallab) {
                Medicallab::create([
                    'user_id' => $user->id,
                    'uuid' => (string) Str::uuid(),
                    'lab_name' => $user->name . ' Center',
                    'mlscn_license_number' => 'MLSCN' . rand(100000, 999999),
                    'mlscn_license_expiry' => now()->addYears(2),
                    'cac_registration_number' => 'RC' . rand(1000000, 9999999),
                    'lab_tests_offered' => json_encode(fake()->randomElements($tests, 5)),
                    'address' => fake()->address(),
                    'city' => fake()->city(),
                    'state' => fake()->state(),
                    'latitude' => fake()->latitude(),
                    'longitude' => fake()->longitude(),
                    'status' => 'approved',
                    'verified_at' => now(),
                ]);
            }
        }
    }
}
