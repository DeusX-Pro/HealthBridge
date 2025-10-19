import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    Search,
    Filter,
    UserPlus,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Clock,
    Heart,
    Activity,
    Video,
    MessageSquare,
    AlertCircle,
    TrendingUp,
    MoreVertical,
    Eye,
    Stethoscope,
    Pill,
    Microscope,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'My Patients',
        href: '/doctor/patients',
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

export default function MyPatients() {
    const { auth } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock patients data
    const patients = [
        {
            id: 1,
            name: 'Sarah Williams',
            avatar: 'SW',
            age: 34,
            gender: 'Female',
            bloodType: 'A+',
            phone: '+234 801 234 5678',
            email: 'sarah.williams@email.com',
            address: '123 Main St, Lagos',
            lastVisit: '2 days ago',
            nextAppointment: 'Dec 15, 2024',
            condition: 'Hypertension',
            status: 'stable',
            priority: 'normal',
            consultations: 12,
            prescriptions: 5,
            labResults: 8,
        },
        {
            id: 2,
            name: 'Michael Chen',
            avatar: 'MC',
            age: 45,
            gender: 'Male',
            bloodType: 'O+',
            phone: '+234 802 345 6789',
            email: 'michael.chen@email.com',
            address: '456 Park Ave, Abuja',
            lastVisit: '1 week ago',
            nextAppointment: 'Dec 18, 2024',
            condition: 'Diabetes Type 2',
            status: 'monitoring',
            priority: 'high',
            consultations: 24,
            prescriptions: 12,
            labResults: 15,
        },
        {
            id: 3,
            name: 'Emily Davis',
            avatar: 'ED',
            age: 28,
            gender: 'Female',
            bloodType: 'B+',
            phone: '+234 803 456 7890',
            email: 'emily.davis@email.com',
            address: '789 Oak Rd, Port Harcourt',
            lastVisit: '3 days ago',
            nextAppointment: 'Dec 20, 2024',
            condition: 'Asthma',
            status: 'stable',
            priority: 'normal',
            consultations: 8,
            prescriptions: 3,
            labResults: 4,
        },
        {
            id: 4,
            name: 'Robert Taylor',
            avatar: 'RT',
            age: 52,
            gender: 'Male',
            bloodType: 'AB+',
            phone: '+234 804 567 8901',
            email: 'robert.taylor@email.com',
            address: '321 Elm St, Kano',
            lastVisit: '5 days ago',
            nextAppointment: 'Dec 22, 2024',
            condition: 'High Cholesterol',
            status: 'improving',
            priority: 'normal',
            consultations: 15,
            prescriptions: 7,
            labResults: 10,
        },
        {
            id: 5,
            name: 'Lisa Martinez',
            avatar: 'LM',
            age: 39,
            gender: 'Female',
            bloodType: 'O-',
            phone: '+234 805 678 9012',
            email: 'lisa.martinez@email.com',
            address: '654 Pine St, Ibadan',
            lastVisit: '1 week ago',
            nextAppointment: 'Dec 25, 2024',
            condition: 'Migraine',
            status: 'stable',
            priority: 'low',
            consultations: 6,
            prescriptions: 2,
            labResults: 3,
        },
        {
            id: 6,
            name: 'James Wilson',
            avatar: 'JW',
            age: 61,
            gender: 'Male',
            bloodType: 'A-',
            phone: '+234 806 789 0123',
            email: 'james.wilson@email.com',
            address: '987 Cedar Ave, Enugu',
            lastVisit: '4 days ago',
            nextAppointment: 'Dec 16, 2024',
            condition: 'Heart Disease',
            status: 'critical',
            priority: 'urgent',
            consultations: 32,
            prescriptions: 18,
            labResults: 25,
        },
    ];

    const stats = {
        totalPatients: 342,
        activePatients: 287,
        criticalCases: 12,
        newThisMonth: 28,
    };

    const getStatusConfig = (status: string) => {
        const configs = {
            stable: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Sparkles },
            monitoring: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Activity },
            improving: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: TrendingUp },
            critical: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
        };
        return configs[status as keyof typeof configs] || configs.stable;
    };

    const getPriorityConfig = (priority: string) => {
        const configs = {
            urgent: { color: 'border-red-400 bg-red-50/50', badge: 'text-red-700 bg-red-100' },
            high: { color: 'border-orange-400 bg-orange-50/50', badge: 'text-orange-700 bg-orange-100' },
            normal: { color: 'border-blue-400 bg-blue-50/50', badge: 'text-blue-700 bg-blue-100' },
            low: { color: 'border-gray-400 bg-gray-50/50', badge: 'text-gray-700 bg-gray-100' },
        };
        return configs[priority as keyof typeof configs] || configs.normal;
    };

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Patients" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Manage and monitor your patient records
                        </p>
                    </div>
                    <Link href="/doctor/patients/add">
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                            <UserPlus className="mr-2 h-5 w-5" />
                            Add New Patient
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Patients</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.activePatients}</p>
                                    <p className="text-xs text-green-600">+5 this week</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-red-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                                    <AlertCircle className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Critical Cases</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.criticalCases}</p>
                                    <p className="text-xs text-red-600">Needs attention</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                    <TrendingUp className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">New This Month</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</p>
                                    <p className="text-xs text-purple-600">+12% from last month</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <Stethoscope className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                                    <p className="text-xs text-gray-600">All time</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter Section */}
                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                                <div className="relative max-w-md">
                                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search patients by name or condition..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
                                    {['all', 'critical', 'stable', 'monitoring'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setStatusFilter(filter)}
                                            className={`rounded-md px-3 py-2 text-sm font-medium capitalize transition-colors ${
                                                statusFilter === filter
                                                    ? 'bg-white text-blue-600 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Patients List */}
                <div className="space-y-4">
                    {filteredPatients.map((patient) => {
                        const statusConfig = getStatusConfig(patient.status);
                        const priorityConfig = getPriorityConfig(patient.priority);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <Card 
                                key={patient.id} 
                                className={`shadow-sm transition-all hover:shadow-md border-l-4 ${priorityConfig.color}`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                        {/* Patient Main Info */}
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-sm">
                                                {patient.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                                                        {patient.name}
                                                    </h3>
                                                    <Badge variant="secondary" className={statusConfig.color}>
                                                        <StatusIcon className="h-3 w-3 mr-1" />
                                                        {patient.status}
                                                    </Badge>
                                                    {patient.priority === 'urgent' && (
                                                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                                                            <AlertCircle className="h-3 w-3 mr-1" />
                                                            Urgent
                                                        </Badge>
                                                    )}
                                                </div>
                                                
                                                <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Age/Gender:</span>
                                                        <span>{patient.age} yrs • {patient.gender}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Heart className="h-4 w-4 text-red-500" />
                                                        <span className="font-medium">Blood:</span>
                                                        <span>{patient.bloodType}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Activity className="h-4 w-4 text-blue-500" />
                                                        <span className="font-medium">Condition:</span>
                                                        <span className="truncate">{patient.condition}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4" />
                                                        {patient.phone}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4" />
                                                        <span className="truncate">{patient.email}</span>
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span className="truncate">{patient.address}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Patient Stats */}
                                        <div className="grid grid-cols-3 gap-3 lg:w-48">
                                            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-center">
                                                <Stethoscope className="mx-auto h-4 w-4 text-blue-600 mb-1" />
                                                <p className="text-xs text-gray-600">Visits</p>
                                                <p className="text-lg font-bold text-blue-600">{patient.consultations}</p>
                                            </div>
                                            <div className="rounded-lg border border-orange-100 bg-orange-50 p-3 text-center">
                                                <Pill className="mx-auto h-4 w-4 text-orange-600 mb-1" />
                                                <p className="text-xs text-gray-600">Rx</p>
                                                <p className="text-lg font-bold text-orange-600">{patient.prescriptions}</p>
                                            </div>
                                            <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-center">
                                                <Microscope className="mx-auto h-4 w-4 text-green-600 mb-1" />
                                                <p className="text-xs text-gray-600">Labs</p>
                                                <p className="text-lg font-bold text-green-600">{patient.labResults}</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 lg:w-40">
                                            <Link href={`/doctor/patients/${patient.id}`}>
                                                <Button variant="outline" size="sm" className="w-full justify-start">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Link href={`/doctor/telemedicine?patient=${patient.id}`}>
                                                <Button variant="outline" size="sm" className="w-full justify-start text-green-600 hover:bg-green-50 border-green-200">
                                                    <Video className="mr-2 h-4 w-4" />
                                                    Start Call
                                                </Button>
                                            </Link>
                                            <Link href={`/doctor/messages?patient=${patient.id}`}>
                                                <Button variant="outline" size="sm" className="w-full justify-start text-purple-600 hover:bg-purple-50 border-purple-200">
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    Message
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Next Appointment */}
                                    {patient.nextAppointment && (
                                        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            Next Appointment
                                                        </span>
                                                        <p className="text-sm text-green-700">{patient.nextAppointment}</p>
                                                    </div>
                                                </div>
                                                <Link href={`/doctor/appointments?patient=${patient.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-100">
                                                        Reschedule
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredPatients.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchTerm || statusFilter !== 'all' 
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Get started by adding your first patient'
                                }
                            </p>
                            <Link href="/doctor/patients/add">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add New Patient
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                <Card className="shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-medium">{filteredPatients.length}</span> of{' '}
                                <span className="font-medium">{stats.totalPatients}</span> patients
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}