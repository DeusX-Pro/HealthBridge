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
        Schema::create('medicallabs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('uuid')->unique();

            // Business Info
            $table->string('lab_name');
            $table->string('mlscn_license_number')->unique();
            $table->date('mlscn_license_expiry')->nullable();
            $table->string('cac_registration_number')->nullable();

            // Documents
            $table->string('mlscn_certificate')->nullable();
            $table->string('cac_certificate')->nullable();
            $table->string('director_id_card')->nullable();
            $table->string('facility_photo')->nullable();

            // Services
            $table->json('lab_tests_offered')->nullable();

            // Location
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // Verification
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('admin_verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('rejection_reason')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicallabs');
    }
};
