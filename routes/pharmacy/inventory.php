<?php

use App\Http\Controllers\Pharmacy\CategoryController;
use App\Http\Controllers\Pharmacy\SubcategoryController;
use App\Http\Controllers\Pharmacy\BrandController;
use App\Http\Controllers\Pharmacy\MedicineController;
use App\Http\Middleware\PharmacyMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', PharmacyMiddleware::class])->prefix('pharmacy')->name('pharmacy.')->group(function () {
    // Categories
    Route::get('/inventory/categories', [CategoryController::class, 'index'])->name('inventory.categories');
    Route::get('/inventory/categories/create', [CategoryController::class, 'create'])->name('inventory.categories.create');
    Route::post('/inventory/categories', [CategoryController::class, 'store'])->name('inventory.categories.store');
    Route::get('/inventory/categories/{category}/edit', [CategoryController::class, 'show'])->name('inventory.categories.edit');
    Route::put('/inventory/categories/{category}', [CategoryController::class, 'update'])->name('inventory.categories.update');
    Route::delete('/inventory/categories/{category}', [CategoryController::class, 'destroy'])->name('inventory.categories.destroy');
    
    // Subcategories
    Route::get('/inventory/subcategories', [SubcategoryController::class, 'index'])->name('inventory.subcategories');
    Route::get('/inventory/subcategories/create', [SubcategoryController::class, 'create'])->name('inventory.subcategories.create');
    Route::post('/inventory/subcategories', [SubcategoryController::class, 'store'])->name('inventory.subcategories.store');
    Route::get('/inventory/subcategories/{subcategory}/edit', [SubcategoryController::class, 'show'])->name('inventory.subcategories.edit');
    Route::put('/inventory/subcategories/{subcategory}', [SubcategoryController::class, 'update'])->name('inventory.subcategories.update');
    Route::delete('/inventory/subcategories/{subcategory}', [SubcategoryController::class, 'destroy'])->name('inventory.subcategories.destroy');
    
    // Brands
    Route::get('/inventory/brands', [BrandController::class, 'index'])->name('inventory.brands');
    Route::get('/inventory/brands/create', [BrandController::class, 'create'])->name('inventory.brands.create');
    Route::post('/inventory/brands', [BrandController::class, 'store'])->name('inventory.brands.store');
    Route::get('/inventory/brands/{brand}/edit', [BrandController::class, 'show'])->name('inventory.brands.edit');
    Route::put('/inventory/brands/{brand}', [BrandController::class, 'update'])->name('inventory.brands.update');
    Route::delete('/inventory/brands/{brand}', [BrandController::class, 'destroy'])->name('inventory.brands.destroy');
    
    // Medicines
    Route::get('/inventory', [MedicineController::class, 'index'])->name('inventory');
    Route::get('/inventory/medicines', [MedicineController::class, 'index'])->name('inventory.medicines');
    Route::get('/inventory/medicines/create', [MedicineController::class, 'create'])->name('inventory.medicines.create');
    Route::post('/inventory/medicines', [MedicineController::class, 'store'])->name('inventory.medicines.store');
    Route::get('/inventory/medicines/{medicine}/edit', [MedicineController::class, 'show'])->name('inventory.medicines.edit');
    Route::put('/inventory/medicines/{medicine}', [MedicineController::class, 'update'])->name('inventory.medicines.update');
    Route::delete('/inventory/medicines/{medicine}', [MedicineController::class, 'destroy'])->name('inventory.medicines.destroy');
});

