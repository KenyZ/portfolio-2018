
<?php

header("Access-Control-Allow-Origin: *");
$DATABASE = array(
    'works' => 'p2k19_works',
    'worksImages' => 'p2k19_works_images'
);
$devMode = true;

header("Content-Type: application/json; charset=UTF-8");


$DB_HOST = !$devMode ? '#' : 'localhost';
$DB_NAME = !$devMode ? '#' : 'portfolio2019v2';
$DB_LOGIN = !$devMode ? '#' : 'root';
$DB_PASSWD = !$devMode ? '#' : '';

$db = null;



try {
    $options = array(
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
    );
    $db = new PDO('mysql:host=' . $DB_HOST . ';dbname=' . $DB_NAME, $DB_LOGIN, $DB_PASSWD, $options);
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}


