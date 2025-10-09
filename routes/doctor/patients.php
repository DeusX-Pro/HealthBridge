<?php

use App\Http\Controllers\Doctor\PatientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/patients', [PatientController::class, 'index'])->name('doctor.patients');
}); 