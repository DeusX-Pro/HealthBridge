import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Briefcase,
    Building2,
    Calendar,
    Camera,
    CreditCard,
    Globe,
    Heart,
    Home,
    Languages,
    Mail,
    MapPin,
    Phone,
    Pill,
    Plus,
    Ruler,
    Save,
    Scale,
    Shield,
    Stethoscope,
    Syringe,
    Trash2,
    Upload,
    User,
    Users,
    Video,
    X,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Profile', href: '#' },
    { title: 'Edit', href: '#' },
];

interface Patient {
    id: number;
    user_id: number;
    uuid: string;

    // PERSONAL INFORMATION
    national_id: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    occupation: string | null;

    // HEALTH & MEDICAL INFORMATION
    blood_type: string | null;
    allergies: string | null;
    chronic_conditions: string | null;
    current_medications: string | null;
    surgical_history: string | null;
    family_medical_history: string | null;
    immunization_record: string | null;
    height: number | null;
    weight: number | null;
    bmi: number | null;
    lifestyle_habits: string | null;
    has_disability: boolean;
    disability_details: string | null;

    // EMERGENCY CONTACT INFORMATION
    emergency_contact_name: string | null;
    emergency_contact_relationship: string | null;
    emergency_contact_phone: string | null;
    emergency_contact_email: string | null;
    preferred_hospital: string | null;

    // SYSTEM & PREFERENCES
    preferred_language: string | null;
    preferred_consultation_type: 'video' | 'audio' | 'text';
    preferred_doctor_gender: 'male' | 'female' | 'any';
    qr_code_path: string | null;
    status: 'active' | 'pending' | 'inactive';

    created_at: string;
    updated_at: string;
}

interface UserData {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone_number: string;
    date_of_birth: string | null;
    email_verified_at: string | null;
    role: 'admin' | 'patient' | 'doctor';
    profile_picture: string | null;
    country: string | null;
    status: 'active' | 'pending' | 'inactive';
    gender: 'male' | 'female' | 'other' | null;
    bio: string | null;
    created_at: string;
    patient?: Patient;
}

interface PageProps {
    user: UserData;
    [key: string]: any;
}

// List of countries
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

