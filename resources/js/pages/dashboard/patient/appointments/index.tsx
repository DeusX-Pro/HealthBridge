import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Calendar,
    Clock,
    Video,
    MapPin,
    Stethoscope,
    Plus,
    Search,
    Filter,
    ChevronRight,
    CheckCircle2,
    XCircle,
    AlertCircle,
    MoreVertical,
    CalendarDays,
    ChevronLeft,
    Download,
    Star,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Appointments',
        href: '/patient/appointments',
    },
];

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    [key: string]: any;
}

export default function Appointments() {
    const { auth } = usePage<PageProps>().props;
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
    const [searchQuery, setSearchQuery] = useState('');

    const upcomingAppointments = [
        {
            id: 1,
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            date: '2024-12-15',
            time: '2:00 PM - 2:30 PM',
            type: 'Video Consultation',
            status: 'confirmed',
            avatar: 'SJ',
            rating: 4.9,
            reviews: 234,
            location: 'Online',
        },
        {
            id: 2,
            doctor: 'Dr. Michael Chen',
            specialty: 'General Physician',
            date: '2024-12-18',
            time: '10:00 AM - 10:30 AM',
            type: 'In-Person',
            status: 'confirmed',
            avatar: 'MC',
            rating: 4.8,
            reviews: 189,
            location: 'City General Hospital',
        },
        {
            id: 3,
            doctor: 'Dr. Emily Rodriguez',
            specialty: 'Dermatologist',
            date: '2024-12-20',
            time: '3:30 PM - 4:00 PM',
            type: 'Video Consultation',
            status: 'pending',
            avatar: 'ER',
            rating: 4.7,
            reviews: 156,
            location: 'Online',
        },
    ];

    const pastAppointments = [
        {
            id: 4,
            doctor: 'Dr. James Wilson',
            specialty: 'Orthopedic',
            date: '2024-11-28',
            time: '11:00 AM - 11:30 AM',
            type: 'In-Person',
            status: 'completed',
            avatar: 'JW',
            rating: 4.9,
            reviews: 201,
            location: 'Wellness Clinic',
        },
        {
            id: 5,
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            date: '2024-11-15',
            time: '2:00 PM - 2:30 PM',
            type: 'Video Consultation',
            status: 'completed',
            avatar: 'SJ',
            rating: 4.9,
            reviews: 234,
            location: 'Online',
        },
    ];

    const cancelledAppointments = [
        {
            id: 6,
            doctor: 'Dr. Robert Martinez',
            specialty: 'Dentist',
            date: '2024-11-20',
            time: '4:00 PM - 4:30 PM',
            type: 'In-Person',
            status: 'cancelled',
            avatar: 'RM',
            rating: 4.6,
            reviews: 143,
            location: 'Dental Care Center',
        },
    ];

    const getAppointments = () => {
        if (activeTab === 'upcoming') return upcomingAppointments;
        if (activeTab === 'past') return pastAppointments;
        return cancelledAppointments;
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            confirmed: 'bg-green-100 text-green-700 border-green-200',
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            completed: 'bg-blue-100 text-blue-700 border-blue-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200',
        };
        return styles[status as keyof typeof styles] || styles.confirmed;
    };

    const getStatusIcon = (status: string) => {
        if (status === 'confirmed') return <CheckCircle2 className="h-3 w-3" />;
        if (status === 'pending') return <AlertCircle className="h-3 w-3" />;
        if (status === 'cancelled') return <XCircle className="h-3 w-3" />;
        return <CheckCircle2 className="h-3 w-3" />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointments" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Calendar className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        My Appointments
                                    </h1>
                                    <p className="mt-1 text-sm text-white">
                                        Manage and track all your healthcare appointments
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Link href="/patient/doctors">
                                    <Button className="bg-white text-green-600 shadow-lg hover:bg-green-50">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Book New Appointment
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Upcoming
                                </p>
                                <p className="mt-2 text-3xl font-bold text-blue-600">
                                    3
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <CalendarDays className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completed
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-600">
                                    12
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    This Month
                                </p>
                                <p className="mt-2 text-3xl font-bold text-purple-600">
                                    5
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
                                <Clock className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Cancelled
                                </p>
                                <p className="mt-2 text-3xl font-bold text-orange-600">
                                    1
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white">
                                <XCircle className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Appointments List */}
                    <div className="lg:col-span-8">
                        <Card>
                            {/* Search and Filter */}
                            <div className="border-b border-gray-200 bg-gray-50 p-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2">
                                        <Search className="h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search appointments..."
                                            className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </div>

                                {/* Tabs */}
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => setActiveTab('upcoming')}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                            activeTab === 'upcoming'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        Upcoming ({upcomingAppointments.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('past')}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                            activeTab === 'past'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        Past ({pastAppointments.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('cancelled')}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                            activeTab === 'cancelled'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        Cancelled ({cancelledAppointments.length})
                                    </button>
                                </div>
                            </div>

                            {/* Appointments List */}
                            <div className="divide-y divide-gray-200">
                                {getAppointments().map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="p-6 transition-all hover:bg-gray-50"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Doctor Avatar */}
                                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white shadow-md">
                                                {appointment.avatar}
                                            </div>

                                            {/* Appointment Details */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {appointment.doctor}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {appointment.specialty}
                                                        </p>
                                                        <div className="mt-1 flex items-center gap-1">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {appointment.rating}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                ({appointment.reviews} reviews)
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4 text-blue-600" />
                                                        {new Date(appointment.date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="h-4 w-4 text-purple-600" />
                                                        {appointment.time}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        {appointment.type === 'Video Consultation' ? (
                                                            <>
                                                                <Video className="h-4 w-4 text-green-600" />
                                                                {appointment.type}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MapPin className="h-4 w-4 text-red-600" />
                                                                {appointment.location}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div
                                                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                                            appointment.status
                                                        )}`}
                                                    >
                                                        {getStatusIcon(appointment.status)}
                                                        {appointment.status.charAt(0).toUpperCase() +
                                                            appointment.status.slice(1)}
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {activeTab === 'upcoming' && (
                                                            <>
                                                                {appointment.type === 'Video Consultation' && (
                                                                    <Link href="/patient/telemedicine">
                                                                        <Button
                                                                            size="sm"
                                                                            className="bg-green-600 hover:bg-green-700"
                                                                        >
                                                                            <Video className="mr-2 h-4 w-4" />
                                                                            Join Call
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                                <Button size="sm" variant="outline">
                                                                    Reschedule
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="text-red-600 hover:bg-red-50"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </>
                                                        )}
                                                        {activeTab === 'past' && (
                                                            <>
                                                                <Button size="sm" variant="outline">
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Report
                                                                </Button>
                                                                <Button size="sm" variant="outline">
                                                                    Book Again
                                                                </Button>
                                                            </>
                                                        )}
                                                        {activeTab === 'cancelled' && (
                                                            <Button size="sm" variant="outline">
                                                                Book Again
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {getAppointments().length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Calendar className="h-16 w-16 text-gray-300" />
                                    <p className="mt-4 text-lg font-semibold text-gray-900">
                                        No appointments found
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {activeTab === 'upcoming'
                                            ? 'You have no upcoming appointments'
                                            : activeTab === 'past'
                                            ? 'No past appointments to show'
                                            : 'No cancelled appointments'}
                                    </p>
                                    <Link href="/patient/doctors">
                                        <Button className="mt-6">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Book Appointment
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 lg:col-span-4">
                        {/* Calendar Widget */}
                        <Card className="p-4">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
                                <CalendarDays className="h-4 w-4 text-blue-600" />
                                Quick Calendar
                            </h3>
                            <div className="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <button className="rounded-lg p-1 hover:bg-white">
                                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <p className="text-sm font-bold text-gray-900">
                                        December 2024
                                    </p>
                                    <button className="rounded-lg p-1 hover:bg-white">
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                        <div key={day} className="py-2 font-semibold text-gray-600">
                                            {day}
                                        </div>
                                    ))}
                                    {[...Array(31)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                                                i + 1 === 15 || i + 1 === 18 || i + 1 === 20
                                                    ? 'bg-blue-600 font-bold text-white'
                                                    : 'hover:bg-white'
                                            }`}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Next Appointment */}
                        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">
                                Next Appointment
                            </h3>
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
                                        SJ
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Dr. Sarah Johnson
                                        </p>
                                        <p className="text-xs text-gray-600">Cardiologist</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                        Tomorrow, Dec 15
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        2:00 PM - 2:30 PM
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Video className="h-4 w-4 text-green-600" />
                                        Video Consultation
                                    </div>
                                </div>
                                <Link href="/patient/telemedicine">
                                    <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                                        <Video className="mr-2 h-4 w-4" />
                                        Join Call
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-4">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link href="/patient/doctors">
                                    <button className="flex w-full items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 text-left transition-all hover:shadow-md">
                                        <Plus className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Book New Appointment
                                        </span>
                                    </button>
                                </Link>
                                <Link href="/patient/doctors">
                                    <button className="flex w-full items-center gap-3 rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-3 text-left transition-all hover:shadow-md">
                                        <Stethoscope className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Find a Doctor
                                        </span>
                                    </button>
                                </Link>
                                <Link href="/patient/health-records">
                                    <button className="flex w-full items-center gap-3 rounded-lg border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-3 text-left transition-all hover:shadow-md">
                                        <Download className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Download Reports
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}