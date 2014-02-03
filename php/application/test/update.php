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
$url = 'http://127.0.0.1:3000/aluno/update';

$start = microtime(true);

for ($i=0; $i < 10000; $i++) {
    $nome = generateRandomString(8);
    $id = rand(0, 380937);
    $data = 'nome='.urlencode($nome).'&id=528ea35a0eeadbeb6c001466';

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
