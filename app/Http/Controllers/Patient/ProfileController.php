<?php

namespace App\Http\Controllers\Patient;

use App\Models\User;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    //
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('patient');

        return inertia(
            'dashboard/patient/profile/index', [
            'user' => $user,
        ]);
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . Auth::id(),
            'phone_number' => 'required|string|max:20|unique:users,phone_number,' . Auth::id(),
            'date_of_birth' => 'nullable|date',
            'country' => 'nullable|string|max:100',
            'gender' => 'nullable|in:male,female,other',
            'bio' => 'nullable|string|max:500',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

            // Patient fields
            'blood_type' => 'nullable|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'allergies' => 'nullable|array',
            'allergies.*' => 'string|max:255',
            'chronic_conditions' => 'nullable|array',
            'chronic_conditions.*' => 'string|max:255',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Store new profile picture
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $user->profile_picture = $path;
        }

        // Update user information
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'date_of_birth' => $request->date_of_birth,
            'country' => $request->country,
            'gender' => $request->gender,
            'bio' => $request->bio,
            'profile_picture' => $user->profile_picture,
        ]);

        // Update patient information if user has patient record
        if ($user->patient) {
            $user->patient->update([
                'blood_type' => $request->blood_type,
                'allergies' => $request->allergies ? json_encode($request->allergies) : null,
                'chronic_conditions' => $request->chronic_conditions ? json_encode($request->chronic_conditions) : null,
                'emergency_contact_name' => $request->emergency_contact_name,
                'emergency_contact_phone' => $request->emergency_contact_phone,
            ]);
        }

        return redirect()->route('patient.profile.index')->with('success', 'Profile updated successfully!');
    }
}
