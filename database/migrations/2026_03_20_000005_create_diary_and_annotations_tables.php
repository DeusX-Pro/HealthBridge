<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('diary_entries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('entry_type', 32); // CONSULTATION, DIAGNOSIS, PROCEDURE, VACCINATION, ALLERGY, FAMILY_HISTORY, SYMPTOM, NOTE
            $table->date('entry_date');
            $table->string('title', 255);
            $table->json('data')->nullable();
            $table->json('tags')->nullable();
            $table->enum('origin', ['SELF', 'LINK'])->default('SELF');
            $table->uuid('source_submission_id')->nullable();
            $table->text('search_text')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['user_id', 'entry_date']);
        });

        Schema::create('annotations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('target_type', 32); // DIARY_ENTRY, CLINICAL_RECORD
            $table->uuid('target_id');
            $table->text('body');
            $table->timestamps();

            $table->index(['user_id', 'target_type', 'target_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('annotations');
        Schema::dropIfExists('diary_entries');
    }
};

