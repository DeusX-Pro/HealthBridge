<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('legal_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug', 64)->unique();
            $table->string('title', 255);
            $table->string('version', 32);
            $table->longText('body');
            $table->boolean('applies_to_signup')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('patient_legal_consents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('legal_document_id');
            $table->timestamp('accepted_at')->useCurrent();
            $table->timestamps();

            $table->foreign('legal_document_id')->references('id')->on('legal_documents')->cascadeOnDelete();
            $table->unique(['user_id', 'legal_document_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patient_legal_consents');
        Schema::dropIfExists('legal_documents');
    }
};

