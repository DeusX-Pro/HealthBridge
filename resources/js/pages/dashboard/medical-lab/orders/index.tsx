import MedicalLabLayout from '@/layouts/medical-lab-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { medicalLab } from '@/routes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ShoppingCart,
    Search,
    CheckCircle2,
    Clock,
    X,
    Eye,
    Package,
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/medical-lab/dashboard' },
    { title: 'Orders', href: medicalLab.orders.status(0).url }, // Base URL or similar if needed
];

interface Order {
    id: number;
    patient: {
        user: {
            name: string;
            email: string;
        }
    };
    service: {
        name: string;
    };
    price: number;
    status: string;
    created_at: string;
}

export default function OrdersPage() {
    const { orders } = usePage<{ orders: Order[] }>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { patch, setData, processing } = useForm({
        status: '',
    });

    const updateOrderStatus = (id: number, newStatus: string) => {
        setData('status', newStatus);
        patch(medicalLab.orders.status(id).url, {
            preserveScroll: true,
        });
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.patient.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.service.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
            processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Package },
            completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
            cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: X },
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
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Lab Order Management" />

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Lab Order Management</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage laboratory test orders from patients
                    </p>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search by patient name or test..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className={statusFilter === status ? 'bg-teal-600 hover:bg-teal-700' : ''}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <Card key={order.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">ORDER #{order.id.toString().padStart(4, '0')}</h3>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Ordered on {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">₦{parseFloat(order.price.toString()).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{order.service.name}</p>
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Patient Details</p>
                                    <p className="text-sm font-semibold text-gray-900">{order.patient.user.name}</p>
                                    <p className="text-sm text-gray-500">{order.patient.user.email}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requested Test</p>
                                    <p className="text-sm font-semibold text-gray-900">{order.service.name}</p>
                                    <p className="text-xs text-blue-600 font-bold mt-1">Ready for collection</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {order.status === 'pending' && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => updateOrderStatus(order.id, 'processing')}
                                            disabled={processing}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Package className="mr-2 h-4 w-4" />
                                            Start Processing
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                            disabled={processing}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {order.status === 'processing' && (
                                    <Button
                                        size="sm"
                                        onClick={() => updateOrderStatus(order.id, 'completed')}
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Finalize Order
                                    </Button>
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

                {filteredOrders.length === 0 && (
                    <Card className="p-16 text-center border-dashed border-2 bg-gray-50/50">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-bold text-gray-900">No active orders</h3>
                        <p className="text-sm text-gray-500">
                            Orders will appear here once patients book tests from your profile.
                        </p>
                    </Card>
                )}
            </div>
        </MedicalLabLayout>
    );
}
