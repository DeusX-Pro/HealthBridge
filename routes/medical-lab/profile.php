<?php

use App\Http\Controllers\MedicalLab\ProfileController;
use App\Http\Middleware\MedicalLabMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', MedicalLabMiddleware::class])->prefix('medical-lab')->name('medical-lab.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
});

