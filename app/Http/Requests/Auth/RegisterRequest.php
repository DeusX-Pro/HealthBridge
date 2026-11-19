<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:128'],
            'last_name' => ['required', 'string', 'max:128'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone_e164' => ['required', 'string', 'max:32', 'unique:users,phone_e164'],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'biological_sex' => ['required', 'in:FEMALE,MALE'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'accepted_documents' => ['required', 'array', 'min:1'],
            'interests' => ['nullable', 'array'],
        ];
    }
}

