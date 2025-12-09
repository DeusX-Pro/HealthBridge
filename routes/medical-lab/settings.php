<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\MedicalLabMiddleware;

Route::middleware(['auth', 'verified', MedicalLabMiddleware::class])->prefix('medical-lab')->name('medical-lab.')->group(function () {
    Route::get('/settings', function () {
        return Inertia::render('dashboard/medical-lab/settings/index');
    })->name('settings');
});

