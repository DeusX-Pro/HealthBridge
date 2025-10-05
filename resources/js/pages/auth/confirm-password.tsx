import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Confirm Password" />
            
            <div className="min-h-screen flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <img src='/assets/images/hb_logo.png' alt='logo' className="mx-auto mb-6 w-24"/>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Confirm Password
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            This is a secure area. Please confirm your password before continuing.
                        </p>
                    </div>

                    {/* Confirm Password Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
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
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    required
                                                    autoFocus
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

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full transition-all hover:shadow-md mt-2"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                                    Confirming...
                                                </>
                                            ) : (
                                                'Confirm password'
                                            )}
                                        </Button>
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