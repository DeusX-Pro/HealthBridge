<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MedicineCategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'user_id' => \App\Models\User::factory(),
            'name' => fake()->unique()->word(),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->sentence(),
        ];
    }
}
