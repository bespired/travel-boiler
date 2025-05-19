<?php

$urlfile = file_get_contents("./check.urls.txt");
$urls    = explode("\n", $urlfile);

foreach ($urls as $url) {

    $check   = intval(explode("&check=", $url)[1]);
    $result  = "";
    $mapcode = "";

    echo "$url\n";
    $result = file_get_contents($url);

    $re = '/<input type ="text" name="mapcode" value="([\s\S]*?)"/m';

    preg_match_all($re, $result, $matches, PREG_SET_ORDER, 0);

    if ($matches) {
        $mapcode = $matches[0][1];
    }

    $parts = intval(trim(explode(" ", $mapcode)[0]));

    if ($parts == $check) {
        echo "OK    " . $parts . ' = ' . $check . "\n";
    } else {
        echo "ERROR " . $parts . ' ≠ ' . $check . "\n";
    }
    sleep(4);
}
exit;

function allZones()
{

}
