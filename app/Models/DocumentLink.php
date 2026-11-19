<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentLink extends Model
{
    protected $guarded = ['id'];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
