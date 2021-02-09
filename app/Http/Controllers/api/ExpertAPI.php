<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\Models\PairData;
use App\Models\IndicatorData;

/*
    หมา่ยเหตุ: API กลุ่มนี้ จะเน้นความ Lightweight อะไรที่ไม่จำเป็นให้ตัดออก
*/

class ExpertAPI extends Controller
{
    public function systemUpsertPairData(Request $request){
        try{
            $pair_list = json_decode($request->data,true);
            foreach($pair_list as $pair){
                PairData::updateOrCreate(['symbol' => $pair['symbol']], $pair['value']);
            }
            return 200;
        }catch (Exception $e) {
            return 500;
        }
    }

    public function systemUpsertIndicatorData(Request $request){
        try{
            $ind_data_list = json_decode($request->data,true);
            
            foreach($ind_data_list as $ind_data){
                //error_log(print_r($ind_data,true));
                IndicatorData::updateOrCreate([
                    'indicator_name' => $ind_data['indicator_name'],
                    'indicator_settings' => $ind_data['indicator_settings'],
                    'symbol' => $ind_data['symbol'],
                    'timeframe' => $ind_data['timeframe'],
                ], $ind_data);
            }
            return 200;
        }catch (Exception $e) {
            return 500;
        }
    }
}
