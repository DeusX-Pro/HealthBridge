import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Head title="Reset password" />

            <div className="flex min-h-screen items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}

                    <img
                        src="/assets/images/hb_logo.png"
                        alt="logo"
                        className="mx-auto mb-6 w-24"
                    />
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Reset your password
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your new password below to reset it
                        </p>
                    </div>

                    {/* Reset Password Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                        <Form
                            {...NewPasswordController.store.form()}
                            transform={(data) => ({ ...data, token, email })}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <div className="grid gap-5">
                                    {/* Email Field (Read-only) */}
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
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            readOnly
                                            className="cursor-not-allowed bg-gray-50"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password Field */}
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-medium text-gray-900"
                                        >
                                            New password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                autoComplete="new-password"
                                                autoFocus
                                                placeholder="••••••••"
                                                className="pr-10 transition-all focus:ring-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm text-gray-500 transition-colors hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                                tabIndex={-1}
                                                aria-label={
                                                    showPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
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
                                            Confirm new password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password_confirmation"
                                                autoComplete="new-password"
                                                placeholder="••••••••"
                                                className="pr-10 transition-all focus:ring-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm text-gray-500 transition-colors hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                                tabIndex={-1}
                                                aria-label={
                                                    showConfirmPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="mt-2 w-full transition-all hover:shadow-md"
                                        disabled={processing}
                                        data-test="reset-password-button"
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                Resetting password...
                                            </>
                                        ) : (
                                            'Reset password'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-gray-500">
                        Once reset, you'll be able to log in with your new
                        password
                    </p>
                </div>
            </div>
        </>
    );
}
