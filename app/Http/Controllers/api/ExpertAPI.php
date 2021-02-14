<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\Models\PairData;
use App\Models\IndicatorData;
use App\Models\ActiveOrder;
use Carbon\Carbon;

/*
    หมายเหตุ: API กลุ่มนี้ จะเน้นความ Lightweight อะไรที่ไม่จำเป็นให้ตัดออก
*/

class ExpertAPI extends Controller
{
    public function systemUpsertPairData(Request $request){
        try{
            $pair_data_list_tmp = json_decode($request->total_params,true);
            $pair_data_list = array();
            foreach($pair_data_list_tmp as $pair_data){
                $pair_data_list[] = array(
                    'symbol' => $pair_data['symbol'],
                    'value' => $pair_data['value'],
                    'updated_at'=> Carbon::now()->toIso8601String(),
                );
            }
            PairData::truncate();
            PairData::insert($pair_data_list);
            return 200;
        }catch (Exception $e) {
            return 500;
        }
    }

    public function systemUpsertIndicatorData(Request $request){
        try{
            $ind_data_list_tmp = json_decode($request->total_params,true);
            $ind_data_list = array();
            foreach($ind_data_list_tmp as $ind_data){
                $ind_data_list[] = array(
                    'indicator_name' => $ind_data['indicator_name'],
                    'indicator_settings' => $ind_data['indicator_settings'],
                    'symbol' => $ind_data['symbol'],
                    'timeframe' => $ind_data['timeframe'],
                    'value' => $ind_data['value'],
                    'updated_at'=> Carbon::now()->toIso8601String(),
                );
                /* ยกเลิกการ upsert เพราะมันช้า
                IndicatorData::updateOrCreate([
                    'indicator_name' => $ind_data['indicator_name'],
                    'indicator_settings' => $ind_data['indicator_settings'],
                    'symbol' => $ind_data['symbol'],
                    'timeframe' => $ind_data['timeframe'],
                ], $ind_data['value']);*/
            }
            IndicatorData::truncate();
            IndicatorData::insert($ind_data_list);
            return 200;
        }catch (Exception $e) {
            return 500;
        }
    }

    public function systemInsertActiveOrderList(Request $request)
    {
        try{
            $active_order_list_tmp = json_decode($request->total_params,true);
            $active_order_list = array();
            foreach($active_order_list_tmp as $active_order){
                $active_order_list[] = array(
                    'ticket' => $active_order['ticket'],
                    'value' => $active_order['value'],
                    'updated_at'=> Carbon::now()->toIso8601String(),
                );
            }
            ActiveOrder::truncate();
            ActiveOrder::insert($active_order_list);
            return 200;
        }catch (Exception $e) {
            return 500;
        }
    }
}
