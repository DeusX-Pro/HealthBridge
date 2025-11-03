import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    CheckCircle2,
    ChevronRight,
    Clock,
    FileText,
    HeartPulse,
    Lock,
    Mail,
    MapPin,
    Menu,
    Phone,
    Shield,
    ShieldCheck,
    Star,
    Stethoscope,
    TrendingUp,
    Users,
    Video,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = [
                'home',
                'about',
                'features',
                'how-it-works',
                'testimonials',
                'pricing',
            ];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
            });
            setMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Features', id: 'features' },
        { name: 'How It Works', id: 'how-it-works' },
        { name: 'Testimonials', id: 'testimonials' },
        { name: 'Pricing', id: 'pricing' },
    ];

    return (
        <div className="font-sans text-gray-800">
            {/* ===== Navigation Bar ===== */}
            <nav
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                    scrolled ? 'bg-white py-4 shadow-lg' : 'bg-transparent py-6'
                }`}
            >
                <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                                    scrolled
                                        ? 'bg-gradient-to-br from-green-600 to-emerald-600'
                                        : 'bg-white'
                                }`}
                            >
                                <Stethoscope
                                    className={`h-6 w-6 ${scrolled ? 'text-white' : 'text-green-600'}`}
                                />
                            </div>
                            <span
                                className={`text-xl font-bold transition-colors ${
                                    scrolled ? 'text-gray-900' : 'text-white'
                                }`}
                            >
                                Health Bridge
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center gap-8 md:flex">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`font-medium transition-colors ${
                                        scrolled
                                            ? activeSection === link.id
                                                ? 'text-green-600'
                                                : 'text-gray-700 hover:text-green-600'
                                            : activeSection === link.id
                                              ? 'font-semibold text-white'
                                              : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden items-center gap-4 md:flex">
                            <Link
                                href="/login"
                                className={`rounded-lg px-5 py-2 font-semibold transition-all ${
                                    scrolled
                                        ? 'text-gray-700 hover:text-green-600'
                                        : 'text-white hover:bg-white/10'
                                }`}
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
                        >
                            {mobileMenuOpen ? (
                                <X
                                    className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`}
                                />
                            ) : (
                                <Menu
                                    className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`}
                                />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="mt-4 rounded-lg bg-white py-4 shadow-lg duration-300 animate-in slide-in-from-top-5 md:hidden">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`block w-full px-4 py-3 text-left font-medium transition-colors ${
                                        activeSection === link.id
                                            ? 'bg-green-50 text-green-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                            <div className="mt-4 space-y-2 px-4">
                                <Link
                                    href="/login"
                                    className="block w-full rounded-lg border border-gray-300 px-5 py-2.5 text-center font-semibold text-gray-700 transition-all hover:bg-gray-50"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 text-center font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* ===== Hero Section ===== */}
            <section
                id="home"
                className="relative overflow-hidden px-6 pt-32 pb-24 text-white md:px-12 lg:px-24"
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom right, rgba(16,185,129,0.65), rgba(6,95,70,0.65)), url('/assets/images/virtual-health.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="animate-blob absolute top-20 left-10 h-96 w-96 rounded-full bg-white mix-blend-overlay blur-3xl filter"></div>
                    <div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-96 w-96 rounded-full bg-emerald-300 mix-blend-overlay blur-3xl filter"></div>
                    <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-1/3 h-96 w-96 rounded-full bg-teal-300 mix-blend-overlay blur-3xl filter"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 h-2 w-2 animate-pulse rounded-full bg-white"></div>
                <div className="animation-delay-1000 absolute top-40 right-40 h-3 w-3 animate-pulse rounded-full bg-white"></div>
                <div className="animation-delay-2000 absolute bottom-40 left-20 h-2 w-2 animate-pulse rounded-full bg-white"></div>
                <div className="animation-delay-3000 absolute top-60 left-1/4 h-2 w-2 animate-pulse rounded-full bg-emerald-300"></div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Left Column - Content */}
                        <div className="animate-fade-in-up">
                            {/* Badge */}
                            <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 shadow-lg backdrop-blur-sm">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400">
                                    <Award className="h-4 w-4 text-green-800" />
                                </div>
                                <span className="text-sm font-semibold">
                                    Trusted by 10,000+ Users Nationwide
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="animate-fade-in-up animation-delay-200 mb-6 text-5xl leading-tight font-extrabold md:text-5xl lg:text-5xl">
                                <span className="mb-2 block">Your Health,</span>
                                <span className="block bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                                    Just a Click Away
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="animate-fade-in-up animation-delay-400 mb-8 max-w-2xl text-xl leading-relaxed text-white/90">
                                Connect with certified doctors instantly. Get
                                prescriptions, store records securely on
                                blockchain, and take control of your healthcare
                                journey — all from home.
                            </p>

                            {/* Feature Pills */}
                            <div className="animate-fade-in-up animation-delay-500 mb-10 flex flex-wrap gap-3">
                                {[
                                    {
                                        icon: <Video className="h-4 w-4" />,
                                        text: 'HD Video Calls',
                                    },
                                    {
                                        icon: <Shield className="h-4 w-4" />,
                                        text: 'HIPAA Secure',
                                    },
                                    {
                                        icon: <Clock className="h-4 w-4" />,
                                        text: '24/7 Available',
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                                    >
                                        {item.icon}
                                        <span className="text-sm font-medium">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="animate-fade-in-up animation-delay-600 mb-8 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/register"
                                    className="group hover:shadow-3xl relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-8 py-5 font-bold text-green-600 shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started Free
                                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="animate-fade-in-up animation-delay-700 flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500 text-xs font-semibold text-white shadow-lg"
                                            >
                                                {i === 1 && '👨'}
                                                {i === 2 && '👩'}
                                                {i === 3 && '👨‍⚕️'}
                                                {i === 4 && '👩‍⚕️'}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 fill-yellow-300 text-yellow-300"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm font-medium text-white/80">
                                            4.9/5 from 5000+ reviews
                                        </p>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-white/30"></div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-300" />
                                    <span className="text-sm font-medium">
                                        No credit card required
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Visual */}
                        <div className="animate-fade-in-right animation-delay-400 relative hidden lg:block">
                            {/* Main Image Container */}
                            <div className="relative z-10">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 scale-105 rotate-3 transform rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 opacity-20 blur-3xl"></div>

                                {/* Image */}
                                <div className="relative rounded-3xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                                    <img
                                        src="/assets/images/hero_img.jpg"
                                        alt="Health Bridge Platform"
                                        className="relative w-full transform rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Floating Cards */}
                                <div className="animate-float absolute -top-6 -left-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600">
                                            <Video className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Consultations
                                            </p>
                                            <p className="text-lg font-bold text-gray-900">
                                                50,000+
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="animate-float animation-delay-2000 absolute -right-6 -bottom-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600">
                                            <Users className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Active Doctors
                                            </p>
                                            <p className="text-lg font-bold text-gray-900">
                                                500+
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="animate-float animation-delay-1000 absolute top-1/2 -right-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                                            <ShieldCheck className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Security
                                            </p>
                                            <p className="text-sm font-bold text-gray-900">
                                                Blockchain
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="animate-fade-in-up animation-delay-800 mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
                        {[
                            {
                                number: '10K+',
                                label: 'Active Users',
                                icon: <Users className="h-6 w-6" />,
                            },
                            {
                                number: '500+',
                                label: 'Verified Doctors',
                                icon: <Award className="h-6 w-6" />,
                            },
                            {
                                number: '50K+',
                                label: 'Consultations',
                                icon: <Video className="h-6 w-6" />,
                            },
                            {
                                number: '99.9%',
                                label: 'Uptime',
                                icon: <TrendingUp className="h-6 w-6" />,
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group relative transform rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/20"
                            >
                                <div className="mb-3 flex justify-center text-white/80 transition-colors group-hover:text-white">
                                    {stat.icon}
                                </div>
                                <div className="mb-2 text-3xl font-bold md:text-4xl">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-white/80 transition-colors group-hover:text-white md:text-base">
                                    {stat.label}
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute right-0 bottom-0 left-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </section>

            {/* ===== About Section ===== */}
            <section
                id="about"
                className="bg-gradient-to-br from-gray-50 via-white to-gray-50 px-6 py-24 md:px-12 lg:px-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="animate-fade-in-up mb-16 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            <HeartPulse className="h-4 w-4" />
                            About Us
                        </div>
                        <h2 className="mt-3 mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                            Revolutionizing Healthcare Access
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                            Health Bridge is more than just a telemedicine
                            platform — we're building the future of accessible,
                            secure, and intelligent healthcare
                        </p>
                    </div>

                    <div className="grid items-center gap-12 lg:grid-cols-2 mb-16">
                        {/* Left Column - Stats Grid */}
                        <div className="animate-fade-in-left grid grid-cols-2 gap-6">
                            {[
                                {
                                    icon: <Users className="h-10 w-10" />,
                                    title: '24/7 Support',
                                    desc: 'Round-the-clock assistance',
                                    gradient: 'from-green-600 to-emerald-600',
                                    bgGradient: 'from-green-50 to-emerald-50',
                                },
                                {
                                    icon: <TrendingUp className="h-10 w-10" />,
                                    title: 'Fast Growing',
                                    desc: '50% YoY growth',
                                    gradient: 'from-blue-600 to-cyan-600',
                                    bgGradient: 'from-blue-50 to-cyan-50',
                                },
                                {
                                    icon: <Clock className="h-10 w-10" />,
                                    title: 'Quick Access',
                                    desc: 'Connect in < 5 minutes',
                                    gradient: 'from-purple-600 to-pink-600',
                                    bgGradient: 'from-purple-50 to-pink-50',
                                },
                                {
                                    icon: <Star className="h-10 w-10" />,
                                    title: '4.9/5 Rating',
                                    desc: 'Based on 5000+ reviews',
                                    gradient: 'from-orange-600 to-red-600',
                                    bgGradient: 'from-orange-50 to-red-50',
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`group relative bg-gradient-to-br ${item.bgGradient} transform overflow-hidden rounded-2xl border border-gray-100 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                                >
                                    <div
                                        className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${item.gradient} -mt-16 -mr-16 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150`}
                                    ></div>
                                    <div className={`relative mb-4 bg-gradient-to-br ${item.gradient} text-white inline-flex p-3 rounded-xl`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="relative mb-2 text-lg font-bold text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="relative text-sm text-gray-600">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right Column - Text Content */}
                        <div className="animate-fade-in-right space-y-8">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 shadow-lg">
                                        <Stethoscope className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            Our Mission
                                        </h3>
                                        <p className="text-lg leading-relaxed text-gray-600">
                                            To make quality healthcare
                                            accessible to everyone, everywhere.
                                            We leverage cutting-edge blockchain
                                            technology to ensure your medical
                                            records are encrypted, private, and
                                            truly owned by you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            Our Vision
                                        </h3>
                                        <p className="text-lg leading-relaxed text-gray-600">
                                            A world where healthcare is
                                            transparent, secure, and
                                            patient-centric. Where distance is
                                            no barrier to receiving expert
                                            medical consultation and care.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                                            Our Growth
                                        </h3>
                                        <p className="text-lg leading-relaxed text-gray-600">
                                            Growing 50% year-over-year with
                                            10,000+ satisfied users and 500+
                                            certified doctors. Join the
                                            healthcare revolution today.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certification Badges - Full Width */}
                    <div className="animate-fade-in-up flex flex-wrap justify-center gap-4">
                        {[
                            {
                                icon: (
                                    <ShieldCheck className="h-5 w-5" />
                                ),
                                text: 'HIPAA Compliant',
                                color: 'from-green-100 to-emerald-100 text-green-700',
                            },
                            {
                                icon: <Award className="h-5 w-5" />,
                                text: 'ISO Certified',
                                color: 'from-blue-100 to-cyan-100 text-blue-700',
                            },
                            {
                                icon: <Lock className="h-5 w-5" />,
                                text: 'End-to-End Encrypted',
                                color: 'from-purple-100 to-pink-100 text-purple-700',
                            },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-2 bg-gradient-to-br ${badge.color} transform rounded-xl px-6 py-3 shadow-md transition-all hover:scale-105 hover:shadow-lg`}
                            >
                                {badge.icon}
                                <span className="text-sm font-semibold">
                                    {badge.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Features Section ===== */}
            <section
                id="features"
                className="relative overflow-hidden bg-white px-6 py-24 md:px-12 lg:px-24"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, rgb(34 197 94) 1px, transparent 0)',
                            backgroundSize: '40px 40px',
                        }}
                    ></div>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="animate-fade-in-up mb-20 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            <Stethoscope className="h-4 w-4" />
                            Features
                        </div>
                        <h2 className="mt-3 mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                            Powerful Tools for Better Healthcare
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                            Everything you need to manage your health in one
                            secure, intelligent platform
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: <Video className="h-10 w-10" />,
                                title: 'Virtual Consultations',
                                desc: 'Book secure HD video consultations with verified doctors anytime, anywhere. No more waiting rooms or travel time.',
                                gradient: 'from-green-600 to-emerald-600',
                                bgGradient: 'from-green-50 to-emerald-50',
                                iconBg: 'from-green-100 to-emerald-100',
                            },
                            {
                                icon: <FileText className="h-10 w-10" />,
                                title: 'Digital Prescriptions',
                                desc: 'Receive and download digital prescriptions instantly after each session. Share with pharmacies easily.',
                                gradient: 'from-blue-600 to-cyan-600',
                                bgGradient: 'from-blue-50 to-cyan-50',
                                iconBg: 'from-blue-100 to-cyan-100',
                            },
                            {
                                icon: <ShieldCheck className="h-10 w-10" />,
                                title: 'Blockchain Storage',
                                desc: 'Your medical records are encrypted, immutable, and accessible only by you. Complete data ownership guaranteed.',
                                gradient: 'from-purple-600 to-pink-600',
                                bgGradient: 'from-purple-50 to-pink-50',
                                iconBg: 'from-purple-100 to-pink-100',
                            },
                            {
                                icon: <HeartPulse className="h-10 w-10" />,
                                title: 'Health Analytics',
                                desc: 'Monitor vitals, medications, and progress with real-time health analytics. Get personalized insights.',
                                gradient: 'from-red-600 to-orange-600',
                                bgGradient: 'from-red-50 to-orange-50',
                                iconBg: 'from-red-100 to-orange-100',
                            },
                            {
                                icon: <Users className="h-10 w-10" />,
                                title: 'Smart Scheduling',
                                desc: 'Intelligent appointment booking with automated reminders, easy rescheduling, and calendar sync.',
                                gradient: 'from-indigo-600 to-purple-600',
                                bgGradient: 'from-indigo-50 to-purple-50',
                                iconBg: 'from-indigo-100 to-purple-100',
                            },
                            {
                                icon: <Lock className="h-10 w-10" />,
                                title: 'Military-Grade Security',
                                desc: 'Every conversation and file transfer is protected with advanced encryption. Your privacy is paramount.',
                                gradient: 'from-gray-700 to-slate-700',
                                bgGradient: 'from-gray-50 to-slate-50',
                                iconBg: 'from-gray-100 to-slate-100',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group animate-fade-in-up relative transform overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {/* Gradient Background on Hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                ></div>

                                {/* Content */}
                                <div className="relative">
                                    {/* Fixed Icon Container */}
                                    <div
                                        className={`inline-flex rounded-2xl bg-gradient-to-br ${feature.iconBg} mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110`}
                                    >
                                        <div className={`bg-gradient-to-br ${feature.gradient} p-3 rounded-full text-white`}>
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-gray-600">
                                        {feature.desc}
                                    </p>

                                    {/* Learn More Arrow */}
                                    <div className="mt-6 flex translate-y-2 transform items-center gap-2 text-sm font-semibold text-green-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        Learn more
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>

                                {/* Corner Accent */}
                                <div
                                    className={`absolute -right-8 -bottom-8 h-32 w-32 bg-gradient-to-br ${feature.gradient} rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150`}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="animate-fade-in-up animation-delay-600 mt-16 text-center">
                        <p className="mb-6 text-lg text-gray-600">
                            Want to see all features in action?
                        </p>
                        <Link
                            href="/features"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            Explore All Features
                            <ChevronRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== How It Works Section ===== */}
            <section
                id="how-it-works"
                className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-6 py-24 md:px-12 lg:px-24"
            >
                {/* Decorative Elements */}
                <div className="animate-blob absolute top-20 right-20 h-64 w-64 rounded-full bg-green-300 opacity-20 mix-blend-multiply blur-3xl filter"></div>
                <div className="animate-blob animation-delay-2000 absolute bottom-20 left-20 h-64 w-64 rounded-full bg-emerald-300 opacity-20 mix-blend-multiply blur-3xl filter"></div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="animate-fade-in-up mb-20 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-md">
                            <CheckCircle2 className="h-4 w-4" />
                            Simple Process
                        </div>
                        <h2 className="mt-3 mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                            Get Started in 3 Easy Steps
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                            From sign-up to your first consultation, we've made
                            the journey seamless
                        </p>
                    </div>

                    <div className="relative grid gap-12 md:grid-cols-3">
                        {/* Connecting Lines */}
                        <div className="absolute top-32 right-1/4 left-1/4 hidden h-1 md:block">
                            <div className="h-full rounded-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600"></div>
                            <div className="absolute top-0 left-0 h-full w-full animate-pulse rounded-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600"></div>
                        </div>

                        {[
                            {
                                step: '1',
                                title: 'Create Your Account',
                                desc: 'Sign up in under 2 minutes. Add your basic details, medical history, and preferences for personalized care.',
                                icon: <Users className="h-10 w-10" />,
                                features: [
                                    'Email verification',
                                    'Secure profile',
                                    'Medical history',
                                ],
                                color: 'from-green-600 to-emerald-600',
                            },
                            {
                                step: '2',
                                title: 'Find & Book',
                                desc: 'Browse our network of certified specialists. Check reviews, availability, and book instantly at your convenience.',
                                icon: <Video className="h-10 w-10" />,
                                features: [
                                    '500+ doctors',
                                    'Instant booking',
                                    'Real reviews',
                                ],
                                color: 'from-blue-600 to-cyan-600',
                            },
                            {
                                step: '3',
                                title: 'Consult & Track',
                                desc: 'Join your HD video call, get prescriptions, and track your health journey—all securely stored on blockchain.',
                                icon: <ShieldCheck className="h-10 w-10" />,
                                features: [
                                    'HD video calls',
                                    'Digital prescriptions',
                                    'Blockchain storage',
                                ],
                                color: 'from-purple-600 to-pink-600',
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="animate-fade-in-up relative"
                                style={{ animationDelay: `${i * 200}ms` }}
                            >
                                <div className="group relative transform rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                                    {/* Step Number Badge */}
                                    <div
                                        className={`absolute -top-6 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center bg-gradient-to-br ${step.color} transform rounded-2xl text-3xl font-bold text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                                    >
                                        {step.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-8 mb-6 flex justify-center">
                                        <div
                                            className={`rounded-2xl bg-gradient-to-br p-4 ${step.color} text-white shadow-lg`}
                                        >
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="mb-4 text-center text-2xl font-bold text-gray-900">
                                        {step.title}
                                    </h3>
                                    <p className="mb-6 text-center leading-relaxed text-gray-600">
                                        {step.desc}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-2">
                                        {step.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                            >
                                                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Hover Effect */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="animate-fade-in-up animation-delay-600 mt-16 text-center">
                        <div className="mb-6">
                            <p className="mb-2 text-lg text-gray-700">
                                Ready to get started?
                            </p>
                            <p className="text-sm text-gray-600">
                                Join 10,000+ users who trust Health Bridge
                            </p>
                        </div>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-10 py-5 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            Start Your Journey Free
                            <ChevronRight className="h-5 w-5" />
                        </Link>
                        <p className="mt-4 text-sm text-gray-600">
                            No credit card required • Free forever plan
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== CTA Section ===== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 px-6 py-24 text-white">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="animate-blob absolute top-20 left-10 h-96 w-96 rounded-full bg-white mix-blend-overlay blur-3xl filter"></div>
                    <div className="animate-blob animation-delay-2000 absolute right-10 bottom-20 h-96 w-96 rounded-full bg-emerald-300 mix-blend-overlay blur-3xl filter"></div>
                    <div className="animate-blob animation-delay-4000 absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-teal-300 mix-blend-overlay blur-3xl filter"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-20 h-3 w-3 animate-pulse rounded-full bg-white"></div>
                <div className="animation-delay-1000 absolute bottom-20 left-20 h-2 w-2 animate-pulse rounded-full bg-white"></div>
                <div className="animation-delay-2000 absolute top-1/3 right-1/4 h-2 w-2 animate-pulse rounded-full bg-emerald-300"></div>

                <div className="animate-fade-in-up relative mx-auto max-w-5xl text-center">
                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 shadow-lg backdrop-blur-sm">
                        <Award className="h-5 w-5" />
                        <span className="font-semibold">
                            Join 10,000+ Satisfied Users
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="mb-6 text-4xl leading-tight font-bold md:text-6xl">
                        Ready to Transform Your <br />
                        <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                            Healthcare Experience?
                        </span>
                    </h2>

                    {/* Subheading */}
                    <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
                        Join Health Bridge today and take control of your health
                        with secure, digital care. Start with a free
                        consultation!
                    </p>

                    {/* CTA Buttons */}
                    <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="group hover:shadow-3xl relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-10 py-5 font-bold text-green-600 shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started Now
                                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </Link>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-10 py-5 font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-green-600"
                        >
                            View Pricing
                            <TrendingUp className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-300" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-300" />
                            <span>Free 14-day trial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-300" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8">
                        {[
                            { number: '10K+', label: 'Active Users' },
                            { number: '500+', label: 'Doctors' },
                            { number: '4.9★', label: 'Rating' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="mb-2 text-4xl font-bold md:text-5xl">
                                    {stat.number}
                                </div>
                                <div className="text-white/80">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Footer ===== */}
            <footer className="bg-gray-900 px-6 py-16 text-gray-300 md:px-12 lg:px-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600">
                                    <Stethoscope className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">
                                    Health Bridge
                                </span>
                            </div>
                            <p className="mb-4 text-gray-400">
                                Secure. Accessible. Smart Healthcare — Powered
                                by Blockchain Technology.
                            </p>
                            <div className="flex gap-4">
                                {/* Social Media Icons - Add your social links */}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.id}>
                                        <button
                                            onClick={() =>
                                                scrollToSection(link.id)
                                            }
                                            className="transition-colors hover:text-green-400"
                                        >
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-white">
                                Support
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/faq"
                                        className="transition-colors hover:text-green-400"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/help"
                                        className="transition-colors hover:text-green-400"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="transition-colors hover:text-green-400"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="transition-colors hover:text-green-400"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-white">
                                Contact Us
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-green-400" />
                                    <a
                                        href="mailto:support@healthbridge.com"
                                        className="transition-colors hover:text-green-400"
                                    >
                                        support@healthbridge.com
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-green-400" />
                                    <a
                                        href="tel:+2348001234567"
                                        className="transition-colors hover:text-green-400"
                                    >
                                        +234 800 123 4567
                                    </a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-green-400" />
                                    <span className="text-sm">
                                        123 Health Street, Lagos, Nigeria
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Health Bridge. All
                            rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/terms"
                                className="transition-colors hover:text-green-400"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/privacy"
                                className="transition-colors hover:text-green-400"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/cookies"
                                className="transition-colors hover:text-green-400"
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Custom CSS for animations */}
            <style>
                {`
                
                `}
            </style>
        </div>
    );
}
