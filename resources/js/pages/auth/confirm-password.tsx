import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, Lock, Shield, Info } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Confirm Password" />
            
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
                        <h1 className="text-4xl font-bold tracking-tight text-green-900">
                            Confirm Password
                        </h1>
                        <p className="mt-3 text-base text-green-600">
                            This is a secure area. Please confirm your password before continuing.
                        </p>
                    </div>

                    {/* Confirm Password Card */}
                    <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <Form
                            {...store.form()}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-5">
                                        {/* Password Field */}
                                        <div className="grid gap-2">
                                            <Label 
                                                htmlFor="password"
                                                className="text-sm font-semibold text-Green-700"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Lock className="h-4 w-4 text-green-700" />
                                                </div>
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    required
                                                    autoFocus
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="h-11 border-green-300 px-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
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
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Info Notice */}
                                        <div className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3.5">
                                            <Info className="h-5 w-5 flex-shrink-0 text-amber-600" />
                                            <p className="text-xs text-amber-900">
                                                For your security, please confirm your password to access this protected area. 
                                                This helps keep your account safe.
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="mt-2 h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                    Confirming...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="mr-2 h-4 w-4" />
                                                    Confirm password
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
                        By continuing, you agree to our{' '}
                        <a
                            href="#"
                            className="font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                        >
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}