/* État */
const API = 'api/';
const STORE = 'bienetre_history_v1';
let conversationHistory = [];
let isSending = false;
let speakOn = false;
const $ = id => document.getElementById(id);

/* Détection locale (secours + urgences) : début de mot pour éviter "mal" dans "normal" */
const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function matches(t, kw) {
  const k = normalize(kw).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(^|[^a-z0-9])' + k).test(t);
}
function detectEmotion(text) {
  const t = normalize(text);
  if (KB.URGENCE.keywords.some(k => matches(t, k))) return 'URGENCE';
  for (const [emo, d] of Object.entries(KB)) {
    if (emo === 'URGENCE' || !d.keywords) continue;
    if (d.keywords.some(k => matches(t, k))) return emo;
  }
  return 'NEUTRE';
}
function localReply(text) {
  const emo = detectEmotion(text);
  const pool = KB[emo].responses;
  const r = pool[Math.floor(Math.random() * pool.length)];
  return { emotion: emo, reply: r.main, tip: r.support || null };
}

/* Interface */
const getTime = () => new Date().toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
function autoResize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 100) + 'px'; }

function appendMessage(role, text, emotion, tip, note) {
  const msgs = $('messages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  let html = '';
  if (role === 'bot' && emotion) html += `<div class="emotion-label emotion-${esc(emotion)}">${esc(emotion)} ${EMOJIS[emotion] || ''}</div>`;
  if (role === 'bot' && emotion === 'URGENCE') {
    const phones = s => esc(s).replace(/(SAMU|Police|Urgences|\d{3,4})/g, '<span class="crisis-phone">$1</span>');
    html += `<div class="crisis-banner"><strong>🆘 Aide immédiate disponible</strong><p>${esc(text).replace(/\n+/g,'<br>')}</p>`;
    if (tip) html += `<p style="margin-top:8px;border-top:1px solid rgba(255,255,255,.3);padding-top:8px">${phones(tip).replace(/\n/g,'<br>')}</p>`;
    html += `</div>`;
  } else {
    html += `<div class="bubble">${esc(text).replace(/\n/g, '<br>')}</div>`;
    if (role === 'bot' && tip) html += `<div class="support-box">${esc(tip).replace(/\n/g, '<br>')}</div>`;
  }
  if (note) html += `<span class="fallback-note">${esc(note)}</span>`;
  html += `<span class="timestamp">${getTime()}</span>`;
  div.innerHTML = html;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
function showTyping() {
  const d = document.createElement('div');
  d.className = 'message bot'; d.id = 'typing';
  d.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  $('messages').appendChild(d); $('messages').scrollTop = 1e6;
}
const removeTyping = () => $('typing')?.remove();
function setLoading(on) { isSending = on; $('sendBtn').disabled = on; $('userInput').disabled = on; if (!on) $('userInput').focus(); }

/* Historique local */
function save() { try { localStorage.setItem(STORE, JSON.stringify(conversationHistory.slice(-60))); } catch {} }
function load() {
  try { conversationHistory = JSON.parse(localStorage.getItem(STORE)) || []; } catch { conversationHistory = []; }
  conversationHistory.forEach(m => appendMessage(m.role, m.text, m.emotion, m.tip));
  if (conversationHistory.length) $('quickReplies').style.display = 'none';
}

/* Voix : synthèse */
function speak(text) {
  if (!speakOn || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; speechSynthesis.speak(u);
}

/* Envoi */
async function askServer(text) {
  const history = conversationHistory.slice(-10).map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }));
  const r = await fetch(API + 'chat.php', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ messages: history })
  });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function sendMessage() {
  if (isSending) return;
  const input = $('userInput');
  const text = input.value.trim();
  if (!text) return;
  appendMessage('user', text);
  conversationHistory.push({ role: 'user', text });
  input.value = ''; input.style.height = 'auto';
  $('quickReplies').style.display = 'none';
  showTyping(); setLoading(true);

  let res, note = null;
  if (detectEmotion(text) === 'URGENCE') {          // urgence : toujours local et immédiat
    res = localReply(text);
  } else {
    try { res = await askServer(text); }
    catch { res = localReply(text); note = 'Mode hors ligne : réponses simplifiées.'; }
  }
  removeTyping();
  appendMessage('bot', res.reply, res.emotion, res.tip, note);
  conversationHistory.push({ role: 'bot', text: res.reply, emotion: res.emotion, tip: res.tip });
  save(); speak(res.reply); setLoading(false);
}

