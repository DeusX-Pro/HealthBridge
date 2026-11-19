<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? ($__env->yieldContent('title') ?: 'HealthBridge') }} - Encrypted Health Vault</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full font-sans antialiased text-gray-800 pb-20 md:pb-6" x-data="{ userMenuOpen: false }">
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between items-center">
                <!-- Brand & Logo -->
                <div class="flex items-center gap-3">
                    <a href="{{ route('today') }}" class="flex items-center gap-2 group">
                        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-sm transition-transform group-hover:scale-105">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
                            </svg>
                        </div>
                        <span class="text-xl font-bold tracking-tight text-gray-900 hidden sm:inline">HealthBridge</span>
                    </a>

                    <!-- Privacy Shield Badge -->
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                        <svg class="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Vault Encrypted
                    </span>
                </div>

                <!-- Desktop Nav Links -->
                <nav class="hidden md:flex items-center space-x-1 lg:space-x-4">
                    <a href="{{ route('today') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('today') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Today</a>
                    <a href="{{ route('timeline.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('timeline.*') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Timeline</a>
                    <a href="{{ route('diary.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('diary.*') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Diary</a>
                    <a href="{{ route('measurements.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('measurements.*') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Vitals</a>
                    <a href="{{ route('documents.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('documents.*') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Documents</a>
                    <a href="{{ route('medications.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('medications.*') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Medications</a>
                    @if (auth()->user()->isFemale())
                        <a href="{{ route('cycle.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('cycle.*') || request()->routeIs('contraception.*') ? 'bg-rose-50 text-rose-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Cycle</a>
                    @elseif (auth()->user()->isMale())
                        <a href="{{ route('mens-health.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('mens-health.*') ? 'bg-sky-50 text-sky-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Men's Health</a>
                    @endif
                    <a href="{{ route('nutrition.index') }}" class="px-3 py-2 rounded-lg text-sm font-semibold {{ request()->routeIs('nutrition.*') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }}">Nutrition</a>
                </nav>

                <!-- Actions: Quick Exit, Notifications, User Menu -->
                <div class="flex items-center gap-3">
                    <!-- Quick Exit Emergency Button -->
                    <a href="https://www.google.com" target="_self" title="Quick Exit: Immediately leaves this site to protect your privacy" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors">
                        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        <span class="hidden sm:inline">Quick Exit</span>
                    </a>

                    <!-- Notification Bell -->
                    <a href="{{ route('notifications.index') }}" class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                        @php $unread = auth()->user()->notifications()->whereNull('read_at')->count(); @endphp
                        @if ($unread > 0)
                            <span class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">{{ $unread }}</span>
                        @endif
                    </a>

                    <!-- User Profile Dropdown -->
                    <div class="relative" @click.away="userMenuOpen = false">
                        <button @click="userMenuOpen = !userMenuOpen" class="flex items-center gap-2 rounded-full p-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-xs uppercase shadow-sm">
                                {{ substr(auth()->user()->first_name, 0, 1) }}{{ substr(auth()->user()->last_name, 0, 1) }}
                            </div>
                        </button>

                        <div x-show="userMenuOpen"
                             x-transition:enter="transition ease-out duration-100"
                             x-transition:enter-start="transform opacity-0 scale-95"
                             x-transition:enter-end="transform opacity-100 scale-100"
                             x-transition:leave="transition ease-in duration-75"
                             x-transition:leave-start="transform opacity-100 scale-100"
                             x-transition:leave-end="transform opacity-0 scale-95"
                             style="display: none;"
                             class="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 divide-y divide-gray-100">
                            <div class="px-3 py-2">
                                <p class="text-sm font-semibold text-gray-900">{{ auth()->user()->name }}</p>
                                <p class="text-xs text-gray-500 truncate">{{ auth()->user()->email }}</p>
                                <span class="mt-1 inline-block text-[11px] font-mono text-gray-400">{{ auth()->user()->public_reference }}</span>
                            </div>
                            <div class="py-1">
                                <a href="{{ route('settings.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Profile & Baselines</a>
                                <a href="{{ route('settings.security') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Security & 2FA</a>
                                <a href="{{ route('sharing.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Care Team & Sharing</a>
                                <a href="{{ route('community.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Community Forums</a>
                                <a href="{{ route('checklists.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Checklists</a>
                                <a href="{{ route('safety.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Safety Plan</a>
                                <a href="{{ route('articles.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Articles & Library</a>
                                <a href="{{ route('hospitals.index') }}" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Hospital Feeds</a>
                            </div>
                            <div class="py-1">
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="w-full text-left px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg">Sign Out</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Global Flash Feedback Alerts -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        @if (session('success'))
            <div class="mb-4 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-emerald-800 shadow-sm" x-data="{ show: true }" x-show="show">
                <div class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>{{ session('success') }}</span>
                </div>
                <button @click="show = false" class="text-emerald-600 hover:text-emerald-900">&times;</button>
            </div>
        @endif
        @if (session('error'))
            <div class="mb-4 flex items-center justify-between rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm font-medium text-rose-800 shadow-sm" x-data="{ show: true }" x-show="show">
                <div class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{{ session('error') }}</span>
                </div>
                <button @click="show = false" class="text-rose-600 hover:text-rose-900">&times;</button>
            </div>
        @endif
        @if (session('info'))
            <div class="mb-4 flex items-center justify-between rounded-xl bg-sky-50 border border-sky-200 p-4 text-sm font-medium text-sky-800 shadow-sm" x-data="{ show: true }" x-show="show">
                <div class="flex items-center gap-2">
                    <svg class="h-5 w-5 text-sky-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <span>{{ session('info') }}</span>
                </div>
                <button @click="show = false" class="text-sky-600 hover:text-sky-900">&times;</button>
            </div>
        @endif
    </div>

    <!-- Main Content Area -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        @if(isset($slot))
            {{ $slot }}
        @else
            @yield('content')
        @endif
    </main>

    <!-- Mobile Bottom Navigation Bar -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex justify-around items-center">
        <a href="{{ route('today') }}" class="flex flex-col items-center text-xs font-semibold {{ request()->routeIs('today') ? 'text-emerald-600' : 'text-gray-500' }}">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span class="mt-1">Today</span>
        </a>
        <a href="{{ route('timeline.index') }}" class="flex flex-col items-center text-xs font-semibold {{ request()->routeIs('timeline.*') ? 'text-emerald-600' : 'text-gray-500' }}">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span class="mt-1">Timeline</span>
        </a>
        @if (auth()->user()->isFemale())
            <a href="{{ route('cycle.index') }}" class="flex flex-col items-center text-xs font-semibold {{ request()->routeIs('cycle.*') ? 'text-rose-600' : 'text-gray-500' }}">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
                <span class="mt-1">Cycle</span>
            </a>
        @elseif (auth()->user()->isMale())
            <a href="{{ route('mens-health.index') }}" class="flex flex-col items-center text-xs font-semibold {{ request()->routeIs('mens-health.*') ? 'text-sky-600' : 'text-gray-500' }}">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="14" r="6"/><line x1="14.5" x2="21" y1="9.5" y2="3"/><polyline points="15 3 21 3 21 9"/></svg>
                <span class="mt-1">Health</span>
            </a>
        @endif
        <a href="{{ route('documents.index') }}" class="flex flex-col items-center text-xs font-semibold {{ request()->routeIs('documents.*') ? 'text-emerald-600' : 'text-gray-500' }}">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span class="mt-1">Vault</span>
        </a>
        <a href="{{ route('settings.index') }}" class="flex flex-col items-center text-xs font-semibold {{ request()->routeIs('settings.*') || request()->routeIs('sharing.*') ? 'text-emerald-600' : 'text-gray-500' }}">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span class="mt-1">More</span>
        </a>
    </nav>
</body>
</html>
