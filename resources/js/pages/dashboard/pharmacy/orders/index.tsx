import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Orders' },
];

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Dummy data
    const [orders, setOrders] = useState([
        {
            id: 1,
            orderNumber: 'ORD-2024-001',
            patientName: 'John Doe',
            patientEmail: 'john@example.com',
            patientPhone: '+234 801 234 5678',
            items: [
                { name: 'Paracetamol 500mg', quantity: 2, price: 500 },
                { name: 'Amoxicillin 250mg', quantity: 1, price: 1200 },
            ],
            total: 2200,
            status: 'pending',
            orderDate: '2024-12-15',
            orderTime: '10:30 AM',
            deliveryAddress: '123 Main Street, Lagos',
        },
        {
            id: 2,
            orderNumber: 'ORD-2024-002',
            patientName: 'Jane Smith',
            patientEmail: 'jane@example.com',
            patientPhone: '+234 802 345 6789',
            items: [
                { name: 'Vitamin D3 1000IU', quantity: 1, price: 2500 },
            ],
            total: 2500,
            status: 'processing',
            orderDate: '2024-12-15',
            orderTime: '11:15 AM',
            deliveryAddress: '456 Oak Avenue, Abuja',
        },
        {
            id: 3,
            orderNumber: 'ORD-2024-003',
            patientName: 'Michael Johnson',
            patientEmail: 'michael@example.com',
            patientPhone: '+234 803 456 7890',
            items: [
                { name: 'Paracetamol 500mg', quantity: 3, price: 500 },
                { name: 'Amoxicillin 250mg', quantity: 2, price: 1200 },
                { name: 'Vitamin D3 1000IU', quantity: 1, price: 2500 },
            ],
            total: 6400,
            status: 'completed',
            orderDate: '2024-12-14',
            orderTime: '09:45 AM',
            deliveryAddress: '789 Pine Road, Port Harcourt',
        },
    ]);

    const updateOrderStatus = (id: number, newStatus: string) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
        
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
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Management" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage patient orders and deliveries
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
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

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <Card key={order.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {order.orderDate} at {order.orderTime}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">₦{order.total.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{order.items.length} item(s)</p>
                                </div>
                            </div>

                            <div className="mb-4 space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Patient Information</p>
                                    <p className="text-sm text-gray-600">{order.patientName}</p>
                                    <p className="text-sm text-gray-600">{order.patientEmail}</p>
                                    <p className="text-sm text-gray-600">{order.patientPhone}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                                </div>
                            </div>

                            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-700">Order Items</p>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.quantity}x {item.name}
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                ₦{(item.quantity * item.price).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {order.status === 'pending' && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => updateOrderStatus(order.id, 'processing')}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Package className="mr-2 h-4 w-4" />
                                            Start Processing
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
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
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Mark as Completed
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
                    <Card className="p-12 text-center">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No orders found matching your criteria.
                        </p>
                    </Card>
                )}
            </div>
        </PharmacyLayout>
    );
}

