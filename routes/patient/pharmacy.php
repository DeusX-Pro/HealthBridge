<?php

use App\Http\Controllers\Patient\PharmaciesController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

use App\Http\Controllers\Patient\PharmacyOrderController;

Route::middleware(['auth', 'verified', PatientMiddleware::class])->group(function () {
    Route::get('patient/pharmacies', [PharmaciesController::class, 'index'])->name('patient.pharmacies');
    Route::get('patient/pharmacies/{pharmacy:uuid}', [PharmaciesController::class, 'show'])->name('patient.pharmacies.show');
    
    // Orders
    Route::get('patient/pharmacy/orders', [PharmacyOrderController::class, 'index'])->name('patient.pharmacy.orders');
    Route::post('patient/pharmacy/orders', [PharmacyOrderController::class, 'store'])->name('patient.pharmacy.orders.store');
});