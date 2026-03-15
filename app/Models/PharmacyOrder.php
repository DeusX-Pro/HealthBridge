<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacyOrder extends Model
{
    protected $guarded = ['id'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class);
    }

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }

    public function items()
    {
        return $this->hasMany(PharmacyOrderItem::class);
    }
}
