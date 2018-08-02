<?php

$from_name = "Intelvest";
$from_email = 'fafa@dverykupevdom.rf';

$phone = trim($_POST["phone"]);
$type = trim($_POST["type"]);

$msg = "<p><strong>$type</strong><p>";
$msg .= "<p><strong>Телефон:</strong> $phone<p>";
if(!empty($_POST['mail'])) {
	$msg .= "<p><strong>Почта:</strong> ".trim($_POST["mail"])."</p>";
}
if(!empty($_POST['profit'])) {
	$msg .= "<p><strong>Ежемеячная выручка:</strong> ".trim($_POST["profit"])."</p>";
}
if(!empty($_POST['doc_num'])) {
	$msg .= "<p><strong>Кол-во документов в месяц:</strong> ".trim($_POST["doc_num"])."</p>";
}
if(!empty($_POST['stuff_num'])) {
	$msg .= "<p><strong>Кол-во сотрудников:</strong> ".trim($_POST["stuff_num"])."</p>";
}
if(!empty($_POST['nolog'])) {
	$msg .= "<p><strong>Система налогообложения:</strong> ".trim($_POST["nolog"])."</p>";
}



$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";
if ($type != '') {
	mail("7879@mail.ru", $type, $msg, $headers);
}
?>
