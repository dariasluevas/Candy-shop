<?php

/* Принимаем данные из формы */
  $email = $_POST["Email"];

/* Подключаемся к базе данных */
$link = mysqli_connect("localhost", "root", "");
mysqli_select_db($link, "vhod");

/* Записываем данные в БД */ 
$sql = "INSERT INTO entrance(Email) VALUES ('$email')";
$result=mysqli_query($link, $sql);

/* Делаем редирект обратно */
header("Location: ".$_SERVER["HTTP_REFERER"]); 
exit;

?>