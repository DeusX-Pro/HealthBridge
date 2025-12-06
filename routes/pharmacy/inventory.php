<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    Route::get('/inventory', function () {
        return Inertia::render('dashboard/pharmacy/inventory/medicines/index');
    })->name('inventory');
    
    Route::get('/inventory/categories', function () {
        return Inertia::render('dashboard/pharmacy/inventory/categories/index');
    })->name('inventory.categories');
    
    Route::get('/inventory/subcategories', function () {
        return Inertia::render('dashboard/pharmacy/inventory/subcategories/index');
    })->name('inventory.subcategories');
    
    Route::get('/inventory/brands', function () {
        return Inertia::render('dashboard/pharmacy/inventory/brands/index');
    })->name('inventory.brands');
    
    Route::get('/inventory/medicines', function () {
        return Inertia::render('dashboard/pharmacy/inventory/medicines/index');
    })->name('inventory.medicines');
});

