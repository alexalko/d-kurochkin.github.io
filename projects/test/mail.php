<?php

$recepient = "jasonhicks@ya.ru";
// $recepient = "berendeeva_a@mail.ru";
$sitename = 'Сайт "Газон в туле"';

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$message = "Имя: $name \nТелефон: $phone \n";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");