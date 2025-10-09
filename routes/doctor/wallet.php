<?php

use App\Http\Controllers\Doctor\WalletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/wallet', [WalletController::class, 'index'])->name('doctor.wallet');
}); 