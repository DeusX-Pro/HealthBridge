<?php

use App\Http\Controllers\Doctor\MedicalRecordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/medical-records', [MedicalRecordController::class, 'index'])->name('doctor.medical-records');
}); 