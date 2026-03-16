import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Bell, 
    CheckCheck, 
    Trash2, 
    Clock, 
    AlertCircle, 
    Info, 
    CheckCircle2,
    XCircle,
    MoreVertical,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { useState } from 'react';

interface NotificationData {
    id: string;
    type: string;
    data: {
        title: string;
        message: string;
        action_url?: string;
        icon?: string;
    };
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications: NotificationData[];
}

export default function Notifications({ notifications }: Props) {
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/patient/dashboard' },
        { title: 'Notifications', href: '/patient/notifications' },
    ];

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read_at;
        return true;
    });

    const markAsRead = (id: string) => {
        router.post(`/patient/notifications/${id}/read`);
    };

    const markAllAsRead = () => {
        router.post('/patient/notifications/all/read');
    };

    const deleteNotification = (id: string) => {
        router.delete(`/patient/notifications/${id}`);
    };

    const clearAll = () => {
        if (confirm('Are you sure you want to clear all notifications?')) {
            router.delete('/patient/notifications/all');
        }
    };

    const getIcon = (type: string, dataIcon?: string) => {
        switch (dataIcon || type) {
            case 'success': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'warning': return <AlertCircle className="h-5 w-5 text-amber-500" />;
            default: return <Info className="h-5 w-5 text-green-500" />;
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications - HealthBridge" />

            <div className="mx-auto max-w-4xl space-y-6 pb-12">
                {/* Header Section */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notifications</h1>
                        <p className="mt-1 text-sm font-medium text-gray-500">Stay updated with your latest health activities</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {notifications.some(n => !n.read_at) && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={markAllAsRead}
                                className="rounded-xl border-green-100 bg-green-50/50 font-bold text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                                <CheckCheck className="mr-2 h-4 w-4" />
                                Mark all as read
                            </Button>
                        )}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearAll}
                            className="rounded-xl font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear all
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 p-1.5 bg-gray-100/50 rounded-2xl w-fit">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                            filter === 'all' 
                            ? 'bg-white text-green-700 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        All
                        <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px]">
                            {notifications.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                            filter === 'unread' 
                            ? 'bg-white text-green-700 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Unread
                        <span className="ml-2 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[10px]">
                            {notifications.filter(n => !n.read_at).length}
                        </span>
                    </button>
                </div>

                {/* Notifications List */}
                <Card className="overflow-hidden border-none shadow-xl shadow-green-900/5 bg-white/80 backdrop-blur-xl">
                    {filteredNotifications.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {filteredNotifications.map((notification) => (
                                <div 
                                    key={notification.id}
                                    className={`group relative flex gap-4 p-6 transition-all hover:bg-green-50/30 ${
                                        !notification.read_at ? 'bg-green-50/10' : ''
                                    }`}
                                >
                                    {!notification.read_at && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full" />
                                    )}
                                    
                                    <div className={`mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                                        !notification.read_at ? 'bg-white shadow-md' : 'bg-gray-50'
                                    }`}>
                                        {getIcon(notification.type, notification.data.icon)}
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className={`text-base font-bold text-gray-900 ${!notification.read_at ? 'font-black' : ''}`}>
                                                    {notification.data.title}
                                                </h3>
                                                <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-2xl">
                                                    {notification.data.message}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    <Clock className="h-3 w-3" />
                                                    {formatTime(notification.created_at)}
                                                </div>
                                                {!notification.read_at && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="h-8 rounded-lg text-xs font-bold text-green-600 hover:bg-green-100 hover:text-green-700"
                                                    >
                                                        Mark as read
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {formatDate(notification.created_at)}
                                            </div>
                                            
                                            {notification.data.action_url && (
                                                <Link 
                                                    href={notification.data.action_url}
                                                    className="flex items-center gap-1 text-xs font-black text-green-600 hover:text-green-700 hover:underline"
                                                >
                                                    View Details
                                                    <ArrowRight className="h-3 w-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteNotification(notification.id)}
                                        className="h-8 w-8 rounded-lg text-gray-300 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 animate-ping rounded-full bg-green-100/50" />
                                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-50 shadow-inner">
                                    <Bell className="h-12 w-12 text-green-200" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">All caught up!</h3>
                            <p className="mt-2 text-sm font-medium text-gray-500 max-w-xs mx-auto">
                                You don't have any {filter === 'unread' ? 'unread' : ''} notifications at the moment.
                            </p>
                            {filter === 'unread' && (
                                <Button 
                                    variant="link" 
                                    onClick={() => setFilter('all')}
                                    className="mt-4 font-bold text-green-600"
                                >
                                    View all notifications
                                </Button>
                            )}
                        </div>
                    )}
                </Card>

                {/* Footer Tip */}
                <div className="rounded-2xl bg-green-900 p-6 text-white shadow-xl shadow-green-900/10">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                            <Bell className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold">Notification Settings</h4>
                            <p className="text-sm text-green-100/70 font-medium">Manage how you receive alerts in your profile settings.</p>
                        </div>
                        <Link href="/patient/settings" className="ml-auto">
                            <Button className="bg-white font-black text-green-900 hover:bg-green-50 h-11 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-black/20">
                                Configure
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
