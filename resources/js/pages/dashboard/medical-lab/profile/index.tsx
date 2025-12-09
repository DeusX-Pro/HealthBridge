import MedicalLabLayout from '@/layouts/medical-lab-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Building2,
    MapPin,
    Mail,
    Phone,
    Calendar,
    User,
    Award,
    FileText,
    CheckCircle2,
    Clock,
    X,
    Edit,
    MailPlus,
    MailWarning,
    Shield,
    Globe,
    CreditCard,
    Microscope,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/medical-lab/dashboard' },
    { title: 'Profile' },
];

interface MedicalLab {
    id: number;
    user_id: number;
    uuid: string;
    lab_name: string;
    mlscn_license_number: string;
    mlscn_license_expiry: string | null;
    cac_registration_number: string | null;
    mlscn_certificate: string | null;
    cac_certificate: string | null;
    director_id_card: string | null;
    facility_photo: string | null;
    lab_tests_offered: string[] | null;
    address: string | null;
    city: string | null;
    state: string | null;
    latitude: number | null;
    longitude: number | null;
    status: 'pending' | 'approved' | 'rejected';
    verified_at: string | null;
    rejection_reason: string | null;
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
    role: string;
    profile_picture: string | null;
    country: string | null;
    gender: 'male' | 'female' | 'other' | null;
    bio: string | null;
    created_at: string;
    updated_at: string;
    medicallab?: MedicalLab;
}

interface PageProps {
    user: UserData;
    [key: string]: any;
}

