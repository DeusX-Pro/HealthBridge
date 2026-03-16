import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ShoppingCart,
    Search,
    CheckCircle2,
    Clock,
    X,
    Eye,
    Package,
    MessageSquare,
    Send,
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Orders', href: '/pharmacy/orders' },
];

interface OrderItem {
    id: number;
    medicine: {
        name: string;
    };
    quantity: number;
    unit_price: number;
    subtotal: number;
}

interface Order {
    id: number;
    uuid: string;
    patient: {
        user: {
            name: string;
            email: string;
            phone_number: string | null;
        }
    };
    items: OrderItem[];
    total_amount: number;
    status: string;
    created_at: string;
    delivery_address: string;
    rejection_reason?: string;
    pharmacy_note?: string;
}

export default function OrdersPage() {
    const { orders } = usePage<{ orders: Order[] }>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState<Order | null>(null);
    const [noteType, setNoteType] = useState<'rejection' | 'note'>('note');

    const { put, setData, processing, reset, data } = useForm({
        status: '',
        rejection_reason: '',
        pharmacy_note: '',
    });

    const updateOrderStatus = (id: number, newStatus: string, rejectionReason?: string, pharmacyNote?: string) => {
        setData(data => ({
            ...data,
            status: newStatus,
            rejection_reason: rejectionReason || '',
            pharmacy_note: pharmacyNote || '',
        }));
        
        // We use put here because useForm.put sends the current state
        // But setData is async. We might need to send values directly or use post/put with data object.
        // Inertia's useForm put takes (url, options).
        // Let's use a standard router.put to be safe with immediate data.
        
        put(`/pharmacy/orders/${id}/status`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsNoteDrawerOpen(false);
                reset();
            }
        });
    };

    const openNoteDrawer = (order: Order, type: 'rejection' | 'note') => {
        setActiveOrder(order);
        setNoteType(type);
        setData(data => ({
            ...data,
            status: type === 'rejection' ? 'cancelled' : order.status,
            rejection_reason: order.rejection_reason || '',
            pharmacy_note: order.pharmacy_note || '',
        }));
        setIsNoteDrawerOpen(true);
    };

    const handleNoteSubmit = () => {
        if (!activeOrder) return;
        updateOrderStatus(activeOrder.id, noteType === 'rejection' ? 'cancelled' : activeOrder.status, data.rejection_reason, data.pharmacy_note);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toString().includes(searchTerm) ||
            order.patient.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.patient.user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
            processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Package },
            shipped: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Package },
            delivered: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
            cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: X },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const Icon = config.icon;
        
        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
                <Icon className="h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Management" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage patient orders and deliveries
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search orders..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className={statusFilter === status ? 'bg-purple-600 hover:bg-purple-700' : ''}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <Card key={order.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">ORDER #{order.id}</h3>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">₦{Number(order.total_amount).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{order.items.length} item(s)</p>
                                </div>
                            </div>

                            <div className="mb-4 space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Patient Information</p>
                                    <p className="text-sm text-gray-600">{order.patient.user.name}</p>
                                    <p className="text-sm text-gray-600">{order.patient.user.email}</p>
                                    <p className="text-sm text-gray-600">{order.patient.user.phone_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                                    <p className="text-sm text-gray-600">{order.delivery_address}</p>
                                </div>
                                {order.pharmacy_note && (
                                    <div className="rounded-lg bg-blue-50 p-3 flex gap-2 border border-blue-100">
                                        <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-blue-700 uppercase">Pharmacy Note</p>
                                            <p className="text-sm text-blue-800">{order.pharmacy_note}</p>
                                        </div>
                                    </div>
                                )}
                                {order.rejection_reason && (
                                    <div className="rounded-lg bg-red-50 p-3 flex gap-2 border border-red-100">
                                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-red-700 uppercase">Rejection Reason</p>
                                            <p className="text-sm text-red-800">{order.rejection_reason}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <p className="mb-2 text-sm font-medium text-gray-700">Order Items</p>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.quantity}x {item.medicine.name}
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                ₦{Number(item.subtotal).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {order.status === 'pending' && (
                                    <>
                                        <Button
                                            size="sm"
                                            onClick={() => updateOrderStatus(order.id, 'processing')}
                                            disabled={processing}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Package className="mr-2 h-4 w-4" />
                                            Start Processing
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => openNoteDrawer(order, 'rejection')}
                                            disabled={processing}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Reject with Reason
                                        </Button>
                                    </>
                                )}
                                {order.status === 'processing' && (
                                    <Button
                                        size="sm"
                                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                                        disabled={processing}
                                        className="bg-purple-600 hover:bg-purple-700"
                                    >
                                        <Package className="mr-2 h-4 w-4" />
                                        Mark as Shipped
                                    </Button>
                                )}
                                {order.status === 'shipped' && (
                                    <Button
                                        size="sm"
                                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Mark as Delivered
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openNoteDrawer(order, 'note')}
                                    className="border-blue-100 text-blue-600 hover:bg-blue-50"
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Note
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="ml-auto"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <Card className="p-12 text-center">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No orders found matching your criteria.
                        </p>
                    </Card>
                )}
            </div>

            {/* Note/Rejection Dialog */}
            <Dialog open={isNoteDrawerOpen} onOpenChange={setIsNoteDrawerOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-3xl p-6 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">
                            {noteType === 'rejection' ? 'Reject Order' : 'Add Note to Order'}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium">
                            {noteType === 'rejection' 
                                ? 'Please provide a reason for rejecting this order. The patient will be notified.' 
                                : 'Send a specific instruction or update to the patient regarding their order.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-sm font-bold uppercase tracking-widest text-slate-400">
                                {noteType === 'rejection' ? 'Rejection Reason' : 'Note Content'}
                            </Label>
                            <Textarea
                                id="content"
                                placeholder={noteType === 'rejection' ? "e.g. Out of stock, distance too far..." : "e.g. We only have 2 units available, sending those..."}
                                className="h-32 rounded-2xl border-2 focus:border-purple-600 transition-all resize-none"
                                value={noteType === 'rejection' ? data.rejection_reason : data.pharmacy_note}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    if (noteType === 'rejection') {
                                        setData('rejection_reason', e.target.value);
                                    } else {
                                        setData('pharmacy_note', e.target.value);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button 
                            variant="ghost" 
                            className="rounded-xl font-bold"
                            onClick={() => setIsNoteDrawerOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className={`rounded-xl font-bold px-8 ${noteType === 'rejection' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                            onClick={handleNoteSubmit}
                            disabled={processing}
                        >
                            {processing ? (
                                <Clock className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Send className="h-4 w-4 mr-2" />
                            )}
                            {noteType === 'rejection' ? 'Confirm Rejection' : 'Send Note'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PharmacyLayout>
    );
}

