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
    Calendar,
    Edit,
    Heart,
    Mail,
    MailPlus,
    MailWarning,
    MapPin,
    Phone,
    Shield,
    User,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Profile', href: '#' },
];

interface Patient {
    id: number;
    user_id: number;
    uuid: string;
    blood_type: string | null;
    allergies: string | null;
    chronic_conditions: string | null;
    emergency_contact_name: string | null;
    emergency_contact_phone: string | null;
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
                                        className="h-28 w-28 rounded-2xl border-4 border-white/20 object-cover shadow-2xl ring-4 ring-white/10"
                                    />
                                ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white/20 bg-white/20 shadow-2xl ring-4 ring-white/10">
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

                {/* Account Stats */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <Card className="border-0 bg-gradient-to-br from-green-50 to-green-50 p-5 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">
                            Account Status
                        </p>
                        <p className="text-xl font-semibold capitalize">
                            {user.status}
                        </p>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">
                            Member Since
                        </p>
                        <p className="text-xl font-semibold capitalize">
                            {new Date(user.created_at).getFullYear()}
                        </p>
                    </Card>
                    {patient && (
                        <>
                            <Card className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 p-5 shadow-md">
                                <p className="mb-1 text-xs text-gray-600 uppercase">
                                    Blood Type
                                </p>
                                <p className="text-xl font-semibold capitalize">
                                    {patient.blood_type || 'N/A'}
                                </p>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-green-50 to-violet-50 p-5 shadow-md">
                                <p className="mb-1 text-xs text-gray-600 uppercase">
                                    Patient Status
                                </p>
                                <p className="text-xl font-semibold capitalize">
                                    {patient.status}
                                </p>
                            </Card>
                        </>
                    )}
                </div>

                {/* --- SINGLE COLUMN CONTENT --- */}
                <div className="space-y-8">
                    {/* Contact Information (includes emergency contact) */}
                    <Card className="border-0 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Contact Information
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Your personal and emergency contact details
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <ContactItem
                                icon={
                                    <Mail className="h-5 w-5 text-green-600" />
                                }
                                label="Email"
                                value={user.email}
                            />
                            <ContactItem
                                icon={
                                    <Phone className="h-5 w-5 text-emerald-600" />
                                }
                                label="Phone"
                                value={user.phone_number}
                            />
                            <ContactItem
                                icon={
                                    <Calendar className="h-5 w-5 text-green-600" />
                                }
                                label="Date of Birth"
                                value={formatDate(user.date_of_birth)}
                            />
                            <ContactItem
                                icon={
                                    <MapPin className="h-5 w-5 text-orange-600" />
                                }
                                label="Country"
                                value={user.country || 'Not provided'}
                            />

                            <ContactItem
                                icon={<User className="h-5 w-5 text-red-600" />}
                                label="Emergency Contact Name"
                                value={patient?.emergency_contact_name || 'N/A'}
                            />
                            <ContactItem
                                icon={
                                    <Phone className="h-5 w-5 text-red-600" />
                                }
                                label="Emergency Contact Phone"
                                value={
                                    patient?.emergency_contact_phone || 'N/A'
                                }
                            />
                        </div>
                    </Card>

                    {/* Medical Information */}
                    {patient && (
                        <Card className="border-0 bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Heart className="h-5 w-5 text-white" />}
                                title="Medical Information"
                                subtitle="Health records and conditions"
                                bg="from-rose-500 to-red-600"
                            />
                            <div className="space-y-4">
                                <MedicalItem
                                    icon={
                                        <Shield className="h-4 w-4 text-rose-600" />
                                    }
                                    label="Blood Type"
                                    value={patient.blood_type || '—'}
                                />
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
                            </div>
                        </Card>
                    )}

                    {/* Account Details */}
                    <Card className="border-0 bg-gradient-to-br from-slate-50 to-gray-100 p-6 shadow-xl">
                        <SectionHeader
                            icon={<Shield className="h-5 w-5 text-white" />}
                            title="Account IDs"
                            subtitle="System identifiers"
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
                                label="Date Created"
                                value={new Date(
                                    user.created_at,
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
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
                                })}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

/* --- Subcomponents for cleaner JSX --- */
const ContactItem = ({ icon, label, value }: any) => (
    <div className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-slate-50 p-5 transition-all hover:border-green-200 hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white">
            {icon}
        </div>
        <div>
            <p className="mb-1.5 text-xs font-medium text-gray-500 uppercase">
                {label}
            </p>
            <p className="font-medium text-gray-900">{value}</p>
        </div>
    </div>
);

const MedicalItem = ({ icon, label, value }: any) => (
    <div className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100">
                {icon}
            </div>
            <p className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                {label}
            </p>
        </div>
        <p className="font-semibold text-gray-900">{value}</p>
    </div>
);

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
                        className="flex items-center gap-2 font-semibold text-gray-900"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                        {item}
                    </li>
                ))}
            </ul>
        ) : (
            <p className="font-semibold text-gray-500">{emptyMessage}</p>
        )}
    </div>
);

const AccountItem = ({ label, value }: any) => (
    <div>
        <p className="mb-1 text-xs font-medium text-gray-600 uppercase">
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
