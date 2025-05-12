<?php

for ($zone = 0; $zone <= 1163; $zone++) {

// $zone    = 1;
    $mapcode = "$zone+899+899*80";
    $vars    = "freewgsdeg=ttps%3A%2F%2Fwww.google.co.jp%2Fmaps%2F%4033.170046%2C139.871604%2C18z&freewgsdms=33%C2%B010\'12.17N%2F139%C2%B052\'17.77E&wgs_lat=33.1700461&wgs_lon=139.8716040&wgs_lat_degree=33&wgs_lat_min=10&wgs_lat_sec=12.17&wgs_lon_degree=139&wgs_lon_min=52&wgs_lon_sec=17.77&freejpndeg=http%3A%2F%2Fwww.mapion.co.jp%2Fm%2F33.166528_139.874738_10%2F&freejpndms=33%C2%B09\'59.50N%2F139%C2%B052\'29.06E&jpn_lat=33.1665278&jpn_lon=139.8747377&jpn_lat_degree=33&jpn_lat_min=9&jpn_lat_sec=59.50&jpn_lon_degree=139&jpn_lon_min=52&jpn_lon_sec=29.06&olc=8Q5X5VCC%2B2J9V&t=mapcode&mapcode=$mapcode&lpa=RU5.XC6.SS3.ML0&geopo=Z3SWurr8";

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

    curl_close($curl);

    $latre = '/name="wgs_lat" value="([\S]*?)"/m';
    $lonre = '/name="wgs_lon" value="([\S]*?)"/m';

    preg_match_all($latre, $response, $latmatches, PREG_SET_ORDER, 0);
    preg_match_all($lonre, $response, $lonmatches, PREG_SET_ORDER, 0);

    $lat = $latmatches[0][1];
    $lon = $lonmatches[0][1];

    // to: { lat: 35.7533646, lon: 139.8719138 }
    $out = "zone: $zone to: { lat: $lat, lon: $lon } \n";

    file_put_contents('out-80.js', $out, FILE_APPEND);

    echo $out;

    usleep(500000);
}
