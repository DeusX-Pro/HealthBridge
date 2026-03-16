import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import PatientLayout from '@/layouts/patient-layout';
import { 
    Store, 
    MapPin, 
    Phone, 
    Clock, 
    Star, 
    Search, 
    Filter, 
    ShoppingBag, 
    ChevronRight, 
    Info, 
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    X,
    CreditCard,
    Package,
    Plus
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

interface Medicine {
    id: number;
    uuid: string;
    name: string;
    generic_name: string | null;
    dosage_form: string;
    strength: string | null;
    description: string | null;
    price: string | number;
    stock: number;
    category?: {
        name: string;
    };
    brand?: {
        name: string;
    };
}

interface Pharmacy {
    id: number;
    uuid: string;
    business_name: string;
    address: string;
    city: string;
    state: string;
    status: string;
    user: {
        name: string;
        email: string;
        phone_number: string | null;
    };
    medicines: Medicine[];
}

interface PageProps {
    pharmacy: Pharmacy;
    [key: string]: any;
}

export default function PharmacyShow() {
    const { pharmacy } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const { addToCart } = useCart();
    
    // Purchase Flow State
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [addedId, setAddedId] = useState<number | null>(null);

    const categories = ['All', ...Array.from(new Set(pharmacy.medicines.map(m => m.category?.name).filter(Boolean)))];

    const filteredMedicines = pharmacy.medicines.filter(medicine => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            medicine.generic_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || medicine.category?.name === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (medicine: Medicine) => {
        addToCart({
            id: medicine.id,
            uuid: medicine.uuid,
            name: medicine.name,
            price: medicine.price,
            pharmacy_id: pharmacy.id,
            pharmacy_name: pharmacy.business_name
        });
        setAddedId(medicine.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    const handleCheckout = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setIsCheckoutOpen(true);
    };

    const handleConfirmPurchase = () => {
        if (!deliveryAddress) {
            alert('Please enter a delivery address');
            return;
        }

        setIsProcessing(true);
        router.post('/patient/pharmacy/orders', {
            pharmacy_id: pharmacy.id,
            order_type: 'direct',
            delivery_address: deliveryAddress,
            items: [
                {
                    medicine_id: selectedMedicine?.id,
                    quantity: 1
                }
            ]
        }, {
            onFinish: () => {
                setIsProcessing(false);
                setIsCheckoutOpen(false);
            }
        });
    };

    return (
        <PatientLayout>
            <Head title={`${pharmacy.business_name} - Products`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Navigation */}
                <div className="mb-8">
                    <Link 
                        href="/patient/pharmacies"
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Pharmacies
                    </Link>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 overflow-hidden relative">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full -ml-24 -mb-24 blur-3xl pointer-events-none" />

                        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                                    <Store className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{pharmacy.business_name}</h1>
                                        <div className="flex items-center px-2 py-0.5 rounded-full bg-green-50 border border-green-100">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-1" />
                                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Verified</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center text-slate-500 text-sm">
                                            <MapPin className="w-4 h-4 mr-1.5 text-primary/60" />
                                            {pharmacy.address}, {pharmacy.city}, {pharmacy.state}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-medium">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-amber-400 mr-1 fill-amber-400" />
                                                4.8 (120+ reviews)
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 text-primary/60 mr-1.5" />
                                                Open 24/7
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-primary/60 mr-1.5" />
                                                {pharmacy.user.phone_number || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group">
                                <Info className="w-4 h-4 mr-2" />
                                Contact Pharmacy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text"
                            placeholder="Search medicines, generic names..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map((category: any) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3.5 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                                    selectedCategory === category
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50 hover:text-primary'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMedicines.map((medicine) => (
                            <div 
                                key={medicine.id} 
                                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="p-2">
                                    <div className="aspect-[4/3] bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:bg-primary/5 transition-colors">
                                        <ShoppingBag className="w-12 h-12 text-slate-300 group-hover:scale-110 group-hover:text-primary/30 transition-all duration-500" />
                                        
                                        {/* Tags */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur shadow-sm text-[10px] font-bold text-primary uppercase tracking-wider border border-primary/10">
                                                {medicine.dosage_form}
                                            </span>
                                            {medicine.stock < 20 && (
                                                <span className="px-2.5 py-1 rounded-lg bg-red-50 text-[10px] font-bold text-red-600 uppercase tracking-wider border border-red-100">
                                                    Low Stock
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="absolute top-3 right-3">
                                            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors">
                                                <Star className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 pt-2 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                            {medicine.brand?.name || 'Generic'}
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                            {medicine.name}
                                        </h3>
                                        {medicine.strength && (
                                            <p className="text-xs text-slate-500 font-medium">{medicine.strength}</p>
                                        )}
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</span>
                                                <span className="text-xl font-black text-slate-900">
                                                    ₦{Number(medicine.price).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock</span>
                                                <span className={`text-sm font-bold ${medicine.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {medicine.stock > 0 ? `${medicine.stock} units` : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            disabled={medicine.stock === 0}
                                            onClick={() => handleAddToCart(medicine)}
                                            className={`w-full py-3 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden relative ${
                                                addedId === medicine.id 
                                                ? 'bg-green-600 text-white' 
                                                : 'bg-slate-900 text-white hover:bg-primary'
                                            }`}
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                {addedId === medicine.id ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                                        Added to Cart
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add to Cart
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">No medicines found</h2>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            We couldn't find any medicines matching your search criteria in this pharmacy.
                        </p>
                        <button 
                            onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl p-0 overflow-hidden border-none">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-2xl font-black text-slate-900">Confirm Purchase</DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium pt-1">
                            Complete your order for this medicine.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedMedicine && (
                        <div className="p-6 space-y-6">
                            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                    <Package className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 leading-tight">{selectedMedicine.name}</h4>
                                    <p className="text-xs font-medium text-slate-500">{selectedMedicine.dosage_form} • {selectedMedicine.brand?.name || 'Generic'}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
                                    <p className="font-black text-slate-900">₦{Number(selectedMedicine.price).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Delivery Address</label>
                                    <textarea 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-24 text-sm font-medium"
                                        placeholder="Enter your clinical or home address for delivery..."
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                    />
                                </div>

                                <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 border border-amber-100">
                                    <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                    <p className="text-xs text-amber-700 font-medium leading-relaxed">
                                        Payment will be deducted from your HealthBridge wallet balance upon delivery or confirmation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button 
                                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                                    onClick={handleConfirmPurchase}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Processing Order...' : 'Confirm Order'}
                                    {!isProcessing && <ChevronRight className="ml-2 w-5 h-5" />}
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-12 rounded-xl text-slate-500 font-bold hover:bg-slate-50"
                                    onClick={() => setIsCheckoutOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </PatientLayout>
    );
}
