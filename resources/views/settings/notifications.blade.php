<x-layouts.patient>
    <x-slot:title>Notifications & Timezone - HealthBridge</x-slot:title>

    <div class="space-y-6 max-w-4xl mx-auto">
        <div>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight">Notification Preferences</h1>
            <p class="text-sm text-gray-500">Configure reminder schedules, preferred clinical timezone, and in-app alerts.</p>
        </div>

        <!-- Settings Sub-Navigation Tabs -->
        <div class="flex items-center gap-2 border-b border-gray-200 pb-3">
            <a href="{{ route('settings.index') }}" class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Profile & Health Interests
            </a>
            <a href="{{ route('settings.security') }}" class="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Security & Two-Factor
            </a>
            <a href="{{ route('settings.notifications') }}" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm">
                Notifications & Schedules
            </a>
        </div>

        <!-- Preferences Form -->
        <form action="{{ route('settings.notifications.save') }}" method="POST" class="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            @csrf
            @method('PUT')

            <div class="border-b border-gray-100 pb-4">
                <h2 class="text-base font-bold text-gray-900">Schedule & Channel Preferences</h2>
                <p class="text-xs text-gray-400 mt-0.5">Automated medication times and cycle predictions are aligned to your timezone.</p>
            </div>

            <div>
                <label for="timezone" class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Timezone</label>
                <select id="timezone" name="timezone" class="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                    @foreach(['Africa/Lagos', 'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Dubai', 'Asia/Tokyo'] as $tz)
                        <option value="{{ $tz }}" {{ old('timezone', $prefs->timezone ?? 'Africa/Lagos') === $tz ? 'selected' : '' }}>{{ $tz }}</option>
                    @endforeach
                </select>
                @error('timezone') <p class="text-xs text-rose-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="space-y-3">
                <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="medication_reminders" value="1" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" {{ $prefs->medication_reminders ? 'checked' : '' }}>
                    <div>
                        <div class="text-xs font-bold text-gray-900">Medication Dose Reminders</div>
                        <div class="text-[11px] text-gray-400">Receive alerts at your scheduled dose times throughout the day.</div>
                    </div>
                </label>

                @if(auth()->user()->isFemale())
                <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="cycle_reminders" value="1" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" {{ $prefs->cycle_reminders ? 'checked' : '' }}>
                    <div>
                        <div class="text-xs font-bold text-gray-900">Menstrual & Ovulation Predictions</div>
                        <div class="text-[11px] text-gray-400">Receive notifications 2 days prior to predicted period start.</div>
                    </div>
                </label>
                @endif

                <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="screening_reminders" value="1" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" {{ $prefs->screening_reminders ? 'checked' : '' }}>
                    <div>
                        <div class="text-xs font-bold text-gray-900">Preventative Screening & Self-Check Alerts</div>
                        <div class="text-[11px] text-gray-400">Monthly reminders for routine breast or testicular self-examinations.</div>
                    </div>
                </label>

                <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="email_notifications" value="1" class="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" {{ $prefs->email_notifications ? 'checked' : '' }}>
                    <div>
                        <div class="text-xs font-bold text-gray-900">Email Summaries</div>
                        <div class="text-[11px] text-gray-400">Receive security alerts and weekly health digests via email.</div>
                    </div>
                </label>
            </div>

            <div class="pt-4 flex justify-end border-t border-gray-100">
                <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
                    Save Notification Settings
                </button>
            </div>
        </form>

        <!-- Notification Center / In-App Alerts -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 class="text-base font-bold text-gray-900">Notification History</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Recent automated reminders and account security notifications.</p>
                </div>
                <form action="{{ route('settings.notifications.read-all') }}" method="POST">
                    @csrf
                    <button type="submit" class="text-xs font-semibold text-emerald-600 hover:underline">
                        Mark all as read
                    </button>
                </form>
            </div>

            @if($notifications->isEmpty())
                <div class="p-10 text-center text-xs text-gray-400">
                    No notifications in your inbox.
                </div>
            @else
                <div class="divide-y divide-gray-100">
                    @foreach($notifications as $n)
                        <div class="p-4 sm:px-6 flex items-start justify-between gap-4 {{ $n->read_at ? 'bg-white' : 'bg-emerald-50/30' }}">
                            <div>
                                <div class="text-xs font-bold text-gray-900">{{ $n->title }}</div>
                                <div class="text-xs text-gray-600 mt-0.5">{{ $n->body }}</div>
                                <div class="text-[10px] text-gray-400 mt-1">{{ $n->created_at->diffForHumans() }}</div>
                            </div>
                            @if(!$n->read_at)
                                <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" title="Unread"></span>
                            @endif
                        </div>
                    @endforeach
                </div>

                <div class="p-4 border-t border-gray-100">
                    {{ $notifications->links() }}
                </div>
            @endif
        </div>
    </div>
</x-layouts.patient>

