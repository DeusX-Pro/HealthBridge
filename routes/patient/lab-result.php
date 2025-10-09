<?php

use App\Http\Controllers\Patient\LabResultController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', PatientMiddleware::class])->group(function () {
    Route::get('patient/lab-results', [LabResultController::class, 'index'])->name('patient.lab-results');
});