export default function MedicalLabProfile() {
    const { user } = usePage<PageProps>().props;
    const medicallab = user.medicallab;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-500/10 text-green-700 border-green-200';
            case 'pending':
                return 'bg-amber-500/10 text-amber-700 border-amber-200';
            case 'rejected':
                return 'bg-red-500/10 text-red-700 border-red-200';
            default:
                return 'bg-slate-500/10 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle2 className="h-4 w-4" />;
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'rejected':
                return <X className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
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

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

    const parseLabTests = (tests: string[] | null): string[] => {
        if (!tests) return [];
        if (Array.isArray(tests)) return tests;
        try {
            const parsed = JSON.parse(tests);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    };

    return (
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Medical Lab Profile" />

            <div className="space-y-8 pb-12">
                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 p-6 text-white shadow-xl sm:p-8">
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
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 shadow-2xl ring-4 ring-white/10">
                                        <span className="text-4xl font-bold text-white">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="mb-2 flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-bold text-white md:text-4xl">
                                            {medicallab?.lab_name || user.name}
                                        </h1>
                                        {medicallab && (
                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${getStatusColor(
                                                    medicallab.status,
                                                )}`}
                                            >
                                                {getStatusIcon(medicallab.status)}
                                                {medicallab.status}
                                            </span>
                                        )}
                                    </div>
                                    {user.bio && (
                                        <p className="mb-3 max-w-2xl text-teal-100">
                                            {user.bio}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                                            <Microscope className="h-4 w-4" />
                                            <span className="capitalize">Medical Lab</span>
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
                                        {medicallab?.verified_at && (
                                            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-3 py-1.5 text-sm font-medium text-white">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Business Verified
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/medical-lab/settings">
                                    <Button className="bg-white font-semibold text-teal-600 hover:bg-teal-50">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Card className="border-0 bg-gradient-to-br from-teal-50 to-cyan-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">Status</p>
                        <p className="text-lg font-semibold capitalize">
                            {medicallab?.status || 'N/A'}
                        </p>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">Member Since</p>
                        <p className="text-lg font-semibold">
                            {new Date(user.created_at).getFullYear()}
                        </p>
                    </Card>
                    {medicallab?.verified_at && (
                        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-md">
                            <p className="mb-1 text-xs text-gray-600 uppercase">Verified Date</p>
                            <p className="text-lg font-semibold">
                                {new Date(medicallab.verified_at).getFullYear()}
                            </p>
                        </Card>
                    )}
                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">MLSCN License</p>
                        <p className="text-lg font-semibold">
                            {medicallab?.mlscn_license_number || 'N/A'}
                        </p>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Business Information */}
                    {medicallab && (
                        <Card className="border-0 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Building2 className="h-5 w-5 text-white" />}
                                title="Business Information"
                                subtitle="Your medical lab business details"
                                bg="from-teal-500 to-cyan-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={<Building2 className="h-5 w-5 text-teal-600" />}
                                    label="Lab Name"
                                    value={medicallab.lab_name}
                                />
                                <InfoItem
                                    icon={<CreditCard className="h-5 w-5 text-teal-600" />}
                                    label="MLSCN License Number"
                                    value={medicallab.mlscn_license_number}
                                />
                                <InfoItem
                                    icon={<Calendar className="h-5 w-5 text-teal-600" />}
                                    label="MLSCN License Expiry"
                                    value={formatDate(medicallab.mlscn_license_expiry)}
                                />
                                <InfoItem
                                    icon={<FileText className="h-5 w-5 text-teal-600" />}
                                    label="CAC Registration"
                                    value={medicallab.cac_registration_number || 'Not provided'}
                                />
                            </div>
                        </Card>
                    )}

                    {/* Lab Tests Offered */}
                    {medicallab && parseLabTests(medicallab.lab_tests_offered).length > 0 && (
                        <Card className="border-0 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Microscope className="h-5 w-5 text-white" />}
                                title="Lab Tests Offered"
                                subtitle="Services and tests available at your lab"
                                bg="from-purple-500 to-violet-600"
                            />
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {parseLabTests(medicallab.lab_tests_offered).map((test, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
                                                <Microscope className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <p className="font-medium text-gray-900">{test}</p>
                                        </div>
                                    </div>
                                ))}
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
                                icon={<Mail className="h-5 w-5 text-green-600" />}
                                label="Email"
                                value={user.email}
                            />
                            <InfoItem
                                icon={<Phone className="h-5 w-5 text-emerald-600" />}
                                label="Phone"
                                value={user.phone_number}
                            />
                            <InfoItem
                                icon={<Calendar className="h-5 w-5 text-green-600" />}
                                label="Date of Birth"
                                value={formatDate(user.date_of_birth)}
                            />
                            <InfoItem
                                icon={<User className="h-5 w-5 text-blue-600" />}
                                label="Gender"
                                value={
                                    user.gender
                                        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                                        : 'Not provided'
                                }
                            />
                            <InfoItem
                                icon={<Globe className="h-5 w-5 text-green-600" />}
                                label="Country"
                                value={user.country || 'Not provided'}
                            />
                        </div>
                    </Card>

                    {/* Location Information */}
                    {medicallab && (
                        <Card className="border-0 p-6 shadow-xl">
                            <SectionHeader
                                icon={<MapPin className="h-5 w-5 text-white" />}
                                title="Location Information"
                                subtitle="Your medical lab location details"
                                bg="from-blue-500 to-indigo-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5 text-blue-600" />}
                                    label="Address"
                                    value={medicallab.address || 'Not provided'}
                                    fullWidth
                                />
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5 text-indigo-600" />}
                                    label="City"
                                    value={medicallab.city || 'Not provided'}
                                />
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5 text-blue-600" />}
                                    label="State"
                                    value={medicallab.state || 'Not provided'}
                                />
                                {medicallab.latitude && medicallab.longitude && (
                                    <InfoItem
                                        icon={<MapPin className="h-5 w-5 text-indigo-600" />}
                                        label="Coordinates"
                                        value={`${medicallab.latitude}, ${medicallab.longitude}`}
                                    />
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Documents */}
                    {medicallab && (
                        <Card className="border-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<FileText className="h-5 w-5 text-white" />}
                                title="Business Documents"
                                subtitle="Your uploaded business documents"
                                bg="from-amber-500 to-orange-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                {medicallab.mlscn_certificate && (
                                    <DocumentItem
                                        label="MLSCN Certificate"
                                        path={medicallab.mlscn_certificate}
                                    />
                                )}
                                {medicallab.cac_certificate && (
                                    <DocumentItem
                                        label="CAC Certificate"
                                        path={medicallab.cac_certificate}
                                    />
                                )}
                                {medicallab.director_id_card && (
                                    <DocumentItem
                                        label="Director ID Card"
                                        path={medicallab.director_id_card}
                                    />
                                )}
                                {medicallab.facility_photo && (
                                    <DocumentItem
                                        label="Facility Photo"
                                        path={medicallab.facility_photo}
                                    />
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Verification Status */}
                    {medicallab && (
                        <Card className="border-0 bg-gradient-to-br from-slate-50 to-gray-100 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Shield className="h-5 w-5 text-white" />}
                                title="Verification Status"
                                subtitle="Account verification and status information"
                                bg="from-slate-600 to-gray-700"
                            />
                            <div className="space-y-4">
                                <InfoItem
                                    icon={<Shield className="h-5 w-5 text-slate-600" />}
                                    label="Verification Status"
                                    value={medicallab.status.charAt(0).toUpperCase() + medicallab.status.slice(1)}
                                    fullWidth
                                />
                                {medicallab.verified_at && (
                                    <InfoItem
                                        icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                                        label="Verified At"
                                        value={formatDate(medicallab.verified_at)}
                                        fullWidth
                                    />
                                )}
                                {medicallab.rejection_reason && (
                                    <InfoItem
                                        icon={<X className="h-5 w-5 text-red-600" />}
                                        label="Rejection Reason"
                                        value={medicallab.rejection_reason}
                                        fullWidth
                                    />
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
                            {medicallab && (
                                <AccountItem label="Medical Lab ID" value={medicallab.uuid} />
                            )}
                            <AccountItem
                                label="Account Created"
                                value={new Date(user.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            />
                            <AccountItem
                                label="Last Updated"
                                value={new Date(user.updated_at).toLocaleDateString('en-US', {
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
        </MedicalLabLayout>
    );
}

/* --- Subcomponents --- */
const InfoItem = ({ icon, label, value, fullWidth = false }: any) => (
    <div
        className={`group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-teal-200 hover:shadow-md ${fullWidth ? 'sm:col-span-2' : ''}`}
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

const DocumentItem = ({ label, path }: any) => (
    <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100">
                <FileText className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-xs font-bold tracking-wider text-gray-600 uppercase">
                {label}
            </p>
        </div>
        <a
            href={'/storage/' + path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline"
        >
            View Document →
        </a>
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


