<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class PairData extends Eloquent 
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'pair_data';
    protected $fillable = [
        'symbol',
        'price_ask', 
        'price_bid',
        'swap_long',
        'swap_short',
    ];
    public $timestamps = true;

}
