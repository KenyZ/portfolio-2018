<?php

require 'init.php';

function notfound(){
    echo json_encode([
        'code' => 404
    ]);
}

if(isset($_GET['name'])){

    $getSingle = 'SELECT @wid := w.id as id, @current := w.workOrder as workOrder, w.id_name, w.title, w.pitch, w.description, w.created_at, w.role, w.team, w.outils, w.link FROM '. $DATABASE['works'] .' w WHERE w.id_name=?;';
    $getImages = 'SELECT wi.path, wi.alt FROM '. $DATABASE['worksImages'] .' wi WHERE wi.workId = @wid;';

    $getNeighbours = 'SELECT w.id_name, w.workOrder, w.title FROM '. $DATABASE['works'] .' w WHERE ( w.workOrder = IFNULL((select min(workOrder) FROM '. $DATABASE['works'] .' where workOrder > @current),-1) or workOrder = IFNULL((select max(workOrder) FROM '. $DATABASE['works'] .' where workOrder < @current),-1)) ORDER BY w.workOrder;';

    $req = $db->prepare($getSingle . $getImages . $getNeighbours);
    $req->execute(array($_GET['name']));
    $data = $req->fetch(PDO::FETCH_ASSOC);

    if($data){
        $req->nextRowset();
        $data['images'] = [];
        while($row = $req->fetch(PDO::FETCH_ASSOC)){
            array_push($data['images'], $row);
        }

        $req->nextRowset();

        $data['neightbours'] = [];
        while($row = $req->fetch(PDO::FETCH_ASSOC)){
            $row['isPrev'] = intval($data['workOrder']) > intval($row['workOrder']);
            array_push($data['neightbours'], $row);
        }
    }

    if($data){
        echo json_encode(array(
            'code' => 200,
            'data' => $data
        ));
    } else {
        notfound();
    }
    
} else {
    notfound();
}




// while($row = $req->fetch(PDO::FETCH_ASSOC)){
//     array_push($data, $row);
// }

// if(count($data) > 0){
//     http_response_code(200);
//     echo json_encode($data);
// } else {
//     http_response_code(404);
//     echo json_encode([
//         'messsage' => 'No works found'
//     ]);
// }
