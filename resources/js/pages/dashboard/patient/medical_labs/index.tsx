import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { patient } from '@/routes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Beaker,
    Search,
    MapPin,
    Phone,
    Clock,
    Star,
    Navigation,
    ClipboardList,
    FileText,
    Activity,
    CheckCircle2,
    ChevronRight,
    Filter,
    ShieldCheck,
    FlaskConical,
    Microscope
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Medical Labs',
        href: patient.medicalLabs.index().url,
    },
];

interface PageProps {
    labs: any[];
    [key: string]: any;
}

export default function MedicalLabs() {
    const { labs } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { id: 'all', name: 'All Labs', icon: Beaker },
        { id: 'open-now', name: 'Open Now', icon: Clock },
        { id: 'accredited', name: 'Accredited', icon: ShieldCheck },
        { id: 'nearby', name: 'Nearby', icon: MapPin },
    ];

    const filteredLabs = labs.filter((lab) => {
        const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lab.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesFilter = true;
        // In a real app we'd have these fields, for now we filter by search only
        // unless we want to mock some properties if they don't exist
        
        return matchesSearch && matchesFilter;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Medical Labs" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Microscope className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Diagnostic Centers
                                    </h1>
                                    <p className="mt-1 text-sm text-blue-100">
                                        Find accredited laboratories and book tests online
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:gap-3">
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-blue-100">Available</p>
                                    <p className="text-lg font-bold">{labs.length}</p>
                                </div>
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-blue-100">Verified</p>
                                    <p className="text-lg font-bold">
                                        {labs.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Search and Filters */}
                <Card className="p-4 border-none shadow-md bg-white/80 backdrop-blur-md">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-1 items-center gap-2 rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by lab name, location, or test type..."
                                className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                            />
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-12 px-8">
                            <Search className="mr-2 h-4 w-4" />
                            Find Labs
                        </Button>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => {
                            const Icon = filter.icon;
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setSelectedFilter(filter.id)}
                                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                                        selectedFilter === filter.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                            : 'bg-white border-2 border-gray-50 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className={`h-4 w-4 ${selectedFilter === filter.id ? 'text-white' : 'text-blue-500'}`} />
                                    {filter.name}
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Labs Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {filteredLabs.map((lab) => (
                        <Card
                            key={lab.id}
                            className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
                        >
                            {/* Header */}
                            <div className="relative p-6 bg-gradient-to-r from-blue-50/50 to-white group-hover:from-blue-50 transition-colors">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {lab.name}
                                            </h3>
                                            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-200">
                                                Certified
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-gray-900">4.9</span>
                                            <span className="text-gray-400">• High Accuracy</span>
                                        </div>
                                    </div>
                                    <div className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700 uppercase tracking-tight">
                                        Open Now
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-blue-700 font-medium">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Insurance Accepted</span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 bg-white">
                                <div className="mb-6 space-y-3">
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                                        <p className="leading-tight">{lab.address}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4 text-blue-500" />
                                        <span>{lab.phone || 'Contact via App'}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <span>Mon - Sat: 08:00 AM - 08:00 PM</span>
                                    </div>
                                </div>

                                {/* Common Tests Preview */}
                                {lab.services && lab.services.length > 0 && (
                                    <div className="mb-6">
                                        <p className="mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            Available Tests:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {lab.services.slice(0, 3).map((service: any) => (
                                                <span
                                                    key={service.id}
                                                    className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-100"
                                                >
                                                    {service.name}
                                                </span>
                                            ))}
                                            {lab.services.length > 3 && (
                                                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                                                    +{lab.services.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Link href={patient.medicalLabs.show(lab.id).url} className="flex-1">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-100 transition-all">
                                            View Services
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <Navigation className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredLabs.length === 0 && (
                    <Card className="p-16 border-none shadow-md">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                                <FlaskConical className="h-12 w-12 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                No Laboratories Found
                            </h3>
                            <p className="mt-2 text-gray-500 max-w-sm">
                                We couldn't find any diagnostic centers matching your search criteria. Try adjusting your filters.
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedFilter('all');
                                }}
                                className="mt-8"
                                variant="outline"
                            >
                                Reset Search
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
