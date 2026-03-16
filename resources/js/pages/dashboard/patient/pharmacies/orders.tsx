import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PatientLayout from '@/layouts/patient-layout';
import { 
    ShoppingBag, 
    Calendar, 
    MapPin, 
    ChevronRight, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    Package,
    ArrowLeft,
    MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface OrderItem {
    id: number;
    medicine: {
        name: string;
        dosage_form: string;
    };
    quantity: number;
    unit_price: string | number;
    subtotal: string | number;
}

interface Order {
    id: number;
    uuid: string;
    pharmacy: {
        business_name: string;
    };
    status: string;
    total_amount: string | number;
    created_at: string;
    delivery_address: string;
    items: OrderItem[];
    rejection_reason?: string;
    pharmacy_note?: string;
}

interface Props {
    orders: Order[];
}

export default function PharmacyOrders({ orders }: Props) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'processing': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'completed': return 'bg-green-50 text-green-700 border-green-100';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    return (
        <PatientLayout>
            <Head title="Pharmacy Orders - HealthBridge" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pharmacy Orders</h1>
                        <p className="mt-1 text-sm font-medium text-slate-500">Track and manage your medicine purchases</p>
                    </div>
                    <Link 
                        href="/patient/pharmacies"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Buy Medicines
                    </Link>
                </div>

                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <Card key={order.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                <Package className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{order.pharmacy.business_name}</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-1">Total Amount</p>
                                                <p className="text-lg font-black text-slate-900">₦{Number(order.total_amount).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                                        <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                                            <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                                            <span>{order.delivery_address}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                            {item.quantity}x
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">{item.medicine.name}</p>
                                                            <p className="text-[10px] font-medium text-slate-500">{item.medicine.dosage_form}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-black text-slate-900">₦{Number(item.subtotal).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {(order.pharmacy_note || order.rejection_reason) && (
                                        <div className="mb-6 space-y-3">
                                            {order.pharmacy_note && (
                                                <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                                    <MessageSquare className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Note from Pharmacy</p>
                                                        <p className="text-sm text-blue-800 font-medium">{order.pharmacy_note}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {order.rejection_reason && (
                                                <div className="flex gap-3 p-4 rounded-2xl bg-red-50 border border-red-100">
                                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Rejection Reason</p>
                                                        <p className="text-sm text-red-800 font-medium">{order.rejection_reason}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors">
                                            Track Order
                                        </button>
                                        <Link 
                                            href={`/patient/pharmacy/orders/${order.uuid}`}
                                            className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors inline-block"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <Card className="p-16 text-center border-none shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Package className="w-10 h-10 text-slate-200" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h2>
                            <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                You haven't placed any pharmacy orders yet. Your order history will appear here.
                            </p>
                            <Link 
                                href="/patient/pharmacies"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                <ShoppingBag className="w-5 h-5 mr-2" />
                                Browse Medicines
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </PatientLayout>
    );
}
