<?php

$request = new HttpRequest();
$request->setUrl('{{SERVER}}/api/v1/accounts/{{ACCOUNT_ID}}/tokens');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
    'cache-control' => 'no-cache',
    'authorization' => 'Basic {{API_CREDENTIALS}}',
    'content-type' => 'text/plain; charset=utf-8'
));

$request->setBody('{ "expiresIn": {{EXPIRES_IN}} }');

try {
    $response = $request->send();
    echo $response->getBody();
} catch (HttpException $ex) {
    echo $ex;
}