<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;

Route::get('/', function () {
    $user = Auth::user();
    return Inertia::render('welcome', compact('user'));
})->name('home');

Route::middleware(['auth', 'verified', RoleMiddleware::class])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Admin Route Starts 
require __DIR__ . '/admin/dashboard.php';
// Admin Route Ends

// Doctor Route Starts
require __DIR__ . '/doctor/dashboard.php';
require __DIR__ . '/doctor/appointment.php';
require __DIR__ . '/doctor/availability.php';
require __DIR__ . '/doctor/consultation.php';
require __DIR__ . '/doctor/lab-result.php';
require __DIR__ . '/doctor/medical-record.php';
require __DIR__ . '/doctor/messages.php';
require __DIR__ . '/doctor/patients.php';
require __DIR__ . '/doctor/prescription.php';
require __DIR__ . '/doctor/profile.php';
require __DIR__ . '/doctor/schedule.php';
require __DIR__ . '/doctor/settings.php';
require __DIR__ . '/doctor/telemedicine.php';
require __DIR__ . '/doctor/wallet.php';
// Doctor Route Ends

// Patient Route Starts
require __DIR__ . '/patient/dashboard.php';
require __DIR__ . '/patient/ai-doctor.php';
require __DIR__ . '/patient/appointment.php';
require __DIR__ . '/patient/doctor.php';
require __DIR__ . '/patient/emergency.php';
require __DIR__ . '/patient/health-record.php';
require __DIR__ . '/patient/health-tip.php';
require __DIR__ . '/patient/lab-result.php';
require __DIR__ . '/patient/messages.php';
require __DIR__ . '/patient/pharmacy.php';
require __DIR__ . '/patient/prescription.php';
require __DIR__ . '/patient/profile.php';
require __DIR__ . '/patient/settings.php';
require __DIR__ . '/patient/telemedicine.php';
require __DIR__ . '/patient/vitals-tracking.php';
require __DIR__ . '/patient/wallet.php';
// Patient Route Ends

// Pharmacy Route Starts
require __DIR__ . '/pharmacy/dashboard.php';
require __DIR__ . '/pharmacy/inventory.php';
require __DIR__ . '/pharmacy/orders.php';
require __DIR__ . '/pharmacy/prescription-requests.php';
// Pharmacy Route Ends

// Medical Lab Route Starts
require __DIR__ . '/medical-lab/dashboard.php';
require __DIR__ . '/medical-lab/services.php';
require __DIR__ . '/medical-lab/orders.php';
require __DIR__ . '/medical-lab/upload-results.php';
// Medical Lab Route Ends