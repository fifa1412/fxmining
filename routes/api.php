<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(
    [
        'middleware' => 'api',
        'namespace'  => 'App\Http\Controllers\api',
    ],
    function () {
        Route::post('Expert/systemUpsertPairData', 'ExpertAPI@systemUpsertPairData');
        Route::post('Expert/systemUpsertIndicatorData', 'ExpertAPI@systemUpsertIndicatorData');
        Route::post('Expert/systemInsertActiveOrderList', 'ExpertAPI@systemInsertActiveOrderList');
        
        Route::post('Dashboard/userGetPairData', 'DashboardAPI@userGetPairData');
        Route::post('Dashboard/userGetIndicatorData', 'DashboardAPI@userGetIndicatorData');
        Route::post('Dashboard/userGetActiveOrder', 'DashboardAPI@userGetActiveOrder');
    }
);