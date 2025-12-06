<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineBrand extends Model
{
    //

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class);
    }

    public function medicines()
    {
        return $this->hasMany(Medicine::class);
    }
}
