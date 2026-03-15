import AppLayout from '@/layouts/patient-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    LayoutDashboard,
    Bot,
    Calendar,
    Stethoscope,
    Pill,
    FileText,
    ClipboardList,
    Activity,
    Video,
    Store,
    MessageSquare,
    Wallet,
    Heart,
    Phone,
    User,
    Settings,
    ChevronRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Gift,
    Zap,
    Users,
    MapPin,
    Star,
    Shield,
    HeartPulse,
    Droplet,
    Thermometer,
    Weight,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    nextAppointment: any;
    latestVitals: any;
    activePrescriptions: any[];
    walletBalance: number;
    [key: string]: any;
}

export default function Dashboard() {
    const { auth, nextAppointment, latestVitals, activePrescriptions, walletBalance } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    Welcome back! 👋 {auth.user.name}
                                </h1>
                                <p className="max-w-2xl text-sm text-green-50 sm:text-base">
                                    Your health companion is here. Get instant
                                    AI health guidance, connect with volunteer
                                    doctors, or schedule affordable telehealth
                                    consultations.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <Heart className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/patient/doctors">
                                <Button
                                    variant="outline"
                                    className="bg-white text-green-700 shadow-lg hover:bg-green-50"
                                >
                                    <Stethoscope className="mr-2 h-4 w-4" />
                                    My Doctors
                                </Button>
                            </Link>
                            <Link href="/patient/ai-doctor">
                                <Button className="bg-white text-green-700 shadow-lg hover:bg-green-50">
                                    <Bot className="mr-2 h-4 w-4" />
                                    Ask AI Doctor
                                </Button>
                            </Link>
                            <Link href="/patient/appointments">
                                <Button
                                    variant="outline"
                                    className="bg-white text-green-700 shadow-lg hover:bg-green-50"
                                >
                                    <Video className="mr-2 h-4 w-4" />
                                    Book Appointment
                                </Button>
                            </Link>
                            <Link href="/patient/emergency">
                                <Button
                                    variant="outline"
                                    className="bg-white text-green-700 shadow-lg hover:bg-green-50"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Emergency Hotline
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-green-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <Calendar className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Next Appointment
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    {nextAppointment ? nextAppointment.appointment_date : 'None Scheduled'}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {nextAppointment ? nextAppointment.appointment_time : 'Book one now'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <MessageSquare className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Unread Messages
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    0
                                </p>
                                <p className="text-xs text-gray-500">
                                    No new notifications
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <Pill className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Active Medications
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    {activePrescriptions.length}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Prescriptions
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-blue-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Lab Results
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    0
                                </p>
                                <p className="text-xs text-gray-500">
                                    None yet
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Health Vitals & Wallet Balance */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Today's Health Vitals */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HeartPulse className="h-5 w-5 text-red-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Today's Health Vitals
                                </h2>
                            </div>
                            <Link href="/patient/vitals-tracking">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    Update Vitals
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-red-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Blood Pressure
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {latestVitals ? latestVitals.blood_pressure : '--/--'}
                                </p>
                                <p className="text-xs font-medium text-green-600">
                                    Normal
                                </p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Droplet className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Blood Sugar
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {latestVitals ? latestVitals.blood_sugar : '--'}
                                </p>
                                <p className="text-xs font-medium text-green-600">
                                    Normal
                                </p>
                            </div>

                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Thermometer className="h-4 w-4 text-orange-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Temperature
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {latestVitals ? `${latestVitals.temperature}°C` : '--'}
                                </p>
                                <p className="text-xs font-medium text-green-600">
                                    Normal
                                </p>
                            </div>

                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Weight className="h-4 w-4 text-purple-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Weight
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    {latestVitals ? `${latestVitals.weight} kg` : '--'}
                                </p>
                                <p className="text-xs font-medium text-blue-600">
                                    Managed
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            All vitals are within healthy range
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Keep up the good work!
                                        </p>
                                    </div>
                                </div>
                                <Link href="/patient/vitals-tracking">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-green-600 text-green-700"
                                    >
                                        View History
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    {/* Wallet & Credits */}
                    <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-amber-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Wallet Balance
                            </h2>
                        </div>
                        <div className="mb-4">
                            <p className="text-3xl font-bold text-gray-900">
                                ${walletBalance || '0.00'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Available Credits
                            </p>
                        </div>
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <div className="flex items-center gap-2">
                                    <Gift className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Free Consultations
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-green-600">
                                    2 left
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Discount Vouchers
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-blue-600">
                                    3 active
                                </span>
                            </div>
                        </div>
                        <Link href="/patient/wallet">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                Add Credits
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Upcoming Appointments */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-green-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Upcoming Appointments
                                </h2>
                            </div>
                            <Link href="/patient/appointments">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {auth.user.patient?.appointments?.slice(0, 2).map((apt: any) => (
                                <div key={apt.uuid} className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                                        <Video className="h-6 w-6" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {apt.doctor?.user?.name || 'Doctor'}
                                            </h3>
                                            <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                                                {apt.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {apt.reason || 'General Consultation'}
                                        </p>
                                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {apt.appointment_date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {apt.appointment_time}
                                            </span>
                                        </div>
                                    </div>
                                    {apt.appointment_date === new Date().toISOString().split('T')[0] && (
                                        <Link href="/patient/telemedicine">
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                Join Now
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {(!auth.user.patient?.appointments || auth.user.patient.appointments.length === 0) && (
                                <p className="text-center py-8 text-gray-500 italic">No upcoming appointments</p>
                            )}

                            <Link href="/patient/appointments">
                                <Button
                                    variant="outline"
                                    className="w-full border-2 border-dashed text-green-600 hover:bg-green-50"
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule New Appointment
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="mb-6 text-lg font-bold text-gray-900">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <Link href="/patient/ai-doctor">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-green-700">
                                            AI Health Assistant
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Get instant answers
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
                                </button>
                            </Link>

                            <Link href="/patient/doctors">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <Stethoscope className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                                            Find a Doctor
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Browse specialists
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                </button>
                            </Link>

                            <Link href="/patient/telemedicine">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <Video className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-purple-700">
                                            Telehealth Visit
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Affordable pricing
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                                </button>
                            </Link>

                            <Link href="/patient/emergency">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-red-700">
                                            Emergency Hotline
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            24/7 support
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
                                </button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Medical Records & Prescriptions */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Active Prescriptions */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Pill className="h-5 w-5 text-orange-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Active Prescriptions
                                </h2>
                            </div>
                            <Link href="/patient/prescriptions">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {activePrescriptions.map((pres: any) => (
                                <div key={pres.uuid} className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {pres.notes.split(' - ')[0] || 'Prescription'}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {pres.notes.split(' - ')[1] || pres.notes}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-orange-600 px-2 py-1 text-xs text-white">
                                            {pres.status}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                        <span>Prescribed by {pres.doctor?.user?.name || 'Doctor'}</span>
                                    </div>
                                </div>
                            ))}

                            {activePrescriptions.length === 0 && (
                                <p className="text-center py-8 text-gray-500 italic">No active prescriptions</p>
                            )}

                            <Link href="/patient/prescriptions">
                                <Button
                                    variant="outline"
                                    className="w-full text-orange-600 hover:bg-orange-50"
                                >
                                    <Pill className="mr-2 h-4 w-4" />
                                    Request Prescription Refill
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Recent Lab Results */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Lab Results
                                </h2>
                            </div>
                            <Link href="/patient/lab-results">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Complete Blood Count
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            All parameters normal
                                        </p>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Dec 10, 2024
                                    </span>
                                    <span>•</span>
                                    <span>Central Lab</span>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="mt-3 h-auto p-0 text-green-600 hover:text-green-700"
                                >
                                    View Detailed Report →
                                </Button>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Lipid Panel
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Cholesterol levels healthy
                                        </p>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Dec 5, 2024
                                    </span>
                                    <span>•</span>
                                    <span>Central Lab</span>
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="mt-3 h-auto p-0 text-blue-600 hover:text-blue-700"
                                >
                                    View Detailed Report →
                                </Button>
                            </div>

                            <Link href="/patient/lab-results">
                                <Button
                                    variant="outline"
                                    className="w-full text-blue-600 hover:bg-blue-50"
                                >
                                    <ClipboardList className="mr-2 h-4 w-4" />
                                    Book Lab Test
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Health Records & Messages */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Health Records */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-purple-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Health Records
                                </h2>
                            </div>
                            <Link href="/patient/health-records">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-purple-600" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                Medical History
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Complete health timeline
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Last updated: Dec 10, 2024
                                </p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                Immunization Records
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                All vaccinations up to date
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    COVID-19 booster due: Mar 2025
                                </p>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Heart className="h-5 w-5 text-green-600" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                Allergies & Conditions
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                2 allergies recorded
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Penicillin, Peanuts
                                </p>
                            </div>

                            <Link href="/patient/health-records">
                                <Button
                                    variant="outline"
                                    className="w-full text-purple-600 hover:bg-purple-50"
                                >
                                    <ClipboardList className="mr-2 h-4 w-4" />
                                    Manage Health Records
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Messages */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Messages
                                </h2>
                            </div>
                            <Link href="/patient/messages">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            <div className="cursor-pointer rounded-xl border border-green-100 bg-green-50 p-4 transition-all hover:shadow-md">
                                <div className="mb-2 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                                            <Stethoscope className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                Dr. Sarah Johnson
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Your test results are ready...
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                                        New
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>

                            <div className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-md">
                                <div className="mb-2 flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            City General Hospital
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Appointment confirmed for tomorrow
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">Yesterday</p>
                            </div>

                            <div className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-md">
                                <div className="mb-2 flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                                        <Store className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Community Pharmacy
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Your prescription is ready for pickup
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">2 days ago</p>
                            </div>

                            <Link href="/patient/messages">
                                <Button
                                    variant="outline"
                                    className="w-full text-blue-600 hover:bg-blue-50"
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    View All Messages
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Pharmacies & Health Tips */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Nearby Pharmacies */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Store className="h-5 w-5 text-teal-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Nearby Pharmacies
                                </h2>
                            </div>
                            <Link href="/patient/pharmacies">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                >
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            <div className="cursor-pointer rounded-xl border border-teal-100 bg-teal-50 p-4 transition-all hover:shadow-md">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            HealthPlus Pharmacy
                                        </h3>
                                        <div className="mt-1 flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            <span className="text-xs text-gray-600">
                                                4.8 (156 reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700">
                                        0.3 km
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-gray-600">
                                    Open 24/7 • Home delivery available
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        <Phone className="mr-1 h-3 w-3" />
                                        Call
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        <MapPin className="mr-1 h-3 w-3" />
                                        Directions
                                    </Button>
                                </div>
                            </div>

                            <div className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-md">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            MedCare Drugstore
                                        </h3>
                                        <div className="mt-1 flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            <span className="text-xs text-gray-600">
                                                4.6 (89 reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        0.7 km
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-gray-600">
                                    Open 8AM-10PM • Free parking
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        <Phone className="mr-1 h-3 w-3" />
                                        Call
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        <MapPin className="mr-1 h-3 w-3" />
                                        Directions
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Health Tips */}
                    <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-pink-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Daily Health Tips
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-lg border border-pink-100 bg-white p-4">
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    💧 Stay Hydrated
                                </h3>
                                <p className="text-sm text-gray-700">
                                    Drink at least 8 glasses of water daily to support your immune system and overall health.
                                </p>
                            </div>

                            <div className="rounded-lg border border-pink-100 bg-white p-4">
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    🏃 Daily Exercise
                                </h3>
                                <p className="text-sm text-gray-700">
                                    Just 30 minutes of moderate activity can boost your mood and energy levels.
                                </p>
                            </div>

                            <div className="rounded-lg border border-pink-100 bg-white p-4">
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    😴 Quality Sleep
                                </h3>
                                <p className="text-sm text-gray-700">
                                    Aim for 7-9 hours of sleep each night for optimal recovery and health.
                                </p>
                            </div>

                            <Link href="/patient/health-tips">
                                <Button
                                    variant="outline"
                                    className="w-full border-pink-600 text-pink-700 hover:bg-pink-100"
                                >
                                    More Health Tips
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Emergency & Settings */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Emergency Contacts */}
                    <Card className="border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Phone className="h-5 w-5 text-red-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Emergency Contacts
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-lg border border-red-100 bg-white p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Emergency Hotline
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            24/7 Medical Support
                                        </p>
                                    </div>
                                    <Link href="/patient/emergency">
                                        <Button
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            <Phone className="mr-1 h-3 w-3" />
                                            Call
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="rounded-lg border border-orange-100 bg-white p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Ambulance Service
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Emergency Transport
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-orange-600 text-orange-700"
                                    >
                                        <Phone className="mr-1 h-3 w-3" />
                                        Call
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-center text-xs text-gray-600">
                            In case of life-threatening emergency, call your local emergency number immediately
                        </p>
                    </Card>

                    {/* Profile Summary */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Profile Summary
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <span className="text-sm text-gray-600">
                                    Profile Completion
                                </span>
                                <span className="text-sm font-bold text-green-600">
                                    85%
                                </span>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <p className="mb-1 text-xs text-gray-600">
                                    Blood Type
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    O+
                                </p>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <p className="mb-1 text-xs text-gray-600">
                                    Emergency Contact
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    Jane Doe
                                </p>
                            </div>
                            <Link href="/patient/profile">
                                <Button
                                    variant="outline"
                                    className="w-full text-blue-600 hover:bg-blue-50"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Settings & Preferences */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Quick Settings
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <span className="text-sm text-gray-700">
                                    Notifications
                                </span>
                                <span className="text-xs font-medium text-green-600">
                                    Enabled
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <span className="text-sm text-gray-700">
                                    Auto-Refill
                                </span>
                                <span className="text-xs font-medium text-blue-600">
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <span className="text-sm text-gray-700">
                                    Data Sharing
                                </span>
                                <span className="text-xs font-medium text-gray-600">
                                    Limited
                                </span>
                            </div>
                            <Link href="/patient/settings">
                                <Button
                                    variant="outline"
                                    className="w-full text-gray-700 hover:bg-gray-50"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Manage Settings
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}