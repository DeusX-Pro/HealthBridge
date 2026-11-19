<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SafetyPlan extends Model
{
    protected $guarded = [];
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'warning_signs' => 'array',
            'coping_strategies' => 'array',
            'distractions' => 'array',
            'emergency_contacts' => 'array',
            'professional_contacts' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
