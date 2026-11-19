<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class DiaryEntry extends Model
{
    use SoftDeletes;

    protected $guarded = [];
    public $incrementing = false;
    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'tags' => 'array',
            'entry_date' => 'date',
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

    public function annotations()
    {
        return $this->hasMany(Annotation::class, 'target_id')->where('target_type', 'DIARY_ENTRY');
    }
}
