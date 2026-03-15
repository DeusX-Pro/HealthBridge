<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patientUsers = User::where('role', 'patient')->get();

        foreach ($patientUsers as $user) {
            if (!$user->patient) {
                Patient::create([
                    'user_id' => $user->id,
                    'uuid' => (string) Str::uuid(),
                    'national_id' => 'NIN' . rand(1000000000, 9999999999),
                    'address' => fake()->streetAddress(),
                    'city' => fake()->city(),
                    'state' => fake()->state(),
                    'postal_code' => fake()->postcode(),
                    'occupation' => fake()->jobTitle(),
                    'blood_type' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
                    'allergies' => fake()->randomElement(['Peanuts', 'Dust', 'Shellfish', 'Latex', 'Penicillin', 'None']),
                    'chronic_conditions' => fake()->randomElement(['Hypertension', 'Diabetes', 'Asthma', 'None', 'None']),
                    'current_medications' => fake()->randomElement(['Amlodipine', 'Metformin', 'Albuterol', 'None']),
                    'surgical_history' => 'None recorded',
                    'family_medical_history' => 'No major hereditary conditions',
                    'immunization_record' => 'Up to date (BCG, Polio, Hepatitis B)',
                    'height' => fake()->randomFloat(2, 150, 200),
                    'weight' => fake()->randomFloat(2, 50, 120),
                    'bmi' => 24.5, // Calculated logic could go here
                    'lifestyle_habits' => fake()->randomElement(['Non-smoker', 'Occasional drinker', 'Vegetarian', 'Active']),
                    'disability_details' => 'None',
                    'emergency_contact_name' => fake()->name(),
                    'emergency_contact_relationship' => fake()->randomElement(['Spouse', 'Parent', 'Sibling', 'Friend']),
                    'emergency_contact_phone' => fake()->phoneNumber(),
                    'emergency_contact_email' => fake()->safeEmail(),
                    'preferred_hospital' => 'General Hospital, ' . fake()->city(),
                    'preferred_language' => 'English',
                    'preferred_consultation_type' => 'video',
                    'preferred_doctor_gender' => 'any',
                    'status' => 'active',
                ]);
            }
        }
    }
}
