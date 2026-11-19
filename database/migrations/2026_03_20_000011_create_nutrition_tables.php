<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nutrition_profiles', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->enum('activity_level', ['SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE'])->default('MODERATE');
            $table->enum('goal', ['LOSE', 'GAIN', 'MAINTAIN', 'HEALTHY'])->default('HEALTHY');
            $table->enum('diet_type', ['BALANCED', 'HIGH_PROTEIN', 'VEGETARIAN', 'VEGAN', 'PESCATARIAN', 'LOW_CARB', 'LOW_SUGAR'])->default('BALANCED');
            $table->double('target_weight_kg')->nullable();
            $table->date('target_date')->nullable();
            $table->double('pace_kg_per_week')->default(0);
            $table->json('allergens')->nullable();
            $table->json('excluded_categories')->nullable();
            $table->boolean('pregnant_or_breastfeeding')->default(false);
            $table->boolean('eating_disorder_history')->default(false);
            $table->boolean('diet_affecting_condition')->default(false);
            $table->timestamps();
        });

        Schema::create('foods', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete(); // null = system food
            $table->string('name', 120);
            $table->string('category', 64);
            $table->string('serving_label', 64);
            $table->double('serving_grams');
            $table->double('kcal');
            $table->double('protein_g')->default(0);
            $table->double('carb_g')->default(0);
            $table->double('fat_g')->default(0);
            $table->double('fibre_g')->default(0);
            $table->boolean('is_vegetarian')->default(false);
            $table->boolean('is_hidden')->default(false);
            $table->timestamps();
        });

        Schema::create('nutrition_plans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'])->default('ACTIVE');
            $table->date('start_date')->nullable();
            $table->integer('calorie_target');
            $table->integer('protein_target_g');
            $table->integer('carb_target_g');
            $table->integer('fat_target_g');
            $table->json('days_data');
            $table->timestamps();
        });

        Schema::create('food_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('food_id')->nullable();
            $table->string('custom_name', 120)->nullable();
            $table->date('log_date');
            $table->enum('meal_slot', ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'])->default('SNACK');
            $table->double('servings')->default(1);
            $table->double('kcal');
            $table->double('protein_g')->default(0);
            $table->double('carb_g')->default(0);
            $table->double('fat_g')->default(0);
            $table->timestamps();

            $table->foreign('food_id')->references('id')->on('foods')->nullOnDelete();
            $table->index(['user_id', 'log_date']);
        });

        Schema::create('water_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('log_date');
            $table->integer('amount_ml');
            $table->timestamps();

            $table->index(['user_id', 'log_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('water_logs');
        Schema::dropIfExists('food_logs');
        Schema::dropIfExists('nutrition_plans');
        Schema::dropIfExists('foods');
        Schema::dropIfExists('nutrition_profiles');
    }
};

