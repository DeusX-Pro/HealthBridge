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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone_number')->unique();
            $table->date('date_of_birth')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('phone_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'patient', 'doctor'])->default('patient');
            $table->string('profile_picture')->nullable();
            $table->string('country')->nullable();
            $table->enum('status', ['active', 'pending', 'inactive'])->default('active');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('bio')->nullable();
            $table->enum('maritial_status', ['single', 'married', 'divorced', 'widowed', 'seperated'])->nullable();
            $table->rememberToken();
            $table->timestamps();

            //BLOCKCHAIN & DATA SECURITY
            // $table->string('blockchain_wallet_address')->nullable();
            // $table->string('encrypted_medical_data_hash')->nullable();
            // $table->string('public_encryption_key')->nullable();
            // $table->boolean('consent_to_share_data')->default(false);
            // $table->string('last_sync_hash')->nullable();

        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
