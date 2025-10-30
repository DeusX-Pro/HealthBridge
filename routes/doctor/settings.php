<?php

use App\Http\Controllers\Doctor\SettngsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', 'verified', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/settings', [SettngsController::class, 'index'])->name('doctor.settings');
}); 