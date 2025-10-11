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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Find Doctors" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Stethoscope className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Find Your Doctor
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
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
                <Card className="p-6">
                    <div className="flex flex-col gap-4">
                        {/* Search Bar */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex flex-1 items-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by doctor name or specialty..."
                                    className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    selectedType === 'all'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                All Types
                            </button>
                            <button
                                onClick={() => setSelectedType('video')}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    selectedType === 'video'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Video className="h-4 w-4" />
                                Video Consultation
                            </button>
                            <button
                                onClick={() => setSelectedType('in-person')}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                                    selectedType === 'in-person'
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <MapPin className="h-4 w-4" />
                                In-Person
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Sidebar - Specialties */}
                    <div className="lg:col-span-3">
                        <Card className="p-4">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
                                <Filter className="h-4 w-4 text-green-600" />
                                Specialties
                            </h3>
                            <div className="space-y-2">
                                {specialties.map((specialty) => (
                                    <button
                                        key={specialty.id}
                                        onClick={() => setSelectedSpecialty(specialty.id)}
                                        className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                                            selectedSpecialty === specialty.id
                                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 shadow-md'
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
                        </Card>

                        {/* Featured Doctor */}
                        {/* <Card className="mt-4 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <Award className="h-5 w-5 text-amber-600" />
                                <h3 className="text-sm font-bold text-gray-900">
                                    Top Rated Doctor
                                </h3>
                            </div>
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-sm font-bold text-white">
                                        SJ
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            Dr. Sarah Johnson
                                        </p>
                                        <p className="text-xs text-gray-600">Cardiologist</p>
                                    </div>
                                </div>
                                <div className="mb-3 flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-gray-900">4.9</span>
                                    <span className="text-xs text-gray-600">(234 reviews)</span>
                                </div>
                                <Button className="w-full bg-amber-600 hover:bg-amber-700" size="sm">
                                    Book Appointment
                                </Button>
                            </div>
                        </Card> */}
                    </div>

                    {/* Doctors Grid */}
                    <div className="lg:col-span-9">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctors
                            </p>
                            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200">
                                <option>Sort by Rating</option>
                                <option>Sort by Experience</option>
                                <option>Sort by Price</option>
                                <option>Sort by Availability</option>
                            </select>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredDoctors.map((doctor) => (
                                <Card key={doctor.id} className="overflow-hidden transition-all hover:shadow-xl">
                                    {/* Doctor Header */}
                                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-white">
                                        <div className="absolute right-4 top-4">
                                            {doctor.verified && (
                                                <div className="rounded-full bg-white/20 p-1 backdrop-blur-sm">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold shadow-lg backdrop-blur-sm">
                                                {doctor.avatar}
                                            </div>
                                            <h3 className="text-center text-lg font-bold">
                                                {doctor.name}
                                            </h3>
                                            <p className="text-center text-sm text-green-100">
                                                {doctor.specialty}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400" />
                                    </div>

                                    {/* Doctor Details */}
                                    <div className="p-6">
                                        {/* Rating and Reviews */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-lg font-bold text-gray-900">
                                                    {doctor.rating}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    ({doctor.reviews})
                                                </span>
                                            </div>
                                            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                {doctor.availability}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="mb-4 grid grid-cols-2 gap-3">
                                            <div className="rounded-lg bg-blue-50 p-3">
                                                <div className="flex items-center gap-2 text-blue-600">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span className="text-xs font-medium">Experience</span>
                                                </div>
                                                <p className="mt-1 text-sm font-bold text-gray-900">
                                                    {doctor.experience} years
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-purple-50 p-3">
                                                <div className="flex items-center gap-2 text-purple-600">
                                                    <Users className="h-4 w-4" />
                                                    <span className="text-xs font-medium">Patients</span>
                                                </div>
                                                <p className="mt-1 text-sm font-bold text-gray-900">
                                                    {doctor.patients}+
                                                </p>
                                            </div>
                                        </div>

                                        {/* Location and Fee */}
                                        <div className="mb-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="h-4 w-4 text-red-600" />
                                                {doctor.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="h-4 w-4 text-blue-600" />
                                                Next available: {doctor.nextSlot}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <DollarSign className="h-4 w-4 text-green-600" />
                                                ${doctor.consultationFee} consultation fee
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <Link href={`/patient/appointments/book/${doctor.id}`} className="flex-1">
                                                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Book Now
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="icon">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        
                                        {/* View Profile Link */}
                                        <Link href={`/patient/doctors/${doctor.id}`}>
                                            <button className="mt-3 flex w-full items-center justify-center gap-1 text-sm font-medium text-green-600 hover:text-green-700">
                                                View Full Profile
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredDoctors.length === 0 && (
                            <Card className="p-12">
                                <div className="flex flex-col items-center justify-center">
                                    <Stethoscope className="h-16 w-16 text-gray-300" />
                                    <p className="mt-4 text-lg font-semibold text-gray-900">
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