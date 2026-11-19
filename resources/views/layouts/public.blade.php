<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-slate-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? ($__env->yieldContent('title') ?: 'Secure Health Portal') }} - HealthBridge</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full font-sans antialiased text-gray-800 bg-slate-50">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-sm">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <h1 class="text-base font-bold text-gray-900 leading-tight">HealthBridge Secure Gateway</h1>
                    <p class="text-xs text-gray-500">Patient-Authorized Clinical Sharing Portal</p>
                </div>
            </div>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                End-to-End Encrypted
            </span>
        </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-8">
        @if(isset($slot))
            {{ $slot }}
        @else
            @yield('content')
        @endif
    </main>

    <footer class="py-6 text-center text-xs text-gray-400">
        &copy; {{ date('Y') }} HealthBridge. All data is protected under cryptographic zero-trust access controls.
    </footer>
</body>
</html>
