<?php

use App\Http\Controllers\Doctor\IndexController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/dashboard', [IndexController::class, 'index'])->name('doctor.dashboard');
}); 