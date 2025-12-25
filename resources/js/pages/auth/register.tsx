import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import {
    Check,
    Eye,
    EyeOff,
    Info,
    LoaderCircle,
    Stethoscope,
    X,
    Building2,
    FlaskConical,
    UserPlus
} from 'lucide-react';
import { useMemo, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// List of all countries
const COUNTRIES = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-4">
                <div className="w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            {/* Logo with improved styling */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 blur-xl opacity-30 rounded-full"></div>
                                <img
                                    src="/assets/images/hb_logo.png"
                                    alt="logo"
                                    className="relative mx-auto h-20 w-20 object-contain"
                                />
                            </div>
                            
                            {/* Title with gradient text */}
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-700 to-green-600 bg-clip-text text-transparent">
                                    Create Your Account
                                </h1>
                                <p className="mt-3 text-base text-slate-600">
                                    Join our healthcare community today
                                </p>
                            </div>
                        </div>

                        {/* Professional Registration Cards */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Doctor Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                                        <Stethoscope className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Healthcare Professional
                                        </h3>
                                        <a
                                            href="/doctor-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 group-hover:underline"
                                        >
                                            Register as Doctor
                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Pharmacy Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-200">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                                        <Building2 className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Pharmacy Owner
                                        </h3>
                                        <a
                                            href="/pharmacy-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 group-hover:underline"
                                        >
                                            Register Pharmacy
                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Lab Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-violet-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-violet-200">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                                        <FlaskConical className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Medical Laboratory
                                        </h3>
                                        <a
                                            href="/medical-lab-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 group-hover:underline"
                                        >
                                            Register Lab
                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Container */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg backdrop-blur-sm">
                        <div className="p-8 md:p-10">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-900">
                                    <UserPlus className="mr-2 inline-block h-5 w-5 text-emerald-600" />
                                    Personal Account Registration
                                </h2>
                            </div>

                            <Form
                                {...RegisteredUserController.store.form()}
                                resetOnSuccess={[
                                    'password',
                                    'password_confirmation',
                                ]}
                                disableWhileProcessing
                                className="space-y-8"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        {/* Personal Information Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-semibold text-emerald-700">
                                                    1
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Personal Information
                                                </h3>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                {/* Name */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="name"
                                                    >
                                                        Full Name
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="email"
                                                    >
                                                        Email Address
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="phone_number"
                                                    >
                                                        Phone Number
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="date_of_birth"
                                                    >
                                                        Date of Birth
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="gender"
                                                    >
                                                        Gender
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <select
                                                        id="gender"
                                                        name="gender"
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
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

                                                {/* Marital Status */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="marital_status"
                                                    >
                                                        Marital Status
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <select
                                                        id="marital_status"
                                                        name="marital_status"
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                                    >
                                                        <option value="">
                                                            Select status
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
                                                        message={
                                                            errors.marital_status
                                                        }
                                                    />
                                                </div>

                                                {/* Country */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="country"
                                                    >
                                                        Country
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                                        autoComplete="country-name"
                                                    >
                                                        <option value="">
                                                            Select country
                                                        </option>
                                                        {COUNTRIES.map(
                                                            (country) => (
                                                                <option
                                                                    key={country}
                                                                    value={country}
                                                                >
                                                                    {country}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                    <InputError
                                                        message={errors.country}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Profile Details Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    2
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Profile Details
                                                </h3>
                                            </div>
                                            
                                            <div className="space-y-5">
                                                {/* Bio */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="bio"
                                                    >
                                                        Bio
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <textarea
                                                        id="bio"
                                                        name="bio"
                                                        placeholder="Tell us a bit about yourself..."
                                                        className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                                                        rows={3}
                                                    />
                                                    <InputError
                                                        message={errors.bio}
                                                    />
                                                </div>

                                                {/* Profile Picture */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="profile_picture"
                                                    >
                                                        Profile Picture
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <div className="flex flex-col sm:flex-row items-start gap-4">
                                                        {profilePreview ? (
                                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md">
                                                                <img
                                                                    src={
                                                                        profilePreview
                                                                    }
                                                                    alt="Profile preview"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setProfilePreview(null)}
                                                                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                                >
                                                                    <X size={14} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="h-24 w-24 flex-shrink-0 rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center">
                                                                <div className="text-center">
                                                                    <svg className="mx-auto h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <div className="rounded-lg border border-dashed border-slate-300 p-4">
                                                                <Input
                                                                    className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                                    id="profile_picture"
                                                                    name="profile_picture"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={
                                                                        handleFileChange
                                                                    }
                                                                />
                                                                <p className="mt-2 text-xs text-slate-500">
                                                                    Upload a profile photo (PNG, JPG, GIF up to 2MB)
                                                                </p>
                                                            </div>
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
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-sm font-semibold text-amber-700">
                                                    3
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Security Settings
                                                </h3>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                {/* Password */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="password"
                                                    >
                                                        Password
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white pr-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                                                            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                            aria-label={
                                                                showPassword
                                                                    ? 'Hide password'
                                                                    : 'Show password'
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff
                                                                    size={18}
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    size={18}
                                                                />
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Password Strength Indicator */}
                                                    {password && (
                                                        <div className="space-y-3 pt-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium text-slate-700">
                                                                    Password strength
                                                                </span>
                                                                <span className="text-xs font-semibold text-slate-900">
                                                                    {passwordStrength.label}
                                                                </span>
                                                            </div>
                                                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                                                <div
                                                                    className={`h-full transition-all duration-500 ${passwordStrength.color}`}
                                                                    style={{
                                                                        width: `${(passwordStrength.strength / 5) * 100}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="flex items-center gap-1.5">
                                                                    {password.length >= 8 ? (
                                                                        <Check size={14} className="text-emerald-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">8+ characters</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {/[a-z]/.test(password) && /[A-Z]/.test(password) ? (
                                                                        <Check size={14} className="text-emerald-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">Mixed case</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {/\d/.test(password) ? (
                                                                        <Check size={14} className="text-emerald-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">Number</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {/[^a-zA-Z0-9]/.test(password) ? (
                                                                        <Check size={14} className="text-emerald-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">Special</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <InputError
                                                        message={errors.password}
                                                    />
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
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
                                                            className="h-11 border-slate-300 bg-white pr-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowConfirmPassword(
                                                                    !showConfirmPassword,
                                                                )
                                                            }
                                                            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                            aria-label={
                                                                showConfirmPassword
                                                                    ? 'Hide password'
                                                                    : 'Show password'
                                                            }
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff
                                                                    size={18}
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    size={18}
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

                                            {/* Privacy Notice */}
                                            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                                                <div className="flex gap-3">
                                                    <Info className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm text-blue-900">
                                                            Your personal information is protected with end-to-end encryption. 
                                                            We never share your data without explicit consent.
                                                        </p>
                                                        <p className="mt-1 text-xs text-blue-700">
                                                            Read our <a href="#" className="font-medium underline hover:text-blue-800">Privacy Policy</a> for more details.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-6">
                                            <Button
                                                type="submit"
                                                className="h-12 w-full bg-gradient-to-r from-emerald-600 to-green-600 text-base font-semibold text-white shadow-md transition-all hover:from-emerald-700 hover:to-green-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <>
                                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                        Creating Account...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="mr-2 h-5 w-5" />
                                                        Create Account
                                                    </>
                                                )}
                                            </Button>

                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-slate-200"></div>
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <span className="bg-white px-4 text-sm text-slate-500">
                                                        Already registered?
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <TextLink
                                                    href={login()}
                                                    className="inline-flex items-center text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign in to your account
                                                </TextLink>
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
                            By creating an account, you agree to our{' '}
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
                            Need help? <a href="#" className="text-emerald-600 hover:text-emerald-700 hover:underline">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}