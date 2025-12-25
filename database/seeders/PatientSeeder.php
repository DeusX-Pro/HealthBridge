<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = [
            [
                'user' => [
                    'name' => 'John Doe',
                    'email' => 'john.doe@example.com',
                    'phone_number' => '+2348012345678',
                    'date_of_birth' => '1990-05-15',
                    'password' => Hash::make('password'),
                    'role' => 'patient',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'patient' => [
                    'national_id' => 'NIN1234567890',
                    'address' => '123 Main Street',
                    'city' => 'Lagos',
                    'state' => 'Lagos',
                    'postal_code' => '100001',
                    'occupation' => 'Software Engineer',
                    'blood_type' => 'O+',
                    'allergies' => 'Peanuts, Dust',
                    'height' => 175.5,
                    'weight' => 75.0,
                    'emergency_contact_name' => 'Jane Doe',
                    'emergency_contact_relationship' => 'Spouse',
                    'emergency_contact_phone' => '+2348012345679',
                    'emergency_contact_email' => 'jane.doe@example.com',
                    'status' => 'active',
                ],
            ],
            [
                'user' => [
                    'name' => 'Mary Johnson',
                    'email' => 'mary.johnson@example.com',
                    'phone_number' => '+2348023456789',
                    'date_of_birth' => '1985-08-20',
                    'password' => Hash::make('password'),
                    'role' => 'patient',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'patient' => [
                    'national_id' => 'NIN2345678901',
                    'address' => '456 Oak Avenue',
                    'city' => 'Abuja',
                    'state' => 'FCT',
                    'postal_code' => '900001',
                    'occupation' => 'Teacher',
                    'blood_type' => 'A+',
                    'allergies' => 'Shellfish',
                    'chronic_conditions' => 'Hypertension',
                    'height' => 162.0,
                    'weight' => 65.0,
                    'emergency_contact_name' => 'David Johnson',
                    'emergency_contact_relationship' => 'Husband',
                    'emergency_contact_phone' => '+2348023456790',
                    'emergency_contact_email' => 'david.johnson@example.com',
                    'status' => 'active',
                ],
            ],
            [
                'user' => [
                    'name' => 'Michael Brown',
                    'email' => 'michael.brown@example.com',
                    'phone_number' => '+2348034567890',
                    'date_of_birth' => '1992-12-10',
                    'password' => Hash::make('password'),
                    'role' => 'patient',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'patient' => [
                    'national_id' => 'NIN3456789012',
                    'address' => '789 Pine Road',
                    'city' => 'Port Harcourt',
                    'state' => 'Rivers',
                    'postal_code' => '500001',
                    'occupation' => 'Business Analyst',
                    'blood_type' => 'B+',
                    'height' => 180.0,
                    'weight' => 82.0,
                    'emergency_contact_name' => 'Sarah Brown',
                    'emergency_contact_relationship' => 'Sister',
                    'emergency_contact_phone' => '+2348034567891',
                    'emergency_contact_email' => 'sarah.brown@example.com',
                    'status' => 'active',
                ],
            ],
            [
                'user' => [
                    'name' => 'Emily Davis',
                    'email' => 'emily.davis@example.com',
                    'phone_number' => '+2348045678901',
                    'date_of_birth' => '1988-03-25',
                    'password' => Hash::make('password'),
                    'role' => 'patient',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'patient' => [
                    'national_id' => 'NIN4567890123',
                    'address' => '321 Elm Street',
                    'city' => 'Ibadan',
                    'state' => 'Oyo',
                    'postal_code' => '200001',
                    'occupation' => 'Nurse',
                    'blood_type' => 'AB+',
                    'allergies' => 'Latex',
                    'height' => 168.0,
                    'weight' => 70.0,
                    'emergency_contact_name' => 'Robert Davis',
                    'emergency_contact_relationship' => 'Brother',
                    'emergency_contact_phone' => '+2348045678902',
                    'emergency_contact_email' => 'robert.davis@example.com',
                    'status' => 'active',
                ],
            ],
            [
                'user' => [
                    'name' => 'James Wilson',
                    'email' => 'james.wilson@example.com',
                    'phone_number' => '+2348056789012',
                    'date_of_birth' => '1995-07-18',
                    'password' => Hash::make('password'),
                    'role' => 'patient',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'patient' => [
                    'national_id' => 'NIN5678901234',
                    'address' => '654 Maple Drive',
                    'city' => 'Kano',
                    'state' => 'Kano',
                    'postal_code' => '700001',
                    'occupation' => 'Student',
                    'blood_type' => 'O-',
                    'height' => 178.0,
                    'weight' => 78.0,
                    'emergency_contact_name' => 'Linda Wilson',
                    'emergency_contact_relationship' => 'Mother',
                    'emergency_contact_phone' => '+2348056789013',
                    'emergency_contact_email' => 'linda.wilson@example.com',
                    'status' => 'active',
                ],
            ],
        ];

        foreach ($patients as $patientData) {
            $user = User::firstOrCreate(
                ['email' => $patientData['user']['email']],
                array_merge($patientData['user'], ['uuid' => Str::uuid()->toString()])
            );

            if (!$user->patient) {
                Patient::create(
                    array_merge(
                        $patientData['patient'],
                        [
                            'user_id' => $user->id,
                            'uuid' => Str::uuid()->toString(),
                        ]
                    )
                );
            }
        }
    }
}
