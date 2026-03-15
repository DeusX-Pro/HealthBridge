<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LabOrder extends Model
{
    protected $guarded = ['id'];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function medicallab(): BelongsTo
    {
        return $this->belongsTo(Medicallab::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(MedicalLabService::class, 'service_id');
    }

    public function result(): HasOne
    {
        return $this->hasOne(LabResult::class);
    }
}
