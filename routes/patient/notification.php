<?php

use App\Http\Controllers\Patient\NotificationController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\PatientMiddleware;

Route::middleware(['auth', 'verified', PatientMiddleware::class])->group(function () {
    Route::get('patient/notifications', [NotificationController::class, 'index'])->name('patient.notifications.index');
    Route::post('patient/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('patient.notifications.read');
    Route::delete('patient/notifications/{id}', [NotificationController::class, 'destroy'])->name('patient.notifications.destroy');
});
