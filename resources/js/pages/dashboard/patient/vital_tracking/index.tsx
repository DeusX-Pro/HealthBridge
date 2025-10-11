import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Activity,
    Heart,
    Droplet,
    Thermometer,
    Weight,
    Wind,
    TrendingUp,
    TrendingDown,
    Plus,
    Calendar,
    Download,
    Share2,
    CheckCircle2,
    AlertCircle,
    BarChart3,
    Clock,
    ChevronRight,
    Edit,
    Zap,
    MoreVertical,
    Target,
    ArrowRight,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Vitals Tracking',
        href: '/patient/vitals-tracking',
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

interface BloodPressure {
    systolic: number;
    diastolic: number;
}

interface VitalHistory {
    date: string;
    value?: number;
    systolic?: number;
    diastolic?: number;
}

interface Vital {
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    color: string;
    bg: string;
    gradient: string;
    current: number | BloodPressure;
    unit: string;
    status: 'normal' | 'warning' | 'critical';
    trend: 'up' | 'down' | 'stable';
    lastRecorded: string;
    history: VitalHistory[];
    normalRange: string;
}

export default function VitalsTracking() {
    const { auth } = usePage<PageProps>().props;
    const [selectedVital, setSelectedVital] = useState<string | null>(null);

    const vitals: Vital[] = [
        {
            id: 'blood-pressure',
            name: 'Blood Pressure',
            icon: Heart,
            color: 'text-red-600',
            bg: 'bg-red-50',
            gradient: 'from-red-500 to-rose-500',
            current: { systolic: 120, diastolic: 80 },
            unit: 'mmHg',
            status: 'normal',
            trend: 'stable',
            lastRecorded: '2024-12-10 08:30 AM',
            history: [
                { date: '2024-12-10', systolic: 120, diastolic: 80 },
                { date: '2024-12-09', systolic: 118, diastolic: 79 },
                { date: '2024-12-08', systolic: 122, diastolic: 81 },
                { date: '2024-12-07', systolic: 119, diastolic: 80 },
                { date: '2024-12-06', systolic: 121, diastolic: 82 },
            ],
            normalRange: '90-120 / 60-80',
        },
        {
            id: 'heart-rate',
            name: 'Heart Rate',
            icon: Activity,
            color: 'text-pink-600',
            bg: 'bg-pink-50',
            gradient: 'from-pink-500 to-rose-500',
            current: 72,
            unit: 'bpm',
            status: 'normal',
            trend: 'down',
            lastRecorded: '2024-12-10 08:30 AM',
            history: [
                { date: '2024-12-10', value: 72 },
                { date: '2024-12-09', value: 74 },
                { date: '2024-12-08', value: 76 },
                { date: '2024-12-07', value: 73 },
                { date: '2024-12-06', value: 75 },
            ],
            normalRange: '60-100',
        },
        {
            id: 'blood-sugar',
            name: 'Blood Sugar',
            icon: Droplet,
            color: 'text-green-600',
            bg: 'bg-green-50',
            gradient: 'from-green-500 to-indigo-500',
            current: 95,
            unit: 'mg/dL',
            status: 'normal',
            trend: 'stable',
            lastRecorded: '2024-12-10 08:30 AM',
            history: [
                { date: '2024-12-10', value: 95 },
                { date: '2024-12-09', value: 93 },
                { date: '2024-12-08', value: 97 },
                { date: '2024-12-07', value: 94 },
                { date: '2024-12-06', value: 96 },
            ],
            normalRange: '70-100',
        },
        {
            id: 'temperature',
            name: 'Body Temperature',
            icon: Thermometer,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            gradient: 'from-orange-500 to-amber-500',
            current: 98.6,
            unit: '°F',
            status: 'normal',
            trend: 'stable',
            lastRecorded: '2024-12-10 08:30 AM',
            history: [
                { date: '2024-12-10', value: 98.6 },
                { date: '2024-12-09', value: 98.4 },
                { date: '2024-12-08', value: 98.7 },
                { date: '2024-12-07', value: 98.5 },
                { date: '2024-12-06', value: 98.6 },
            ],
            normalRange: '97.8-99.1',
        },
        {
            id: 'weight',
            name: 'Weight',
            icon: Weight,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            gradient: 'from-purple-500 to-pink-500',
            current: 72.5,
            unit: 'kg',
            status: 'normal',
            trend: 'down',
            lastRecorded: '2024-12-10 08:00 AM',
            history: [
                { date: '2024-12-10', value: 72.5 },
                { date: '2024-12-09', value: 72.8 },
                { date: '2024-12-08', value: 73.0 },
                { date: '2024-12-07', value: 73.2 },
                { date: '2024-12-06', value: 73.5 },
            ],
            normalRange: '60-80',
        },
        {
            id: 'oxygen',
            name: 'Oxygen Saturation',
            icon: Wind,
            color: 'text-green-600',
            bg: 'bg-green-50',
            gradient: 'from-green-500 to-green-500',
            current: 98,
            unit: '%',
            status: 'normal',
            trend: 'stable',
            lastRecorded: '2024-12-10 08:30 AM',
            history: [
                { date: '2024-12-10', value: 98 },
                { date: '2024-12-09', value: 97 },
                { date: '2024-12-08', value: 98 },
                { date: '2024-12-07', value: 97 },
                { date: '2024-12-06', value: 98 },
            ],
            normalRange: '95-100',
        },
    ];

    const getStatusBadge = (status: string) => {
        if (status === 'normal') {
            return { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle2 className="h-3 w-3" /> };
        }
        if (status === 'warning') {
            return { bg: 'bg-amber-100', text: 'text-amber-700', icon: <AlertCircle className="h-3 w-3" /> };
        }
        return { bg: 'bg-red-100', text: 'text-red-700', icon: <AlertCircle className="h-3 w-3" /> };
    };

    const getTrendIcon = (trend: string) => {
        if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (trend === 'down') return <TrendingDown className="h-4 w-4 text-green-600" />;
        return <div className="h-1 w-4 rounded bg-gray-400" />;
    };

    const isBloodPressure = (vital: Vital): vital is Vital & { current: BloodPressure } => {
        return vital.id === 'blood-pressure';
    };

    const getCurrentValue = (vital: Vital): string => {
        if (isBloodPressure(vital)) {
            return `${vital.current.systolic}/${vital.current.diastolic}`;
        }
        return vital.current.toString();
    };

    const getHistoryValue = (vital: Vital, record: VitalHistory): number => {
        if (vital.id === 'blood-pressure') {
            return record.systolic || 0;
        }
        return record.value || 0;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vitals Tracking" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Activity className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Vitals Tracking
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Monitor your health metrics and track your progress
                                    </p>
                                </div>
                            </div>
                            <div className="hidden items-center gap-3 sm:flex">
                                <Button className="bg-white text-green-600 shadow-lg hover:bg-green-50">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Record Vitals
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 border-2 border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Vitals</p>
                                <p className="text-2xl font-bold text-gray-900">6</p>
                            </div>
                            <Target className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 className="h-3 w-3" />
                            All within range
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border-2 border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Last Update</p>
                                <p className="text-lg font-bold text-gray-900">Today</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="mt-2 text-xs text-blue-600">
                            8:30 AM
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 border-2 border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">This Week</p>
                                <p className="text-2xl font-bold text-gray-900">18</p>
                            </div>
                            <Activity className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                            <TrendingUp className="h-3 w-3" />
                            +5 from last week
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 border-2 border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Consistency</p>
                                <p className="text-2xl font-bold text-gray-900">94%</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-orange-600" />
                        </div>
                        <div className="mt-2 text-xs text-orange-600">
                            Excellent tracking
                        </div>
                    </Card>
                </div>

                {/* Vitals Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {vitals.map((vital) => {
                        const Icon = vital.icon;
                        const statusInfo = getStatusBadge(vital.status);
                        const currentValue = getCurrentValue(vital);
                        
                        return (
                            <Card
                                key={vital.id}
                                className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                {/* Card Header */}
                                <div className={`relative bg-gradient-to-r ${vital.gradient} p-6 text-white overflow-hidden`}>
                                    <div className="absolute right-4 top-4 opacity-20">
                                        <Icon className="h-16 w-16" />
                                    </div>
                                    <div className="relative">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-6 w-6" />
                                                <span className="text-sm font-medium opacity-90">{vital.name}</span>
                                            </div>
                                            {getTrendIcon(vital.trend)}
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold">
                                                {currentValue}
                                            </span>
                                            <span className="text-lg opacity-90">{vital.unit}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-600">
                                            Status
                                        </span>
                                        <div className={`flex items-center gap-1 rounded-full ${statusInfo.bg} px-3 py-1 text-xs font-semibold ${statusInfo.text}`}>
                                            {statusInfo.icon}
                                            {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="mb-2 flex justify-between text-xs">
                                            <span className="font-medium text-gray-600">Normal Range</span>
                                            <span className="font-semibold text-gray-900">{vital.normalRange} {vital.unit}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200">
                                            <div 
                                                className={`h-full rounded-full bg-gradient-to-r ${vital.gradient}`}
                                                style={{ width: '85%' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                        <p className="mb-2 text-xs font-medium text-gray-600">
                                            Last 5 Readings
                                        </p>
                                        <div className="flex items-end gap-1 h-12">
                                            {vital.history.slice(0, 5).map((record, idx) => {
                                                const value = getHistoryValue(vital, record);
                                                const maxValue = Math.max(...vital.history.map(h => getHistoryValue(vital, h)));
                                                const minValue = Math.min(...vital.history.map(h => getHistoryValue(vital, h)));
                                                const range = maxValue - minValue;
                                                const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
                                                
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="flex-1 flex flex-col items-center"
                                                    >
                                                        <div
                                                            className={`w-full rounded-t bg-gradient-to-t ${vital.gradient} transition-all duration-300 hover:opacity-80`}
                                                            style={{ height: `${Math.max(height, 20)}%` }}
                                                            title={`${record.date}: ${value}${vital.unit}`}
                                                        />
                                                        <span className="mt-1 text-[10px] text-gray-500">
                                                            {new Date(record.date).getDate()}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mb-4 text-xs text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3" />
                                            Last recorded: {new Date(vital.lastRecorded).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Update
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-gray-300">
                                            <BarChart3 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Action Cards & Health Insights */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                            <Zap className="h-5 w-5 text-yellow-600" />
                            Quick Actions
                        </h2>
                        <div className="grid gap-4">
                            <Card className="p-6 transition-all hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                            <Calendar className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Schedule Reminder</h3>
                                            <p className="text-sm text-gray-600">Set daily tracking reminders</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        Set
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-6 transition-all hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                            <Download className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Export Report</h3>
                                            <p className="text-sm text-gray-600">Download your vitals history</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        Export
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-6 transition-all hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                            <Share2 className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Share with Doctor</h3>
                                            <p className="text-sm text-gray-600">Send vitals to healthcare provider</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        Share
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Health Insights */}
                    <Card className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                                <Target className="h-5 w-5 text-green-600" />
                                Health Insights
                            </h2>
                            <Link href="/patient/health-tips">
                                <Button variant="ghost" size="sm">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 border-2 border-green-200">
                                <div className="mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <h4 className="font-semibold text-gray-900">Great Progress!</h4>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Your blood pressure has been consistently normal for the past 30 days. Keep up the good work!
                                </p>
                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border-2 border-blue-200">
                                <div className="mb-2 flex items-center gap-2">
                                    <TrendingDown className="h-5 w-5 text-green-600" />
                                    <h4 className="font-semibold text-gray-900">Weight Trend</h4>
                                </div>
                                <p className="text-sm text-gray-700">
                                    You've lost 1kg this week. Maintain a balanced diet and regular exercise to continue this healthy trend.
                                </p>
                            </div>

                            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border-2 border-purple-200">
                                <div className="mb-2 flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-purple-600" />
                                    <h4 className="font-semibold text-gray-900">Heart Health</h4>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Your resting heart rate is in the optimal range. This indicates good cardiovascular fitness.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}