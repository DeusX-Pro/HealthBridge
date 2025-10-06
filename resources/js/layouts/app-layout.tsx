import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useState } from 'react';
import { 
    Menu, X, Bell, Search, ChevronDown, LogOut, Settings, User, 
    Home, LayoutDashboard, Users, FileText, BarChart3, Package,
    TrendingUp, Calendar, Zap
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Statistics', href: '/statistics', icon: BarChart3 },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
];

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = '/dashboard'; // This should come from your router

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white border-r border-gray-200/80 transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-xl ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo Section */}
                    <div className="flex h-20 items-center justify-between px-6 border-b border-gray-100 bg-gradient-to-r from-green-600 to-green-700">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">Your Brand</h1>
                                <p className="text-green-100 text-xs">Dashboard</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-white/80 hover:text-white transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
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
                                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto h-2 w-2 rounded-full bg-white animate-pulse" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                                <p className="text-xs text-gray-500 truncate">john@example.com</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4 text-green-600" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4 text-green-600" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
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
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200/80 shadow-sm">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-600 hover:text-green-600 transition-colors"
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            {/* Breadcrumbs */}
                            {breadcrumbs && breadcrumbs.length > 0 && (
                                <nav className="hidden sm:flex items-center space-x-2 text-sm">
                                    <Home className="h-4 w-4 text-gray-400" />
                                    {breadcrumbs.map((crumb, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="mx-2 text-gray-300">/</span>
                                            {crumb.href ? (
                                                <Link
                                                    href={crumb.href}
                                                    className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                                                >
                                                    {crumb.title}
                                                </Link>
                                            ) : (
                                                <span className="text-green-700 font-semibold">
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
                            <div className="hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Search anything..."
                                        className="pl-10 w-72 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                    />
                                </div>
                            </div>

                            {/* Notifications */}
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="relative hover:bg-green-50 hover:text-green-600 transition-colors"
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
                            </Button>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-green-50">
                                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4 text-green-600" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4 text-green-600" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 cursor-pointer">
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
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}