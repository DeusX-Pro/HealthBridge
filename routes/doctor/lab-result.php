<?php

use App\Http\Controllers\Doctor\LabResultController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/lab-result', [LabResultController::class, 'index'])->name('doctor.lab-result');
}); 