export default function EditProfile() {
    const { user } = usePage<PageProps>().props;
    const patient = user.patient;
    const [previewImage, setPreviewImage] = useState<string | null>(
        user.profile_picture ? `/storage/${user.profile_picture}` : null,
    );
    const [processing, setProcessing] = useState(false);

    // Parse JSON arrays
    const parseToArray = (value: string | null): string[] => {
        if (!value) return [''];
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : [''];
        } catch {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean);
        }
    };

    // Medical arrays state
    const [allergies, setAllergies] = useState<string[]>(
        parseToArray(patient?.allergies ?? null),
    );
    const [chronicConditions, setChronicConditions] = useState<string[]>(
        parseToArray(patient?.chronic_conditions ?? null),
    );
    const [currentMedications, setCurrentMedications] = useState<string[]>(
        parseToArray(patient?.current_medications ?? null),
    );
    const [surgicalHistory, setSurgicalHistory] = useState<string[]>(
        parseToArray(patient?.surgical_history ?? null),
    );
    const [familyMedicalHistory, setFamilyMedicalHistory] = useState<string[]>(
        parseToArray(patient?.family_medical_history ?? null),
    );
    const [immunizationRecord, setImmunizationRecord] = useState<string[]>(
        parseToArray(patient?.immunization_record ?? null),
    );

    const [formData, setFormData] = useState({
        // User fields
        name: user.name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        date_of_birth: user.date_of_birth || '',
        country: user.country || '',
        gender: user.gender || '',
        bio: user.bio || '',
        profile_picture: null as File | null,

        // Personal information
        national_id: patient?.national_id || '',
        address: patient?.address || '',
        city: patient?.city || '',
        state: patient?.state || '',
        postal_code: patient?.postal_code || '',
        occupation: patient?.occupation || '',

        // Health metrics
        blood_type: patient?.blood_type || '',
        height: patient?.height?.toString() || '',
        weight: patient?.weight?.toString() || '',
        lifestyle_habits: patient?.lifestyle_habits || '',
        has_disability: patient?.has_disability || false,
        disability_details: patient?.disability_details || '',

        // Emergency contact
        emergency_contact_name: patient?.emergency_contact_name || '',
        emergency_contact_relationship:
            patient?.emergency_contact_relationship || '',
        emergency_contact_phone: patient?.emergency_contact_phone || '',
        emergency_contact_email: patient?.emergency_contact_email || '',
        preferred_hospital: patient?.preferred_hospital || '',

        // Preferences
        preferred_language: patient?.preferred_language || '',
        preferred_consultation_type:
            patient?.preferred_consultation_type || 'video',
        preferred_doctor_gender: patient?.preferred_doctor_gender || 'any',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, profile_picture: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Array handlers
    const addItem = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
        setter((prev) => [...prev, '']);
    };

    const removeItem = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        index: number,
    ) => {
        setter((prev) => {
            const newArray = prev.filter((_, i) => i !== index);
            return newArray.length > 0 ? newArray : [''];
        });
    };

    const updateItem = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        index: number,
        value: string,
    ) => {
        setter((prev) => {
            const newArray = [...prev];
            newArray[index] = value;
            return newArray;
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const submitData = new FormData();

            // Helper function to append only non-empty values
            const appendIfNotEmpty = (key: string, value: any) => {
                if (value !== null && value !== undefined && value !== '') {
                    submitData.append(key, value);
                }
            };

            // User fields (required and optional)
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone_number', formData.phone_number);
            appendIfNotEmpty('date_of_birth', formData.date_of_birth);
            appendIfNotEmpty('country', formData.country);
            appendIfNotEmpty('gender', formData.gender);
            appendIfNotEmpty('bio', formData.bio);

            if (formData.profile_picture) {
                submitData.append('profile_picture', formData.profile_picture);
            }

            // Personal information (only if patient exists)
            if (patient) {
                appendIfNotEmpty('national_id', formData.national_id);
                appendIfNotEmpty('address', formData.address);
                appendIfNotEmpty('city', formData.city);
                appendIfNotEmpty('state', formData.state);
                appendIfNotEmpty('postal_code', formData.postal_code);
                appendIfNotEmpty('occupation', formData.occupation);

                // Health metrics
                appendIfNotEmpty('blood_type', formData.blood_type);
                appendIfNotEmpty('height', formData.height);
                appendIfNotEmpty('weight', formData.weight);
                appendIfNotEmpty('lifestyle_habits', formData.lifestyle_habits);
                submitData.append(
                    'has_disability',
                    formData.has_disability ? '1' : '0',
                );
                if (formData.has_disability) {
                    appendIfNotEmpty(
                        'disability_details',
                        formData.disability_details,
                    );
                }

                // Emergency contact
                appendIfNotEmpty(
                    'emergency_contact_name',
                    formData.emergency_contact_name,
                );
                appendIfNotEmpty(
                    'emergency_contact_relationship',
                    formData.emergency_contact_relationship,
                );
                appendIfNotEmpty(
                    'emergency_contact_phone',
                    formData.emergency_contact_phone,
                );
                appendIfNotEmpty(
                    'emergency_contact_email',
                    formData.emergency_contact_email,
                );
                appendIfNotEmpty(
                    'preferred_hospital',
                    formData.preferred_hospital,
                );

                // Preferences
                appendIfNotEmpty(
                    'preferred_language',
                    formData.preferred_language,
                );
                submitData.append(
                    'preferred_consultation_type',
                    formData.preferred_consultation_type,
                );
                submitData.append(
                    'preferred_doctor_gender',
                    formData.preferred_doctor_gender,
                );

                // Arrays - filter empty values and append with correct format
                const filterArray = (arr: string[]) =>
                    arr.filter((item) => item.trim() !== '');

                const appendArray = (fieldName: string, array: string[]) => {
                    const filtered = filterArray(array);
                    if (filtered.length > 0) {
                        filtered.forEach((item) => {
                            submitData.append(`${fieldName}[]`, item);
                        });
                    }
                };

                appendArray('allergies', allergies);
                appendArray('chronic_conditions', chronicConditions);
                appendArray('current_medications', currentMedications);
                appendArray('surgical_history', surgicalHistory);
                appendArray('family_medical_history', familyMedicalHistory);
                appendArray('immunization_record', immunizationRecord);
            }

            router.post('/patient/profile/update', submitData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setProcessing(false);
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors);
                    setErrors(errors);
                    setProcessing(false);
                    // Scroll to top to show errors
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                },
            });
        } catch (error) {
            setProcessing(false);
            console.error('Submission error:', error);
            setErrors({
                error: 'An unexpected error occurred. Please try again.',
            });
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const updateFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Profile" />

            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Edit Profile
                        </h1>
                        <p className="mt-1 text-gray-600">
                            Update your personal and medical information
                        </p>
                    </div>
                </div>

                {/* Display general errors */}
                {errors.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <span>{errors.error}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Section */}
                    <Card className="border-0 p-6 shadow-xl">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                                <Camera className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Profile Picture
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Update your profile photo
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6 sm:flex-row">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Profile preview"
                                    className="h-32 w-32 rounded-2xl border-4 border-gray-100 object-cover shadow-lg"
                                />
                            ) : (
                                <div className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-gray-100 bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                                    <span className="text-4xl font-semibold text-white">
                                        {getInitials(user.name || 'U')}
                                    </span>
                                </div>
                            )}

                            <div className="flex-1">
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow-md transition-colors hover:bg-green-700">
                                        <Upload className="h-4 w-4" />
                                        Upload New Photo
                                    </div>
                                </label>
                                <p className="mt-2 text-sm text-gray-500">
                                    JPG, PNG or GIF. Max size 2MB.
                                </p>
                                {errors.profile_picture && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.profile_picture}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Address Information */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Home className="h-5 w-5 text-white" />}
                                title="Address Information"
                                subtitle="Your residential address details"
                                bg="from-blue-500 to-indigo-600"
                            />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InputField
                                    label="National ID"
                                    icon={
                                        <CreditCard className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.national_id}
                                    onChange={(value: any) =>
                                        updateFormData('national_id', value)
                                    }
                                    placeholder="Enter your national ID"
                                    error={errors.national_id}
                                />

                                <InputField
                                    label="Occupation"
                                    icon={
                                        <Briefcase className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.occupation}
                                    onChange={(value: any) =>
                                        updateFormData('occupation', value)
                                    }
                                    placeholder="Your occupation"
                                    error={errors.occupation}
                                />

                                <InputField
                                    label="Address"
                                    icon={
                                        <Home className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.address}
                                    onChange={(value: any) =>
                                        updateFormData('address', value)
                                    }
                                    placeholder="Street address"
                                    fullWidth
                                    error={errors.address}
                                />

                                <InputField
                                    label="City"
                                    icon={
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.city}
                                    onChange={(value: any) =>
                                        updateFormData('city', value)
                                    }
                                    placeholder="City"
                                    error={errors.city}
                                />

                                <InputField
                                    label="State/Province"
                                    icon={
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.state}
                                    onChange={(value: any) =>
                                        updateFormData('state', value)
                                    }
                                    placeholder="State or province"
                                    error={errors.state}
                                />

                                <InputField
                                    label="Postal Code"
                                    icon={
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.postal_code}
                                    onChange={(value: any) =>
                                        updateFormData('postal_code', value)
                                    }
                                    placeholder="Postal code"
                                    error={errors.postal_code}
                                />
                            </div>
                        </Card>
                    )}

                    {/* Health Metrics */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Heart className="h-5 w-5 text-white" />}
                                title="Health Metrics"
                                subtitle="Physical measurements and vital information"
                                bg="from-purple-500 to-violet-600"
                            />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <SelectField
                                    label="Blood Type"
                                    icon={
                                        <Shield className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.blood_type}
                                    onChange={(value: any) =>
                                        updateFormData('blood_type', value)
                                    }
                                    options={[
                                        {
                                            value: '',
                                            label: 'Select blood type',
                                        },
                                        { value: 'A+', label: 'A+' },
                                        { value: 'A-', label: 'A-' },
                                        { value: 'B+', label: 'B+' },
                                        { value: 'B-', label: 'B-' },
                                        { value: 'AB+', label: 'AB+' },
                                        { value: 'AB-', label: 'AB-' },
                                        { value: 'O+', label: 'O+' },
                                        { value: 'O-', label: 'O-' },
                                    ]}
                                    error={errors.blood_type}
                                />

                                <InputField
                                    label="Height (cm)"
                                    type="number"
                                    icon={
                                        <Ruler className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.height}
                                    onChange={(value: any) =>
                                        updateFormData('height', value)
                                    }
                                    placeholder="Height in centimeters"
                                    step="0.01"
                                    error={errors.height}
                                />

                                <InputField
                                    label="Weight (kg)"
                                    type="number"
                                    icon={
                                        <Scale className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.weight}
                                    onChange={(value: any) =>
                                        updateFormData('weight', value)
                                    }
                                    placeholder="Weight in kilograms"
                                    step="0.01"
                                    error={errors.weight}
                                />

                                <InputField
                                    label="Lifestyle Habits"
                                    icon={
                                        <Heart className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.lifestyle_habits}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'lifestyle_habits',
                                            value,
                                        )
                                    }
                                    placeholder="e.g., Non-smoker, Active lifestyle"
                                    error={errors.lifestyle_habits}
                                />

                                <div className="md:col-span-2">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.has_disability}
                                            onChange={(e) =>
                                                updateFormData(
                                                    'has_disability',
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            I have a disability
                                        </span>
                                    </label>
                                </div>

                                {formData.has_disability && (
                                    <InputField
                                        label="Disability Details"
                                        icon={
                                            <AlertCircle className="h-5 w-5 text-gray-400" />
                                        }
                                        value={formData.disability_details}
                                        onChange={(value: any) =>
                                            updateFormData(
                                                'disability_details',
                                                value,
                                            )
                                        }
                                        placeholder="Please describe your disability"
                                        fullWidth
                                        error={errors.disability_details}
                                    />
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Medical Information */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Heart className="h-5 w-5 text-white" />}
                                title="Medical Information"
                                subtitle="Health records and medical history"
                                bg="from-rose-500 to-red-600"
                            />

                            <div className="space-y-6">
                                <DynamicArrayInput
                                    label="Allergies"
                                    icon={
                                        <AlertCircle className="h-5 w-5 text-gray-400" />
                                    }
                                    items={allergies}
                                    onAdd={() => addItem(setAllergies)}
                                    onRemove={(index: any) =>
                                        removeItem(setAllergies, index)
                                    }
                                    onUpdate={(index: any, value: any) =>
                                        updateItem(setAllergies, index, value)
                                    }
                                    placeholder="e.g., Peanuts, Penicillin, etc."
                                    buttonColor="orange"
                                    error={errors.allergies}
                                />

                                <DynamicArrayInput
                                    label="Chronic Conditions"
                                    icon={
                                        <Heart className="h-5 w-5 text-gray-400" />
                                    }
                                    items={chronicConditions}
                                    onAdd={() => addItem(setChronicConditions)}
                                    onRemove={(index: any) =>
                                        removeItem(setChronicConditions, index)
                                    }
                                    onUpdate={(index: any, value: any) =>
                                        updateItem(
                                            setChronicConditions,
                                            index,
                                            value,
                                        )
                                    }
                                    placeholder="e.g., Diabetes, Hypertension, etc."
                                    buttonColor="pink"
                                    error={errors.chronic_conditions}
                                />

                                <DynamicArrayInput
                                    label="Current Medications"
                                    icon={
                                        <Pill className="h-5 w-5 text-gray-400" />
                                    }
                                    items={currentMedications}
                                    onAdd={() => addItem(setCurrentMedications)}
                                    onRemove={(index: any) =>
                                        removeItem(setCurrentMedications, index)
                                    }
                                    onUpdate={(index: any, value: any) =>
                                        updateItem(
                                            setCurrentMedications,
                                            index,
                                            value,
                                        )
                                    }
                                    placeholder="e.g., Metformin 500mg, Aspirin 81mg"
                                    buttonColor="blue"
                                    error={errors.current_medications}
                                />

                                <DynamicArrayInput
                                    label="Surgical History"
                                    icon={
                                        <Stethoscope className="h-5 w-5 text-gray-400" />
                                    }
                                    items={surgicalHistory}
                                    onAdd={() => addItem(setSurgicalHistory)}
                                    onRemove={(index: any) =>
                                        removeItem(setSurgicalHistory, index)
                                    }
                                    onUpdate={(index: any, value: any) =>
                                        updateItem(
                                            setSurgicalHistory,
                                            index,
                                            value,
                                        )
                                    }
                                    placeholder="e.g., Appendectomy (2018)"
                                    buttonColor="green"
                                    error={errors.surgical_history}
                                />

                                <DynamicArrayInput
                                    label="Family Medical History"
                                    icon={
                                        <Users className="h-5 w-5 text-gray-400" />
                                    }
                                    items={familyMedicalHistory}
                                    onAdd={() =>
                                        addItem(setFamilyMedicalHistory)
                                    }
                                    onRemove={(index: any) =>
                                        removeItem(
                                            setFamilyMedicalHistory,
                                            index,
                                        )
                                    }
                                    onUpdate={(index: any, value: any) =>
                                        updateItem(
                                            setFamilyMedicalHistory,
                                            index,
                                            value,
                                        )
                                    }
                                    placeholder="e.g., Father - Diabetes, Mother - Hypertension"
                                    buttonColor="purple"
                                    error={errors.family_medical_history}
                                />

                                <DynamicArrayInput
                                    label="Immunization Record"
                                    icon={
                                        <Syringe className="h-5 w-5 text-gray-400" />
                                    }
                                    items={immunizationRecord}
                                    onAdd={() => addItem(setImmunizationRecord)}
                                    onRemove={(index: any) =>
                                        removeItem(setImmunizationRecord, index)
                                    }
                                    onUpdate={(index: any, value: any) =>
                                        updateItem(
                                            setImmunizationRecord,
                                            index,
                                            value,
                                        )
                                    }
                                    placeholder="e.g., COVID-19 (2023), Flu Shot (2024)"
                                    buttonColor="cyan"
                                    error={errors.immunization_record}
                                />
                            </div>
                        </Card>
                    )}

                    {/* Emergency Contact */}
                    {patient && (
                        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Users className="h-5 w-5 text-white" />}
                                title="Emergency Contact"
                                subtitle="Person to contact in case of emergency"
                                bg="from-red-500 to-orange-600"
                            />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InputField
                                    label="Contact Name"
                                    icon={
                                        <User className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.emergency_contact_name}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'emergency_contact_name',
                                            value,
                                        )
                                    }
                                    placeholder="Emergency contact name"
                                    error={errors.emergency_contact_name}
                                />

                                <InputField
                                    label="Relationship"
                                    icon={
                                        <Users className="h-5 w-5 text-gray-400" />
                                    }
                                    value={
                                        formData.emergency_contact_relationship
                                    }
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'emergency_contact_relationship',
                                            value,
                                        )
                                    }
                                    placeholder="e.g., Spouse, Parent, Sibling"
                                    error={
                                        errors.emergency_contact_relationship
                                    }
                                />

                                <InputField
                                    label="Contact Phone"
                                    type="tel"
                                    icon={
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.emergency_contact_phone}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'emergency_contact_phone',
                                            value,
                                        )
                                    }
                                    placeholder="+1 (555) 000-0000"
                                    error={errors.emergency_contact_phone}
                                />

                                <InputField
                                    label="Contact Email"
                                    type="email"
                                    icon={
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.emergency_contact_email}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'emergency_contact_email',
                                            value,
                                        )
                                    }
                                    placeholder="contact@email.com"
                                    error={errors.emergency_contact_email}
                                />

                                <InputField
                                    label="Preferred Hospital"
                                    icon={
                                        <Building2 className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.preferred_hospital}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'preferred_hospital',
                                            value,
                                        )
                                    }
                                    placeholder="Preferred hospital name"
                                    fullWidth
                                    error={errors.preferred_hospital}
                                />
                            </div>
                        </Card>
                    )}

                    {/* Preferences */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Shield className="h-5 w-5 text-white" />}
                                title="Preferences & Settings"
                                subtitle="Your consultation and system preferences"
                                bg="from-indigo-500 to-blue-600"
                            />

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InputField
                                    label="Preferred Language"
                                    icon={
                                        <Languages className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.preferred_language}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'preferred_language',
                                            value,
                                        )
                                    }
                                    placeholder="e.g., English, Spanish"
                                    error={errors.preferred_language}
                                />

                                <SelectField
                                    label="Preferred Consultation Type"
                                    icon={
                                        <Video className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.preferred_consultation_type}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'preferred_consultation_type',
                                            value,
                                        )
                                    }
                                    options={[
                                        { value: 'video', label: 'Video Call' },
                                        { value: 'audio', label: 'Audio Call' },
                                        { value: 'text', label: 'Text Chat' },
                                    ]}
                                    error={errors.preferred_consultation_type}
                                />

                                <SelectField
                                    label="Preferred Doctor Gender"
                                    icon={
                                        <User className="h-5 w-5 text-gray-400" />
                                    }
                                    value={formData.preferred_doctor_gender}
                                    onChange={(value: any) =>
                                        updateFormData(
                                            'preferred_doctor_gender',
                                            value,
                                        )
                                    }
                                    options={[
                                        {
                                            value: 'any',
                                            label: 'No Preference',
                                        },
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                    ]}
                                    error={errors.preferred_doctor_gender}
                                />
                            </div>
                        </Card>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="px-6"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 px-6 text-white shadow-lg hover:bg-green-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

