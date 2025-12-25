<?php

namespace Database\Seeders;

use App\Models\Medicallab;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MedicallabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicallabs = [
            [
                'user' => [
                    'name' => 'Diagnostic Lab Services',
                    'email' => 'diagnostic@example.com',
                    'phone_number' => '+2349212345678',
                    'date_of_birth' => '1980-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'medical_lab',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'medicallab' => [
                    'lab_name' => 'Diagnostic Lab Services Ltd',
                    'mlscn_license_number' => 'MLSCN001234',
                    'mlscn_license_expiry' => '2026-12-31',
                    'cac_registration_number' => 'RC111111',
                    'lab_tests_offered' => json_encode([
                        'Blood Test',
                        'Urine Analysis',
                        'X-Ray',
                        'Ultrasound',
                        'ECG',
                        'CT Scan',
                    ]),
                    'address' => '123 Medical Center',
                    'city' => 'Lagos',
                    'state' => 'Lagos',
                    'latitude' => 6.5244,
                    'longitude' => 3.3792,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Advanced Medical Laboratory',
                    'email' => 'advanced@example.com',
                    'phone_number' => '+2349223456789',
                    'date_of_birth' => '1985-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'medical_lab',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'medicallab' => [
                    'lab_name' => 'Advanced Medical Laboratory & Diagnostics',
                    'mlscn_license_number' => 'MLSCN002345',
                    'mlscn_license_expiry' => '2027-06-30',
                    'cac_registration_number' => 'RC222222',
                    'lab_tests_offered' => json_encode([
                        'Complete Blood Count',
                        'Liver Function Test',
                        'Kidney Function Test',
                        'Thyroid Function Test',
                        'HIV Test',
                        'Hepatitis Test',
                    ]),
                    'address' => '456 Hospital Road',
                    'city' => 'Abuja',
                    'state' => 'FCT',
                    'latitude' => 9.0765,
                    'longitude' => 7.3986,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Precision Lab Diagnostics',
                    'email' => 'precision@example.com',
                    'phone_number' => '+2349234567890',
                    'date_of_birth' => '1990-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'medical_lab',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'medicallab' => [
                    'lab_name' => 'Precision Lab Diagnostics Center',
                    'mlscn_license_number' => 'MLSCN003456',
                    'mlscn_license_expiry' => '2026-09-15',
                    'cac_registration_number' => 'RC333333',
                    'lab_tests_offered' => json_encode([
                        'Blood Sugar Test',
                        'Cholesterol Test',
                        'Pregnancy Test',
                        'Malaria Test',
                        'Typhoid Test',
                        'Stool Analysis',
                    ]),
                    'address' => '789 Health Street',
                    'city' => 'Ibadan',
                    'state' => 'Oyo',
                    'latitude' => 7.3775,
                    'longitude' => 3.9470,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'Quality Lab Services',
                    'email' => 'qualitylab@example.com',
                    'phone_number' => '+2349245678901',
                    'date_of_birth' => '1988-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'medical_lab',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'medicallab' => [
                    'lab_name' => 'Quality Lab Services & Research',
                    'mlscn_license_number' => 'MLSCN004567',
                    'mlscn_license_expiry' => '2027-03-20',
                    'cac_registration_number' => 'RC444444',
                    'lab_tests_offered' => json_encode([
                        'MRI',
                        'Mammography',
                        'Bone Density Test',
                        'Endoscopy',
                        'Colonoscopy',
                        'Biopsy',
                    ]),
                    'address' => '321 Clinic Avenue',
                    'city' => 'Kaduna',
                    'state' => 'Kaduna',
                    'latitude' => 10.5264,
                    'longitude' => 7.4388,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'MedTest Laboratory',
                    'email' => 'medtest@example.com',
                    'phone_number' => '+2349256789012',
                    'date_of_birth' => '1992-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'medical_lab',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'medicallab' => [
                    'lab_name' => 'MedTest Laboratory & Imaging',
                    'mlscn_license_number' => 'MLSCN005678',
                    'mlscn_license_expiry' => '2026-11-30',
                    'cac_registration_number' => 'RC555555',
                    'lab_tests_offered' => json_encode([
                        'Pap Smear',
                        'Prostate Test',
                        'Tumor Markers',
                        'Genetic Testing',
                        'Drug Screening',
                        'Allergy Testing',
                    ]),
                    'address' => '654 Diagnostic Boulevard',
                    'city' => 'Port Harcourt',
                    'state' => 'Rivers',
                    'latitude' => 4.8156,
                    'longitude' => 7.0498,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
        ];

        foreach ($medicallabs as $labData) {
            $user = User::firstOrCreate(
                ['email' => $labData['user']['email']],
                array_merge($labData['user'], ['uuid' => Str::uuid()->toString()])
            );

            if (!$user->medicallab) {
                Medicallab::create(
                    array_merge(
                        $labData['medicallab'],
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
