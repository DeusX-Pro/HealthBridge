import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Activity,
    Bell,
    Bot,
    Calendar,
    ChevronDown,
    ClipboardList,
    FileText,
    Heart,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Phone,
    Pill,
    Settings,
    Stethoscope,
    Store,
    User,
    Video,
    Wallet,
    X,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    [key: string]: any; // Add index signature to satisfy the constraint
}

const navigationItems = [
    { name: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
    // { name: 'AI Doctor', href: '/patient/ai-doctor', icon: Bot },
    { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
    { name: 'Doctors', href: '/patient/doctors', icon: Stethoscope },
    { name: 'Prescriptions', href: '/patient/prescriptions', icon: Pill },
    { name: 'Lab Results', href: '/patient/lab-results', icon: FileText },
    {name: 'Health Records', href: '/patient/health-records', icon: ClipboardList },
    { name: 'Health Tips', href: '/patient/health-tips', icon: Heart },
    // { name: 'Vitals Tracking', href: '/patient/vitals-tracking', icon: Activity },
    // { name: 'Telemedicine', href: '/patient/telemedicine', icon: Video },
    { name: 'Pharmacies', href: '/patient/pharmacies', icon: Store },
    // { name: 'Messages', href: '/patient/messages', icon: MessageSquare },
    { name: 'Wallet', href: '/patient/wallet', icon: Wallet },
    // { name: 'Emergency', href: '/patient/emergency', icon: Phone },
    { name: 'Profile', href: '/patient/profile', icon: User },
    { name: 'Settings', href: '/patient/settings', icon: Settings },
];

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;
    const currentPath = window.location.pathname;

    const handleLogout = () => {
        router.post('/logout'); // Replace '/logout' with the correct logout route if different
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-gray-200/80 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo Section */}
                    <div className="flex h-20 items-center justify-between border-b border-gray-100 bg-gradient-to-r from-green-600 to-green-700 px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <img
                                    src="/assets/images/hb_logo.png"
                                    alt="logo"
                                    className="mx-auto w-24"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">
                                    Health Bridge
                                </h1>
                                <p className="text-xs text-green-100">
                                    Patient Dashboard
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-white/80 transition-colors hover:text-white lg:hidden"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPath === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30'
                                            : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                    }`}
                                >
                                    <Icon
                                        className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`}
                                    />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto h-2 w-2 animate-pulse rounded-full bg-white" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="border-t border-gray-100 bg-gray-50/50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 shadow-lg">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {auth.user.name}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                    {auth.user.email}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel className="font-semibold">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm">
                                                {auth.user.name}
                                            </p>
                                            <p className="text-xs font-normal text-gray-500">
                                                {auth.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/wallet"
                                            className="flex w-full items-center"
                                        >
                                            <Wallet className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Wallet</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/profile"
                                            className="flex w-full items-center"
                                        >
                                            <User className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/settings"
                                            className="flex w-full items-center"
                                        >
                                            <Settings className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/appointments"
                                            className="flex w-full items-center"
                                        >
                                            <Calendar className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Appointments</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/prescriptions"
                                            className="flex w-full items-center"
                                        >
                                            <Pill className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Prescriptions</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/lab-results"
                                            className="flex w-full items-center"
                                        >
                                            <FileText className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Lab Results</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Header */}
                <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-lg">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-gray-600 transition-colors hover:text-green-600 lg:hidden"
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            {/* Breadcrumbs */}
                            {breadcrumbs && breadcrumbs.length > 0 && (
                                <nav className="hidden items-center space-x-2 text-sm sm:flex">
                                    <Home className="h-4 w-4 text-gray-400" />
                                    {breadcrumbs.map((crumb, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <span className="mx-2 text-gray-300">
                                                /
                                            </span>
                                            {crumb.href ? (
                                                <Link
                                                    href={crumb.href}
                                                    className="font-medium text-gray-600 transition-colors hover:text-green-600"
                                                >
                                                    {crumb.title}
                                                </Link>
                                            ) : (
                                                <span className="font-semibold text-green-700">
                                                    {crumb.title}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            )}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            {/* <div className="hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Search anything..."
                                        className="pl-10 w-72 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                    />
                                </div>
                            </div> */}

                            {/* Notifications */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative transition-colors hover:bg-green-50 hover:text-green-600"
                            >
                                <Bell className="h-5 w-5 text-black" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
                            </Button>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2 hover:bg-green-50"
                                    >
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-700 shadow-md">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel className="font-semibold">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm">
                                                {auth.user.name}
                                            </p>
                                            <p className="text-xs font-normal text-gray-500">
                                                {auth.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/wallet"
                                            className="flex w-full items-center"
                                        >
                                            <Wallet className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Wallet</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/profile"
                                            className="flex w-full items-center"
                                        >
                                            <User className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/settings"
                                            className="flex w-full items-center"
                                        >
                                            <Settings className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/appointments"
                                            className="flex w-full items-center"
                                        >
                                            <Calendar className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Appointments</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/prescriptions"
                                            className="flex w-full items-center"
                                        >
                                            <Pill className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Prescriptions</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href="/patient/lab-results"
                                            className="flex w-full items-center"
                                        >
                                            <FileText className="mr-2 h-4 w-4 text-green-600" />
                                            <span>Lab Results</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
