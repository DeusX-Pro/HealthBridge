<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityProfile extends Model
{
    protected $guarded = [];
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'is_suspended' => 'boolean',
            'suspended_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
