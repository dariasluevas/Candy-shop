<?php

/* Принимаем данные из формы */
  $name = $_POST["Name"]; 
  $surname = $_POST["Surname"];
  $email = $_POST["Email"];
  $text_message = $_POST["Message"];

/* Подключаемся к базе данных */
$link = mysqli_connect("localhost", "root", "");
mysqli_select_db($link, "obr_sv");

/* Записываем данные в БД */ 
$sql = "INSERT INTO reviews(Name, Surname, Email, Message) VALUES ('$name', '$surname', '$email', '$text_message')";
$result=mysqli_query($link, $sql);

/* Делаем редирект обратно */
header("Location: ".$_SERVER["HTTP_REFERER"]); 
exit;

?>