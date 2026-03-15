<?php

namespace Database\Seeders;

use App\Models\Pharmacy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PharmacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pharmacyUsers = User::where('role', 'pharmacy')->get();

        foreach ($pharmacyUsers as $user) {
            if (!$user->pharmacy) {
                Pharmacy::create([
                    'user_id' => $user->id,
                    'uuid' => (string) Str::uuid(),
                    'business_name' => $user->name . ' & Stores',
                    'pcn_license_number' => 'PCN' . rand(100000, 999999),
                    'pcn_license_expiry' => now()->addYears(3),
                    'cac_registration_number' => 'RC' . rand(1000000, 9999999),
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
