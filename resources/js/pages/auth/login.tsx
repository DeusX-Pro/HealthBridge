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
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Key,
    LoaderCircle,
    Lock,
    Mail,
    Shield,
    UserPlus,
} from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-4">
                <div className="w-full max-w-md">
                    {/* Logo & Header */}
                    <div className="mb-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            {/* Logo with improved styling */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 opacity-30 blur-xl"></div>
                                <img
                                    src="/assets/images/hb_logo.png"
                                    alt="logo"
                                    className="relative mx-auto h-20 w-20 object-contain"
                                />
                            </div>

                            {/* Title with gradient text */}
                            <div>
                                <h1 className="bg-gradient-to-r from-slate-900 via-emerald-700 to-green-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                                    Welcome Back
                                </h1>
                                <p className="mt-2 text-base text-slate-600">
                                    Sign in to access your account
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-3.5 text-sm text-emerald-800 shadow-sm">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                <span className="font-medium">{status}</span>
                            </div>
                        </div>
                    )}

                    {/* Login Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg backdrop-blur-sm">
                        <div className="p-8">
                            {/* Form Header */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm">
                                    <Key className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Account Login
                                    </h2>
                                    <p className="text-sm text-slate-600">
                                        Enter your credentials to continue
                                    </p>
                                </div>
                            </div>

                            <Form
                                {...AuthenticatedSessionController.store.form()}
                                resetOnSuccess={['password']}
                                className="space-y-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        {/* Email Field */}
                                        <div className="space-y-2.5">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Mail className="h-4 w-4 text-slate-500" />
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
                                                    className="h-11 border-slate-300 bg-white pl-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* Password Field */}
                                        <div className="space-y-2.5">
                                            <div className="flex items-center justify-between">
                                                <Label
                                                    htmlFor="password"
                                                    className="text-sm font-medium text-slate-700"
                                                >
                                                    Password
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline"
                                                        tabIndex={4}
                                                    >
                                                        Forgot your password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                    <Lock className="h-4 w-4 text-slate-500" />
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
                                                    className="h-11 border-slate-300 bg-white px-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                                                className="h-4 w-4 border-slate-300 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="cursor-pointer text-sm leading-none font-normal text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember this device for 30 days
                                            </Label>
                                        </div>

                                        {/* Security Info */}
                                        {email && password && (
                                            <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
                                                <div className="flex items-start gap-2">
                                                    <Shield className="mt-0.5 h-4 w-4 text-emerald-600" />
                                                    <div>
                                                        <p className="text-xs font-medium text-emerald-800">
                                                            Secure connection
                                                            detected
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-emerald-700">
                                                            Your login
                                                            information is
                                                            encrypted
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="h-12 w-full bg-gradient-to-r from-emerald-600 to-green-600 text-base font-semibold text-white shadow-md transition-all hover:from-emerald-700 hover:to-green-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>

                                        {/* Error Notice */}
                                        {(errors.email || errors.password) && (
                                            <div className="rounded-lg border border-red-100 bg-red-50/50 p-4">
                                                <div className="flex gap-3">
                                                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-red-800">
                                                            Unable to sign in
                                                        </p>
                                                        <p className="mt-0.5 text-sm text-red-700">
                                                            Please check your
                                                            credentials and try
                                                            again
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Divider */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-slate-200"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-4 text-sm text-slate-500">
                                                    Don't have an account?
                                                </span>
                                            </div>
                                        </div>

                                        {/* Sign Up Link */}
                                        <div className="text-center">
                                            <TextLink
                                                href={register()}
                                                tabIndex={5}
                                                className="inline-flex items-center text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline"
                                            >
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Create a new account
                                            </TextLink>
                                        </div>

                                        {/* Professional Links */}
                                        <div className="pt-2">
                                            <p className="mb-3 text-center text-xs font-medium text-slate-500">
                                                Healthcare Professionals
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                <a
                                                    href="/doctor-register"
                                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                                                >
                                                    Doctor Login
                                                </a>
                                                <a
                                                    href="/pharmacy-register"
                                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                                                >
                                                    Pharmacy Login
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600">
                            By signing in, you agree to our{' '}
                            <a
                                href="#"
                                className="font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline"
                            >
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                                href="#"
                                className="font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline"
                            >
                                Privacy Policy
                            </a>
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Need help?{' '}
                            <a
                                href="#"
                                className="text-emerald-600 hover:text-emerald-700 hover:underline"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>

                    {/* Security Badges */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
                            <Shield className="h-3 w-3 text-slate-600" />
                            <span className="text-xs font-medium text-slate-700">
                                SSL Secured
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
                            <Lock className="h-3 w-3 text-slate-600" />
                            <span className="text-xs font-medium text-slate-700">
                                Encrypted
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
