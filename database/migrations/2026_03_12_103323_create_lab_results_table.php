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
        Schema::create('lab_results', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->foreignId('lab_order_id')->constrained('lab_orders')->onDelete('cascade');
            $blueprint->json('result_data')->nullable();
            $blueprint->string('file_path')->nullable();
            $blueprint->timestamp('performed_at')->useCurrent();
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_results');
    }
};
