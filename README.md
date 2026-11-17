# Chatbot Bien-être 🌿

## Lancer en local
1. PHP 8+ avec les extensions curl et pdo_sqlite.
2. Définir la clé : `export ANTHROPIC_API_KEY="sk-ant-..."` (ou la mettre dans `api/config.php`).
3. Dans ce dossier : `php -S localhost:8000` puis ouvrir http://localhost:8000

Sans clé ou sans serveur PHP, le chatbot repasse automatiquement en mode local (mots-clés).

## Fichiers
- `index.html`, `style.css`, `app.js`, `kb.js` : interface et base locale
- `api/chat.php` : proxy Claude (clé cachée, limite de messages, historique nettoyé)
- `api/mood.php` : suivi d'humeur (SQLite dans `data/`)

## Sécurité
La clé API ne doit jamais être dans le JavaScript. Les urgences sont traitées localement, sans passer par l'IA.
Sur Apache, les `.htaccess` protègent `config.php` et `data/`. Sur Nginx, bloquer ces chemins dans la config.
