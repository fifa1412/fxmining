<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use Exception;
use App\Models\RequestOrder;
use Illuminate\Support\Facades\Validator;

class OrderAPI extends Controller
{

    public function __construct()
    {
        APIController::initConst();
        
    }

    public function userExecuteOrder(Request $request)
    {    
        $response_data = array();
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    "type"              => 'required|string',
                    "symbol"            => 'required|string',
                    "lot"               => 'required|string',
                    "trade_system"      => 'required|string',
                    "order_id"          => 'required|string',
                    "order_group_id"    => 'required|string',
                ]
            ); 
          
            if ($validator->fails()) {
                throw new Exception($validator->errors()->first(), SAFE_EXCEPTION_CODE);
            }

            RequestOrder::insert(array_merge($validator->validated(),['status'=>'request']));

            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_SUCCESS , __CLASS__ , __FUNCTION__),
                    array('description' => 'Execute order success.')),
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
