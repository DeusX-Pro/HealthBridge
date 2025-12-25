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
        Schema::create('medical_lab_services', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            
            // Foreign key to medical lab
            $table->foreignId('medicallab_id')->constrained('medicallabs')->onDelete('cascade');
            
            // Service details
            $table->string('name');
            $table->string('category');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('duration')->nullable(); // e.g., "24 hours", "2 hours"
            
            // Status
            $table->enum('status', ['active', 'inactive'])->default('active');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_lab_services');
    }
};
