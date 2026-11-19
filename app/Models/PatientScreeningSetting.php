<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientScreeningSetting extends Model
{
    protected $guarded = [];
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'self_exam_reminder_active' => 'boolean',
            'family_history_prostate' => 'boolean',
            'family_history_testicular' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
