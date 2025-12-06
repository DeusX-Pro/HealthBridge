<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();

            // User
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pharmacy_id')->nullable()->constrained('pharmacies')->onDelete('cascade');

            // Relations
            $table->foreignId('category_id')->constrained('medicine_categories')->onDelete('cascade');
            $table->foreignId('subcategory_id')->nullable()->constrained('medicine_subcategories')->onDelete('cascade');
            $table->foreignId('brand_id')->nullable()->constrained('medicine_brands')->onDelete('cascade');

            // Core
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('generic_name')->nullable();
            $table->string('dosage_form');
            $table->string('strength')->nullable();
            $table->text('description')->nullable();

            // Multiple images
            $table->json('images')->nullable();

            // Restrictions
            $table->boolean('is_restricted')->default(false);
            $table->integer('min_age')->nullable();
            $table->boolean('requires_id_verification')->default(false);

            // Status
            $table->enum('status', ['active', 'inactive', 'discontinued'])->default('active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
