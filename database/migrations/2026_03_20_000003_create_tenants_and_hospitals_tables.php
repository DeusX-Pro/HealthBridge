<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->string('id', 64)->primary(); // e.g. tenant-demo
            $table->string('name', 255);
            $table->string('jurisdiction', 64)->default('NG');
            $table->string('status', 32)->default('ACTIVE');
            $table->timestamps();
        });

        Schema::create('connected_hospitals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('tenant_id', 64)->nullable();
            $table->string('hospital_name', 255);
            $table->string('patient_mrn', 128);
            $table->enum('status', ['CONNECTED', 'PENDING', 'DISCONNECTED'])->default('CONNECTED');
            $table->boolean('is_hidden')->default(false);
            $table->timestamp('last_sync_at')->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->nullOnDelete();
            $table->unique(['user_id', 'hospital_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('connected_hospitals');
        Schema::dropIfExists('tenants');
    }
};

