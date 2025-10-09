import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Bot,
    Calendar,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Clock,
    Droplet,
    FileText,
    Gift,
    Heart,
    HeartPulse,
    MapPin,
    MessageSquare,
    Moon,
    Phone,
    Pill,
    Shield,
    Star,
    Stethoscope,
    Thermometer,
    Users,
    Utensils,
    Video,
    Wallet,
    Weight,
    Zap,
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
    [key: string]: any; // Add index signature to satisfy the constraint
}

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                    Tomorrow
                                </p>
                                <p className="text-xs text-gray-500">2:00 PM</p>
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
                                    AI Consultations
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    12
                                </p>
                                <p className="text-xs text-gray-500">
                                    This month
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
                                    3
                                </p>
                                <p className="text-xs text-gray-500">
                                    Prescriptions
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
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                            >
                                Update Vitals
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
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
                                    120/80
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
                                    95 mg/dL
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
                                    98.6°F
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
                                    72 kg
                                </p>
                                <p className="text-xs font-medium text-blue-600">
                                    -0.5kg
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
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-600 text-green-700"
                                >
                                    View History
                                </Button>
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
                                $45.00
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
                        <Button className="w-full bg-amber-600 hover:bg-amber-700">
                            Add Credits
                        </Button>
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
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                                    <Video className="h-6 w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">
                                            Dr. Sarah Johnson
                                        </h3>
                                        <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                                            Telehealth
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        General Consultation
                                    </p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Tomorrow, Dec 15
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            2:00 PM - 2:30 PM
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Join Now
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                    <Stethoscope className="h-6 w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">
                                            Dr. Michael Chen
                                        </h3>
                                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                            Volunteer
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Follow-up Checkup
                                    </p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Dec 18, 2024
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            10:00 AM - 10:30 AM
                                        </span>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">
                                    Reschedule
                                </Button>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-2 border-dashed text-green-600 hover:bg-green-50"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule New Appointment
                            </Button>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="mb-6 text-lg font-bold text-gray-900">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
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

                            <button className="group flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                                        Volunteer Doctor
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Free consultation
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                            </button>

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
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Amoxicillin 500mg
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            3 times daily after meals
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-orange-600 px-2 py-1 text-xs text-white">
                                        Active
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span>Prescribed by Dr. Sarah Johnson</span>
                                    <span>•</span>
                                    <span>5 days remaining</span>
                                </div>
                                <div className="mt-3">
                                    <div className="mb-1 flex justify-between text-xs text-gray-600">
                                        <span>Progress</span>
                                        <span>50%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-2 rounded-full bg-orange-600"
                                            style={{ width: '50%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Vitamin D3 1000IU
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Once daily in the morning
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                                        Ongoing
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span>Prescribed by Dr. Michael Chen</span>
                                    <span>•</span>
                                    <span>Long-term</span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full text-orange-600 hover:bg-orange-50"
                            >
                                <Pill className="mr-2 h-4 w-4" />
                                Request Prescription Refill
                            </Button>
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
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
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

                            <Button
                                variant="outline"
                                className="w-full text-blue-600 hover:bg-blue-50"
                            >
                                <ClipboardList className="mr-2 h-4 w-4" />
                                Book Lab Test
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Additional Info Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Health Alerts */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Health Reminders
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-lg border border-orange-100 bg-orange-50 p-3">
                                <div className="flex items-start gap-2">
                                    <Pill className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Medication Due
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Take Vitamin D - 8:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                <div className="flex items-start gap-2">
                                    <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Blood Pressure Check
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Record your reading today
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                                <div className="flex items-start gap-2">
                                    <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Annual Checkup Due
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Schedule within 2 weeks
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Recent Activity
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                    <Bot className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        AI Consultation
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        About headache symptoms
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        2 hours ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Lab Results
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Blood work completed
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Yesterday
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                                    <Video className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Telehealth Session
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        With Dr. Sarah Johnson
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        3 days ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                                    <Pill className="h-4 w-4 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Prescription Filled
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Amoxicillin 500mg
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        5 days ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Health Tips */}
                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Heart className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Today's Health Tip
                            </h2>
                        </div>
                        <p className="mb-4 text-sm text-gray-700">
                            Drink at least 8 glasses of water daily to stay
                            hydrated and support your immune system. Proper
                            hydration helps your body function optimally.
                        </p>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-600 text-xs text-white">
                                    <Droplet className="h-3 w-3" />
                                </div>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs text-white">
                                    <Utensils className="h-3 w-3" />
                                </div>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-purple-600 text-xs text-white">
                                    <Moon className="h-3 w-3" />
                                </div>
                            </div>
                            <span className="text-xs text-gray-600">
                                Daily wellness goals
                            </span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-green-600 text-green-700 hover:bg-green-100"
                        >
                            More Health Tips
                        </Button>
                    </Card>
                </div>

                {/* Healthcare Network & Community */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Nearby Healthcare Centers */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-red-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Nearby Healthcare Centers
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                            >
                                View Map
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-green-200 hover:bg-green-50">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            City General Hospital
                                        </h3>
                                        <div className="mt-1 flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            <span className="text-xs text-gray-600">
                                                4.5 (320 reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        0.8 km
                                    </span>
                                </div>
                                <p className="mb-2 text-xs text-gray-600">
                                    Emergency care, Lab tests, Pharmacy
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

                            <div className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-green-200 hover:bg-green-50">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            HealthCare Plus Clinic
                                        </h3>
                                        <div className="mt-1 flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            <span className="text-xs text-gray-600">
                                                4.7 (185 reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        1.2 km
                                    </span>
                                </div>
                                <p className="mb-2 text-xs text-gray-600">
                                    Primary care, Vaccinations, Diagnostics
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

                            <div className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-green-200 hover:bg-green-50">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Community Pharmacy
                                        </h3>
                                        <div className="mt-1 flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            <span className="text-xs text-gray-600">
                                                4.3 (95 reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        0.5 km
                                    </span>
                                </div>
                                <p className="mb-2 text-xs text-gray-600">
                                    Medications, Health products, Consultations
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

                    {/* Health Insurance & Coverage */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Health Insurance & Benefits
                            </h2>
                        </div>

                        <div className="mb-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Basic Health Plan
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        Active until Dec 2025
                                    </p>
                                </div>
                                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                                    Active
                                </span>
                            </div>
                            <div className="mb-3 grid grid-cols-2 gap-3">
                                <div className="rounded-lg bg-white p-3">
                                    <p className="mb-1 text-xs text-gray-600">
                                        Coverage
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        $5,000
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-3">
                                    <p className="mb-1 text-xs text-gray-600">
                                        Used
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        $1,240
                                    </p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="mb-1 flex justify-between text-xs text-gray-600">
                                    <span>Coverage Used</span>
                                    <span>24.8%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-blue-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600"
                                        style={{ width: '24.8%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Telehealth Visits
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-green-600">
                                    Covered
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Lab Tests
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-green-600">
                                    80% Covered
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Prescriptions
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-green-600">
                                    60% Covered
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full text-blue-600 hover:bg-blue-50"
                        >
                            View Full Coverage Details
                        </Button>
                    </Card>
                </div>

                {/* Educational Resources & Community Support */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Health Education */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Health Resources
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <button className="group w-full rounded-lg border border-purple-100 bg-purple-50 p-3 text-left transition-all hover:shadow-md">
                                <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                                    Managing Diabetes
                                </h3>
                                <p className="mb-2 text-xs text-gray-600">
                                    Essential tips for blood sugar control
                                </p>
                                <span className="text-xs font-medium text-purple-600">
                                    5 min read →
                                </span>
                            </button>
                            <button className="group w-full rounded-lg border border-blue-100 bg-blue-50 p-3 text-left transition-all hover:shadow-md">
                                <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                                    Heart Health Guide
                                </h3>
                                <p className="mb-2 text-xs text-gray-600">
                                    Preventing cardiovascular diseases
                                </p>
                                <span className="text-xs font-medium text-blue-600">
                                    7 min read →
                                </span>
                            </button>
                            <button className="group w-full rounded-lg border border-green-100 bg-green-50 p-3 text-left transition-all hover:shadow-md">
                                <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-green-700">
                                    Nutrition Basics
                                </h3>
                                <p className="mb-2 text-xs text-gray-600">
                                    Building a healthy diet plan
                                </p>
                                <span className="text-xs font-medium text-green-600">
                                    6 min read →
                                </span>
                            </button>
                        </div>
                    </Card>

                    {/* Community Support */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Community
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Support Groups
                                    </h3>
                                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                        New
                                    </span>
                                </div>
                                <p className="mb-2 text-xs text-gray-600">
                                    Connect with others facing similar health
                                    challenges
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-600 text-xs text-blue-700"
                                >
                                    Join Group
                                </Button>
                            </div>
                            <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Ask the Community
                                </h3>
                                <p className="mb-2 text-xs text-gray-600">
                                    Get advice from verified health
                                    professionals
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-600 text-xs text-green-700"
                                >
                                    Ask Question
                                </Button>
                            </div>
                            <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                                    Success Stories
                                </h3>
                                <p className="mb-2 text-xs text-gray-600">
                                    Read inspiring health journeys
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-purple-600 text-xs text-purple-700"
                                >
                                    Read Stories
                                </Button>
                            </div>
                        </div>
                    </Card>

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
                                    <Button
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        <Phone className="mr-1 h-3 w-3" />
                                        Call
                                    </Button>
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
                            <div className="rounded-lg border border-yellow-100 bg-white p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Mental Health Crisis
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Confidential Support
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-yellow-600 text-yellow-700"
                                    >
                                        <Phone className="mr-1 h-3 w-3" />
                                        Call
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-center text-xs text-gray-600">
                            In case of life-threatening emergency, call your
                            local emergency number immediately
                        </p>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
