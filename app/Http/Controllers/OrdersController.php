<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $type = $request->query('type');

        $orders = Order::where('user_id', $user->id)
            ->when($type, fn($q) => $q->where('order_type', $type))
            ->orderByDesc('ordered_at')
            ->paginate(15);

        return view('orders.index', compact('orders', 'type'));
    }

    public function show(string $id)
    {
        $order = Order::where('user_id', auth()->id())->findOrFail($id);
        return view('orders.show', compact('order'));
    }
}

