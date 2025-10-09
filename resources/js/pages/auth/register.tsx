import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Head title="Register" />
            <div className="flex min-h-screen items-center justify-center bg-white p-4">
                <div className="w-full max-w-4xl">
                    {/* Logo */}
                    <img
                        src="/assets/images/hb_logo.png"
                        alt="Logo"
                        className="mx-auto mb-6 w-24"
                    />

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create an account
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your details to get started
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* 2-column grid for large screens */}
                                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                        {/* Name */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="name"
                                            >
                                                Full Name
                                            </Label>
                                            <Input
                                                className="text-black"
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="email"
                                            >
                                                Email Address
                                            </Label>
                                            <Input
                                                className="text-black"
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="email@example.com"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="phone_number"
                                            >
                                                Phone Number
                                            </Label>
                                            <Input
                                                className="text-black"
                                                id="phone_number"
                                                name="phone_number"
                                                type="text"
                                                required
                                                placeholder="+234 801 234 5678"
                                            />
                                            <InputError
                                                message={errors.phone_number}
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="date_of_birth"
                                            >
                                                Date of Birth (DD/MM/YYYY)
                                            </Label>
                                            <Input
                                                className="text-black"
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                type="date"
                                            />
                                            <InputError
                                                message={errors.date_of_birth}
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="gender"
                                            >
                                                Gender
                                            </Label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2"
                                            >
                                                <option value="">
                                                    Select gender
                                                </option>
                                                <option value="male">
                                                    Male
                                                </option>
                                                <option value="female">
                                                    Female
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.gender}
                                            />
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="country"
                                            >
                                                Country
                                            </Label>
                                            <Input
                                                className="text-black"
                                                id="country"
                                                name="country"
                                                type="text"
                                                placeholder="Nigeria"
                                            />
                                            <InputError
                                                message={errors.country}
                                            />
                                        </div>

                                        {/* Bio */}
                                        <div className="lg:col-span-2">
                                            <Label
                                                className="text-black"
                                                htmlFor="bio"
                                            >
                                                Short Bio
                                            </Label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                placeholder="Tell us a bit about yourself"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2"
                                                rows={3}
                                            />
                                            <InputError message={errors.bio} />
                                        </div>

                                        {/* Profile Picture */}
                                        <div className="lg:col-span-2">
                                            <Label
                                                className="text-black"
                                                htmlFor="profile_picture"
                                            >
                                                Profile Picture
                                            </Label>
                                            <Input
                                                className="text-black"
                                                id="profile_picture"
                                                name="profile_picture"
                                                type="file"
                                                accept="image/*"
                                            />
                                            <InputError
                                                message={errors.profile_picture}
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="password"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    className="text-black pr-10"
                                                    id="password"
                                                    name="password"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    required
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff size={16} />
                                                    ) : (
                                                        <Eye size={16} />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <Label
                                                className="text-black"
                                                htmlFor="password_confirmation"
                                            >
                                                Confirm Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    type={
                                                        showConfirmPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    required
                                                    placeholder="••••••••"
                                                    className="pr-10 text-black"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff size={16} />
                                                    ) : (
                                                        <Eye size={16} />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        className="mt-3 w-full"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            'Create account'
                                        )}
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-gray-500">
                                                Already have an account?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <TextLink
                                            href={login()}
                                            className="text-sm font-medium text-black hover:underline"
                                        >
                                            Log in instead
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-gray-500">
                        By creating an account, you agree to our Terms of
                        Service and Privacy Policy
                    </p>
                </div>
            </div>
        </>
    );
}
