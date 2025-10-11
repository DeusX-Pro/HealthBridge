import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    MessageSquare,
    Search,
    Send,
    Paperclip,
    MoreVertical,
    Clock,
    CheckCheck,
    Check,
    Star,
    Archive,
    Trash2,
    Plus,
    Filter,
    User,
    Calendar,
    FileText,
    AlertCircle,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Messages',
        href: '/patient/messages',
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

export default function Messages() {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConversation, setSelectedConversation] = useState<number>(1);
    const [messageInput, setMessageInput] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const conversations = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Cardiologist',
            avatar: 'SJ',
            lastMessage: 'Your test results are ready. Everything looks normal.',
            timestamp: '10 min ago',
            unread: 2,
            isOnline: true,
            isPinned: true,
        },
        {
            id: 2,
            name: 'City General Hospital',
            role: 'Appointment Reminder',
            avatar: 'CH',
            lastMessage: 'Your appointment is confirmed for tomorrow at 2:00 PM',
            timestamp: '2 hours ago',
            unread: 0,
            isOnline: false,
            isPinned: false,
        },
        {
            id: 3,
            name: 'Dr. Michael Chen',
            role: 'General Physician',
            avatar: 'MC',
            lastMessage: 'Please continue taking your medication as prescribed.',
            timestamp: '1 day ago',
            unread: 0,
            isOnline: true,
            isPinned: false,
        },
        {
            id: 4,
            name: 'HealthPlus Pharmacy',
            role: 'Prescription Update',
            avatar: 'HP',
            lastMessage: 'Your prescription is ready for pickup.',
            timestamp: '2 days ago',
            unread: 1,
            isOnline: false,
            isPinned: false,
        },
        {
            id: 5,
            name: 'Dr. Emily Rodriguez',
            role: 'Dermatologist',
            avatar: 'ER',
            lastMessage: 'Thank you for the update. See you next month.',
            timestamp: '3 days ago',
            unread: 0,
            isOnline: false,
            isPinned: false,
        },
    ];

    const messages = [
        {
            id: 1,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: 'Hello! I have reviewed your recent blood test results.',
            timestamp: '2:30 PM',
            isOwn: false,
            status: 'read',
        },
        {
            id: 2,
            senderId: 'me',
            senderName: 'You',
            content: 'Thank you, Doctor. How do they look?',
            timestamp: '2:32 PM',
            isOwn: true,
            status: 'read',
        },
        {
            id: 3,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: 'Everything is within normal range. Your cholesterol levels have improved since last time.',
            timestamp: '2:35 PM',
            isOwn: false,
            status: 'read',
        },
        {
            id: 4,
            senderId: 'me',
            senderName: 'You',
            content: 'That is great news! Should I continue with the current medication?',
            timestamp: '2:36 PM',
            isOwn: true,
            status: 'read',
        },
        {
            id: 5,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: 'Yes, please continue with your current treatment plan. Keep up the good work with your diet and exercise.',
            timestamp: '2:40 PM',
            isOwn: false,
            status: 'read',
        },
        {
            id: 6,
            senderId: 1,
            senderName: 'Dr. Sarah Johnson',
            content: 'Your test results are ready. Everything looks normal.',
            timestamp: '2:45 PM',
            isOwn: false,
            status: 'delivered',
        },
    ];

    const selectedConv = conversations.find(c => c.id === selectedConversation);

    const filteredConversations = conversations.filter(conv => {
        const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.role.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesFilter = true;
        if (activeFilter === 'unread') matchesFilter = conv.unread > 0;
        if (activeFilter === 'pinned') matchesFilter = conv.isPinned;
        
        return matchesSearch && matchesFilter;
    });

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            // Send message logic here
            setMessageInput('');
        }
    };

    const totalUnread = conversations.reduce((acc, conv) => acc + conv.unread, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <MessageSquare className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Messages
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Communicate with your healthcare providers
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-green-100">Unread</p>
                                    <p className="text-lg font-bold">{totalUnread}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Main Messages Interface */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Conversations List */}
                    <Card className="flex flex-col lg:col-span-4">
                        {/* Search and Filters */}
                        <div className="border-b border-gray-200 p-4">
                            <div className="mb-3 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search conversations..."
                                    className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                        activeFilter === 'all'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveFilter('unread')}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                        activeFilter === 'unread'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Unread ({totalUnread})
                                </button>
                                <button
                                    onClick={() => setActiveFilter('pinned')}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                        activeFilter === 'pinned'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <Star className="inline h-3 w-3" /> Pinned
                                </button>
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => setSelectedConversation(conversation.id)}
                                    className={`flex w-full items-start gap-3 border-b border-gray-100 p-4 text-left transition-all hover:bg-gray-50 ${
                                        selectedConversation === conversation.id ? 'bg-green-50' : ''
                                    }`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-600 text-sm font-bold text-white">
                                            {conversation.avatar}
                                        </div>
                                        {conversation.isOnline && (
                                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                                        )}
                                    </div>
                                    
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">
                                                    {conversation.name}
                                                </h3>
                                                {conversation.isPinned && (
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {conversation.timestamp}
                                            </span>
                                        </div>
                                        <p className="mb-1 text-xs text-gray-600">
                                            {conversation.role}
                                        </p>
                                        <p className={`truncate text-sm ${conversation.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                            {conversation.lastMessage}
                                        </p>
                                    </div>

                                    {conversation.unread > 0 && (
                                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                                            {conversation.unread}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Chat Area */}
                    <Card className="flex flex-col lg:col-span-8">
                        {selectedConv ? (
                            <>
                                {/* Chat Header */}
                                <div className="border-b border-gray-200 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-600 text-sm font-bold text-white">
                                                    {selectedConv.avatar}
                                                </div>
                                                {selectedConv.isOnline && (
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">
                                                    {selectedConv.name}
                                                </h3>
                                                <p className="flex items-center gap-1 text-xs text-gray-600">
                                                    {selectedConv.role}
                                                    {selectedConv.isOnline && (
                                                        <span className="text-green-600">• Online</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-6">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                                                <div
                                                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                                                        message.isOwn
                                                            ? 'bg-gradient-to-r from-green-600 to-green-600 text-white'
                                                            : 'bg-white text-gray-900'
                                                    }`}
                                                >
                                                    <p className="text-sm leading-relaxed">
                                                        {message.content}
                                                    </p>
                                                </div>
                                                <div className={`mt-1 flex items-center gap-2 px-2 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                                                    <span className="text-xs text-gray-500">
                                                        {message.timestamp}
                                                    </span>
                                                    {message.isOwn && (
                                                        <span className="text-xs text-gray-500">
                                                            {message.status === 'read' ? (
                                                                <CheckCheck className="h-3 w-3 text-green-600" />
                                                            ) : (
                                                                <Check className="h-3 w-3" />
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="border-t border-gray-200 bg-white p-4">
                                    <div className="mb-2 flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <Paperclip className="h-5 w-5" />
                                        </button>
                                        <input
                                            type="text"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type your message..."
                                            className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                        />
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!messageInput.trim()}
                                            size="sm"
                                            className="rounded-xl bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Press Enter to send • Secure end-to-end encrypted messaging
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center p-12 text-center">
                                <MessageSquare className="h-16 w-16 text-gray-300" />
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    No conversation selected
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    Select a conversation from the list to start messaging
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}