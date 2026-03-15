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
        Schema::create('lab_orders', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->foreignId('patient_id')->constrained()->onDelete('cascade');
            $blueprint->foreignId('medicallab_id')->constrained('medicallabs')->onDelete('cascade');
            $blueprint->foreignId('service_id')->constrained('medical_lab_services')->onDelete('cascade');
            $blueprint->string('status')->default('pending');
            $blueprint->decimal('price', 15, 2);
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_orders');
    }
};
