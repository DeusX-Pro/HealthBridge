<?php

use App\Http\Controllers\Patient\SettingsController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', 'verified', PatientMiddleware::class])->group(function () {
    Route::get('patient/settings', [SettingsController::class, 'index'])->name('patient.settings');
});