import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    FileText,
    Search,
    Calendar,
    Clock,
    User,
    Download,
    Eye,
    Edit,
    Plus,
    Activity,
    Heart,
    Stethoscope,
    ClipboardList,
    FileWarning,
    Shield,
    Lock,
    Paperclip,
    AlertCircle,
    CheckCircle2,
    XCircle,
    FileCheck,
    Share2,
    Archive,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Medical Records',
        href: '/doctor/medical-records',
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

export default function MedicalRecords() {
    const { auth } = usePage<PageProps>().props;
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock medical records data
    const medicalRecords = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            patientAvatar: 'SW',
            patientAge: 34,
            patientCondition: 'Hypertension',
            recordNumber: 'MR-2024-001234',
            recordType: 'Consultation Note',
            date: 'Dec 14, 2024',
            status: 'completed',
            category: 'cardiology',
            chiefComplaint: 'Routine follow-up for hypertension management',
            diagnosis: 'Essential Hypertension - Well Controlled',
            vitals: {
                bloodPressure: '118/76 mmHg',
                heartRate: '72 bpm',
                temperature: '98.6°F',
                weight: '145 lbs',
            },
            notes: 'Patient reports good compliance with medications. No adverse effects noted. Blood pressure readings at home are within target range.',
            attachments: 2,
            lastUpdated: '2 hours ago',
        },
        {
            id: 2,
            patientName: 'Michael Chen',
            patientAvatar: 'MC',
            patientAge: 45,
            patientCondition: 'Diabetes Type 2',
            recordNumber: 'MR-2024-001235',
            recordType: 'Lab Results',
            date: 'Dec 14, 2024',
            status: 'completed',
            category: 'endocrinology',
            chiefComplaint: 'HbA1c and Lipid Panel Results',
            diagnosis: 'Type 2 Diabetes Mellitus - Improving Control',
            vitals: {
                bloodPressure: '128/82 mmHg',
                heartRate: '78 bpm',
                temperature: '98.4°F',
                weight: '185 lbs',
            },
            notes: 'HbA1c improved from 8.2% to 7.1%. Lipid panel shows improvement in LDL cholesterol. Continue current medication regimen.',
            attachments: 5,
            lastUpdated: '1 day ago',
        },
        {
            id: 3,
            patientName: 'Emily Davis',
            patientAvatar: 'ED',
            patientAge: 28,
            patientCondition: 'Asthma',
            recordNumber: 'MR-2024-001236',
            recordType: 'Physical Examination',
            date: 'Dec 13, 2024',
            status: 'completed',
            category: 'pulmonology',
            chiefComplaint: 'Annual asthma control assessment',
            diagnosis: 'Asthma - Mild Persistent, Well Controlled',
            vitals: {
                bloodPressure: '110/70 mmHg',
                heartRate: '68 bpm',
                temperature: '98.2°F',
                weight: '128 lbs',
            },
            notes: 'Lung auscultation clear bilaterally. Peak flow meter readings normal. Patient demonstrates proper inhaler technique.',
            attachments: 1,
            lastUpdated: '2 days ago',
        },
        {
            id: 4,
            patientName: 'Robert Taylor',
            patientAvatar: 'RT',
            patientAge: 52,
            patientCondition: 'High Cholesterol',
            recordNumber: 'MR-2024-001237',
            recordType: 'Imaging Report',
            date: 'Dec 12, 2024',
            status: 'pending',
            category: 'cardiology',
            chiefComplaint: 'Cardiac stress test',
            diagnosis: 'Pending final interpretation',
            vitals: {
                bloodPressure: '135/88 mmHg',
                heartRate: '76 bpm',
                temperature: '98.6°F',
                weight: '192 lbs',
            },
            notes: 'Awaiting cardiologist review of stress test images. Preliminary findings show no significant abnormalities.',
            attachments: 8,
            lastUpdated: '3 days ago',
        },
        {
            id: 5,
            patientName: 'Lisa Martinez',
            patientAvatar: 'LM',
            patientAge: 39,
            patientCondition: 'Migraine',
            recordNumber: 'MR-2024-001238',
            recordType: 'Progress Note',
            date: 'Dec 10, 2024',
            status: 'completed',
            category: 'neurology',
            chiefComplaint: 'Migraine management follow-up',
            diagnosis: 'Chronic Migraine with Aura',
            vitals: {
                bloodPressure: '115/75 mmHg',
                heartRate: '70 bpm',
                temperature: '98.3°F',
                weight: '135 lbs',
            },
            notes: 'Frequency of migraine attacks reduced from 15 to 8 per month with current treatment. Patient keeping detailed headache diary.',
            attachments: 0,
            lastUpdated: '4 days ago',
        },
        {
            id: 6,
            patientName: 'James Wilson',
            patientAvatar: 'JW',
            patientAge: 61,
            patientCondition: 'Heart Disease',
            recordNumber: 'MR-2024-001239',
            recordType: 'Surgical Report',
            date: 'Dec 8, 2024',
            status: 'archived',
            category: 'cardiology',
            chiefComplaint: 'Post-operative follow-up cardiac catheterization',
            diagnosis: 'Coronary Artery Disease - Post PCI',
            vitals: {
                bloodPressure: '122/78 mmHg',
                heartRate: '68 bpm',
                temperature: '98.5°F',
                weight: '178 lbs',
            },
            notes: 'Successful percutaneous coronary intervention. Patient recovering well. Continue dual antiplatelet therapy.',
            attachments: 12,
            lastUpdated: '6 days ago',
        },
    ];

    const stats = {
        totalRecords: 342,
        completedRecords: 287,
        pendingReview: 12,
        thisMonth: 45,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'archived':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'draft':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="h-3 w-3" />;
            case 'pending':
                return <Clock className="h-3 w-3" />;
            case 'archived':
                return <Archive className="h-3 w-3" />;
            case 'draft':
                return <Edit className="h-3 w-3" />;
            default:
                return <FileText className="h-3 w-3" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'cardiology':
                return 'bg-red-100 text-red-700';
            case 'neurology':
                return 'bg-purple-100 text-purple-700';
            case 'pulmonology':
                return 'bg-blue-100 text-blue-700';
            case 'endocrinology':
                return 'bg-green-100 text-green-700';
            case 'general':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getRecordTypeIcon = (type: string) => {
        switch (type) {
            case 'Consultation Note':
                return <Stethoscope className="h-4 w-4" />;
            case 'Lab Results':
                return <ClipboardList className="h-4 w-4" />;
            case 'Physical Examination':
                return <Activity className="h-4 w-4" />;
            case 'Imaging Report':
                return <FileWarning className="h-4 w-4" />;
            case 'Progress Note':
                return <FileText className="h-4 w-4" />;
            case 'Surgical Report':
                return <FileCheck className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    // Filter medical records
    const filteredRecords = medicalRecords.filter(record => {
        const matchesSearch = 
            record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.recordNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.recordType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'all') return matchesSearch;
        if (activeFilter === 'completed') return matchesSearch && record.status === 'completed';
        if (activeFilter === 'pending') return matchesSearch && record.status === 'pending';
        if (activeFilter === 'archived') return matchesSearch && record.status === 'archived';
        
        return matchesSearch;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Medical Records" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Medical Records</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Access and manage patient medical records and documentation
                        </p>
                    </div>
                    <Link href="/doctor/medical-records/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" />
                            New Record
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Records</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedRecords}</p>
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
                                <Activity className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
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
                                placeholder="Search by patient, record number, type, or diagnosis..."
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
                                variant={activeFilter === 'archived' ? 'default' : 'outline'}
                                size="sm"
                                className={activeFilter === 'archived' ? 'bg-gray-600' : ''}
                                onClick={() => setActiveFilter('archived')}
                            >
                                Archived
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Medical Records List */}
                <div className="space-y-4">
                    {filteredRecords.map((record) => (
                        <Card key={record.id} className="overflow-hidden p-0 transition-shadow hover:shadow-lg">
                            {/* Status Bar */}
                            <div className={`h-2 ${
                                record.status === 'completed' ? 'bg-green-500' :
                                record.status === 'pending' ? 'bg-yellow-500' :
                                record.status === 'archived' ? 'bg-gray-500' : 'bg-blue-500'
                            }`}></div>
                            
                            <div className="p-6">
                                <div className="flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-4">
                                            {/* Patient Avatar */}
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-bold text-white shadow-lg">
                                                {record.patientAvatar}
                                            </div>

                                            {/* Record Info */}
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{record.patientName}</h3>
                                                    <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(record.status)}`}>
                                                        {getStatusIcon(record.status)}
                                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                                    </span>
                                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getCategoryColor(record.category)}`}>
                                                        {record.category.charAt(0).toUpperCase() + record.category.slice(1)}
                                                    </span>
                                                    {record.attachments > 0 && (
                                                        <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                            <Paperclip className="h-3 w-3" />
                                                            {record.attachments} files
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mb-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <FileText className="h-4 w-4 text-blue-600" />
                                                        {record.recordNumber}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        {getRecordTypeIcon(record.recordType)}
                                                        {record.recordType}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Calendar className="h-4 w-4 text-purple-600" />
                                                        {record.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium text-gray-500">
                                                        <Clock className="h-4 w-4" />
                                                        Updated {record.lastUpdated}
                                                    </span>
                                                </div>

                                                <div className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 inline-block">
                                                    {record.patientAge} years • {record.patientCondition}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Security Badge */}
                                        <div className="flex items-center gap-2 rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-2 shadow-sm">
                                            <Shield className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="text-xs font-semibold text-gray-600">HIPAA Compliant</p>
                                                <p className="flex items-center gap-1 text-xs font-bold text-green-700">
                                                    <Lock className="h-3 w-3" />
                                                    Encrypted
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chief Complaint */}
                                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                        <p className="mb-1 flex items-center gap-2 text-xs font-bold text-gray-600 uppercase">
                                            <Activity className="h-3.5 w-3.5" />
                                            Chief Complaint
                                        </p>
                                        <p className="text-sm font-medium text-blue-900">{record.chiefComplaint}</p>
                                    </div>

                                    {/* Vitals & Diagnosis */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {/* Vitals */}
                                        <div className="space-y-2 rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
                                            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                                                <Heart className="h-4 w-4 text-red-600" />
                                                Vital Signs
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p className="text-xs text-gray-500">Blood Pressure</p>
                                                    <p className="font-semibold text-gray-900">{record.vitals.bloodPressure}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Heart Rate</p>
                                                    <p className="font-semibold text-gray-900">{record.vitals.heartRate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Temperature</p>
                                                    <p className="font-semibold text-gray-900">{record.vitals.temperature}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Weight</p>
                                                    <p className="font-semibold text-gray-900">{record.vitals.weight}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Diagnosis */}
                                        <div className="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4">
                                            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                                                <Stethoscope className="h-4 w-4 text-purple-600" />
                                                Diagnosis
                                            </p>
                                            <p className="text-sm font-bold text-purple-900">{record.diagnosis}</p>
                                        </div>
                                    </div>

                                    {/* Clinical Notes */}
                                    <div className="rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
                                        <p className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                                            <FileText className="h-4 w-4" />
                                            Clinical Notes
                                        </p>
                                        <p className="text-sm leading-relaxed text-gray-700">{record.notes}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                                        <Link href={`/doctor/medical-records/${record.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Full Record
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" className="font-semibold text-blue-600 hover:bg-blue-50">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                        {record.status !== 'archived' && (
                                            <Button variant="outline" size="sm" className="font-semibold text-indigo-600 hover:bg-indigo-50">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" className="font-semibold text-purple-600 hover:bg-purple-50">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                        {record.attachments > 0 && (
                                            <Button variant="outline" size="sm" className="font-semibold text-orange-600 hover:bg-orange-50">
                                                <Paperclip className="mr-2 h-4 w-4" />
                                                Attachments ({record.attachments})
                                            </Button>
                                        )}
                                        <Link href={`/doctor/patients/${record.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold text-green-600 hover:bg-green-50">
                                                <User className="mr-2 h-4 w-4" />
                                                Patient Profile
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredRecords.length === 0 && (
                    <Card className="p-12">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                <FileText className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No medical records found</h3>
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
                {filteredRecords.length > 0 && (
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{filteredRecords.length}</span> of <span className="font-semibold">{medicalRecords.length}</span> records
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