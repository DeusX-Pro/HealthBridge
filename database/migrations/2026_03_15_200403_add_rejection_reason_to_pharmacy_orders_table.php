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
        Schema::table('pharmacy_orders', function (Blueprint $table) {
            $table->text('rejection_reason')->nullable()->after('status');
            $table->text('pharmacy_note')->nullable()->after('rejection_reason');
            // Adding rejected to status enum if possible or just using cancelled
            // Since it's an enum in the previous migration, I might need to drop and re-add or just use cancelled.
            // Let's stick with 'cancelled' but we can add 'rejected' to the logic or just filter by reason.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pharmacy_orders', function (Blueprint $table) {
            $table->dropColumn(['rejection_reason', 'pharmacy_note']);
        });
    }
};
