<?php

namespace App\Http\Controllers\Doctor;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Doctor;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class ProfileController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('doctor');
        return inertia(
            'dashboard/doctor/profile/index',
            [
                'user' => $user,
            ]
        );
    }

    public function store(Request $request): RedirectResponse
    {
        // Validate the request
        $validated = $request->validate([
            // User fields (required)
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone_number' => 'required|string|max:20|unique:users,phone_number',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            // User fields (optional)
            'date_of_birth' => 'nullable|date|before:today',
            'gender' => 'nullable|in:male,female,other',
            'country' => 'nullable|string|max:255',
            'marital_status' => 'nullable|in:single,married,divorced,widowed,separated',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

            // Doctor fields (required)
            'specialization' => 'required|string',
            'years_of_experience' => 'required|integer|min:0|max:100',
            'medical_council' => 'required|string|max:255',
            'license_number' => 'required|string|max:255|unique:doctors,license_number',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'consultation_fee' => 'required|numeric|min:0|max:9999999.99',

            // Doctor fields (optional)
            'title' => 'nullable|string|max:50',
            'license_expiry_date' => 'nullable|date|after:today',
            'hospital_affiliation' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:5000',
            'consultation_type' => 'nullable|in:video,audio,chat,all',
            'consultation_duration' => 'nullable|integer|in:15,30,45,60',
            'available_days' => 'nullable|string',
            'available_hours' => 'nullable|string|max:255',

            // Document uploads (optional)
            'medical_license' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'degree_certificate' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'id_card' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'affiliation_letter' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
        ], [
            // Custom error messages
            'name.required' => 'Full name is required.',
            'email.unique' => 'This email is already registered.',
            'phone_number.unique' => 'This phone number is already registered.',
            'license_number.unique' => 'This license number is already registered.',
            'specialization.required' => 'Please select at least one specialization.',
            'years_of_experience.required' => 'Years of experience is required.',
            'medical_council.required' => 'Medical council is required.',
            'consultation_fee.required' => 'Consultation fee is required.',
            'state.required' => 'State is required.',
            'city.required' => 'City is required.',
            'profile_picture.max' => 'Profile picture must not exceed 2MB.',
            'medical_license.max' => 'Medical license file must not exceed 5MB.',
            'degree_certificate.max' => 'Degree certificate must not exceed 5MB.',
            'id_card.max' => 'ID card must not exceed 5MB.',
            'affiliation_letter.max' => 'Affiliation letter must not exceed 5MB.',
        ]);

        try {
            DB::beginTransaction();

            // Handle profile picture upload
            $profilePicturePath = null;
            if ($request->hasFile('profile_picture')) {
                $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            }

            // Create the user
            $user = User::create([
                'uuid' => Str::uuid(),
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone_number' => $validated['phone_number'],
                'password' => Hash::make($validated['password']),
                'role' => 'doctor',
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'gender' => $validated['gender'] ?? null,
                'country' => $validated['country'] ?? null,
                'maritial_status' => $validated['marital_status'] ?? null,
                'profile_picture' => $profilePicturePath,
                'status' => 'pending', // Doctor accounts start as pending
                'bio' => null, // User bio is separate from doctor bio
            ]);

            // Handle document uploads
            $documents = [];
            $documentFields = ['medical_license', 'degree_certificate', 'id_card', 'affiliation_letter'];

            foreach ($documentFields as $field) {
                if ($request->hasFile($field)) {
                    $documents[$field] = $request->file($field)->store('doctor_documents', 'public');
                }
            }

            // Create the doctor profile
            $doctor = Doctor::create([
                'user_id' => $user->id,
                'uuid' => Str::uuid(),

                // Professional Info
                'title' => $validated['title'] ?? null,
                'specialization' => $validated['specialization'],
                'medical_council' => $validated['medical_council'],
                'license_number' => $validated['license_number'],
                'license_expiry_date' => $validated['license_expiry_date'] ?? null,
                'years_of_experience' => $validated['years_of_experience'],
                'hospital_affiliation' => $validated['hospital_affiliation'] ?? null,
                'bio' => $validated['bio'] ?? null,

                // Documents
                'medical_license' => $documents['medical_license'] ?? null,
                'degree_certificate' => $documents['degree_certificate'] ?? null,
                'id_card' => $documents['id_card'] ?? null,
                'affiliation_letter' => $documents['affiliation_letter'] ?? null,

                // Consultation
                'consultation_fee' => $validated['consultation_fee'],
                'consultation_type' => $validated['consultation_type'] ?? null,
                'consultation_duration' => $validated['consultation_duration'] ?? null,
                'available_days' => $validated['available_days'] ?? null,
                'available_hours' => $validated['available_hours'] ?? null,

                // Location
                'city' => $validated['city'],
                'state' => $validated['state'],

                // Status (default is pending)
                'status' => 'pending',
            ]);

            DB::commit();

            // Fire the registered event
            event(new Registered($user));

            // Log the user in (optional - you might want to keep them logged out until approved)
            // Auth::login($user);

            // Redirect with success message
            return redirect()->route('login')->with(
                'success',
                'Your doctor registration has been submitted successfully! ' .
                    'Our team will review your application and notify you via email within 2-3 business days.'
            );
        } catch (\Exception $e) {
            DB::rollBack();

            // Log the error
            Log::error('Doctor registration failed: ' . $e->getMessage(), [
                'email' => $request->email,
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors([
                'error' => 'Registration failed. Please try again or contact support if the problem persists.'
            ])->withInput($request->except('password', 'password_confirmation'));
        }
    }
}
