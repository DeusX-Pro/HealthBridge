import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import {
    CheckCircle2,
    Eye,
    EyeOff,
    LoaderCircle,
    Lock,
    Mail,
    Shield,
    Info,
} from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Log in" />

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
                            Welcome back
                        </h1>
                        <p className="mt-3 text-base text-green-700">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3.5 text-sm text-green-800 shadow-sm">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                            <span className="font-medium">{status}</span>
                        </div>
                    )}

                    {/* Login Card */}
                    <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <Form
                            {...AuthenticatedSessionController.store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-5">
                                        {/* Email Field */}
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-semibold text-green-600"
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
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="email@example.com"
                                                    className="h-11 border-green-300 pl-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* Password Field */}
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label
                                                    htmlFor="password"
                                                    className="text-sm font-semibold text-green-600"
                                                >
                                                    Password
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-xs font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Lock className="h-4 w-4 text-green-700" />
                                                </div>
                                                <Input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="h-11 border-green-300 px-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-green-500 transition-colors hover:text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                                    tabIndex={-1}
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-green-700" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-green-700" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        {/* Remember Me */}
                                        <div className="flex items-center space-x-2.5">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="h-4 w-4 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="cursor-pointer text-sm leading-none font-normal text-green-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember me for 30 days
                                            </Label>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="mt-3 h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg disabled:opacity-50"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                    Logging in...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="mr-2 h-4 w-4" />
                                                    Log in
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Info Notice */}
                                    <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                        <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                        <p className="text-sm text-blue-900">
                                            Secure Login: We prioritize your
                                            security. Your connection is
                                            encrypted and protected to ensure
                                            your data remains safe.
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-green-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-3 text-green-500">
                                                New to our platform?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sign Up Link */}
                                    <div className="text-center">
                                        <p className="text-sm text-green-600">
                                            Don't have an account?{' '}
                                            <TextLink
                                                href={register()}
                                                tabIndex={5}
                                                className="font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                                            >
                                                Create an account
                                            </TextLink>
                                        </p>
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
