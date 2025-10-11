import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Store,
    Search,
    MapPin,
    Phone,
    Clock,
    Star,
    Navigation,
    ShoppingCart,
    Package,
    Truck,
    CheckCircle2,
    ChevronRight,
    Filter,
    DollarSign,
    Heart,
    AlertCircle,
    Calendar,
    User,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Pharmacies',
        href: '/patient/pharmacies',
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

export default function Pharmacies() {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { id: 'all', name: 'All Pharmacies', icon: Store },
        { id: 'open-now', name: 'Open Now', icon: Clock },
        { id: 'delivery', name: 'Home Delivery', icon: Truck },
        { id: 'nearby', name: 'Nearby', icon: MapPin },
    ];

    const pharmacies = [
        {
            id: 1,
            name: 'HealthPlus Pharmacy',
            address: '123 Main Street, Downtown',
            distance: 0.3,
            rating: 4.8,
            reviews: 156,
            phone: '+1 (555) 123-4567',
            hours: {
                open: '24/7',
                isOpen: true,
            },
            services: ['Home Delivery', 'Online Orders', 'Insurance Accepted', 'Prescription Refills'],
            deliveryTime: '30-45 min',
            featured: true,
            inNetwork: true,
        },
        {
            id: 2,
            name: 'MedCare Drugstore',
            address: '456 Oak Avenue, Medical District',
            distance: 0.7,
            rating: 4.6,
            reviews: 89,
            phone: '+1 (555) 234-5678',
            hours: {
                open: '8:00 AM - 10:00 PM',
                isOpen: true,
            },
            services: ['Free Parking', 'Insurance Accepted', 'Prescription Refills'],
            deliveryTime: '45-60 min',
            featured: false,
            inNetwork: true,
        },
        {
            id: 3,
            name: 'Community Pharmacy',
            address: '789 Elm Street, Suburban Area',
            distance: 0.5,
            rating: 4.3,
            reviews: 95,
            phone: '+1 (555) 345-6789',
            hours: {
                open: '9:00 AM - 8:00 PM',
                isOpen: true,
            },
            services: ['Home Delivery', 'Health Consultations', 'Prescription Refills'],
            deliveryTime: '60-90 min',
            featured: false,
            inNetwork: true,
        },
        {
            id: 4,
            name: 'QuickMeds Express',
            address: '321 Pine Road, City Center',
            distance: 1.2,
            rating: 4.7,
            reviews: 143,
            phone: '+1 (555) 456-7890',
            hours: {
                open: '7:00 AM - 11:00 PM',
                isOpen: true,
            },
            services: ['Express Delivery', 'Online Orders', 'Mobile App', 'Insurance Accepted'],
            deliveryTime: '20-30 min',
            featured: true,
            inNetwork: true,
        },
        {
            id: 5,
            name: 'WellCare Pharmacy',
            address: '555 Maple Drive, Northside',
            distance: 1.5,
            rating: 4.5,
            reviews: 112,
            phone: '+1 (555) 567-8901',
            hours: {
                open: 'Closed',
                isOpen: false,
            },
            services: ['Insurance Accepted', 'Prescription Refills', 'Immunizations'],
            deliveryTime: null,
            featured: false,
            inNetwork: false,
        },
    ];

    const prescriptionOrders = [
        {
            id: 1,
            medication: 'Amoxicillin 500mg',
            pharmacy: 'HealthPlus Pharmacy',
            status: 'ready',
            readyTime: '2024-12-10 3:00 PM',
        },
        {
            id: 2,
            medication: 'Vitamin D3 1000IU',
            pharmacy: 'MedCare Drugstore',
            status: 'processing',
            estimatedTime: '2024-12-10 5:00 PM',
        },
    ];

    const filteredPharmacies = pharmacies.filter((pharmacy) => {
        const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesFilter = true;
        if (selectedFilter === 'open-now') matchesFilter = pharmacy.hours.isOpen;
        if (selectedFilter === 'delivery') matchesFilter = pharmacy.services.includes('Home Delivery');
        if (selectedFilter === 'nearby') matchesFilter = pharmacy.distance < 1;
        
        return matchesSearch && matchesFilter;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pharmacies" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Store className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Nearby Pharmacies
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Find pharmacies and order medications online
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:gap-3">
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-green-100">Available</p>
                                    <p className="text-lg font-bold">{pharmacies.length}</p>
                                </div>
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-green-100">Open Now</p>
                                    <p className="text-lg font-bold">
                                        {pharmacies.filter(p => p.hours.isOpen).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Prescription Orders Status */}
                {prescriptionOrders.length > 0 && (
                    <Card className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                                <Package className="h-6 w-6 text-green-600" />
                                Active Prescription Orders
                            </h2>
                            <Link href="/patient/prescriptions">
                                <Button variant="ghost" size="sm">
                                    View All
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {prescriptionOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className={`rounded-xl border-2 p-4 ${
                                        order.status === 'ready'
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-amber-200 bg-amber-50'
                                    }`}
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {order.medication}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {order.pharmacy}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                order.status === 'ready'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-amber-600 text-white'
                                            }`}
                                        >
                                            {order.status === 'ready' ? 'Ready' : 'Processing'}
                                        </span>
                                    </div>
                                    <p className="mb-3 text-xs text-gray-600">
                                        {order.status === 'ready'
                                            ? `Ready for pickup at ${order.readyTime}`
                                            : `Estimated ready time: ${order.estimatedTime}`}
                                    </p>
                                    <Button size="sm" className="w-full">
                                        {order.status === 'ready' ? 'Get Directions' : 'Track Order'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Search and Filters */}
                <Card className="p-4">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-1 items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                            <Search className="h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search pharmacies by name or location..."
                                className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                            />
                        </div>
                        <Button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700">
                            <Search className="mr-2 h-4 w-4" />
                            Search
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
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                        selectedFilter === filter.id
                                            ? 'bg-green-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {filter.name}
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Pharmacies Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {filteredPharmacies.map((pharmacy) => (
                        <Card
                            key={pharmacy.id}
                            className={`overflow-hidden transition-all hover:shadow-xl ${
                                pharmacy.featured ? 'border-2 border-green-500' : ''
                            }`}
                        >
                            {/* Header */}
                            <div className={`p-6 ${pharmacy.featured ? 'bg-gradient-to-r from-green-50 to-green-50' : 'bg-gray-50'}`}>
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {pharmacy.name}
                                            </h3>
                                            {pharmacy.featured && (
                                                <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-bold text-gray-900">
                                                {pharmacy.rating}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                ({pharmacy.reviews} reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            pharmacy.hours.isOpen
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {pharmacy.hours.isOpen ? 'Open' : 'Closed'}
                                    </div>
                                </div>

                                {pharmacy.inNetwork && (
                                    <div className="flex items-center gap-1 text-sm text-green-700">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span className="font-semibold">In Your Insurance Network</span>
                                    </div>
                                )}
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <div className="mb-4 space-y-3">
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p>{pharmacy.address}</p>
                                            <p className="font-semibold text-green-600">
                                                {pharmacy.distance} km away
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4 text-green-600" />
                                        <a href={`tel:${pharmacy.phone}`} className="hover:text-green-600">
                                            {pharmacy.phone}
                                        </a>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4 text-purple-600" />
                                        {pharmacy.hours.open}
                                    </div>

                                    {pharmacy.deliveryTime && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Truck className="h-4 w-4 text-orange-600" />
                                            Delivery: {pharmacy.deliveryTime}
                                        </div>
                                    )}
                                </div>

                                {/* Services */}
                                <div className="mb-4">
                                    <p className="mb-2 text-xs font-semibold text-gray-600">
                                        Services:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {pharmacy.services.map((service, idx) => (
                                            <span
                                                key={idx}
                                                className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Order Online
                                    </Button>
                                    <Button variant="outline">
                                        <Navigation className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredPharmacies.length === 0 && (
                    <Card className="p-12">
                        <div className="flex flex-col items-center justify-center">
                            <Store className="h-16 w-16 text-gray-300" />
                            <p className="mt-4 text-lg font-semibold text-gray-900">
                                No pharmacies found
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                Try adjusting your search or filters
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedFilter('all');
                                }}
                                className="mt-6"
                                variant="outline"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}