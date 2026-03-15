<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacyOrderItem extends Model
{
    protected $guarded = ['id'];

    public function order()
    {
        return $this->belongsTo(PharmacyOrder::class, 'pharmacy_order_id');
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}
