import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Video,
    Clock,
    Calendar,
    User,
    FileText,
    MessageSquare,
    Download,
    Eye,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Play,
    Pause,
    Search,
    Filter,
    ChevronRight,
    TrendingUp,
    Activity,
    Monitor,
    Phone,
    Stethoscope,
    Pill,
    ClipboardList,
    Edit,
    Printer,
    Share2,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Consultations',
        href: '/doctor/consultations',
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

export default function Consultations() {
    const { auth } = usePage<PageProps>().props;
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock consultations data
    const consultations = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            patientAvatar: 'SW',
            date: 'Dec 14, 2024',
            time: '10:00 AM',
            duration: '28 min',
            type: 'Video Call',
            status: 'completed',
            chiefComplaint: 'Follow-up for hypertension management',
            diagnosis: 'Essential Hypertension - Controlled',
            prescriptions: 2,
            labOrders: 1,
            notes: 'Patient shows good compliance with medication. Blood pressure within normal range.',
            followUp: 'Dec 28, 2024',
            patientAge: 34,
            patientCondition: 'Hypertension',
        },
        {
            id: 2,
            patientName: 'Michael Chen',
            patientAvatar: 'MC',
            date: 'Dec 14, 2024',
            time: '2:30 PM',
            duration: '42 min',
            type: 'Video Call',
            status: 'completed',
            chiefComplaint: 'Diabetes management and medication review',
            diagnosis: 'Type 2 Diabetes Mellitus',
            prescriptions: 3,
            labOrders: 2,
            notes: 'HbA1c levels improving. Discussed dietary modifications and exercise routine.',
            followUp: 'Jan 14, 2025',
            patientAge: 45,
            patientCondition: 'Diabetes Type 2',
        },
        {
            id: 3,
            patientName: 'Emily Davis',
            patientAvatar: 'ED',
            date: 'Dec 13, 2024',
            time: '11:15 AM',
            duration: '22 min',
            type: 'Phone Call',
            status: 'completed',
            chiefComplaint: 'Asthma symptoms and inhaler refill',
            diagnosis: 'Asthma - Mild Persistent',
            prescriptions: 1,
            labOrders: 0,
            notes: 'Symptoms well controlled with current medication. Renewed inhaler prescription.',
            followUp: 'Feb 13, 2025',
            patientAge: 28,
            patientCondition: 'Asthma',
        },
        {
            id: 4,
            patientName: 'Robert Taylor',
            patientAvatar: 'RT',
            date: 'Dec 13, 2024',
            time: '4:00 PM',
            duration: '35 min',
            type: 'Video Call',
            status: 'completed',
            chiefComplaint: 'Cholesterol management review',
            diagnosis: 'Hyperlipidemia',
            prescriptions: 1,
            labOrders: 1,
            notes: 'Lipid panel shows improvement. Continue statin therapy.',
            followUp: 'Jan 13, 2025',
            patientAge: 52,
            patientCondition: 'High Cholesterol',
        },
        {
            id: 5,
            patientName: 'Lisa Martinez',
            patientAvatar: 'LM',
            date: 'Dec 12, 2024',
            time: '9:30 AM',
            duration: '31 min',
            type: 'Video Call',
            status: 'pending',
            chiefComplaint: 'Severe migraine episodes',
            diagnosis: 'Pending assessment',
            prescriptions: 0,
            labOrders: 0,
            notes: 'Consultation notes pending completion',
            followUp: null,
            patientAge: 39,
            patientCondition: 'Migraine',
        },
        {
            id: 6,
            patientName: 'James Wilson',
            patientAvatar: 'JW',
            date: 'Dec 12, 2024',
            time: '3:00 PM',
            duration: '45 min',
            type: 'Video Call',
            status: 'in-progress',
            chiefComplaint: 'Chest discomfort and follow-up',
            diagnosis: 'Under evaluation',
            prescriptions: 0,
            labOrders: 1,
            notes: 'Currently in consultation',
            followUp: null,
            patientAge: 61,
            patientCondition: 'Heart Disease',
        },
    ];

    const stats = {
        totalConsultations: 127,
        completedToday: 5,
        pendingReview: 3,
        averageDuration: '32 min',
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Video Call':
                return <Video className="h-4 w-4" />;
            case 'Phone Call':
                return <Phone className="h-4 w-4" />;
            case 'In-Person':
                return <Stethoscope className="h-4 w-4" />;
            default:
                return <Monitor className="h-4 w-4" />;
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

    // Filter consultations
    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = 
            consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'all') return matchesSearch;
        if (activeFilter === 'completed') return matchesSearch && consultation.status === 'completed';
        if (activeFilter === 'pending') return matchesSearch && consultation.status === 'pending';
        if (activeFilter === 'in-progress') return matchesSearch && consultation.status === 'in-progress';
        
        return matchesSearch;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultations" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Consultations</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Review and manage consultation records and notes
                        </p>
                    </div>
                    <Link href="/doctor/telemedicine">
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Video className="mr-2 h-4 w-4" />
                            Start Consultation
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Activity className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalConsultations}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Completed Today</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-yellow-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                                <AlertCircle className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending Review</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingReview}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <Clock className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Duration</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.averageDuration}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card className="p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative flex-1 lg:max-w-md">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by patient name, complaint, or diagnosis..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
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
                                variant={activeFilter === 'completed' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'completed' ? 'bg-green-600' : ''}
                                onClick={() => setActiveFilter('completed')}
                            >
                                Completed
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
                                variant={activeFilter === 'in-progress' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'in-progress' ? 'bg-orange-600' : ''}
                                onClick={() => setActiveFilter('in-progress')}
                            >
                                In Progress
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Consultations List */}
                <div className="space-y-4">
                    {filteredConsultations.map((consultation) => (
                        <Card key={consultation.id} className="overflow-hidden p-0 transition-shadow hover:shadow-lg">
                            {/* Status Bar */}
                            <div className={`h-2 ${
                                consultation.status === 'completed' ? 'bg-green-500' :
                                consultation.status === 'pending' ? 'bg-yellow-500' :
                                consultation.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                            }`}></div>
                            
                            <div className="p-6">
                                <div className="flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-4">
                                            {/* Patient Avatar */}
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg">
                                                {consultation.patientAvatar}
                                            </div>

                                            {/* Consultation Info */}
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{consultation.patientName}</h3>
                                                    <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(consultation.status)}`}>
                                                        {consultation.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                                                        {consultation.status === 'pending' && <Clock className="h-3 w-3" />}
                                                        {consultation.status === 'in-progress' && <Play className="h-3 w-3" />}
                                                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1).replace('-', ' ')}
                                                    </span>
                                                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeColor(consultation.type)}`}>
                                                        {getTypeIcon(consultation.type)}
                                                        {consultation.type}
                                                    </span>
                                                </div>

                                                <div className="mb-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Calendar className="h-4 w-4 text-blue-600" />
                                                        {consultation.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Clock className="h-4 w-4 text-purple-600" />
                                                        {consultation.time} ({consultation.duration})
                                                    </span>
                                                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                        {consultation.patientAge} years • {consultation.patientCondition}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="flex gap-3">
                                            <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-3 text-center shadow-sm">
                                                <Pill className="mx-auto mb-1 h-5 w-5 text-orange-600" />
                                                <p className="text-xs font-semibold text-gray-600">Prescriptions</p>
                                                <p className="text-lg font-bold text-orange-600">{consultation.prescriptions}</p>
                                            </div>
                                            <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-3 text-center shadow-sm">
                                                <ClipboardList className="mx-auto mb-1 h-5 w-5 text-green-600" />
                                                <p className="text-xs font-semibold text-gray-600">Lab Orders</p>
                                                <p className="text-lg font-bold text-green-600">{consultation.labOrders}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Consultation Details */}
                                    <div className="space-y-3 rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
                                        <div>
                                            <p className="mb-1.5 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                <Activity className="h-3.5 w-3.5" />
                                                Chief Complaint
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">{consultation.chiefComplaint}</p>
                                        </div>
                                        <div className="h-px bg-gray-200"></div>
                                        <div>
                                            <p className="mb-1.5 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                <FileText className="h-3.5 w-3.5" />
                                                Diagnosis
                                            </p>
                                            <p className="text-sm font-semibold text-blue-900">{consultation.diagnosis}</p>
                                        </div>
                                        {consultation.status === 'completed' && (
                                            <>
                                                <div className="h-px bg-gray-200"></div>
                                                <div>
                                                    <p className="mb-1.5 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                        <Edit className="h-3.5 w-3.5" />
                                                        Clinical Notes
                                                    </p>
                                                    <p className="text-sm leading-relaxed text-gray-700">{consultation.notes}</p>
                                                </div>
                                            </>
                                        )}
                                        {consultation.followUp && (
                                            <>
                                                <div className="h-px bg-gray-200"></div>
                                                <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 shadow-sm">
                                                    <Calendar className="h-5 w-5 text-blue-600" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-600">Follow-up Scheduled</p>
                                                        <p className="text-sm font-bold text-blue-900">{consultation.followUp}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                                        <Link href={`/doctor/consultations/${consultation.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Full Record
                                            </Button>
                                        </Link>
                                        {consultation.status === 'completed' && (
                                            <>
                                                <Button variant="outline" size="sm" className="font-semibold text-blue-600 hover:bg-blue-50">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                                <Button variant="outline" size="sm" className="font-semibold text-purple-600 hover:bg-purple-50">
                                                    <Printer className="mr-2 h-4 w-4" />
                                                    Print
                                                </Button>
                                                <Button variant="outline" size="sm" className="font-semibold text-indigo-600 hover:bg-indigo-50">
                                                    <Share2 className="mr-2 h-4 w-4" />
                                                    Share
                                                </Button>
                                            </>
                                        )}
                                        {consultation.status === 'pending' && (
                                            <Button variant="outline" size="sm" className="font-semibold text-orange-600 hover:bg-orange-50">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Complete Notes
                                            </Button>
                                        )}
                                        {consultation.status === 'in-progress' && (
                                            <Link href={`/doctor/telemedicine?consultation=${consultation.id}`}>
                                                <Button size="sm" className="bg-green-600 font-semibold hover:bg-green-700">
                                                    <Video className="mr-2 h-4 w-4" />
                                                    Resume Consultation
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href={`/doctor/patients/${consultation.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold text-green-600 hover:bg-green-50">
                                                <User className="mr-2 h-4 w-4" />
                                                Patient Profile
                                            </Button>
                                        </Link>
                                        <Link href={`/doctor/messages?patient=${consultation.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Message
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredConsultations.length === 0 && (
                    <Card className="p-12">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Video className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No consultations found</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                {searchQuery ? 'Try adjusting your search query' : 'Try adjusting your filter criteria'}
                            </p>
                            {(searchQuery || activeFilter !== 'all') && (
                                <Button 
                                    variant="outline" 
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveFilter('all');
                                    }}
                                >
                                    Clear filters
                                </Button>
                            )}
                        </div>
                    </Card>
                )}

                {/* Pagination */}
                {filteredConsultations.length > 0 && (
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{filteredConsultations.length}</span> of <span className="font-semibold">{consultations.length}</span> consultations
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
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}