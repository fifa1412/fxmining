<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('main')->with('name', 'dashboard'); });
Route::get('/dashboard', function () { return view('main')->with('name', 'dashboard'); });
Route::get('/active_order', function () { return view('main')->with('name', 'active_order'); });
Route::get('/active_group_order', function () { return view('main')->with('name', 'active_group_order'); });
Route::get('/strategies/all_pair_trade', function () { return view('main')->with('name', 'strategies.all_pair_trade'); });
