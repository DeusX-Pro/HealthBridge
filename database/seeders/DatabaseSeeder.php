<?php

namespace Database\Seeders;

use Database\Seeders\Pharmacy\MedicineBrandSeeder;
use Database\Seeders\Pharmacy\MedicineCategorySeeder;
use Database\Seeders\Pharmacy\MedicineSeeder;
use Database\Seeders\Pharmacy\MedicineSubcategorySeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Core Users and Profiles
        $this->call([
            UserSeeder::class,
            PatientSeeder::class,
            DoctorSeeder::class,
            MedicallabSeeder::class,
            PharmacySeeder::class,
        ]);

        // 2. Pharmacy Infrastructure (Medicines, etc.)
        $this->call([
            MedicineCategorySeeder::class,
            MedicineSubcategorySeeder::class,
            MedicineBrandSeeder::class,
            MedicineSeeder::class,
        ]);

        // 3. Medical Lab Infrastructure (Services)
        $this->call([
            MedicalLabServiceSeeder::class,
        ]);

        // 4. Transactional Data (Appointments, Vitals, prescriptions, Orders)
        $this->call([
            AppointmentSeeder::class,
            VitalSeeder::class,
            PrescriptionSeeder::class,
            PharmacyOrderSeeder::class,
            WalletTransactionSeeder::class,
        ]);
    }
}
