import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Calendar,
    ClipboardList,
    Download,
    Edit,
    Eye,
    FileText,
    Filter,
    Heart,
    Lock,
    Search,
    Share2,
    Shield,
    Upload,
    User,
    File,
    FileImage,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Health Records',
        href: '/patient/health-records',
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

export default function HealthRecords() {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const healthRecords = [
        {
            id: 1,
            title: 'Annual Physical Examination',
            category: 'Checkup',
            date: '2024-12-01',
            doctor: 'Dr. Sarah Johnson',
            facility: 'City General Hospital',
            type: 'Visit Summary',
            fileType: 'pdf',
            fileSize: '2.4 MB',
            summary:
                'Comprehensive annual physical examination. All vital signs normal.',
            tags: ['Physical', 'Annual', 'Routine'],
        },
        {
            id: 2,
            title: 'Cardiology Consultation',
            category: 'Consultation',
            date: '2024-11-15',
            doctor: 'Dr. Sarah Johnson',
            facility: 'Heart Care Center',
            type: 'Consultation Notes',
            fileType: 'pdf',
            fileSize: '1.8 MB',
            summary: 'Follow-up consultation for heart health monitoring.',
            tags: ['Cardiology', 'Heart', 'Follow-up'],
        },
        {
            id: 3,
            title: 'Chest X-Ray',
            category: 'Imaging',
            date: '2024-11-10',
            doctor: 'Dr. Michael Chen',
            facility: 'Central Radiology',
            type: 'Imaging Report',
            fileType: 'image',
            fileSize: '5.2 MB',
            summary:
                'Chest X-ray showing clear lung fields. No abnormalities detected.',
            tags: ['X-Ray', 'Imaging', 'Lungs'],
        },
        {
            id: 4,
            title: 'Vaccination Record - COVID-19',
            category: 'Immunization',
            date: '2024-10-20',
            doctor: 'Dr. Emily Rodriguez',
            facility: 'Wellness Clinic',
            type: 'Immunization Record',
            fileType: 'pdf',
            fileSize: '0.8 MB',
            summary: 'COVID-19 booster vaccination administered.',
            tags: ['Vaccine', 'COVID-19', 'Immunization'],
        },
        {
            id: 5,
            title: 'Prescription - Lisinopril',
            category: 'Prescription',
            date: '2024-10-01',
            doctor: 'Dr. Sarah Johnson',
            facility: 'City General Hospital',
            type: 'Prescription',
            fileType: 'pdf',
            fileSize: '0.5 MB',
            summary: 'Prescription for blood pressure medication.',
            tags: ['Medication', 'Blood Pressure', 'Chronic'],
        },
        {
            id: 6,
            title: 'MRI Brain Scan',
            category: 'Imaging',
            date: '2024-09-15',
            doctor: 'Dr. James Wilson',
            facility: 'Advanced Imaging Center',
            type: 'Imaging Report',
            fileType: 'image',
            fileSize: '12.5 MB',
            summary: 'Brain MRI scan. No abnormalities detected.',
            tags: ['MRI', 'Brain', 'Neurology'],
        },
        {
            id: 7,
            title: 'Surgery Report - Appendectomy',
            category: 'Surgery',
            date: '2024-08-10',
            doctor: 'Dr. Robert Martinez',
            facility: 'City General Hospital',
            type: 'Surgical Report',
            fileType: 'pdf',
            fileSize: '3.2 MB',
            summary: 'Successful laparoscopic appendectomy. No complications.',
            tags: ['Surgery', 'Emergency', 'Appendix'],
        },
        {
            id: 8,
            title: 'Allergy Test Results',
            category: 'Lab Results',
            date: '2024-07-20',
            doctor: 'Dr. Emily Rodriguez',
            facility: 'Allergy Testing Center',
            type: 'Test Results',
            fileType: 'pdf',
            fileSize: '1.1 MB',
            summary: 'Allergic to peanuts and penicillin. Avoid exposure.',
            tags: ['Allergy', 'Testing', 'Important'],
        },
    ];

    const medicalInfo = {
        bloodType: 'O+',
        allergies: ['Penicillin', 'Peanuts'],
        chronicConditions: ['Hypertension'],
        emergencyContact: {
            name: 'Jane Doe',
            relationship: 'Sister',
            phone: '+1 (555) 123-4567',
        },
        insuranceProvider: 'HealthCare Plus',
        policyNumber: 'HCP-123456789',
    };

    const categories = [
        {
            id: 'all',
            name: 'All Records',
            icon: '📋',
            count: healthRecords.length,
        },
        { id: 'Checkup', name: 'Checkups', icon: '🏥', count: 1 },
        { id: 'Consultation', name: 'Consultations', icon: '👨‍⚕️', count: 1 },
        { id: 'Imaging', name: 'Imaging', icon: '📸', count: 2 },
        { id: 'Immunization', name: 'Immunizations', icon: '💉', count: 1 },
        { id: 'Prescription', name: 'Prescriptions', icon: '💊', count: 1 },
        { id: 'Surgery', name: 'Surgeries', icon: '🔪', count: 1 },
        { id: 'Lab Results', name: 'Lab Results', icon: '🧪', count: 1 },
    ];

    const filteredRecords = healthRecords.filter((record) => {
        const matchesSearch =
            record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        const matchesCategory =
            selectedCategory === 'all' || record.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getFileIcon = (fileType: string) => {
        if (fileType === 'pdf')
            return <File className="h-5 w-5 text-red-600" />;
        if (fileType === 'image')
            return <FileImage className="h-5 w-5 text-blue-600" />;
        return <File className="h-5 w-5 text-gray-600" />;
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            Checkup: 'from-green-500 to-emerald-500',
            Consultation: 'from-blue-500 to-indigo-500',
            Imaging: 'from-green-500 to-green-500',
            Immunization: 'from-orange-500 to-red-500',
            Prescription: 'from-yellow-500 to-amber-500',
            Surgery: 'from-red-500 to-rose-500',
            'Lab Results': 'from-cyan-500 to-teal-500',
        };
        return colors[category] || 'from-gray-500 to-gray-600';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Records" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <ClipboardList className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Health Records
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Secure access to your complete medical
                                        history
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <Button className="bg-white text-green-600 shadow-lg hover:bg-green-50">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Quick Medical Info */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-red-100 bg-gradient-to-br from-red-50 to-rose-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                                <Activity className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-600">
                                    Blood Type
                                </p>
                                <p className="text-xl font-bold text-red-600">
                                    {medicalInfo.bloodType}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 text-white">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-600">
                                    Allergies
                                </p>
                                <p className="text-sm font-bold text-amber-600">
                                    {medicalInfo.allergies.length} Recorded
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <Heart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-600">
                                    Conditions
                                </p>
                                <p className="text-sm font-bold text-blue-600">
                                    {medicalInfo.chronicConditions.length}{' '}
                                    Chronic
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-600">
                                    Total Records
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                    {healthRecords.length}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Sidebar */}
                    <div className="space-y-4 lg:col-span-3">
                        {/* Categories */}
                        <Card className="p-4">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
                                <Filter className="h-4 w-4 text-green-600" />
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() =>
                                            setSelectedCategory(category.id)
                                        }
                                        className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-all ${
                                            selectedCategory === category.id
                                                ? 'border-2 border-green-500 bg-gradient-to-r from-green-100 to-green-100 shadow-md'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                {category.icon}
                                            </span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {category.name}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-green-600">
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Medical Information */}
                        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                    <Shield className="h-4 w-4 text-blue-600" />
                                    Medical Info
                                </h3>
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div className="rounded-lg bg-white p-3 shadow-sm">
                                    <p className="text-xs font-medium text-gray-600">
                                        Blood Type
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {medicalInfo.bloodType}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-white p-3 shadow-sm">
                                    <p className="mb-2 text-xs font-medium text-gray-600">
                                        Allergies
                                    </p>
                                    {medicalInfo.allergies.map(
                                        (allergy, idx) => (
                                            <span
                                                key={idx}
                                                className="mr-1 mb-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700"
                                            >
                                                <AlertCircle className="h-3 w-3" />
                                                {allergy}
                                            </span>
                                        ),
                                    )}
                                </div>

                                <div className="rounded-lg bg-white p-3 shadow-sm">
                                    <p className="mb-2 text-xs font-medium text-gray-600">
                                        Chronic Conditions
                                    </p>
                                    {medicalInfo.chronicConditions.map(
                                        (condition, idx) => (
                                            <span
                                                key={idx}
                                                className="mr-1 mb-1 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700"
                                            >
                                                {condition}
                                            </span>
                                        ),
                                    )}
                                </div>

                                <div className="rounded-lg bg-white p-3 shadow-sm">
                                    <p className="text-xs font-medium text-gray-600">
                                        Emergency Contact
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-gray-900">
                                        {medicalInfo.emergencyContact.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {
                                            medicalInfo.emergencyContact
                                                .relationship
                                        }{' '}
                                        • {medicalInfo.emergencyContact.phone}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Records List */}
                    <div className="lg:col-span-9">
                        <Card>
                            {/* Search and Actions */}
                            <div className="border-b border-gray-200 bg-gray-50 p-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2">
                                        <Search className="h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            placeholder="Search records by title, doctor, or tags..."
                                            className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Filter className="mr-2 h-4 w-4" />
                                            Filter
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Export All
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Records Grid */}
                            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredRecords.map((record) => (
                                    <Card
                                        key={record.id}
                                        className="overflow-hidden transition-all hover:shadow-xl"
                                    >
                                        {/* Record Header */}
                                        <div
                                            className={`bg-gradient-to-r ${getCategoryColor(record.category)} p-4 text-white`}
                                        >
                                            <div className="mb-2 flex items-start justify-between">
                                                {getFileIcon(record.fileType)}
                                                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
                                                    {record.category}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-bold">
                                                {record.title}
                                            </h3>
                                            <p className="mt-1 text-xs opacity-90">
                                                {record.type}
                                            </p>
                                        </div>

                                        {/* Record Details */}
                                        <div className="p-4">
                                            <div className="mb-3 space-y-2 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="h-4 w-4 text-green-600" />
                                                    {new Date(
                                                        record.date,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <User className="h-4 w-4 text-blue-600" />
                                                    {record.doctor}
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    {record.facility}
                                                </p>
                                            </div>

                                            <p className="mb-3 line-clamp-2 text-xs text-gray-700">
                                                {record.summary}
                                            </p>

                                            {/* Tags */}
                                            <div className="mb-3 flex flex-wrap gap-1">
                                                {record.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="mb-3 text-xs text-gray-500">
                                                Size: {record.fileSize}
                                            </p>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    className="flex-1 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700"
                                                >
                                                    <Eye className="mr-1 h-3 w-3" />
                                                    View
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <Download className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <Share2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {filteredRecords.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <ClipboardList className="h-16 w-16 text-gray-300" />
                                    <p className="mt-4 text-lg font-semibold text-gray-900">
                                        No records found
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
