<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('medical-lab')->name('medical-lab.')->group(function () {
    Route::get('/services', function () {
        return Inertia::render('dashboard/medical-lab/services/index');
    })->name('services');
});

