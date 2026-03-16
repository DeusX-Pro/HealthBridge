import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PatientLayout from '@/layouts/patient-layout';
import { 
    Calendar, 
    MapPin, 
    ArrowLeft,
    CheckCircle2,
    Clock,
    X,
    Package,
    Store,
    CreditCard,
    MessageSquare,
    AlertCircle,
    ShoppingBag,
    Printer
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OrderItem {
    id: number;
    medicine: {
        name: string;
        dosage_form: string;
        strength: string;
    };
    quantity: number;
    unit_price: string | number;
    subtotal: string | number;
}

interface Order {
    id: number;
    uuid: string;
    pharmacy: {
        uuid: string;
        business_name: string;
        address: string;
        city: string;
        state: string;
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
    order: Order;
}

export default function OrderDetails({ order }: Props) {
    const getStatusConfig = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', icon: Clock, label: 'Pending Approval' };
            case 'processing': return { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', icon: Package, label: 'In Preparation' };
            case 'shipped': return { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-100', icon: ShoppingBag, label: 'In Transit' };
            case 'delivered': return { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100', icon: CheckCircle2, label: 'Delivered' };
            case 'cancelled': return { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-100', icon: X, label: 'Cancelled' };
            default: return { color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-100', icon: Package, label: status };
        }
    };

    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
        <PatientLayout>
            <Head title={`Order #${order.id} Details - HealthBridge`} />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <Link 
                        href="/patient/pharmacy/orders"
                        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Orders
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 leading-tight">Order Details</h1>
                            <p className="text-slate-500 font-medium">Order ID: <span className="text-slate-900 font-bold">#{order.id}</span></p>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline" className="rounded-xl font-bold bg-white">
                                <Printer className="w-4 h-4 mr-2" />
                                Print Invoice
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Status Card */}
                        <Card className={`p-6 rounded-[2rem] border-none shadow-sm ${statusConfig.bg}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm ${statusConfig.color}`}>
                                        <StatusIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Shipment Status</p>
                                        <h3 className={`text-xl font-black ${statusConfig.color}`}>{statusConfig.label}</h3>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date Placed</p>
                                    <p className="font-bold text-slate-700">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Order Items */}
                        <Card className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-slate-100/50">
                            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <Package className="w-6 h-6 text-primary" />
                                Ordered Medicines
                            </h2>
                            <div className="space-y-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 text-sm">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                                            <ShoppingBag className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-slate-900 truncate">{item.medicine.name}</h4>
                                            <p className="text-xs font-medium text-slate-500">{item.medicine.strength} • {item.medicine.dosage_form}</p>
                                            <p className="text-xs font-bold text-primary mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-slate-400">₦{Number(item.unit_price).toLocaleString()} ea</p>
                                            <p className="font-black text-slate-900">₦{Number(item.subtotal).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Pharmacy Note / Rejection Reason */}
                        {(order.pharmacy_note || order.rejection_reason) && (
                            <div className="space-y-4">
                                {order.pharmacy_note && (
                                    <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-blue-50 border border-blue-100">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                                                <MessageSquare className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-blue-900">Note from Pharmacy</h4>
                                                <p className="text-sm text-blue-800 leading-relaxed mt-1">{order.pharmacy_note}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                                {order.rejection_reason && (
                                    <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-red-50 border border-red-100">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-900">Order Rejection Reason</h4>
                                                <p className="text-sm text-red-800 leading-relaxed mt-1">{order.rejection_reason}</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <Card className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-slate-100/50 bg-slate-900 text-white">
                            <h3 className="text-lg font-black mb-6 border-b border-white/10 pb-4">Payment Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-slate-400 text-sm">
                                    <span className="font-bold">Items Subtotal</span>
                                    <span className="font-black text-white">₦{Number(order.total_amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400 text-sm">
                                    <span className="font-bold">Delivery Fee</span>
                                    <span className="font-black text-white">₦0</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="font-black">Total Paid</span>
                                    <span className="text-xl font-black text-primary">₦{Number(order.total_amount).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    <span className="text-xs font-black uppercase tracking-widest">Payment Method</span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium">HealthBridge Wallet</p>
                            </div>
                        </Card>

                        {/* Pharmacy Card */}
                        <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-white">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Pharmacy Details</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Store className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{order.pharmacy.business_name}</h4>
                                    <p className="text-[10px] text-slate-500">{order.pharmacy.city}, {order.pharmacy.state}</p>
                                </div>
                            </div>
                            <div className="space-y-3 pt-4 border-t border-slate-50">
                                <Link 
                                    href={`/patient/pharmacies/${order.pharmacy.uuid}`}
                                    className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
                                >
                                    Visit Pharmacy
                                </Link>
                            </div>
                        </Card>

                        {/* Delivery Card */}
                        <Card className="p-6 rounded-[2rem] border-none shadow-sm bg-white">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Delivery Address</h3>
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-slate-300 shrink-0" />
                                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                    {order.delivery_address}
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
