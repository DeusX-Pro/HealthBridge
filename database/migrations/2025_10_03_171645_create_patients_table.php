<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('uuid')->unique();

            // PERSONAL INFORMATION
            $table->string('national_id')->nullable(); // e.g., NIN or BVN
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('occupation')->nullable();

            // HEALTH & MEDICAL INFORMATION
            $table->string('blood_type')->nullable();
            $table->text('allergies')->nullable();
            $table->text('chronic_conditions')->nullable();
            $table->text('current_medications')->nullable();
            $table->text('surgical_history')->nullable();
            $table->text('family_medical_history')->nullable();
            $table->text('immunization_record')->nullable();
            $table->decimal('height', 5, 2)->nullable(); // in cm
            $table->decimal('weight', 5, 2)->nullable(); // in kg
            $table->decimal('bmi', 4, 1)->nullable(); // calculated via system
            $table->string('lifestyle_habits')->nullable(); // e.g., smoking, drinking, diet type
            $table->string('disability_details')->nullable();

            // EMERGENCY CONTACT INFORMATION
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_relationship')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->string('emergency_contact_email')->nullable();
            $table->string('preferred_hospital')->nullable();

            // SYSTEM & PREFERENCES
            $table->string('preferred_language')->nullable();
            $table->enum('preferred_consultation_type', ['video', 'audio', 'text'])->default('video');
            $table->enum('preferred_doctor_gender', ['male', 'female', 'any'])->default('any');
            $table->string('qr_code_path')->nullable(); // for patient identification via QR
            $table->enum('status', ['active', 'pending', 'inactive'])->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
