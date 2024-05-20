<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Eloquent;

class PairData extends Eloquent 
{
    use HasFactory;

    protected $table = 'pair_data';
    protected $fillable = [
        'symbol',
        'value',
    ];
    const UPDATED_AT = null;

}
