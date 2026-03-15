<?php

use App\Http\Controllers\Patient\MedicalLabController;
use App\Http\Middleware\PatientMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', PatientMiddleware::class])->group(function () {
    Route::get('patient/medical-labs', [MedicalLabController::class, 'index'])->name('patient.medical-labs.index');
    Route::get('patient/medical-labs/{lab:uuid}', [MedicalLabController::class, 'show'])->name('patient.medical-labs.show');
    Route::post('patient/medical-labs/order', [MedicalLabController::class, 'storeOrder'])->name('patient.medical-labs.order');
});
