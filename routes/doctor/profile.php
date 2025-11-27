<?php

use App\Http\Controllers\Doctor\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    // Profile Route
    Route::get('doctor/profile', [ProfileController::class, 'index'])->name('doctor.profile');

}); 