<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            // ADMIN
            [
                'name' => 'Admin User',
                'email' => 'admin@healthbridge.com',
                'phone_number' => '+2348000000000',
                'date_of_birth' => '1985-01-01',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ],
            // PATIENTS
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'phone_number' => '+2348012345678',
                'date_of_birth' => '1990-05-15',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Mary Johnson',
                'email' => 'mary.johnson@example.com',
                'phone_number' => '+2348023456789',
                'date_of_birth' => '1985-08-20',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael.brown@example.com',
                'phone_number' => '+2348034567890',
                'date_of_birth' => '1992-12-10',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily.davis@example.com',
                'phone_number' => '+2348045678901',
                'date_of_birth' => '1988-03-25',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'James Wilson',
                'email' => 'james.wilson@example.com',
                'phone_number' => '+2348056789012',
                'date_of_birth' => '1995-07-18',
                'password' => Hash::make('password'),
                'role' => 'patient',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            // DOCTORS
            [
                'name' => 'Dr. Sarah Adebayo',
                'email' => 'sarah.adebayo@example.com',
                'phone_number' => '+2349012345678',
                'date_of_birth' => '1980-04-15',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dr. Chukwuemeka Okafor',
                'email' => 'chukwuemeka.okafor@example.com',
                'phone_number' => '+2349023456789',
                'date_of_birth' => '1975-09-20',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dr. Amina Mohammed',
                'email' => 'amina.mohammed@example.com',
                'phone_number' => '+2349034567890',
                'date_of_birth' => '1985-11-12',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dr. Olumide Adeyemi',
                'email' => 'olumide.adeyemi@example.com',
                'phone_number' => '+2349045678901',
                'date_of_birth' => '1982-06-25',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Dr. Fatima Ibrahim',
                'email' => 'fatima.ibrahim@example.com',
                'phone_number' => '+2349056789012',
                'date_of_birth' => '1987-02-08',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            // PHARMACIES
            [
                'name' => 'HealthPlus Pharmacy',
                'email' => 'healthplus@example.com',
                'phone_number' => '+2349112345678',
                'date_of_birth' => '1980-01-01',
                'password' => Hash::make('password'),
                'role' => 'pharmacy',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'MediCare Pharmacy',
                'email' => 'medicare@example.com',
                'phone_number' => '+2349123456789',
                'date_of_birth' => '1985-01-01',
                'password' => Hash::make('password'),
                'role' => 'pharmacy',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Wellness Pharmacy',
                'email' => 'wellness@example.com',
                'phone_number' => '+2349134567890',
                'date_of_birth' => '1990-01-01',
                'password' => Hash::make('password'),
                'role' => 'pharmacy',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            // MEDICAL LABS
            [
                'name' => 'Diagnostic Lab Services',
                'email' => 'diagnostic@example.com',
                'phone_number' => '+2349212345678',
                'date_of_birth' => '1980-01-01',
                'password' => Hash::make('password'),
                'role' => 'medical_lab',
                'gender' => 'male',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Advanced Medical Laboratory',
                'email' => 'advanced@example.com',
                'phone_number' => '+2349223456789',
                'date_of_birth' => '1985-01-01',
                'password' => Hash::make('password'),
                'role' => 'medical_lab',
                'gender' => 'female',
                'status' => 'active',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                array_merge($userData, ['uuid' => (string) Str::uuid()])
            );
        }
    }
}
