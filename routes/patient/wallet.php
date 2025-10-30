<?php

use App\Http\Controllers\Patient\WalletController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', 'verified', PatientMiddleware::class])->group(function () {
    Route::get('patient/wallet', [WalletController::class, 'index'])->name('patient.wallet');
});