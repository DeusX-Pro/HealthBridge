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
    Route::get('patient/pharmacy/checkout', function () {
        return Inertia::render('dashboard/patient/pharmacies/checkout');
    })->name('patient.pharmacy.checkout');
    
    Route::get('patient/pharmacy/orders', [PharmacyOrderController::class, 'index'])->name('patient.pharmacy.orders');
    Route::get('patient/pharmacy/orders/{order:uuid}', [PharmacyOrderController::class, 'show'])->name('patient.pharmacy.orders.show');
    Route::post('patient/pharmacy/orders', [PharmacyOrderController::class, 'store'])->name('patient.pharmacy.orders.store');
});