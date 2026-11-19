<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('self_exam_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('log_date');
            $table->enum('finding', ['NORMAL', 'CHANGE_NOTICED', 'PAIN', 'UNSURE']);
            $table->text('encrypted_notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'log_date']);
        });

        Schema::create('patient_screening_settings', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->boolean('self_exam_reminder_active')->default(false);
            $table->boolean('family_history_prostate')->default(false);
            $table->boolean('family_history_testicular')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_screening_settings');
        Schema::dropIfExists('self_exam_logs');
    }
};

