<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class RequestLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        //here you can check the request to be logged
        $log = [
                 'URI' => $request->getUri(),
                 'METHOD' => $request->getMethod(),
                 'REQUEST_BODY' => $request->all(),
                 'RESPONSE' => $response->getContent()
               ];

               var_dump("DDFDFDFFD");

        return $response;
    }
}