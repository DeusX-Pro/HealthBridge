import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/doctor-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    Award,
    BarChart3,
    Calendar,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Clock,
    DollarSign,
    FileText,
    Gift,
    Globe,
    GraduationCap,
    HandHeart,
    MessageSquare,
    Phone,
    Pill,
    Send,
    Shield,
    Star,
    Stethoscope,
    Target,
    ThumbsUp,
    TrendingUp,
    UserCheck,
    Users,
    Video,
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

export default function DoctorDashboard() {
    const { auth } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Doctor Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    Welcome back! 👋 {auth.user.name}
                                </h1>
                                <p className="max-w-2xl text-sm text-blue-50 sm:text-base">
                                    You're making a difference! Your volunteer
                                    work provides essential healthcare to
                                    underserved communities. Today you have 8
                                    appointments scheduled.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <Stethoscope className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button className="bg-white text-blue-700 shadow-lg hover:bg-blue-50">
                                <Video className="mr-2 h-4 w-4" />
                                Start Consultation
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white text-blue-700 shadow-lg hover:bg-blue-50"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                View Schedule
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white text-blue-700 shadow-lg hover:bg-blue-50"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                My Patients
                            </Button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Today's Appointments
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    8
                                </p>
                                <p className="text-xs text-gray-500">
                                    3 completed
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Active Patients
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    142
                                </p>
                                <p className="flex items-center gap-1 text-xs text-green-600">
                                    <ArrowUp className="h-3 w-3" />
                                    12 this week
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <HandHeart className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Volunteer Hours
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    45.5
                                </p>
                                <p className="text-xs text-gray-500">
                                    This month
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-amber-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                                <Star className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Patient Rating
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    4.9
                                </p>
                                <p className="text-xs text-gray-500">
                                    From 87 reviews
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Impact Metrics & Earnings */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Impact This Month */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Your Impact This Month
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View Details
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <UserCheck className="h-4 w-4 text-green-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Patients Helped
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    156
                                </p>
                                <p className="flex items-center gap-1 text-xs font-medium text-green-600">
                                    <ArrowUp className="h-3 w-3" />
                                    22% vs last month
                                </p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Video className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Consultations
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    89
                                </p>
                                <p className="flex items-center gap-1 text-xs font-medium text-blue-600">
                                    <ArrowUp className="h-3 w-3" />
                                    15% increase
                                </p>
                            </div>

                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Pill className="h-4 w-4 text-purple-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Prescriptions
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    134
                                </p>
                                <p className="text-xs font-medium text-purple-600">
                                    Issued
                                </p>
                            </div>

                            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-amber-600" />
                                    <span className="text-xs font-medium text-gray-600">
                                        Countries Served
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    12
                                </p>
                                <p className="text-xs font-medium text-amber-600">
                                    Communities
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Target className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Monthly Goal
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-green-600">
                                        85%
                                    </span>
                                </div>
                                <div className="mb-2 h-2 w-full rounded-full bg-green-200">
                                    <div
                                        className="h-2 rounded-full bg-green-600"
                                        style={{ width: '85%' }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-600">
                                    170 of 200 patients target
                                </p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Achievement
                                        </span>
                                    </div>
                                    <Gift className="h-4 w-4 text-blue-600" />
                                </div>
                                <p className="mb-1 text-sm font-bold text-gray-900">
                                    Top Volunteer Doctor
                                </p>
                                <p className="text-xs text-gray-600">
                                    You're in the top 5% this month!
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Earnings Summary */}
                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Earnings
                            </h2>
                        </div>
                        <div className="mb-6">
                            <p className="mb-1 text-sm text-gray-600">
                                This Month
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                $2,450
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-sm font-medium text-green-600">
                                <ArrowUp className="h-4 w-4" />
                                18% from last month
                            </p>
                        </div>

                        <div className="mb-4 space-y-3">
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Telehealth
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        45 consultations
                                    </p>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    $1,800
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Platform Bonus
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Top performer
                                    </p>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    $500
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Referrals
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        3 new patients
                                    </p>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    $150
                                </span>
                            </div>
                        </div>

                        <Button className="w-full bg-green-600 hover:bg-green-700">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Withdraw Earnings
                        </Button>
                    </Card>
                </div>

                {/* Appointments & Urgent Cases */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Today's Appointments */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Today's Appointments
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white">
                                    AM
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">
                                            Amina Okonkwo
                                        </h3>
                                        <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                                            Now
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Follow-up: Hypertension Management
                                    </p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            9:00 AM - 9:30 AM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Video className="h-3 w-3" />
                                            Telemedicine
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <Video className="mr-1 h-3 w-3" />
                                    Join
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                                    KM
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">
                                            Kwame Mensah
                                        </h3>
                                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                            Volunteer
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Initial Consultation: Chest Pain
                                    </p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            10:00 AM - 10:30 AM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Video className="h-3 w-3" />
                                            Video Call
                                        </span>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-purple-600 text-lg font-bold text-white">
                                    SN
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">
                                            Sarah Ndlovu
                                        </h3>
                                        <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs text-white">
                                            Paid
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Diabetes Management Consultation
                                    </p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            2:00 PM - 2:30 PM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Video className="h-3 w-3" />
                                            Telemedicine
                                        </span>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">
                                    View Details
                                </Button>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-2 border-dashed text-blue-600 hover:bg-blue-50"
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                View Full Schedule
                            </Button>
                        </div>
                    </Card>

                    {/* Urgent Cases */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Urgent Cases
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            John Osei
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            High fever (39.5°C)
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-red-600 px-2 py-1 text-xs text-white">
                                        Urgent
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-gray-500">
                                    Requested: 15 mins ago
                                </p>
                                <Button
                                    size="sm"
                                    className="w-full bg-red-600 hover:bg-red-700"
                                >
                                    <Phone className="mr-1 h-3 w-3" />
                                    Call Patient Now
                                </Button>
                            </div>

                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Grace Mwangi
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Severe headache
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-orange-600 px-2 py-1 text-xs text-white">
                                        High
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-gray-500">
                                    Requested: 1 hour ago
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full border-orange-600 text-orange-700"
                                >
                                    <MessageSquare className="mr-1 h-3 w-3" />
                                    Send Message
                                </Button>
                            </div>

                            <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Peter Adomako
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Prescription refill
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-yellow-600 px-2 py-1 text-xs text-white">
                                        Medium
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-gray-500">
                                    Requested: 3 hours ago
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                >
                                    Review Request
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Patient Messages & Pending Tasks */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Messages */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Messages
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 transition-colors hover:bg-blue-100">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                    AM
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">
                                            Amina Okonkwo
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            10 mins ago
                                        </span>
                                    </div>
                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        Thank you for the consultation. My blood
                                        pressure has improved...
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                            3 new
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                                    KM
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">
                                            Kwame Mensah
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            1 hour ago
                                        </span>
                                    </div>
                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        Can I get a copy of my prescription from
                                        last visit?
                                    </p>
                                </div>
                            </div>

                            <div className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
                                    SN
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">
                                            Sarah Ndlovu
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            3 hours ago
                                        </span>
                                    </div>
                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        Looking forward to our appointment at 2
                                        PM today.
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full text-blue-600 hover:bg-blue-50"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                View All Messages
                            </Button>
                        </div>
                    </Card>

                    {/* Pending Tasks */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-orange-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Pending Tasks
                                </h2>
                            </div>
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                12 tasks
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-600 text-white">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold text-gray-900">
                                            Review Lab Results
                                        </h3>
                                        <p className="mb-2 text-sm text-gray-600">
                                            5 pending lab reports need review
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-orange-600 text-orange-700"
                                        >
                                            Review Now
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <Pill className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold text-gray-900">
                                            Prescription Approvals
                                        </h3>
                                        <p className="mb-2 text-sm text-gray-600">
                                            3 prescription refill requests
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-blue-600 text-blue-700"
                                        >
                                            Approve
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-600 text-white">
                                        <ClipboardList className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold text-gray-900">
                                            Medical Records
                                        </h3>
                                        <p className="mb-2 text-sm text-gray-600">
                                            8 records need to be updated
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-green-600 text-green-700"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold text-gray-900">
                                            Follow-up Scheduling
                                        </h3>
                                        <p className="mb-2 text-sm text-gray-600">
                                            4 patients need follow-up
                                            appointments
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-purple-600 text-purple-700"
                                        >
                                            Schedule
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Performance Analytics & Patient Feedback */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Performance This Week */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Performance Analytics
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View Report
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                                        <ArrowUp className="h-3 w-3" />
                                        12%
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    98%
                                </p>
                                <p className="text-xs text-gray-600">
                                    Response Rate
                                </p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                    <span className="flex items-center gap-1 text-xs font-medium text-blue-600">
                                        <ArrowDown className="h-3 w-3" />
                                        8%
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    8 min
                                </p>
                                <p className="text-xs text-gray-600">
                                    Avg Response
                                </p>
                            </div>

                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <ThumbsUp className="h-4 w-4 text-purple-600" />
                                    <span className="flex items-center gap-1 text-xs font-medium text-purple-600">
                                        <ArrowUp className="h-3 w-3" />
                                        5%
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    96%
                                </p>
                                <p className="text-xs text-gray-600">
                                    Satisfaction
                                </p>
                            </div>

                            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <Activity className="h-4 w-4 text-amber-600" />
                                    <span className="text-xs font-medium text-amber-600">
                                        Stable
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">
                                    32 min
                                </p>
                                <p className="text-xs text-gray-600">
                                    Avg Session
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Weekly Comparison
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            vs last week
                                        </p>
                                    </div>
                                    <Zap className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <p className="mb-1 text-xs text-gray-600">
                                            Consultations
                                        </p>
                                        <p className="text-lg font-bold text-gray-900">
                                            +18
                                        </p>
                                        <p className="text-xs font-medium text-green-600">
                                            ↑ 25%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs text-gray-600">
                                            New Patients
                                        </p>
                                        <p className="text-lg font-bold text-gray-900">
                                            +12
                                        </p>
                                        <p className="text-xs font-medium text-green-600">
                                            ↑ 30%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs text-gray-600">
                                            Avg Rating
                                        </p>
                                        <p className="text-lg font-bold text-gray-900">
                                            4.9
                                        </p>
                                        <p className="text-xs font-medium text-green-600">
                                            ↑ 0.2
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Achievement Unlocked!
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            100+ Consultations This Month
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-600 text-green-700"
                                >
                                    View All Achievements
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Recent Patient Feedback */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5 text-amber-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Patient Feedback
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                                <div className="mb-2 flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
                                    <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
                                    <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
                                    <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
                                    <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
                                </div>
                                <p className="mb-2 text-sm text-gray-700">
                                    "Excellent consultation! Dr. Johnson was
                                    very thorough and caring."
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-900">
                                        Amina O.
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        2 hours ago
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                    <Star className="h-4 w-4 fill-green-600 text-green-600" />
                                </div>
                                <p className="mb-2 text-sm text-gray-700">
                                    "Very professional and explained everything
                                    clearly. Thank you!"
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-900">
                                        Kwame M.
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        1 day ago
                                    </span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                                    <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                                    <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                                    <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                                    <Star className="h-4 w-4 text-blue-600" />
                                </div>
                                <p className="mb-2 text-sm text-gray-700">
                                    "Good service. Would appreciate quicker
                                    response times."
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-900">
                                        Sarah N.
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        2 days ago
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full text-amber-600 hover:bg-amber-50"
                            >
                                View All Reviews (87)
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Volunteer Impact & Resources */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Volunteer Impact Report */}
                    <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                        <div className="mb-6 flex items-center gap-2">
                            <HandHeart className="h-5 w-5 text-purple-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Volunteer Impact
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl bg-white p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Lives Impacted
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            Total volunteer work
                                        </p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                        <Users className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <p className="mb-1 text-3xl font-bold text-gray-900">
                                    1,247
                                </p>
                                <p className="text-sm font-medium text-purple-600">
                                    Patients helped since joining
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Community Reach
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            Geographic impact
                                        </p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Globe className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <p className="mb-1 text-3xl font-bold text-gray-900">
                                    12
                                </p>
                                <p className="text-sm font-medium text-blue-600">
                                    Countries in Africa
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            Total Volunteer Hours
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            Time contributed
                                        </p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <Clock className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                                <p className="mb-1 text-3xl font-bold text-gray-900">
                                    342
                                </p>
                                <p className="text-sm font-medium text-green-600">
                                    Hours this year
                                </p>
                            </div>

                            <div className="rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 p-4">
                                <div className="flex items-center gap-3">
                                    <Gift className="h-8 w-8 text-purple-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Thank you for your dedication!
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Your volunteer work is changing
                                            lives
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Medical Resources & Updates */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Resources & Updates
                            </h2>
                        </div>

                        <div className="space-y-3">
                            <button className="group w-full rounded-xl border border-blue-100 bg-blue-50 p-4 text-left transition-all hover:shadow-md">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                                            Treatment Guidelines Update
                                        </h3>
                                        <p className="mb-2 text-xs text-gray-600">
                                            New WHO malaria treatment protocols
                                        </p>
                                        <span className="text-xs font-medium text-blue-600">
                                            Read Now →
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button className="group w-full rounded-xl border border-green-100 bg-green-50 p-4 text-left transition-all hover:shadow-md">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-600 text-white">
                                        <Video className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-green-700">
                                            Webinar: Telemedicine Best Practices
                                        </h3>
                                        <p className="mb-2 text-xs text-gray-600">
                                            Tomorrow at 3 PM GMT
                                        </p>
                                        <span className="text-xs font-medium text-green-600">
                                            Register →
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button className="group w-full rounded-xl border border-purple-100 bg-purple-50 p-4 text-left transition-all hover:shadow-md">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                                            CME Course: Tropical Diseases
                                        </h3>
                                        <p className="mb-2 text-xs text-gray-600">
                                            Earn 5 CME credits
                                        </p>
                                        <span className="text-xs font-medium text-purple-600">
                                            Enroll →
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <button className="group w-full rounded-xl border border-amber-100 bg-amber-50 p-4 text-left transition-all hover:shadow-md">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-600 text-white">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 text-sm font-semibold text-gray-900 group-hover:text-amber-700">
                                            Platform Policy Update
                                        </h3>
                                        <p className="mb-2 text-xs text-gray-600">
                                            New patient privacy guidelines
                                        </p>
                                        <span className="text-xs font-medium text-amber-600">
                                            Review →
                                        </span>
                                    </div>
                                </div>
                            </button>

                            <Button
                                variant="outline"
                                className="w-full text-blue-600 hover:bg-blue-50"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Browse All Resources
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions & Support */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Platform Support */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Platform Support
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Support Team
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Help Documentation
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Video className="mr-2 h-4 w-4" />
                                Training Videos
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                Doctor Community
                            </Button>
                        </div>
                    </Card>

                    {/* Availability Status */}
                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Availability
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <span className="text-sm font-medium text-gray-900">
                                    Current Status
                                </span>
                                <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                                    Online
                                </span>
                            </div>
                            <div className="rounded-lg bg-white p-3">
                                <p className="mb-2 text-sm font-medium text-gray-900">
                                    Today's Hours
                                </p>
                                <p className="text-xs text-gray-600">
                                    9:00 AM - 5:00 PM
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-3">
                                <p className="mb-2 text-sm font-medium text-gray-900">
                                    Slots Available
                                </p>
                                <p className="text-xs text-gray-600">
                                    3 of 10 remaining today
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full border-green-600 text-green-700"
                            >
                                Update Availability
                            </Button>
                        </div>
                    </Card>

                    {/* Emergency Protocol */}
                    <Card className="border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Emergency Protocol
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-lg border border-red-100 bg-white p-3">
                                <p className="mb-1 text-sm font-semibold text-gray-900">
                                    Emergency Hotline
                                </p>
                                <p className="mb-2 text-xs text-gray-600">
                                    For critical patient cases
                                </p>
                                <Button
                                    size="sm"
                                    className="w-full bg-red-600 hover:bg-red-700"
                                >
                                    <Phone className="mr-1 h-3 w-3" />
                                    Call Now
                                </Button>
                            </div>
                            <div className="rounded-lg bg-white p-3">
                                <p className="mb-1 text-sm font-semibold text-gray-900">
                                    Referral Network
                                </p>
                                <p className="mb-2 text-xs text-gray-600">
                                    Connect with specialists
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                >
                                    View Network
                                </Button>
                            </div>
                            <div className="rounded-lg bg-white p-3">
                                <p className="mb-1 text-sm font-semibold text-gray-900">
                                    Crisis Guidelines
                                </p>
                                <p className="mb-2 text-xs text-gray-600">
                                    Emergency procedures
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                >
                                    View Guidelines
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
