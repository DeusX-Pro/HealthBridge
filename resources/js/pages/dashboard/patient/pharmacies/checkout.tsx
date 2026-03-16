import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import PatientLayout from '@/layouts/patient-layout';
import { useCart } from '@/contexts/cart-context';
import { 
    ShoppingBag, 
    MapPin, 
    CreditCard, 
    ChevronRight, 
    ArrowLeft,
    CheckCircle2,
    Package,
    AlertCircle,
    Truck,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Checkout() {
    const { items, total, itemCount, clearCart } = useCart();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handlePlaceOrder = () => {
        if (!deliveryAddress) {
            alert('Please enter a delivery address');
            return;
        }

        setIsProcessing(true);

        // Group items by pharmacy since the backend expects pharmacy_id
        // However, the current backend store method takes one pharmacy_id.
        // If we have items from multiple pharmacies, we might need to send multiple requests
        // or update the backend. 
        // For simplicity, let's group by pharmacy and send requests for each.
        
        const pharmacyGroups = items.reduce((groups, item) => {
            const group = groups[item.pharmacy_id] || [];
            group.push(item);
            groups[item.pharmacy_id] = group;
            return groups;
        }, {} as Record<number, typeof items>);

        const promises = Object.entries(pharmacyGroups).map(([pharmacyId, pharmacyItems]) => {
            return new Promise((resolve, reject) => {
                router.post('/patient/pharmacy/orders', {
                    pharmacy_id: parseInt(pharmacyId),
                    order_type: 'direct',
                    delivery_address: deliveryAddress,
                    items: pharmacyItems.map(item => ({
                        medicine_id: item.id,
                        quantity: item.quantity
                    }))
                }, {
                    onSuccess: () => resolve(true),
                    onError: () => reject(false),
                    preserveScroll: true,
                });
            });
        });

        Promise.all(promises).then(() => {
            setIsProcessing(false);
            setOrderSuccess(true);
            clearCart();
        }).catch(() => {
            setIsProcessing(false);
            alert('Something went wrong with your order.');
        });
    };

    if (orderSuccess) {
        return (
            <PatientLayout>
                <Head title="Order Successful" />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Order Placed Successfully!</h1>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
                        Your orders have been sent to the respective pharmacies. You can track your order status in the Pharmacy Orders dashboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/patient/pharmacy/orders">
                            <Button className="h-14 rounded-2xl px-8 bg-slate-900 font-bold">
                                View My Orders
                            </Button>
                        </Link>
                        <Link href="/patient/pharmacies">
                            <Button variant="outline" className="h-14 rounded-2xl px-8 font-bold border-2">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </PatientLayout>
        );
    }

    return (
        <PatientLayout>
            <Head title="Checkout" />

            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <Link 
                        href="/patient/pharmacies"
                        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Shopping
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900">Checkout</h1>
                    <p className="text-slate-500 font-medium">Complete your order to receive your medications.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Delivery Information */}
                        <Card className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-slate-100/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900">Delivery Information</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Delivery Address</label>
                                    <textarea 
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-primary focus:bg-white outline-none transition-all resize-none h-32 text-sm font-medium"
                                        placeholder="Enter your clinical or home address for delivery..."
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                    />
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 border border-blue-100">
                                    <Truck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                        Once your order is accepted, the pharmacy will dispatch it through our verified logistics partners.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Order Summary Items */}
                        <Card className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-slate-100/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900">Review Ordered Items</h2>
                            </div>

                            <div className="space-y-4">
                                {items.length > 0 ? items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 group transition-colors hover:bg-white cursor-default">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <ShoppingBag className="w-8 h-8 text-slate-200" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">{item.pharmacy_name}</p>
                                            <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                                            <p className="text-xs font-semibold text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900">₦{(Number(item.price) * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8">
                                        <p className="text-slate-400 font-bold">Your cart is empty.</p>
                                        <Link href="/patient/pharmacies" className="text-primary hover:underline mt-2 inline-block">Go shop now</Link>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Payment & Order Button */}
                    <div className="space-y-6">
                        <Card className="p-8 rounded-[2.5rem] border-none shadow-xl shadow-slate-100/50 bg-slate-900 text-white sticky top-8">
                            <h2 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="font-bold">Subtotal ({itemCount} items)</span>
                                    <span className="font-black text-white">₦{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="font-bold">Delivery Fee</span>
                                    <span className="font-black text-white">Calculated later</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-xl font-black">Total</span>
                                    <span className="text-2xl font-black text-primary animate-pulse">₦{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        <p className="text-sm font-black uppercase tracking-widest">Payment Method</p>
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                        Payment will be handled via your HealthBridge wallet upon order confirmation.
                                    </p>
                                </div>

                                <Button 
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/95 text-white font-black text-lg shadow-xl shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing || items.length === 0}
                                >
                                    {isProcessing ? 'Processing Order...' : 'Place My Order'}
                                    {!isProcessing && <ChevronRight className="ml-2 w-5 h-5" />}
                                </Button>
                                
                                <div className="flex items-center gap-2 justify-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                    <Info className="w-3 h-3" />
                                    Secure Checkout
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}
