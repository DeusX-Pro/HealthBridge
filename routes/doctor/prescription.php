<?php

use App\Http\Controllers\Doctor\PrescriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/prescription', [PrescriptionController::class, 'index'])->name('doctor.prescription');
    Route::post('doctor/prescription', [PrescriptionController::class, 'store'])->name('doctor.prescription.store');
});