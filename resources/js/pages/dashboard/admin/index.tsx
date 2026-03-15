import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import {
    Users,
    UserCheck,
    Stethoscope,
    Pill,
    FlaskConical,
    Activity,
    TrendingUp,
    BarChart3,
    ShieldCheck,
    ArrowUpRight,
    Search,
    Bell,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
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
    stats: {
        totalUsers: number;
        totalDoctors: number;
        totalPatients: number;
        totalPharmacies: number;
        totalLabs: number;
    };
    [key: string]: any;
}

export default function Dashboard() {
    const { auth, stats } = usePage<PageProps>().props;

    const quickStats = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            color: 'blue',
            trend: '+12%',
        },
        {
            title: 'Verified Doctors',
            value: stats.totalDoctors,
            icon: Stethoscope,
            color: 'indigo',
            trend: '+5%',
        },
        {
            title: 'Total Patients',
            value: stats.totalPatients,
            icon: UserCheck,
            color: 'green',
            trend: '+18%',
        },
        {
            title: 'Pharmacies',
            value: stats.totalPharmacies,
            icon: Pill,
            color: 'orange',
            trend: '+2',
        },
        {
            title: 'Medical Labs',
            value: stats.totalLabs,
            icon: FlaskConical,
            color: 'purple',
            trend: '+1',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-8 p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            System Overview
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Welcome back, Admin. Here's what's happening across the platform today.
                        </p>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {quickStats.map((stat, index) => (
                        <Card key={index} className="relative overflow-hidden border-none bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900">
                            <div className="flex items-center justify-between">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                            </div>
                            <div className={`absolute bottom-0 right-0 h-1 w-full bg-${stat.color}-500/10`} />
                        </Card>
                    ))}
                </div>

                {/* Secondary Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Platform Activity */}
                    <Card className="border-none bg-white p-6 shadow-sm dark:bg-zinc-900">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                    <Activity className="h-5 w-5 text-blue-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Platform Activity</h2>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View Detailed Report</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'New Registrations', value: '45', color: 'bg-blue-500' },
                                { label: 'Appointment Success Rate', value: '94%', color: 'bg-green-500' },
                                { label: 'System Uptime', value: '99.9%', color: 'bg-indigo-500' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800">
                                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.value.includes('%') ? item.value : '70%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* System Health */}
                    <Card className="border-none bg-white p-6 shadow-sm dark:bg-zinc-900">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
                                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">System Integrity</h2>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Database Status</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Optimal</span>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">API Latency</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">124ms</span>
                                    <span className="text-[10px] font-medium text-emerald-600">Stable</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-between rounded-2xl bg-zinc-900 p-4 text-white">
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="h-5 w-5 text-blue-400" />
                                    <div>
                                        <p className="text-xs text-zinc-400">Monthly Revenue</p>
                                        <p className="text-lg font-bold">$124,500.00</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="h-5 w-5 text-zinc-400" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
