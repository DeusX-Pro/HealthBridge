<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NutritionProfile extends Model
{
    protected $guarded = [];
    protected $primaryKey = 'user_id';
    public $incrementing = false;

    protected function casts(): array
    {
        return [
            'allergens' => 'array',
            'excluded_categories' => 'array',
            'target_date' => 'date',
            'pregnant_or_breastfeeding' => 'boolean',
            'eating_disorder_history' => 'boolean',
            'diet_affecting_condition' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
