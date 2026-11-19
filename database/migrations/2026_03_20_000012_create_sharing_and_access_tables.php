<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('add_links', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('token', 64)->unique();
            $table->string('passcode_hash', 255);
            $table->string('recipient_name', 255);
            $table->string('purpose', 255)->nullable();
            $table->enum('status', ['ACTIVE', 'REVOKED', 'EXPIRED', 'USED'])->default('ACTIVE');
            $table->integer('max_submissions')->default(1);
            $table->integer('submission_count')->default(0);
            $table->timestamp('expires_at');
            $table->timestamps();
        });

        Schema::create('view_links', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('token', 64)->unique();
            $table->string('passcode_hash', 255);
            $table->string('recipient_name', 255);
            $table->json('sections'); // Array of sections, e.g. ["TIMELINE", "MEDICATIONS", "MEASUREMENTS"]
            $table->enum('status', ['ACTIVE', 'REVOKED', 'EXPIRED'])->default('ACTIVE');
            $table->timestamp('expires_at');
            $table->timestamps();
        });

        Schema::create('sharing_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('add_link_id');
            $table->string('clinic_name', 255);
            $table->string('clinician_name', 255);
            $table->date('visit_date');
            $table->string('visit_type', 64);
            $table->text('summary')->nullable();
            $table->json('medications_data')->nullable();
            $table->enum('status', ['PENDING', 'ACCEPTED', 'REJECTED'])->default('PENDING');
            $table->timestamps();

            $table->foreign('add_link_id')->references('id')->on('add_links')->cascadeOnDelete();
            $table->index(['user_id', 'status']);
        });

        Schema::create('submission_files', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('submission_id');
            $table->string('file_name', 255);
            $table->text('storage_path');
            $table->string('content_type', 64);
            $table->bigInteger('size_bytes');
            $table->timestamps();

            $table->foreign('submission_id')->references('id')->on('sharing_submissions')->cascadeOnDelete();
        });

        Schema::create('consent_grants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('grantee_type', 64);
            $table->string('grantee_id', 128);
            $table->string('grantee_name', 255);
            $table->string('scope', 64);
            $table->string('status', 32)->default('ACTIVE');
            $table->boolean('include_sexual_activity')->default(false);
            $table->timestamp('valid_until');
            $table->timestamp('revoked_at')->nullable();
            $table->timestamps();
        });

        Schema::create('access_history_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('actor_type', 32); // PATIENT, CLINICIAN, VIEW_LINK, ADD_LINK
            $table->string('actor_name', 255);
            $table->string('action', 64); // VIEWED_TIMELINE, VIEWED_RECORD, DOWNLOADED_DOCUMENT, CREATED_LINK, REVOKED_LINK
            $table->string('resource_type', 64)->nullable();
            $table->string('resource_id', 128)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('access_history_logs');
        Schema::dropIfExists('consent_grants');
        Schema::dropIfExists('submission_files');
        Schema::dropIfExists('sharing_submissions');
        Schema::dropIfExists('view_links');
        Schema::dropIfExists('add_links');
    }
};

