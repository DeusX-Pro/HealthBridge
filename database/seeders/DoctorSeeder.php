<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctors = [
            [
                'user' => [
                    'name' => 'Dr. Sarah Adebayo',
                    'email' => 'sarah.adebayo@example.com',
                    'phone_number' => '+2349012345678',
                    'date_of_birth' => '1980-04-15',
                    'password' => Hash::make('password'),
                    'role' => 'doctor',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'doctor' => [
                    'title' => 'Dr.',
                    'specialization' => 'Cardiology',
                    'medical_council' => 'MDCN',
                    'license_number' => 'MDCN001234',
                    'license_expiry_date' => '2026-12-31',
                    'years_of_experience' => '15',
                    'hospital_affiliation' => 'Lagos University Teaching Hospital',
                    'bio' => 'Experienced cardiologist with expertise in heart diseases and preventive care.',
                    'consultation_fee' => 15000.00,
                    'consultation_type' => 'video',
                    'consultation_duration' => 30,
                    'available_days' => 'Monday,Wednesday,Friday',
                    'available_hours' => '09:00-17:00',
                    'city' => 'Lagos',
                    'state' => 'Lagos',
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Dr. Chukwuemeka Okafor',
                    'email' => 'chukwuemeka.okafor@example.com',
                    'phone_number' => '+2349023456789',
                    'date_of_birth' => '1975-09-20',
                    'password' => Hash::make('password'),
                    'role' => 'doctor',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'doctor' => [
                    'title' => 'Prof.',
                    'specialization' => 'Pediatrics',
                    'medical_council' => 'MDCN',
                    'license_number' => 'MDCN002345',
                    'license_expiry_date' => '2027-06-30',
                    'years_of_experience' => '20',
                    'hospital_affiliation' => 'National Hospital Abuja',
                    'bio' => 'Renowned pediatrician specializing in child health and development.',
                    'consultation_fee' => 12000.00,
                    'consultation_type' => 'video',
                    'consultation_duration' => 45,
                    'available_days' => 'Tuesday,Thursday,Saturday',
                    'available_hours' => '10:00-16:00',
                    'city' => 'Abuja',
                    'state' => 'FCT',
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Dr. Amina Mohammed',
                    'email' => 'amina.mohammed@example.com',
                    'phone_number' => '+2349034567890',
                    'date_of_birth' => '1985-11-12',
                    'password' => Hash::make('password'),
                    'role' => 'doctor',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'doctor' => [
                    'title' => 'Dr.',
                    'specialization' => 'Dermatology',
                    'medical_council' => 'MDCN',
                    'license_number' => 'MDCN003456',
                    'license_expiry_date' => '2026-09-15',
                    'years_of_experience' => '10',
                    'hospital_affiliation' => 'Ahmadu Bello University Teaching Hospital',
                    'bio' => 'Dermatologist with expertise in skin conditions and cosmetic dermatology.',
                    'consultation_fee' => 10000.00,
                    'consultation_type' => 'video',
                    'consultation_duration' => 30,
                    'available_days' => 'Monday,Wednesday,Friday',
                    'available_hours' => '08:00-18:00',
                    'city' => 'Kaduna',
                    'state' => 'Kaduna',
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Dr. Olumide Adeyemi',
                    'email' => 'olumide.adeyemi@example.com',
                    'phone_number' => '+2349045678901',
                    'date_of_birth' => '1982-06-25',
                    'password' => Hash::make('password'),
                    'role' => 'doctor',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'doctor' => [
                    'title' => 'Dr.',
                    'specialization' => 'Orthopedics',
                    'medical_council' => 'MDCN',
                    'license_number' => 'MDCN004567',
                    'license_expiry_date' => '2027-03-20',
                    'years_of_experience' => '12',
                    'hospital_affiliation' => 'University College Hospital Ibadan',
                    'bio' => 'Orthopedic surgeon specializing in bone and joint disorders.',
                    'consultation_fee' => 18000.00,
                    'consultation_type' => 'video',
                    'consultation_duration' => 40,
                    'available_days' => 'Tuesday,Thursday',
                    'available_hours' => '09:00-15:00',
                    'city' => 'Ibadan',
                    'state' => 'Oyo',
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Dr. Fatima Ibrahim',
                    'email' => 'fatima.ibrahim@example.com',
                    'phone_number' => '+2349056789012',
                    'date_of_birth' => '1987-02-08',
                    'password' => Hash::make('password'),
                    'role' => 'doctor',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'doctor' => [
                    'title' => 'Dr.',
                    'specialization' => 'Gynecology',
                    'medical_council' => 'MDCN',
                    'license_number' => 'MDCN005678',
                    'license_expiry_date' => '2026-11-30',
                    'years_of_experience' => '8',
                    'hospital_affiliation' => 'Aminu Kano Teaching Hospital',
                    'bio' => 'Gynecologist providing comprehensive women\'s health care services.',
                    'consultation_fee' => 13000.00,
                    'consultation_type' => 'video',
                    'consultation_duration' => 35,
                    'available_days' => 'Monday,Wednesday,Friday',
                    'available_hours' => '10:00-17:00',
                    'city' => 'Kano',
                    'state' => 'Kano',
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
        ];

        foreach ($doctors as $doctorData) {
            $user = User::firstOrCreate(
                ['email' => $doctorData['user']['email']],
                array_merge($doctorData['user'], ['uuid' => Str::uuid()->toString()])
            );

            if (!$user->doctor) {
                Doctor::create(
                    array_merge(
                        $doctorData['doctor'],
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
