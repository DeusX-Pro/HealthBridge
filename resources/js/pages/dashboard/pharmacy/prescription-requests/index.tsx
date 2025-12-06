import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ClipboardList,
    Search,
    CheckCircle2,
    Clock,
    X,
    Eye,
    FileText,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Prescription Requests' },
];

export default function PrescriptionRequestsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Dummy data
    const [requests, setRequests] = useState([
        {
            id: 1,
            prescriptionNumber: 'PRES-2024-001',
            patientName: 'Sarah Williams',
            patientEmail: 'sarah@example.com',
            patientPhone: '+234 801 234 5678',
            doctorName: 'Dr. John Smith',
            items: [
                { name: 'Paracetamol 500mg', quantity: 2, dosage: '500mg twice daily' },
                { name: 'Amoxicillin 250mg', quantity: 1, dosage: '250mg three times daily' },
            ],
            status: 'pending',
            requestedDate: '2024-12-14',
            requestedTime: '10:30 AM',
            notes: 'Patient has mild fever and cough',
        },
        {
            id: 2,
            prescriptionNumber: 'PRES-2024-002',
            patientName: 'Robert Taylor',
            patientEmail: 'robert@example.com',
            patientPhone: '+234 802 345 6789',
            doctorName: 'Dr. Jane Doe',
            items: [
                { name: 'Vitamin D3 1000IU', quantity: 1, dosage: '1000IU once daily' },
            ],
            status: 'reviewing',
            requestedDate: '2024-12-14',
            requestedTime: '11:15 AM',
            notes: 'Regular supplement for vitamin D deficiency',
        },
        {
            id: 3,
            prescriptionNumber: 'PRES-2024-003',
            patientName: 'Emily Davis',
            patientEmail: 'emily@example.com',
            patientPhone: '+234 803 456 7890',
            doctorName: 'Dr. Michael Brown',
            items: [
                { name: 'Paracetamol 500mg', quantity: 3, dosage: '500mg as needed' },
            ],
            status: 'approved',
            requestedDate: '2024-12-13',
            requestedTime: '09:45 AM',
            notes: 'Pain management',
        },
    ]);

    const updateRequestStatus = (id: number, newStatus: string) => {
        setRequests(requests.map(request => 
            request.id === id ? { ...request, status: newStatus } : request
        ));
    };

    const filteredRequests = requests.filter(request => {
        const matchesSearch = 
            request.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
            reviewing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: FileText },
            approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
            rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: X },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const Icon = config.icon;
        
        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
                <Icon className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescription Requests" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Prescription Requests</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Review and process prescription requests from patients
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search prescription requests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'pending', 'reviewing', 'approved', 'rejected'].map((status) => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className={statusFilter === status ? 'bg-purple-600 hover:bg-purple-700' : ''}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Requests List */}
                <div className="space-y-4">
                    {filteredRequests.map((request) => (
                        <Card key={request.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{request.prescriptionNumber}</h3>
                                        {getStatusBadge(request.status)}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Requested on {request.requestedDate} at {request.requestedTime}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Patient Information</p>
                                    <p className="text-sm text-gray-600">{request.patientName}</p>
                                    <p className="text-sm text-gray-600">{request.patientEmail}</p>
                                    <p className="text-sm text-gray-600">{request.patientPhone}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Prescribed by</p>
                                    <p className="text-sm text-gray-600">{request.doctorName}</p>
                                </div>
                                {request.notes && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Notes</p>
                                        <p className="text-sm text-gray-600">{request.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-700">Prescribed Medications</p>
                                <div className="space-y-2">
                                    {request.items.map((item, index) => (
                                        <div key={index} className="flex items-start justify-between text-sm">
                                            <div>
                                                <span className="font-medium text-gray-900">
                                                    {item.quantity}x {item.name}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{item.dosage}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {request.status === 'pending' && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => updateRequestStatus(request.id, 'reviewing')}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            Start Review
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </>
                                )}
                                {request.status === 'reviewing' && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => updateRequestStatus(request.id, 'approved')}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updateRequestStatus(request.id, 'rejected')}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="ml-auto"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredRequests.length === 0 && (
                    <Card className="p-12 text-center">
                        <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No prescription requests found matching your criteria.
                        </p>
                    </Card>
                )}
            </div>
        </PharmacyLayout>
    );
}