function clearChat() {
  conversationHistory = []; save();
  $('messages').innerHTML = ''; $('quickReplies').style.display = 'flex'; init();
}
function init() {
  const d = document.createElement('div'); d.className = 'message bot';
  d.innerHTML = `<div class="bubble">Bonjour 🌸<br><br>Je suis là pour t'écouter sans jugement.<br><br>Comment tu te sens aujourd'hui ?</div><span class="timestamp">${getTime()}</span>`;
  $('messages').appendChild(d);
}

/* Panneaux */
document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => { b.parentElement.classList.remove('open'); stopBreath(); });

/* Respiration guidée */
let breathTimer = null;
function stopBreath() { clearTimeout(breathTimer); const c = $('breathCircle'); c.className = 'breath-circle'; c.textContent = 'Prêt ?'; }
function startBreath() {
  let cycle = 0; const c = $('breathCircle');
  const inhale = () => {
    if (cycle++ >= 5) { stopBreath(); $('breathText').textContent = 'Bien joué 🌿'; return; }
    c.className = 'breath-circle in'; c.textContent = 'Inspire'; $('breathText').textContent = `Cycle ${cycle}/5`;
    breathTimer = setTimeout(() => { c.className = 'breath-circle out'; c.textContent = 'Expire'; breathTimer = setTimeout(inhale, 6000); }, 4000);
  };
  inhale();
}
$('breathBtn').onclick = () => $('breathPanel').classList.add('open');
$('breathStart').onclick = () => { stopBreath(); startBreath(); };

/* Suivi d'humeur (API PHP + SQLite) */
async function loadMood() {
  const chart = $('moodChart'); chart.innerHTML = '';
  try {
    const rows = await (await fetch(API + 'mood.php')).json();
    if (!rows.length) { $('moodMsg').textContent = 'Aucune entrée pour le moment.'; return; }
    $('moodMsg').textContent = 'Tes 14 dernières entrées :';
    rows.forEach(r => { const b = document.createElement('div'); b.className = 'mood-bar'; b.style.height = (r.mood * 20) + '%'; b.title = r.created_at; chart.appendChild(b); });
  } catch { $('moodMsg').textContent = 'Suivi indisponible (serveur PHP requis).'; }
}
$('moodBtn').onclick = () => { $('moodPanel').classList.add('open'); loadMood(); };
$('moodRow').onclick = async e => {
  const m = e.target.closest('button')?.dataset.m; if (!m) return;
  try { await fetch(API + 'mood.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ mood: +m }) }); } catch {}
  loadMood();
};

/* Météo (Open-Meteo, sans clé) */
$('weatherBtn').onclick = () => {
  if (!navigator.geolocation) return appendMessage('bot', "La géolocalisation n'est pas disponible sur cet appareil.");
  navigator.geolocation.getCurrentPosition(async p => {
    try {
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${p.coords.latitude}&longitude=${p.coords.longitude}&current=temperature_2m,weather_code&timezone=auto`;
      const c = (await (await fetch(u)).json()).current;
      const sun = [0,1].includes(c.weather_code);
      appendMessage('bot', `Il fait ${Math.round(c.temperature_2m)}°C dehors. ${sun ? 'Le soleil est là : une petite marche te ferait du bien ☀️' : 'Un bon moment pour une boisson chaude et une pause 🍵'}`);
    } catch { appendMessage('bot', "Je n'ai pas pu récupérer la météo."); }
  }, () => appendMessage('bot', "J'ai besoin de ta permission pour la localisation."));
};

/* Voix : reconnaissance */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) $('micBtn').style.display = 'none';
else {
  const rec = new SR(); rec.lang = 'fr-FR';
  rec.onresult = e => { $('userInput').value = e.results[0][0].transcript; autoResize($('userInput')); };
  rec.onend = () => $('micBtn').classList.remove('rec');
  $('micBtn').onclick = () => { $('micBtn').classList.add('rec'); rec.start(); };
}
$('voiceBtn').onclick = () => { speakOn = !speakOn; $('voiceBtn').textContent = speakOn ? '🔊' : '🔇'; $('voiceBtn').classList.toggle('on', speakOn); if (!speakOn) speechSynthesis.cancel(); };

/* Thème */
function setTheme(d) { document.body.classList.toggle('dark', d); $('themeBtn').textContent = d ? '☀️' : '🌙'; try { localStorage.setItem('bienetre_dark', d ? '1' : '0'); } catch {} }
$('themeBtn').onclick = () => setTheme(!document.body.classList.contains('dark'));
setTheme(localStorage.getItem('bienetre_dark') === '1');

/* Événements */
$('sendBtn').onclick = sendMessage;
$('clearBtn').onclick = clearChat;
$('userInput').oninput = e => autoResize(e.target);
$('userInput').onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
document.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { $('userInput').value = b.dataset.q; sendMessage(); });

init(); load();
