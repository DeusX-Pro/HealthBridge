<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MedicineFactory extends Factory
{
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'user_id' => \App\Models\User::factory(),
            'category_id' => \App\Models\MedicineCategory::factory(),
            'name' => fake()->word(),
            'slug' => fake()->unique()->slug(),
            'dosage_form' => 'tablet',
            'description' => fake()->sentence(),
            'price' => 1000,
            'stock' => 100,
        ];
    }
}
