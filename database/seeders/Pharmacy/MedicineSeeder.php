<?php

namespace Database\Seeders\Pharmacy;

use App\Models\Medicine;
use App\Models\MedicineBrand;
use App\Models\MedicineCategory;
use App\Models\MedicineSubcategory;
use App\Models\Pharmacy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MedicineSeeder extends Seeder
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

        $medicines = [
            [
                'name' => 'Amoxicillin 500mg',
                'generic_name' => 'Amoxicillin',
                'category' => 'Antibiotics',
                'subcategory' => 'Penicillins',
                'dosage_form' => 'Capsule',
                'strength' => '500mg',
                'description' => 'Broad-spectrum antibiotic used to treat various bacterial infections',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Paracetamol 500mg',
                'generic_name' => 'Acetaminophen',
                'category' => 'Pain Relief',
                'subcategory' => 'Acetaminophen',
                'dosage_form' => 'Tablet',
                'strength' => '500mg',
                'description' => 'Pain reliever and fever reducer',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Ibuprofen 400mg',
                'generic_name' => 'Ibuprofen',
                'category' => 'Pain Relief',
                'subcategory' => 'NSAIDs',
                'dosage_form' => 'Tablet',
                'strength' => '400mg',
                'description' => 'Non-steroidal anti-inflammatory drug for pain and inflammation',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Metformin 500mg',
                'generic_name' => 'Metformin',
                'category' => 'Diabetes',
                'subcategory' => 'Metformin',
                'dosage_form' => 'Tablet',
                'strength' => '500mg',
                'description' => 'Oral medication for type 2 diabetes',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Insulin Glargine',
                'generic_name' => 'Insulin Glargine',
                'category' => 'Diabetes',
                'subcategory' => 'Insulin',
                'dosage_form' => 'Injection',
                'strength' => '100 units/ml',
                'description' => 'Long-acting insulin for diabetes management',
                'is_restricted' => true,
                'requires_id_verification' => true,
                'status' => 'active',
            ],
            [
                'name' => 'Salbutamol Inhaler',
                'generic_name' => 'Salbutamol',
                'category' => 'Respiratory',
                'subcategory' => 'Bronchodilators',
                'dosage_form' => 'Inhaler',
                'strength' => '100mcg',
                'description' => 'Bronchodilator for asthma and COPD',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Omeprazole 20mg',
                'generic_name' => 'Omeprazole',
                'category' => 'Gastrointestinal',
                'subcategory' => 'Proton Pump Inhibitors',
                'dosage_form' => 'Capsule',
                'strength' => '20mg',
                'description' => 'Proton pump inhibitor for acid reflux and ulcers',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Loratadine 10mg',
                'generic_name' => 'Loratadine',
                'category' => 'Antihistamines',
                'subcategory' => 'Second Generation',
                'dosage_form' => 'Tablet',
                'strength' => '10mg',
                'description' => 'Antihistamine for allergy relief',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Vitamin D3 1000IU',
                'generic_name' => 'Cholecalciferol',
                'category' => 'Vitamins & Supplements',
                'subcategory' => 'Vitamin D',
                'dosage_form' => 'Softgel',
                'strength' => '1000IU',
                'description' => 'Vitamin D supplement for bone health',
                'is_restricted' => false,
                'status' => 'active',
            ],
            [
                'name' => 'Amlodipine 5mg',
                'generic_name' => 'Amlodipine',
                'category' => 'Cardiovascular',
                'subcategory' => 'Calcium Channel Blockers',
                'dosage_form' => 'Tablet',
                'strength' => '5mg',
                'description' => 'Calcium channel blocker for hypertension',
                'is_restricted' => false,
                'status' => 'active',
            ],
        ];

        foreach ($pharmacyUsers as $pharmacyUser) {
            $pharmacy = $pharmacyUser->pharmacy;
            
            if (!$pharmacy) {
                continue;
            }

            foreach ($medicines as $medicineData) {
                $category = MedicineCategory::where('name', $medicineData['category'])
                    ->where('pharmacy_id', $pharmacy->id)
                    ->first();

                if (!$category) {
                    continue;
                }

                $subcategory = null;
                if (isset($medicineData['subcategory'])) {
                    $subcategory = MedicineSubcategory::where('name', $medicineData['subcategory'])
                        ->where('pharmacy_id', $pharmacy->id)
                        ->where('category_id', $category->id)
                        ->first();
                }

                // Get a random brand for this pharmacy
                $brand = MedicineBrand::where('pharmacy_id', $pharmacy->id)->inRandomOrder()->first();

                $slug = Str::slug($medicineData['name'] . '-' . $pharmacy->id);
                
                Medicine::firstOrCreate(
                    [
                        'slug' => $slug,
                        'pharmacy_id' => $pharmacy->id,
                    ],
                    array_merge(
                        [
                            'uuid' => Str::uuid()->toString(),
                            'user_id' => $pharmacyUser->id,
                            'pharmacy_id' => $pharmacy->id,
                            'category_id' => $category->id,
                            'subcategory_id' => $subcategory?->id,
                            'brand_id' => $brand?->id,
                            'name' => $medicineData['name'],
                            'slug' => $slug,
                            'generic_name' => $medicineData['generic_name'] ?? null,
                            'dosage_form' => $medicineData['dosage_form'],
                            'strength' => $medicineData['strength'] ?? null,
                            'description' => $medicineData['description'] ?? null,
                            'is_restricted' => $medicineData['is_restricted'] ?? false,
                            'requires_id_verification' => $medicineData['requires_id_verification'] ?? false,
                            'status' => $medicineData['status'] ?? 'active',
                        ]
                    )
                );
            }
        }
    }
}

