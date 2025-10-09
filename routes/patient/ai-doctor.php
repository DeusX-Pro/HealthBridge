<?php

use App\Http\Controllers\Patient\AiDoctorController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', PatientMiddleware::class])->group(function () {
    Route::get('patient/ai-doctor', [AiDoctorController::class, 'index'])->name('patient.ai-doctor');
});