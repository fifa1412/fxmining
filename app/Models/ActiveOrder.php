<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class ActiveOrder extends Eloquent 
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'active_order';
    protected $fillable = [
        'ticket',
        'value',
        'updated_at',
    ];

}
