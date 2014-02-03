<?php

//extract data from the post
extract($_POST);

//set POST variables
$url = 'http://localhost:8000/aluno/get';

$start = microtime(true);

for ($i=0; $i < 10000; $i++) {
    $id = rand (0, 350937);
    $data = 'id='.urlencode($id);

    //open connection
    $ch = curl_init();

    //set the url, number of POST vars, POST data
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_POST, 1);
    curl_setopt($ch,CURLOPT_POSTFIELDS, $data);

    //execute post
    $result = curl_exec($ch);

    echo $result;

    //close connection
    curl_close($ch);
}

$end = microtime(true);

echo "==> " . ($end - $start) .' seconds';
