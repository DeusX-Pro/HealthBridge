import AppLayout from '@/layouts/patient-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    LayoutDashboard,
    Bot,
    Calendar,
    Stethoscope,
    Pill,
    FileText,
    ClipboardList,
    Activity,
    Video,
    Store,
    MessageSquare,
    Wallet,
    Heart,
    Phone,
    User,
    Settings,
    ChevronRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Gift,
    Zap,
    Users,
    MapPin,
    Star,
    Shield,
    HeartPulse,
    Droplet,
    Thermometer,
    Weight,
    Package,
    FlaskConical,
    ShoppingBag
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
            patient?: {
                id: number;
                appointments?: any[];
            };
        };
    };
    nextAppointment: any;
    latestVitals: any;
    activePrescriptions: any[];
    pharmacyOrders: any[];
    labOrders: any[];
    walletBalance: number;
    [key: string]: any;
}

export default function Dashboard() {
    const { 
        auth, 
        nextAppointment, 
        latestVitals, 
        activePrescriptions, 
        pharmacyOrders,
        labOrders,
        walletBalance 
    } = usePage<PageProps>().props;

    const [activeTab, setActiveTab] = useState<'overview' | 'pharmacy' | 'labs'>('overview');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    Welcome back! 👋 {auth.user.name}
                                </h1>
                                <p className="max-w-2xl text-sm text-green-50 sm:text-base">
                                    Your health companion is here. Get instant
                                    AI health guidance, connect with volunteer
                                    doctors, or schedule affordable telehealth
                                    consultations.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <Heart className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/patient/doctors">
                                <Button
                                    variant="outline"
                                    className="bg-white text-green-700 shadow-lg hover:bg-green-50"
                                >
                                    <Stethoscope className="mr-2 h-4 w-4" />
                                    My Doctors
                                </Button>
                            </Link>
                            <Link href="/patient/ai-doctor">
                                <Button className="bg-white text-green-700 shadow-lg hover:bg-green-50">
                                    <Bot className="mr-2 h-4 w-4" />
                                    Ask AI Doctor
                                </Button>
                            </Link>
                            <Link href="/patient/appointments">
                                <Button
                                    variant="outline"
                                    className="bg-white text-green-700 shadow-lg hover:bg-green-50"
                                >
                                    <Video className="mr-2 h-4 w-4" />
                                    Book Appointment
                                </Button>
                            </Link>
                            <Link href="/patient/emergency">
                                <Button
                                    variant="outline"
                                    className="bg-white text-green-700 shadow-lg hover:bg-green-50"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Emergency Hotline
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Dashboard Tabs */}
                <div className="flex items-center gap-1 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                            activeTab === 'overview' 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        Health Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('pharmacy')}
                        className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                            activeTab === 'pharmacy' 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        Pharmacy Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('labs')}
                        className={`px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                            activeTab === 'labs' 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        Medical Lab Requests
                    </button>
                </div>

                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-green-100 p-6 transition-shadow hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                        <Calendar className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Next Appointment
                                        </p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {nextAppointment ? nextAppointment.appointment_date : 'None Scheduled'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {nextAppointment ? nextAppointment.appointment_time : 'Book one now'}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-purple-100 p-6 transition-shadow hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <MessageSquare className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Unread Messages
                                        </p>
                                        <p className="text-xl font-bold text-gray-900">
                                            0
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            No new notifications
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-orange-100 p-6 transition-shadow hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                        <Pill className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Active Medications
                                        </p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {activePrescriptions.length}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Prescriptions
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-blue-100 p-6 transition-shadow hover:shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Lab Results
                                        </p>
                                        <p className="text-xl font-bold text-gray-900">
                                            0
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            None yet
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Health Vitals & Wallet Balance */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            <Card className="p-6 lg:col-span-2">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <HeartPulse className="h-5 w-5 text-red-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Today's Health Vitals
                                        </h2>
                                    </div>
                                    <Link href="/patient/vitals-tracking">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            Update Vitals
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Heart className="h-4 w-4 text-red-600" />
                                            <span className="text-xs font-medium text-gray-600">
                                                Blood Pressure
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {latestVitals ? latestVitals.blood_pressure : '--/--'}
                                        </p>
                                        <p className="text-xs font-medium text-green-600">
                                            Normal
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Droplet className="h-4 w-4 text-blue-600" />
                                            <span className="text-xs font-medium text-gray-600">
                                                Blood Sugar
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {latestVitals ? latestVitals.blood_sugar : '--'}
                                        </p>
                                        <p className="text-xs font-medium text-green-600">
                                            Normal
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Thermometer className="h-4 w-4 text-orange-600" />
                                            <span className="text-xs font-medium text-gray-600">
                                                Temperature
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {latestVitals ? `${latestVitals.temperature}°C` : '--'}
                                        </p>
                                        <p className="text-xs font-medium text-green-600">
                                            Normal
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                        <div className="mb-2 flex items-center gap-2">
                                            <Weight className="h-4 w-4 text-purple-600" />
                                            <span className="text-xs font-medium text-gray-600">
                                                Weight
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {latestVitals ? `${latestVitals.weight} kg` : '--'}
                                        </p>
                                        <p className="text-xs font-medium text-blue-600">
                                            Managed
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    All vitals are within healthy range
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Keep up the good work!
                                                </p>
                                            </div>
                                        </div>
                                        <Link href="/patient/vitals-tracking">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-green-600 text-green-700"
                                            >
                                                View History
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-amber-600" />
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Wallet Balance
                                    </h2>
                                </div>
                                <div className="mb-4">
                                    <p className="text-3xl font-bold text-gray-900">
                                        ₦{walletBalance || '0.00'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Available Credits
                                    </p>
                                </div>
                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                        <div className="flex items-center gap-2">
                                            <Gift className="h-4 w-4 text-green-600" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Free Consultations
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-green-600">
                                            2 left
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Discount Vouchers
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-blue-600">
                                            3 active
                                        </span>
                                    </div>
                                </div>
                                <Link href="/patient/wallet">
                                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                        Add Credits
                                    </Button>
                                </Link>
                            </Card>
                        </div>

                        {/* Recent Orders & Bookings */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-green-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Recent Pharmacy Orders
                                        </h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:text-green-700"
                                        onClick={() => setActiveTab('pharmacy')}
                                    >
                                        View All
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {pharmacyOrders?.slice(0, 3).map((order) => (
                                        <Link 
                                            key={order.id} 
                                            href={`/patient/pharmacy/orders/${order.uuid}`}
                                            className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50"
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-100 text-primary">
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-slate-900 truncate">
                                                    {order.pharmacy.business_name}
                                                </h3>
                                                <p className="text-xs font-medium text-slate-500">
                                                    ₦{Number(order.total_amount).toLocaleString()} • {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </Link>
                                    ))}
                                    {(!pharmacyOrders || pharmacyOrders.length === 0) && (
                                        <p className="text-center py-8 text-slate-500 italic text-sm">No recent pharmacy orders</p>
                                    )}
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FlaskConical className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Lab Test Bookings
                                        </h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:text-green-700"
                                        onClick={() => setActiveTab('labs')}
                                    >
                                        View All
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {labOrders?.slice(0, 3).map((order) => (
                                        <div key={order.id} className="flex items-center gap-4 rounded-xl border border-primary/10 bg-primary/5 p-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-primary/10 text-primary">
                                                <FlaskConical className="h-6 w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-slate-900 truncate">
                                                    {order.service.name}
                                                </h3>
                                                <p className="text-xs font-medium text-slate-500">
                                                    {order.medicallab.business_name} • {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-white border border-primary/20 text-primary`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    ))}
                                    {(!labOrders || labOrders.length === 0) && (
                                        <p className="text-center py-8 text-primary/50 italic text-sm">No recent lab bookings</p>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Appointments & Actions */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            <Card className="p-6 lg:col-span-2">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-green-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Upcoming Appointments
                                        </h2>
                                    </div>
                                    <Link href="/patient/appointments">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            View All
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {auth.user.patient?.appointments?.slice(0, 2).map((apt: any) => (
                                        <div key={apt.uuid} className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                                                <Video className="h-6 w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {apt.doctor?.user?.name || 'Doctor'}
                                                    </h3>
                                                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                                                        {apt.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {apt.reason || 'General Consultation'}
                                                </p>
                                                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {apt.appointment_date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {apt.appointment_time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!auth.user.patient?.appointments || auth.user.patient.appointments.length === 0) && (
                                        <p className="text-center py-8 text-gray-500 italic">No upcoming appointments schedule</p>
                                    )}
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="mb-6 text-lg font-bold text-gray-900">
                                    Quick Actions
                                </h2>
                                <div className="space-y-3">
                                    <Link href="/patient/ai-doctor">
                                        <button className="group flex w-full items-center gap-3 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-left transition-all hover:shadow-md">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                                                <Bot className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 group-hover:text-green-700">
                                                    AI Health Assistant
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Get instant answers
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
                                        </button>
                                    </Link>
                                    <Link href="/patient/doctors">
                                        <button className="group flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                                <Stethoscope className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                                                    Find a Doctor
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Browse specialists
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                        </button>
                                    </Link>
                                    <Link href="/patient/telemedicine">
                                        <button className="group flex w-full items-center gap-3 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-left transition-all hover:shadow-md">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
                                                <Video className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 group-hover:text-purple-700">
                                                    Telehealth Visit
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Affordable pricing
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                                        </button>
                                    </Link>
                                    <Link href="/patient/emergency">
                                        <button className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-4 text-left transition-all hover:shadow-md">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 group-hover:text-red-700">
                                                    Emergency Hotline
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    24/7 support
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
                                        </button>
                                    </Link>
                                </div>
                            </Card>
                        </div>

                        {/* Prescriptions & Results */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Active Prescriptions */}
                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Pill className="h-5 w-5 text-orange-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Active Prescriptions
                                        </h2>
                                    </div>
                                    <Link href="/patient/prescriptions">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            View All
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {activePrescriptions.map((pres: any) => (
                                        <div key={pres.uuid} className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {pres.notes.split(' - ')[0] || 'Prescription'}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {pres.notes.split(' - ')[1] || pres.notes}
                                                    </p>
                                                </div>
                                                <span className="rounded-full bg-orange-600 px-2 py-1 text-xs text-white">
                                                    {pres.status}
                                                </span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                                <span>Prescribed by {pres.doctor?.user?.name || 'Doctor'}</span>
                                            </div>
                                        </div>
                                    ))}

                                    {activePrescriptions.length === 0 && (
                                        <p className="text-center py-8 text-gray-500 italic">No active prescriptions</p>
                                    )}

                                    <Link href="/patient/prescriptions">
                                        <Button
                                            variant="outline"
                                            className="w-full text-orange-600 hover:bg-orange-50"
                                        >
                                            <Pill className="mr-2 h-4 w-4" />
                                            Request Prescription Refill
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Recent Lab Results */}
                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Recent Lab Results
                                        </h2>
                                    </div>
                                    <Link href="/patient/lab-results">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            View All
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Complete Blood Count
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    All parameters normal
                                                </p>
                                            </div>
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Dec 10, 2024
                                            </span>
                                            <span>•</span>
                                            <span>Central Lab</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="mt-3 h-auto p-0 text-green-600 hover:text-green-700"
                                        >
                                            View Detailed Report →
                                        </Button>
                                    </div>

                                    <Link href="/patient/lab-results">
                                        <Button
                                            variant="outline"
                                            className="w-full text-blue-600 hover:bg-blue-50"
                                        >
                                            <ClipboardList className="mr-2 h-4 w-4" />
                                            Book Lab Test
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </div>

                        {/* Health Records & Messages */}
                        <div className="grid gap-6 lg:grid-cols-2">
                             {/* Health Records */}
                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ClipboardList className="h-5 w-5 text-purple-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Health Records
                                        </h2>
                                    </div>
                                    <Link href="/patient/health-records">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            View All
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Medical History
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Complete health timeline
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Last updated: Dec 10, 2024
                                        </p>
                                    </div>
                                    <Link href="/patient/health-records">
                                        <Button
                                            variant="outline"
                                            className="w-full text-purple-600 hover:bg-purple-50"
                                        >
                                            <ClipboardList className="mr-2 h-4 w-4" />
                                            Manage Records
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Messages */}
                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Recent Messages
                                        </h2>
                                    </div>
                                    <Link href="/patient/messages">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            View All
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div className="cursor-pointer rounded-xl border border-green-100 bg-green-50 p-4 transition-all hover:shadow-md">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                                                    SJ
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        Dr. Sarah Johnson
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Your test results are ready...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>

                                    <Link href="/patient/messages">
                                        <Button
                                            variant="outline"
                                            className="w-full text-blue-600 hover:bg-blue-50"
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            View All Messages
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                        
                        {/* Pharmacies & Health Tips */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Nearby Pharmacies */}
                            <Card className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Store className="h-5 w-5 text-teal-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Nearby Pharmacies
                                        </h2>
                                    </div>
                                    <Link href="/patient/pharmacies">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            View All
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div className="cursor-pointer rounded-xl border border-teal-100 bg-teal-50 p-4 transition-all hover:shadow-md">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    HealthPlus Pharmacy
                                                </h3>
                                                <div className="mt-1 flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                    <span className="text-xs text-gray-600">
                                                        4.8 (156 reviews)
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700">
                                                0.3 km
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="text-xs">
                                                <Phone className="mr-1 h-3 w-3" />
                                                Call
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-xs">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                Directions
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Health Tips */}
                            <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-pink-600" />
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Daily Health Tips
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="rounded-lg border border-pink-100 bg-white p-4">
                                        <h3 className="mb-2 font-semibold text-gray-900">
                                            💧 Stay Hydrated
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            Drink at least 8 glasses of water daily to support your immune system and overall health.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        {/* Emergency & Settings */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Emergency Contacts */}
                            <Card className="border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-red-600" />
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Emergency Contacts
                                    </h2>
                                </div>
                                <Link href="/patient/emergency">
                                    <Button className="w-full bg-red-600 hover:bg-red-700 shadow-md">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Emergency Hotline
                                    </Button>
                                </Link>
                            </Card>

                            {/* Profile Summary */}
                            <Card className="p-6 transition-all hover:shadow-md">
                                <div className="mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Profile Summary
                                    </h2>
                                </div>
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Status</span>
                                        <span className="font-bold text-green-600">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">ID</span>
                                        <span className="font-bold text-slate-900">#{auth.user.patient?.id}</span>
                                    </div>
                                </div>
                                <Link href="/patient/profile">
                                    <Button variant="outline" className="w-full text-blue-600 hover:bg-blue-50 border-blue-100">
                                        <User className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </Link>
                            </Card>

                            {/* Settings & Preferences */}
                            <Card className="p-6 transition-all hover:shadow-md">
                                <div className="mb-4 flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-slate-600" />
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Registration Details
                                    </h2>
                                </div>
                                <div className="space-y-3 mb-4">
                                     <div className="text-sm">
                                        <p className="text-slate-500">Registered Email</p>
                                        <p className="font-bold text-slate-900">{auth.user.email}</p>
                                    </div>
                                </div>
                                <Link href="/patient/settings">
                                    <Button variant="outline" className="w-full text-slate-700 hover:bg-slate-50 border-slate-100">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Manage Settings
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    </div>
                )}

                {activeTab === 'pharmacy' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900">Pharmacy Medication Orders</h2>
                            <Link href="/patient/pharmacies">
                                <Button className="rounded-xl font-bold bg-green-600 hover:bg-green-700">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    New Order
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="grid gap-6">
                            {pharmacyOrders.length > 0 ? (
                                pharmacyOrders.map((order) => (
                                    <Card key={order.uuid} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row p-6 gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                                                        <Store className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900">{order.pharmacy.business_name}</h3>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                            Order #{order.id} • {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2 mb-4">
                                                    {order.items.map((item: any) => (
                                                        <div key={item.id} className="text-sm flex justify-between text-slate-600">
                                                            <span>{item.quantity}x {item.medicine.name}</span>
                                                            <span className="font-bold">₦{Number(item.subtotal).toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                                <div className="text-right mb-4 md:mb-0">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Amount</p>
                                                    <p className="text-xl font-black text-slate-900">₦{Number(order.total_amount).toLocaleString()}</p>
                                                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                        order.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : 
                                                        order.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                
                                                <Link href={`/patient/pharmacy/orders/${order.uuid}`}>
                                                    <Button variant="outline" className="w-full rounded-xl font-bold shadow-none">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className="p-12 text-center border-none shadow-sm">
                                    <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <h3 className="font-bold text-slate-900 mb-1">No medication orders yet</h3>
                                    <p className="text-sm text-slate-500 mb-6">Start shopping for your medicines at our verified pharmacies.</p>
                                    <Link href="/patient/pharmacies">
                                        <Button className="rounded-xl font-bold px-8">Browse Pharmacies</Button>
                                    </Link>
                                </Card>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'labs' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900">Medical Lab Requests</h2>
                            <Link href="/patient/medical-labs">
                                <Button className="rounded-xl font-bold">
                                    <FlaskConical className="mr-2 h-4 w-4" />
                                    Book New Test
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="grid gap-6">
                            {labOrders.length > 0 ? (
                                labOrders.map((order) => (
                                    <Card key={order.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                        <FlaskConical className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-900">{order.service?.name}</h3>
                                                        <p className="font-bold text-primary text-sm">{order.medicallab?.business_name}</p>
                                                        <div className="mt-1 flex items-center gap-3 text-xs font-bold text-slate-400">
                                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(order.created_at).toLocaleDateString()}</span>
                                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {(order.status)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Test Price</p>
                                                        <p className="text-xl font-black text-slate-900">₦{Number(order.price).toLocaleString()}</p>
                                                    </div>
                                                    <Link href="/patient/lab-results">
                                                        <Button variant="outline" className="rounded-xl font-bold shadow-none px-6">
                                                            View Report
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                            
                                            {order.status === 'completed' && (
                                                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-green-600">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-xs font-bold">Your result is ready for viewing</span>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className="p-12 text-center border-none shadow-sm">
                                    <FlaskConical className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                    <h3 className="font-bold text-slate-900 mb-1">No lab requests yet</h3>
                                    <p className="text-sm text-slate-500 mb-6">Book diagnostic tests from our partner medical laboratories.</p>
                                    <Link href="/patient/medical-labs">
                                        <Button className="rounded-xl font-bold px-8">Discover Labs</Button>
                                    </Link>
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}