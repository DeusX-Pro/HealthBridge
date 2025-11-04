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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->uuid('uuid')->unique();

            // Professional Info
            $table->string('title')->nullable(); // e.g., Dr., Prof.
            $table->string('specialization')->nullable();
            $table->string('medical_council')->nullable(); // e.g. MDCN
            $table->string('license_number')->unique()->nullable();
            $table->date('license_expiry_date')->nullable();
            $table->string('years_of_experience')->nullable();
            $table->string('hospital_affiliation')->nullable();
            $table->text('bio')->nullable();

            // Documents
            $table->string('medical_license')->nullable();
            $table->string('degree_certificate')->nullable();
            $table->string('id_card')->nullable();
            $table->string('affiliation_letter')->nullable();
            $table->json('other_documents')->nullable();

            // Consultation
            $table->decimal('consultation_fee', 10, 2)->nullable();
            $table->string('consultation_type')->nullable(); // video, chat, audio
            $table->integer('consultation_duration')->nullable(); // in minutes
            $table->string('available_days')->nullable(); // JSON or comma separated
            $table->string('available_hours')->nullable();

            // Location
            $table->string('city')->nullable();
            $table->string('state')->nullable();

            // Verification & Status
            $table->enum('status', ['pending', 'approved', 'rejected', 'inactive'])->default('pending');
            $table->timestamp('verified_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->foreignId('admin_verified_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
