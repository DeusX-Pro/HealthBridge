<?php

use App\Http\Controllers\Pharmacy\ProfileController;
use App\Http\Middleware\PharmacyMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', PharmacyMiddleware::class])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
});

