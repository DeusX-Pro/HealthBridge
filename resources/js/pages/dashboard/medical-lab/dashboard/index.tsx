import MedicalLabLayout from '@/layouts/medical-lab-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    LayoutDashboard,
    Microscope,
    ShoppingCart,
    Upload,
    TrendingUp,
    ArrowUpRight,
    Activity,
    DollarSign,
    ChevronRight,
    CheckCircle2,
    Clock,
    BarChart3,
    AlertCircle,
    FileText,
    Users,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/medical-lab/dashboard',
    },
];

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    totalServices: number;
    walletBalance: number;
    [key: string]: any;
}

export default function MedicalLabDashboard() {
    const { auth, totalServices, walletBalance } = usePage<PageProps>().props;

    // Mock data - only for items not yet dynamic
    const stats = {
        totalServices: totalServices || 0,
        pendingTests: 15,
        completedTests: 124,
        totalRevenue: walletBalance || 0,
        testGrowth: 12.5,
        customerGrowth: 8.3,
        turnaroundTime: '24h',
        accuracyRate: 99.8,
    };

    const recentOrders = [
        {
            id: 1,
            patientName: 'John Doe',
            orderNumber: 'LAB-2024-001',
            testType: 'Complete Blood Count',
            total: 15000,
            status: 'pending',
            date: '2024-12-15',
            time: '10:30 AM',
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            orderNumber: 'LAB-2024-002',
            testType: 'Lipid Panel',
            total: 12000,
            status: 'processing',
            date: '2024-12-15',
            time: '11:15 AM',
        },
        {
            id: 3,
            patientName: 'Michael Johnson',
            orderNumber: 'LAB-2024-003',
            testType: 'Liver Function Test',
            total: 18000,
            status: 'completed',
            date: '2024-12-15',
            time: '09:45 AM',
        },
    ];

    const pendingResults = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            testType: 'Complete Blood Count',
            orderNumber: 'LAB-2024-004',
            completedDate: '2024-12-14',
            status: 'ready',
        },
        {
            id: 2,
            patientName: 'Robert Taylor',
            testType: 'Urinalysis',
            orderNumber: 'LAB-2024-005',
            completedDate: '2024-12-14',
            status: 'ready',
        },
    ];

    const availableServices = [
        {
            id: 1,
            name: 'Complete Blood Count',
            category: 'Hematology',
            price: 15000,
            status: 'active',
        },
        {
            id: 2,
            name: 'Lipid Panel',
            category: 'Chemistry',
            price: 12000,
            status: 'active',
        },
        {
            id: 3,
            name: 'Liver Function Test',
            category: 'Chemistry',
            price: 18000,
            status: 'active',
        },
    ];

    return (
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Medical Lab Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    Welcome, {auth.user.name} 🔬
                                </h1>
                                <p className="max-w-2xl text-sm text-teal-50 sm:text-base">
                                    You have {stats.pendingTests} pending tests to process today.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <Microscope className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/medical-lab/orders">
                                <Button
                                    variant="outline"
                                    className="bg-white text-teal-700 shadow-lg hover:bg-teal-50"
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    View Orders
                                </Button>
                            </Link>
                            <Link href="/medical-lab/upload-results">
                                <Button className="bg-white text-teal-700 shadow-lg hover:bg-teal-50">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Results
                                </Button>
                            </Link>
                            <Link href="/medical-lab/services">
                                <Button
                                    variant="outline"
                                    className="bg-white text-teal-700 shadow-lg hover:bg-teal-50"
                                >
                                    <Microscope className="mr-2 h-4 w-4" />
                                    Manage Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-teal-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                                <Microscope className="h-6 w-6 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Services</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalServices}</p>
                                <p className="text-xs text-gray-500">All active</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-blue-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <ShoppingCart className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pending Tests</p>
                                <p className="text-xl font-bold text-gray-900">{stats.pendingTests}</p>
                                <div className="flex items-center gap-1 text-xs text-blue-600">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>High priority</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <Upload className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Accuracy Rate</p>
                                <p className="text-xl font-bold text-gray-900">{stats.accuracyRate}%</p>
                                <p className="text-xs text-gray-500">Industry standard</p>
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
                                <p className="text-xl font-bold text-gray-900">₦{walletBalance?.toLocaleString() || '0.00'}</p>
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
                                <BarChart3 className="h-5 w-5 text-teal-600" />
                                <h2 className="text-lg font-bold text-gray-900">Monthly Performance</h2>
                            </div>
                            <Activity className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Wallet Balance</p>
                                <p className="text-3xl font-bold text-gray-900">${walletBalance?.toLocaleString() || '0.00'}</p>
                                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Ready for withdrawal</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Accuracy Rate</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.accuracyRate}%
                                </p>
                                <div className="mt-3 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-teal-500 h-2 rounded-full" 
                                        style={{ width: `${stats.accuracyRate}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="rounded-xl border border-teal-100 bg-teal-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Microscope className="h-4 w-4 text-teal-600" />
                                    <span className="text-xs font-medium text-gray-600">Active Services</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{stats.totalServices}</p>
                                <p className="text-xs text-gray-500">Current catalog</p>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <span className="text-xs font-medium text-gray-600">Accuracy</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{stats.accuracyRate}%</p>
                                <p className="text-xs text-gray-500">Verified tests</p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-medium text-gray-600">Turnaround</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{stats.turnaroundTime}</p>
                                <p className="text-xs text-gray-500">Average time</p>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="mb-6 text-lg font-bold text-gray-900">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/medical-lab/services">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
                                        <Microscope className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-teal-700">
                                            Manage Services
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Add or update lab tests
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600" />
                                </button>
                            </Link>

                            <Link href="/medical-lab/orders">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                                            View Orders
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {stats.pendingTests} pending
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                </button>
                            </Link>

                            <Link href="/medical-lab/upload-results">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-orange-700">
                                            Upload Results
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {stats.pendingTests} ready
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                                </button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Recent Orders & Pending Results */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Orders */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                            </div>
                            <Link href="/medical-lab/orders">
                                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
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
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white font-bold">
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
                                        <p className="text-sm text-gray-600">{order.testType}</p>
                                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                            <span>{order.orderNumber}</span>
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

                    {/* Pending Results */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Upload className="h-5 w-5 text-orange-600" />
                                <h2 className="text-lg font-bold text-gray-900">Pending Results</h2>
                            </div>
                            <Link href="/medical-lab/upload-results">
                                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {pendingResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="rounded-xl border border-green-100 bg-green-50 p-4"
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{result.testType}</h3>
                                            <p className="text-sm text-gray-600">{result.patientName}</p>
                                        </div>
                                        <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-medium text-white">
                                            Ready
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-500">Order: {result.orderNumber}</span>
                                            <p className="text-xs text-gray-500">Completed: {result.completedDate}</p>
                                        </div>
                                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Available Services */}
                <Card className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Microscope className="h-5 w-5 text-teal-600" />
                            <h2 className="text-lg font-bold text-gray-900">Available Services</h2>
                        </div>
                        <Link href="/medical-lab/services">
                            <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                                View All
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {availableServices.map((service) => (
                            <div
                                key={service.id}
                                className="rounded-xl border border-teal-100 bg-teal-50 p-4"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                        <p className="text-sm text-gray-600">{service.category}</p>
                                    </div>
                                    <span className="rounded-full bg-teal-600 px-2 py-1 text-xs font-medium text-white">
                                        {service.status}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">₦{service.price.toLocaleString()}</span>
                                    <Button size="sm" variant="outline" className="h-auto py-1 px-3 text-teal-600 hover:bg-teal-100">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </MedicalLabLayout>
    );
}

