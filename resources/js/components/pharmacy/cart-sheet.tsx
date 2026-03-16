import React from 'react';
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetDescription,
    SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { ShoppingCart, Trash2, Plus, Minus, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { router } from '@inertiajs/react';

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({ open, onOpenChange }) => {
    const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();

    const handleCheckout = () => {
        onOpenChange(false);
        router.get('/patient/pharmacy/checkout');
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-none rounded-l-[2.5rem] overflow-hidden">
                <SheetHeader className="p-6 bg-slate-900 text-white">
                    <SheetTitle className="text-2xl font-black flex items-center gap-3 text-white">
                        <ShoppingBag className="w-8 h-8 text-primary" />
                        My Pharmacy Cart
                    </SheetTitle>
                    <SheetDescription className="text-slate-400 font-medium pt-1">
                        You have {itemCount} items from different pharmacies.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                    {items.length > 0 ? (
                        <>
                            {/* Group items by pharmacy if needed, but for now just list them */}
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex gap-4 group transition-all hover:border-primary/20">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/5 transition-colors">
                                            <Package className="w-8 h-8 text-slate-300 group-hover:text-primary/40" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">{item.pharmacy_name}</p>
                                            <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                                            <p className="text-lg font-black text-slate-900 mt-1">₦{Number(item.price).toLocaleString()}</p>
                                            
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 rounded-lg hover:bg-white hover:text-primary"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-black text-slate-900">{item.quantity}</span>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 rounded-lg hover:bg-white hover:text-primary"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button 
                                variant="ghost" 
                                className="w-full text-slate-400 hover:text-red-500 font-bold py-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-red-100 transition-all"
                                onClick={clearCart}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear Shopping Cart
                            </Button>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6">
                                <ShoppingCart className="w-12 h-12 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
                                Browse our pharmacies and add medicines to your cart.
                            </p>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-8 bg-white border-t border-slate-100 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
                                <p className="text-3xl font-black text-slate-900">₦{total.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Items</p>
                                <p className="text-xl font-bold text-primary">{itemCount}</p>
                            </div>
                        </div>

                        <Button 
                            className="w-full h-16 rounded-[1.25rem] bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
