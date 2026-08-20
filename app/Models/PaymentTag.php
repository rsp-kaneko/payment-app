<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentTag extends Model
{
    //
    protected $fillable = [
        'payment_id',
        'tag_id',
    ];
}
