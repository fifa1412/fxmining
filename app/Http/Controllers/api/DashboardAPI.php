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
            $response_data['pair_data'] = PairData::get();

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

            $response_data['symbol_data'] = PairData::get();
            $response_data['indicator_data'] = IndicatorData::where('timeframe',$request->timeframe)->get();
            
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
            $response_data['active_order'] = ActiveOrder::get();
            
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
            $order_list = ActiveOrder::where('value.comment','like','%s:apt%')->get();
            $order_group_list = array();
            $order_group_id_list = array();
            foreach($order_list as $order){
                $order_group_id = explode(',',$order['value']['comment'])[1];
                $order_group_id = explode(':',$order_group_id)[1];
                if(!isset($order_group_list[$order_group_id])){
                    $order_group_list[$order_group_id] = array();
                }
                if(!in_array($order_group_id,$order_group_id_list)){
                    array_push($order_group_id_list,$order_group_id);
                }
                array_push($order_group_list[$order_group_id],$order);
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
