<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'uuid' => fake()->uuid(),
            'title' => fake()->title(),
            'specialization' => fake()->word(),
            'license_number' => fake()->unique()->numerify('DOC-#####'),
            'status' => 'approved',
            'consultation_fee' => 5000,
            'available_days' => json_encode(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
            'available_hours' => json_encode(['09:00', '17:00']),
        ];
    }
}
