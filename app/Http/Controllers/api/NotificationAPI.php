<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Controllers\APIController;
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

            $url        = APIController::getConfig('LINE_NOTIFY_SERVER');
            $headers    = [
                            'Content-Type: application/x-www-form-urlencoded',
                            'Authorization: Bearer '.$token
                        ];
            $fields     = 'message='.$request->message;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $result = curl_exec($ch);
            curl_close($ch);
            $result = json_decode($result,TRUE);

            if($result['status']!=200){
                throw new Exception('Send line notify unsuccessfully.', SAFE_EXCEPTION_CODE);
            }

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
