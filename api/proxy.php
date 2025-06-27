<?php
// Leer la clave secreta desde las variables de entorno
$api_key = getenv("DEEPSEEK_API_KEY");

// Leer el body enviado por el navegador
$body = file_get_contents('php://input');

// Reenviar la solicitud al API de DeepSeek
$ch = curl_init("https://api.deepseek.com/v1/chat/completions");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Bearer $api_key"
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Reenviar la respuesta original al frontend
http_response_code($httpcode);
header("Content-Type: application/json");
echo $response;
