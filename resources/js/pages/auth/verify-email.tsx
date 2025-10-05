import EmailVerificationNotificationController from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Mail, CheckCircle2 } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />
            
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <img src='/assets/images/hb_logo.png' alt='logo' className="mx-auto mb-6 w-24"/>
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Mail className="h-6 w-6 text-gray-900" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Verify email
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Please verify your email address by clicking on the link we just emailed to you.
                        </p>
                    </div>

                    {/* Status Message */}
                    {status === 'verification-link-sent' && (
                        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <span>
                                A new verification link has been sent to the email address you provided during registration.
                            </span>
                        </div>
                    )}

                    {/* Verify Email Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                        <Form
                            {...EmailVerificationNotificationController.store.form()}
                            className="flex flex-col gap-6"
                        >
                            {({ processing }) => (
                                <>
                                    <div className="grid gap-5">
                                        {/* Resend Button */}
                                        <Button
                                            type="submit"
                                            variant="secondary"
                                            className="w-full transition-all hover:shadow-md"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Resend verification email'
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
                                                Need to switch accounts?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Log Out Link */}
                                    <div className="text-center">
                                        <TextLink
                                            href={logout()}
                                            className="text-sm font-medium hover:underline text-black"
                                        >
                                            Log out
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