<?php

$request = new HttpRequest();
$request->setUrl('{{SERVER}}/api/v1/accounts/');
$request->setMethod(HTTP_METH_DELETE);

$request->setHeaders(array(
    'cache-control' => 'no-cache',
    'authorization' => 'Basic {{BASIC}}'
));

try {
    $response = $request->send();
    echo $response->getBody();
} catch (HttpException $ex) {
    echo $ex;
}