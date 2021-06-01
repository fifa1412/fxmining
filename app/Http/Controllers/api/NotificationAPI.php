<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Controllers\APIController;
use App\Http\Controllers\system\Notification;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Validator;

class NotificationAPI extends Controller
{

    public function __construct()
    {
        APIController::initConst();
        
    }

    public function systemSendLineNotify(Request $request)
    {    
        $response_data = array();
        try {

            $validator = Validator::make(
                $request->all(),
                [
                    'token_id'      => 'required|string',
                    'message'       => 'required|string',
                ]
            ); 

            $token      = APIController::getConfig('LINE_NOTIFY_TOKEN.'.$request->token_id);
            if($token == ""){
                throw new Exception('Token id not found.', SAFE_EXCEPTION_CODE);
            }
            $message = $request->message;

            Notification::sendNotification($token, $message);

            return response()->json([
                'status'  =>  array_merge(APIController::getResponseStatus(HTTP_STATUS_SUCCESS , __CLASS__ , __FUNCTION__),
                    array('description' => 'Send line notify successfully.')),
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
