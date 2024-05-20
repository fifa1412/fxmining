<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Jenssegers\Mongodb\Eloquent\Model as Eloquent; // ### Change From MongoDB To MySQL ### //
use Illuminate\Database\Eloquent\Model;

class IndicatorData extends Model 
{
    use HasFactory;

    protected $table = 'indicator_data';
    protected $fillable = [
        'indicator_name',
        'indicator_settings', 
        'symbol',
        'timeframe',
        'value',
    ];
    const UPDATED_AT = null;
}

// ### Change From MongoDB To MySQL ### //
// class IndicatorData extends Eloquent 
// {
//     use HasFactory;

//     protected $connection = 'mongodb';
//     protected $collection = 'indicator_data';
//     protected $fillable = [
//         'indicator_name',
//         'indicator_settings', 
//         'symbol',
//         'timeframe',
//         'value',
//         'updated_at',
//     ];

// }
