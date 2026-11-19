<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Food extends Model
{
    protected $table = 'foods';
    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'is_vegetarian' => 'boolean',
            'is_hidden' => 'boolean',
            'serving_grams' => 'float',
            'kcal' => 'float',
            'protein_g' => 'float',
            'carb_g' => 'float',
            'fat_g' => 'float',
            'fibre_g' => 'float',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
