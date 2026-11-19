<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientLegalConsent extends Model
{
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function legalDocument()
    {
        return $this->belongsTo(LegalDocument::class);
    }
}
