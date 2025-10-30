<?php

use App\Http\Controllers\Doctor\ConsultationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/consultations', [ConsultationController::class, 'index'])->name('doctor.consultations');
}); 