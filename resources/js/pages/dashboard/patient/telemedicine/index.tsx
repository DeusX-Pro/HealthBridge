import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Video,
    Phone,
    MessageSquare,
    Mic,
    MicOff,
    VideoOff,
    Monitor,
    Users,
    Clock,
    Calendar,
    FileText,
    Settings,
    Maximize2,
    Volume2,
    VolumeX,
    ScreenShare,
    CheckCircle2,
    AlertCircle,
    User,
    Minimize2,
    Camera,
    Upload,
    Send,
    Paperclip,
    X,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Telemedicine',
        href: '/patient/telemedicine',
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
    const [inCall, setInCall] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const upcomingAppointment = {
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        date: '2024-12-15',
        time: '2:00 PM',
        duration: 30,
        avatar: 'SJ',
        appointmentType: 'Follow-up Consultation',
        reason: 'Heart health checkup',
    };

    const chatMessages = [
        {
            id: 1,
            sender: 'doctor',
            name: 'Dr. Sarah Johnson',
            message: 'Hello! How are you feeling today?',
            time: '2:05 PM',
        },
        {
            id: 2,
            sender: 'patient',
            name: 'You',
            message: 'Much better, thank you!',
            time: '2:06 PM',
        },
    ];

    const handleStartCall = () => {
        setInCall(true);
    };

    const handleEndCall = () => {
        setInCall(false);
        setVideoEnabled(true);
        setAudioEnabled(true);
        setScreenSharing(false);
        setChatOpen(false);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            // Add message logic here
            setMessage('');
        }
    };

    if (!inCall) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Telemedicine" />

                <div className="flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-6 text-white shadow-xl sm:p-8">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Video className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Telemedicine Consultation
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Connect with your healthcare provider remotely
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    </div>

                    {/* Upcoming Appointment */}
                    <Card className="overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                            <h2 className="mb-2 text-xl font-bold">Next Appointment</h2>
                            <p className="text-sm text-green-100">Your video consultation is scheduled</p>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-6 flex items-start gap-4">
                                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-2xl font-bold text-white shadow-lg">
                                    {upcomingAppointment.avatar}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {upcomingAppointment.doctor}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {upcomingAppointment.specialty}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        <span className="flex items-center gap-1 text-sm text-gray-600">
                                            <Calendar className="h-4 w-4 text-blue-600" />
                                            {new Date(upcomingAppointment.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1 text-sm text-gray-600">
                                            <Clock className="h-4 w-4 text-purple-600" />
                                            {upcomingAppointment.time} ({upcomingAppointment.duration} min)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 rounded-xl bg-blue-50 p-4">
                                <p className="mb-1 text-sm font-semibold text-blue-900">
                                    Appointment Details:
                                </p>
                                <p className="text-sm text-blue-800">
                                    Type: {upcomingAppointment.appointmentType}
                                </p>
                                <p className="text-sm text-blue-800">
                                    Reason: {upcomingAppointment.reason}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleStartCall}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                    size="lg"
                                >
                                    <Video className="mr-2 h-5 w-5" />
                                    Join Video Call
                                </Button>
                                <Button variant="outline" size="lg">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Reschedule
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Pre-Call Checklist */}
                    <div className="grid gap-4 lg:grid-cols-3">
                        <Card className="p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Connection Ready</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Your internet connection is stable and ready for video calls.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <Camera className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Camera Enabled</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Your camera is working properly. You can test it before the call.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <Mic className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900">Audio Working</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                Your microphone is connected and audio is clear.
                            </p>
                        </Card>
                    </div>

                    {/* Instructions */}
                    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <AlertCircle className="h-6 w-6 text-blue-600" />
                            <h3 className="text-lg font-bold text-gray-900">
                                Before Your Appointment
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-0.5 text-blue-600">•</span>
                                Find a quiet, well-lit space for your consultation
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-0.5 text-blue-600">•</span>
                                Have your insurance information and ID ready
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-0.5 text-blue-600">•</span>
                                Prepare a list of symptoms and questions
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-0.5 text-blue-600">•</span>
                                Test your camera and microphone before joining
                            </li>
                        </ul>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    // In-Call Interface
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Video Consultation" />

            <div className={`flex flex-col gap-4 ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-8rem)]'}`}>
                {/* Video Grid */}
                <div className="grid flex-1 gap-4 lg:grid-cols-3">
                    {/* Main Video */}
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900 lg:col-span-2">
                        {/* Doctor Video Placeholder */}
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-4xl font-bold text-white shadow-2xl">
                                    {upcomingAppointment.avatar}
                                </div>
                                <p className="text-xl font-bold text-white">{upcomingAppointment.doctor}</p>
                                <p className="text-sm text-gray-400">{upcomingAppointment.specialty}</p>
                            </div>
                        </div>

                        {/* Self Video (Picture-in-Picture) */}
                        <div className="absolute bottom-4 right-4 h-32 w-48 overflow-hidden rounded-xl border-2 border-white bg-gray-800 shadow-xl">
                            <div className="flex h-full items-center justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {/* Top Bar */}
                        <div className="absolute left-0 right-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-3 w-3 animate-pulse rounded-full bg-red-600"></div>
                                    <span className="text-sm font-semibold text-white">Recording</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
                                    <Clock className="h-4 w-4 text-white" />
                                    <span className="text-sm font-semibold text-white">15:30</span>
                                </div>
                            </div>
                        </div>

                        {/* Connection Status */}
                        <div className="absolute left-4 top-16">
                            <div className="flex items-center gap-2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                                <CheckCircle2 className="h-3 w-3" />
                                Excellent Connection
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-4">
                        {/* Chat Panel */}
                        <Card className="flex flex-1 flex-col">
                            <div className="border-b border-gray-200 p-4">
                                <h3 className="flex items-center gap-2 font-bold text-gray-900">
                                    <MessageSquare className="h-5 w-5 text-green-600" />
                                    Chat
                                </h3>
                            </div>
                            
                            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                                {chatMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs rounded-2xl px-4 py-2 ${
                                                msg.sender === 'patient'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-100 text-gray-900'
                                            }`}
                                        >
                                            <p className="text-xs font-semibold opacity-75">{msg.name}</p>
                                            <p className="text-sm">{msg.message}</p>
                                            <p className="mt-1 text-xs opacity-75">{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 p-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    />
                                    <Button size="sm" onClick={handleSendMessage}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Appointment Info */}
                        <Card className="p-4">
                            <h3 className="mb-3 text-sm font-bold text-gray-900">Session Details</h3>
                            <div className="space-y-2 text-xs text-gray-600">
                                <div className="flex justify-between">
                                    <span>Duration:</span>
                                    <span className="font-semibold text-gray-900">15:30 / 30:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span className="font-semibold text-gray-900">Video Consultation</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="font-semibold text-green-600">Active</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Control Bar */}
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant={audioEnabled ? 'default' : 'destructive'}
                                size="lg"
                                onClick={() => setAudioEnabled(!audioEnabled)}
                                className="rounded-full"
                            >
                                {audioEnabled ? (
                                    <Mic className="h-5 w-5" />
                                ) : (
                                    <MicOff className="h-5 w-5" />
                                )}
                            </Button>
                            
                            <Button
                                variant={videoEnabled ? 'default' : 'destructive'}
                                size="lg"
                                onClick={() => setVideoEnabled(!videoEnabled)}
                                className="rounded-full"
                            >
                                {videoEnabled ? (
                                    <Video className="h-5 w-5" />
                                ) : (
                                    <VideoOff className="h-5 w-5" />
                                )}
                            </Button>

                            <Button
                                variant={screenSharing ? 'default' : 'outline'}
                                size="lg"
                                onClick={() => setScreenSharing(!screenSharing)}
                                className="rounded-full"
                            >
                                <ScreenShare className="h-5 w-5" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="rounded-full"
                            >
                                {isFullscreen ? (
                                    <Minimize2 className="h-5 w-5" />
                                ) : (
                                    <Maximize2 className="h-5 w-5" />
                                )}
                            </Button>
                        </div>

                        <Button
                            variant="destructive"
                            size="lg"
                            onClick={handleEndCall}
                            className="rounded-full bg-red-600 hover:bg-red-700"
                        >
                            <Phone className="mr-2 h-5 w-5 rotate-135" />
                            End Call
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="lg" className="rounded-full">
                                <Settings className="h-5 w-5" />
                            </Button>
                            
                            <Button variant="outline" size="lg" className="rounded-full">
                                <Users className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}