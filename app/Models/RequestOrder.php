<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class RequestOrder extends Eloquent 
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'request_order';
    protected $fillable = [
        'type',
        'symbol',
        'lot',
        'trade_system',
        'order_code',
    ];

}
