<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctorUsers = User::where('role', 'doctor')->get();

        $specializations = [
            'Cardiology', 'Pediatrics', 'Dermatology', 'Orthopedics', 
            'Gynecology', 'Neurology', 'Ophthalmology', 'Psychiatry'
        ];

        foreach ($doctorUsers as $user) {
            if (!$user->doctor) {
                Doctor::create([
                    'user_id' => $user->id,
                    'uuid' => (string) Str::uuid(),
                    'title' => 'Dr.',
                    'specialization' => fake()->randomElement($specializations),
                    'medical_council' => 'MDCN',
                    'license_number' => 'MDCN' . rand(10000, 99999),
                    'license_expiry_date' => now()->addYears(2),
                    'years_of_experience' => (string) rand(5, 25),
                    'hospital_affiliation' => fake()->company() . ' Hospital',
                    'bio' => fake()->paragraph(),
                    'consultation_fee' => fake()->randomFloat(2, 5000, 20000),
                    'consultation_type' => 'video',
                    'consultation_duration' => 30,
                    'available_days' => 'Monday,Tuesday,Wednesday,Thursday,Friday',
                    'available_hours' => '09:00-17:00',
                    'city' => fake()->city(),
                    'state' => fake()->state(),
                    'status' => 'approved',
                    'verified_at' => now(),
                ]);
            }
        }
    }
}
