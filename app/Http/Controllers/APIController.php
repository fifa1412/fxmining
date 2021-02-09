<?php

namespace App\Http\Controllers;

use Exception;

class APIController extends Controller
{

    public static function initConst()
    {
        define('HTTP_STATUS_SUCCESS',array(
            'code'=>200,
            'message'=>'success'
        ));
        define('HTTP_STATUS_FAILED',array(
            'code'=>500,
            'message'=>'failed'
        ));
        define('SAFE_EXCEPTION_CODE', 99);
    }

    public static function getResponseStatus($status,$class,$method){
        return array(
            'location'  => (new \ReflectionClass($class))->getShortName() . '_' . $method,
            'code'      => $status['code'],
            'message'   => $status['message'],
        );
    }

    public static function getResponseDescription(Exception $e){
        return $e->getMessage();
    }
   
}
