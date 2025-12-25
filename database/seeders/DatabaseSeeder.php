<?php

namespace Database\Seeders;

use Database\Seeders\Pharmacy\MedicineBrandSeeder;
use Database\Seeders\Pharmacy\MedicineCategorySeeder;
use Database\Seeders\Pharmacy\MedicineSeeder;
use Database\Seeders\Pharmacy\MedicineSubcategorySeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed users first
        $this->call([
            PatientSeeder::class,
            DoctorSeeder::class,
            PharmacySeeder::class,
            MedicallabSeeder::class,
        ]);

        // Seed pharmacy-related data (depends on pharmacies)
        $this->call([
            MedicineCategorySeeder::class,
            MedicineSubcategorySeeder::class,
            MedicineBrandSeeder::class,
            MedicineSeeder::class,
        ]);

        // Seed medical lab services (depends on medical labs)
        $this->call([
            MedicalLabServiceSeeder::class,
        ]);
    }
}
