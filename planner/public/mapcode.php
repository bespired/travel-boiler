<?php

$lat = $_GET['lat'];
$lon = $_GET['lon'];

$vars = "freewgsdeg=https%3A%2F%2Fwww.google.co.jp%2Fmaps%2F%4039.669601%2C140.371688%2C18z&freewgsdms=39%C2%B040%2710.56N%2F140%C2%B022%2718.08E&t=wgsdeg&wgs_lat=$lat&wgs_lon=$lon&wgs_lat_degree=39&wgs_lat_min=40&wgs_lat_sec=10.56&wgs_lon_degree=140&wgs_lon_min=22&wgs_lon_sec=18.08&freejpndeg=http%3A%2F%2Fwww.mapion.co.jp%2Fm%2F39.666806_140.375139_10%2F&freejpndms=39%C2%B040%270.50N%2F140%C2%B022%2730.50E&jpn_lat=39.6668056&jpn_lon=140.3751389&jpn_lat_degree=39&jpn_lat_min=40&jpn_lat_sec=0.50&jpn_lon_degree=140&jpn_lon_min=22&jpn_lon_sec=30.50&olc=8RF2M99C%2BRMW2&mapcode=999+000+000*00&lpa=SS9.XD5.VE1.WP0&geopo=Z6UK5Zwi";

echo "$mapcode \n";

// return [10, 20];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL            => 'https://saibara.sakura.ne.jp/map/convgeo.cgi',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_MAXREDIRS      => 10,
    CURLOPT_TIMEOUT        => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST  => 'POST',
    CURLOPT_POSTFIELDS     => $vars,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/x-www-form-urlencoded',
    ],
]);

$response = curl_exec($curl);

echo $response;
curl_close($curl);
