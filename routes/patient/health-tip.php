<?php

use App\Http\Controllers\Patient\HealthTipController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', PatientMiddleware::class])->group(function () {
    Route::get('patient/health-tips', [HealthTipController::class, 'index'])->name('patient.health-tips');
});