<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    Route::get('/prescription-requests', function () {
        return Inertia::render('dashboard/pharmacy/prescription-requests/index');
    })->name('prescription-requests');
});

