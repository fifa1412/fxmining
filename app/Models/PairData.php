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
        'value',
        'updated_at',
    ];

}
