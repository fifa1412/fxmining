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
}
