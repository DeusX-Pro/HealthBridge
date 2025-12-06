<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmacy extends Model
{
    //
    protected $guarded = [ 'id' ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function medicineCategories()
    {
        return $this->hasMany(MedicineCategory::class);
    }

    public function medicineSubcategories()
    {
        return $this->hasMany(MedicineSubcategory::class);
    }
    
    public function medicineBrands()
    {
        return $this->hasMany(MedicineBrand::class);
    }

    public function medicines()
    {
        return $this->hasMany(Medicine::class);
    }
}
