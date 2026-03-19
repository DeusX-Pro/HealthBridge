<?php

namespace Database\Factories;

use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'appointment_date' => now()->addDay()->format('Y-m-d'),
            'appointment_time' => '10:00:00',
            'type' => 'telehealth',
            'status' => 'pending',
            'reason' => fake()->sentence(),
        ];
    }
}
