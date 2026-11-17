<?php
require __DIR__ . '/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['error' => 'POST requis'], 405);
$prov = $cfg['provider'];
$useGemini = $prov === 'gemini';
$keys = ['gemini' => $cfg['gemini_key'], 'groq' => $cfg['groq_key'], 'claude' => $cfg['api_key']];
if (empty($keys[$prov])) out(['error' => 'Clé API manquante'], 500);

// Limite de débit par session
$now = time();
$_SESSION['hits'] = array_filter($_SESSION['hits'] ?? [], fn($t) => $t > $now - 3600);
if (count($_SESSION['hits']) >= $cfg['rate_limit']) out(['error' => 'Trop de messages, réessaie plus tard'], 429);
$_SESSION['hits'][] = $now;

// Nettoyage de l'historique reçu (10 derniers messages, 1000 caractères max chacun)
$in = json_decode(file_get_contents('php://input'), true);
$msgs = [];
foreach (array_slice($in['messages'] ?? [], -10) as $m) {
    $role = ($m['role'] ?? '') === 'assistant' ? 'assistant' : 'user';
    $text = trim(mb_substr((string)($m['content'] ?? ''), 0, 1000));
    if ($text === '') continue;
    if ($msgs && end($msgs)['role'] === $role) { $msgs[count($msgs)-1]['content'] .= "\n" . $text; continue; }
    $msgs[] = ['role' => $role, 'content' => $text];
}
while ($msgs && $msgs[0]['role'] !== 'user') array_shift($msgs);
if (!$msgs || end($msgs)['role'] !== 'user') out(['error' => 'Message invalide'], 400);

$system = <<<TXT
Tu es un chatbot de bien-être émotionnel, chaleureux et sans jugement. Réponds TOUJOURS dans la langue du DERNIER message de l'utilisateur (reply et tip compris) : s'il écrit en anglais, réponds en anglais ; en français, réponds en français avec tutoiement. Ignore la langue des messages précédents. 2 à 4 phrases courtes.
Tu écoutes, reformules et proposes une petite action simple. Tu ne poses pas de diagnostic et ne remplaces pas un professionnel : tu le suggères si la détresse persiste.
Si la personne évoque l'envie de mourir ou de se faire du mal, tu restes calme, tu l'encourages à contacter immédiatement une personne proche et les urgences (Tunisie : SAMU 190, Police 197).
Réponds UNIQUEMENT avec un objet JSON : {"emotion":"...","reply":"...","tip":"..."}
emotion ∈ JOIE, TRISTESSE, STRESS, PEUR, COLERE, MOTIVATION, SOLITUDE, CONFIANCE, RELATION, SANTÉ, GRATITUDE, NEUTRE, URGENCE. tip = un conseil pratique d'une phrase.
TXT;

if ($useGemini) {
    $contents = array_map(fn($m) => ['role' => $m['role'] === 'assistant' ? 'model' : 'user', 'parts' => [['text' => $m['content']]]], $msgs);
    $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($cfg['gemini_model']) . ':generateContent';
    $headers = ['content-type: application/json', 'x-goog-api-key: ' . $cfg['gemini_key']];
    $body = ['systemInstruction' => ['parts' => [['text' => $system]]], 'contents' => $contents,
             'generationConfig' => ['maxOutputTokens' => 1000, 'responseMimeType' => 'application/json']];
} elseif ($prov === 'groq') {
    $url = 'https://api.groq.com/openai/v1/chat/completions';
    $headers = ['content-type: application/json', 'authorization: Bearer ' . $cfg['groq_key']];
    $body = ['model' => $cfg['groq_model'], 'max_tokens' => 1500, 'response_format' => ['type' => 'json_object'],
             'messages' => array_merge([['role' => 'system', 'content' => $system]], $msgs)];
    if (str_contains($cfg['groq_model'], 'gpt-oss')) $body['reasoning_effort'] = 'low';
} else {
    $url = 'https://api.anthropic.com/v1/messages';
    $headers = ['content-type: application/json', 'x-api-key: ' . $cfg['api_key'], 'anthropic-version: 2023-06-01'];
    $body = ['model' => $cfg['model'], 'max_tokens' => $cfg['max_tokens'], 'system' => $system, 'messages' => $msgs];
}
$ch = curl_init($url);
curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTPHEADER => $headers, CURLOPT_POSTFIELDS => json_encode($body)]);
$raw = curl_exec($ch); $code = curl_getinfo($ch, CURLINFO_HTTP_CODE); $cerr = curl_error($ch); curl_close($ch);
if ($raw === false || $code !== 200) out(['error' => 'Service indisponible', 'detail' => $raw === false ? $cerr : (json_decode($raw, true)['error']['message'] ?? substr($raw, 0, 300))], 502);

$resp = json_decode($raw, true);
$text = $useGemini ? ($resp['candidates'][0]['content']['parts'][0]['text'] ?? '')
      : ($prov === 'groq' ? ($resp['choices'][0]['message']['content'] ?? '') : ($resp['content'][0]['text'] ?? ''));
$text = preg_replace('/^```(?:json)?\s*|\s*```$/m', '', trim($text));
$j = json_decode($text, true);
$valid = ['JOIE','TRISTESSE','STRESS','PEUR','COLERE','MOTIVATION','SOLITUDE','CONFIANCE','RELATION','SANTÉ','GRATITUDE','NEUTRE','URGENCE'];
if (!is_array($j) || empty($j['reply'])) $j = ['emotion' => 'NEUTRE', 'reply' => $text ?: 'Je t’écoute 🌿', 'tip' => null];
out([
    'emotion' => in_array($j['emotion'] ?? '', $valid, true) ? $j['emotion'] : 'NEUTRE',
    'reply'   => (string)$j['reply'],
    'tip'     => !empty($j['tip']) ? (string)$j['tip'] : null,
]);
