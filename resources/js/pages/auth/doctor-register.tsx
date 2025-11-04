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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-4">
                <div className="w-full max-w-4xl">
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
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2.5 text-sm font-semibold text-blue-700">
                            <Stethoscope className="h-4 w-4" />
                            Healthcare Professional Registration
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-blue-700">
                            Join Our Network of Doctors
                        </h1>
                        <p className="mt-3 text-base text-blue-700">
                            Fill in your details to start providing quality
                            healthcare
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="rounded-3xl border border-blue-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:p-10">
                        <Form
                            {...RegisteredDoctorController.store.form()}
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
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                1
                                            </div>
                                            Personal Information
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Title */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="title"
                                                >
                                                    Title
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="title"
                                                    name="title"
                                                    className="h-11 w-full rounded-md border border-blue-300 px-3 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="name"
                                                >
                                                    Full Name
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="email"
                                                >
                                                    Email Address
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="phone_number"
                                                >
                                                    Phone Number
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="date_of_birth"
                                                >
                                                    Date of Birth
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="gender"
                                                >
                                                    Gender
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="h-11 w-full rounded-md border border-blue-300 px-3 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="country"
                                                >
                                                    Country
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    className="h-11 w-full rounded-md border border-blue-300 px-3 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="profile_picture"
                                                >
                                                    Profile Picture
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="flex items-start gap-4">
                                                    {profilePreview && (
                                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-200 shadow-sm">
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
                                                            className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-blue-50 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        <p className="mt-1.5 text-xs text-blue-500">
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

                                    {/* Professional Information Section */}
                                    <div className="border-t border-blue-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                2
                                            </div>
                                            Professional Information
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Specialization - MULTIPLE SELECTION */}
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label className="text-sm font-semibold text-blue-600">
                                                    Specialization(s)
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                    <span className="ml-1 text-xs font-normal text-blue-500">
                                                        (Select one or more)
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
                                                                        ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                                                                        : 'border-blue-300 bg-white text-blue-700 hover:border-blue-500 hover:bg-blue-50'
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
                                                    <div className="flex flex-wrap gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
                                                        <span className="text-xs font-semibold text-blue-700">
                                                            Selected (
                                                            {
                                                                selectedSpecializations.length
                                                            }
                                                            ):
                                                        </span>
                                                        {selectedSpecializations.map(
                                                            (spec) => (
                                                                <span
                                                                    key={spec}
                                                                    className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white"
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
                                                )}
                                                <p className="text-xs text-blue-500">
                                                    Select all specializations
                                                    that apply to your practice
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.specialization
                                                    }
                                                />
                                            </div>

                                            {/* Years of Experience */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="years_of_experience"
                                                >
                                                    Years of Experience
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="medical_council"
                                                >
                                                    Medical Council
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="license_number"
                                                >
                                                    License Number
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="license_expiry_date"
                                                >
                                                    License Expiry Date
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="hospital_affiliation"
                                                >
                                                    Hospital Affiliation
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="bio"
                                                >
                                                    Professional Bio
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    placeholder="Tell patients about your experience and approach to healthcare..."
                                                    className="w-full resize-none rounded-md border border-blue-300 px-3 py-2.5 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                                    rows={4}
                                                />
                                                <InputError
                                                    message={errors.bio}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Section */}
                                    <div className="border-t border-blue-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                3
                                            </div>
                                            Location
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* State */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
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
                                                    className="h-11 w-full rounded-md border border-blue-300 px-3 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="city"
                                                >
                                                    City
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                    <div className="border-t border-blue-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                4
                                            </div>
                                            Consultation Settings
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Consultation Fee */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="consultation_fee"
                                                >
                                                    Consultation Fee (₦)
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                    id="consultation_fee"
                                                    name="consultation_fee"
                                                    type="number"
                                                    required
                                                    placeholder="5000"
                                                    min="0"
                                                    step="0.01"
                                                />
                                                <InputError
                                                    message={
                                                        errors.consultation_fee
                                                    }
                                                />
                                            </div>

                                            {/* Consultation Duration */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="consultation_duration"
                                                >
                                                    Consultation Duration
                                                    (minutes)
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="consultation_duration"
                                                    name="consultation_duration"
                                                    className="h-11 w-full rounded-md border border-blue-300 px-3 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="consultation_type"
                                                >
                                                    Consultation Type
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="consultation_type"
                                                    name="consultation_type"
                                                    className="h-11 w-full rounded-md border border-blue-300 px-3 text-sm text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
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
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label className="text-sm font-semibold text-blue-600">
                                                    Available Days
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {DAYS_OF_WEEK.map((day) => (
                                                        <button
                                                            key={day}
                                                            type="button"
                                                            onClick={() =>
                                                                toggleDay(day)
                                                            }
                                                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                                                                selectedDays.includes(
                                                                    day,
                                                                )
                                                                    ? 'border-blue-600 bg-blue-600 text-white'
                                                                    : 'border-blue-300 bg-white text-blue-700 hover:border-blue-500 hover:bg-blue-50'
                                                            }`}
                                                        >
                                                            {day}
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
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="available_hours"
                                                >
                                                    Available Hours
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional, e.g., 9:00 AM
                                                        - 5:00 PM)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                    <div className="border-t border-blue-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                5
                                            </div>
                                            Professional Documents
                                        </h2>
                                        <p className="mb-5 text-sm text-blue-600">
                                            Upload clear copies of your
                                            professional documents for
                                            verification
                                        </p>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Medical License */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="medical_license"
                                                >
                                                    Medical License
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-blue-50 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-blue-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-blue-500">
                                                    PDF or Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.medical_license
                                                    }
                                                />
                                            </div>

                                            {/* Degree Certificate */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="degree_certificate"
                                                >
                                                    Degree Certificate
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-blue-50 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-blue-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-blue-500">
                                                    PDF or Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.degree_certificate
                                                    }
                                                />
                                            </div>

                                            {/* ID Card */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="id_card"
                                                >
                                                    Government ID Card
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-blue-50 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-blue-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-blue-500">
                                                    PDF or Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={errors.id_card}
                                                />
                                            </div>

                                            {/* Affiliation Letter */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="affiliation_letter"
                                                >
                                                    Hospital Affiliation Letter
                                                    <span className="ml-1 text-xs text-blue-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-blue-300 text-blue-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-blue-50 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-blue-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-blue-500">
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
                                    <div className="border-t border-blue-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-blue-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                                6
                                            </div>
                                            Security
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Password */}
                                            <div>
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-blue-300 pr-10 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-blue-500 transition-colors hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff
                                                                size={18}
                                                                className="text-blue-700"
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={18}
                                                                className="text-blue-700"
                                                            />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Password Strength Indicator */}
                                                {password && (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-200">
                                                                <div
                                                                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                                                    style={{
                                                                        width: `${(passwordStrength.strength / 5) * 100}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-blue-600">
                                                                {
                                                                    passwordStrength.label
                                                                }
                                                            </span>
                                                        </div>
                                                        <ul className="space-y-1 text-xs text-blue-600">
                                                            <li className="flex items-center gap-1.5">
                                                                {password.length >=
                                                                8 ? (
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-blue-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-blue-400"
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
                                                                        className="text-blue-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-blue-400"
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
                                                                        className="text-blue-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-blue-400"
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
                                                                        className="text-blue-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-blue-400"
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
                                            <div>
                                                <Label
                                                    className="text-sm font-semibold text-blue-600"
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
                                                        className="h-11 border-blue-300 pr-10 text-blue-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword,
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-blue-500 transition-colors hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff
                                                                size={18}
                                                                className="text-blue-700"
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={18}
                                                                className="text-blue-700"
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
                                    <div className="flex gap-3 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                                        <Info className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                                        <div className="text-sm text-indigo-900">
                                            <p className="mb-2 font-semibold">
                                                Verification Process
                                            </p>
                                            <p>
                                                Your application will be
                                                reviewed by our medical
                                                verification team. This
                                                typically takes 2-3 business
                                                days. You'll receive an email
                                                once your account is approved.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                                Submitting your application...
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-blue-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-3 text-blue-500">
                                                Already registered?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <TextLink
                                            href={login()}
                                            className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                                        >
                                            Login to your account
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs leading-relaxed text-blue-500">
                        By registering, you agree to our{' '}
                        <a
                            href="#"
                            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                        >
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
