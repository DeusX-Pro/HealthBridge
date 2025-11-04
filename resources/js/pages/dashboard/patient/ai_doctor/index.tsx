import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Bot,
    Calendar,
    ChevronRight,
    Clock,
    Copy,
    FileImage,
    FileText,
    Menu,
    Mic,
    Paperclip,
    Plus,
    RotateCcw,
    Send,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
    User,
    X,
    Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

interface PastChat {
    id: number;
    title: string;
    preview: string;
    timestamp: string;
    date: Date;
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

    // Sample past chats data
    const [pastChats] = useState<PastChat[]>([
        {
            id: 1,
            title: 'Headache and Fever Consultation',
            preview: 'Discussed persistent headache with mild fever...',
            timestamp: '2 hours ago',
            date: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
            id: 2,
            title: 'Sleep Quality Issues',
            preview: 'Tips for improving sleep and managing insomnia...',
            timestamp: 'Yesterday',
            date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
            id: 3,
            title: 'Dietary Recommendations',
            preview: 'Nutrition advice for managing cholesterol...',
            timestamp: '3 days ago',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
            id: 4,
            title: 'Exercise Routine Guidance',
            preview: 'Best exercises for lower back pain relief...',
            timestamp: '1 week ago',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
    ]);

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
        setIsSidebarOpen(false);
    };

