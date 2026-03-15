<?php

use App\Http\Controllers\MedicalLab\OrderController;
use App\Http\Middleware\MedicalLabMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', MedicalLabMiddleware::class])->prefix('medical-lab')->name('medical-lab.')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.status');
});
