import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />
            
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <img src='/assets/images/hb_logo.png' alt='logo' className="mx-auto mb-6 w-24"/>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Forgot password
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your email to receive a password reset link
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <span>{status}</span>
                        </div>
                    )}

                    {/* Forgot Password Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
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
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="transition-all focus:ring-2 text-black"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full transition-all hover:shadow-md mt-2"
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending reset link...
                                                </>
                                            ) : (
                                                'Email password reset link'
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
                                                Remember your password?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Back to Login Link */}
                                    <div className="text-center">
                                        <TextLink 
                                            href={login()}
                                            className="inline-flex items-center gap-2 text-sm font-medium hover:underline text-black"
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
                    <p className="mt-8 text-center text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </>
    );
}