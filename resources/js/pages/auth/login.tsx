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
import { LoaderCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
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
            
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <img src='/assets/images/hb_logo.png' alt='logo' className="mx-auto mb-6 w-24"/>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <span>{status}</span>
                        </div>
                    )}

                    {/* Login Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
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
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="transition-all focus:ring-2 text-black"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Password Field */}
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label 
                                                    htmlFor="password"
                                                    className="text-sm font-medium text-gray-900"
                                                >
                                                    Password
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-xs font-medium hover:underline text-black"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="pr-10 transition-all focus:ring-2 text-black"
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

                                        {/* Remember Me */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />
                                            <Label 
                                                htmlFor="remember"
                                                className="text-sm font-normal text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember me for 30 days
                                            </Label>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full transition-all hover:shadow-md mt-2"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    Logging in...
                                                </>
                                            ) : (
                                                'Log in'
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
                                                New to our platform?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sign Up Link */}
                                    <div className="text-center">
                                        <TextLink 
                                            href={register()} 
                                            tabIndex={5}
                                            className="text-sm font-medium hover:underline text-black"
                                        >
                                            Create an account
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </>
    );
}