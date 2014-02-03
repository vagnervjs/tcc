<?php

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

//extract data from the post
extract($_POST);

//set POST variables
$url = 'http://localhost:8000/material/save';

$start = microtime(true);

for ($i=0; $i < 10000; $i++) {
    $nome = generateRandomString(8);
    $data = 'nome='.urlencode($nome).'&desc=Desc ' . $nome . '&data=2013-11-11 00:00:00&tipo=doc';

    //open connection
    $ch = curl_init();

    //set the url, number of POST vars, POST data
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_POST, 1);
    curl_setopt($ch,CURLOPT_POSTFIELDS, $data);

    //execute post
    $result = curl_exec($ch);

    var_dump($result);

    //close connection
    curl_close($ch);
}

$end = microtime(true);

echo ($end - $start).' seconds';
