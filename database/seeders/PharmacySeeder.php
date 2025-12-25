<?php

namespace Database\Seeders;

use App\Models\Pharmacy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PharmacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pharmacies = [
            [
                'user' => [
                    'name' => 'HealthPlus Pharmacy',
                    'email' => 'healthplus@example.com',
                    'phone_number' => '+2349112345678',
                    'date_of_birth' => '1980-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'pharmacy',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'pharmacy' => [
                    'business_name' => 'HealthPlus Pharmacy Ltd',
                    'pcn_license_number' => 'PCN001234',
                    'pcn_license_expiry' => '2026-12-31',
                    'cac_registration_number' => 'RC123456',
                    'address' => '123 Victoria Island',
                    'city' => 'Lagos',
                    'state' => 'Lagos',
                    'latitude' => 6.4281,
                    'longitude' => 3.4219,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
            [
                'user' => [
                    'name' => 'MediCare Pharmacy',
                    'email' => 'medicare@example.com',
                    'phone_number' => '+2349123456789',
                    'date_of_birth' => '1985-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'pharmacy',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'pharmacy' => [
                    'business_name' => 'MediCare Pharmacy & Stores',
                    'pcn_license_number' => 'PCN002345',
                    'pcn_license_expiry' => '2027-06-30',
                    'cac_registration_number' => 'RC234567',
                    'address' => '456 Wuse Zone 2',
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
                    'name' => 'Wellness Pharmacy',
                    'email' => 'wellness@example.com',
                    'phone_number' => '+2349134567890',
                    'date_of_birth' => '1990-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'pharmacy',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'pharmacy' => [
                    'business_name' => 'Wellness Pharmacy & Healthcare',
                    'pcn_license_number' => 'PCN003456',
                    'pcn_license_expiry' => '2026-09-15',
                    'cac_registration_number' => 'RC345678',
                    'address' => '789 Ring Road',
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
                    'name' => 'PrimeCare Pharmacy',
                    'email' => 'primecare@example.com',
                    'phone_number' => '+2349145678901',
                    'date_of_birth' => '1988-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'pharmacy',
                    'gender' => 'male',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'pharmacy' => [
                    'business_name' => 'PrimeCare Pharmacy Services',
                    'pcn_license_number' => 'PCN004567',
                    'pcn_license_expiry' => '2027-03-20',
                    'cac_registration_number' => 'RC456789',
                    'address' => '321 Ahmadu Bello Way',
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
                    'name' => 'CityMed Pharmacy',
                    'email' => 'citymed@example.com',
                    'phone_number' => '+2349156789012',
                    'date_of_birth' => '1992-01-01',
                    'password' => Hash::make('password'),
                    'role' => 'pharmacy',
                    'gender' => 'female',
                    'status' => 'active',
                    'email_verified_at' => now(),
                    'phone_verified_at' => now(),
                ],
                'pharmacy' => [
                    'business_name' => 'CityMed Pharmacy & Medical Supplies',
                    'pcn_license_number' => 'PCN005678',
                    'pcn_license_expiry' => '2026-11-30',
                    'cac_registration_number' => 'RC567890',
                    'address' => '654 Airport Road',
                    'city' => 'Port Harcourt',
                    'state' => 'Rivers',
                    'latitude' => 4.8156,
                    'longitude' => 7.0498,
                    'status' => 'approved',
                    'verified_at' => now(),
                ],
            ],
        ];

        foreach ($pharmacies as $pharmacyData) {
            $user = User::firstOrCreate(
                ['email' => $pharmacyData['user']['email']],
                array_merge($pharmacyData['user'], ['uuid' => Str::uuid()->toString()])
            );

            if (!$user->pharmacy) {
                Pharmacy::create(
                    array_merge(
                        $pharmacyData['pharmacy'],
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
