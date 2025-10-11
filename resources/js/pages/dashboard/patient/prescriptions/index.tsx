import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Pill,
    Search,
    Filter,
    Calendar,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Download,
    Share2,
    Plus,
    Bell,
    Package,
    ShoppingCart,
    FileText,
    TrendingUp,
    Repeat,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Prescriptions',
        href: '/patient/prescriptions',
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
    const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
    const [searchQuery, setSearchQuery] = useState('');

    const prescriptions = [
        {
            id: 1,
            medicationName: 'Amoxicillin 500mg',
            dosage: '3 times daily after meals',
            prescribedBy: 'Dr. Sarah Johnson',
            prescribedDate: '2024-12-01',
            startDate: '2024-12-02',
            endDate: '2024-12-16',
            duration: 14,
            daysRemaining: 5,
            quantity: '42 tablets',
            refillsRemaining: 0,
            instructions: 'Take with breakfast for better absorption.',
            status: 'active',
            progress: null,
            category: 'Supplement',
        },
        {
            id: 3,
            medicationName: 'Lisinopril 10mg',
            dosage: 'Once daily',
            prescribedBy: 'Dr. Sarah Johnson',
            prescribedDate: '2024-10-01',
            startDate: '2024-10-02',
            endDate: null,
            duration: null,
            daysRemaining: null,
            quantity: '30 tablets',
            refillsRemaining: 3,
            instructions: 'Take at the same time each day. Monitor blood pressure regularly.',
            status: 'active',
            progress: null,
            category: 'Blood Pressure',
        },
        {
            id: 4,
            medicationName: 'Ibuprofen 400mg',
            dosage: 'As needed for pain',
            prescribedBy: 'Dr. James Wilson',
            prescribedDate: '2024-11-20',
            startDate: '2024-11-21',
            endDate: '2024-11-28',
            duration: 7,
            daysRemaining: 0,
            quantity: '20 tablets',
            refillsRemaining: 0,
            instructions: 'Take with food. Maximum 3 times per day.',
            status: 'completed',
            progress: 100,
            category: 'Pain Relief',
        },
        {
            id: 5,
            medicationName: 'Metformin 500mg',
            dosage: 'Twice daily with meals',
            prescribedBy: 'Dr. Emily Rodriguez',
            prescribedDate: '2024-09-15',
            startDate: '2024-09-16',
            endDate: null,
            duration: null,
            daysRemaining: null,
            quantity: '60 tablets',
            refillsRemaining: 4,
            instructions: 'Take with breakfast and dinner. Monitor blood sugar levels.',
            status: 'active',
            progress: null,
            category: 'Diabetes',
        },
    ];

    const filteredPrescriptions = prescriptions.filter((prescription) => {
        const matchesSearch = prescription.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prescription.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prescription.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'all' || prescription.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const activePrescriptions = prescriptions.filter(p => p.status === 'active').length;
    const needingRefill = prescriptions.filter(p => p.daysRemaining !== null && p.daysRemaining < 7).length;

    const getStatusBadge = (status: string) => {
        if (status === 'active') {
            return 'bg-green-100 text-green-700 border-green-200';
        }
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Antibiotic': 'from-green-500 to-red-500',
            'Supplement': 'from-green-500 to-emerald-500',
            'Blood Pressure': 'from-blue-500 to-indigo-500',
            'Pain Relief': 'from-purple-500 to-pink-500',
            'Diabetes': 'from-yellow-500 to-amber-500',
        };
        return colors[category] || 'from-gray-500 to-gray-600';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescriptions" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Pill className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        My Prescriptions
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Manage your medications and track your treatment progress
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Link href="/patient/doctors">
                                    <Button className="bg-white text-green-600 shadow-lg hover:bg-green-50">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Request Prescription
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
                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-red-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Active Prescriptions
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-600">
                                    {activePrescriptions}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                                <Pill className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Needing Refill
                                </p>
                                <p className="mt-2 text-3xl font-bold text-amber-600">
                                    {needingRefill}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 text-white">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Refills Available
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-600">
                                    {prescriptions.reduce((acc, p) => acc + p.refillsRemaining, 0)}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                                <Repeat className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Medications
                                </p>
                                <p className="mt-2 text-3xl font-bold text-blue-600">
                                    {prescriptions.length}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <Package className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Prescriptions List */}
                    <div className="lg:col-span-8">
                        <Card>
                            {/* Search and Tabs */}
                            <div className="border-b border-gray-200 bg-gray-50 p-4">
                                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2">
                                        <Search className="h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search prescriptions..."
                                            className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                        />
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveTab('active')}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                            activeTab === 'active'
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        Active ({activePrescriptions})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('completed')}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                            activeTab === 'completed'
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        Completed
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                            activeTab === 'all'
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        All ({prescriptions.length})
                                    </button>
                                </div>
                            </div>

                            {/* Prescriptions List */}
                            <div className="divide-y divide-gray-200">
                                {filteredPrescriptions.map((prescription) => (
                                    <div
                                        key={prescription.id}
                                        className="p-6 transition-all hover:bg-gray-50"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Medication Icon */}
                                            <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getCategoryColor(prescription.category)} text-white shadow-md`}>
                                                <Pill className="h-8 w-8" />
                                            </div>

                                            {/* Prescription Details */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-lg font-bold text-gray-900">
                                                                {prescription.medicationName}
                                                            </h3>
                                                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                                                                {prescription.category}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-700">
                                                            {prescription.dosage}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Prescribed by {prescription.prescribedBy}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                                            prescription.status
                                                        )}`}
                                                    >
                                                        {prescription.status === 'active' ? (
                                                            <CheckCircle2 className="h-3 w-3" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3" />
                                                        )}
                                                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                                                    </div>
                                                </div>

                                                {/* Progress Bar (if applicable) */}
                                                {prescription.progress !== null && (
                                                    <div className="mt-3">
                                                        <div className="mb-1 flex justify-between text-xs">
                                                            <span className="text-gray-600">Treatment Progress</span>
                                                            <span className="font-semibold text-gray-900">
                                                                {prescription.progress}%
                                                            </span>
                                                        </div>
                                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                                            <div
                                                                className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500"
                                                                style={{ width: `${prescription.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        {prescription.daysRemaining !== null && (
                                                            <p className="mt-1 text-xs text-gray-600">
                                                                {prescription.daysRemaining} days remaining
                                                                {prescription.daysRemaining < 7 && (
                                                                    <span className="ml-2 font-semibold text-amber-600">
                                                                        • Almost done!
                                                                    </span>
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Details */}
                                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4 text-blue-600" />
                                                        Started: {new Date(prescription.startDate).toLocaleDateString()}
                                                    </div>
                                                    {prescription.endDate && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Calendar className="h-4 w-4 text-red-600" />
                                                            Ends: {new Date(prescription.endDate).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Package className="h-4 w-4 text-purple-600" />
                                                        Quantity: {prescription.quantity}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Repeat className="h-4 w-4 text-green-600" />
                                                        {prescription.refillsRemaining} refills left
                                                    </div>
                                                </div>

                                                {/* Instructions */}
                                                <div className="mt-3 rounded-lg bg-blue-50 p-3">
                                                    <p className="text-xs font-semibold text-blue-900">
                                                        Instructions:
                                                    </p>
                                                    <p className="mt-1 text-xs text-blue-800">
                                                        {prescription.instructions}
                                                    </p>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {prescription.status === 'active' && (
                                                        <>
                                                            {prescription.refillsRemaining > 0 && (
                                                                <Button size="sm" variant="outline">
                                                                    <Repeat className="mr-2 h-4 w-4" />
                                                                    Request Refill
                                                                </Button>
                                                            )}
                                                            <Link href="/patient/pharmacies">
                                                                <Button size="sm" variant="outline">
                                                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                                                    Order Online
                                                                </Button>
                                                            </Link>
                                                            <Button size="sm" variant="outline">
                                                                <Bell className="mr-2 h-4 w-4" />
                                                                Set Reminder
                                                            </Button>
                                                        </>
                                                    )}
                                                    <Button size="sm" variant="outline">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Share2 className="mr-2 h-4 w-4" />
                                                        Share
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredPrescriptions.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Pill className="h-16 w-16 text-gray-300" />
                                    <p className="mt-4 text-lg font-semibold text-gray-900">
                                        No prescriptions found
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Try adjusting your search or filters
                                    </p>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 lg:col-span-4">
                        {/* Refill Reminder */}
                        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-amber-600" />
                                <h3 className="text-sm font-bold text-gray-900">
                                    Refill Reminders
                                </h3>
                            </div>
                            {prescriptions
                                .filter(p => p.daysRemaining !== null && p.daysRemaining < 7)
                                .map(prescription => (
                                    <div key={prescription.id} className="mb-3 rounded-xl bg-white p-4 shadow-sm">
                                        <p className="font-semibold text-gray-900">
                                            {prescription.medicationName}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600">
                                            Only {prescription.daysRemaining} days left
                                        </p>
                                        <Button size="sm" className="mt-3 w-full bg-amber-600 hover:bg-amber-700">
                                            <Repeat className="mr-2 h-4 w-4" />
                                            Request Refill
                                        </Button>
                                    </div>
                                ))}
                            {needingRefill === 0 && (
                                <div className="rounded-xl bg-white p-4 text-center">
                                    <CheckCircle2 className="mx-auto h-8 w-8 text-green-600" />
                                    <p className="mt-2 text-sm text-gray-600">
                                        All medications have sufficient supply
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-4">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link href="/patient/doctors">
                                    <button className="flex w-full items-center gap-3 rounded-lg border border-green-100 bg-gradient-to-r from-green-50 to-red-50 p-3 text-left transition-all hover:shadow-md">
                                        <Plus className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Request New Prescription
                                        </span>
                                    </button>
                                </Link>
                                <Link href="/patient/pharmacies">
                                    <button className="flex w-full items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 text-left transition-all hover:shadow-md">
                                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            Find Pharmacy
                                        </span>
                                    </button>
                                </Link>
                                <Link href="/patient/health-records">
                                    <button className="flex w-full items-center gap-3 rounded-lg border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-3 text-left transition-all hover:shadow-md">
                                        <FileText className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            View Medical History
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </Card>

                        {/* Medication Adherence */}
                        {/* <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                            <div className="mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                <h3 className="text-sm font-bold text-gray-900">
                                    Adherence Rate
                                </h3>
                            </div>
                            <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                                <div className="mb-2 text-4xl font-bold text-green-600">
                                    92%
                                </div>
                                <p className="text-xs text-gray-600">
                                    Great job following your treatment plan!
                                </p>
                                <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                                    <div className="h-2 w-11/12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                                </div>
                            </div>
                        </Card> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}