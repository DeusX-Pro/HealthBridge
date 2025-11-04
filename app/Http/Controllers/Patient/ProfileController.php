<?php

namespace App\Http\Controllers\Patient;

use Exception;
use App\Models\User;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\FacadesLog;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient');

        return inertia(
            'dashboard/patient/profile/index',
            [
                'user' => $user,
            ]
        );
    }

    public function edit(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient');

        return inertia('dashboard/patient/profile/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        try {
            $validated = $request->validate([
                // User fields
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . Auth::id(),
                'phone_number' => 'required|string|max:20|unique:users,phone_number,' . Auth::id(),
                'date_of_birth' => 'nullable|date|before:today',
                'country' => 'nullable|string|max:100',
                'gender' => 'nullable|in:male,female,other',
                'bio' => 'nullable|string|max:500',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

                // Patient personal information
                'national_id' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:500',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'postal_code' => 'nullable|string|max:20',
                'occupation' => 'nullable|string|max:255',

                // Health metrics
                'blood_type' => 'nullable|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
                'height' => 'nullable|numeric|min:0|max:300',
                'weight' => 'nullable|numeric|min:0|max:500',
                'lifestyle_habits' => 'nullable|string|max:500',
                'has_disability' => 'nullable|boolean',
                'disability_details' => 'nullable|string|max:1000',

                // Medical information arrays - accept arrays with [] notation
                'allergies' => 'nullable|array',
                'allergies.*' => 'nullable|string|max:255',
                'chronic_conditions' => 'nullable|array',
                'chronic_conditions.*' => 'nullable|string|max:255',
                'current_medications' => 'nullable|array',
                'current_medications.*' => 'nullable|string|max:255',
                'surgical_history' => 'nullable|array',
                'surgical_history.*' => 'nullable|string|max:500',
                'family_medical_history' => 'nullable|array',
                'family_medical_history.*' => 'nullable|string|max:500',
                'immunization_record' => 'nullable|array',
                'immunization_record.*' => 'nullable|string|max:255',

                // Emergency contact
                'emergency_contact_name' => 'nullable|string|max:255',
                'emergency_contact_relationship' => 'nullable|string|max:100',
                'emergency_contact_phone' => 'nullable|string|max:20',
                'emergency_contact_email' => 'nullable|email|max:255',
                'preferred_hospital' => 'nullable|string|max:255',

                // Preferences
                'preferred_language' => 'nullable|string|max:100',
                'preferred_consultation_type' => 'nullable|in:video,audio,text',
                'preferred_doctor_gender' => 'nullable|in:male,female,any',
            ]);

            Log::info('Validation passed', ['validated_keys' => array_keys($validated)]);

            /** @var \App\Models\User $user */
            $user = Auth::user();

            // Start database transaction
            DB::beginTransaction();

            try {
                // Handle profile picture upload
                if ($request->hasFile('profile_picture')) {
                    Log::info('Processing profile picture upload');

                    // Delete old profile picture if exists
                    if ($user->profile_picture && Storage::disk('public')->exists($user->profile_picture)) {
                        Storage::disk('public')->delete($user->profile_picture);
                        Log::info('Deleted old profile picture', ['path' => $user->profile_picture]);
                    }

                    // Store new profile picture
                    $path = $request->file('profile_picture')->store('profile_pictures', 'public');
                    $validated['profile_picture'] = $path;
                    Log::info('Stored new profile picture', ['path' => $path]);
                }

                // Update user information
                $userData = [
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone_number' => $validated['phone_number'],
                    'date_of_birth' => $validated['date_of_birth'] ?? null,
                    'country' => $validated['country'] ?? null,
                    'gender' => $validated['gender'] ?? null,
                    'bio' => $validated['bio'] ?? null,
                ];

                // Only update profile_picture if a new one was uploaded
                if (isset($validated['profile_picture'])) {
                    $userData['profile_picture'] = $validated['profile_picture'];
                }

                $user->update($userData);
                Log::info('User information updated', ['user_id' => $user->id]);

                // Update patient information if user has patient record
                if ($user->patient) {
                    Log::info('Updating patient information', ['patient_id' => $user->patient->id]);

                    // Helper function to process array fields
                    $processArrayField = function ($field) use ($validated) {
                        if (!isset($validated[$field]) || !is_array($validated[$field])) {
                            return null;
                        }

                        // Filter out empty values and trim
                        $filtered = array_filter(
                            array_map('trim', $validated[$field]),
                            function ($value) {
                                return $value !== '' && $value !== null;
                            }
                        );

                        // Return JSON encoded array with re-indexed values, or null if empty
                        return !empty($filtered) ? json_encode(array_values($filtered)) : null;
                    };

                    // Calculate BMI if height and weight are provided
                    $bmi = null;
                    if (
                        isset($validated['height']) && isset($validated['weight']) &&
                        $validated['height'] > 0 && $validated['weight'] > 0
                    ) {
                        // BMI = weight (kg) / (height (m))^2
                        $heightInMeters = $validated['height'] / 100; // Convert cm to meters
                        $bmi = round($validated['weight'] / ($heightInMeters * $heightInMeters), 1);
                        Log::info('BMI calculated', ['bmi' => $bmi]);
                    }

                    // Prepare patient update data
                    $patientData = [
                        // Personal information
                        'national_id' => $validated['national_id'] ?? null,
                        'address' => $validated['address'] ?? null,
                        'city' => $validated['city'] ?? null,
                        'state' => $validated['state'] ?? null,
                        'postal_code' => $validated['postal_code'] ?? null,
                        'occupation' => $validated['occupation'] ?? null,

                        // Health metrics
                        'blood_type' => $validated['blood_type'] ?? null,
                        'height' => $validated['height'] ?? null,
                        'weight' => $validated['weight'] ?? null,
                        'bmi' => $bmi,
                        'lifestyle_habits' => $validated['lifestyle_habits'] ?? null,
                        'has_disability' => $validated['has_disability'] ?? false,
                        'disability_details' => ($validated['has_disability'] ?? false) ? ($validated['disability_details'] ?? null) : null,

                        // Medical information (stored as JSON)
                        'allergies' => $processArrayField('allergies'),
                        'chronic_conditions' => $processArrayField('chronic_conditions'),
                        'current_medications' => $processArrayField('current_medications'),
                        'surgical_history' => $processArrayField('surgical_history'),
                        'family_medical_history' => $processArrayField('family_medical_history'),
                        'immunization_record' => $processArrayField('immunization_record'),

                        // Emergency contact
                        'emergency_contact_name' => $validated['emergency_contact_name'] ?? null,
                        'emergency_contact_relationship' => $validated['emergency_contact_relationship'] ?? null,
                        'emergency_contact_phone' => $validated['emergency_contact_phone'] ?? null,
                        'emergency_contact_email' => $validated['emergency_contact_email'] ?? null,
                        'preferred_hospital' => $validated['preferred_hospital'] ?? null,

                        // Preferences
                        'preferred_language' => $validated['preferred_language'] ?? null,
                        'preferred_consultation_type' => $validated['preferred_consultation_type'] ?? 'video',
                        'preferred_doctor_gender' => $validated['preferred_doctor_gender'] ?? 'any',
                    ];

                    // Update patient record
                    $user->patient->update($patientData);
                    Log::info('Patient information updated successfully', [
                        'patient_id' => $user->patient->id,
                        'has_allergies' => !empty($patientData['allergies'])
                    ]);
                }

                // Commit transaction
                DB::commit();
                Log::info('Transaction committed successfully');

                return redirect()->route('patient.profile.index')
                    ->with('success', 'Profile updated successfully!');
            } catch (\Exception $dbException) {
                // Rollback transaction on database error
                DB::rollBack();
                Log::error('Database error during profile update', [
                    'user_id' => Auth::id(),
                    'error' => $dbException->getMessage(),
                    'trace' => $dbException->getTraceAsString()
                ]);
                throw $dbException;
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log validation errors
            Log::error('Validation failed', [
                'user_id' => Auth::id(),
                'errors' => $e->errors()
            ]);

            return redirect()->back()
                ->withInput()
                ->withErrors($e->errors());
        } catch (\Exception $e) {
            // Rollback transaction on any error
            if (DB::transactionLevel() > 0) {
                DB::rollBack();
            }

            // Log the error
            Log::error('Profile update failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update profile. Please try again. Error: ' . $e->getMessage()]);
        }
    }
}
