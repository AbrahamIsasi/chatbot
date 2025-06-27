<?php
// Leer JSON del cuerpo de la solicitud
$body = file_get_contents('php://input');

// Lista de claves desde variables de entorno
$api_keys = [
  getenv('API_KEY_1'),
  getenv('API_KEY_2'),
  getenv('API_KEY_3'),
  getenv('API_KEY_4'),
  getenv('API_KEY_5'),
  getenv('API_KEY_6'),
];

$response = null;
$httpCode = 500;

// Probar cada clave hasta que una funcione
foreach ($api_keys as $key) {
  if (!$key) continue;

  $options = [
    'http' => [
      'method'  => 'POST',
      'header'  => [
        "Content-Type: application/json",
        "Authorization: Bearer $key"
      ],
      'content' => $body,
      'ignore_errors' => true
    ]
  ];

  $context = stream_context_create($options);
  $response = @file_get_contents("https://openrouter.ai/api/v1/chat/completions", false, $context);

  // Extraer el código de respuesta HTTP
  $httpCode = 500;
  if (isset($http_response_header)) {
    foreach ($http_response_header as $header) {
      if (preg_match('#HTTP/\d+\.\d+ (\d+)#', $header, $matches)) {
        $httpCode = intval($matches[1]);
        break;
      }
    }
  }

  if ($httpCode >= 200 && $httpCode < 300 && $response) {
    break;
  }
}

// Enviar respuesta al frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
http_response_code($httpCode);

echo $response ?: json_encode([
  "error" => "No se pudo procesar la solicitud.",
  "detalle" => "Todas las claves fallaron o no hay respuesta válida."
]);
