import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Pill,
    Search,
    Calendar,
    Clock,
    User,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Eye,
    Download,
    Printer,
    Copy,
    Plus,
    RefreshCw,
    FileText,
    Activity,
    MessageSquare,
    Package,
    ShieldCheck,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Prescriptions',
        href: '/doctor/prescriptions',
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

export default function Prescriptions() {
    const { auth } = usePage<PageProps>().props;
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock prescriptions data
    const prescriptions = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            patientAvatar: 'SW',
            patientAge: 34,
            patientCondition: 'Hypertension',
            prescriptionNumber: 'RX-2024-001234',
            date: 'Dec 14, 2024',
            status: 'active',
            medications: [
                {
                    name: 'Lisinopril 10mg',
                    frequency: 'Once daily',
                    duration: '30 days',
                    quantity: '30 tablets',
                    instructions: 'Take in the morning with water',
                },
                {
                    name: 'Amlodipine 5mg',
                    frequency: 'Once daily',
                    duration: '30 days',
                    quantity: '30 tablets',
                    instructions: 'Take in the evening',
                },
            ],
            diagnosis: 'Essential Hypertension',
            pharmacyNotes: 'No substitutions',
            refillsRemaining: 2,
            expiryDate: 'Jan 14, 2025',
        },
        {
            id: 2,
            patientName: 'Michael Chen',
            patientAvatar: 'MC',
            patientAge: 45,
            patientCondition: 'Diabetes Type 2',
            prescriptionNumber: 'RX-2024-001235',
            date: 'Dec 14, 2024',
            status: 'active',
            medications: [
                {
                    name: 'Metformin 500mg',
                    frequency: 'Twice daily',
                    duration: '90 days',
                    quantity: '180 tablets',
                    instructions: 'Take with meals',
                },
                {
                    name: 'Glipizide 5mg',
                    frequency: 'Once daily',
                    duration: '90 days',
                    quantity: '90 tablets',
                    instructions: 'Take 30 minutes before breakfast',
                },
                {
                    name: 'Atorvastatin 20mg',
                    frequency: 'Once daily at bedtime',
                    duration: '90 days',
                    quantity: '90 tablets',
                    instructions: 'Take at night',
                },
            ],
            diagnosis: 'Type 2 Diabetes Mellitus with Dyslipidemia',
            pharmacyNotes: 'Patient prefers brand name for Metformin',
            refillsRemaining: 3,
            expiryDate: 'Mar 14, 2025',
        },
        {
            id: 3,
            patientName: 'Emily Davis',
            patientAvatar: 'ED',
            patientAge: 28,
            patientCondition: 'Asthma',
            prescriptionNumber: 'RX-2024-001236',
            date: 'Dec 13, 2024',
            status: 'active',
            medications: [
                {
                    name: 'Albuterol Inhaler',
                    frequency: 'As needed',
                    duration: '90 days',
                    quantity: '1 inhaler',
                    instructions: '2 puffs every 4-6 hours as needed',
                },
            ],
            diagnosis: 'Asthma - Mild Persistent',
            pharmacyNotes: 'Include spacer device',
            refillsRemaining: 5,
            expiryDate: 'Mar 13, 2025',
        },
        {
            id: 4,
            patientName: 'Robert Taylor',
            patientAvatar: 'RT',
            patientAge: 52,
            patientCondition: 'High Cholesterol',
            prescriptionNumber: 'RX-2024-001237',
            date: 'Dec 13, 2024',
            status: 'pending',
            medications: [
                {
                    name: 'Rosuvastatin 10mg',
                    frequency: 'Once daily',
                    duration: '30 days',
                    quantity: '30 tablets',
                    instructions: 'Take at bedtime',
                },
            ],
            diagnosis: 'Hyperlipidemia',
            pharmacyNotes: 'Pending pharmacy confirmation',
            refillsRemaining: 0,
            expiryDate: 'Jan 13, 2025',
        },
        {
            id: 5,
            patientName: 'Lisa Martinez',
            patientAvatar: 'LM',
            patientAge: 39,
            patientCondition: 'Migraine',
            prescriptionNumber: 'RX-2024-001238',
            date: 'Dec 10, 2024',
            status: 'expired',
            medications: [
                {
                    name: 'Sumatriptan 50mg',
                    frequency: 'As needed',
                    duration: '30 days',
                    quantity: '9 tablets',
                    instructions: 'Take at onset of migraine, max 2 per day',
                },
            ],
            diagnosis: 'Migraine Headaches',
            pharmacyNotes: 'None',
            refillsRemaining: 0,
            expiryDate: 'Dec 10, 2024',
        },
    ];

    const stats = {
        totalPrescriptions: 156,
        activePrescriptions: 23,
        pendingRefills: 5,
        expiringThisMonth: 8,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'expired':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle2 className="h-3 w-3" />;
            case 'pending':
                return <Clock className="h-3 w-3" />;
            case 'expired':
                return <XCircle className="h-3 w-3" />;
            default:
                return <AlertCircle className="h-3 w-3" />;
        }
    };

    // Filter prescriptions
    const filteredPrescriptions = prescriptions.filter(prescription => {
        const matchesSearch = 
            prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prescription.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));

        if (activeFilter === 'all') return matchesSearch;
        if (activeFilter === 'active') return matchesSearch && prescription.status === 'active';
        if (activeFilter === 'pending') return matchesSearch && prescription.status === 'pending';
        if (activeFilter === 'expired') return matchesSearch && prescription.status === 'expired';
        
        return matchesSearch;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescriptions" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Prescriptions</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage and track patient prescriptions and medications
                        </p>
                    </div>
                    <Link href="/doctor/prescriptions/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" />
                            New Prescription
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
                                <p className="text-sm text-gray-600">Total This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalPrescriptions}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activePrescriptions}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <RefreshCw className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending Refills</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingRefills}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-red-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                                <AlertCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Expiring Soon</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.expiringThisMonth}</p>
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
                                placeholder="Search by patient, prescription number, or medication..."
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
                                variant={activeFilter === 'active' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'active' ? 'bg-green-600' : ''}
                                onClick={() => setActiveFilter('active')}
                            >
                                Active
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
                                variant={activeFilter === 'expired' ? 'default' : 'outline'} 
                                size="sm"
                                className={activeFilter === 'expired' ? 'bg-red-600' : ''}
                                onClick={() => setActiveFilter('expired')}
                            >
                                Expired
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Prescriptions List */}
                <div className="space-y-4">
                    {filteredPrescriptions.map((prescription) => (
                        <Card key={prescription.id} className="overflow-hidden p-0 transition-shadow hover:shadow-lg">
                            {/* Status Bar */}
                            <div className={`h-2 ${
                                prescription.status === 'active' ? 'bg-green-500' :
                                prescription.status === 'pending' ? 'bg-yellow-500' :
                                prescription.status === 'expired' ? 'bg-red-500' : 'bg-gray-500'
                            }`}></div>
                            
                            <div className="p-6">
                                <div className="flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex items-start gap-4">
                                            {/* Patient Avatar */}
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-pink-600 text-lg font-bold text-white shadow-lg">
                                                {prescription.patientAvatar}
                                            </div>

                                            {/* Prescription Info */}
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{prescription.patientName}</h3>
                                                    <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(prescription.status)}`}>
                                                        {getStatusIcon(prescription.status)}
                                                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                                                    </span>
                                                    {prescription.refillsRemaining > 0 && (
                                                        <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                                            <RefreshCw className="h-3 w-3" />
                                                            {prescription.refillsRemaining} refills left
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mb-3 flex flex-wrap gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <FileText className="h-4 w-4 text-blue-600" />
                                                        {prescription.prescriptionNumber}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Calendar className="h-4 w-4 text-purple-600" />
                                                        Issued: {prescription.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Clock className="h-4 w-4 text-orange-600" />
                                                        Expires: {prescription.expiryDate}
                                                    </span>
                                                </div>

                                                <div className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 inline-block">
                                                    {prescription.patientAge} years • {prescription.patientCondition}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick Info */}
                                        <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50 p-4 text-center shadow-sm">
                                            <Pill className="mx-auto mb-2 h-6 w-6 text-orange-600" />
                                            <p className="text-xs font-semibold text-gray-600">Medications</p>
                                            <p className="text-2xl font-bold text-orange-600">{prescription.medications.length}</p>
                                        </div>
                                    </div>

                                    {/* Diagnosis */}
                                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                                        <p className="mb-1 flex items-center gap-2 text-xs font-bold text-gray-600 uppercase">
                                            <Activity className="h-3.5 w-3.5" />
                                            Diagnosis
                                        </p>
                                        <p className="text-sm font-semibold text-blue-900">{prescription.diagnosis}</p>
                                    </div>

                                    {/* Medications List */}
                                    <div className="space-y-3">
                                        <p className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase">
                                            <Package className="h-4 w-4" />
                                            Prescribed Medications
                                        </p>
                                        {prescription.medications.map((med, index) => (
                                            <div key={index} className="rounded-xl border-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div>
                                                        <h4 className="text-base font-bold text-gray-900">{med.name}</h4>
                                                        <p className="mt-1 text-sm text-gray-600">{med.frequency} • {med.duration}</p>
                                                    </div>
                                                    <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
                                                        {med.quantity}
                                                    </span>
                                                </div>
                                                <div className="rounded-lg border border-gray-200 bg-white p-3">
                                                    <p className="mb-1 text-xs font-semibold text-gray-500 uppercase">Instructions</p>
                                                    <p className="text-sm font-medium text-gray-700">{med.instructions}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pharmacy Notes */}
                                    {prescription.pharmacyNotes && (
                                        <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                                            <p className="mb-1 flex items-center gap-2 text-xs font-bold text-gray-600 uppercase">
                                                <ShieldCheck className="h-3.5 w-3.5" />
                                                Pharmacy Notes
                                            </p>
                                            <p className="text-sm font-medium text-purple-900">{prescription.pharmacyNotes}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                                        <Link href={`/doctor/prescriptions/${prescription.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" className="font-semibold text-blue-600 hover:bg-blue-50">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                        <Button variant="outline" size="sm" className="font-semibold text-purple-600 hover:bg-purple-50">
                                            <Printer className="mr-2 h-4 w-4" />
                                            Print
                                        </Button>
                                        {prescription.status === 'active' && (
                                            <>
                                                <Button variant="outline" size="sm" className="font-semibold text-orange-600 hover:bg-orange-50">
                                                    <RefreshCw className="mr-2 h-4 w-4" />
                                                    Refill
                                                </Button>
                                                <Button variant="outline" size="sm" className="font-semibold text-indigo-600 hover:bg-indigo-50">
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Duplicate
                                                </Button>
                                            </>
                                        )}
                                        {prescription.status === 'expired' && (
                                            <Button variant="outline" size="sm" className="font-semibold text-green-600 hover:bg-green-50">
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Renew
                                            </Button>
                                        )}
                                        <Link href={`/doctor/patients/${prescription.id}`}>
                                            <Button variant="outline" size="sm" className="font-semibold text-green-600 hover:bg-green-50">
                                                <User className="mr-2 h-4 w-4" />
                                                Patient
                                            </Button>
                                        </Link>
                                        <Link href={`/doctor/messages?patient=${prescription.id}`}>
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
                {filteredPrescriptions.length === 0 && (
                    <Card className="p-12">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                <Pill className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No prescriptions found</h3>
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
                {filteredPrescriptions.length > 0 && (
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{filteredPrescriptions.length}</span> of <span className="font-semibold">{prescriptions.length}</span> prescriptions
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