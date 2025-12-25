<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalLabService extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function medicallab()
    {
        return $this->belongsTo(Medicallab::class);
    }
}
