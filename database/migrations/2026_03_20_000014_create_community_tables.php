<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('community_channels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug', 64)->unique();
            $table->string('name', 100);
            $table->string('description', 300);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('community_profiles', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained('users')->cascadeOnDelete();
            $table->string('pseudonym', 64)->unique();
            $table->boolean('is_suspended')->default(false);
            $table->timestamp('suspended_at')->nullable();
            $table->timestamps();
        });

        Schema::create('community_posts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('channel_id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('pseudonym', 64);
            $table->string('title', 255);
            $table->text('body');
            $table->timestamps();

            $table->foreign('channel_id')->references('id')->on('community_channels')->cascadeOnDelete();
            $table->index(['channel_id', 'created_at']);
        });

        Schema::create('community_comments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('post_id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('pseudonym', 64);
            $table->text('body');
            $table->timestamps();

            $table->foreign('post_id')->references('id')->on('community_posts')->cascadeOnDelete();
            $table->index(['post_id', 'created_at']);
        });

        Schema::create('community_reports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('target_type', ['POST', 'COMMENT']);
            $table->uuid('target_id');
            $table->string('reason', 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('community_reports');
        Schema::dropIfExists('community_comments');
        Schema::dropIfExists('community_posts');
        Schema::dropIfExists('community_profiles');
        Schema::dropIfExists('community_channels');
    }
};

