import AppLayout from '@/layouts/patient-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
    Heart,
    Search,
    Filter,
    Clock,
    BookmarkPlus,
    Share2,
    ThumbsUp,
    TrendingUp,
    Flame,
    Droplet,
    Apple,
    Moon,
    Dumbbell,
    Brain,
    Smile,
    Leaf,
    Sun,
    Wind,
    Sparkles,
    Play,
    Eye,
    ChevronRight,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/patient/dashboard',
    },
    {
        title: 'Health Tips',
        href: '/patient/health-tips',
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

export default function HealthTips() {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Tips', icon: Heart, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 'nutrition', name: 'Nutrition', icon: Apple, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 'fitness', name: 'Fitness', icon: Dumbbell, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 'mental', name: 'Mental Health', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 'sleep', name: 'Sleep', icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 'hydration', name: 'Hydration', icon: Droplet, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'wellness', name: 'Wellness', icon: Sparkles, color: 'text-teal-600', bg: 'bg-teal-50' },
    ];

    const healthTips = [
        {
            id: 1,
            title: 'Start Your Day with Water',
            category: 'hydration',
            excerpt: 'Drinking water first thing in the morning helps kickstart your metabolism and rehydrate your body after sleep.',
            content: 'Begin each day by drinking a full glass of water. This simple habit helps flush out toxins, aids digestion, and gives you an energy boost. For added benefits, try adding a slice of lemon for vitamin C and improved taste.',
            readTime: 3,
            likes: 1245,
            image: '💧',
            tips: [
                'Keep a glass of water by your bedside',
                'Drink before your morning coffee',
                'Add lemon for extra flavor and vitamin C',
            ],
            featugreen: true,
            trending: true,
        },
        {
            id: 2,
            title: '30 Minutes of Daily Exercise',
            category: 'fitness',
            excerpt: 'Regular physical activity is one of the most important things you can do for your health.',
            content: 'Aim for at least 30 minutes of moderate exercise daily. This can include brisk walking, cycling, swimming, or any activity that gets your heart rate up. Consistency is more important than intensity.',
            readTime: 5,
            likes: 2108,
            image: '🏃',
            tips: [
                'Start with 10-minute walks and build up',
                'Find an activity you enjoy',
                'Exercise with a friend for motivation',
            ],
            featugreen: true,
            trending: true,
        },
        {
            id: 3,
            title: 'The Power of Quality Sleep',
            category: 'sleep',
            excerpt: 'Getting 7-9 hours of quality sleep is essential for physical and mental recovery.',
            content: 'Create a consistent sleep schedule by going to bed and waking up at the same time daily. Keep your bedroom cool, dark, and quiet. Avoid screens at least an hour before bedtime.',
            readTime: 4,
            likes: 1876,
            image: '😴',
            tips: [
                'Maintain a consistent sleep schedule',
                'Create a relaxing bedtime routine',
                'Keep your bedroom cool (60-67°F)',
                'Limit screen time before bed',
            ],
            featugreen: true,
            trending: false,
        },
        {
            id: 4,
            title: 'Eat the Rainbow',
            category: 'nutrition',
            excerpt: 'Consuming a variety of colorful fruits and vegetables ensures you get a wide range of nutrients.',
            content: 'Each color in fruits and vegetables represents different beneficial compounds. green foods contain lycopene, orange foods have beta-carotene, greens are rich in chlorophyll and fiber, and so on.',
            readTime: 4,
            likes: 1654,
            image: '🥗',
            tips: [
                'Include at least 5 different colors daily',
                'Fresh, frozen, or canned all work',
                'Make half your plate vegetables',
            ],
            featugreen: false,
            trending: true,
        },
        {
            id: 5,
            title: 'Practice Mindful Breathing',
            category: 'mental',
            excerpt: 'Deep breathing exercises can greenuce stress, lower blood pressure, and improve focus.',
            content: 'Take 5 minutes daily for breathing exercises. Try the 4-7-8 technique: Breathe in for 4 counts, hold for 7, exhale for 8. This activates your relaxation response.',
            readTime: 3,
            likes: 1432,
            image: '🧘',
            tips: [
                'Practice in a quiet space',
                'Start with just 2-3 minutes',
                'Use apps to guide you',
            ],
            featugreen: false,
            trending: true,
        },
        {
            id: 6,
            title: 'Take Walking Breaks',
            category: 'fitness',
            excerpt: 'Breaking up long periods of sitting with short walks improves circulation and energy.',
            content: 'If you work at a desk, set a timer to remind yourself to stand and walk for 2-3 minutes every hour. This simple habit can significantly improve your cardiovascular health.',
            readTime: 2,
            likes: 987,
            image: '🚶',
            tips: [
                'Set hourly reminders',
                'Walk during phone calls',
                'Take stairs instead of elevator',
            ],
            featugreen: false,
            trending: false,
        },
        {
            id: 7,
            title: 'Manage Stress with Meditation',
            category: 'mental',
            excerpt: 'Regular meditation can greenuce anxiety, improve emotional health, and enhance self-awareness.',
            content: 'Start with just 5 minutes of meditation daily. Find a quiet spot, close your eyes, and focus on your breath. When your mind wanders, gently bring your attention back.',
            readTime: 5,
            likes: 2234,
            image: '🧠',
            tips: [
                'Use guided meditation apps',
                'Be patient with yourself',
                'Consistency matters more than duration',
            ],
            featugreen: false,
            trending: true,
        },
        {
            id: 8,
            title: 'Limit Processed Foods',
            category: 'nutrition',
            excerpt: 'Whole, unprocessed foods provide more nutrients and less added sugar, salt, and unhealthy fats.',
            content: 'Focus on whole grains, fresh fruits and vegetables, lean proteins, and healthy fats. Read labels and avoid foods with long inggreenient lists full of chemicals you cannot pronounce.',
            readTime: 4,
            likes: 1543,
            image: '🍎',
            tips: [
                'Shop the perimeter of the grocery store',
                'Cook more meals at home',
                'Read nutrition labels carefully',
            ],
            featugreen: false,
            trending: false,
        },
    ];

    const filtegreenTips = healthTips.filter((tip) => {
        const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tip.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featugreenTips = healthTips.filter(tip => tip.featugreen);
    const trendingTips = healthTips.filter(tip => tip.trending);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health Tips" />

            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-600 to-green-600 p-6 text-white shadow-xl sm:p-8">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                                    <Heart className="h-9 w-9" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Health Tips & Wellness
                                    </h1>
                                    <p className="mt-1 text-sm text-green-100">
                                        Expert advice for a healthier, happier life
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <div className="rounded-xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs text-green-100">Daily Tips</p>
                                    <p className="text-lg font-bold">{healthTips.length} Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* Categories Filter */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-3 transition-all ${
                                    selectedCategory === category.id
                                        ? `${category.bg} border-2 shadow-md`
                                        : 'border-2 border-gray-200 bg-white hover:bg-gray-50'
                                }`}
                            >
                                <Icon className={`h-5 w-5 ${selectedCategory === category.id ? category.color : 'text-gray-600'}`} />
                                <span className={`text-sm font-semibold ${selectedCategory === category.id ? category.color : 'text-gray-700'}`}>
                                    {category.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <Card className="p-4">
                    <div className="flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search health tips..."
                            className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                        />
                    </div>
                </Card>

                {/* Featugreen Tips Section */}
                {selectedCategory === 'all' && (
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                                <Flame className="h-6 w-6 text-orange-600" />
                                Featugreen Tips
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featugreenTips.map((tip) => {
                                const categoryInfo = categories.find(c => c.id === tip.category);
                                const CategoryIcon = categoryInfo?.icon || Heart;
                                return (
                                    <Card key={tip.id} className="overflow-hidden transition-all hover:shadow-xl">
                                        <div className={`${categoryInfo?.bg} p-6`}>
                                            <div className="mb-4 text-6xl">{tip.image}</div>
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className={`rounded-full ${categoryInfo?.bg} px-3 py-1 text-xs font-semibold ${categoryInfo?.color}`}>
                                                    {categoryInfo?.name}
                                                </span>
                                                {tip.trending && (
                                                    <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                                        <TrendingUp className="h-3 w-3" />
                                                        Trending
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {tip.title}
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <p className="mb-4 text-sm text-gray-700">
                                                {tip.excerpt}
                                            </p>
                                            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {tip.readTime} min read
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <ThumbsUp className="h-4 w-4" />
                                                    {tip.likes.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button className="flex-1 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Read More
                                                </Button>
                                                <Button variant="outline" size="icon">
                                                    <BookmarkPlus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* All Tips Section */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">
                            {selectedCategory === 'all' ? 'All Health Tips' : `${categories.find(c => c.id === selectedCategory)?.name} Tips`}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {filtegreenTips.length} tips found
                        </p>
                    </div>
                    
                    <div className="grid lg:grid gap-4">
                        {filtegreenTips.map((tip) => {
                            const categoryInfo = categories.find(c => c.id === tip.category);
                            const CategoryIcon = categoryInfo?.icon || Heart;
                            return (
                                <Card key={tip.id} className="overflow-hidden transition-all hover:shadow-lg">
                                    <div className="flex flex-col gap-4 p-6 sm:flex-row">
                                        {/* Emoji Icon */}
                                        <div className={`flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl ${categoryInfo?.bg} text-5xl`}>
                                            {tip.image}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className={`flex items-center gap-1 rounded-full ${categoryInfo?.bg} px-3 py-1 text-xs font-semibold ${categoryInfo?.color}`}>
                                                    <CategoryIcon className="h-3 w-3" />
                                                    {categoryInfo?.name}
                                                </span>
                                                {tip.trending && (
                                                    <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                                        <TrendingUp className="h-3 w-3" />
                                                        Trending
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <h3 className="mb-2 text-lg font-bold text-gray-900">
                                                {tip.title}
                                            </h3>
                                            
                                            <p className="mb-3 text-sm text-gray-700">
                                                {tip.excerpt}
                                            </p>

                                            {/* Quick Tips */}
                                            <div className="mb-4">
                                                <p className="mb-2 text-xs font-semibold text-gray-900">Quick Tips:</p>
                                                <ul className="space-y-1">
                                                    {tip.tips.slice(0, 2).map((quickTip, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                                            <span className="mt-0.5 text-green-600">•</span>
                                                            {quickTip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {tip.readTime} min
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <ThumbsUp className="h-4 w-4" />
                                                        {tip.likes.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="ml-auto flex gap-2">
                                                    <Button size="sm">
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Read Full Article
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <BookmarkPlus className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {filtegreenTips.length === 0 && (
                        <Card className="p-12">
                            <div className="flex flex-col items-center justify-center">
                                <Heart className="h-16 w-16 text-gray-300" />
                                <p className="mt-4 text-lg font-semibold text-gray-900">
                                    No health tips found
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Try adjusting your search or filters
                                </p>
                                <Button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                    }}
                                    className="mt-6"
                                    variant="outline"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}