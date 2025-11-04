import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Stethoscope,
    Search,
    Filter,
    MapPin,
    Star,
    Calendar,
    Video,
    Clock,
    Award,
    Briefcase,
    Heart,
    CheckCircle2,
    ChevronRight,
    DollarSign,
    Users,
    Menu,
    X,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Doctors',
        href: '/patient/doctors',
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

export default function Doctors() {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const specialties = [
        { id: 'all', name: 'All Specialties', icon: '🏥' },
        { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
        { id: 'general', name: 'General Medicine', icon: '🩺' },
        { id: 'dermatology', name: 'Dermatology', icon: '✨' },
        { id: 'orthopedic', name: 'Orthopedic', icon: '🦴' },
        { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
        { id: 'dentistry', name: 'Dentistry', icon: '🦷' },
        { id: 'neurology', name: 'Neurology', icon: '🧠' },
    ];

    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            specialtyId: 'cardiology',
            rating: 4.9,
            reviews: 234,
            experience: 15,
            patients: 1200,
            avatar: 'SJ',
            availability: 'Available Today',
            nextSlot: '2:00 PM',
            consultationFee: 50,
            location: 'City General Hospital',
            type: 'video',
            verified: true,
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            specialty: 'General Physician',
            specialtyId: 'general',
            rating: 4.8,
            reviews: 189,
            experience: 12,
            patients: 980,
            avatar: 'MC',
            availability: 'Available Today',
            nextSlot: '10:00 AM',
            consultationFee: 40,
            location: 'Wellness Clinic',
            type: 'both',
            verified: true,
        },
        {
            id: 3,
            name: 'Dr. Emily Rodriguez',
            specialty: 'Dermatologist',
            specialtyId: 'dermatology',
            rating: 4.7,
            reviews: 156,
            experience: 10,
            patients: 750,
            avatar: 'ER',
            availability: 'Tomorrow',
            nextSlot: '3:30 PM',
            consultationFee: 60,
            location: 'Skin Care Center',
            type: 'video',
            verified: true,
        },
        {
            id: 4,
            name: 'Dr. James Wilson',
            specialty: 'Orthopedic Surgeon',
            specialtyId: 'orthopedic',
            rating: 4.9,
            reviews: 201,
            experience: 18,
            patients: 1500,
            avatar: 'JW',
            availability: 'Available Today',
            nextSlot: '11:00 AM',
            consultationFee: 70,
            location: 'Orthopedic Care Center',
            type: 'in-person',
            verified: true,
        },
        {
            id: 5,
            name: 'Dr. Lisa Anderson',
            specialty: 'Pediatrician',
            specialtyId: 'pediatrics',
            rating: 4.8,
            reviews: 178,
            experience: 14,
            patients: 1100,
            avatar: 'LA',
            availability: 'Available Today',
            nextSlot: '9:00 AM',
            consultationFee: 45,
            location: 'Children Hospital',
            type: 'both',
            verified: true,
        },
        {
            id: 6,
            name: 'Dr. Robert Martinez',
            specialty: 'Dentist',
            specialtyId: 'dentistry',
            rating: 4.6,
            reviews: 143,
            experience: 11,
            patients: 850,
            avatar: 'RM',
            availability: 'Tomorrow',
            nextSlot: '4:00 PM',
            consultationFee: 55,
            location: 'Dental Care Center',
            type: 'in-person',
            verified: true,
        },
    ];

    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialtyId === selectedSpecialty;
        const matchesType = selectedType === 'all' || 
            (selectedType === 'video' && (doctor.type === 'video' || doctor.type === 'both')) ||
            (selectedType === 'in-person' && (doctor.type === 'in-person' || doctor.type === 'both'));
        return matchesSearch && matchesSpecialty && matchesType;
    });

    const handleSpecialtySelect = (specialtyId: string) => {
        setSelectedSpecialty(specialtyId);
        setIsFilterOpen(false); // Close menu after selection on mobile
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Find Doctors" />

            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-4 text-white shadow-xl sm:p-6 lg:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm sm:h-16 sm:w-16">
                                    <Stethoscope className="h-6 w-6 sm:h-9 sm:w-9" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                                        Find Your Doctor
                                    </h1>
                                    <p className="mt-1 text-xs text-green-100 sm:text-sm">
                                        Browse and book appointments with qualified healthcare professionals
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:gap-3">
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-green-100">Total Doctors</p>
                                    <p className="text-lg font-bold">{doctors.length}</p>
                                </div>
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-green-100">Available Today</p>
                                    <p className="text-lg font-bold">
                                        {doctors.filter(d => d.availability === 'Available Today').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Search and Filter Section */}
                <Card className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
                        {/* Search Bar */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <div className="flex flex-1 items-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-3 py-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 sm:px-4 sm:py-3 sm:focus-within:ring-4">
                                <Search className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by doctor name or specialty..."
                                    className="flex-1 border-none bg-transparent text-xs outline-none placeholder:text-gray-400 sm:text-sm"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 lg:hidden"
                            >
                                <Filter className="h-4 w-4" />
                                Specialties
                                {selectedSpecialty !== 'all' && (
                                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-green-600">
                                        1
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setSelectedType('all')}
                                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:px-4 sm:text-sm ${
                                    selectedType === 'all'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                All Types
                            </button>
                            <button
                                onClick={() => setSelectedType('video')}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:gap-2 sm:px-4 sm:text-sm ${
                                    selectedType === 'video'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Video Consultation</span>
                                <span className="sm:hidden">Video</span>
                            </button>
                            <button
                                onClick={() => setSelectedType('in-person')}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:gap-2 sm:px-4 sm:text-sm ${
                                    selectedType === 'in-person'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                In-Person
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Main Content */}
                <div className="relative grid gap-6 lg:grid-cols-12">
                    {/* Overlay for mobile filter menu */}
                    {isFilterOpen && (
                        <div
                            className="absolute inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                            onClick={() => setIsFilterOpen(false)}
                        ></div>
                    )}

                    {/* Sidebar - Specialties */}
                    <div
                        className={`fixed inset-y-0 left-0 z-50 w-80 transform overflow-y-auto border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:col-span-3 lg:sticky lg:top-20 lg:z-auto lg:w-auto lg:translate-x-0 lg:self-start lg:shadow-none ${
                            isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        {/* Mobile Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <Filter className="h-5 w-5 text-green-600" />
                                Specialties
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <Card className="border-0 p-4 lg:border lg:shadow-sm">
                            <h3 className="mb-4 hidden items-center gap-2 text-sm font-bold text-gray-900 lg:flex">
                                <Filter className="h-4 w-4 text-green-600" />
                                Specialties
                            </h3>
                            <div className="space-y-2">
                                {specialties.map((specialty) => (
                                    <button
                                        key={specialty.id}
                                        onClick={() => handleSpecialtySelect(specialty.id)}
                                        className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                                            selectedSpecialty === specialty.id
                                                ? 'border-2 border-green-500 bg-gradient-to-r from-green-100 to-emerald-100 shadow-md'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="text-xl">{specialty.icon}</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {specialty.name}
                                        </span>
                                        {selectedSpecialty === specialty.id && (
                                            <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Clear Filter Button - Mobile Only */}
                            {selectedSpecialty !== 'all' && (
                                <Button
                                    onClick={() => {
                                        setSelectedSpecialty('all');
                                        setIsFilterOpen(false);
                                    }}
                                    variant="outline"
                                    className="mt-4 w-full lg:hidden"
                                >
                                    Clear Specialty Filter
                                </Button>
                            )}
                        </Card>
                    </div>

                    {/* Doctors Grid */}
                    <div className="relative z-10 lg:col-span-9">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctors
                                {selectedSpecialty !== 'all' && (
                                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                        {specialties.find(s => s.id === selectedSpecialty)?.name}
                                        <button
                                            onClick={() => setSelectedSpecialty('all')}
                                            className="ml-1 hover:text-green-900"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                )}
                            </p>
                            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200">
                                <option>Sort by Rating</option>
                                <option>Sort by Experience</option>
                                <option>Sort by Price</option>
                                <option>Sort by Availability</option>
                            </select>
                        </div>

                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-2">
                            {filteredDoctors.map((doctor) => (
                                <Card key={doctor.id} className="overflow-hidden transition-all hover:shadow-xl">
                                    {/* Doctor Header */}
                                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 p-4 text-white sm:p-6">
                                        <div className="absolute right-4 top-4">
                                            {doctor.verified && (
                                                <div className="rounded-full bg-white/20 p-1 backdrop-blur-sm">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-xl font-bold shadow-lg backdrop-blur-sm sm:h-20 sm:w-20 sm:text-2xl">
                                                {doctor.avatar}
                                            </div>
                                            <h3 className="text-center text-base font-bold sm:text-lg">
                                                {doctor.name}
                                            </h3>
                                            <p className="text-center text-xs text-green-100 sm:text-sm">
                                                {doctor.specialty}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400" />
                                    </div>

                                    {/* Doctor Details */}
                                    <div className="p-4 sm:p-6">
                                        {/* Rating and Reviews */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 sm:h-5 sm:w-5" />
                                                <span className="text-base font-bold text-gray-900 sm:text-lg">
                                                    {doctor.rating}
                                                </span>
                                                <span className="text-xs text-gray-600 sm:text-sm">
                                                    ({doctor.reviews})
                                                </span>
                                            </div>
                                            <div className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 sm:px-3">
                                                {doctor.availability}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="mb-4 grid grid-cols-2 gap-2 sm:gap-3">
                                            <div className="rounded-lg bg-blue-50 p-2.5 sm:p-3">
                                                <div className="flex items-center gap-2 text-blue-600">
                                                    <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    <span className="text-xs font-medium">Experience</span>
                                                </div>
                                                <p className="mt-1 text-sm font-bold text-gray-900">
                                                    {doctor.experience} years
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-purple-50 p-2.5 sm:p-3">
                                                <div className="flex items-center gap-2 text-purple-600">
                                                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    <span className="text-xs font-medium">Patients</span>
                                                </div>
                                                <p className="mt-1 text-sm font-bold text-gray-900">
                                                    {doctor.patients}+
                                                </p>
                                            </div>
                                        </div>

                                        {/* Location and Fee */}
                                        <div className="mb-4 space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                                                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-red-600 sm:h-4 sm:w-4" />
                                                <span className="line-clamp-1">{doctor.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                                                <Clock className="h-3.5 w-3.5 flex-shrink-0 text-blue-600 sm:h-4 sm:w-4" />
                                                Next available: {doctor.nextSlot}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                                                <DollarSign className="h-3.5 w-3.5 flex-shrink-0 text-green-600 sm:h-4 sm:w-4" />
                                                ${doctor.consultationFee} consultation fee
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <Link href={`/patient/appointments/book/${doctor.id}`} className="flex-1">
                                                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-xs hover:from-green-700 hover:to-emerald-700 sm:text-sm">
                                                    <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    Book Now
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="icon" className="flex-shrink-0">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        
                                        {/* View Profile Link */}
                                        <Link href={`/patient/doctors/${doctor.id}`}>
                                            <button className="mt-3 flex w-full items-center justify-center gap-1 text-xs font-medium text-green-600 hover:text-green-700 sm:text-sm">
                                                View Full Profile
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredDoctors.length === 0 && (
                            <Card className="p-8 sm:p-12">
                                <div className="flex flex-col items-center justify-center">
                                    <Stethoscope className="h-12 w-12 text-gray-300 sm:h-16 sm:w-16" />
                                    <p className="mt-4 text-base font-semibold text-gray-900 sm:text-lg">
                                        No doctors found
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Try adjusting your search or filters
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedSpecialty('all');
                                            setSelectedType('all');
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
                </div>
            </div>
        </AppLayout>
    );
}