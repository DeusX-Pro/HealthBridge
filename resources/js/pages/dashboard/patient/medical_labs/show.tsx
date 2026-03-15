import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import patient from '@/routes/patient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Beaker,
    MapPin,
    Phone,
    Clock,
    Star,
    ShieldCheck,
    FlaskConical,
    Microscope,
    ClipboardCheck,
    AlertCircle,
    BadgeCheck,
    ArrowLeft,
    CreditCard,
    Zap,
    Info,
    CheckCircle
} from 'lucide-react';

interface PageProps {
    lab: any;
    [key: string]: any;
}

export default function LabShow() {
    const { lab } = usePage<PageProps>().props;
    const [selectedService, setSelectedService] = useState<any>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/patient/dashboard' },
        { title: 'Medical Labs', href: patient.medicalLabs.index().url },
        { title: lab.name, href: patient.medicalLabs.show(lab.id).url },
    ];

    const { post, setData, processing } = useForm({
        service_id: '',
    });

    const handleOrder = (service: any) => {
        setData('service_id', service.id);
        post(patient.medicalLabs.order().url, {
            onSuccess: () => {
                setSelectedService(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${lab.name} - Services`} />

            <div className="flex flex-col gap-8 pb-12">
                {/* Lab Header */}
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-50 border border-blue-50">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
                    <div className="p-8 sm:p-10 relative z-10">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 shadow-xl shadow-blue-200">
                                <Microscope className="h-12 w-12 text-white" />
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                                        {lab.name}
                                    </h1>
                                    <span className="flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100">
                                        <BadgeCheck className="h-3.5 w-3.5" />
                                        Verified Provider
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                            <p className="text-sm font-semibold text-gray-700">{lab.address}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                                            <p className="text-sm font-semibold text-gray-700">{lab.phone || 'In-App Messaging'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Star className="h-5 w-5 text-yellow-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Rating</p>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-bold text-gray-900">4.9</span>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Test Services List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <FlaskConical className="h-7 w-7 text-blue-600" />
                                Available Tests & Services
                            </h2>
                            <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-lg">
                                {lab.services?.length || 0} Tests
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {lab.services?.map((service: any) => (
                                <Card
                                    key={service.id}
                                    className={`group cursor-pointer overflow-hidden border-none shadow-md transition-all hover:shadow-xl ${
                                        selectedService?.id === service.id ? 'ring-2 ring-blue-600 scale-[1.01]' : ''
                                    }`}
                                    onClick={() => setSelectedService(service)}
                                >
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500">
                                                <Beaker className="h-7 w-7 text-blue-500 group-hover:text-white transition-colors duration-500" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-black text-gray-900">
                                                        {service.name}
                                                    </h3>
                                                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                                                        {service.category}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm font-bold">
                                                    <span className="text-blue-600">₦ {parseFloat(service.price).toLocaleString()}</span>
                                                    <span className="text-gray-400 flex items-center gap-1">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {service.duration || '24-48 Hours'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant={selectedService?.id === service.id ? 'default' : 'outline'}
                                                className={`h-11 px-6 rounded-xl font-bold transition-all ${
                                                    selectedService?.id === service.id 
                                                    ? 'bg-blue-600 shadow-lg shadow-blue-200' 
                                                    : 'border-gray-100 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
                                                }`}
                                            >
                                                {selectedService?.id === service.id ? 'Selected' : 'Select Test'}
                                            </Button>
                                        </div>
                                    </div>
                                    {service.description && (
                                        <div className={`px-6 pb-6 pt-0 text-sm text-gray-500 leading-relaxed ${selectedService?.id === service.id ? 'block' : 'hidden md:block'}`}>
                                            {service.description}
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Order Sidebar */}
                    <div className="space-y-6">
                        <Card className="sticky top-6 p-8 border-none shadow-2xl bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                    <CreditCard className="h-6 w-6 text-blue-400" />
                                    Order Summary
                                </h3>

                                {selectedService ? (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                                            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Selected Test</p>
                                            <p className="text-lg font-black leading-tight mb-2">{selectedService.name}</p>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-blue-200">Processing Fee</span>
                                                <span className="font-bold">Included</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400 font-bold">Subtotal</span>
                                                <span className="font-bold">₦ {parseFloat(selectedService.price).toLocaleString()}</span>
                                            </div>
                                            <div className="h-px bg-white/10" />
                                            <div className="flex items-center justify-between text-xl font-black">
                                                <span>Total</span>
                                                <span className="text-blue-400">₦ {parseFloat(selectedService.price).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-3 text-xs leading-relaxed text-blue-100">
                                            <Zap className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                            <p>This order will be deducted from your HealthBridge wallet once confirmed by the laboratory.</p>
                                        </div>

                                        <Button
                                            onClick={() => handleOrder(selectedService)}
                                            disabled={processing}
                                            className="w-full h-14 bg-blue-500 hover:bg-blue-400 text-white text-lg font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
                                        >
                                            {processing ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Processing...
                                                </div>
                                            ) : (
                                                'Pay & Book Test'
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 flex flex-col items-center gap-4">
                                        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                            <Beaker className="h-10 w-10 text-white/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-lg font-black text-white/80">Empty Bucket</p>
                                            <p className="text-sm text-gray-400 px-4">Select a diagnostic service from the list to proceed with your booking.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Lab Info Card */}
                        <Card className="p-6 border-none shadow-md bg-blue-50/50">
                            <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                Preparation Guide
                            </h4>
                            <ul className="space-y-3">
                                {[
                                    'Fast for at least 8 hours for blood work',
                                    'Bring a valid ID for verification',
                                    'Arrive 15 minutes before your schedule',
                                    'Digital results available within 48 hours'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-2 text-sm font-semibold text-blue-800">
                                        <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
