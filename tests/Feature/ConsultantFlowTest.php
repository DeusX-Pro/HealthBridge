<?php

use App\Models\User;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\Prescription;
use App\Models\Medicine;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('patient can see doctors and their schedules', function () {
    $patientUser = User::factory()->create(['role' => 'patient']);
    $patient = Patient::factory()->create(['user_id' => $patientUser->id]);

    $doctorUser = User::factory()->create(['role' => 'doctor']);
    $doctor = Doctor::factory()->create([
        'user_id' => $doctorUser->id,
        'status' => 'approved',
        'available_days' => json_encode(['Monday', 'Wednesday']),
        'available_hours' => json_encode(['09:00', '17:00']),
    ]);

    $this->actingAs($patientUser)
        ->get(route('patient.doctors'))
        ->assertStatus(200)
        ->assertSee($doctorUser->name)
        ->assertSee('Monday');
});

test('patient can book an appointment', function () {
    $patientUser = User::factory()->create(['role' => 'patient']);
    $patient = Patient::factory()->create(['user_id' => $patientUser->id]);

    $doctorUser = User::factory()->create(['role' => 'doctor']);
    $doctor = Doctor::factory()->create(['user_id' => $doctorUser->id, 'status' => 'approved']);

    $appointmentData = [
        'doctor_id' => $doctor->id,
        'appointment_date' => now()->addDay()->format('Y-m-d'),
        'appointment_time' => '10:00:00',
        'type' => 'telehealth',
        'reason' => 'Checkup',
    ];

    $this->actingAs($patientUser)
        ->post(route('patient.appointments.store'), $appointmentData)
        ->assertRedirect();

    $this->assertDatabaseHas('appointments', [
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'reason' => 'Checkup',
        'status' => 'pending',
    ]);
});

test('doctor can confirm an appointment', function () {
    $doctorUser = User::factory()->create(['role' => 'doctor']);
    $doctor = Doctor::factory()->create(['user_id' => $doctorUser->id]);

    $patientUser = User::factory()->create(['role' => 'patient']);
    $patient = Patient::factory()->create(['user_id' => $patientUser->id]);

    $appointment = Appointment::factory()->create([
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
        'status' => 'pending',
    ]);

    $this->actingAs($doctorUser)
        ->put(route('doctor.appointments.update', $appointment), [
            'status' => 'confirmed'
        ])
        ->assertRedirect();

    $this->assertEquals('confirmed', $appointment->fresh()->status);
});

test('doctor can write a prescription', function () {
    $doctorUser = User::factory()->create(['role' => 'doctor']);
    $doctor = Doctor::factory()->create(['user_id' => $doctorUser->id]);

    $patientUser = User::factory()->create(['role' => 'patient']);
    $patient = Patient::factory()->create(['user_id' => $patientUser->id]);

    $medicine = Medicine::factory()->create();

    $prescriptionData = [
        'patient_id' => $patient->id,
        'notes' => 'Take with water',
        'items' => [
            [
                'medicine_id' => $medicine->id,
                'dosage' => '500mg',
                'frequency' => 'Twice daily',
                'duration' => '5 days',
                'instructions' => 'After meals',
            ]
        ]
    ];

    $this->actingAs($doctorUser)
        ->post(route('doctor.prescription.store'), $prescriptionData)
        ->assertRedirect();

    $this->assertDatabaseHas('prescriptions', [
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
    ]);

    $this->assertDatabaseHas('prescription_items', [
        'medicine_id' => $medicine->id,
        'dosage' => '500mg',
    ]);
});

test('patient can see their prescriptions', function () {
    $patientUser = User::factory()->create(['role' => 'patient']);
    $patient = Patient::factory()->create(['user_id' => $patientUser->id]);

    $doctorUser = User::factory()->create(['role' => 'doctor']);
    $doctor = Doctor::factory()->create(['user_id' => $doctorUser->id]);

    $prescription = Prescription::factory()->create([
        'patient_id' => $patient->id,
        'doctor_id' => $doctor->id,
    ]);

    $this->actingAs($patientUser)
        ->get(route('patient.prescriptions'))
        ->assertStatus(200)
        ->assertSee($doctorUser->name);
});
