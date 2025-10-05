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
import { LoaderCircle, Shield } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication Code',
            description:
                'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
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
            
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <img src='/assets/images/hb_logo.png' alt='logo' className="mx-auto mb-6 w-24"/>
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Shield className="h-6 w-6 text-gray-900" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {authConfigContent.title}
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            {authConfigContent.description}
                        </p>
                    </div>

                    {/* Two-Factor Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                        <Form
                            {...store.form()}
                            className="flex flex-col gap-6"
                            resetOnError
                            resetOnSuccess={!showRecoveryInput}
                        >
                            {({ errors, processing, clearErrors }) => (
                                <>
                                    <div className="grid gap-5">
                                        {showRecoveryInput ? (
                                            <div className="grid gap-2">
                                                <Label 
                                                    htmlFor="recovery_code"
                                                    className="text-sm font-medium text-gray-900"
                                                >
                                                    Recovery Code
                                                </Label>
                                                <Input
                                                    id="recovery_code"
                                                    name="recovery_code"
                                                    type="text"
                                                    placeholder="Enter recovery code"
                                                    autoFocus={showRecoveryInput}
                                                    required
                                                    className="transition-all focus:ring-2 text-black"
                                                />
                                                <InputError message={errors.recovery_code} />
                                            </div>
                                        ) : (
                                            <div className="grid gap-2">
                                                <Label className="text-sm font-medium text-gray-900 text-center">
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
                                                            <InputOTPGroup>
                                                                {Array.from(
                                                                    { length: OTP_MAX_LENGTH },
                                                                    (_, index) => (
                                                                        <InputOTPSlot
                                                                            key={index}
                                                                            index={index}
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
                                            className="w-full transition-all hover:shadow-md mt-2"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                'Continue'
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
                                                Alternative method
                                            </span>
                                        </div>
                                    </div>

                                    {/* Toggle Link */}
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            className="text-sm font-medium hover:underline text-black transition-colors"
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
                    <p className="mt-8 text-center text-xs text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </>
    );
}