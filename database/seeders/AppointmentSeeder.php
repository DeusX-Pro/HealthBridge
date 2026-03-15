<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Support\Str;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = Patient::all();
        $doctors = Doctor::all();

        if ($patients->isEmpty() || $doctors->isEmpty()) {
            return;
        }

        foreach ($patients as $patient) {
            // Tomorrow's appointment (for the "Next Appointment" card)
            Appointment::create([
                'uuid' => Str::uuid(),
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'appointment_date' => now()->addDay()->format('Y-m-d'),
                'appointment_time' => '14:00:00',
                'end_time' => '14:30:00',
                'type' => 'telehealth',
                'status' => 'confirmed',
                'reason' => 'Monthly checkup',
            ]);

            // Some past appointments
            for ($i = 0; $i < 3; $i++) {
                Appointment::create([
                    'uuid' => Str::uuid(),
                    'patient_id' => $patient->id,
                    'doctor_id' => $doctors->random()->id,
                    'appointment_date' => now()->subDays(rand(1, 30))->format('Y-m-d'),
                    'appointment_time' => '10:00:00',
                    'end_time' => '10:30:00',
                    'type' => rand(0, 1) ? 'telehealth' : 'in-person',
                    'status' => 'completed',
                    'reason' => 'Follow up',
                ]);
            }
        }
    }
}
