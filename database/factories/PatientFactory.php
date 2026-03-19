<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'uuid' => fake()->uuid(),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'blood_type' => fake()->randomElement(['A+', 'B+', 'O+', 'AB+']),
        ];
    }
}
