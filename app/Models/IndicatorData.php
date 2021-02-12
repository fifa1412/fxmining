<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;


class IndicatorData extends Eloquent 
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'indicator_data';
    protected $fillable = [
        'indicator_name',
        'indicator_settings', 
        'symbol',
        'timeframe',
        'value',
        'updated_at',
    ];

}
