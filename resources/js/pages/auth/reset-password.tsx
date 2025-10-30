import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Mail, Lock, Check, X, Info, KeyRound } from 'lucide-react';
import { useState, useMemo } from 'react';

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
    const [password, setPassword] = useState('');

    // Password strength calculator
    const passwordStrength = useMemo(() => {
        if (!password) return { strength: 0, label: '', color: '' };
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    }, [password]);

    return (
        <>
            <Head title="Reset password" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-white p-4">
                <div className="w-full max-w-3xl">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="flex justify-center">
                            <img
                                src="/assets/images/hb_logo.png"
                                alt="logo"
                                className="mx-auto mb-4 h-20 w-20 object-contain drop-shadow-md"
                            />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-green-700">
                            Reset your password
                        </h1>
                        <p className="mt-3 text-base text-green-700">
                            Choose a strong password for your account
                        </p>
                    </div>

                    {/* Reset Password Card */}
                    <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
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
                                <>
                                    <div className="grid gap-5">
                                        {/* Email Field (Read-only) */}
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-semibold text-green-700"
                                            >
                                                Email address
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Mail className="h-4 w-4 text-green-700" />
                                                </div>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={email}
                                                    readOnly
                                                    className="h-11 cursor-not-allowed border-green-300 bg-green-50 pl-10 text-green-600 shadow-sm"
                                                />
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Password Field */}
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="password"
                                                className="text-sm font-semibold text-green-700"
                                            >
                                                New password
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Lock className="h-4 w-4 text-green-700" />
                                                </div>
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    autoComplete="new-password"
                                                    autoFocus
                                                    placeholder="••••••••"
                                                    className="h-11 border-green-300 px-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-green-500 transition-colors hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                    tabIndex={-1}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-green-700" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-green-700" />
                                                    )}
                                                </button>
                                            </div>
                                            
                                            {/* Password Strength Indicator */}
                                            {password && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 bg-green-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                                                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-medium text-green-600">
                                                            {passwordStrength.label}
                                                        </span>
                                                    </div>
                                                    <ul className="space-y-1 text-xs text-green-600">
                                                        <li className="flex items-center gap-1.5">
                                                            {password.length >= 8 ? (
                                                                <Check size={14} className="text-green-600" />
                                                            ) : (
                                                                <X size={14} className="text-green-400" />
                                                            )}
                                                            At least 8 characters
                                                        </li>
                                                        <li className="flex items-center gap-1.5">
                                                            {/[a-z]/.test(password) && /[A-Z]/.test(password) ? (
                                                                <Check size={14} className="text-green-600" />
                                                            ) : (
                                                                <X size={14} className="text-green-400" />
                                                            )}
                                                            Upper & lowercase letters
                                                        </li>
                                                        <li className="flex items-center gap-1.5">
                                                            {/\d/.test(password) ? (
                                                                <Check size={14} className="text-green-600" />
                                                            ) : (
                                                                <X size={14} className="text-green-400" />
                                                            )}
                                                            At least one number
                                                        </li>
                                                        <li className="flex items-center gap-1.5">
                                                            {/[^a-zA-Z0-9]/.test(password) ? (
                                                                <Check size={14} className="text-green-600" />
                                                            ) : (
                                                                <X size={14} className="text-green-400" />
                                                            )}
                                                            Special character (!@#$%)
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="password_confirmation"
                                                className="text-sm font-semibold text-green-700"
                                            >
                                                Confirm new password
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Lock className="h-4 w-4 text-green-700" />
                                                </div>
                                                <Input
                                                    id="password_confirmation"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="password_confirmation"
                                                    autoComplete="new-password"
                                                    placeholder="••••••••"
                                                    className="h-11 border-green-300 px-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-green-500 transition-colors hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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

                                        {/* Info Notice */}
                                        <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3.5">
                                            <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                            <p className="text-xs text-blue-900">
                                                Make sure your new password is strong and unique. 
                                                You'll use it to log in to your account.
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="mt-2 h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg disabled:opacity-50"
                                            disabled={processing}
                                            data-test="reset-password-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                    Resetting password...
                                                </>
                                            ) : (
                                                <>
                                                    <KeyRound className="mr-2 h-4 w-4" />
                                                    Reset password
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs leading-relaxed text-green-500">
                        Once reset, you'll be able to log in with your new password. 
                        Keep it safe and don't share it with anyone.
                    </p>
                </div>
            </div>
        </>
    );
}