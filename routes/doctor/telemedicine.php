<?php

use App\Http\Controllers\Doctor\TeleMedicineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/telemedicine', [TeleMedicineController::class, 'index'])->name('doctor.telemedicine');
}); 