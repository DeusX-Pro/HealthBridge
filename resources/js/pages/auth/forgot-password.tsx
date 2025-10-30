import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, CheckCircle2, ArrowLeft, Mail, Send, Info } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />
            
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
                            Forgot password?
                        </h1>
                        <p className="mt-3 text-base text-green-700">
                            No worries, we'll send you reset instructions
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3.5 text-sm text-green-800 shadow-sm">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                            <span className="font-medium">{status}</span>
                        </div>
                    )}

                    {/* Forgot Password Card */}
                    <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <Form
                            {...PasswordResetLinkController.store.form()}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-5">
                                        {/* Email Field */}
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
                                                    required
                                                    autoFocus
                                                    autoComplete="email"
                                                    placeholder="email@example.com"
                                                    className="h-11 border-green-300 pl-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Info Message */}
                                        <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3.5">
                                            <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                            <p className="text-xs text-blue-900">
                                                We'll send a password reset link to your email. 
                                                Please check your inbox and spam folder.
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="mt-2 h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg disabled:opacity-50"
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                    Sending reset link...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Send reset link
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-green-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-3 text-green-500">
                                                Remember your password?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Back to Login Link */}
                                    <div className="text-center">
                                        <TextLink 
                                            href={login()}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Back to log in
                                        </TextLink>
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