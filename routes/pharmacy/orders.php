<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    Route::get('/orders', function () {
        return Inertia::render('dashboard/pharmacy/orders/index');
    })->name('orders');
});