/* --- Reusable Components --- */
const SectionHeader = ({
    icon,
    title,
    subtitle,
    bg = 'from-green-500 to-green-600',
}: any) => (
    <div className="mb-6 flex items-center gap-3">
        <div
            className={`h-11 w-11 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-lg`}
        >
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    </div>
);

const InputField = ({
    label,
    type = 'text',
    icon,
    value,
    onChange,
    placeholder,
    required = false,
    fullWidth = false,
    error,
    step,
}: any) => (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                    {icon}
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full ${icon ? 'pl-10' : 'pl-4'} rounded-lg border border-gray-300 bg-white py-2.5 pr-4 transition-all focus:border-transparent focus:ring-2 focus:ring-green-500`}
                placeholder={placeholder}
                step={step}
            />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const SelectField = ({ label, icon, value, onChange, options, error }: any) => (
    <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute top-1/2 left-3 z-10 -translate-y-1/2">
                    {icon}
                </div>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full ${icon ? 'pl-10' : 'pl-4'} appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pr-4 transition-all focus:border-transparent focus:ring-2 focus:ring-green-500`}
            >
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const TextareaField = ({
    label,
    value,
    onChange,
    placeholder,
    rows = 3,
    fullWidth = false,
    error,
}: any) => (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
        </label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 transition-all focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder={placeholder}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const DynamicArrayInput = ({
    label,
    icon,
    items,
    onAdd,
    onRemove,
    onUpdate,
    placeholder,
    buttonColor,
    error,
}: any) => {
    const colorClasses: Record<string, string> = {
        orange: 'bg-orange-600 hover:bg-orange-700',
        pink: 'bg-pink-600 hover:bg-pink-700',
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        purple: 'bg-purple-600 hover:bg-purple-700',
        cyan: 'bg-cyan-600 hover:bg-cyan-700',
    };

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <Button
                    type="button"
                    onClick={onAdd}
                    className={`h-8 px-3 ${colorClasses[buttonColor]} text-sm text-white`}
                >
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                </Button>
            </div>
            <div className="space-y-3">
                {items.map((item: string, index: number) => (
                    <div key={index} className="flex gap-2">
                        <div className="relative flex-1">
                            {icon && (
                                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                                    {icon}
                                </div>
                            )}
                            <input
                                type="text"
                                value={item}
                                onChange={(e) =>
                                    onUpdate(index, e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-500"
                                placeholder={placeholder}
                            />
                        </div>
                        {items.length > 1 && (
                            <Button
                                type="button"
                                onClick={() => onRemove(index)}
                                variant="outline"
                                className="h-11 border-red-300 px-3 text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};
