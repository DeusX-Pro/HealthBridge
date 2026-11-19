<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-gray-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? config('app.name', 'HealthBridge') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full font-sans antialiased text-gray-800">
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <a href="{{ route('home') }}" class="inline-flex items-center gap-2">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>
                    </svg>
                </div>
                <span class="text-2xl font-bold tracking-tight text-gray-900">HealthBridge</span>
            </a>
            <h2 class="mt-4 text-xl font-bold tracking-tight text-gray-900">{{ $heading ?? 'Your Encrypted Health Companion' }}</h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            @if (session('status'))
                <div class="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-emerald-800">
                    {{ session('status') }}
                </div>
            @endif
            @if (session('error'))
                <div class="mb-4 rounded-lg bg-rose-50 border border-rose-200 p-4 text-sm font-medium text-rose-800">
                    {{ session('error') }}
                </div>
            @endif

            <div class="bg-white px-6 py-8 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
                {{ $slot }}
            </div>
        </div>
    </div>
</body>
</html>

