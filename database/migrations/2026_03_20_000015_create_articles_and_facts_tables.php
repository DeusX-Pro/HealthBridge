<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug', 64)->unique();
            $table->string('name', 100);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('category_id');
            $table->string('slug', 128)->unique();
            $table->string('title', 255);
            $table->text('summary');
            $table->longText('content');
            $table->integer('reading_time_minutes')->default(5);
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('article_categories')->cascadeOnDelete();
        });

        Schema::create('article_bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->uuid('article_id');
            $table->timestamps();

            $table->foreign('article_id')->references('id')->on('articles')->cascadeOnDelete();
            $table->unique(['user_id', 'article_id']);
        });

        Schema::create('health_facts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('fact');
            $table->string('source', 255);
            $table->string('category', 64);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('health_facts');
        Schema::dropIfExists('article_bookmarks');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('article_categories');
    }
};

