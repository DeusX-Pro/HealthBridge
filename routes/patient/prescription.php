<?php

use App\Http\Controllers\Patient\PrescriptionController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', PatientMiddleware::class])->group(function () {
    Route::get('patient/prescriptions', [PrescriptionController::class, 'index'])->name('patient.prescriptions');
});