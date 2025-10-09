<?php

use App\Http\Controllers\Patient\AppointmentController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', PatientMiddleware::class])->group(function () {
    Route::get('patient/appointments', [AppointmentController::class, 'index'])->name('patient.appointments');
});