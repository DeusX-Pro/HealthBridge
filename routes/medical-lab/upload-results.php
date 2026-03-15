<?php

use App\Http\Controllers\MedicalLab\ResultController;
use App\Http\Middleware\MedicalLabMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', MedicalLabMiddleware::class])->prefix('medical-lab')->name('medical-lab.')->group(function () {
    Route::get('/upload-results', [ResultController::class, 'index'])->name('upload-results');
    Route::post('/upload-results/{order}', [ResultController::class, 'store'])->name('upload-results.store');
});
