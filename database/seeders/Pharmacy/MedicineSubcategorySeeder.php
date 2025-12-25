<?php

namespace Database\Seeders\Pharmacy;

use App\Models\MedicineCategory;
use App\Models\MedicineSubcategory;
use App\Models\Pharmacy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MedicineSubcategorySeeder extends Seeder
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

        $subcategories = [
            'Antibiotics' => [
                'Penicillins',
                'Cephalosporins',
                'Macrolides',
                'Fluoroquinolones',
            ],
            'Pain Relief' => [
                'NSAIDs',
                'Opioids',
                'Acetaminophen',
                'Topical Analgesics',
            ],
            'Cardiovascular' => [
                'ACE Inhibitors',
                'Beta Blockers',
                'Calcium Channel Blockers',
                'Diuretics',
            ],
            'Diabetes' => [
                'Insulin',
                'Metformin',
                'Sulfonylureas',
                'DPP-4 Inhibitors',
            ],
            'Respiratory' => [
                'Bronchodilators',
                'Inhalers',
                'Expectorants',
                'Decongestants',
            ],
            'Gastrointestinal' => [
                'Antacids',
                'Proton Pump Inhibitors',
                'Antiemetics',
                'Laxatives',
            ],
            'Vitamins & Supplements' => [
                'Multivitamins',
                'Vitamin D',
                'Calcium',
                'Iron Supplements',
            ],
            'Antihistamines' => [
                'First Generation',
                'Second Generation',
                'Third Generation',
            ],
        ];

        foreach ($pharmacyUsers as $pharmacyUser) {
            $pharmacy = $pharmacyUser->pharmacy;
            
            if (!$pharmacy) {
                continue;
            }

            foreach ($subcategories as $categoryName => $subcategoryNames) {
                $category = MedicineCategory::where('name', $categoryName)
                    ->where('pharmacy_id', $pharmacy->id)
                    ->first();

                if (!$category) {
                    continue;
                }

                foreach ($subcategoryNames as $subcategoryName) {
                    $slug = Str::slug($subcategoryName . '-' . $pharmacy->id);
                    
                    MedicineSubcategory::firstOrCreate(
                        [
                            'slug' => $slug,
                            'pharmacy_id' => $pharmacy->id,
                            'category_id' => $category->id,
                        ],
                        [
                            'uuid' => Str::uuid()->toString(),
                            'user_id' => $pharmacyUser->id,
                            'pharmacy_id' => $pharmacy->id,
                            'category_id' => $category->id,
                            'name' => $subcategoryName,
                            'slug' => $slug,
                            'status' => 'active',
                        ]
                    );
                }
            }
        }
    }
}

