import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
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
            
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <img src='/assets/images/hb_logo.png' alt='logo' className="mx-auto mb-6 w-24"/>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Create an account
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your details below to get started
                        </p>
                    </div>

                    {/* Registration Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-5">
                                        {/* Name Field */}
                                        <div className="grid gap-2">
                                            <Label 
                                                htmlFor="name"
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Full name
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="John Doe"
                                                className="transition-all text-black focus:ring-2"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Email Field */}
                                        <div className="grid gap-2">
                                            <Label 
                                                htmlFor="email"
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="email@example.com"
                                                className="transition-all text-black focus:ring-2"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Password Field */}
                                        <div className="grid gap-2">
                                            <Label 
                                                htmlFor="password"
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    required
                                                    tabIndex={3}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    className="pr-10 transition-all text-black focus:ring-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm transition-colors"
                                                    tabIndex={-1}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div className="grid gap-2">
                                            <Label 
                                                htmlFor="password_confirmation"
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Confirm password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password_confirmation"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    name="password_confirmation"
                                                    placeholder="••••••••"
                                                    className="pr-10 transition-all text-black focus:ring-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm transition-colors"
                                                    tabIndex={-1}
                                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError message={errors.password_confirmation} />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full transition-all hover:shadow-md mt-2"
                                            tabIndex={5}
                                            data-test="register-user-button"
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
                                    </div>

                                    {/* Divider */}
                                    <div className="relative">
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
                                            tabIndex={6}
                                            className="text-sm font-medium hover:underline text-black"
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
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </>
    );
}