import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PatientLayout from '@/layouts/patient-layout';
import { 
    User, 
    MapPin, 
    Phone, 
    Clock, 
    Star, 
    Calendar,
    ChevronRight, 
    CheckCircle2,
    ArrowLeft,
    Award,
    Stethoscope,
    GraduationCap,
    Heart,
    Shield,
    Video,
    MessageSquare,
    PhoneCall
} from 'lucide-react';

interface Doctor {
    id: number;
    uuid: string;
    title: string | null;
    specialization: string | null;
    years_of_experience: string | null;
    hospital_affiliation: string | null;
    bio: string | null;
    consultation_fee: string | number;
    consultation_type: string | null;
    consultation_duration: number | null;
    city: string | null;
    state: string | null;
    user: {
        name: string;
        email: string;
        phone_number: string | null;
    };
}

interface PageProps {
    doctor: Doctor;
    [key: string]: any;
}

export default function DoctorShow() {
    const { doctor } = usePage<PageProps>().props;

    const consultationTypes = doctor.consultation_type ? doctor.consultation_type.split(',').map(t => t.trim()) : ['Video', 'Chat'];

    return (
        <PatientLayout>
            <Head title={`Dr. ${doctor.user.name} - Profile`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Link */}
                <Link 
                    href="/patient/doctors"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Doctors
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Profile Section */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 overflow-hidden relative">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                            
                            <div className="relative flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-50 rounded-3xl flex items-center justify-center flex-shrink-0 border-4 border-white shadow-xl overflow-hidden group">
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <User className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-black text-slate-900 leading-tight">
                                            {doctor.title || 'Dr.'} {doctor.user.name}
                                        </h1>
                                        <div className="flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" />
                                            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Verified Professional</span>
                                        </div>
                                    </div>

                                    <p className="text-xl font-bold text-primary mb-4">{doctor.specialization || 'General Practitioner'}</p>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience</span>
                                            <div className="flex items-center text-slate-700 font-bold">
                                                <Award className="w-4 h-4 text-amber-500 mr-2" />
                                                {doctor.years_of_experience || '5+'} Years
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ratings</span>
                                            <div className="flex items-center text-slate-700 font-bold">
                                                <Star className="w-4 h-4 text-amber-400 mr-2 fill-amber-400" />
                                                4.9 (2k+ reviews)
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consult Fee</span>
                                            <div className="flex items-center text-slate-900 font-black text-lg">
                                                ₦{Number(doctor.consultation_fee).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio / About */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-6 bg-primary rounded-full mr-3" />
                                Professional Biography
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {doctor.bio || `Dr. ${doctor.user.name} is a dedicated ${doctor.specialization || 'medical professional'} with extensive experience in providing high-quality patient care. Committed to staying at the forefront of medical advancements to ensure the best outcomes for every patient.`}
                            </p>
                            
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                                            <Stethoscope className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900">Hospital Affiliation</h3>
                                    </div>
                                    <p className="text-slate-600 font-medium">
                                        {doctor.hospital_affiliation || 'General Medical Center, Lagos'}
                                    </p>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900">Education</h3>
                                    </div>
                                    <p className="text-slate-600 font-medium">
                                        MBBS, PhD - Medical University
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Services / Expertise */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                                <span className="w-1.5 h-6 bg-primary rounded-full mr-3" />
                                Specialized Services
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {['Consultation', 'Diagnosis', 'Prevention', 'Testing', 'Treatment Plan'].map((service) => (
                                    <span key={service} className="px-5 py-2.5 rounded-xl bg-primary/5 text-primary font-bold text-sm border border-primary/10">
                                        {service}
                                    </span >
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Appointment Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-slate-900/20 text-white overflow-hidden sticky top-8">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                            
                            <h3 className="text-2xl font-black mb-6 relative">Book Appointment</h3>
                            
                            <div className="space-y-6 mb-8 relative">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Availability</p>
                                        <p className="font-bold text-sm">Mon - Fri, 9am - 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consultation</p>
                                        <p className="font-bold text-sm">{consultationTypes.join(' & ')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 relative">
                                <button className="w-full py-4 rounded-2xl bg-primary text-white font-black hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-2 group">
                                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Schedule Meeting
                                </button>
                                <button className="w-full py-4 rounded-2xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/5 active:scale-95">
                                    Send Message
                                </button>
                            </div>

                            <p className="text-center text-xs text-slate-500 mt-6 font-medium">
                                Secure & Private Healthcare
                            </p>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="bg-blue-600 rounded-3xl p-8 text-white">
                            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                                <Video className="w-5 h-5" />
                                Virtual Clinic
                            </h4>
                            <p className="text-blue-100 text-sm leading-relaxed mb-6 font-medium">
                                Get medical advice from the comfort of your home. Video consultations now available.
                            </p>
                            <Link 
                                href="#"
                                className="inline-flex items-center text-sm font-bold bg-white text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
                            >
                                Learn More
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
