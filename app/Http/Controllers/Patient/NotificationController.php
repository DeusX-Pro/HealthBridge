<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $notifications = $user->notifications;

        return Inertia::render('dashboard/patient/notifications/index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead($id): RedirectResponse
    {
        $user = Auth::user();
        
        if ($id === 'all') {
            $user->unreadNotifications->markAsRead();
        } else {
            $notification = $user->notifications()->findOrFail($id);
            $notification->markAsRead();
        }

        return back();
    }

    public function destroy($id): RedirectResponse
    {
        $user = Auth::user();
        
        if ($id === 'all') {
            $user->notifications()->delete();
        } else {
            $notification = $user->notifications()->findOrFail($id);
            $notification->delete();
        }

        return back();
    }
}
