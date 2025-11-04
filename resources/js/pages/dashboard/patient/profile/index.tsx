import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Award,
    Briefcase,
    Building2,
    Calendar,
    Car,
    CreditCard,
    Edit,
    Gauge,
    Globe,
    Heart,
    Home,
    Languages,
    Mail,
    MailPlus,
    MailWarning,
    MapPin,
    Phone,
    Pill,
    QrCode,
    Ruler,
    Scale,
    Shield,
    Stethoscope,
    Syringe,
    User,
    Users,
    Video,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Profile', href: '#' },
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
    updated_at: string;
    patient?: Patient;
}

interface PageProps {
    user: UserData;
    [key: string]: any;
}

export default function Dashboard() {
    const { user } = usePage<PageProps>().props;
    const patient = user.patient;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-500/10 text-white border-emerald-200';
            case 'pending':
                return 'bg-amber-500/10 text-amber-700 border-amber-200';
            case 'inactive':
                return 'bg-slate-500/10 text-slate-700 border-slate-200';
            default:
                return 'bg-slate-500/10 text-slate-700 border-slate-200';
        }
    };

    const formatDate = (date: string | null) => {
        if (!date) return 'Not provided';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateAge = (dob: string | null) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        )
            age--;
        return age;
    };

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

    // Helper function to parse JSON array strings
    const parseArrayString = (value: string | null): string[] => {
        if (!value) return [];
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />

            <div className="space-y-8 pb-12">
                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative md:px-12">
                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="flex flex-1 flex-col items-start gap-6 sm:flex-row sm:items-center">
                                {user.profile_picture ? (
                                    <img
                                        src={'/storage/' + user.profile_picture}
                                        alt={user.name}
                                        className="h-28 w-28 rounded-full object-cover shadow-2xl ring-4 ring-white/10"
                                    />
                                ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl ring-4 ring-white/10">
                                        <span className="text-4xl font-bold text-white">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="mb-2 flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-bold text-white md:text-4xl">
                                            {user.name}
                                        </h1>
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${getStatusColor(
                                                user.status,
                                            )}`}
                                        >
                                            {user.status}
                                        </span>
                                    </div>
                                    {user.bio && (
                                        <p className="mb-3 max-w-2xl text-green-100">
                                            {user.bio}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                                            <Award className="h-4 w-4" />
                                            <span className="capitalize">
                                                {user.role}
                                            </span>
                                        </div>
                                        {user.email_verified_at ? (
                                            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-3 py-1.5 text-sm font-medium text-white">
                                                <MailPlus className="h-4 w-4" />
                                                Verified
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/20 px-3 py-1.5 text-sm font-medium text-white">
                                                <MailWarning className="h-4 w-4" />
                                                Not Verified
                                            </div>
                                        )}
                                        {user.gender && (
                                            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white capitalize">
                                                <User className="h-4 w-4" />
                                                {user.gender}
                                            </div>
                                        )}
                                        {user.date_of_birth && (
                                            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                                                <Calendar className="h-4 w-4" />
                                                {calculateAge(
                                                    user.date_of_birth,
                                                )}{' '}
                                                years
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={'/patient/profile/edit'}>
                                    <Button className="bg-white font-semibold text-green-600 hover:bg-green-50">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">
                            Status
                        </p>
                        <p className="text-lg font-semibold capitalize">
                            {user.status}
                        </p>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">
                            Member Since
                        </p>
                        <p className="text-lg font-semibold">
                            {new Date(user.created_at).getFullYear()}
                        </p>
                    </Card>
                    {patient && (
                        <>
                            <Card className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 p-4 shadow-md">
                                <p className="mb-1 text-xs text-gray-600 uppercase">
                                    Blood Type
                                </p>
                                <p className="text-lg font-semibold">
                                    {patient.blood_type || 'N/A'}
                                </p>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50 p-4 shadow-md">
                                <p className="mb-1 text-xs text-gray-600 uppercase">
                                    Height
                                </p>
                                <p className="text-lg font-semibold">
                                    {patient.height
                                        ? `${patient.height} cm`
                                        : 'N/A'}
                                </p>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-md">
                                <p className="mb-1 text-xs text-gray-600 uppercase">
                                    Weight
                                </p>
                                <p className="text-lg font-semibold">
                                    {patient.weight
                                        ? `${patient.weight} kg`
                                        : 'N/A'}
                                </p>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-cyan-50 to-teal-50 p-4 shadow-md">
                                <p className="mb-1 text-xs text-gray-600 uppercase">
                                    BMI
                                </p>
                                <p className="text-lg font-semibold">
                                    {patient.bmi || 'N/A'}
                                </p>
                            </Card>
                        </>
                    )}
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Personal Information */}
                    {patient && (
                        <Card className="border-0 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Home className="h-5 w-5 text-white" />}
                                title="Personal Information"
                                subtitle="Your personal details and address"
                                bg="from-blue-500 to-indigo-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={
                                        <CreditCard className="h-5 w-5 text-blue-600" />
                                    }
                                    label="National ID"
                                    value={
                                        patient.national_id || 'Not provided'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Briefcase className="h-5 w-5 text-purple-600" />
                                    }
                                    label="Occupation"
                                    value={patient.occupation || 'Not provided'}
                                />
                                <InfoItem
                                    icon={
                                        <Home className="h-5 w-5 text-green-600" />
                                    }
                                    label="Address"
                                    value={patient.address || 'Not provided'}
                                    fullWidth
                                />
                                <InfoItem
                                    icon={
                                        <MapPin className="h-5 w-5 text-red-600" />
                                    }
                                    label="City"
                                    value={patient.city || 'Not provided'}
                                />
                                <InfoItem
                                    icon={
                                        <MapPin className="h-5 w-5 text-orange-600" />
                                    }
                                    label="State"
                                    value={patient.state || 'Not provided'}
                                />
                                <InfoItem
                                    icon={
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    }
                                    label="Postal Code"
                                    value={
                                        patient.postal_code || 'Not provided'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Globe className="h-5 w-5 text-green-600" />
                                    }
                                    label="Country"
                                    value={user.country || 'Not provided'}
                                />
                            </div>
                        </Card>
                    )}

                    {/* Contact Information */}
                    <Card className="border-0 p-6 shadow-xl">
                        <SectionHeader
                            icon={<User className="h-5 w-5 text-white" />}
                            title="Contact Information"
                            subtitle="Your contact details"
                            bg="from-green-500 to-emerald-600"
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoItem
                                icon={
                                    <Mail className="h-5 w-5 text-green-600" />
                                }
                                label="Email"
                                value={user.email}
                            />
                            <InfoItem
                                icon={
                                    <Phone className="h-5 w-5 text-emerald-600" />
                                }
                                label="Phone"
                                value={user.phone_number}
                            />
                            <InfoItem
                                icon={
                                    <Calendar className="h-5 w-5 text-green-600" />
                                }
                                label="Date of Birth"
                                value={formatDate(user.date_of_birth)}
                            />
                            <InfoItem
                                icon={
                                    <User className="h-5 w-5 text-blue-600" />
                                }
                                label="Gender"
                                value={
                                    user.gender
                                        ? user.gender.charAt(0).toUpperCase() +
                                          user.gender.slice(1)
                                        : 'Not provided'
                                }
                            />
                        </div>
                    </Card>

                    {/* Health Metrics */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Gauge className="h-5 w-5 text-white" />}
                                title="Health Metrics"
                                subtitle="Physical measurements and vital statistics"
                                bg="from-purple-500 to-violet-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <MetricCard
                                    icon={
                                        <Ruler className="h-5 w-5 text-white" />
                                    }
                                    label="Height"
                                    value={
                                        patient.height
                                            ? `${patient.height} cm`
                                            : 'Not recorded'
                                    }
                                    color="purple"
                                />
                                <MetricCard
                                    icon={
                                        <Scale className="h-5 w-5 text-white" />
                                    }
                                    label="Weight"
                                    value={
                                        patient.weight
                                            ? `${patient.weight} kg`
                                            : 'Not recorded'
                                    }
                                    color="amber"
                                />
                                <MetricCard
                                    icon={
                                        <Gauge className="h-5 w-5 text-white" />
                                    }
                                    label="BMI"
                                    value={
                                        patient.bmi
                                            ? patient.bmi.toString()
                                            : 'Not calculated'
                                    }
                                    color="cyan"
                                />
                                <MetricCard
                                    icon={
                                        <Heart className="h-5 w-5 text-white" />
                                    }
                                    label="Blood Type"
                                    value={patient.blood_type || 'Unknown'}
                                    color="rose"
                                />
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
                            <div className="grid gap-4 space-y-4 md:grid-cols-2">
                                <MedicalListItem
                                    icon={
                                        <AlertCircle className="h-4 w-4 text-orange-600" />
                                    }
                                    label="Allergies"
                                    items={parseArrayString(patient.allergies)}
                                    emptyMessage="No known allergies"
                                />
                                <MedicalListItem
                                    icon={
                                        <Activity className="h-4 w-4 text-pink-600" />
                                    }
                                    label="Chronic Conditions"
                                    items={parseArrayString(
                                        patient.chronic_conditions,
                                    )}
                                    emptyMessage="No chronic conditions reported"
                                />
                                <MedicalListItem
                                    icon={
                                        <Pill className="h-4 w-4 text-blue-600" />
                                    }
                                    label="Current Medications"
                                    items={parseArrayString(
                                        patient.current_medications,
                                    )}
                                    emptyMessage="No current medications"
                                />
                                <MedicalListItem
                                    icon={
                                        <Stethoscope className="h-4 w-4 text-green-600" />
                                    }
                                    label="Surgical History"
                                    items={parseArrayString(
                                        patient.surgical_history,
                                    )}
                                    emptyMessage="No surgical history"
                                />
                                <MedicalListItem
                                    icon={
                                        <Users className="h-4 w-4 text-purple-600" />
                                    }
                                    label="Family Medical History"
                                    items={parseArrayString(
                                        patient.family_medical_history,
                                    )}
                                    emptyMessage="No family medical history recorded"
                                />
                                <MedicalListItem
                                    icon={
                                        <Syringe className="h-4 w-4 text-cyan-600" />
                                    }
                                    label="Immunization Record"
                                    items={parseArrayString(
                                        patient.immunization_record,
                                    )}
                                    emptyMessage="No immunization records"
                                />
                            </div>
                        </Card>
                    )}

                    {/* Lifestyle & Habits */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={
                                    <Activity className="h-5 w-5 text-white" />
                                }
                                title="Lifestyle & Habits"
                                subtitle="Your daily habits and health information"
                                bg="from-amber-500 to-orange-600"
                            />
                            <div className="space-y-4">
                                <InfoItem
                                    icon={
                                        <Car className="h-5 w-5 text-amber-600" />
                                    }
                                    label="Lifestyle Habits"
                                    value={
                                        patient.lifestyle_habits ||
                                        'Not provided'
                                    }
                                    fullWidth
                                />

                                <InfoItem
                                    icon={
                                        <Shield className="h-5 w-5 text-amber-600" />
                                    }
                                    label="Disability Details"
                                    value={
                                        patient.disability_details ||
                                        'Not provided'
                                    }
                                    fullWidth
                                />
                            </div>
                        </Card>
                    )}

                    {/* Emergency Contact */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={
                                    <AlertCircle className="h-5 w-5 text-white" />
                                }
                                title="Emergency Contact"
                                subtitle="Important contact information for emergencies"
                                bg="from-red-500 to-orange-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={
                                        <User className="h-5 w-5 text-red-600" />
                                    }
                                    label="Contact Name"
                                    value={
                                        patient.emergency_contact_name ||
                                        'Not provided'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Users className="h-5 w-5 text-orange-600" />
                                    }
                                    label="Relationship"
                                    value={
                                        patient.emergency_contact_relationship ||
                                        'Not provided'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Phone className="h-5 w-5 text-red-600" />
                                    }
                                    label="Contact Phone"
                                    value={
                                        patient.emergency_contact_phone ||
                                        'Not provided'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Mail className="h-5 w-5 text-orange-600" />
                                    }
                                    label="Contact Email"
                                    value={
                                        patient.emergency_contact_email ||
                                        'Not provided'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Building2 className="h-5 w-5 text-red-600" />
                                    }
                                    label="Preferred Hospital"
                                    value={
                                        patient.preferred_hospital ||
                                        'Not provided'
                                    }
                                    fullWidth
                                />
                            </div>
                        </Card>
                    )}

                    {/* Preferences & Settings */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Shield className="h-5 w-5 text-white" />}
                                title="Preferences & Settings"
                                subtitle="Your consultation and system preferences"
                                bg="from-indigo-500 to-blue-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={
                                        <Languages className="h-5 w-5 text-indigo-600" />
                                    }
                                    label="Preferred Language"
                                    value={
                                        patient.preferred_language || 'Not set'
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <Video className="h-5 w-5 text-blue-600" />
                                    }
                                    label="Consultation Type"
                                    value={
                                        patient.preferred_consultation_type
                                            .charAt(0)
                                            .toUpperCase() +
                                        patient.preferred_consultation_type.slice(
                                            1,
                                        )
                                    }
                                />
                                <InfoItem
                                    icon={
                                        <User className="h-5 w-5 text-cyan-600" />
                                    }
                                    label="Preferred Doctor Gender"
                                    value={
                                        patient.preferred_doctor_gender
                                            .charAt(0)
                                            .toUpperCase() +
                                        patient.preferred_doctor_gender.slice(1)
                                    }
                                />
                                {patient.qr_code_path && (
                                    <div className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
                                                <QrCode className="h-4 w-4 text-indigo-600" />
                                            </div>
                                            <p className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                                                Patient QR Code
                                            </p>
                                        </div>
                                        <img
                                            src={
                                                '/storage/' +
                                                patient.qr_code_path
                                            }
                                            alt="Patient QR Code"
                                            className="h-32 w-32 rounded-lg border-2 border-indigo-200"
                                        />
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Account Details */}
                    <Card className="border-0 bg-gradient-to-br from-slate-50 to-gray-100 p-6 shadow-xl">
                        <SectionHeader
                            icon={<Shield className="h-5 w-5 text-white" />}
                            title="Account Details"
                            subtitle="System identifiers and account information"
                            bg="from-slate-600 to-gray-700"
                        />
                        <div className="space-y-4">
                            <AccountItem label="User ID" value={user.uuid} />
                            {patient && (
                                <AccountItem
                                    label="Patient ID"
                                    value={patient.uuid}
                                />
                            )}
                            <AccountItem
                                label="Account Created"
                                value={new Date(
                                    user.created_at,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            />
                            <AccountItem
                                label="Last Updated"
                                value={new Date(
                                    user.updated_at,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

/* --- Subcomponents --- */
const InfoItem = ({ icon, label, value, fullWidth = false }: any) => (
    <div
        className={`group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-green-200 hover:shadow-md ${fullWidth ? 'sm:col-span-2' : ''}`}
    >
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50">
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p className="mb-1.5 text-xs font-medium text-gray-500 uppercase">
                {label}
            </p>
            <p className="font-medium break-words text-gray-900">{value}</p>
        </div>
    </div>
);

const MetricCard = ({ icon, label, value, color }: any) => {
    const colorClasses: Record<string, string> = {
        purple: 'from-purple-500 to-violet-600',
        amber: 'from-amber-500 to-orange-600',
        cyan: 'from-cyan-500 to-teal-600',
        rose: 'from-rose-500 to-pink-600',
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-all hover:shadow-lg">
            <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-md`}
            >
                {icon}
            </div>
            <p className="mb-1 text-xs font-medium text-gray-500 uppercase">
                {label}
            </p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    );
};

const MedicalListItem = ({ icon, label, items, emptyMessage }: any) => (
    <div className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100">
                {icon}
            </div>
            <p className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                {label}
            </p>
        </div>
        {items.length > 0 ? (
            <ul className="space-y-2">
                {items.map((item: string, index: number) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 font-medium text-gray-900"
                    >
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="font-medium text-gray-500">{emptyMessage}</p>
        )}
    </div>
);

const AccountItem = ({ label, value }: any) => (
    <div>
        <p className="mb-1.5 text-xs font-medium text-gray-600 uppercase">
            {label}
        </p>
        <div className="rounded-lg border border-gray-200 bg-white p-3 font-mono text-xs break-all text-gray-700">
            {value}
        </div>
    </div>
);

const SectionHeader = ({ icon, title, subtitle, bg }: any) => (
    <div className="mb-6 flex items-center gap-3">
        <div
            className={`h-11 w-11 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-lg`}
        >
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm font-medium text-gray-600">{subtitle}</p>
        </div>
    </div>
);
