<?php

use App\Http\Controllers\Doctor\ScheduleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/schedule', [ScheduleController::class, 'index'])->name('doctor.schedule');
}); 