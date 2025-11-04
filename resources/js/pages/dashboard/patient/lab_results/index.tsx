import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    FileText,
    Search,
    Filter,
    Calendar,
    Download,
    Share2,
    Eye,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Minus,
    Clock,
    User,
    Building2,
    Plus,
    BarChart3,
    Menu,
    X,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Lab Results',
        href: '/patient/lab-results',
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

export default function LabResults() {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const labResults = [
        {
            id: 1,
            testName: 'Complete Blood Count (CBC)',
            category: 'Hematology',
            date: '2024-12-10',
            orderedBy: 'Dr. Sarah Johnson',
            facility: 'Central Lab',
            status: 'completed',
            results: [
                { parameter: 'White Blood Cells', value: 7.5, unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
                { parameter: 'Red Blood Cells', value: 4.8, unit: 'M/uL', range: '4.5-5.5', status: 'normal' },
                { parameter: 'Hemoglobin', value: 14.2, unit: 'g/dL', range: '13.5-17.5', status: 'normal' },
                { parameter: 'Hematocrit', value: 42, unit: '%', range: '38-50', status: 'normal' },
                { parameter: 'Platelets', value: 250, unit: 'K/uL', range: '150-400', status: 'normal' },
            ],
            summary: 'All parameters within normal range',
            notes: 'Continue current treatment plan',
        },
        {
            id: 2,
            testName: 'Lipid Panel',
            category: 'Chemistry',
            date: '2024-12-05',
            orderedBy: 'Dr. Sarah Johnson',
            facility: 'Central Lab',
            status: 'completed',
            results: [
                { parameter: 'Total Cholesterol', value: 195, unit: 'mg/dL', range: '<200', status: 'normal' },
                { parameter: 'LDL Cholesterol', value: 125, unit: 'mg/dL', range: '<100', status: 'high' },
                { parameter: 'HDL Cholesterol', value: 52, unit: 'mg/dL', range: '>40', status: 'normal' },
                { parameter: 'Triglycerides', value: 145, unit: 'mg/dL', range: '<150', status: 'normal' },
            ],
            summary: 'LDL cholesterol slightly elevated',
            notes: 'Recommend dietary modifications and follow-up in 3 months',
        },
        {
            id: 3,
            testName: 'Thyroid Function Test',
            category: 'Endocrinology',
            date: '2024-11-28',
            orderedBy: 'Dr. Emily Rodriguez',
            facility: 'City Hospital Lab',
            status: 'completed',
            results: [
                { parameter: 'TSH', value: 2.5, unit: 'mIU/L', range: '0.4-4.0', status: 'normal' },
                { parameter: 'Free T4', value: 1.2, unit: 'ng/dL', range: '0.8-1.8', status: 'normal' },
                { parameter: 'Free T3', value: 3.1, unit: 'pg/mL', range: '2.3-4.2', status: 'normal' },
            ],
            summary: 'Thyroid function within normal limits',
            notes: 'No action required',
        },
        {
            id: 4,
            testName: 'Comprehensive Metabolic Panel',
            category: 'Chemistry',
            date: '2024-11-20',
            orderedBy: 'Dr. Michael Chen',
            facility: 'Wellness Clinic Lab',
            status: 'completed',
            results: [
                { parameter: 'Glucose', value: 98, unit: 'mg/dL', range: '70-100', status: 'normal' },
                { parameter: 'Creatinine', value: 1.0, unit: 'mg/dL', range: '0.7-1.3', status: 'normal' },
                { parameter: 'BUN', value: 15, unit: 'mg/dL', range: '7-20', status: 'normal' },
                { parameter: 'Sodium', value: 140, unit: 'mEq/L', range: '136-145', status: 'normal' },
                { parameter: 'Potassium', value: 4.2, unit: 'mEq/L', range: '3.5-5.0', status: 'normal' },
            ],
            summary: 'All metabolic parameters normal',
            notes: 'Annual checkup - all results satisfactory',
        },
        {
            id: 5,
            testName: 'Vitamin D Level',
            category: 'Endocrinology',
            date: '2024-11-15',
            orderedBy: 'Dr. Michael Chen',
            facility: 'Central Lab',
            status: 'completed',
            results: [
                { parameter: 'Vitamin D, 25-OH', value: 28, unit: 'ng/mL', range: '30-100', status: 'low' },
            ],
            summary: 'Vitamin D deficiency detected',
            notes: 'Started on Vitamin D3 1000IU daily supplementation',
        },
        {
            id: 6,
            testName: 'Urinalysis',
            category: 'Urinalysis',
            date: '2024-12-12',
            orderedBy: 'Dr. James Wilson',
            facility: 'City Hospital Lab',
            status: 'pending',
            results: [],
            summary: 'Results pending',
            notes: 'Sample received, processing in progress',
        },
    ];

    const categories = [
        { id: 'all', name: 'All Categories', icon: '📋' },
        { id: 'Hematology', name: 'Hematology', icon: '🩸' },
        { id: 'Chemistry', name: 'Chemistry', icon: '⚗️' },
        { id: 'Endocrinology', name: 'Endocrinology', icon: '🧬' },
        { id: 'Urinalysis', name: 'Urinalysis', icon: '🔬' },
    ];

    const filteredResults = labResults.filter((result) => {
        const matchesSearch = result.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.orderedBy.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || result.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const completedTests = labResults.filter(r => r.status === 'completed').length;
    const pendingTests = labResults.filter(r => r.status === 'pending').length;
    const abnormalResults = labResults.filter(r => 
        r.results.some(result => result.status === 'high' || result.status === 'low')
    ).length;

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setIsFilterOpen(false); // Close menu after selection on mobile
    };

    const getStatusBadge = (status: string) => {
        if (status === 'completed') {
            return 'bg-green-100 text-green-700 border-green-200';
        }
        if (status === 'pending') {
            return 'bg-amber-100 text-amber-700 border-amber-200';
        }
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    const getResultStatus = (status: string) => {
        if (status === 'normal') {
            return { icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-green-600', bg: 'bg-green-50' };
        }
        if (status === 'high' || status === 'low') {
            return { icon: <AlertCircle className="h-4 w-4" />, color: 'text-amber-600', bg: 'bg-amber-50' };
        }
        return { icon: <Minus className="h-4 w-4" />, color: 'text-gray-600', bg: 'bg-gray-50' };
    };

    const getTrendIcon = (status: string) => {
        if (status === 'high') return <TrendingUp className="h-3 w-3 text-red-600" />;
        if (status === 'low') return <TrendingDown className="h-3 w-3 text-green-600" />;
        return <Minus className="h-3 w-3 text-gray-600" />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lab Results" />

            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-4 text-white shadow-xl sm:p-6 lg:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm sm:h-16 sm:w-16">
                                    <FileText className="h-6 w-6 sm:h-9 sm:w-9" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                                        Lab Results
                                    </h1>
                                    <p className="mt-1 text-xs text-green-100 sm:text-sm">
                                        View and track your laboratory test results
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Link href="/patient/appointments">
                                    <Button className="bg-white text-green-600 shadow-lg hover:bg-green-50">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Book Lab Test
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Stats Cards */}
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-indigo-50 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                                    Total Tests
                                </p>
                                <p className="mt-1 text-2xl font-bold text-green-600 sm:mt-2 sm:text-3xl">
                                    {labResults.length}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white sm:h-12 sm:w-12">
                                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                                    Completed
                                </p>
                                <p className="mt-1 text-2xl font-bold text-green-600 sm:mt-2 sm:text-3xl">
                                    {completedTests}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white sm:h-12 sm:w-12">
                                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                                    Pending
                                </p>
                                <p className="mt-1 text-2xl font-bold text-amber-600 sm:mt-2 sm:text-3xl">
                                    {pendingTests}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white sm:h-12 sm:w-12">
                                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 sm:text-sm">
                                    Needs Attention
                                </p>
                                <p className="mt-1 text-2xl font-bold text-orange-600 sm:mt-2 sm:text-3xl">
                                    {abnormalResults}
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white sm:h-12 sm:w-12">
                                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="relative grid gap-6 lg:grid-cols-12">
                    {/* Overlay for mobile filter menu */}
                    {isFilterOpen && (
                        <div
                            className="absolute inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                            onClick={() => setIsFilterOpen(false)}
                        ></div>
                    )}

                    {/* Sidebar - Categories */}
                    <div
                        className={`fixed inset-y-0 left-0 z-50 w-80 transform overflow-y-auto border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:col-span-3 lg:z-auto lg:w-auto lg:translate-x-0 lg:shadow-none ${
                            isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {/* Mobile Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <Filter className="h-5 w-5 text-green-600" />
                                Test Categories
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="space-y-4 p-4">
                            <Card className="border-0 p-4 lg:border lg:shadow-sm">
                                <h3 className="mb-4 hidden items-center gap-2 text-sm font-bold text-gray-900 lg:flex">
                                    <Filter className="h-4 w-4 text-green-600" />
                                    Test Categories
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category.id)}
                                            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                                                selectedCategory === category.id
                                                    ? 'border-2 border-green-500 bg-gradient-to-r from-green-100 to-indigo-100 shadow-md'
                                                    : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className="text-xl">{category.icon}</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {category.name}
                                            </span>
                                            {selectedCategory === category.id && (
                                                <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Clear Filter Button - Mobile Only */}
                                {selectedCategory !== 'all' && (
                                    <Button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setIsFilterOpen(false);
                                        }}
                                        variant="outline"
                                        className="mt-4 w-full lg:hidden"
                                    >
                                        Clear Category Filter
                                    </Button>
                                )}
                            </Card>

                            {/* Recent Abnormal Results */}
                            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-orange-600" />
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Needs Attention
                                    </h3>
                                </div>
                                {labResults
                                    .filter(r => r.results.some(result => result.status === 'high' || result.status === 'low'))
                                    .slice(0, 2)
                                    .map(result => (
                                        <div key={result.id} className="mb-3 rounded-xl bg-white p-4 shadow-sm last:mb-0">
                                            <p className="font-semibold text-gray-900">
                                                {result.testName}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-600">
                                                {result.summary}
                                            </p>
                                            <Button 
                                                size="sm" 
                                                className="mt-3 w-full bg-orange-600 hover:bg-orange-700"
                                                onClick={() => setIsFilterOpen(false)}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    ))}
                                {abnormalResults === 0 && (
                                    <div className="rounded-xl bg-white p-4 text-center">
                                        <CheckCircle2 className="mx-auto h-8 w-8 text-green-600" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            All results within normal range
                                        </p>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="relative z-10 lg:col-span-9">
                        <Card>
                            {/* Search Bar */}
                            <div className="border-b border-gray-200 bg-gray-50 p-3 sm:p-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 sm:px-4">
                                        <Search className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search lab results..."
                                            className="flex-1 border-none bg-transparent text-xs outline-none placeholder:text-gray-400 sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        {/* Mobile Filter Button */}
                                        <Button
                                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                                            variant="outline"
                                            size="sm"
                                            className="lg:hidden"
                                        >
                                            <Filter className="mr-2 h-4 w-4" />
                                            Categories
                                            {selectedCategory !== 'all' && (
                                                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                                                    1
                                                </span>
                                            )}
                                        </Button>

                                        <Button variant="outline" size="sm" className="hidden sm:flex">
                                            <Filter className="mr-2 h-4 w-4" />
                                            <span className="hidden sm:inline">Filter</span>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            <span className="hidden sm:inline">Export All</span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Active Filter Tag */}
                                {selectedCategory !== 'all' && (
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            {categories.find(c => c.id === selectedCategory)?.name}
                                            <button
                                                onClick={() => setSelectedCategory('all')}
                                                className="ml-1 hover:text-green-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Results List */}
                            <div className="divide-y divide-gray-200">
                                {filteredResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="p-4 transition-all hover:bg-gray-50 sm:p-6"
                                    >
                                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                                                        {result.testName}
                                                    </h3>
                                                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                                                        {result.category}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600 sm:gap-3 sm:text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5 text-green-600 sm:h-4 sm:w-4" />
                                                        {new Date(result.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="h-3.5 w-3.5 text-green-600 sm:h-4 sm:w-4" />
                                                        <span className="hidden sm:inline">{result.orderedBy}</span>
                                                        <span className="sm:hidden">{result.orderedBy.split(' ')[1]}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Building2 className="h-3.5 w-3.5 text-purple-600 sm:h-4 sm:w-4" />
                                                        {result.facility}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={`flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold sm:px-3 ${getStatusBadge(
                                                    result.status
                                                )}`}
                                            >
                                                {result.status === 'completed' ? (
                                                    <CheckCircle2 className="h-3 w-3" />
                                                ) : (
                                                    <Clock className="h-3 w-3" />
                                                )}
                                                {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                                            </div>
                                        </div>

                                        {/* Summary */}
                                        <div className="mb-4 rounded-lg bg-green-50 p-3">
                                            <p className="text-xs font-semibold text-green-900 sm:text-sm">
                                                Summary: {result.summary}
                                            </p>
                                            {result.notes && (
                                                <p className="mt-1 text-xs text-green-800">
                                                    Notes: {result.notes}
                                                </p>
                                            )}
                                        </div>

                                        {/* Results Table */}
                                        {result.results.length > 0 && (
                                            <div className="mb-4 overflow-x-auto">
                                                <table className="w-full text-xs sm:text-sm">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-2 py-2 text-left font-semibold text-gray-900 sm:px-4">
                                                                Parameter
                                                            </th>
                                                            <th className="px-2 py-2 text-center font-semibold text-gray-900 sm:px-4">
                                                                Value
                                                            </th>
                                                            <th className="hidden px-4 py-2 text-center font-semibold text-gray-900 sm:table-cell">
                                                                Reference Range
                                                            </th>
                                                            <th className="px-2 py-2 text-center font-semibold text-gray-900 sm:px-4">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {result.results.map((item, idx) => {
                                                            const statusInfo = getResultStatus(item.status);
                                                            return (
                                                                <tr key={idx} className={statusInfo.bg}>
                                                                    <td className="px-2 py-2 font-medium text-gray-900 sm:px-4 sm:py-3">
                                                                        {item.parameter}
                                                                    </td>
                                                                    <td className="px-2 py-2 text-center sm:px-4 sm:py-3">
                                                                        <div className="flex items-center justify-center gap-1">
                                                                            <span className="font-semibold text-gray-900">
                                                                                {item.value}
                                                                            </span>
                                                                            <span className="text-gray-600">
                                                                                {item.unit}
                                                                            </span>
                                                                            {getTrendIcon(item.status)}
                                                                        </div>
                                                                    </td>
                                                                    <td className="hidden px-4 py-3 text-center text-gray-600 sm:table-cell">
                                                                        {item.range}
                                                                    </td>
                                                                    <td className="px-2 py-2 text-center sm:px-4 sm:py-3">
                                                                        <div className={`flex items-center justify-center gap-1 ${statusInfo.color}`}>
                                                                            {statusInfo.icon}
                                                                            <span className="hidden text-xs font-semibold uppercase sm:inline">
                                                                                {item.status}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2">
                                            <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                                                <Eye className="mr-0 h-4 w-4 sm:mr-2" />
                                                <span className="hidden sm:inline">View Full Report</span>
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                                                <Download className="mr-0 h-4 w-4 sm:mr-2" />
                                                <span className="hidden sm:inline">Download PDF</span>
                                            </Button>
                                            <Button size="sm" variant="outline" className="hidden sm:flex">
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Share with Doctor
                                            </Button>
                                            <Button size="sm" variant="outline" className="hidden sm:flex">
                                                <BarChart3 className="mr-2 h-4 w-4" />
                                                View Trends
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredResults.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FileText className="h-12 w-12 text-gray-300 sm:h-16 sm:w-16" />
                                    <p className="mt-4 text-base font-semibold text-gray-900 sm:text-lg">
                                        No lab results found
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Try adjusting your search or filters
                                    </p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}