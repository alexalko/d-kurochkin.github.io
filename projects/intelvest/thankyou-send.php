<?php

$from_name = "Intelvest";
$from_email = 'fafa@dverykupevdom.rf';

$phone = trim($_POST["phone"]);
$mail = trim($_POST["mail"]);
$type = trim($_POST["type"]);

$msg = "<p><strong>$type</strong><p>";
$msg .= "<p><strong>Телефон:</strong> $phone<p>";
$msg .= "<p><strong>Почта:</strong> $mail<p>";


$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: =?UTF-8?B?".base64_encode($from_name)."?= <".$from_email.">\r\n";
if ($type != '') {
	mail("7879@mail.ru", $type, $msg, $headers);
}
?>