    const loadPastChat = (chatId: number) => {
        // In a real app, this would load the actual chat history
        console.log('Loading chat:', chatId);
        setIsSidebarOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AI Doctor" />

            <div className="flex h-[calc(100vh-4rem)] flex-col lg:h-screen">
                {/* Header */}
                <div className="flex-shrink-0 border-b border-gray-200 bg-white px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden"
                            >
                                {isSidebarOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg sm:h-12 sm:w-12">
                                <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
                                    AI Health Assistant
                                </h1>
                                <p className="hidden items-center gap-2 text-xs text-gray-600 sm:flex sm:text-sm">
                                    <Sparkles className="h-3 w-3 text-green-600 sm:h-4 sm:w-4" />
                                    <span className="hidden sm:inline">
                                        Powered by Advanced Medical AI •
                                    </span>
                                    <span>Available 24/7</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                                onClick={startNewChat}
                                size="sm"
                                className="hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 sm:flex"
                            >
                                <Plus className="mr-0 h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">
                                    New Chat
                                </span>
                            </Button>
                            <Button
                                onClick={startNewChat}
                                size="sm"
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 sm:hidden"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={startNewChat}
                                className="hidden sm:flex"
                            >
                                <RotateCcw className="mr-0 h-4 w-4 sm:mr-2" />
                                <span className="hidden lg:inline">Clear</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative flex flex-1 overflow-hidden">
                    {/* Overlay for mobile sidebar */}
                    {isSidebarOpen && (
                        <div
                            className="bg-opacity-50 absolute inset-0 z-40 bg-black lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        ></div>
                    )}

                    {/* Chat Area */}
                    <div className="relative z-10 flex min-w-0 flex-1 flex-col">
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                            <div className="h-full overflow-y-auto p-2 sm:p-4">
                                <div className="mx-auto max-w-4xl space-y-4 pb-4 sm:space-y-6">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-2 sm:gap-4 ${
                                                message.type === 'user'
                                                    ? 'flex-row-reverse'
                                                    : 'flex-row'
                                            }`}
                                        >
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md sm:h-10 sm:w-10 ${
                                                        message.type === 'user'
                                                            ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
                                                            : 'bg-gradient-to-br from-green-600 to-emerald-600 text-white'
                                                    }`}
                                                >
                                                    {message.type === 'user' ? (
                                                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    ) : (
                                                        <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Message Content */}
                                            <div
                                                className={`max-w-[85%] flex-1 sm:max-w-2xl ${message.type === 'user' ? 'items-end' : 'items-start'}`}
                                            >
                                                <div
                                                    className={`rounded-2xl px-3 py-2 shadow-sm sm:px-5 sm:py-3 ${
                                                        message.type === 'user'
                                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                                            : 'border border-gray-200 bg-white'
                                                    }`}
                                                >
                                                    <p className="text-xs leading-relaxed whitespace-pre-wrap sm:text-sm">
                                                        {message.content}
                                                    </p>
                                                </div>

                                                {/* Timestamp and Actions */}
                                                <div
                                                    className={`mt-1.5 flex items-center gap-2 px-1 sm:mt-2 sm:gap-3 sm:px-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <span className="text-xs text-gray-500">
                                                        {message.timestamp.toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            },
                                                        )}
                                                    </span>
                                                    {message.type === 'ai' && (
                                                        <div className="flex gap-1">
                                                            <button className="rounded-lg p-1 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 sm:p-1.5">
                                                                <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                            </button>
                                                            <button className="rounded-lg p-1 text-gray-400 transition-all hover:bg-green-100 hover:text-green-600 sm:p-1.5">
                                                                <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                            </button>
                                                            <button className="rounded-lg p-1 text-gray-400 transition-all hover:bg-red-100 hover:text-red-600 sm:p-1.5">
                                                                <ThumbsDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Suggestions */}
                                                {message.suggestions && (
                                                    <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                                                        {message.suggestions.map(
                                                            (
                                                                suggestion,
                                                                idx,
                                                            ) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() =>
                                                                        handleSuggestionClick(
                                                                            suggestion,
                                                                        )
                                                                    }
                                                                    className="rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm transition-all hover:scale-105 hover:border-green-300 hover:shadow-md sm:px-4 sm:py-2"
                                                                >
                                                                    {suggestion}
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex gap-2 sm:gap-4">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md sm:h-10 sm:w-10">
                                                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-sm sm:px-5 sm:py-3">
                                                <div className="h-2 w-2 animate-bounce rounded-full bg-green-600"></div>
                                                <div
                                                    className="h-2 w-2 animate-bounce rounded-full bg-emerald-600"
                                                    style={{
                                                        animationDelay: '0.2s',
                                                    }}
                                                ></div>
                                                <div
                                                    className="h-2 w-2 animate-bounce rounded-full bg-green-500"
                                                    style={{
                                                        animationDelay: '0.4s',
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-2 sm:p-4">
                            {/* Disclaimer */}
                            <div className="mb-2 flex items-start gap-2 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-2 sm:mb-3 sm:p-3">
                                <AlertCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-600 sm:h-4 sm:w-4" />
                                <p className="text-xs text-amber-900">
                                    <strong>Important:</strong> This AI provides
                                    general health information only and is not a
                                    substitute for professional medical advice.
                                    Always consult a healthcare provider for
                                    medical concerns.
                                </p>
                            </div>

                            {/* Input Box */}
                            <div className="flex items-end gap-2 sm:gap-3">
                                <div className="flex flex-1 items-center gap-1 rounded-2xl border-2 border-gray-300 bg-white px-2 py-2 shadow-sm transition-all focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 sm:gap-2 sm:px-4 sm:py-3 sm:focus-within:ring-4">
                                    <button className="hidden rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 sm:block">
                                        <Paperclip className="h-5 w-5" />
                                    </button>
                                    <button className="hidden rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 sm:block">
                                        <FileImage className="h-5 w-5" />
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) =>
                                            setInputMessage(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                        placeholder="Describe your symptoms..."
                                        className="flex-1 border-none bg-transparent text-xs outline-none placeholder:text-gray-400 sm:text-sm"
                                    />
                                    <button className="hidden rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 sm:block">
                                        <Mic className="h-5 w-5" />
                                    </button>
                                </div>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim()}
                                    size="lg"
                                    className="h-10 w-10 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-0 shadow-lg transition-all hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 sm:h-12 sm:w-12"
                                >
                                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </div>

                            {/* Quick Actions Footer */}
                            <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
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
                                        onClick={() =>
                                            handleSuggestionClick(quickAction)
                                        }
                                        className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm sm:px-3 sm:py-1.5"
                                    >
                                        {quickAction}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Responsive */}
                    <div
                        className={`absolute inset-y-0 right-0 z-50 w-full transform overflow-y-auto border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-80 ${
                            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        } lg:relative lg:z-auto lg:w-80 lg:translate-x-0 lg:shadow-none`}
                    >
                        {/* Sidebar Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Menu
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="space-y-4 p-4">
                            {/* Past Chats Card - NEW */}
                            <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-green-600" />
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Recent Chats
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {pastChats.map((chat) => (
                                        <button
                                            key={chat.id}
                                            onClick={() =>
                                                loadPastChat(chat.id)
                                            }
                                            className="group w-full rounded-lg border border-green-200 bg-white p-3 text-left transition-all hover:border-green-300 hover:shadow-md"
                                        >
                                            <div className="mb-1 flex items-start justify-between gap-2">
                                                <p className="line-clamp-1 flex-1 text-sm font-semibold text-gray-900 group-hover:text-green-700">
                                                    {chat.title}
                                                </p>
                                                <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-green-600" />
                                            </div>
                                            <p className="mb-2 line-clamp-1 text-xs text-gray-600">
                                                {chat.preview}
                                            </p>
                                            <p className="flex items-center gap-1 text-xs text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                {chat.timestamp}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-3 w-full border-green-300 text-green-700 hover:bg-green-100"
                                >
                                    View All Chats
                                </Button>
                            </Card>

                            {/* Popular Topics */}
                            <Card className="p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <h3 className="text-sm font-bold text-gray-900">
                                        Popular Topics
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        {
                                            emoji: '🦠',
                                            title: 'COVID-19 Information',
                                            desc: 'Symptoms and prevention',
                                            query: 'What are COVID-19 symptoms?',
                                        },
                                        {
                                            emoji: '❤️',
                                            title: 'Blood Pressure',
                                            desc: 'Management tips',
                                            query: 'How to manage high blood pressure?',
                                        },
                                        {
                                            emoji: '😴',
                                            title: 'Sleep Health',
                                            desc: 'Quality rest tips',
                                            query: 'Tips for better sleep',
                                        },
                                        {
                                            emoji: '🥗',
                                            title: 'Nutrition Advice',
                                            desc: 'Healthy eating',
                                            query: 'Healthy diet recommendations',
                                        },
                                        {
                                            emoji: '💪',
                                            title: 'Exercise',
                                            desc: 'Fitness guidance',
                                            query: 'Best exercises for beginners?',
                                        },
                                        {
                                            emoji: '🧘',
                                            title: 'Mental Health',
                                            desc: 'Stress management',
                                            query: 'How to reduce anxiety?',
                                        },
                                    ].map((topic, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                handleSuggestionClick(
                                                    topic.query,
                                                );
                                                setIsSidebarOpen(false);
                                            }}
                                            className="w-full rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-3 text-left text-sm transition-all hover:shadow-md"
                                        >
                                            <div className="mb-1 text-base">
                                                {topic.emoji}
                                            </div>
                                            <p className="font-medium text-gray-900">
                                                {topic.title}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {topic.desc}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </Card>

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
                                        <button
                                            onClick={() =>
                                                setIsSidebarOpen(false)
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-3 text-left transition-all hover:shadow-md"
                                        >
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
                                        <button
                                            onClick={() =>
                                                setIsSidebarOpen(false)
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 text-left transition-all hover:shadow-md"
                                        >
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
                                        <button
                                            onClick={() =>
                                                setIsSidebarOpen(false)
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-3 text-left transition-all hover:shadow-md"
                                        >
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
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
