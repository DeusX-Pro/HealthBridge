<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('checklists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 255);
            $table->string('category', 64)->default('GENERAL');
            $table->timestamps();
        });

        Schema::create('checklist_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('checklist_id');
            $table->string('label', 255);
            $table->boolean('is_checked')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->foreign('checklist_id')->references('id')->on('checklists')->cascadeOnDelete();
        });

        Schema::create('safety_plans', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->json('warning_signs')->nullable();
            $table->json('coping_strategies')->nullable();
            $table->json('distractions')->nullable();
            $table->json('emergency_contacts')->nullable();
            $table->json('professional_contacts')->nullable();
            $table->text('environment_safety')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('safety_plans');
        Schema::dropIfExists('checklist_items');
        Schema::dropIfExists('checklists');
    }
};

