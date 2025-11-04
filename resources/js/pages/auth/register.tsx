import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { Check, Eye, EyeOff, Info, LoaderCircle, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// List of all countries
const COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 
    'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 
    'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 
    'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 
    'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 
    'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 
    'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 
    'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 
    'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 
    'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 
    'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 
    'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 
    'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 
    'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 
    'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 
    'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 
    'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 
    'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 
    'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 
    'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 
    'Yemen', 'Zambia', 'Zimbabwe'
];

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    // Password strength calculator
    const passwordStrength = useMemo(() => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2)
            return { strength, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3)
            return { strength, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 4)
            return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    }, [password]);

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setProfilePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Head title="Register" />
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
                            Create an account
                        </h1>
                        <p className="mt-3 text-base text-green-700">
                            Enter your details to get started with us
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="rounded-3xl border border-green-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:p-10">
                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                            disableWhileProcessing
                            className="flex flex-col gap-8"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Personal Information Section */}
                                    <div>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-green-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                                1
                                            </div>
                                            Personal Information
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Name */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="name"
                                                >
                                                    Full Name
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-green-300 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    autoComplete="name"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>

                                            {/* Email */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="email"
                                                >
                                                    Email Address
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-green-300 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="email@example.com"
                                                    autoComplete="email"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="phone_number"
                                                >
                                                    Phone Number
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-green-300 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    id="phone_number"
                                                    name="phone_number"
                                                    type="tel"
                                                    required
                                                    placeholder="+234 801 234 5678"
                                                    autoComplete="tel"
                                                />
                                                <InputError
                                                    message={
                                                        errors.phone_number
                                                    }
                                                />
                                            </div>

                                            {/* Date of Birth */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="date_of_birth"
                                                >
                                                    Date of Birth
                                                    <span className="ml-1 text-xs text-green-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-green-300 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    id="date_of_birth"
                                                    name="date_of_birth"
                                                    type="date"
                                                    autoComplete="bday"
                                                />
                                                <InputError
                                                    message={
                                                        errors.date_of_birth
                                                    }
                                                />
                                            </div>

                                            {/* Gender */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="gender"
                                                >
                                                    Gender
                                                    <span className="ml-1 text-xs text-green-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="h-11 w-full rounded-md border border-green-300 px-3 text-sm text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                    autoComplete="sex"
                                                >
                                                    <option value="">
                                                        Select gender
                                                    </option>
                                                    <option value="male">
                                                        Male
                                                    </option>
                                                    <option value="female">
                                                        Female
                                                    </option>
                                                    <option value="other">
                                                        Other
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={errors.gender}
                                                />
                                            </div>

                                            {/* Marital Status - NEW */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="marital_status"
                                                >
                                                    Marital Status
                                                    <span className="ml-1 text-xs text-green-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="marital_status"
                                                    name="marital_status"
                                                    className="h-11 w-full rounded-md border border-green-300 px-3 text-sm text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                >
                                                    <option value="">
                                                        Select marital status
                                                    </option>
                                                    <option value="single">
                                                        Single
                                                    </option>
                                                    <option value="married">
                                                        Married
                                                    </option>
                                                    <option value="divorced">
                                                        Divorced
                                                    </option>
                                                    <option value="widowed">
                                                        Widowed
                                                    </option>
                                                    <option value="separated">
                                                        Separated
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={errors.marital_status}
                                                />
                                            </div>

                                            {/* Country - CHANGED TO DROPDOWN */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="country"
                                                >
                                                    Country
                                                    <span className="ml-1 text-xs text-green-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    className="h-11 w-full rounded-md border border-green-300 px-3 text-sm text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                    autoComplete="country-name"
                                                >
                                                    <option value="">
                                                        Select country
                                                    </option>
                                                    {COUNTRIES.map((country) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError
                                                    message={errors.country}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Section */}
                                    <div className="border-t border-green-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-green-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                                2
                                            </div>
                                            Profile Details
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5">
                                            {/* Bio */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="bio"
                                                >
                                                    Short Bio
                                                    <span className="ml-1 text-xs text-green-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    placeholder="Tell us a bit about yourself..."
                                                    className="w-full resize-none rounded-md border border-green-300 px-3 py-2.5 text-sm text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                                    rows={4}
                                                />
                                                <InputError
                                                    message={errors.bio}
                                                />
                                            </div>

                                            {/* Profile Picture */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="profile_picture"
                                                >
                                                    Profile Picture
                                                    <span className="ml-1 text-xs text-green-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="flex items-start gap-4">
                                                    {profilePreview && (
                                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-green-200 shadow-sm">
                                                            <img
                                                                src={
                                                                    profilePreview
                                                                }
                                                                alt="Profile preview"
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1">
                                                        <Input
                                                            className="h-11 border-green-300 text-green-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-green-50 file:px-4 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                            id="profile_picture"
                                                            name="profile_picture"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={
                                                                handleFileChange
                                                            }
                                                        />
                                                        <p className="mt-1.5 text-xs text-green-500">
                                                            PNG, JPG or GIF
                                                            (Max. 2MB)
                                                        </p>
                                                    </div>
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.profile_picture
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Section */}
                                    <div className="border-t border-green-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-green-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                                3
                                            </div>
                                            Security
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Password */}
                                            <div className="">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-green-300 pr-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                        id="password"
                                                        name="password"
                                                        type={
                                                            showPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        required
                                                        placeholder="••••••••"
                                                        autoComplete="new-password"
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
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-green-500 transition-colors hover:text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                                        aria-label={
                                                            showPassword
                                                                ? 'Hide password'
                                                                : 'Show password'
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff
                                                                size={18}
                                                                className="text-green-700"
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={18}
                                                                className="text-green-700"
                                                            />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Password Strength Indicator */}
                                                {password && (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-green-200">
                                                                <div
                                                                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                                                    style={{
                                                                        width: `${(passwordStrength.strength / 5) * 100}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-green-600">
                                                                {
                                                                    passwordStrength.label
                                                                }
                                                            </span>
                                                        </div>
                                                        <ul className="space-y-1 text-xs text-green-600">
                                                            <li className="flex items-center gap-1.5">
                                                                {password.length >=
                                                                8 ? (
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-400"
                                                                    />
                                                                )}
                                                                At least 8
                                                                characters
                                                            </li>
                                                            <li className="flex items-center gap-1.5">
                                                                {/[a-z]/.test(
                                                                    password,
                                                                ) &&
                                                                /[A-Z]/.test(
                                                                    password,
                                                                ) ? (
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-400"
                                                                    />
                                                                )}
                                                                Upper &
                                                                lowercase
                                                                letters
                                                            </li>
                                                            <li className="flex items-center gap-1.5">
                                                                {/\d/.test(
                                                                    password,
                                                                ) ? (
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-400"
                                                                    />
                                                                )}
                                                                At least one
                                                                number
                                                            </li>
                                                            <li className="flex items-center gap-1.5">
                                                                {/[^a-zA-Z0-9]/.test(
                                                                    password,
                                                                ) ? (
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-green-400"
                                                                    />
                                                                )}
                                                                Special
                                                                character
                                                                (!@#$%)
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>

                                            {/* Confirm Password */}
                                            <div className="">
                                                <Label
                                                    className="text-sm font-semibold text-green-600"
                                                    htmlFor="password_confirmation"
                                                >
                                                    Confirm Password
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="password_confirmation"
                                                        name="password_confirmation"
                                                        type={
                                                            showConfirmPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        required
                                                        placeholder="••••••••"
                                                        autoComplete="new-password"
                                                        className="h-11 border-green-300 pr-10 text-green-900 shadow-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword,
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-green-500 transition-colors hover:text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                                        aria-label={
                                                            showConfirmPassword
                                                                ? 'Hide password'
                                                                : 'Show password'
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff
                                                                size={18}
                                                                className="text-green-700"
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={18}
                                                                className="text-green-700"
                                                            />
                                                        )}
                                                    </button>
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Notice */}
                                    <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                        <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                        <p className="text-sm text-blue-900">
                                            We'll never share your personal
                                            information without your permission.
                                            Your privacy and security are our
                                            top priorities.
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-base font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                Creating your account...
                                            </>
                                        ) : (
                                            'Create account'
                                        )}
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-green-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-3 text-green-500">
                                                Already have an account?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <TextLink
                                            href={login()}
                                            className="text-sm font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                                        >
                                            Log in instead
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs leading-relaxed text-green-500">
                        By creating an account, you agree to our{' '}
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