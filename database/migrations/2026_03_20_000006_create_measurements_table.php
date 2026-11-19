<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('measurements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('measurement_type', 32); // WEIGHT, HEIGHT, WAIST, BLOOD_PRESSURE, HEART_RATE, TEMPERATURE, GLUCOSE, OXYGEN, SLEEP
            $table->double('value');
            $table->double('value2')->nullable(); // Diastolic for BLOOD_PRESSURE
            $table->string('unit', 16);
            $table->string('context', 32)->nullable();
            $table->timestamp('measured_at');
            $table->enum('source', ['SELF', 'HOSPITAL'])->default('SELF');
            $table->softDeletes();
            $table->timestamps();

            $table->index(['user_id', 'measurement_type', 'measured_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('measurements');
    }
};

