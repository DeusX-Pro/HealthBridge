<?php

namespace Database\Seeders\Pharmacy;

use App\Models\MedicineCategory;
use App\Models\Pharmacy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MedicineCategorySeeder extends Seeder
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

        $categories = [
            [
                'name' => 'Antibiotics',
                'description' => 'Medications used to treat bacterial infections',
                'status' => 'active',
            ],
            [
                'name' => 'Pain Relief',
                'description' => 'Medications for pain management and relief',
                'status' => 'active',
            ],
            [
                'name' => 'Cardiovascular',
                'description' => 'Medications for heart and blood vessel conditions',
                'status' => 'active',
            ],
            [
                'name' => 'Diabetes',
                'description' => 'Medications for diabetes management',
                'status' => 'active',
            ],
            [
                'name' => 'Respiratory',
                'description' => 'Medications for respiratory conditions like asthma and COPD',
                'status' => 'active',
            ],
            [
                'name' => 'Gastrointestinal',
                'description' => 'Medications for digestive system disorders',
                'status' => 'active',
            ],
            [
                'name' => 'Vitamins & Supplements',
                'description' => 'Nutritional supplements and vitamins',
                'status' => 'active',
            ],
            [
                'name' => 'Antihistamines',
                'description' => 'Medications for allergies and allergic reactions',
                'status' => 'active',
            ],
        ];

        foreach ($pharmacyUsers as $pharmacyUser) {
            $pharmacy = $pharmacyUser->pharmacy;
            
            if (!$pharmacy) {
                continue;
            }

            foreach ($categories as $categoryData) {
                $slug = Str::slug($categoryData['name'] . '-' . $pharmacy->id);
                
                MedicineCategory::firstOrCreate(
                    [
                        'slug' => $slug,
                        'pharmacy_id' => $pharmacy->id,
                    ],
                    array_merge($categoryData, [
                        'uuid' => Str::uuid()->toString(),
                        'user_id' => $pharmacyUser->id,
                        'pharmacy_id' => $pharmacy->id,
                        'slug' => $slug,
                    ])
                );
            }
        }
    }
}

