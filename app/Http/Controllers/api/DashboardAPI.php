<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use Exception;
use App\Models\PairData;
use App\Models\IndicatorData;
use App\Models\ActiveOrder;
use Illuminate\Support\Facades\Validator;

class DashboardAPI extends Controller
{

    public function __construct()
    {
        APIController::initConst();
        
    }

    public function userGetPairData(Request $request)
    {    
        $response_data = array();
        try {
            $response_data['pair_data'] = array();
            $tmp_pair_data_list = PairData::get();
            foreach($tmp_pair_data_list as $tmp_pair_data){
                array_push($response_data['pair_data'],
                    array(
                        'symbol' => $tmp_pair_data['symbol'],
                        'value' => json_decode($tmp_pair_data['value']),
                        'updated_at' => $tmp_pair_data['updated_at']
                    )
                );
            }

            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_SUCCESS , __CLASS__ , __FUNCTION__),
                    array('description' => 'Get pair data success.')),
                'data'    =>  $response_data,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_FAILED , __CLASS__ , __FUNCTION__),
                    array('description' => APIController::getResponseDescription($e))),
                'data'    =>  $response_data,
            ]);
        }
    }

    public function userGetIndicatorData(Request $request)
    {    
        $response_data = array();
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'timeframe'         => 'required|string',
                ]
            ); 
          
            if ($validator->fails()) {
                throw new Exception($validator->errors()->first(), SAFE_EXCEPTION_CODE);
            }

            $response_data['symbol_data'] = array();
            $tmp_symbol_data_list = PairData::get();
            foreach($tmp_symbol_data_list as $tmp_symbol_data){
                array_push($response_data['symbol_data'],
                    array(
                        'symbol' => $tmp_symbol_data['symbol'],
                        'value' => json_decode($tmp_symbol_data['value']),
                        'updated_at' => $tmp_symbol_data['updated_at']
                    )
                );
            }

            $response_data['indicator_data'] = array();
            $tmp_ind_data_list = IndicatorData::where('timeframe',$request->timeframe)->get();
            foreach($tmp_ind_data_list as $tmp_ind_data){
                array_push($response_data['indicator_data'],
                    array(
                        'indicator_name' => $tmp_ind_data['indicator_name'],
                        'indicator_settings' => json_decode($tmp_ind_data['indicator_settings']),
                        'symbol' => $tmp_ind_data['symbol'],
                        'timeframe' => $tmp_ind_data['timeframe'],
                        'value' => json_decode($tmp_ind_data['value']),
                        'updated_at' => $tmp_ind_data['updated_at'],
                    )
                );
            }
            
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_SUCCESS , __CLASS__ , __FUNCTION__),
                    array('description' => 'Get indicator data success.')),
                'data'    =>  $response_data,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_FAILED , __CLASS__ , __FUNCTION__),
                    array('description' => APIController::getResponseDescription($e))),
                'data'    =>  $response_data,
            ]);
        }
    }

    public function userGetActiveOrder(Request $request)
    {
        $response_data = array();
        try {
            $response_data['active_order'] = array();
            $tmp_active_order_list = ActiveOrder::get();
            foreach($tmp_active_order_list as $tmp_active_order){
                array_push($response_data['active_order'],
                    array(
                        'ticket' => $tmp_active_order['ticket'],
                        'value' => json_decode($tmp_active_order['value']),
                        'updated_at' => $tmp_active_order['updated_at']
                    )
                );
            }
            
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_SUCCESS , __CLASS__ , __FUNCTION__),
                    array('description' => 'Get active order success.')),
                'data'    =>  $response_data,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_FAILED , __CLASS__ , __FUNCTION__),
                    array('description' => APIController::getResponseDescription($e))),
                'data'    =>  $response_data,
            ]);
        }
    }

    public function userGetActiveGroupOrder(Request $request)
    {
        $response_data = array();
        try {
            $order_list = ActiveOrder::where('value','like','%s:apt%')->get();
            $order_group_list = array();
            $order_group_id_list = array();
            foreach($order_list as $order){
                $tmp_order_value = json_decode($order['value'], TRUE);
                $order_group_id = explode(',',$tmp_order_value['comment'])[1];
                $order_group_id = explode(':',$order_group_id)[1];
                if(!isset($order_group_list[$order_group_id])){
                    $order_group_list[$order_group_id] = array();
                }
                if(!in_array($order_group_id,$order_group_id_list)){
                    array_push($order_group_id_list,$order_group_id);
                }
                array_push($order_group_list[$order_group_id],
                    array(
                        "ticket"=>$order["ticket"],
                        "value"=>json_decode($order["value"], TRUE),
                        "updated_at"=>$order["updated_at"],
                    )
                );
            }

            $response_data['order_group_id_list'] = $order_group_id_list;
            $response_data['order_list'] = $order_group_list;
            
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_SUCCESS , __CLASS__ , __FUNCTION__),
                    array('description' => 'Get active group order success.')),
                'data'    =>  $response_data,
            ]);
        }catch (Exception $e) {
            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_FAILED , __CLASS__ , __FUNCTION__),
                    array('description' => APIController::getResponseDescription($e))),
                'data'    =>  $response_data,
            ]);
        }
    }
}
