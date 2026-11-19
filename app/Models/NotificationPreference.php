<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationPreference extends Model
{
    protected $guarded = [];
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'medication_reminders' => 'boolean',
            'cycle_reminders' => 'boolean',
            'screening_reminders' => 'boolean',
            'email_notifications' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
