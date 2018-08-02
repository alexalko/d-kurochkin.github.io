<?php

$from_name = "Intelvest";
$from_email = 'client@intelvest.ru';

$phone = trim($_POST["phone"]);
$type = trim($_POST["type"]);

$msg = "<p><strong>$type</strong><p>";
$msg .= "<p><strong>Телефон:</strong> $phone<p>";

if(!empty($_POST['calc_mail'])) {
	$msg .= "<p><strong>Почта:</strong> ".trim($_POST["calc_mail"])."</p>";
}
if(!empty($_POST['calc_mode'])) {
	$msg .= "<p><strong>Режим калькулятора:</strong> ".trim($_POST["calc_mode"])."</p>";
}
if(!empty($_POST['calc_money'])) {
	$msg .= "<p><strong>Ежемеcячная выручка:</strong> ".trim($_POST["calc_money"])."</p>";
}
if(!empty($_POST['calc_alt-money'])) {
	$msg .= "<p><strong>Ежемеcячная выручка (введено с доп. формы):</strong> ".trim($_POST["calc_alt-money"])."</p>";
}
if(!empty($_POST['calc_operations'])) {
	$msg .= "<p><strong>Кол-во операций в месяц:</strong> ".trim($_POST["calc_operations"])."</p>";
}
if(!empty($_POST['calc_alt-operations'])) {
	$msg .= "<p><strong>Кол-во операций в месяц (введено с доп. формы):</strong> ".trim($_POST["calc_alt-operations"])."</p>";
}
if(!empty($_POST['calc_employees'])) {
	$msg .= "<p><strong>Кол-во сотрудников:</strong> ".trim($_POST["calc_employees"])."</p>";
}
if(!empty($_POST['calc_tax-mode'])) {
	$msg .= "<p><strong>Система налогообложения:</strong> ".trim($_POST["calc_tax-mode"])."</p>";
}
if(!empty($_POST['calc_price-full'])) {
	$msg .= "<p><strong>Полная стоимость:</strong> ".trim($_POST["calc_price-full"])."</p>";
}
if(!empty($_POST['calc_price'])) {
	$msg .= "<p><strong>Стоимость со скидкой:</strong> ".trim($_POST["calc_price"])."</p>";
}




$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";
if ($type != '') {
	mail("7879@mail.ru", $type, $msg, $headers);
}
?>
