<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;
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
    
    public function category()
    {
        return $this->belongsTo(MedicineCategory::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(MedicineSubcategory::class);
    }

    public function brand()
    {
        return $this->belongsTo(MedicineBrand::class);
    }
}
