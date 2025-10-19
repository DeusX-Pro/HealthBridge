import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Calendar,
    Clock,
    Video,
    Phone,
    MapPin,
    User,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Edit,
    Trash2,
    FileText,
    MessageSquare,
    CalendarPlus,
    Eye,
    Stethoscope,
    Activity,
    TrendingUp,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Appointments',
        href: '/doctor/appointments',
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
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock appointments data
    const appointments = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            patientAvatar: 'SW',
            date: 'Dec 15, 2024',
            time: '10:00 AM',
            duration: '30 min',
            type: 'Telehealth',
            reason: 'Follow-up Consultation',
            status: 'confirmed',
            priority: 'normal',
            notes: 'Patient reporting improved symptoms',
            patientAge: 34,
            patientCondition: 'Hypertension',
        },
        {
            id: 2,
            patientName: 'Michael Chen',
            patientAvatar: 'MC',
            date: 'Dec 15, 2024',
            time: '11:30 AM',
            duration: '45 min',
            type: 'In-Person',
            reason: 'General Checkup',
            status: 'pending',
            priority: 'high',
            notes: 'New patient initial consultation',
            patientAge: 45,
            patientCondition: 'Diabetes Type 2',
        },
        {
            id: 3,
            patientName: 'Emily Davis',
            patientAvatar: 'ED',
            date: 'Dec 15, 2024',
            time: '2:00 PM',
            duration: '20 min',
            type: 'Telehealth',
            reason: 'Lab Results Review',
            status: 'confirmed',
            priority: 'normal',
            notes: 'Discuss recent blood work results',
            patientAge: 28,
            patientCondition: 'Asthma',
        },
        {
            id: 4,
            patientName: 'Robert Taylor',
            patientAvatar: 'RT',
            date: 'Dec 15, 2024',
            time: '3:30 PM',
            duration: '30 min',
            type: 'In-Person',
            reason: 'Prescription Renewal',
            status: 'confirmed',
            priority: 'normal',
            notes: 'Routine medication review',
            patientAge: 52,
            patientCondition: 'High Cholesterol',
        },
        {
            id: 5,
            patientName: 'Lisa Martinez',
            patientAvatar: 'LM',
            date: 'Dec 16, 2024',
            time: '9:00 AM',
            duration: '60 min',
            type: 'In-Person',
            reason: 'Annual Physical Exam',
            status: 'pending',
            priority: 'normal',
            notes: 'Comprehensive health assessment',
            patientAge: 39,
            patientCondition: 'Migraine',
        },
        {
            id: 6,
            patientName: 'James Wilson',
            patientAvatar: 'JW',
            date: 'Dec 16, 2024',
            time: '10:30 AM',
            duration: '45 min',
            type: 'Telehealth',
            reason: 'Emergency Consultation',
            status: 'urgent',
            priority: 'urgent',
            notes: 'Chest pain reported - immediate attention needed',
            patientAge: 61,
            patientCondition: 'Heart Disease',
        },
        {
            id: 7,
            patientName: 'Amanda Brooks',
            patientAvatar: 'AB',
            date: 'Dec 16, 2024',
            time: '2:00 PM',
            duration: '30 min',
            type: 'Telehealth',
            reason: 'Follow-up Treatment',
            status: 'cancelled',
            priority: 'low',
            notes: 'Patient requested cancellation',
            patientAge: 31,
            patientCondition: 'Allergies',
        },
        {
            id: 8,
            patientName: 'David Kim',
            patientAvatar: 'DK',
            date: 'Dec 17, 2024',
            time: '11:00 AM',
            duration: '30 min',
            type: 'In-Person',
            reason: 'Vaccination',
            status: 'confirmed',
            priority: 'normal',
            notes: 'Annual flu shot',
            patientAge: 27,
            patientCondition: 'Healthy',
        },
    ];

    const stats = {
        todayAppointments: 4,
        upcomingAppointments: 8,
        pendingConfirmation: 2,
        completedThisWeek: 15,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'urgent':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Telehealth':
                return <Video className="h-4 w-4" />;
            case 'In-Person':
                return <Stethoscope className="h-4 w-4" />;
            case 'Phone':
                return <Phone className="h-4 w-4" />;
            default:
                return <Calendar className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Telehealth':
                return 'bg-purple-100 text-purple-700';
            case 'In-Person':
                return 'bg-blue-100 text-blue-700';
            case 'Phone':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    // Group appointments by date
    const filteredAppointments = appointments.filter(appointment => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'telehealth') return appointment.type === 'Telehealth';
        if (activeFilter === 'in-person') return appointment.type === 'In-Person';
        if (activeFilter === 'pending') return appointment.status === 'pending';
        if (activeFilter === 'urgent') return appointment.status === 'urgent';
        return true;
    });

    const dec15 = filteredAppointments.filter(a => a.date === 'Dec 15, 2024');
    const dec16 = filteredAppointments.filter(a => a.date === 'Dec 16, 2024');
    const dec17 = filteredAppointments.filter(a => a.date === 'Dec 17, 2024');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointments" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Appointments</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your appointment schedule and consultations
                        </p>
                    </div>
                    <Link href="/doctor/schedule">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Manage Schedule
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-blue-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Today</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.upcomingAppointments}</p>
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
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingConfirmation}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">This Week</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedThisWeek}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Calendar Navigation & Filters */}
                <Card className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <span className="text-lg font-semibold text-gray-900">December 15-17, 2024</span>
                            </div>
                            <Button variant="outline" size="sm">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                            <Button 
                                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                                size="sm" 
                                className={activeFilter === 'all' ? 'bg-blue-600' : ''}
                                onClick={() => setActiveFilter('all')}
                            >
                                All
                            </Button>
                            <Button 
                                variant={activeFilter === 'telehealth' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'telehealth' ? 'bg-purple-600' : ''}
                                onClick={() => setActiveFilter('telehealth')}
                            >
                                Telehealth
                            </Button>
                            <Button 
                                variant={activeFilter === 'in-person' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'in-person' ? 'bg-blue-600' : ''}
                                onClick={() => setActiveFilter('in-person')}
                            >
                                In-Person
                            </Button>
                            <Button 
                                variant={activeFilter === 'pending' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'pending' ? 'bg-yellow-600' : ''}
                                onClick={() => setActiveFilter('pending')}
                            >
                                Pending
                            </Button>
                            <Button 
                                variant={activeFilter === 'urgent' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'urgent' ? 'bg-orange-600' : ''}
                                onClick={() => setActiveFilter('urgent')}
                            >
                                Urgent
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Appointments List - Dec 15 */}
                {dec15.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-lg font-bold text-gray-900">Dec 15, 2024</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        <div className="space-y-4">
                            {dec15.map((appointment) => (
                                <Card key={appointment.id} className="p-6 transition-shadow hover:shadow-lg">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        {/* Appointment Info */}
                                        <div className="flex flex-1 items-start gap-4">
                                            {/* Time */}
                                            <div className="flex flex-col items-center rounded-lg bg-blue-50 p-3 text-center">
                                                <Clock className="mb-1 h-5 w-5 text-blue-600" />
                                                <span className="text-sm font-bold text-gray-900">{appointment.time}</span>
                                                <span className="text-xs text-gray-600">{appointment.duration}</span>
                                            </div>

                                            {/* Patient Details */}
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                                                        {appointment.patientAvatar}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{appointment.patientName}</h3>
                                                        <p className="text-xs text-gray-600">
                                                            {appointment.patientAge} years • {appointment.patientCondition}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <span className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status === 'confirmed' && <CheckCircle2 className="h-3 w-3" />}
                                                        {appointment.status === 'pending' && <Clock className="h-3 w-3" />}
                                                        {appointment.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                                                        {appointment.status === 'urgent' && <AlertCircle className="h-3 w-3" />}
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </span>
                                                    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(appointment.type)}`}>
                                                        {getTypeIcon(appointment.type)}
                                                        {appointment.type}
                                                    </span>
                                                </div>

                                                <div className="mb-2">
                                                    <p className="text-sm font-semibold text-gray-900">{appointment.reason}</p>
                                                    <p className="mt-1 text-sm text-gray-600">{appointment.notes}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 lg:flex-col lg:w-48">
                                            {appointment.type === 'Telehealth' && appointment.status !== 'cancelled' && (
                                                <Link href={`/doctor/telemedicine?appointment=${appointment.id}`} className="flex-1 lg:flex-none">
                                                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                                        <Video className="mr-2 h-4 w-4" />
                                                        Join Call
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/doctor/patients/${appointment.id}`} className="flex-1 lg:flex-none">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Patient Info
                                                </Button>
                                            </Link>
                                            <Link href={`/doctor/messages?patient=${appointment.id}`} className="flex-1 lg:flex-none">
                                                <Button variant="outline" size="sm" className="w-full text-purple-600 hover:bg-purple-50">
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    Message
                                                </Button>
                                            </Link>
                                            {appointment.status !== 'cancelled' && (
                                                <div className="flex gap-2 lg:flex-col lg:w-full">
                                                    <Button variant="outline" size="sm" className="flex-1 text-blue-600 hover:bg-blue-50">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Appointments List - Dec 16 */}
                {dec16.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-lg font-bold text-gray-900">Dec 16, 2024</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        <div className="space-y-4">
                            {dec16.map((appointment) => (
                                <Card key={appointment.id} className="p-6 transition-shadow hover:shadow-lg">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        {/* Appointment Info */}
                                        <div className="flex flex-1 items-start gap-4">
                                            {/* Time */}
                                            <div className="flex flex-col items-center rounded-lg bg-blue-50 p-3 text-center">
                                                <Clock className="mb-1 h-5 w-5 text-blue-600" />
                                                <span className="text-sm font-bold text-gray-900">{appointment.time}</span>
                                                <span className="text-xs text-gray-600">{appointment.duration}</span>
                                            </div>

                                            {/* Patient Details */}
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                                                        {appointment.patientAvatar}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{appointment.patientName}</h3>
                                                        <p className="text-xs text-gray-600">
                                                            {appointment.patientAge} years • {appointment.patientCondition}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <span className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status === 'confirmed' && <CheckCircle2 className="h-3 w-3" />}
                                                        {appointment.status === 'pending' && <Clock className="h-3 w-3" />}
                                                        {appointment.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                                                        {appointment.status === 'urgent' && <AlertCircle className="h-3 w-3" />}
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </span>
                                                    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(appointment.type)}`}>
                                                        {getTypeIcon(appointment.type)}
                                                        {appointment.type}
                                                    </span>
                                                </div>

                                                <div className="mb-2">
                                                    <p className="text-sm font-semibold text-gray-900">{appointment.reason}</p>
                                                    <p className="mt-1 text-sm text-gray-600">{appointment.notes}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 lg:flex-col lg:w-48">
                                            {appointment.type === 'Telehealth' && appointment.status !== 'cancelled' && (
                                                <Link href={`/doctor/telemedicine?appointment=${appointment.id}`} className="flex-1 lg:flex-none">
                                                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                                        <Video className="mr-2 h-4 w-4" />
                                                        Join Call
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/doctor/patients/${appointment.id}`} className="flex-1 lg:flex-none">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Patient Info
                                                </Button>
                                            </Link>
                                            <Link href={`/doctor/messages?patient=${appointment.id}`} className="flex-1 lg:flex-none">
                                                <Button variant="outline" size="sm" className="w-full text-purple-600 hover:bg-purple-50">
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    Message
                                                </Button>
                                            </Link>
                                            {appointment.status !== 'cancelled' && (
                                                <div className="flex gap-2 lg:flex-col lg:w-full">
                                                    <Button variant="outline" size="sm" className="flex-1 text-blue-600 hover:bg-blue-50">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Appointments List - Dec 17 */}
                {dec17.length > 0 && (
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <h2 className="text-lg font-bold text-gray-900">Dec 17, 2024</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        <div className="space-y-4">
                            {dec17.map((appointment) => (
                                <Card key={appointment.id} className="p-6 transition-shadow hover:shadow-lg">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        {/* Appointment Info */}
                                        <div className="flex flex-1 items-start gap-4">
                                            {/* Time */}
                                            <div className="flex flex-col items-center rounded-lg bg-blue-50 p-3 text-center">
                                                <Clock className="mb-1 h-5 w-5 text-blue-600" />
                                                <span className="text-sm font-bold text-gray-900">{appointment.time}</span>
                                                <span className="text-xs text-gray-600">{appointment.duration}</span>
                                            </div>

                                            {/* Patient Details */}
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                                                        {appointment.patientAvatar}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{appointment.patientName}</h3>
                                                        <p className="text-xs text-gray-600">
                                                            {appointment.patientAge} years • {appointment.patientCondition}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <span className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status === 'confirmed' && <CheckCircle2 className="h-3 w-3" />}
                                                        {appointment.status === 'pending' && <Clock className="h-3 w-3" />}
                                                        {appointment.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                                                        {appointment.status === 'urgent' && <AlertCircle className="h-3 w-3" />}
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </span>
                                                    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(appointment.type)}`}>
                                                        {getTypeIcon(appointment.type)}
                                                        {appointment.type}
                                                    </span>
                                                </div>

                                                <div className="mb-2">
                                                    <p className="text-sm font-semibold text-gray-900">{appointment.reason}</p>
                                                    <p className="mt-1 text-sm text-gray-600">{appointment.notes}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 lg:flex-col lg:w-48">
                                            {appointment.type === 'Telehealth' && appointment.status !== 'cancelled' && (
                                                <Link href={`/doctor/telemedicine?appointment=${appointment.id}`} className="flex-1 lg:flex-none">
                                                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                                        <Video className="mr-2 h-4 w-4" />
                                                        Join Call
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/doctor/patients/${appointment.id}`} className="flex-1 lg:flex-none">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Patient Info
                                                </Button>
                                            </Link>
                                            <Link href={`/doctor/messages?patient=${appointment.id}`} className="flex-1 lg:flex-none">
                                                <Button variant="outline" size="sm" className="w-full text-purple-600 hover:bg-purple-50">
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    Message
                                                </Button>
                                            </Link>
                                            {appointment.status !== 'cancelled' && (
                                                <div className="flex gap-2 lg:flex-col lg:w-full">
                                                    <Button variant="outline" size="sm" className="flex-1 text-blue-600 hover:bg-blue-50">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50">
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}