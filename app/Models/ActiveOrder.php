<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Eloquent;


class ActiveOrder extends Eloquent 
{
    use HasFactory;

    protected $table = 'active_order';
    protected $fillable = [
        'ticket',
        'value',
    ];
    const UPDATED_AT = null;

}
