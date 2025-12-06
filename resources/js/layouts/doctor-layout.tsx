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
    Bell,
    Calendar,
    CalendarCheck,
    ChevronDown,
    ClipboardList,
    Clock,
    FileText,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Monitor,
    Pill,
    Settings,
    User,
    Users,
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
    { name: 'Dashboard', href: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'My Patients', href: '/doctor/patients', icon: Users },
    { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
    { name: 'Schedule', href: '/doctor/schedule', icon: Clock },
    { name: 'Availability', href: '/doctor/availability', icon: CalendarCheck },
    { name: 'Consultations', href: '/doctor/consultations', icon: Video },
    // { name: 'Telemedicine', href: '/doctor/telemedicine', icon: Monitor },
    { name: 'Prescriptions', href: '/doctor/prescriptions', icon: Pill },
    { name: 'Medical Records', href: '/doctor/medical-records', icon: FileText },
    // { name: 'Messages', href: '/doctor/messages', icon: MessageSquare },
    { name: 'Wallet', href: '/doctor/wallet', icon: Wallet },
    { name: 'Profile', href: '/doctor/profile', icon: User },
    { name: 'Settings', href: '/doctor/settings', icon: Settings },
];

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;
    const currentPath = window.location.pathname;

    const handleLogout = () => {
        router.post('/logout');
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
                    <div className="flex h-20 items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700 px-6">
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
                                    Doctor Dashboard
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
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
                                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                    }`}
                                >
                                    <Icon
                                        className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`}
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
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-500" />
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
                                    className="w-48"
                                >
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4 text-blue-600" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4 text-blue-600" />
                                        <span>Settings</span>
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
                                className="text-gray-600 transition-colors hover:text-blue-600 lg:hidden"
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
                                                    className="font-medium text-gray-600 transition-colors hover:text-blue-600"
                                                >
                                                    {crumb.title}
                                                </Link>
                                            ) : (
                                                <span className="font-semibold text-blue-700">
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
                                        className="pl-10 w-72 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div> */}

                            {/* Notifications */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                                <Bell className="h-5 w-5 text-black" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
                            </Button>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2 hover:bg-blue-50"
                                    >
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
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
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/profile">
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/settings">
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <LayoutDashboard className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/dashboard">
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/appointments">
                                            <span>Appointments</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Video className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/consultations">
                                            <span>Consultations</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Pill className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/prescriptions">
                                            <span>Prescriptions</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <ClipboardList className="mr-2 h-4 w-4 text-blue-600" />
                                        <Link href="/doctor/lab-orders">
                                            <span>Lab Orders</span>
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
