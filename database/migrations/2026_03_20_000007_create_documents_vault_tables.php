<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 255);
            $table->string('category', 32); // LAB_REPORT, PRESCRIPTION, IMAGING, DISCHARGE_SUMMARY, INSURANCE, OTHER
            $table->date('document_date');
            $table->json('tags')->nullable();
            $table->text('notes')->nullable();
            $table->string('file_name', 255);
            $table->text('storage_path');
            $table->string('content_type', 64);
            $table->bigInteger('size_bytes');
            $table->char('sha256', 64);
            $table->string('scan_status', 16)->default('CLEAN'); // PENDING, CLEAN, REJECTED
            $table->enum('origin', ['SELF', 'LINK'])->default('SELF');
            $table->uuid('submission_id')->nullable();
            $table->text('search_text')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['user_id', 'document_date']);
        });

        Schema::create('document_links', function (Blueprint $table) {
            $table->id();
            $table->uuid('document_id');
            $table->string('target_type', 32); // DIARY_ENTRY, CLINICAL_RECORD
            $table->uuid('target_id');
            $table->timestamps();

            $table->foreign('document_id')->references('id')->on('documents')->cascadeOnDelete();
            $table->unique(['document_id', 'target_type', 'target_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_links');
        Schema::dropIfExists('documents');
    }
};

