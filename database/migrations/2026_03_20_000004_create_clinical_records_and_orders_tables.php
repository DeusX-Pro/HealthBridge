<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clinical_records', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('tenant_id', 64)->nullable();
            $table->string('category', 64); // LAB_RESULT, ENCOUNTER, OBSERVATION, VITAL_SIGNS
            $table->string('coding_system', 64)->nullable();
            $table->string('code_value', 64)->nullable();
            $table->string('title', 255);
            $table->json('clinical_data');
            $table->timestamp('recorded_at');
            $table->string('source_record_id', 128)->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->nullOnDelete();
            $table->index(['user_id', 'recorded_at']);
            $table->index(['user_id', 'category']);
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('tenant_id', 64)->nullable();
            $table->string('order_type', 32); // LAB, PRESCRIPTION, IMAGING
            $table->string('title', 255);
            $table->string('status', 32)->default('ORDERED'); // ORDERED, IN_PROGRESS, COMPLETED, CANCELLED, REJECTED
            $table->text('notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamp('ordered_at');
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->nullOnDelete();
            $table->index(['user_id', 'ordered_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('clinical_records');
    }
};

