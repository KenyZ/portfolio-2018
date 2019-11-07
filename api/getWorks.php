<?php

require 'init.php';

$req = $db->query('SELECT id, title, id_name, workOrder FROM '. $DATABASE['works'] .' ORDER BY workOrder');
$data = [];

while($row = $req->fetch(PDO::FETCH_ASSOC)){
    array_push($data, $row);
}

if(count($data) > 0){
    echo json_encode(array(
        'code' => 200,
        'data' => $data
    ));
} else {
    http_response_code(404);
    echo json_encode([
        'code' => 404
    ]);
}
