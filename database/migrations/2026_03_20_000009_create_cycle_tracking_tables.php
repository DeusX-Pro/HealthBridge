<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cycle_records', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('cycle_start_date');
            $table->date('cycle_end_date')->nullable();
            $table->integer('cycle_length_days')->nullable();
            $table->boolean('is_atypical')->default(false);
            $table->timestamps();

            $table->index(['user_id', 'cycle_start_date']);
        });

        Schema::create('daily_symptom_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('cycle_id')->nullable();
            $table->date('log_date');
            $table->enum('flow_intensity', ['NONE', 'LIGHT', 'MEDIUM', 'HEAVY', 'SPOTTING'])->default('NONE');
            $table->decimal('bbt_celsius', 4, 2)->nullable();
            $table->string('cervical_mucus', 32)->nullable();
            $table->string('ovulation_test', 16)->nullable();
            $table->string('pregnancy_test', 16)->nullable();
            $table->json('symptoms')->nullable();
            $table->string('mood', 64)->nullable();
            $table->json('sexual_activity')->nullable();
            $table->text('encrypted_notes')->nullable();
            $table->timestamps();

            $table->foreign('cycle_id')->references('id')->on('cycle_records')->nullOnDelete();
            $table->unique(['user_id', 'log_date']);
        });

        Schema::create('cycle_predictions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('predicted_start_date');
            $table->date('predicted_ovulation');
            $table->date('fertile_window_start');
            $table->date('fertile_window_end');
            $table->timestamps();

            $table->index(['user_id', 'predicted_start_date']);
        });

        Schema::create('contraception_plans', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->string('method', 32)->default('NONE'); // NONE, PILL, CONDOM, IUD_HORMONAL, IUD_COPPER, IMPLANT, INJECTION, PATCH, RING, DIAPHRAGM
            $table->date('start_date')->nullable();
            $table->boolean('reminder_active')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contraception_plans');
        Schema::dropIfExists('cycle_predictions');
        Schema::dropIfExists('daily_symptom_logs');
        Schema::dropIfExists('cycle_records');
    }
};

