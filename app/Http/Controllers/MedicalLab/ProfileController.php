<?php

namespace App\Http\Controllers\MedicalLab;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Medicallab;
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
    /**
     * Show the medical lab profile page.
     */
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('medicallab');

        return Inertia::render('dashboard/medical-lab/profile/index', [
            'user' => $user,
        ]);
    }

    /**
     * Show the medical lab registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/medical-lab-register');
    }

    /**
     * Handle an incoming medical lab registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
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

            // Medical Lab fields (required)
            'lab_name' => 'required|string|max:255',
            'mlscn_license_number' => 'required|string|max:255|unique:medicallabs,mlscn_license_number',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'nullable|string|max:500',

            // Medical Lab fields (optional)
            'mlscn_license_expiry' => 'nullable|date|after:today',
            'cac_registration_number' => 'nullable|string|max:255',
            'lab_tests_offered' => 'nullable|array',
            'lab_tests_offered.*' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',

            // Document uploads (optional)
            'mlscn_certificate' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'cac_certificate' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'director_id_card' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'facility_photo' => 'nullable|file|mimes:jpeg,png,jpg|max:5120',
        ], [
            // Custom error messages
            'name.required' => 'Full name is required.',
            'email.unique' => 'This email is already registered.',
            'phone_number.unique' => 'This phone number is already registered.',
            'mlscn_license_number.unique' => 'This MLSCN license number is already registered.',
            'lab_name.required' => 'Lab name is required.',
            'mlscn_license_number.required' => 'MLSCN license number is required.',
            'state.required' => 'State is required.',
            'city.required' => 'City is required.',
            'profile_picture.max' => 'Profile picture must not exceed 2MB.',
            'mlscn_certificate.max' => 'MLSCN certificate must not exceed 5MB.',
            'cac_certificate.max' => 'CAC certificate must not exceed 5MB.',
            'director_id_card.max' => 'Director ID card must not exceed 5MB.',
            'facility_photo.max' => 'Facility photo must not exceed 5MB.',
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
                'uuid' => (string) Str::uuid(),
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone_number' => $validated['phone_number'],
                'password' => Hash::make($validated['password']),
                'role' => 'medical_lab',
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'gender' => $validated['gender'] ?? null,
                'country' => $validated['country'] ?? null,
                'maritial_status' => $validated['marital_status'] ?? null,
                'profile_picture' => $profilePicturePath,
                'status' => 'pending', // Medical lab accounts start as pending
            ]);

            // Handle document uploads
            $documents = [];
            $documentFields = [
                'mlscn_certificate',
                'cac_certificate',
                'director_id_card',
                'facility_photo'
            ];

            foreach ($documentFields as $field) {
                if ($request->hasFile($field)) {
                    $documents[$field] = $request->file($field)->store('medicallab_documents', 'public');
                }
            }
            // Create the medical lab profile
            $medicallab = Medicallab::create([
                'user_id' => $user->id,
                'uuid' => (string) Str::uuid(),

                // Business Info
                'lab_name' => $validated['lab_name'],
                'mlscn_license_number' => $validated['mlscn_license_number'],
                'mlscn_license_expiry' => $validated['mlscn_license_expiry'] ?? null,
                'cac_registration_number' => $validated['cac_registration_number'] ?? null,
                'lab_tests_offered' => $validated['lab_tests_offered'] ?? null,

                // Documents
                'mlscn_certificate' => $documents['mlscn_certificate'] ?? null,
                'cac_certificate' => $documents['cac_certificate'] ?? null,
                'director_id_card' => $documents['director_id_card'] ?? null,
                'facility_photo' => $documents['facility_photo'] ?? null,

                // Location
                'address' => $validated['address'] ?? null,
                'city' => $validated['city'],
                'state' => $validated['state'],
                'latitude' => $validated['latitude'] ?? null,
                'longitude' => $validated['longitude'] ?? null,

                // Status (default is pending)
                'status' => 'pending',
            ]);

            DB::commit();

            // Fire the registered event
            event(new Registered($user));

            // Redirect with success message
            return redirect()->route('login')->with(
                'success',
                'Your medical lab registration has been submitted successfully! ' .
                    'Our team will review your application and notify you via email within 2-3 business days.'
            );
        } catch (\Exception $e) {
            DB::rollBack();

            // Log the error
            Log::error('Medical lab registration failed: ' . $e->getMessage(), [
                'email' => $request->email,
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors([
                'error' => 'Registration failed. Please try again or contact support if the problem persists.'
            ])->withInput($request->except('password', 'password_confirmation'));
        }
    }
}


