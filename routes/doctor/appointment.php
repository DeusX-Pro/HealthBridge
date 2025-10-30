<?php

use App\Http\Controllers\Doctor\AppointmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/appointments', [AppointmentController::class, 'index'])->name('doctor.appointments');
}); 