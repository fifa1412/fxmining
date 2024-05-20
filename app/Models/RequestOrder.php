<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Eloquent;


class RequestOrder extends Eloquent 
{
    use HasFactory;

    protected $table = 'request_order';
    protected $primaryKey = 'id';
    protected $fillable = [
        'type',
        'symbol',
        'lot',
        'trade_system',
        'order_id',
        'order_group_id',
        'status',
        'order_ticket',
    ];
    const UPDATED_AT = null;

}
