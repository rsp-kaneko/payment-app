<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    //
    protected $fillable = [
        'payment_id',
        'items',
        'delete_flg'
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
