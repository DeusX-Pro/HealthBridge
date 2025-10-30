import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';
import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { LoaderCircle, Shield, Key, Info } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
        infoText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'Use authentication code instead',
                infoText: 'Enter one of the recovery codes you saved when setting up two-factor authentication. Each code can only be used once.',
            };
        }

        return {
            title: 'Two-Factor Authentication',
            description:
                'Enter the 6-digit code from your authenticator app to continue.',
            toggleText: 'Use recovery code instead',
            infoText: 'Open your authenticator app and enter the 6-digit verification code to securely access your account.',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-Factor Authentication" />
            
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
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-sm">
                            <Shield className="h-8 w-8 text-green-700" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-green-700">
                            {authConfigContent.title}
                        </h1>
                        <p className="mt-3 text-base text-green-700">
                            {authConfigContent.description}
                        </p>
                    </div>

                    {/* Two-Factor Card */}
                    <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <Form
                            {...store.form()}
                            className="flex flex-col gap-6"
                            resetOnError
                            resetOnSuccess={!showRecoveryInput}
                        >
                            {({ errors, processing, clearErrors }) => (
                                <>
                                    <div className="grid gap-5">
                                        {/* Info Notice */}
                                        <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3.5">
                                            <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                            <p className="text-xs text-blue-900">
                                                {authConfigContent.infoText}
                                            </p>
                                        </div>

                                        {showRecoveryInput ? (
                                            <div className="grid gap-2">
                                                <Label 
                                                    htmlFor="recovery_code"
                                                    className="text-sm font-semibold text-green-700"
                                                >
                                                    Recovery Code
                                                </Label>
                                                <div className="relative">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                        <Key className="h-4 w-4 text-green-700" />
                                                    </div>
                                                    <Input
                                                        id="recovery_code"
                                                        name="recovery_code"
                                                        type="text"
                                                        placeholder="xxxx-xxxx-xxxx"
                                                        autoFocus={showRecoveryInput}
                                                        required
                                                        className="h-11 border-green-300 pl-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    />
                                                </div>
                                                <InputError message={errors.recovery_code} />
                                            </div>
                                        ) : (
                                            <div className="grid gap-3">
                                                <Label className="text-center text-sm font-semibold text-green-700">
                                                    Enter 6-Digit Code
                                                </Label>
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <div className="flex w-full items-center justify-center">
                                                        <InputOTP
                                                            name="code"
                                                            maxLength={OTP_MAX_LENGTH}
                                                            value={code}
                                                            onChange={(value) => setCode(value)}
                                                            disabled={processing}
                                                            pattern={REGEXP_ONLY_DIGITS}
                                                        >
                                                            <InputOTPGroup className="gap-2">
                                                                {Array.from(
                                                                    { length: OTP_MAX_LENGTH },
                                                                    (_, index) => (
                                                                        <InputOTPSlot
                                                                            key={index}
                                                                            index={index}
                                                                            className="h-12 w-12 border-green-300 text-lg font-semibold text-green-900 transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                                        />
                                                                    ),
                                                                )}
                                                            </InputOTPGroup>
                                                        </InputOTP>
                                                    </div>
                                                    <InputError message={errors.code} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="mt-3 h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="mr-2 h-4 w-4" />
                                                    Continue securely
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
                                                Having trouble?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Toggle Link */}
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            className="text-sm font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                                            onClick={() => toggleRecoveryMode(clearErrors)}
                                        >
                                            {authConfigContent.toggleText}
                                        </button>
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