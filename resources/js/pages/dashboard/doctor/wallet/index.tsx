import AppLayout from '@/layouts/doctor-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Wallet,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    DollarSign,
    TrendingUp,
    Gift,
    Download,
    Filter,
    Search,
    Calendar,
    CheckCircle2,
    Clock,
    XCircle,
    Zap,
    Shield,
    Eye,
    EyeOff,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Wallet',
        href: '/patient/wallet',
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

export default function WalletPage() {
    const { auth } = usePage<PageProps>().props;
    const [showBalance, setShowBalance] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');

    const walletBalance = 1250.50;
    const availableVouchers = 3;
    const freeConsultations = 2;

    const transactions = [
        {
            id: 1,
            type: 'expense',
            title: 'Video Consultation',
            description: 'Dr. Sarah Johnson - Cardiology',
            amount: 50.00,
            date: '2024-12-10',
            time: '2:30 PM',
            status: 'completed',
            category: 'consultation',
        },
        {
            id: 2,
            type: 'income',
            title: 'Wallet Top-up',
            description: 'Added via Credit Card',
            amount: 200.00,
            date: '2024-12-09',
            time: '10:15 AM',
            status: 'completed',
            category: 'topup',
        },
        {
            id: 3,
            type: 'expense',
            title: 'Prescription Purchase',
            description: 'HealthPlus Pharmacy',
            amount: 35.50,
            date: '2024-12-08',
            time: '4:45 PM',
            status: 'completed',
            category: 'medication',
        },
        {
            id: 4,
            type: 'expense',
            title: 'Lab Tests',
            description: 'Complete Blood Count - Central Lab',
            amount: 85.00,
            date: '2024-12-07',
            time: '9:00 AM',
            status: 'completed',
            category: 'lab',
        },
        {
            id: 5,
            type: 'income',
            title: 'Refund',
            description: 'Cancelled Appointment',
            amount: 50.00,
            date: '2024-12-06',
            time: '11:20 AM',
            status: 'completed',
            category: 'refund',
        },
        {
            id: 6,
            type: 'expense',
            title: 'Telemedicine Session',
            description: 'Dr. Michael Chen - General Medicine',
            amount: 40.00,
            date: '2024-12-05',
            time: '3:00 PM',
            status: 'pending',
            category: 'consultation',
        },
    ];

    const paymentMethods = [
        {
            id: 1,
            type: 'credit-card',
            name: 'Visa ending in 4242',
            isDefault: true,
        },
        {
            id: 2,
            type: 'credit-card',
            name: 'Mastercard ending in 8888',
            isDefault: false,
        },
    ];

    const filteredTransactions = transactions.filter(tx => {
        if (activeTab === 'income') return tx.type === 'income';
        if (activeTab === 'expense') return tx.type === 'expense';
        return true;
    });

    const totalIncome = transactions
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const totalExpense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + tx.amount, 0);

    const getStatusBadge = (status: string) => {
        if (status === 'completed') {
            return { bg: 'bg-blue-100', text: 'text-blue-700', icon: <CheckCircle2 className="h-3 w-3" /> };
        }
        if (status === 'pending') {
            return { bg: 'bg-blue-100', text: 'text-blue-700', icon: <Clock className="h-3 w-3" /> };
        }
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: <XCircle className="h-3 w-3" /> };
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, any> = {
            consultation: '👨‍⚕️',
            medication: '💊',
            lab: '🧪',
            topup: '💳',
            refund: '↩️',
        };
        return icons[category] || '💰';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallet" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-blue-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Wallet className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        My Wallet
                                    </h1>
                                    <p className="mt-1 text-sm text-blue-100">
                                        Manage your payments and transactions
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Button className="bg-white text-blue-600 shadow-lg hover:bg-blue-50">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Funds
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Balance Card */}
                <Card className="overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50">
                    <div className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="mb-2 text-sm font-medium text-gray-600">
                                    Available Balance
                                </p>
                                <div className="flex items-baseline gap-3">
                                    {showBalance ? (
                                        <h2 className="text-5xl font-bold text-blue-600">
                                            ${walletBalance.toFixed(2)}
                                        </h2>
                                    ) : (
                                        <h2 className="text-5xl font-bold text-blue-600">
                                            ••••••
                                        </h2>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowBalance(!showBalance)}
                                    >
                                        {showBalance ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Money
                                </Button>
                                <Button variant="outline">
                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                    Send Money
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                        <ArrowDownLeft className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Total Received</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            ${totalIncome.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                        <ArrowUpRight className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Total Spent</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            ${totalExpense.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                        <TrendingUp className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">This Month</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            ${(totalExpense * 0.6).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <CreditCard className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Payment Methods</p>
                                <p className="text-xs text-gray-600">{paymentMethods.length} cards</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            Manage Cards
                        </Button>
                    </Card>

                    <Card className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <Gift className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Vouchers</p>
                                <p className="text-xs text-gray-600">{availableVouchers} available</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            View Vouchers
                        </Button>
                    </Card>

                    <Card className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Zap className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Free Consultations</p>
                                <p className="text-xs text-gray-600">{freeConsultations} remaining</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            Use Now
                        </Button>
                    </Card>

                    <Card className="p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Shield className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Secure Payments</p>
                                <p className="text-xs text-gray-600">SSL encrypted</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            Learn More
                        </Button>
                    </Card>
                </div>

                {/* Transactions */}
                <Card>
                    <div className="border-b border-gray-200 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                Transaction History
                            </h2>
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    activeTab === 'all'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                All Transactions
                            </button>
                            <button
                                onClick={() => setActiveTab('income')}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    activeTab === 'income'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Income
                            </button>
                            <button
                                onClick={() => setActiveTab('expense')}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    activeTab === 'expense'
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Expenses
                            </button>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => {
                            const statusInfo = getStatusBadge(transaction.status);
                            return (
                                <div
                                    key={transaction.id}
                                    className="p-6 transition-all hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl ${
                                            transaction.type === 'income' ? 'bg-blue-100' : 'bg-blue-100'
                                        }`}>
                                            {getCategoryIcon(transaction.category)}
                                        </div>

                                        <div className="flex-1">
                                            <div className="mb-1 flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">
                                                        {transaction.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {transaction.description}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-lg font-bold ${
                                                        transaction.type === 'income'
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }`}>
                                                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(transaction.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                    <span>{transaction.time}</span>
                                                </div>
                                                <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                                                    {statusInfo.icon}
                                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Wallet className="h-16 w-16 text-gray-300" />
                            <p className="mt-4 text-lg font-semibold text-gray-900">
                                No transactions found
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                Your transaction history will appear here
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}