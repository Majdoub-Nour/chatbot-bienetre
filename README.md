# Chatbot Bien-être 🌿

Chatbot de bien-être émotionnel (français et anglais) : il détecte les émotions et répond avec empathie grâce à un LLM (Groq) via un backend PHP sécurisé. Mode hors ligne par mots-clés, suivi d'humeur, respiration guidée, voix, mode sombre et alerte d'urgence.

## Lancer en local
1. PHP 8+ avec les extensions `curl` et `pdo_sqlite` (WAMP, XAMPP ou `php -S`).
2. Copie `api/config.example.php` en `api/config.php`.
3. Crée une clé gratuite sur https://console.groq.com/keys et colle-la dans `api/config.php` (`groq_key`).
4. Place le dossier dans `www` (WAMP) puis ouvre http://localhost/chatbot-bienetre/
   ou, avec PHP seul : `php -S localhost:8000` puis http://localhost:8000

Sans clé ou sans serveur PHP, le chatbot repasse en mode local (mots-clés).

## Fichiers
- `index.html`, `style.css`, `app.js` : interface
- `kb.js` : base de réponses locale et détection d'urgence
- `api/chat.php` : proxy vers le LLM (clé cachée, limite de messages, historique nettoyé)
- `api/mood.php` : suivi d'humeur (SQLite dans `data/`)

## Sécurité
- Ne mets jamais ta clé API dans le JavaScript ni dans Git : `api/config.php` est ignoré par `.gitignore`.
- Les messages d'urgence sont traités localement, sans passer par l'IA.
- Sur Nginx, bloque l'accès à `api/config.php` et `data/` dans la configuration du serveur.

## Avertissement
Soutien complémentaire uniquement : ce chatbot ne remplace pas un professionnel de santé mentale.