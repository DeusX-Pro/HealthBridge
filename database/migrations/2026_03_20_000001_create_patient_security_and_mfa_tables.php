<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mfa_factors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('factor_type', 16); // totp, sms, passkey
            $table->text('secret_ciphertext');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'factor_type']);
        });

        Schema::create('patient_data_keys', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('key_version')->default(1);
            $table->text('wrapped_dek');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('retired_at')->nullable();
            $table->primary(['user_id', 'key_version']);
        });

        Schema::create('patient_interests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('interest', 64);
            $table->timestamps();
            $table->unique(['user_id', 'interest']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_interests');
        Schema::dropIfExists('patient_data_keys');
        Schema::dropIfExists('mfa_factors');
    }
};

