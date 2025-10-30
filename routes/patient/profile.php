<?php

use App\Http\Controllers\Patient\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', 'verified', PatientMiddleware::class])->group(function () {
    Route::get('patient/profile', [ProfileController::class, 'index'])->name('patient.profile.index');
    Route::get('patient/profile/edit', [ProfileController::class, 'edit'])->name('patient.profile.edit');
    Route::post('patient/profile/update', [ProfileController::class, 'update'])->name('patient.profile.update');
});