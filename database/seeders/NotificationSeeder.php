<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $patient = User::whereHas('patient')->first();
        
        if (!$patient) {
            return;
        }

        $notifications = [
            [
                'id' => Str::uuid(),
                'type' => 'App\Notifications\AppointmentConfirmed',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => $patient->id,
                'data' => json_encode([
                    'title' => 'Appointment Confirmed',
                    'message' => 'Your appointment with Dr. Sarah Smith has been confirmed for tomorrow at 10:00 AM.',
                    'action_url' => '/patient/appointments',
                    'icon' => 'success'
                ]),
                'read_at' => null,
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ],
            [
                'id' => Str::uuid(),
                'type' => 'App\Notifications\NewPrescription',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => $patient->id,
                'data' => json_encode([
                    'title' => 'New Prescription Available',
                    'message' => 'Dr. sarah Smith has uploaded a new prescription for your recent consultation.',
                    'action_url' => '/patient/prescriptions',
                    'icon' => 'info'
                ]),
                'read_at' => null,
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
            [
                'id' => Str::uuid(),
                'type' => 'App\Notifications\LabResultReady',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => $patient->id,
                'data' => json_encode([
                    'title' => 'Lab Results Ready',
                    'message' => 'Your Blood Culture test results are now available for viewing.',
                    'action_url' => '/patient/lab-results',
                    'icon' => 'success'
                ]),
                'read_at' => now()->subMinutes(30),
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'id' => Str::uuid(),
                'type' => 'App\Notifications\WalletFunded',
                'notifiable_type' => 'App\Models\User',
                'notifiable_id' => $patient->id,
                'data' => json_encode([
                    'title' => 'Wallet Funded Successfully',
                    'message' => 'Your HealthBridge wallet has been credited with ₦ 50,000.00.',
                    'action_url' => '/patient/wallet',
                    'icon' => 'success'
                ]),
                'read_at' => now()->subHours(5),
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
        ];

        foreach ($notifications as $notification) {
            DB::table('notifications')->insert($notification);
        }
    }
}
