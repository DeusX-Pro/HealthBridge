import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Bell,
    Camera,
    Globe,
    HelpCircle,
    Lock,
    Mail,
    Phone,
    Settings,
    Shield,
    User,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Settings',
        href: '/patient/settings',
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

export default function SettingsPage() {
    const { auth } = usePage<PageProps>().props;
    const [activeSection, setActiveSection] = useState('profile');

    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            sms: false,
            appointments: true,
            prescriptions: true,
            labResults: true,
            marketing: false,
        },
        privacy: {
            profileVisibility: 'private',
            shareData: false,
            twoFactor: true,
        },
        preferences: {
            language: 'en',
            timezone: 'UTC-5',
            dateFormat: 'MM/DD/YYYY',
        },
    });

    const menuItems = [
        { id: 'profile', name: 'Profile Information', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'privacy', name: 'Privacy & Security', icon: Shield },
        { id: 'password', name: 'Password', icon: Lock },
        { id: 'preferences', name: 'Preferences', icon: Globe },
        { id: 'help', name: 'Help & Support', icon: HelpCircle },
    ];

    const toggleNotification = (key: string) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[
                    key as keyof typeof settings.notifications
                ],
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-700 to-blue-700 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                <Settings className="h-9 w-9" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Settings</h1>
                                <p className="mt-1 text-sm text-blue-300">
                                    Manage your account preferences and settings
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Navigation Tabs - Now at the top in flex layout */}
                <div className="flex flex-wrap gap-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                                    activeSection === item.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Content */}
                <div className="grid gap-6">
                    {/* Content Area */}
                    <div className="space-y-6">
                        {/* Profile Information */}
                        {activeSection === 'profile' && (
                            <Card className="p-6">
                                <h2 className="mb-6 text-xl font-bold text-blue-900">
                                    Profile Information
                                </h2>

                                <div className="mb-6 flex items-center gap-6">
                                    <div className="relative">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-600 text-3xl font-bold text-white">
                                            {auth.user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <button className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-blue-900">
                                            {auth.user.name}
                                        </h3>
                                        <p className="text-sm text-blue-600">
                                            {auth.user.email}
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="mt-2"
                                        >
                                            Change Photo
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-blue-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={auth.user.name}
                                                className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-blue-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue={auth.user.email}
                                                className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-blue-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-blue-700">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Street Address"
                                            className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        />
                                    </div>

                                    <Button className="bg-blue-700 hover:bg-blue-800">
                                        Save Changes
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Notifications */}
                        {activeSection === 'notifications' && (
                            <Card className="p-6">
                                <h2 className="mb-6 text-xl font-bold text-blue-900">
                                    Notification Preferences
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-4 text-sm font-bold text-blue-900">
                                            Notification Channels
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                {
                                                    key: 'email',
                                                    label: 'Email Notifications',
                                                    icon: Mail,
                                                },
                                                {
                                                    key: 'push',
                                                    label: 'Push Notifications',
                                                    icon: Bell,
                                                },
                                                {
                                                    key: 'sms',
                                                    label: 'SMS Notifications',
                                                    icon: Phone,
                                                },
                                            ].map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <div
                                                        key={item.key}
                                                        className="flex items-center justify-between rounded-lg border border-blue-200 p-4"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Icon className="h-5 w-5 text-blue-600" />
                                                            <span className="font-medium text-blue-900">
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                toggleNotification(
                                                                    item.key,
                                                                )
                                                            }
                                                            className={`relative h-6 w-11 rounded-full transition-colors ${
                                                                settings
                                                                    .notifications[
                                                                    item.key as keyof typeof settings.notifications
                                                                ]
                                                                    ? 'bg-blue-600'
                                                                    : 'bg-blue-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                                                    settings
                                                                        .notifications[
                                                                        item.key as keyof typeof settings.notifications
                                                                    ]
                                                                        ? 'translate-x-5'
                                                                        : 'translate-x-0'
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="mb-4 text-sm font-bold text-blue-900">
                                            Notification Types
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                {
                                                    key: 'appointments',
                                                    label: 'Appointment Reminders',
                                                },
                                                {
                                                    key: 'prescriptions',
                                                    label: 'Prescription Updates',
                                                },
                                                {
                                                    key: 'labResults',
                                                    label: 'Lab Results Available',
                                                },
                                                {
                                                    key: 'marketing',
                                                    label: 'Marketing & Promotions',
                                                },
                                            ].map((item) => (
                                                <div
                                                    key={item.key}
                                                    className="flex items-center justify-between rounded-lg border border-blue-200 p-4"
                                                >
                                                    <span className="font-medium text-blue-900">
                                                        {item.label}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            toggleNotification(
                                                                item.key,
                                                            )
                                                        }
                                                        className={`relative h-6 w-11 rounded-full transition-colors ${
                                                            settings
                                                                .notifications[
                                                                item.key as keyof typeof settings.notifications
                                                            ]
                                                                ? 'bg-blue-600'
                                                                : 'bg-blue-300'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                                                settings
                                                                    .notifications[
                                                                    item.key as keyof typeof settings.notifications
                                                                ]
                                                                    ? 'translate-x-5'
                                                                    : 'translate-x-0'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Privacy & Security */}
                        {activeSection === 'privacy' && (
                            <Card className="p-6">
                                <h2 className="mb-6 text-xl font-bold text-blue-900">
                                    Privacy & Security
                                </h2>

                                <div className="space-y-6">
                                    <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-blue-600" />
                                            <p className="text-sm font-semibold text-blue-900">
                                                Your account is secure
                                            </p>
                                        </div>
                                        <p className="mt-2 text-sm text-blue-800">
                                            Two-factor authentication is enabled
                                            and your data is encrypted.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between rounded-lg border border-blue-200 p-4">
                                            <div>
                                                <p className="font-medium text-blue-900">
                                                    Two-Factor Authentication
                                                </p>
                                                <p className="text-sm text-blue-600">
                                                    Add an extra layer of
                                                    security
                                                </p>
                                            </div>
                                            <button className="relative h-6 w-11 rounded-full bg-blue-600">
                                                <span className="translate-x-5 absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between rounded-lg border border-blue-200 p-4">
                                            <div>
                                                <p className="font-medium text-blue-900">
                                                    Share Health Data
                                                </p>
                                                <p className="text-sm text-blue-600">
                                                    Allow sharing for research
                                                    purposes
                                                </p>
                                            </div>
                                            <button className="relative h-6 w-11 rounded-full bg-blue-300">
                                                <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform" />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <Button
                                            variant="outline"
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Password */}
                        {activeSection === 'password' && (
                            <Card className="p-6">
                                <h2 className="mb-6 text-xl font-bold text-blue-900">
                                    Change Password
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        />
                                    </div>

                                    <Button className="bg-blue-700 hover:bg-blue-800">
                                        Update Password
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Preferences */}
                        {activeSection === 'preferences' && (
                            <Card className="p-6">
                                <h2 className="mb-6 text-xl font-bold text-blue-900">
                                    Preferences
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            Language
                                        </label>
                                        <select className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none">
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            Timezone
                                        </label>
                                        <select className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none">
                                            <option>
                                                UTC-5 (Eastern Time)
                                            </option>
                                            <option>
                                                UTC-6 (Central Time)
                                            </option>
                                            <option>
                                                UTC-7 (Mountain Time)
                                            </option>
                                            <option>
                                                UTC-8 (Pacific Time)
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-blue-700">
                                            Date Format
                                        </label>
                                        <select className="w-full rounded-lg border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none">
                                            <option>MM/DD/YYYY</option>
                                            <option>DD/MM/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </div>

                                    <Button className="bg-blue-700 hover:bg-blue-800">
                                        Save Preferences
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Help & Support */}
                        {activeSection === 'help' && (
                            <Card className="p-6">
                                <h2 className="mb-6 text-xl font-bold text-blue-900">
                                    Help & Support
                                </h2>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <button className="flex items-start gap-3 rounded-lg border border-blue-200 p-4 text-left transition-all hover:shadow-md">
                                        <HelpCircle className="h-6 w-6 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-blue-900">
                                                FAQ
                                            </h3>
                                            <p className="text-sm text-blue-600">
                                                Find answers to common questions
                                            </p>
                                        </div>
                                    </button>

                                    <button className="flex items-start gap-3 rounded-lg border border-blue-200 p-4 text-left transition-all hover:shadow-md">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-blue-900">
                                                Contact Support
                                            </h3>
                                            <p className="text-sm text-blue-600">
                                                Get help from our team
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}