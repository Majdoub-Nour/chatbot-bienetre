<?php
require __DIR__ . '/bootstrap.php';
@mkdir(dirname($cfg['db_path']), 0775, true);
$db = new PDO('sqlite:' . $cfg['db_path']);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec('CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY AUTOINCREMENT, sid TEXT, mood INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP)');
$sid = session_id();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $m = (int)(json_decode(file_get_contents('php://input'), true)['mood'] ?? 0);
    if ($m < 1 || $m > 5) out(['error' => 'Humeur invalide'], 400);
    $db->prepare('INSERT INTO moods (sid, mood) VALUES (?, ?)')->execute([$sid, $m]);
    out(['ok' => true]);
}
$st = $db->prepare('SELECT mood, created_at FROM (SELECT * FROM moods WHERE sid = ? ORDER BY id DESC LIMIT 14) ORDER BY id');
$st->execute([$sid]);
out($st->fetchAll(PDO::FETCH_ASSOC));
