<?php

$f3=require('lib/base.php');
require 'src/firebaseLib.php';


$name = $f3->get('POST.Name');
$surname = $f3->get('POST.Surname');
$age = $f3->get('POST.Age');



$url = 'https://project-8047891479059242296.firebaseio.com/';
$token = '30nl1qnVnGJMYJarCCZZYz703TOQxoeNbv8Tuklq';
$firebase = new Firebase\FirebaseLib($url, $token);

$user =  array('Name' => $name, 'Surname' => $surname, 'Age' => $age);

$data = $firebase->get('/');
echo $data;

$firebase->push('/',$user);

?>