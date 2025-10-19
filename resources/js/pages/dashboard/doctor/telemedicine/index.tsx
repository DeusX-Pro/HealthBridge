import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Video,
    Mic,
    MicOff,
    PhoneOff,
    MessageSquare,
    Settings,
    Clock,
    Calendar,
    User,
    FileText,
    Maximize2,
    Camera,
    CameraOff,
    CheckCircle2,
    Activity,
    Pill,
    Download,
    Share2,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor/dashboard',
    },
    {
        title: 'Telemedicine',
        href: '/doctor/telemedicine',
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

export default function Telemedicine() {
    const { auth } = usePage<PageProps>().props;

    const activeSessions = [
        {
            id: 1,
            patientName: 'Sarah Williams',
            patientAvatar: 'SW',
            patientAge: 34,
            patientCondition: 'Hypertension',
            duration: '12:34',
            reason: 'Follow-up consultation',
        },
    ];

    const upcomingSessions = [
        {
            id: 2,
            patientName: 'Michael Chen',
            patientAvatar: 'MC',
            patientAge: 45,
            patientCondition: 'Diabetes Type 2',
            scheduledTime: '11:30 AM',
            duration: '30 min',
            reason: 'Medication review',
        },
        {
            id: 3,
            patientName: 'Emily Davis',
            patientAvatar: 'ED',
            patientAge: 28,
            patientCondition: 'Asthma',
            scheduledTime: '2:00 PM',
            duration: '20 min',
            reason: 'Lab results discussion',
        },
        {
            id: 4,
            patientName: 'Robert Taylor',
            patientAvatar: 'RT',
            patientAge: 52,
            patientCondition: 'High Cholesterol',
            scheduledTime: '3:30 PM',
            duration: '15 min',
            reason: 'Quick check-in',
        },
    ];

    const stats = {
        todaySessions: 8,
        activeCalls: 1,
        completedToday: 5,
        avgDuration: '28 min',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Telemedicine" />

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Telemedicine</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Conduct virtual consultations with your patients
                        </p>
                    </div>
                    <Link href="/doctor/schedule">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                        </Button>
                    </Link>
                </div>

                                <Card className="overflow-hidden p-0">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                        <h3 className="mb-2 text-2xl font-bold">Ready to Start a Consultation?</h3>
                        <p className="mb-6 text-indigo-100">
                            Connect with your patients through secure, high-quality video calls
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                                <Video className="mr-2 h-4 w-4" />
                                Start Instant Call
                            </Button>
                            <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50">
                                <Settings className="mr-2 h-4 w-4" />
                                Test Equipment
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Video className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Today's Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.todaySessions}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <Activity className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active Calls</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeCalls}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-purple-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <CheckCircle2 className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Duration</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.avgDuration}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {activeSessions.length > 0 && (
                    <div>
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Active Session</h2>
                        {activeSessions.map((session) => (
                            <Card key={session.id} className="overflow-hidden border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-0">
                                <div className="h-2 bg-green-500"></div>
                                <div className="p-6">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-xl font-bold text-white shadow-lg">
                                                {session.patientAvatar}
                                            </div>
                                            <div>
                                                <div className="mb-2 flex items-center gap-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{session.patientName}</h3>
                                                    <span className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                                                        <Activity className="h-3 w-3" />
                                                        IN PROGRESS
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{session.patientAge} years • {session.patientCondition}</p>
                                                <p className="mt-1 text-sm font-medium text-gray-700">{session.reason}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-600">Duration</p>
                                                <p className="text-2xl font-bold text-green-600">{session.duration}</p>
                                            </div>
                                            <Link href={`/doctor/telemedicine/call/${session.id}`}>
                                                <Button className="bg-green-600 hover:bg-green-700" size="lg">
                                                    <Video className="mr-2 h-5 w-5" />
                                                    Join Call
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <div>
                    <h2 className="mb-4 text-xl font-bold text-gray-900">Upcoming Sessions</h2>
                    <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                            <Card key={session.id} className="p-6 transition-shadow hover:shadow-lg">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg">
                                            {session.patientAvatar}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{session.patientName}</h3>
                                            <p className="text-sm text-gray-600">{session.patientAge} years • {session.patientCondition}</p>
                                            <p className="mt-1 text-sm font-medium text-gray-700">{session.reason}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600">Scheduled</p>
                                            <p className="text-lg font-bold text-gray-900">{session.scheduledTime}</p>
                                            <p className="text-xs text-gray-500">{session.duration}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                Reschedule
                                            </Button>
                                            <Link href={`/doctor/telemedicine/call/${session.id}`}>
                                                <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                                                    <Video className="mr-2 h-4 w-4" />
                                                    Start Early
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <Mic className="h-5 w-5 text-blue-600" />
                            Audio & Video
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                                <span>Microphone</span>
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Ready
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Camera</span>
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Ready
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Connection</span>
                                <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Stable
                                </span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <Activity className="h-5 w-5 text-purple-600" />
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <Pill className="mr-2 h-4 w-4" />
                                E-Prescribe
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" />
                                Add Note
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <Download className="mr-2 h-4 w-4" />
                                Order Lab
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                                <Share2 className="mr-2 h-4 w-4" />
                                Refer
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <MessageSquare className="h-5 w-5 text-green-600" />
                            Support
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>Need technical assistance?</p>
                            <Button variant="outline" size="sm" className="w-full">
                                Contact IT Support
                            </Button>
                            <Link href="/doctor/help">
                                <Button variant="outline" size="sm" className="w-full">
                                    View User Guide
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}