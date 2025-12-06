import { login } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import {
    Check,
    Eye,
    EyeOff,
    Info,
    LoaderCircle,
    Microscope,
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
    const [mlscnLicensePreview, setMlscnLicensePreview] = useState<string | null>(
        null,
    );
    const [cacCertificatePreview, setCacCertificatePreview] = useState<
        string | null
    >(null);
    const [directorIdPreview, setDirectorIdPreview] = useState<
        string | null
    >(null);
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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-indigo-50 to-white p-4">
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
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-5 py-2.5 text-sm font-semibold text-teal-700">
                            <Microscope className="h-4 w-4" />
                            Medical Lab Professional Registration
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-teal-700">
                            Join Our Medical Lab Network
                        </h1>
                        <p className="mt-3 text-base text-teal-700">
                            Register your Medical Lab to start serving patients
                            online
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="rounded-3xl border border-teal-200 bg-white p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:p-10">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                post('/Medical Lab/register', {
                                    forceFormData: true,
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        reset('password', 'password_confirmation');
                                    },
                                });
                            }}
                            className="flex flex-col gap-8"
                        >
                            <>
                                    {/* Personal Information Section */}
                                    <div>
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-teal-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                                                1
                                            </div>
                                            Personal Information
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Name */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="name"
                                                >
                                                    Full Name
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="John Doe"
                                                    autoComplete="name"
                                                />
                                                <InputError message={errors.name} />
                                            </div>

                                            {/* Email */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="email"
                                                >
                                                    Email Address
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="john@example.com"
                                                    autoComplete="email"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="phone_number"
                                                >
                                                    Phone Number
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="phone_number"
                                                    name="phone_number"
                                                    type="tel"
                                                    required
                                                    value={data.phone_number}
                                                    onChange={(e) => setData('phone_number', e.target.value)}
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
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="date_of_birth"
                                                >
                                                    Date of Birth
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="gender"
                                                >
                                                    Gender
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    className="h-11 w-full rounded-md border border-teal-300 px-3 text-sm text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
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
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="country"
                                                >
                                                    Country
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    className="h-11 w-full rounded-md border border-teal-300 px-3 text-sm text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
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
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="profile_picture"
                                                >
                                                    Profile Picture
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="flex items-start gap-4">
                                                    {profilePreview && (
                                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-teal-200 shadow-sm">
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
                                                            className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-teal-50 file:px-4 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                            id="profile_picture"
                                                            name="profile_picture"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0] || null;
                                                                setData('profile_picture', file);
                                                                handleFileChange(e, setProfilePreview);
                                                            }}
                                                        />
                                                        <p className="mt-1.5 text-xs text-teal-500">
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

                                    {/* Business Information Section */}
                                    <div className="border-t border-teal-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-teal-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                                                2
                                            </div>
                                            Business Information
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Business Name */}
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="lab_name"
                                                >
                                                    Lab Name
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="lab_name"
                                                    name="lab_name"
                                                    type="text"
                                                    required
                                                    value={data.lab_name}
                                                    onChange={(e) => setData('lab_name', e.target.value)}
                                                    placeholder="HealthCare Medical Lab"
                                                />
                                                <InputError
                                                    message={
                                                        errors.lab_name
                                                    }
                                                />
                                            </div>

                                            {/* MLSCN License Number */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="mlscn_license_number"
                                                >
                                                    MLSCN License Number
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="mlscn_license_number"
                                                    name="mlscn_license_number"
                                                    type="text"
                                                    required
                                                    value={data.mlscn_license_number}
                                                    onChange={(e) => setData('mlscn_license_number', e.target.value)}
                                                    placeholder="MLSCN123456"
                                                />
                                                <InputError
                                                    message={
                                                        errors.mlscn_license_number
                                                    }
                                                />
                                            </div>

                                            {/* MLSCN License Expiry */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="mlscn_license_expiry"
                                                >
                                                    MLSCN License Expiry Date
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="cac_registration_number"
                                                >
                                                    CAC Registration Number
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="lab_tests_offered"
                                                >
                                                    Lab Tests Offered
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional, comma-separated)
                                                    </span>
                                                </Label>
                                                <textarea
                                                    id="lab_tests_offered"
                                                    name="lab_tests_offered"
                                                    placeholder="e.g., Blood Test, Urinalysis, X-Ray, MRI"
                                                    value={data.lab_tests_offered.join(', ')}
                                                    onChange={(e) => {
                                                        const tests = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                                                        setData('lab_tests_offered', tests);
                                                    }}
                                                    className="w-full resize-none rounded-md border border-teal-300 px-3 py-2.5 text-sm text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                                                    rows={3}
                                                />
                                                <p className="text-xs text-teal-500">
                                                    Enter the types of lab tests your facility offers, separated by commas
                                                </p>
                                                <InputError
                                                    message={errors.lab_tests_offered}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Section */}
                                    <div className="border-t border-teal-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-teal-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                                                3
                                            </div>
                                            Location
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* State */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
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
                                                    onChange={(e) => setData('state', e.target.value)}
                                                    className="h-11 w-full rounded-md border border-teal-300 px-3 text-sm text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
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
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="city"
                                                >
                                                    City
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    required
                                                    value={data.city}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    placeholder="Lagos"
                                                />
                                                <InputError
                                                    message={errors.city}
                                                />
                                            </div>

                                            {/* Address */}
                                            <div className="grid gap-2 md:col-span-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="address"
                                                >
                                                    Address
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <textarea
                                                    id="address"
                                                    name="address"
                                                    placeholder="Street address, building number"
                                                    className="w-full resize-none rounded-md border border-teal-300 px-3 py-2.5 text-sm text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none"
                                                    rows={3}
                                                />
                                                <InputError
                                                    message={errors.address}
                                                />
                                            </div>

                                            {/* Latitude and Longitude */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="latitude"
                                                >
                                                    Latitude
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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

                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="longitude"
                                                >
                                                    Longitude
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <Input
                                                    className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                    <div className="border-t border-teal-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-teal-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                                                4
                                            </div>
                                            Business Documents
                                        </h2>
                                        <p className="mb-5 text-sm text-teal-600">
                                            Upload clear copies of your business
                                            documents for verification
                                        </p>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* MLSCN License Document */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="mlscn_certificate"
                                                >
                                                    MLSCN License Document
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-teal-50 file:px-4 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-teal-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-teal-500">
                                                    PDF or Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.mlscn_certificate
                                                    }
                                                />
                                            </div>

                                            {/* CAC Certificate */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="cac_certificate"
                                                >
                                                    CAC Certificate
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-teal-50 file:px-4 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-teal-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-teal-500">
                                                    PDF or Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.cac_certificate
                                                    }
                                                />
                                            </div>

                                            {/* Director ID Card */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="director_id_card"
                                                >
                                                    Director ID Card
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-teal-50 file:px-4 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-teal-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-teal-500">
                                                    PDF or Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.director_id_card
                                                    }
                                                />
                                            </div>

                                            {/* Facility Photo */}
                                            <div className="grid gap-2">
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="facility_photo"
                                                >
                                                    Facility Photo
                                                    <span className="ml-1 text-xs text-teal-500">
                                                        (Optional)
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-teal-300 text-teal-900 shadow-sm transition-all file:mr-4 file:h-full file:border-0 file:bg-teal-50 file:px-4 file:text-sm file:font-semibold file:text-teal-700 hover:file:bg-teal-100 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                        <Check className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-teal-600" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-teal-500">
                                                    Image (Max. 5MB)
                                                </p>
                                                <InputError
                                                    message={
                                                        errors.facility_photo
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Section */}
                                    <div className="border-t border-teal-200 pt-6">
                                        <h2 className="mb-4 flex items-center text-lg font-semibold text-teal-700">
                                            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                                                5
                                            </div>
                                            Security
                                        </h2>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {/* Password */}
                                            <div>
                                                <Label
                                                    className="text-sm font-semibold text-teal-600"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        className="h-11 border-teal-300 pr-10 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
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
                                                            const value = e.target.value;
                                                            setPassword(value);
                                                            setData('password', value);
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword,
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-teal-500 transition-colors hover:text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff
                                                                size={18}
                                                                className="text-teal-700"
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={18}
                                                                className="text-teal-700"
                                                            />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Password Strength Indicator */}
                                                {password && (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-teal-200">
                                                                <div
                                                                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                                                    style={{
                                                                        width: `${(passwordStrength.strength / 5) * 100}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium text-teal-600">
                                                                {
                                                                    passwordStrength.label
                                                                }
                                                            </span>
                                                        </div>
                                                        <ul className="space-y-1 text-xs text-teal-600">
                                                            <li className="flex items-center gap-1.5">
                                                                {password.length >=
                                                                8 ? (
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-teal-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-teal-400"
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
                                                                        className="text-teal-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-teal-400"
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
                                                                        className="text-teal-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-teal-400"
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
                                                                        className="text-teal-600"
                                                                    />
                                                                ) : (
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-teal-400"
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
                                                    className="text-sm font-semibold text-teal-600"
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
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        placeholder="••••••••"
                                                        autoComplete="new-password"
                                                        className="h-11 border-teal-300 pr-10 text-teal-900 shadow-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword,
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-teal-500 transition-colors hover:text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff
                                                                size={18}
                                                                className="text-teal-700"
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={18}
                                                                className="text-teal-700"
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
                                                reviewed by our verification
                                                team. This typically takes 2-3
                                                business days. You'll receive an
                                                email once your account is
                                                approved.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="h-12 w-full bg-gradient-to-r from-teal-600 to-indigo-600 text-base font-semibold text-white shadow-md transition-all hover:from-teal-700 hover:to-indigo-700 hover:shadow-lg disabled:opacity-50"
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
                                            <span className="w-full border-t border-teal-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-3 text-teal-500">
                                                Already registered?
                                            </span>
                                        </div>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center">
                                        <TextLink
                                            href={login()}
                                            className="text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 hover:underline"
                                        >
                                            Login to your account
                                        </TextLink>
                                    </div>
                            </>
                        </form>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs leading-relaxed text-teal-500">
                        By registering, you agree to our{' '}
                        <a
                            href="#"
                            className="font-semibold text-teal-600 transition-colors hover:text-teal-700 hover:underline"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="font-semibold text-teal-600 transition-colors hover:text-teal-700 hover:underline"
                        >
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
