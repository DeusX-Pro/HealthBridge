<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

echo "Patient Dashboard: " . route('patient.dashboard') . "\n";
echo "Doctor Dashboard: " . route('doctor.dashboard') . "\n";
echo "Admin Dashboard: " . route('admin.dashboard') . "\n";
