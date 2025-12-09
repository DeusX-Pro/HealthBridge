<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\PharmacyMiddleware;

Route::middleware(['auth', 'verified', PharmacyMiddleware::class])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    Route::get('/settings', function () {
        return Inertia::render('dashboard/pharmacy/settings/index');
    })->name('settings');
});

