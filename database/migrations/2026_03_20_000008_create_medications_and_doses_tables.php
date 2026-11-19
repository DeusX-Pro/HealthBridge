<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('source', ['SELF', 'HOSPITAL'])->default('SELF');
            $table->string('tenant_id', 64)->nullable();
            $table->string('source_record_id', 128)->nullable();
            $table->string('name', 255);
            $table->string('dose', 128);
            $table->text('instructions')->nullable();
            $table->json('dose_times'); // Array of "HH:MM"
            $table->string('timezone', 64)->default('UTC');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();

            $table->foreign('tenant_id')->references('id')->on('tenants')->nullOnDelete();
            $table->index(['user_id', 'start_date']);
        });

        Schema::create('dose_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('medication_id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamp('scheduled_at');
            $table->enum('status', ['TAKEN', 'SKIPPED']);
            $table->timestamps();

            $table->foreign('medication_id')->references('id')->on('medications')->cascadeOnDelete();
            $table->unique(['medication_id', 'scheduled_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dose_logs');
        Schema::dropIfExists('medications');
    }
};

