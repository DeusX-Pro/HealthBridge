<x-layouts.patient>
    <x-slot:title>{{ $order->title }} - Order Details</x-slot:title>

    <div class="max-w-2xl mx-auto space-y-6">
        <div>
            <a href="{{ route('orders.index') }}" class="text-xs font-semibold text-emerald-600 hover:underline">&larr; Back to Clinical Orders</a>
            <div class="flex items-center justify-between mt-2">
                <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ $order->title }}</h1>
                <span class="text-xs px-2.5 py-1 rounded-full font-bold {{ $order->status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : ($order->status === 'CANCELLED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800') }}">
                    {{ $order->status }}
                </span>
            </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div class="grid grid-cols-2 gap-4 border-b border-gray-100 pb-6">
                <div>
                    <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order Category</div>
                    <div class="mt-1 text-sm font-bold text-gray-800">{{ $order->order_type }}</div>
                </div>
                <div>
                    <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date Requisitioned</div>
                    <div class="mt-1 text-sm font-bold text-gray-800">{{ \Carbon\Carbon::parse($order->ordered_at)->format('F d, Y h:i A') }}</div>
                </div>
            </div>

            @if($order->tenant_id)
            <div>
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Issuing Facility / Provider Tenant</div>
                <div class="mt-1 text-sm font-medium text-gray-700 font-mono">{{ $order->tenant_id }}</div>
            </div>
            @endif

            @if($order->notes)
            <div>
                <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Instructions / Clinical Indication</div>
                <div class="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">{{ $order->notes }}</div>
            </div>
            @endif

            @if($order->rejection_reason)
            <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
                <div class="font-bold mb-1">Rejection Reason:</div>
                <div>{{ $order->rejection_reason }}</div>
            </div>
            @endif

            <div class="border-t border-gray-100 pt-4 text-xs text-gray-400">
                Order ID: <code class="text-gray-600">{{ $order->id }}</code>
            </div>
        </div>
    </div>
</x-layouts.patient>

