import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    LayoutDashboard,
    Warehouse,
    ShoppingCart,
    ClipboardList,
    TrendingUp,
    ArrowUpRight,
    Activity,
    DollarSign,
    ChevronRight,
    Pill,
    Package,
    Users,
    AlertCircle,
    CheckCircle2,
    Clock,
    BarChart3,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/pharmacy/dashboard',
    },
];

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    totalMedicines: number;
    walletBalance: number;
    [key: string]: any;
}

export default function PharmacyDashboard() {
    const { auth, totalMedicines, walletBalance } = usePage<PageProps>().props;

    // Mock data - only for items not yet dynamic
    const stats = {
        totalMedicines: totalMedicines || 0,
        lowStockItems: 23,
        pendingOrders: 18,
        prescriptionRequests: 12,
        todayRevenue: walletBalance || 0,
        monthlyRevenue: 1245000,
        revenueGrowth: 15.3,
        totalOrders: 342,
        completedOrders: 298,
        averageOrderValue: 3500,
    };

    const recentOrders = [
        {
            id: 1,
            patientName: 'John Doe',
            orderNumber: 'ORD-2024-001',
            total: 12500,
            status: 'pending',
            items: 3,
            date: '2024-12-15',
            time: '10:30 AM',
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            orderNumber: 'ORD-2024-002',
            total: 8500,
            status: 'processing',
            items: 2,
            date: '2024-12-15',
            time: '11:15 AM',
        },
        {
            id: 3,
            patientName: 'Michael Johnson',
            orderNumber: 'ORD-2024-003',
            total: 15200,
            status: 'completed',
            items: 5,
            date: '2024-12-15',
            time: '09:45 AM',
        },
    ];

    const prescriptionRequests = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            prescriptionNumber: 'PRES-2024-001',
            status: 'pending',
            requestedDate: '2024-12-14',
            items: 4,
        },
        {
            id: 2,
            patientName: 'Robert Taylor',
            prescriptionNumber: 'PRES-2024-002',
            status: 'reviewing',
            requestedDate: '2024-12-14',
            items: 2,
        },
    ];

    const lowStockItems = [
        {
            id: 1,
            name: 'Paracetamol 500mg',
            currentStock: 15,
            minStock: 50,
            category: 'Pain Relief',
        },
        {
            id: 2,
            name: 'Amoxicillin 250mg',
            currentStock: 8,
            minStock: 30,
            category: 'Antibiotics',
        },
        {
            id: 3,
            name: 'Vitamin D3',
            currentStock: 12,
            minStock: 40,
            category: 'Supplements',
        },
    ];

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Pharmacy Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    Welcome, {auth.user.name} 💊
                                </h1>
                                <p className="max-w-2xl text-sm text-purple-50 sm:text-base">
                                    You have {stats.pendingOrders} pending orders and {stats.prescriptionRequests} prescription requests to review.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <Pill className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/pharmacy/orders">
                                <Button
                                    variant="outline"
                                    className="bg-white text-purple-700 shadow-lg hover:bg-purple-50"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    View Orders
                                </Button>
                            </Link>
                            <Link href="/pharmacy/prescription-requests">
                                <Button className="bg-white text-purple-700 shadow-lg hover:bg-purple-50">
                                    <ClipboardList className="mr-2 h-4 w-4" />
                                    Prescription Requests
                                </Button>
                            </Link>
                            <Link href="/pharmacy/inventory/medicines">
                                <Button
                                    variant="outline"
                                    className="bg-white text-purple-700 shadow-lg hover:bg-purple-50"
                                >
                                    <Warehouse className="mr-2 h-4 w-4" />
                                    Manage Inventory
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-purple-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <Pill className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Medicines</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalMedicines}</p>
                                <p className="text-xs text-gray-500">{stats.lowStockItems} low stock</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-blue-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <ShoppingCart className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending Orders</p>
                                <p className="text-xl font-bold text-gray-900">{stats.pendingOrders}</p>
                                <div className="flex items-center gap-1 text-xs text-blue-600">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>+12% this week</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <ClipboardList className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Prescription Requests</p>
                                <p className="text-xl font-bold text-gray-900">{stats.prescriptionRequests}</p>
                                <p className="text-xs text-gray-500">Awaiting review</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-emerald-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                <DollarSign className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Wallet Balance</p>
                                <p className="text-xl font-bold text-gray-900">${walletBalance?.toLocaleString() || '0.00'}</p>
                                <div className="flex items-center gap-1 text-xs text-emerald-600">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>Available</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Revenue & Performance */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Monthly Performance */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-purple-600" />
                                <h2 className="text-lg font-bold text-gray-900">Monthly Performance</h2>
                            </div>
                            <Activity className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Monthly Revenue</p>
                                <p className="text-3xl font-bold text-gray-900">₦{stats.monthlyRevenue.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>{stats.revenueGrowth}% from last month</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Order Completion Rate</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {Math.round((stats.completedOrders / stats.totalOrders) * 100)}%
                                </p>
                                <div className="mt-3 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-purple-500 h-2 rounded-full" 
                                        style={{ width: `${(stats.completedOrders / stats.totalOrders) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                                    <span className="text-xs font-medium text-gray-600">Total Orders</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{stats.totalOrders}</p>
                                <p className="text-xs text-gray-500">This month</p>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-xs font-medium text-gray-600">Completed</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{stats.completedOrders}</p>
                                <p className="text-xs text-gray-500">This month</p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-medium text-gray-600">Avg. Order</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">₦{stats.averageOrderValue.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Per order</p>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="mb-6 text-lg font-bold text-gray-900">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/pharmacy/inventory/medicines">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <Warehouse className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-purple-700">
                                            Manage Inventory
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Add or update medicines
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                                </button>
                            </Link>

                            <Link href="/pharmacy/orders">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                                            View Orders
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {stats.pendingOrders} pending
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                </button>
                            </Link>

                            <Link href="/pharmacy/prescription-requests">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white">
                                        <ClipboardList className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-orange-700">
                                            Prescription Requests
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {stats.prescriptionRequests} awaiting review
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                                </button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Recent Orders & Low Stock */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Orders */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                            </div>
                            <Link href="/pharmacy/orders">
                                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className={`flex items-center gap-4 rounded-xl border p-4 ${
                                        order.status === 'completed'
                                            ? 'border-green-100 bg-green-50'
                                            : order.status === 'processing'
                                            ? 'border-blue-100 bg-blue-50'
                                            : 'border-orange-100 bg-orange-50'
                                    }`}
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold">
                                        {order.orderNumber.slice(-3)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">{order.patientName}</h3>
                                            <span className={`rounded-full px-2 py-0.5 text-xs text-white ${
                                                order.status === 'completed' ? 'bg-green-600' :
                                                order.status === 'processing' ? 'bg-blue-600' : 'bg-orange-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{order.orderNumber}</p>
                                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                            <span>{order.items} items</span>
                                            <span>•</span>
                                            <span>{order.date} {order.time}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">₦{order.total.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Low Stock Items */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                <h2 className="text-lg font-bold text-gray-900">Low Stock Alert</h2>
                            </div>
                            <Link href="/pharmacy/inventory/medicines">
                                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {lowStockItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-red-100 bg-red-50 p-4"
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.category}</p>
                                        </div>
                                        <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white">
                                            Low Stock
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500">Current: </span>
                                            <span className="text-sm font-bold text-red-600">{item.currentStock}</span>
                                            <span className="text-xs text-gray-500"> / Min: {item.minStock}</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-auto py-1 px-3 text-red-600 hover:bg-red-100">
                                            Restock
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Prescription Requests */}
                <Card className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-orange-600" />
                            <h2 className="text-lg font-bold text-gray-900">Prescription Requests</h2>
                        </div>
                        <Link href="/pharmacy/prescription-requests">
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {prescriptionRequests.map((request) => (
                            <div
                                key={request.id}
                                className={`flex items-center gap-4 rounded-xl border p-4 ${
                                    request.status === 'reviewing'
                                        ? 'border-blue-100 bg-blue-50'
                                        : 'border-orange-100 bg-orange-50'
                                }`}
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 text-white font-bold">
                                    {request.prescriptionNumber.slice(-3)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">{request.patientName}</h3>
                                        <span className={`rounded-full px-2 py-0.5 text-xs text-white ${
                                            request.status === 'reviewing' ? 'bg-blue-600' : 'bg-orange-600'
                                        }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{request.prescriptionNumber}</p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span>{request.items} items</span>
                                        <span>•</span>
                                        <span>Requested: {request.requestedDate}</span>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                    Review
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </PharmacyLayout>
    );
}

