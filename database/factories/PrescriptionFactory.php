<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrescriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'notes' => fake()->sentence(),
            'status' => 'active',
        ];
    }
}
