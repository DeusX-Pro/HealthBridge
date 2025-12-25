<?php

namespace Database\Seeders;

use App\Models\Medicallab;
use App\Models\MedicalLabService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MedicalLabServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicallabs = Medicallab::all();

        // Service data based on the services page and lab tests offered
        $servicesData = [
            // Diagnostic Lab Services
            [
                'name' => 'Complete Blood Count (CBC)',
                'category' => 'Hematology',
                'description' => 'Full blood count test including red cells, white cells, and platelets',
                'price' => 15000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Blood Test',
                'category' => 'Hematology',
                'description' => 'Comprehensive blood analysis including complete blood count and basic metabolic panel',
                'price' => 12000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Urine Analysis',
                'category' => 'Urine Analysis',
                'description' => 'Complete urine analysis and culture to detect infections and abnormalities',
                'price' => 8000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'X-Ray',
                'category' => 'Radiology',
                'description' => 'X-ray imaging for diagnostic purposes',
                'price' => 25000,
                'duration' => '2 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Ultrasound',
                'category' => 'Radiology',
                'description' => 'Ultrasound imaging for internal organ examination',
                'price' => 35000,
                'duration' => '1 hour',
                'status' => 'active',
            ],
            [
                'name' => 'ECG',
                'category' => 'Cardiology',
                'description' => 'Electrocardiogram to assess heart function',
                'price' => 15000,
                'duration' => '30 minutes',
                'status' => 'active',
            ],
            [
                'name' => 'CT Scan',
                'category' => 'Radiology',
                'description' => 'Computed Tomography scan for detailed imaging',
                'price' => 50000,
                'duration' => '1 hour',
                'status' => 'active',
            ],
            // Advanced Medical Laboratory services
            [
                'name' => 'Liver Function Test (LFT)',
                'category' => 'Chemistry',
                'description' => 'Comprehensive liver function assessment',
                'price' => 18000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Kidney Function Test',
                'category' => 'Chemistry',
                'description' => 'Renal function panel to assess kidney health',
                'price' => 16000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Thyroid Function Test',
                'category' => 'Chemistry',
                'description' => 'Complete thyroid panel including T3, T4, and TSH',
                'price' => 20000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            [
                'name' => 'HIV Test',
                'category' => 'Immunology',
                'description' => 'HIV screening test with confidential results',
                'price' => 5000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Hepatitis Test',
                'category' => 'Immunology',
                'description' => 'Hepatitis B and C screening',
                'price' => 12000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            // Precision Lab Diagnostics services
            [
                'name' => 'Blood Sugar Test',
                'category' => 'Chemistry',
                'description' => 'Fasting and random blood glucose test',
                'price' => 5000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Cholesterol Test',
                'category' => 'Chemistry',
                'description' => 'Lipid panel including total cholesterol, HDL, LDL, and triglycerides',
                'price' => 12000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Pregnancy Test',
                'category' => 'Immunology',
                'description' => 'Urine and blood pregnancy test',
                'price' => 3000,
                'duration' => '2 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Malaria Test',
                'category' => 'Microbiology',
                'description' => 'Rapid malaria parasite detection',
                'price' => 4000,
                'duration' => '2 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Typhoid Test',
                'category' => 'Microbiology',
                'description' => 'Typhoid fever screening test',
                'price' => 5000,
                'duration' => '24 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Stool Analysis',
                'category' => 'Microbiology',
                'description' => 'Complete stool examination for parasites and bacteria',
                'price' => 8000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            // Quality Lab Services
            [
                'name' => 'MRI',
                'category' => 'Radiology',
                'description' => 'Magnetic Resonance Imaging for detailed soft tissue examination',
                'price' => 80000,
                'duration' => '1 hour',
                'status' => 'active',
            ],
            [
                'name' => 'Mammography',
                'category' => 'Radiology',
                'description' => 'Breast cancer screening mammogram',
                'price' => 30000,
                'duration' => '30 minutes',
                'status' => 'active',
            ],
            [
                'name' => 'Bone Density Test',
                'category' => 'Radiology',
                'description' => 'DEXA scan for osteoporosis screening',
                'price' => 25000,
                'duration' => '30 minutes',
                'status' => 'active',
            ],
            [
                'name' => 'Endoscopy',
                'category' => 'Diagnostic',
                'description' => 'Upper gastrointestinal endoscopy',
                'price' => 60000,
                'duration' => '1 hour',
                'status' => 'active',
            ],
            [
                'name' => 'Colonoscopy',
                'category' => 'Diagnostic',
                'description' => 'Lower gastrointestinal colonoscopy',
                'price' => 70000,
                'duration' => '1 hour',
                'status' => 'active',
            ],
            [
                'name' => 'Biopsy',
                'category' => 'Pathology',
                'description' => 'Tissue biopsy for histopathological examination',
                'price' => 40000,
                'duration' => '5-7 days',
                'status' => 'active',
            ],
            // MedTest Laboratory services
            [
                'name' => 'Pap Smear',
                'category' => 'Pathology',
                'description' => 'Cervical cancer screening test',
                'price' => 15000,
                'duration' => '5-7 days',
                'status' => 'active',
            ],
            [
                'name' => 'Prostate Test',
                'category' => 'Chemistry',
                'description' => 'PSA (Prostate-Specific Antigen) test',
                'price' => 10000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Tumor Markers',
                'category' => 'Chemistry',
                'description' => 'Comprehensive tumor marker panel',
                'price' => 25000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Genetic Testing',
                'category' => 'Genetics',
                'description' => 'DNA analysis for genetic disorders and carrier screening',
                'price' => 100000,
                'duration' => '14-21 days',
                'status' => 'active',
            ],
            [
                'name' => 'Drug Screening',
                'category' => 'Toxicology',
                'description' => 'Comprehensive drug abuse screening panel',
                'price' => 20000,
                'duration' => '48 hours',
                'status' => 'active',
            ],
            [
                'name' => 'Allergy Testing',
                'category' => 'Immunology',
                'description' => 'Comprehensive allergy panel testing',
                'price' => 30000,
                'duration' => '5-7 days',
                'status' => 'active',
            ],
        ];

        foreach ($medicallabs as $medicallab) {
            // Assign services to each medical lab
            // We'll assign a subset of services to each lab based on their lab_tests_offered
            $labTests = json_decode($medicallab->lab_tests_offered ?? '[]', true) ?: [];
            
            // Assign all services to each lab (you can customize this logic)
            foreach ($servicesData as $serviceData) {
                MedicalLabService::create([
                    'uuid' => Str::uuid()->toString(),
                    'medicallab_id' => $medicallab->id,
                    'name' => $serviceData['name'],
                    'category' => $serviceData['category'],
                    'description' => $serviceData['description'],
                    'price' => $serviceData['price'],
                    'duration' => $serviceData['duration'],
                    'status' => $serviceData['status'],
                ]);
            }
        }
    }
}
