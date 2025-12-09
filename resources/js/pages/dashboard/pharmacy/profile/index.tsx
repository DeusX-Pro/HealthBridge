import PharmacyLayout from '@/layouts/pharmacy-layout';
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
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Profile' },
];

interface Pharmacy {
    id: number;
    user_id: number;
    uuid: string;
    business_name: string;
    pcn_license_number: string;
    pcn_license_expiry: string | null;
    cac_registration_number: string | null;
    pcn_license_document: string | null;
    cac_certificate: string | null;
    pharmacist_id_card: string | null;
    facility_photo: string | null;
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
    pharmacy?: Pharmacy;
}

interface PageProps {
    user: UserData;
    [key: string]: any;
}

export default function PharmacyProfile() {
    const { user } = usePage<PageProps>().props;
    const pharmacy = user.pharmacy;

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

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Pharmacy Profile" />

            <div className="space-y-8 pb-12">
                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
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
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl ring-4 ring-white/10">
                                        <span className="text-4xl font-bold text-white">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="mb-2 flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-bold text-white md:text-4xl">
                                            {pharmacy?.business_name || user.name}
                                        </h1>
                                        {pharmacy && (
                                            <span
                                                className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm flex items-center gap-1 ${getStatusColor(
                                                    pharmacy.status,
                                                )}`}
                                            >
                                                {getStatusIcon(pharmacy.status)}
                                                {pharmacy.status}
                                            </span>
                                        )}
                                    </div>
                                    {user.bio && (
                                        <p className="mb-3 max-w-2xl text-purple-100">
                                            {user.bio}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                                            <Award className="h-4 w-4" />
                                            <span className="capitalize">Pharmacy</span>
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
                                        {pharmacy?.verified_at && (
                                            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/20 px-3 py-1.5 text-sm font-medium text-white">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Business Verified
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href="/pharmacy/settings">
                                    <Button className="bg-white font-semibold text-purple-600 hover:bg-purple-50">
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
                    <Card className="border-0 bg-gradient-to-br from-purple-50 to-indigo-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">Status</p>
                        <p className="text-lg font-semibold capitalize">
                            {pharmacy?.status || 'N/A'}
                        </p>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">Member Since</p>
                        <p className="text-lg font-semibold">
                            {new Date(user.created_at).getFullYear()}
                        </p>
                    </Card>
                    {pharmacy?.verified_at && (
                        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 p-4 shadow-md">
                            <p className="mb-1 text-xs text-gray-600 uppercase">Verified Date</p>
                            <p className="text-lg font-semibold">
                                {new Date(pharmacy.verified_at).getFullYear()}
                            </p>
                        </Card>
                    )}
                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-md">
                        <p className="mb-1 text-xs text-gray-600 uppercase">PCN License</p>
                        <p className="text-lg font-semibold">
                            {pharmacy?.pcn_license_number || 'N/A'}
                        </p>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Business Information */}
                    {pharmacy && (
                        <Card className="border-0 p-6 shadow-xl">
                            <SectionHeader
                                icon={<Building2 className="h-5 w-5 text-white" />}
                                title="Business Information"
                                subtitle="Your pharmacy business details"
                                bg="from-purple-500 to-indigo-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={<Building2 className="h-5 w-5 text-purple-600" />}
                                    label="Business Name"
                                    value={pharmacy.business_name}
                                />
                                <InfoItem
                                    icon={<CreditCard className="h-5 w-5 text-purple-600" />}
                                    label="PCN License Number"
                                    value={pharmacy.pcn_license_number}
                                />
                                <InfoItem
                                    icon={<Calendar className="h-5 w-5 text-purple-600" />}
                                    label="PCN License Expiry"
                                    value={formatDate(pharmacy.pcn_license_expiry)}
                                />
                                <InfoItem
                                    icon={<FileText className="h-5 w-5 text-purple-600" />}
                                    label="CAC Registration"
                                    value={pharmacy.cac_registration_number || 'Not provided'}
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
                    {pharmacy && (
                        <Card className="border-0 p-6 shadow-xl">
                            <SectionHeader
                                icon={<MapPin className="h-5 w-5 text-white" />}
                                title="Location Information"
                                subtitle="Your pharmacy location details"
                                bg="from-blue-500 to-indigo-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5 text-blue-600" />}
                                    label="Address"
                                    value={pharmacy.address || 'Not provided'}
                                    fullWidth
                                />
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5 text-indigo-600" />}
                                    label="City"
                                    value={pharmacy.city || 'Not provided'}
                                />
                                <InfoItem
                                    icon={<MapPin className="h-5 w-5 text-blue-600" />}
                                    label="State"
                                    value={pharmacy.state || 'Not provided'}
                                />
                                {pharmacy.latitude && pharmacy.longitude && (
                                    <InfoItem
                                        icon={<MapPin className="h-5 w-5 text-indigo-600" />}
                                        label="Coordinates"
                                        value={`${pharmacy.latitude}, ${pharmacy.longitude}`}
                                    />
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Documents */}
                    {pharmacy && (
                        <Card className="border-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 shadow-xl">
                            <SectionHeader
                                icon={<FileText className="h-5 w-5 text-white" />}
                                title="Business Documents"
                                subtitle="Your uploaded business documents"
                                bg="from-amber-500 to-orange-600"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                {pharmacy.pcn_license_document && (
                                    <DocumentItem
                                        label="PCN License Document"
                                        path={pharmacy.pcn_license_document}
                                    />
                                )}
                                {pharmacy.cac_certificate && (
                                    <DocumentItem
                                        label="CAC Certificate"
                                        path={pharmacy.cac_certificate}
                                    />
                                )}
                                {pharmacy.pharmacist_id_card && (
                                    <DocumentItem
                                        label="Pharmacist ID Card"
                                        path={pharmacy.pharmacist_id_card}
                                    />
                                )}
                                {pharmacy.facility_photo && (
                                    <DocumentItem
                                        label="Facility Photo"
                                        path={pharmacy.facility_photo}
                                    />
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Verification Status */}
                    {pharmacy && (
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
                                    value={pharmacy.status.charAt(0).toUpperCase() + pharmacy.status.slice(1)}
                                    fullWidth
                                />
                                {pharmacy.verified_at && (
                                    <InfoItem
                                        icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                                        label="Verified At"
                                        value={formatDate(pharmacy.verified_at)}
                                        fullWidth
                                    />
                                )}
                                {pharmacy.rejection_reason && (
                                    <InfoItem
                                        icon={<X className="h-5 w-5 text-red-600" />}
                                        label="Rejection Reason"
                                        value={pharmacy.rejection_reason}
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
                            {pharmacy && (
                                <AccountItem label="Pharmacy ID" value={pharmacy.uuid} />
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
        </PharmacyLayout>
    );
}

/* --- Subcomponents --- */
const InfoItem = ({ icon, label, value, fullWidth = false }: any) => (
    <div
        className={`group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 transition-all hover:border-purple-200 hover:shadow-md ${fullWidth ? 'sm:col-span-2' : ''}`}
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


