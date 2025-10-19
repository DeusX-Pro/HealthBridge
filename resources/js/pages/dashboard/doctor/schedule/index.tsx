import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Calendar,
    Clock,
    Plus,
    ChevronLeft,
    ChevronRight,
    Video,
    Phone,
    MapPin,
    Edit,
    Trash2,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Filter,
    Download,
    Settings,
    CalendarCheck,
    Activity,
    TrendingUp,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Schedule',
        href: '/doctor/schedule',
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

export default function Schedule() {
    const { auth } = usePage<PageProps>().props;
    const [viewMode, setViewMode] = useState('day');
    const [statusFilter, setStatusFilter] = useState('all');

    const appointments = [
        {
            id: 1,
            time: '9:00 AM',
            endTime: '9:30 AM',
            patientName: 'Sarah Williams',
            patientAvatar: 'SW',
            type: 'Video Call',
            status: 'confirmed',
            reason: 'Follow-up consultation',
            duration: '30 min',
        },
        {
            id: 2,
            time: '10:00 AM',
            endTime: '10:45 AM',
            patientName: 'Michael Chen',
            patientAvatar: 'MC',
            type: 'In-Person',
            status: 'confirmed',
            reason: 'General checkup',
            duration: '45 min',
        },
        {
            id: 3,
            time: '11:30 AM',
            endTime: '12:00 PM',
            patientName: 'Emily Davis',
            patientAvatar: 'ED',
            type: 'Video Call',
            status: 'pending',
            reason: 'Lab results review',
            duration: '30 min',
        },
        {
            id: 4,
            time: '2:00 PM',
            endTime: '2:30 PM',
            patientName: 'Robert Taylor',
            patientAvatar: 'RT',
            type: 'Phone Call',
            status: 'confirmed',
            reason: 'Prescription renewal',
            duration: '30 min',
        },
        {
            id: 5,
            time: '3:00 PM',
            endTime: '4:00 PM',
            patientName: 'Lisa Martinez',
            patientAvatar: 'LM',
            type: 'In-Person',
            status: 'cancelled',
            reason: 'Annual physical',
            duration: '60 min',
        },
        {
            id: 6,
            time: '4:30 PM',
            endTime: '5:00 PM',
            patientName: 'James Wilson',
            patientAvatar: 'JW',
            type: 'Video Call',
            status: 'confirmed',
            reason: 'Follow-up treatment',
            duration: '30 min',
        },
    ];

    const stats = {
        todayAppointments: 6,
        weeklyAppointments: 24,
        confirmedToday: 4,
        pendingToday: 1,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle2 className="h-3 w-3" />;
            case 'pending':
                return <Clock className="h-3 w-3" />;
            case 'cancelled':
                return <XCircle className="h-3 w-3" />;
            default:
                return <AlertCircle className="h-3 w-3" />;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video Call':
                return <Video className="h-4 w-4 text-purple-600" />;
            case 'Phone Call':
                return <Phone className="h-4 w-4 text-green-600" />;
            case 'In-Person':
                return <MapPin className="h-4 w-4 text-blue-600" />;
            default:
                return <Calendar className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Video Call':
                return 'bg-purple-100 text-purple-700';
            case 'Phone Call':
                return 'bg-green-100 text-green-700';
            case 'In-Person':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    // Filter appointments
    const filteredAppointments = appointments.filter(appointment => {
        if (statusFilter === 'all') return true;
        return appointment.status === statusFilter;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Schedule</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your appointments and availability
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/doctor/availability">
                            <Button variant="outline">
                                <CalendarCheck className="mr-2 h-4 w-4" />
                                Set Availability
                            </Button>
                        </Link>
                        <Link href="/doctor/appointments/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                New Appointment
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Today</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <Activity className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">This Week</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.weeklyAppointments}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Confirmed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.confirmedToday}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-yellow-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                                <AlertCircle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingToday}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Date Navigation */}
                <Card className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <span className="text-lg font-semibold text-gray-900">Dec 15, 2024</span>
                            </div>
                            <Button variant="outline" size="sm">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                Today
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant={viewMode === 'day' ? 'default' : 'outline'} 
                                size="sm"
                                className={viewMode === 'day' ? 'bg-blue-600' : ''}
                                onClick={() => setViewMode('day')}
                            >
                                Day
                            </Button>
                            <Button 
                                variant={viewMode === 'week' ? 'default' : 'outline'} 
                                size="sm"
                                className={viewMode === 'week' ? 'bg-blue-600' : ''}
                                onClick={() => setViewMode('week')}
                            >
                                Week
                            </Button>
                            <Button 
                                variant={viewMode === 'month' ? 'default' : 'outline'} 
                                size="sm"
                                className={viewMode === 'month' ? 'bg-blue-600' : ''}
                                onClick={() => setViewMode('month')}
                            >
                                Month
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Schedule Layout */}
                <div className="grid gap-6 lg:grid-cols-4">
                    {/* Main Schedule */}
                    <div className="lg:col-span-3">
                        <Card className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Daily Schedule</h2>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div key={appointment.id} className={`rounded-xl border-2 p-4 transition-shadow hover:shadow-lg ${
                                        appointment.status === 'cancelled' ? 'opacity-60' : ''
                                    }`}>
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex items-start gap-4">
                                                {/* Time Badge */}
                                                <div className="flex flex-col items-center rounded-lg bg-blue-50 p-3 text-center">
                                                    <Clock className="mb-1 h-5 w-5 text-blue-600" />
                                                    <span className="text-sm font-bold text-gray-900">{appointment.time}</span>
                                                    <span className="text-xs text-gray-500">{appointment.duration}</span>
                                                </div>

                                                {/* Appointment Details */}
                                                <div className="flex-1">
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                                                            {appointment.patientAvatar}
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900">{appointment.patientName}</h3>
                                                        <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                                            {getStatusIcon(appointment.status)}
                                                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                        </span>
                                                        <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeColor(appointment.type)}`}>
                                                            {getTypeIcon(appointment.type)}
                                                            {appointment.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{appointment.reason}</p>
                                                    <p className="mt-1 text-xs text-gray-500">{appointment.time} - {appointment.endTime}</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                {appointment.status !== 'cancelled' && (
                                                    <>
                                                        {appointment.type === 'Video Call' && (
                                                            <Link href={`/doctor/telemedicine?appointment=${appointment.id}`}>
                                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                                    <Video className="mr-2 h-4 w-4" />
                                                                    Join
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                {appointment.status === 'cancelled' && (
                                                    <span className="text-sm font-semibold text-red-600">Cancelled</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Mini Calendar */}
                        <Card className="p-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Calendar</h3>
                            <div className="space-y-2">
                                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-600">
                                    <div>S</div>
                                    <div>M</div>
                                    <div>T</div>
                                    <div>W</div>
                                    <div>T</div>
                                    <div>F</div>
                                    <div>S</div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {[...Array(31)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`rounded p-2 hover:bg-blue-50 ${
                                                i + 1 === 15 ? 'bg-blue-600 font-bold text-white' : 'text-gray-700'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Working Hours */}
                        <Card className="p-6">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                <Clock className="h-5 w-5 text-blue-600" />
                                Working Hours
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday</span>
                                    <span className="font-semibold text-gray-900">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday</span>
                                    <span className="font-semibold text-gray-900">10:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="font-semibold text-red-600">Closed</span>
                                </div>
                            </div>
                            <Link href="/doctor/availability">
                                <Button variant="outline" size="sm" className="mt-4 w-full">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Edit Hours
                                </Button>
                            </Link>
                        </Card>

                        {/* Weekly Stats */}
                        <Card className="p-6">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                This Week
                            </h3>
                            <div className="space-y-3">
                                <div className="rounded-lg bg-blue-50 p-3">
                                    <p className="text-xs text-gray-600">Total Appointments</p>
                                    <p className="text-2xl font-bold text-blue-600">24</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-3">
                                    <p className="text-xs text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-green-600">18</p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-3">
                                    <p className="text-xs text-gray-600">Avg Duration</p>
                                    <p className="text-2xl font-bold text-purple-600">32 min</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}