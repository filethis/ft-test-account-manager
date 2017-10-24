<?php

$request = new HttpRequest();
$request->setUrl('{{SERVER}}/api/v1/accounts');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
    'cache-control' => 'no-cache',
    'authorization' => 'Basic {{BASIC}}',
    'content-type' => 'text/plain; charset=utf-8'
));

$request->setBody('{ "partnerAccountId": "{{PARTNER_ACCOUNT_ID}}" }');

try {
    $response = $request->send();
    echo $response->getBody();
} catch (HttpException $ex) {
    echo $ex;
}