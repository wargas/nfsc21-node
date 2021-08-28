<?php 

$texto = file_get_contents('./test.txt');

echo md5($texto), PHP_EOL;