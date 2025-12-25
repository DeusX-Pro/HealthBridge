import { login } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import {
    BadgeCheck,
    Building2,
    Check,
    Eye,
    EyeOff,
    FlaskConical,
    Info,
    LoaderCircle,
    ShieldCheck,
    Stethoscope,
    User,
    X,
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

const NIGERIAN_STATES = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
];

export default function MedicalLabRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        date_of_birth: '',
        gender: '',
        country: '',
        profile_picture: null as File | null,
        lab_name: '',
        mlscn_license_number: '',
        mlscn_license_expiry: '',
        cac_registration_number: '',
        state: '',
        city: '',
        address: '',
        latitude: '',
        longitude: '',
        mlscn_certificate: null as File | null,
        cac_certificate: null as File | null,
        director_id_card: null as File | null,
        facility_photo: null as File | null,
        lab_tests_offered: [] as string[],
    });

    // Document preview states
    const [mlscnLicensePreview, setMlscnLicensePreview] = useState<
        string | null
    >(null);
    const [cacCertificatePreview, setCacCertificatePreview] = useState<
        string | null
    >(null);
    const [directorIdPreview, setDirectorIdPreview] = useState<string | null>(
        null,
    );
    const [facilityPhotoPreview, setFacilityPhotoPreview] = useState<
        string | null
    >(null);

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
            return { strength, label: 'Good', color: 'bg-teal-500' };
        return { strength, label: 'Strong', color: 'bg-teal-600' };
    }, [password]);

    const handleFileChange = (
        e: any,
        setPreview: (preview: string | null) => void,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Head title="Medical Lab Registration" />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 p-4">
                <div className="w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            {/* Logo with improved styling */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 opacity-30 blur-xl"></div>
                                <img
                                    src="/assets/images/hb_logo.png"
                                    alt="logo"
                                    className="relative mx-auto h-20 w-20 object-contain"
                                />
                            </div>

                            {/* Title with gradient text */}
                            <div>
                                <h1 className="bg-gradient-to-r from-slate-900 via-teal-700 to-cyan-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                                    Join Our Diagnostic Network
                                </h1>
                                <p className="mt-3 text-base text-slate-600">
                                    Connect with healthcare providers and serve
                                    patients
                                </p>
                            </div>
                        </div>

                        {/* Alternative Registration Cards */}
                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Doctor Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm transition-shadow group-hover:shadow-md">
                                        <Stethoscope className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Doctor
                                        </h3>
                                        <a
                                            href="/doctor-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:underline hover:text-blue-700"
                                        >
                                            Register as Doctor
                                            <svg
                                                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Pharmacy Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm transition-shadow group-hover:shadow-md">
                                        <Building2 className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Pharmacy
                                        </h3>
                                        <a
                                            href="/pharmacy-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-emerald-600 transition-colors group-hover:underline hover:text-emerald-700"
                                        >
                                            Register Pharmacy
                                            <svg
                                                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 text-white shadow-sm transition-shadow group-hover:shadow-md">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Patient
                                        </h3>
                                        <a
                                            href="/register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-slate-700 transition-colors group-hover:underline hover:text-slate-900"
                                        >
                                            Register as Patient
                                            <svg
                                                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
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
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-sm">
                                        <FlaskConical className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900">
                                            Laboratory Application Form
                                        </h2>
                                        <p className="text-sm text-slate-600">
                                            Complete all sections for
                                            verification
                                        </p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                                    Step 1 of 5
                                </span>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post('/Medical Lab/register', {
                                        forceFormData: true,
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            reset(
                                                'password',
                                                'password_confirmation',
                                            );
                                        },
                                    });
                                }}
                                className="space-y-8"
                            >
                                {/* Personal Information Section */}
                                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-sm font-semibold text-teal-700">
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
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="John Doe"
                                                autoComplete="name"
                                            />
                                            <InputError message={errors.name} />
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
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="john@example.com"
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
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="phone_number"
                                                name="phone_number"
                                                type="tel"
                                                required
                                                value={data.phone_number}
                                                onChange={(e) =>
                                                    setData(
                                                        'phone_number',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="+234 801 234 5678"
                                                autoComplete="tel"
                                            />
                                            <InputError
                                                message={errors.phone_number}
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
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                type="date"
                                                autoComplete="bday"
                                            />
                                            <InputError
                                                message={errors.date_of_birth}
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
                                                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
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
                                                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                                                autoComplete="country-name"
                                            >
                                                <option value="">
                                                    Select country
                                                </option>
                                                {COUNTRIES.map((country) => (
                                                    <option
                                                        key={country}
                                                        value={country}
                                                    >
                                                        {country}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                message={errors.country}
                                            />
                                        </div>

                                        {/* Profile Picture */}
                                        <div className="space-y-2.5 md:col-span-2">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="profile_picture"
                                            >
                                                Profile Picture
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <div className="flex flex-col items-start gap-4 sm:flex-row">
                                                {profilePreview ? (
                                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md">
                                                        <img
                                                            src={profilePreview}
                                                            alt="Profile preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setProfilePreview(
                                                                    null,
                                                                )
                                                            }
                                                            className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
                                                        <div className="text-center">
                                                            <svg
                                                                className="mx-auto h-8 w-8 text-slate-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <div className="rounded-lg border border-dashed border-slate-300 p-4">
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                            id="profile_picture"
                                                            name="profile_picture"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file =
                                                                    e.target
                                                                        .files?.[0] ||
                                                                    null;
                                                                setData(
                                                                    'profile_picture',
                                                                    file,
                                                                );
                                                                handleFileChange(
                                                                    e,
                                                                    setProfilePreview,
                                                                );
                                                            }}
                                                        />
                                                        <p className="mt-2 text-xs text-slate-500">
                                                            Upload a
                                                            professional photo
                                                            (PNG, JPG, GIF up to
                                                            2MB)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <InputError
                                                message={errors.profile_picture}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information Section */}
                                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-sm font-semibold text-teal-700">
                                            2
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            Laboratory Information
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {/* Lab Name */}
                                        <div className="space-y-2.5 md:col-span-2">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="lab_name"
                                            >
                                                Laboratory Name
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="lab_name"
                                                name="lab_name"
                                                type="text"
                                                required
                                                value={data.lab_name}
                                                onChange={(e) =>
                                                    setData(
                                                        'lab_name',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="HealthCare Medical Lab"
                                            />
                                            <InputError
                                                message={errors.lab_name}
                                            />
                                        </div>

                                        {/* MLSCN License Number */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="mlscn_license_number"
                                            >
                                                MLSCN License Number
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="mlscn_license_number"
                                                name="mlscn_license_number"
                                                type="text"
                                                required
                                                value={
                                                    data.mlscn_license_number
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'mlscn_license_number',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="MLSCN123456"
                                            />
                                            <InputError
                                                message={
                                                    errors.mlscn_license_number
                                                }
                                            />
                                        </div>

                                        {/* MLSCN License Expiry */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="mlscn_license_expiry"
                                            >
                                                MLSCN License Expiry Date
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="mlscn_license_expiry"
                                                name="mlscn_license_expiry"
                                                type="date"
                                            />
                                            <InputError
                                                message={
                                                    errors.mlscn_license_expiry
                                                }
                                            />
                                        </div>

                                        {/* CAC Registration Number */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="cac_registration_number"
                                            >
                                                CAC Registration Number
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="cac_registration_number"
                                                name="cac_registration_number"
                                                type="text"
                                                placeholder="RC123456"
                                            />
                                            <InputError
                                                message={
                                                    errors.cac_registration_number
                                                }
                                            />
                                        </div>

                                        {/* Lab Tests Offered */}
                                        <div className="space-y-2.5 md:col-span-2">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="lab_tests_offered"
                                            >
                                                Laboratory Tests Offered
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional (comma-separated)
                                                </span>
                                            </Label>
                                            <textarea
                                                id="lab_tests_offered"
                                                name="lab_tests_offered"
                                                placeholder="e.g., Complete Blood Count, Urinalysis, Lipid Profile, X-Ray, MRI Scan"
                                                value={data.lab_tests_offered.join(
                                                    ', ',
                                                )}
                                                onChange={(e) => {
                                                    const tests = e.target.value
                                                        .split(',')
                                                        .map((t) => t.trim())
                                                        .filter((t) => t);
                                                    setData(
                                                        'lab_tests_offered',
                                                        tests,
                                                    );
                                                }}
                                                className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                                                rows={3}
                                            />
                                            <p className="text-xs text-slate-500">
                                                Enter the types of diagnostic
                                                tests your laboratory offers,
                                                separated by commas
                                            </p>
                                            <InputError
                                                message={
                                                    errors.lab_tests_offered
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location Section */}
                                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-sm font-semibold text-teal-700">
                                            3
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            Facility Location
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {/* State */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="state"
                                            >
                                                State
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <select
                                                id="state"
                                                name="state"
                                                required
                                                value={data.state}
                                                onChange={(e) =>
                                                    setData(
                                                        'state',
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                                            >
                                                <option value="">
                                                    Select state
                                                </option>
                                                {NIGERIAN_STATES.map(
                                                    (state) => (
                                                        <option
                                                            key={state}
                                                            value={state}
                                                        >
                                                            {state}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                            <InputError
                                                message={errors.state}
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="city"
                                            >
                                                City
                                                <span className="ml-1 text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="city"
                                                name="city"
                                                type="text"
                                                required
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        'city',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Lagos"
                                            />
                                            <InputError message={errors.city} />
                                        </div>

                                        {/* Address */}
                                        <div className="space-y-2.5 md:col-span-2">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="address"
                                            >
                                                Complete Address
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                placeholder="Street address, building number, landmark"
                                                className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                                                rows={3}
                                            />
                                            <InputError
                                                message={errors.address}
                                            />
                                        </div>

                                        {/* Latitude and Longitude */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="latitude"
                                            >
                                                Latitude
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="latitude"
                                                name="latitude"
                                                type="number"
                                                step="any"
                                                placeholder="6.5244"
                                            />
                                            <InputError
                                                message={errors.latitude}
                                            />
                                        </div>

                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="longitude"
                                            >
                                                Longitude
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <Input
                                                className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                id="longitude"
                                                name="longitude"
                                                type="number"
                                                step="any"
                                                placeholder="3.3792"
                                            />
                                            <InputError
                                                message={errors.longitude}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Documents Section */}
                                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-sm font-semibold text-teal-700">
                                            4
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            Business Documents
                                        </h3>
                                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                            For Verification
                                        </span>
                                    </div>

                                    <p className="mb-5 text-sm text-slate-600">
                                        Upload clear copies of your professional
                                        documents. All documents are securely
                                        stored and encrypted.
                                    </p>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {/* MLSCN License Document */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="mlscn_certificate"
                                            >
                                                MLSCN License Document
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="mlscn_certificate"
                                                    name="mlscn_certificate"
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            setMlscnLicensePreview,
                                                        )
                                                    }
                                                />
                                                {mlscnLicensePreview && (
                                                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                        <span className="text-xs font-medium text-green-700">
                                                            Uploaded
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                PDF or Image (Max. 5MB)
                                            </p>
                                            <InputError
                                                message={
                                                    errors.mlscn_certificate
                                                }
                                            />
                                        </div>

                                        {/* CAC Certificate */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="cac_certificate"
                                            >
                                                CAC Certificate
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="cac_certificate"
                                                    name="cac_certificate"
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            setCacCertificatePreview,
                                                        )
                                                    }
                                                />
                                                {cacCertificatePreview && (
                                                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                        <span className="text-xs font-medium text-green-700">
                                                            Uploaded
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                PDF or Image (Max. 5MB)
                                            </p>
                                            <InputError
                                                message={errors.cac_certificate}
                                            />
                                        </div>

                                        {/* Director ID Card */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="director_id_card"
                                            >
                                                Director ID Card
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="director_id_card"
                                                    name="director_id_card"
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            setDirectorIdPreview,
                                                        )
                                                    }
                                                />
                                                {directorIdPreview && (
                                                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                        <span className="text-xs font-medium text-green-700">
                                                            Uploaded
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                PDF or Image (Max. 5MB)
                                            </p>
                                            <InputError
                                                message={
                                                    errors.director_id_card
                                                }
                                            />
                                        </div>

                                        {/* Facility Photo */}
                                        <div className="space-y-2.5">
                                            <Label
                                                className="text-sm font-medium text-slate-700"
                                                htmlFor="facility_photo"
                                            >
                                                Facility Photo
                                                <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                    Optional
                                                </span>
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="facility_photo"
                                                    name="facility_photo"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            setFacilityPhotoPreview,
                                                        )
                                                    }
                                                />
                                                {facilityPhotoPreview && (
                                                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                        <span className="text-xs font-medium text-green-700">
                                                            Uploaded
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                Image (Max. 5MB)
                                            </p>
                                            <InputError
                                                message={errors.facility_photo}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Security Section */}
                                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-sm font-semibold text-teal-700">
                                            5
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            Account Security
                                        </h3>
                                        <ShieldCheck className="h-5 w-5 text-teal-600" />
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
                                                    className="h-11 border-slate-300 bg-white pr-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                    value={data.password}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        setPassword(value);
                                                        setData(
                                                            'password',
                                                            value,
                                                        );
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff size={18} />
                                                    ) : (
                                                        <Eye size={18} />
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
                                                            {
                                                                passwordStrength.label
                                                            }
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
                                                            {password.length >=
                                                            8 ? (
                                                                <Check
                                                                    size={14}
                                                                    className="text-teal-600"
                                                                />
                                                            ) : (
                                                                <X
                                                                    size={14}
                                                                    className="text-slate-300"
                                                                />
                                                            )}
                                                            <span className="text-xs text-slate-600">
                                                                8+ characters
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            {/[a-z]/.test(
                                                                password,
                                                            ) &&
                                                            /[A-Z]/.test(
                                                                password,
                                                            ) ? (
                                                                <Check
                                                                    size={14}
                                                                    className="text-teal-600"
                                                                />
                                                            ) : (
                                                                <X
                                                                    size={14}
                                                                    className="text-slate-300"
                                                                />
                                                            )}
                                                            <span className="text-xs text-slate-600">
                                                                Mixed case
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            {/\d/.test(
                                                                password,
                                                            ) ? (
                                                                <Check
                                                                    size={14}
                                                                    className="text-teal-600"
                                                                />
                                                            ) : (
                                                                <X
                                                                    size={14}
                                                                    className="text-slate-300"
                                                                />
                                                            )}
                                                            <span className="text-xs text-slate-600">
                                                                Number
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            {/[^a-zA-Z0-9]/.test(
                                                                password,
                                                            ) ? (
                                                                <Check
                                                                    size={14}
                                                                    className="text-teal-600"
                                                                />
                                                            ) : (
                                                                <X
                                                                    size={14}
                                                                    className="text-slate-300"
                                                                />
                                                            )}
                                                            <span className="text-xs text-slate-600">
                                                                Special
                                                            </span>
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
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'password_confirmation',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="••••••••"
                                                    autoComplete="new-password"
                                                    className="h-11 border-slate-300 bg-white pr-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                                    aria-label={
                                                        showConfirmPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff size={18} />
                                                    ) : (
                                                        <Eye size={18} />
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

                                    {/* Verification Notice */}
                                    <div className="mt-6 rounded-lg border border-teal-100 bg-teal-50/50 p-4">
                                        <div className="flex gap-3">
                                            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                                            <div>
                                                <p className="text-sm font-medium text-teal-900">
                                                    Verification Process
                                                </p>
                                                <p className="mt-1 text-sm text-teal-700">
                                                    Your application will be
                                                    reviewed by our medical
                                                    laboratory verification
                                                    team. This process typically
                                                    takes 2-3 business days.
                                                    You'll receive an email
                                                    notification once your
                                                    laboratory account is
                                                    approved.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-6">
                                    <Button
                                        type="submit"
                                        className="h-12 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-base font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-cyan-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                Submitting Application...
                                            </>
                                        ) : (
                                            <>
                                                <BadgeCheck className="mr-2 h-5 w-5" />
                                                Submit Laboratory Application
                                            </>
                                        )}
                                    </Button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-200"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-4 text-sm text-slate-500">
                                                Already have a laboratory
                                                account?
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <TextLink
                                            href={login()}
                                            className="inline-flex items-center text-sm font-medium text-teal-700 transition-colors hover:text-teal-800 hover:underline"
                                        >
                                            <svg
                                                className="mr-2 h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Login to your laboratory account
                                        </TextLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600">
                            By submitting this application, you agree to our{' '}
                            <a
                                href="#"
                                className="font-medium text-teal-700 transition-colors hover:text-teal-800 hover:underline"
                            >
                                Medical Laboratory Terms
                            </a>{' '}
                            and{' '}
                            <a
                                href="#"
                                className="font-medium text-teal-700 transition-colors hover:text-teal-800 hover:underline"
                            >
                                Privacy Policy
                            </a>
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Need assistance?{' '}
                            <a
                                href="#"
                                className="text-teal-600 hover:text-teal-700 hover:underline"
                            >
                                Contact Laboratory Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
