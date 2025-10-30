<?php

use App\Http\Controllers\Doctor\AvailabilityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/availability', [AvailabilityController::class, 'index'])->name('doctor.availability');
});
