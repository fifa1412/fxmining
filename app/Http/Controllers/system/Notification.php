<?php

namespace App\Http\Controllers\system;
use App\Http\Controllers\APIController;
use Exception;

class Notification
{

    public static function sendNotification($token, $message)
    {
            if($token == null){
                $token = APIController::getConfig('LINE_NOTIFY_TOKEN.default');
            }
            $url        = APIController::getConfig('LINE_NOTIFY_SERVER');
            $headers    = [
                            'Content-Type: application/x-www-form-urlencoded',
                            'Authorization: Bearer '.$token
                        ];
            $fields     = 'message='.$message;

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
    }
   
   
}
