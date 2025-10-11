import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useRef, useEffect } from 'react';
import {
    Bot,
    Send,
    Mic,
    FileImage,
    Paperclip,
    Sparkles,
    Clock,
    AlertCircle,
    CheckCircle2,
    Heart,
    Activity,
    Pill,
    FileText,
    ChevronRight,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RotateCcw,
    Calendar,
    Zap,
    TrendingUp,
    MessageCircle,
    User,
    Plus,
    Download,
    Share,
    Settings,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'AI Doctor',
        href: 'patient/ai-doctor',
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

interface Message {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    suggestions?: string[];
}

export default function AIDoctor() {
    const { auth } = usePage<PageProps>().props;
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'ai',
            content: `Hello ${auth.user.name}! 👋 I'm your AI Health Assistant. I'm here to help answer your health questions, provide general medical information, and guide you on when to seek professional care. How can I assist you today?`,
            timestamp: new Date(),
            suggestions: [
                'I have a headache and fever',
                'What are common flu symptoms?',
                'How to manage stress and anxiety?',
                'Recommendations for better sleep',
            ],
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            type: 'user',
            content: inputMessage,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: messages.length + 2,
                type: 'ai',
                content: `I understand your concern about "${inputMessage}". Based on general medical knowledge, I recommend:

• Monitoring your symptoms closely
• Staying hydrated and getting adequate rest
• Avoiding self-medication without professional advice

If symptoms persist or worsen, please consult with a healthcare provider. Would you like me to help you find a specialist or schedule an appointment?`,
                timestamp: new Date(),
                suggestions: [
                    'Book an appointment',
                    'Find relevant specialists',
                    'Emergency symptoms to watch for',
                    'Home care recommendations',
                ],
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 2000);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputMessage(suggestion);
        inputRef.current?.focus();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const startNewChat = () => {
        setMessages([
            {
                id: 1,
                type: 'ai',
                content: `Hello ${auth.user.name}! 👋 I'm your AI Health Assistant. How can I help you today?`,
                timestamp: new Date(),
                suggestions: [
                    'I have a headache and fever',
                    'What are common flu symptoms?',
                    'How to manage stress and anxiety?',
                    'Recommendations for better sleep',
                ],
            },
        ]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AI Doctor" />

            <div className="flex h-screen flex-col">
                {/* Header */}
                <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    AI Health Assistant
                                </h1>
                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                    <Sparkles className="h-4 w-4 text-green-600" />
                                    Powered by Advanced Medical AI • Available 24/7
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-4 sm:flex">
                                <div className="rounded-lg bg-gray-100 px-3 py-2">
                                    <p className="text-xs text-gray-600">Response Time</p>
                                    <p className="text-sm font-semibold">~2s</p>
                                </div>
                                <div className="rounded-lg bg-gray-100 px-3 py-2">
                                    <p className="text-xs text-gray-600">Sessions Today</p>
                                    <p className="text-sm font-semibold">12</p>
                                </div>
                            </div>
                            <Button
                                onClick={startNewChat}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                New Chat
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar - Hidden on mobile, show with toggle */}
                    <div className={`hidden lg:block w-80 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto ${isSidebarOpen ? 'block absolute inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:relative lg:shadow-none' : 'hidden lg:block'}`}>
                        <div className="p-4 space-y-4">
                            {/* Quick Actions */}
                            <Card className="p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-amber-600" />
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Quick Actions
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    <Link href="/patient/appointments">
                                        <button className="flex w-full items-center gap-3 rounded-lg border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-3 text-left transition-all hover:shadow-md">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Book Appointment
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Schedule with a doctor
                                                </p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </Link>
                                    <Link href="/patient/doctors">
                                        <button className="flex w-full items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 text-left transition-all hover:shadow-md">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                                                <Activity className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Find a Doctor
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Browse specialists
                                                </p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </Link>
                                    <Link href="/patient/emergency">
                                        <button className="flex w-full items-center gap-3 rounded-lg border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-3 text-left transition-all hover:shadow-md">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                                                <AlertCircle className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Emergency Help
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    24/7 support line
                                                </p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Common Topics */}
                            <Card className="p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Popular Topics
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { emoji: '🦠', title: 'COVID-19 Information', desc: 'Symptoms and prevention', query: 'What are COVID-19 symptoms?' },
                                        { emoji: '❤️', title: 'Blood Pressure', desc: 'Management tips', query: 'How to manage high blood pressure?' },
                                        { emoji: '😴', title: 'Sleep Health', desc: 'Quality rest tips', query: 'Tips for better sleep' },
                                        { emoji: '🥗', title: 'Nutrition Advice', desc: 'Healthy eating', query: 'Healthy diet recommendations' },
                                        { emoji: '💪', title: 'Exercise', desc: 'Fitness guidance', query: 'Best exercises for beginners?' },
                                        { emoji: '🧘', title: 'Mental Health', desc: 'Stress management', query: 'How to reduce anxiety?' },
                                    ].map((topic, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(topic.query)}
                                            className="w-full rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-3 text-left text-sm transition-all hover:shadow-md"
                                        >
                                            <div className="mb-1 text-base">{topic.emoji}</div>
                                            <p className="font-medium text-gray-900">{topic.title}</p>
                                            <p className="text-xs text-gray-600">{topic.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </Card>

                            {/* Consultation Stats */}
                            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                                <div className="mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Your Stats
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="rounded-lg bg-white p-3 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-600">
                                                This Month
                                            </span>
                                            <span className="text-xl font-bold text-green-600">
                                                12
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-white p-3 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-600">
                                                Total Consultations
                                            </span>
                                            <span className="text-xl font-bold text-green-600">
                                                47
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-3 text-white">
                                        <p className="text-xs font-medium opacity-90">
                                            Avg Response Time
                                        </p>
                                        <p className="mt-1 text-lg font-bold">
                                            2 seconds
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Chat Area - Full Height */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Chat Header */}
                        <Card className="flex-shrink-0 rounded-none border-b border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md">
                                            <Bot className="h-5 w-5" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">AI Health Assistant</p>
                                        <p className="flex items-center gap-1 text-xs text-green-600">
                                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                            Online & Ready to Help
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hidden sm:flex"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hidden sm:flex"
                                    >
                                        <Share className="mr-2 h-4 w-4" />
                                        Share
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={startNewChat}
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Chat Messages - Full Height Scrollable */}
                        <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                            <div className="h-full overflow-y-auto p-4">
                                <div className="mx-auto max-w-4xl space-y-6 pb-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-4 ${
                                                message.type === 'user'
                                                    ? 'flex-row-reverse'
                                                    : 'flex-row'
                                            }`}
                                        >
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md ${
                                                        message.type === 'user'
                                                            ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
                                                            : 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
                                                    }`}
                                                >
                                                    {message.type === 'user' ? (
                                                        <User className="h-5 w-5" />
                                                    ) : (
                                                        <Bot className="h-5 w-5" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Message Content */}
                                            <div className={`flex-1 max-w-2xl ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                                <div
                                                    className={`rounded-2xl px-5 py-3 shadow-sm ${
                                                        message.type === 'user'
                                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                                            : 'border border-gray-200 bg-white'
                                                    }`}
                                                >
                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                        {message.content}
                                                    </p>
                                                </div>

                                                {/* Timestamp and Actions */}
                                                <div className={`mt-2 flex items-center gap-3 px-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <span className="text-xs text-gray-500">
                                                        {message.timestamp.toLocaleTimeString([], {
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })}
                                                    </span>
                                                    {message.type === 'ai' && (
                                                        <div className="flex gap-1">
                                                            <button className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600">
                                                                <Copy className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-green-100 hover:text-green-600">
                                                                <ThumbsUp className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-red-100 hover:text-red-600">
                                                                <ThumbsDown className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Suggestions */}
                                                {message.suggestions && (
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {message.suggestions.map(
                                                            (suggestion, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() =>
                                                                        handleSuggestionClick(
                                                                            suggestion
                                                                        )
                                                                    }
                                                                    className="rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 text-xs font-semibold text-green-700 shadow-sm transition-all hover:scale-105 hover:border-green-300 hover:shadow-md"
                                                                >
                                                                    {suggestion}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex gap-4">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md">
                                                <Bot className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
                                                <div className="h-2 w-2 animate-bounce rounded-full bg-green-600"></div>
                                                <div
                                                    className="h-2 w-2 animate-bounce rounded-full bg-emerald-600"
                                                    style={{ animationDelay: '0.2s' }}
                                                ></div>
                                                <div
                                                    className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                                                    style={{ animationDelay: '0.4s' }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
                            {/* Disclaimer */}
                            <div className="mb-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                                <p className="text-xs text-amber-900">
                                    <strong>Important:</strong> This AI provides general health information only and is not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns.
                                </p>
                            </div>

                            {/* Input Box */}
                            <div className="flex items-end gap-3">
                                <div className="flex flex-1 items-center gap-2 rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 shadow-sm transition-all focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                                    <button className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600">
                                        <Paperclip className="h-5 w-5" />
                                    </button>
                                    <button className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600">
                                        <FileImage className="h-5 w-5" />
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Describe your symptoms or ask a health question..."
                                        className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                                    />
                                    <button className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600">
                                        <Mic className="h-5 w-5" />
                                    </button>
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                    size="lg"
                                    className="h-12 w-12 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-0 shadow-lg transition-all hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Quick Actions Footer */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                {[
                                    'Headache relief',
                                    'Fever symptoms',
                                    'Allergy advice',
                                    'Cold and flu',
                                    'Stress management',
                                    'Sleep problems',
                                ].map((quickAction, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(quickAction)}
                                        className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm"
                                    >
                                        {quickAction}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}