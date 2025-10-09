<?php

use App\Http\Controllers\Doctor\MessagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\DoctorMiddleware;

Route::middleware(['auth', DoctorMiddleware::class])->group(function () {
    Route::get('doctor/messages', [MessagesController::class, 'index'])->name('doctor.messages');
}); 