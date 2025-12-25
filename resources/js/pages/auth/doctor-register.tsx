import RegisteredDoctorController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
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
    User,
    Building2,
    FlaskConical,
    UserPlus,
    ShieldCheck,
    BadgeCheck
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

const SPECIALIZATIONS = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'Family Medicine',
    'Gastroenterology',
    'General Surgery',
    'Hematology',
    'Internal Medicine',
    'Nephrology',
    'Neurology',
    'Obstetrics and Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Otolaryngology (ENT)',
    'Pathology',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Rheumatology',
    'Urology',
    'Other',
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

const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export default function DoctorRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);

    // Document preview states
    const [medicalLicensePreview, setMedicalLicensePreview] = useState<
        string | null
    >(null);
    const [degreeCertificatePreview, setDegreeCertificatePreview] = useState<
        string | null
    >(null);
    const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
    const [affiliationLetterPreview, setAffiliationLetterPreview] = useState<
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
            return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-blue-600' };
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

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
        );
    };

    return (
        <>
            <Head title="Doctor Registration" />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
                <div className="w-full max-w-4xl">
                    {/* Header Section */}
                    <div className="mb-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            {/* Logo with improved styling */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 blur-xl opacity-30 rounded-full"></div>
                                <img
                                    src="/assets/images/hb_logo.png"
                                    alt="logo"
                                    className="relative mx-auto h-20 w-20 object-contain"
                                />
                            </div>
                            
                            {/* Title with gradient text */}
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                                    Join Our Medical Network
                                </h1>
                                <p className="mt-3 text-base text-slate-600">
                                    Connect with patients and grow your practice
                                </p>
                            </div>
                        </div>

                        {/* Alternative Registration Cards */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Patient Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-300">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 text-white shadow-sm group-hover:shadow-md transition-shadow">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Patient
                                        </h3>
                                        <a
                                            href="/patient-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 group-hover:underline"
                                        >
                                            Register as Patient
                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Pharmacy Registration Card */}
                            <div className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-300">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                                        <Building2 className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Pharmacy
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
                            <div className="group relative overflow-hidden rounded-xl border border-purple-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-purple-300">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                                        <FlaskConical className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900">
                                            Laboratory
                                        </h3>
                                        <a
                                            href="/medical-lab-register"
                                            className="mt-1 inline-flex items-center text-sm font-medium text-purple-600 transition-colors hover:text-purple-700 group-hover:underline"
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
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
                                        <Stethoscope className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900">
                                            Doctor Application Form
                                        </h2>
                                        <p className="text-sm text-slate-600">
                                            Complete all sections for verification
                                        </p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                    Step 1 of 6
                                </span>
                            </div>

                            <Form
                                {...RegisteredDoctorController.store.form()}
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
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    1
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Personal Information
                                                </h3>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                {/* Title */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="title"
                                                    >
                                                        Title
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <select
                                                        id="title"
                                                        name="title"
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                                    >
                                                        <option value="">
                                                            Select title
                                                        </option>
                                                        <option value="Dr.">
                                                            Dr.
                                                        </option>
                                                        <option value="Prof.">
                                                            Prof.
                                                        </option>
                                                        <option value="Prof. Dr.">
                                                            Prof. Dr.
                                                        </option>
                                                    </select>
                                                    <InputError
                                                        message={errors.title}
                                                    />
                                                </div>

                                                {/* Full Name */}
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
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        placeholder="doctor@example.com"
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
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                                                    className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                                    id="profile_picture"
                                                                    name="profile_picture"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) =>
                                                                        handleFileChange(
                                                                            e,
                                                                            setProfilePreview,
                                                                        )
                                                                    }
                                                                />
                                                                <p className="mt-2 text-xs text-slate-500">
                                                                    Upload a professional photo (PNG, JPG, GIF up to 2MB)
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

                                        {/* Professional Information Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    2
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Professional Information
                                                </h3>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                {/* Specialization - MULTIPLE SELECTION */}
                                                <div className="space-y-2.5 md:col-span-2">
                                                    <Label className="text-sm font-medium text-slate-700">
                                                        Specialization(s)
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Select one or more
                                                        </span>
                                                    </Label>
                                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                                        {SPECIALIZATIONS.map(
                                                            (spec) => (
                                                                <button
                                                                    key={spec}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setSelectedSpecializations(
                                                                            (
                                                                                prev,
                                                                            ) =>
                                                                                prev.includes(
                                                                                    spec,
                                                                                )
                                                                                    ? prev.filter(
                                                                                          (
                                                                                              s,
                                                                                          ) =>
                                                                                              s !==
                                                                                              spec,
                                                                                      )
                                                                                    : [
                                                                                          ...prev,
                                                                                          spec,
                                                                                      ],
                                                                        );
                                                                    }}
                                                                    className={`group relative rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none ${
                                                                        selectedSpecializations.includes(
                                                                            spec,
                                                                        )
                                                                            ? 'border-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                                                            : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50'
                                                                    }`}
                                                                >
                                                                    <span className="flex items-center justify-between gap-2">
                                                                        <span className="line-clamp-1">
                                                                            {spec}
                                                                        </span>
                                                                        {selectedSpecializations.includes(
                                                                            spec,
                                                                        ) && (
                                                                            <Check className="h-4 w-4 flex-shrink-0" />
                                                                        )}
                                                                    </span>
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="specialization"
                                                        value={selectedSpecializations.join(
                                                            ',',
                                                        )}
                                                        required
                                                    />
                                                    {selectedSpecializations.length >
                                                        0 && (
                                                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <BadgeCheck className="h-4 w-4 text-blue-600" />
                                                                <span className="text-sm font-medium text-blue-700">
                                                                    Selected ({selectedSpecializations.length}):
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {selectedSpecializations.map(
                                                                    (spec) => (
                                                                        <span
                                                                            key={spec}
                                                                            className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-1 text-xs font-medium text-white"
                                                                        >
                                                                            {spec}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setSelectedSpecializations(
                                                                                        (
                                                                                            prev,
                                                                                        ) =>
                                                                                            prev.filter(
                                                                                                (
                                                                                                    s,
                                                                                                ) =>
                                                                                                    s !==
                                                                                                    spec,
                                                                                            ),
                                                                                    );
                                                                                }}
                                                                                className="rounded-full p-0.5 transition-colors hover:bg-blue-700"
                                                                            >
                                                                                <X className="h-3 w-3" />
                                                                            </button>
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <InputError
                                                        message={
                                                            errors.specialization
                                                        }
                                                    />
                                                </div>

                                                {/* Years of Experience */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="years_of_experience"
                                                    >
                                                        Years of Experience
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="years_of_experience"
                                                        name="years_of_experience"
                                                        type="number"
                                                        required
                                                        placeholder="5"
                                                        min="0"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.years_of_experience
                                                        }
                                                    />
                                                </div>

                                                {/* Medical Council */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="medical_council"
                                                    >
                                                        Medical Council
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="medical_council"
                                                        name="medical_council"
                                                        type="text"
                                                        required
                                                        placeholder="e.g., MDCN, GMC"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.medical_council
                                                        }
                                                    />
                                                </div>

                                                {/* License Number */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="license_number"
                                                    >
                                                        License Number
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="license_number"
                                                        name="license_number"
                                                        type="text"
                                                        required
                                                        placeholder="MD123456"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.license_number
                                                        }
                                                    />
                                                </div>

                                                {/* License Expiry Date */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="license_expiry_date"
                                                    >
                                                        License Expiry Date
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="license_expiry_date"
                                                        name="license_expiry_date"
                                                        type="date"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.license_expiry_date
                                                        }
                                                    />
                                                </div>

                                                {/* Hospital Affiliation */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="hospital_affiliation"
                                                    >
                                                        Hospital Affiliation
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="hospital_affiliation"
                                                        name="hospital_affiliation"
                                                        type="text"
                                                        placeholder="Lagos University Teaching Hospital"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.hospital_affiliation
                                                        }
                                                    />
                                                </div>

                                                {/* Bio */}
                                                <div className="space-y-2.5 md:col-span-2">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="bio"
                                                    >
                                                        Professional Bio
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <textarea
                                                        id="bio"
                                                        name="bio"
                                                        placeholder="Tell patients about your experience, qualifications, and approach to healthcare..."
                                                        className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                                        rows={4}
                                                    />
                                                    <p className="text-xs text-slate-500">
                                                        Share your expertise and what makes your practice unique
                                                    </p>
                                                    <InputError
                                                        message={errors.bio}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    3
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Practice Location
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
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        required
                                                        placeholder="Lagos"
                                                    />
                                                    <InputError
                                                        message={errors.city}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Consultation Settings Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    4
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Consultation Settings
                                                </h3>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                {/* Consultation Fee */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="consultation_fee"
                                                    >
                                                        Consultation Fee (₦)
                                                        <span className="ml-1 text-red-500">
                                                            *
                                                        </span>
                                                    </Label>
                                                    <div className="relative">
                                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <span className="text-slate-500">₦</span>
                                                        </div>
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white pl-8 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                            id="consultation_fee"
                                                            name="consultation_fee"
                                                            type="number"
                                                            required
                                                            placeholder="5000"
                                                            min="0"
                                                            step="0.01"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.consultation_fee
                                                        }
                                                    />
                                                </div>

                                                {/* Consultation Duration */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="consultation_duration"
                                                    >
                                                        Consultation Duration
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <select
                                                        id="consultation_duration"
                                                        name="consultation_duration"
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                                    >
                                                        <option value="">
                                                            Select duration
                                                        </option>
                                                        <option value="15">
                                                            15 minutes
                                                        </option>
                                                        <option value="30">
                                                            30 minutes
                                                        </option>
                                                        <option value="45">
                                                            45 minutes
                                                        </option>
                                                        <option value="60">
                                                            60 minutes
                                                        </option>
                                                    </select>
                                                    <InputError
                                                        message={
                                                            errors.consultation_duration
                                                        }
                                                    />
                                                </div>

                                                {/* Consultation Type */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="consultation_type"
                                                    >
                                                        Consultation Type
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <select
                                                        id="consultation_type"
                                                        name="consultation_type"
                                                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                                    >
                                                        <option value="">
                                                            Select type
                                                        </option>
                                                        <option value="video">
                                                            Video Call
                                                        </option>
                                                        <option value="audio">
                                                            Audio Call
                                                        </option>
                                                        <option value="chat">
                                                            Chat
                                                        </option>
                                                        <option value="all">
                                                            All Types
                                                        </option>
                                                    </select>
                                                    <InputError
                                                        message={
                                                            errors.consultation_type
                                                        }
                                                    />
                                                </div>

                                                {/* Available Days */}
                                                <div className="space-y-2.5 md:col-span-2">
                                                    <Label className="text-sm font-medium text-slate-700">
                                                        Available Days
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
                                                        {DAYS_OF_WEEK.map((day) => (
                                                            <button
                                                                key={day}
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleDay(day)
                                                                }
                                                                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all hover:shadow-md ${
                                                                    selectedDays.includes(
                                                                        day,
                                                                    )
                                                                        ? 'border-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                                                        : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:bg-blue-50'
                                                                }`}
                                                            >
                                                                {day.slice(0, 3)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        name="available_days"
                                                        value={selectedDays.join(
                                                            ',',
                                                        )}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.available_days
                                                        }
                                                    />
                                                </div>

                                                {/* Available Hours */}
                                                <div className="space-y-2.5 md:col-span-2">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="available_hours"
                                                    >
                                                        Available Hours
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional (e.g., 9:00 AM - 5:00 PM)
                                                        </span>
                                                    </Label>
                                                    <Input
                                                        className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        id="available_hours"
                                                        name="available_hours"
                                                        type="text"
                                                        placeholder="9:00 AM - 5:00 PM"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.available_hours
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Documents Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    5
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Professional Documents
                                                </h3>
                                                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                    For Verification
                                                </span>
                                            </div>
                                            
                                            <p className="mb-5 text-sm text-slate-600">
                                                Upload clear copies of your professional documents. All documents are securely stored and encrypted.
                                            </p>
                                            
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                {/* Medical License */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="medical_license"
                                                    >
                                                        Medical License
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                            id="medical_license"
                                                            name="medical_license"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    setMedicalLicensePreview,
                                                                )
                                                            }
                                                        />
                                                        {medicalLicensePreview && (
                                                            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                                <span className="text-xs font-medium text-green-700">Uploaded</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        PDF or Image (Max. 5MB)
                                                    </p>
                                                    <InputError
                                                        message={
                                                            errors.medical_license
                                                        }
                                                    />
                                                </div>

                                                {/* Degree Certificate */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="degree_certificate"
                                                    >
                                                        Degree Certificate
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                            id="degree_certificate"
                                                            name="degree_certificate"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    setDegreeCertificatePreview,
                                                                )
                                                            }
                                                        />
                                                        {degreeCertificatePreview && (
                                                            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                                <span className="text-xs font-medium text-green-700">Uploaded</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        PDF or Image (Max. 5MB)
                                                    </p>
                                                    <InputError
                                                        message={
                                                            errors.degree_certificate
                                                        }
                                                    />
                                                </div>

                                                {/* ID Card */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="id_card"
                                                    >
                                                        Government ID Card
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                            id="id_card"
                                                            name="id_card"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    setIdCardPreview,
                                                                )
                                                            }
                                                        />
                                                        {idCardPreview && (
                                                            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                                <span className="text-xs font-medium text-green-700">Uploaded</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        PDF or Image (Max. 5MB)
                                                    </p>
                                                    <InputError
                                                        message={errors.id_card}
                                                    />
                                                </div>

                                                {/* Affiliation Letter */}
                                                <div className="space-y-2.5">
                                                    <Label
                                                        className="text-sm font-medium text-slate-700"
                                                        htmlFor="affiliation_letter"
                                                    >
                                                        Hospital Affiliation Letter
                                                        <span className="ml-1.5 text-xs font-normal text-slate-500">
                                                            Optional
                                                        </span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            className="h-11 border-slate-300 bg-white text-slate-900 shadow-sm transition-all file:mr-4 file:h-full file:rounded-l-md file:border-0 file:bg-slate-100 file:px-4 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                            id="affiliation_letter"
                                                            name="affiliation_letter"
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            onChange={(e) =>
                                                                handleFileChange(
                                                                    e,
                                                                    setAffiliationLetterPreview,
                                                                )
                                                            }
                                                        />
                                                        {affiliationLetterPreview && (
                                                            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                                <span className="text-xs font-medium text-green-700">Uploaded</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500">
                                                        PDF or Image (Max. 5MB)
                                                    </p>
                                                    <InputError
                                                        message={
                                                            errors.affiliation_letter
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Security Section */}
                                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700">
                                                    6
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    Account Security
                                                </h3>
                                                <ShieldCheck className="h-5 w-5 text-blue-600" />
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
                                                            className="h-11 border-slate-300 bg-white pr-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                                                        <Check size={14} className="text-blue-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">8+ characters</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {/[a-z]/.test(password) && /[A-Z]/.test(password) ? (
                                                                        <Check size={14} className="text-blue-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">Mixed case</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {/\d/.test(password) ? (
                                                                        <Check size={14} className="text-blue-600" />
                                                                    ) : (
                                                                        <X size={14} className="text-slate-300" />
                                                                    )}
                                                                    <span className="text-xs text-slate-600">Number</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {/[^a-zA-Z0-9]/.test(password) ? (
                                                                        <Check size={14} className="text-blue-600" />
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
                                                            className="h-11 border-slate-300 bg-white pr-10 text-slate-900 shadow-sm transition-all hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowConfirmPassword(
                                                                    !showConfirmPassword,
                                                                )
                                                            }
                                                            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-slate-500 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                                            {/* Verification Notice */}
                                            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                                                <div className="flex gap-3">
                                                    <Info className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm text-blue-900 font-medium">
                                                            Verification Process
                                                        </p>
                                                        <p className="mt-1 text-sm text-blue-700">
                                                            Your application will be reviewed by our medical verification team. This process typically takes 2-3 business days. You'll receive an email notification once your account is approved.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-6">
                                            <Button
                                                type="submit"
                                                className="h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <>
                                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                        Submitting Application...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="mr-2 h-5 w-5" />
                                                        Submit Application
                                                    </>
                                                )}
                                            </Button>

                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-slate-200"></div>
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <span className="bg-white px-4 text-sm text-slate-500">
                                                        Already have a medical account?
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <TextLink
                                                    href={login()}
                                                    className="inline-flex items-center text-sm font-medium text-blue-700 transition-colors hover:text-blue-800 hover:underline"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                    </svg>
                                                    Login to your medical account
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
                            By submitting this application, you agree to our{' '}
                            <a
                                href="#"
                                className="font-medium text-blue-700 transition-colors hover:text-blue-800 hover:underline"
                            >
                                Medical Professional Terms
                            </a>{' '}
                            and{' '}
                            <a
                                href="#"
                                className="font-medium text-blue-700 transition-colors hover:text-blue-800 hover:underline"
                            >
                                Privacy Policy
                            </a>
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            Need assistance? <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Contact Medical Support</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}