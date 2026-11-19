<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContraceptionPlan extends Model
{
    protected $guarded = [];
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'reminder_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
