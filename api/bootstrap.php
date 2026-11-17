<?php
// Les avertissements PHP ne doivent jamais s'afficher dans la réponse JSON
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ob_start();
session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax']);
session_start();
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
$cfg = require __DIR__ . '/config.php';
function out($data, int $code = 200): void { ob_end_clean(); http_response_code($code); echo json_encode($data, JSON_UNESCAPED_UNICODE); exit; }