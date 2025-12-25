<?php

namespace Database\Seeders\Pharmacy;

use App\Models\MedicineBrand;
use App\Models\Pharmacy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MedicineBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get pharmacy users
        $pharmacyUsers = User::where('role', 'pharmacy')->with('pharmacy')->get();

        if ($pharmacyUsers->isEmpty()) {
            $this->command->warn('No pharmacy users found. Please run PharmacySeeder first.');
            return;
        }

        $brands = [
            [
                'name' => 'Pfizer',
                'description' => 'Leading pharmaceutical company',
                'manufacturer' => 'Pfizer Inc.',
                'country' => 'USA',
            ],
            [
                'name' => 'GlaxoSmithKline',
                'description' => 'Global healthcare company',
                'manufacturer' => 'GSK',
                'country' => 'UK',
            ],
            [
                'name' => 'Novartis',
                'description' => 'Swiss multinational pharmaceutical corporation',
                'manufacturer' => 'Novartis AG',
                'country' => 'Switzerland',
            ],
            [
                'name' => 'Roche',
                'description' => 'Swiss healthcare company',
                'manufacturer' => 'Roche Holding AG',
                'country' => 'Switzerland',
            ],
            [
                'name' => 'Sanofi',
                'description' => 'French multinational pharmaceutical company',
                'manufacturer' => 'Sanofi S.A.',
                'country' => 'France',
            ],
            [
                'name' => 'Emzor',
                'description' => 'Nigerian pharmaceutical company',
                'manufacturer' => 'Emzor Pharmaceuticals',
                'country' => 'Nigeria',
            ],
            [
                'name' => 'May & Baker',
                'description' => 'Nigerian pharmaceutical company',
                'manufacturer' => 'May & Baker Nigeria Plc',
                'country' => 'Nigeria',
            ],
            [
                'name' => 'Fidson',
                'description' => 'Nigerian pharmaceutical company',
                'manufacturer' => 'Fidson Healthcare Plc',
                'country' => 'Nigeria',
            ],
            [
                'name' => 'Gilead',
                'description' => 'American biopharmaceutical company',
                'manufacturer' => 'Gilead Sciences',
                'country' => 'USA',
            ],
            [
                'name' => 'AstraZeneca',
                'description' => 'British-Swedish multinational pharmaceutical company',
                'manufacturer' => 'AstraZeneca plc',
                'country' => 'UK',
            ],
        ];

        foreach ($pharmacyUsers as $pharmacyUser) {
            $pharmacy = $pharmacyUser->pharmacy;
            
            if (!$pharmacy) {
                continue;
            }

            foreach ($brands as $brandData) {
                $slug = Str::slug($brandData['name'] . '-' . $pharmacy->id);
                
                MedicineBrand::firstOrCreate(
                    [
                        'slug' => $slug,
                        'pharmacy_id' => $pharmacy->id,
                    ],
                    array_merge($brandData, [
                        'uuid' => Str::uuid()->toString(),
                        'user_id' => $pharmacyUser->id,
                        'pharmacy_id' => $pharmacy->id,
                        'slug' => $slug,
                        'status' => 'active',
                    ])
                );
            }
        }
    }
}

