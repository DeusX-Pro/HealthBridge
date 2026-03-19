import AppLayout from '@/layouts/doctor-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Video,
    Pill,
    FileText,
    ClipboardList,
    Clock,
    Monitor,
    MessageSquare,
    CalendarCheck,
    Wallet,
    User,
    Settings,
    TrendingUp,
    ArrowUpRight,
    Activity,
    CheckCircle2,
    AlertCircle,
    DollarSign,
    ChevronRight,
    Stethoscope,
    Phone,
    Star,
    Bell,
    BarChart3,
    Heart,
    Timer,
    UserCheck,
    Award,
    MapPin,
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
        };
    };
    upcomingAppointments: any[];
    todayAppointmentsCount: number;
    totalPatientsCount: number;
    walletBalance: number;
    [key: string]: any;
}

export default function Dashboard() {
    const { 
        auth, 
        upcomingAppointments = [], 
        todayAppointmentsCount = 0, 
        totalPatientsCount = 0, 
        walletBalance = 0,
        recentPatients = [],
        activePrescriptionsCount = 0,
        unreadMessages = 0
    } = usePage<PageProps>().props;

    // Stats based on real data
    const stats = {
        activePrescriptions: activePrescriptionsCount,
        unreadMessages: unreadMessages,
        labResultsPending: 0,
        availabilityStatus: 'Available',
        recentRecords: 0,
        telemedicineSessions: 0,
        monthlyEarnings: 0,
        earningsGrowth: 0,
        patientGrowth: 0,
        appointmentRate: 100,
        todayRevenue: 0,
        averageRating: 0,
        totalReviews: 0,
    };

    const pendingLabResults: any[] = [];
    const recentMessages: any[] = [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Doctor Dashboard" />

            <div className="flex flex-col gap-6">
                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    Welcome back, {auth.user.name}! 👋
                                </h1>
                                <p className="max-w-2xl text-sm text-blue-50 sm:text-base">
                                    You have {todayAppointmentsCount} appointments scheduled for today.
                                    Ready to make an impact?
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <Stethoscope className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/doctor/appointments">
                                <Button className="bg-white text-blue-700 shadow-lg hover:bg-blue-50">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Manage Appointments
                                </Button>
                            </Link>
                            <Link href="/doctor/patients">
                                <Button
                                    variant="outline"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    My Patients
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Upcoming
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                    {upcomingAppointments.length}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Next: {upcomingAppointments[0]?.appointment_time || 'None'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Patients</p>
                                <p className="text-xl font-bold text-gray-900">{totalPatientsCount}</p>
                                <div className="flex items-center gap-1 text-xs text-green-600">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>+{stats.patientGrowth}%</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <MessageSquare className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Unread Messages</p>
                                <p className="text-xl font-bold text-gray-900">{stats.unreadMessages}</p>
                                <p className="text-xs text-gray-500">3 urgent</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-emerald-100 p-6 transition-shadow hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                <Wallet className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Wallet Balance</p>
                                <p className="text-xl font-bold text-gray-900">${walletBalance.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Available</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Performance & Wallet */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Monthly Performance */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">Monthly Performance</h2>
                            </div>
                            <Activity className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Monthly Earnings</p>
                                <p className="text-3xl font-bold text-gray-900">₦{stats.monthlyEarnings.toLocaleString()}</p>
                                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>{stats.earningsGrowth}% from last month</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Appointment Rate</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.appointmentRate}%</p>
                                <div className="mt-3 bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${stats.appointmentRate}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Star className="h-4 w-4 text-orange-600" />
                                    <span className="text-xs font-medium text-gray-600">Rating</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">{stats.averageRating}</p>
                                <p className="text-xs text-gray-500">{stats.totalReviews} reviews</p>
                            </div>

                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <UserCheck className="h-4 w-4 text-green-600" />
                                    <span className="text-xs font-medium text-gray-600">Consultations</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">127</p>
                                <p className="text-xs text-gray-500">This month</p>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Timer className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-medium text-gray-600">Avg. Time</span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">28 min</p>
                                <p className="text-xs text-gray-500">Per patient</p>
                            </div>
                        </div>
                    </Card>

                    {/* Wallet Balance */}
                    <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-emerald-600" />
                            <h2 className="text-lg font-bold text-gray-900">Wallet Balance</h2>
                        </div>
                        <div className="mb-4">
                            <p className="text-3xl font-bold text-gray-900">${walletBalance.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Available for withdrawal</p>
                        </div>
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <span className="text-sm text-gray-700">Pending Payments</span>
                                <span className="text-sm font-bold text-orange-600">$34.50</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <span className="text-sm text-gray-700">Total Balance</span>
                                <span className="text-sm font-bold text-green-600">${walletBalance.toLocaleString()}</span>
                            </div>
                        </div>
                        <Link href="/doctor/wallet">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Withdraw Funds
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Appointments & Patients */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Upcoming Appointments */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Upcoming Appointments
                                </h2>
                            </div>
                            <Link href="/doctor/appointments">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    View Schedule
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {upcomingAppointments.slice(0, 3).map((apt: any) => (
                                <div key={apt.uuid} className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {apt.patient?.user?.name || 'Patient'}
                                            </h3>
                                            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                                                {apt.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {apt.appointment_date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {apt.appointment_time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                Video Call
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            Details
                                        </Button>
                                        <Link href="/doctor/consultation">
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Start
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {upcomingAppointments.length === 0 && (
                                <p className="text-center py-8 text-gray-500 italic">No upcoming appointments</p>
                            )}
                        </div>
                    </Card>

                    {/* Recent Patients */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                <h2 className="text-lg font-bold text-gray-900">Recent Patients</h2>
                            </div>
                            <Link href="/doctor/patients">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentPatients.map((patient: any) => (
                                <div key={patient.id} className="cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white font-bold text-sm">
                                            {patient.avatar}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                                            <p className="text-xs text-gray-600">{patient.condition}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                patient.status === 'stable' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                                {patient.status}
                                            </span>
                                            <p className="mt-1 text-xs text-gray-500">{patient.lastVisit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {recentPatients.length === 0 && (
                                <p className="text-center py-8 text-gray-500 italic text-sm">No recent patients found.</p>
                            )}

                            <Link href="/doctor/patients">
                                <Button variant="outline" className="w-full text-green-600 hover:bg-green-50">
                                    <Users className="mr-2 h-4 w-4" />
                                    View All Patients
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Clinical Data */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Pending Lab Results */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-yellow-600" />
                                <h2 className="text-lg font-bold text-gray-900">Pending Lab Results</h2>
                            </div>
                            <Link href="/doctor/lab-result">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {pendingLabResults.map((lab) => (
                                <div key={lab.id} className={`rounded-xl border p-4 ${
                                    lab.priority === 'urgent' ? 'border-red-100 bg-red-50' : 'border-yellow-100 bg-yellow-50'
                                }`}>
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{lab.testType}</h3>
                                            <p className="text-sm text-gray-600">{lab.patientName}</p>
                                        </div>
                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            lab.priority === 'urgent' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                                        }`}>
                                            {lab.priority}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Ordered: {lab.orderedDate}</span>
                                        <Button size="sm" variant="ghost" className="h-auto p-0 text-blue-600 hover:text-blue-700">
                                            Review Results →
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="rounded-xl border-2 border-dashed border-gray-200 p-4 text-center">
                                <p className="text-sm text-gray-600">{stats.labResultsPending} total pending reviews</p>
                            </div>
                        </div>
                    </Card>

                    {/* Active Prescriptions */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Pill className="h-5 w-5 text-orange-600" />
                                <h2 className="text-lg font-bold text-gray-900">Active Prescriptions</h2>
                            </div>
                            <Link href="/doctor/prescriptions">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mb-4 text-center rounded-xl border border-orange-100 bg-orange-50 p-6">
                            <div className="mb-2 flex items-center justify-center">
                                <Pill className="h-8 w-8 text-orange-600" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stats.activePrescriptions}</p>
                            <p className="text-sm text-gray-600">Active prescriptions this month</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-sm text-gray-700">Issued Today</span>
                                <span className="text-sm font-bold text-blue-600">5</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-sm text-gray-700">Pending Approval</span>
                                <span className="text-sm font-bold text-orange-600">2</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                <span className="text-sm text-gray-700">Refill Requests</span>
                                <span className="text-sm font-bold text-purple-600">3</span>
                            </div>
                        </div>

                        <Link href="/doctor/prescriptions">
                            <Button variant="outline" className="w-full mt-4 text-orange-600 hover:bg-orange-50">
                                <Pill className="mr-2 h-4 w-4" />
                                Manage Prescriptions
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Messages & Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Messages */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-purple-600" />
                                <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
                            </div>
                            <Link href="/doctor/messages">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recentMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md ${
                                        message.unread ? 'border-purple-100 bg-purple-50' : 'border-gray-100 bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-sm">
                                            {message.avatar}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900">{message.from}</h3>
                                                {message.unread && (
                                                    <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs text-white">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-1">{message.message}</p>
                                            <p className="mt-1 text-xs text-gray-500">{message.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Link href="/doctor/messages">
                                <Button variant="outline" className="w-full text-purple-600 hover:bg-purple-50">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    View All Messages ({stats.unreadMessages} unread)
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="mb-6 text-lg font-bold text-gray-900">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/doctor/telemedicine">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                                        <Monitor className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-green-700">
                                            Telemedicine
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            0 active sessions
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
                                </button>
                            </Link>

                            <Link href="/doctor/medical-records">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-blue-700">
                                            Medical Records
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            0 recent updates
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                </button>
                            </Link>

                            <Link href="/doctor/availability">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
                                        <CalendarCheck className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-purple-700">
                                            Availability
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Status: {stats.availabilityStatus}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                                </button>
                            </Link>

                            <Link href="/doctor/consultations">
                                <button className="group flex w-full items-center gap-3 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-4 text-left transition-all hover:shadow-md">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white">
                                        <Video className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 group-hover:text-orange-700">
                                            Consultations
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            0 pending
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                                </button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Profile & Settings */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Professional Profile */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">Professional Profile</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <span className="text-sm text-gray-600">Profile Views</span>
                                <span className="text-sm font-bold text-blue-600">1,234</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm text-gray-600">Rating</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{stats.averageRating}/5.0</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <span className="text-sm text-gray-600">Specialization</span>
                                <span className="text-sm font-bold text-gray-900">General Practice</span>
                            </div>
                            <Link href="/doctor/profile">
                                <Button variant="outline" className="w-full text-blue-600 hover:bg-blue-50">
                                    <User className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    {/* Availability Status */}
                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <CalendarCheck className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">Availability Status</h2>
                        </div>
                        <div className="mb-4 text-center">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-white">
                                <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                <span className="font-semibold">{stats.availabilityStatus}</span>
                            </div>
                            <p className="text-sm text-gray-600">You are currently accepting patients</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <span className="text-sm text-gray-700">Next Available Slot</span>
                                <span className="text-sm font-bold text-green-600">Today 3:00 PM</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                                <span className="text-sm text-gray-700">Working Hours</span>
                                <span className="text-sm font-bold text-gray-900">9 AM - 5 PM</span>
                            </div>
                        </div>
                        <Link href="/doctor/availability">
                            <Button variant="outline" className="w-full mt-4 border-green-600 text-green-700 hover:bg-green-100">
                                Manage Availability
                            </Button>
                        </Link>
                    </Card>

                    {/* Settings & Notifications */}
                    <Card className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-bold text-gray-900">Quick Settings</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm text-gray-700">Notifications</span>
                                </div>
                                <span className="text-xs font-medium text-green-600">Enabled</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4 text-purple-600" />
                                    <span className="text-sm text-gray-700">Video Calls</span>
                                </div>
                                <span className="text-xs font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-orange-600" />
                                    <span className="text-sm text-gray-700">Auto-Accept</span>
                                </div>
                                <span className="text-xs font-medium text-gray-600">Disabled</span>
                            </div>
                            <Link href="/doctor/settings">
                                <Button variant="outline" className="w-full text-gray-700 hover:bg-gray-50">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Manage Settings
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}