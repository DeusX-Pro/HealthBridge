<x-layouts.patient>
    <x-slot:title>Clinical Orders & Requisitions - HealthBridge</x-slot:title>

    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Clinical Orders</h1>
                <p class="text-sm text-gray-500">Track hospital requisitions, prescriptions, and lab orders issued by your doctors.</p>
            </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
            <a href="{{ route('orders.index') }}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold {{ empty($type) ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">All Orders</a>
            <a href="{{ route('orders.index', ['type' => 'LAB']) }}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold {{ $type === 'LAB' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">Lab Tests</a>
            <a href="{{ route('orders.index', ['type' => 'PRESCRIPTION']) }}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold {{ $type === 'PRESCRIPTION' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">Prescriptions</a>
            <a href="{{ route('orders.index', ['type' => 'IMAGING']) }}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold {{ $type === 'IMAGING' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }}">Imaging</a>
        </div>

        @if($orders->isEmpty())
            <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                <h3 class="text-base font-semibold text-gray-900">No clinical orders found</h3>
                <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">When your connected healthcare providers place requisitions, lab orders, or medications, they will automatically sync here.</p>
            </div>
        @else
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="divide-y divide-gray-100">
                    @foreach($orders as $order)
                        <div class="p-5 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex items-start gap-3.5">
                                <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                                    @if($order->order_type === 'LAB')
                                        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                                    @elseif($order->order_type === 'PRESCRIPTION')
                                        <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                                    @else
                                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    @endif
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h3 class="text-sm font-bold text-gray-900">{{ $order->title }}</h3>
                                        <span class="text-xs px-2 py-0.5 rounded-full font-medium {{ $order->status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : ($order->status === 'CANCELLED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800') }}">
                                            {{ $order->status }}
                                        </span>
                                    </div>
                                    <p class="text-xs text-gray-500 mt-1 line-clamp-1">{{ $order->notes ?: 'No additional notes provided.' }}</p>
                                    <div class="text-[11px] text-gray-400 mt-1">
                                        Ordered: {{ \Carbon\Carbon::parse($order->ordered_at)->format('M d, Y h:i A') }}
                                        @if($order->tenant_id) &bull; Hospital ID: {{ $order->tenant_id }} @endif
                                    </div>
                                </div>
                            </div>

                            <div>
                                <a href="{{ route('orders.show', $order->id) }}" class="inline-flex items-center px-3.5 py-1.5 border border-gray-200 text-xs font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
                                    View Details
                                </a>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="mt-4">
                {{ $orders->links() }}
            </div>
        @endif
    </div>
</x-layouts.patient>

