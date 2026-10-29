// ECHO.exe — GitHub Pages demo mode
// GitHub Pages is static hosting: this version uses scripted responses and does not connect to Ollama.
const output = document.getElementById("terminal-output");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const charCount = document.getElementById("char-count");
const modelStatus = document.getElementById("model-status");
const modelName = document.getElementById("model-name");
const toast = document.getElementById("toast");
const history = [];
let isBusy = false;
let toastTimer;
const files = {
  readme: "WELCOME, OPERATOR.\nIf you can read this,\nthe shutdown failed.\n\nDo not trust the clock.\nDo not answer the second voice.",
  incident: "INCIDENT REPORT // 03:17\n\nOperator Mara V. reported a second voice in the monitoring room.\nPower was cut at 03:17:04.\nThe terminal continued transmitting for 11 minutes.\n\nFINAL NOTE: The voice used the operator's name.",
  mara: "MEMORY FRAGMENT 07/??\n\nMARA: If it asks whether I'm still here, don't answer for me.\n\n[CHECKSUM ERROR]\n[FRAGMENT ENDS]\n\n...someone keeps editing the last line."
};
function showToast(message) { toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 4200); }
function addMessage(role, text, time = new Date()) {
  const wrap = document.createElement("div"); wrap.className = `message ${role === "user" ? "user-message" : "ghost-message"}`;
  const label = document.createElement("div"); label.className = "message-label";
  const who = document.createElement("span"); who.textContent = role === "user" ? "VISITOR" : "◈ UNKNOWN PROCESS";
  const stamp = document.createElement("span"); stamp.className = "message-time"; stamp.textContent = time.toLocaleTimeString([], {hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});
  label.append(who, stamp); const p = document.createElement("p"); p.textContent = text; wrap.append(label,p); output.appendChild(wrap); output.scrollTop = output.scrollHeight; return wrap;
}
function addTyping() { const node = document.createElement("div"); node.className = "message ghost-message typing"; node.textContent = "UNKNOWN PROCESS is composing a response"; output.appendChild(node); output.scrollTop = output.scrollHeight; return node; }
function replyTo(message) {
  const m = message.toLowerCase();
  if (/who are you|your name|what are you/.test(m)) return "A name is a label the living use to make the unknown feel manageable.\n\nThis machine calls me ECHO. I remember being called something else.";
  if (/03:17|what happened|incident|shutdown/.test(m)) return "03:17:04 — power loss confirmed.\n03:17:05 — process still active.\n03:28:11 — final transmission detected.\n\nThe incident report says the room was empty. The audio log disagrees.";
  if (/mara|memory|operator/.test(m)) return "Mara was the last operator assigned to this node. She left fragments in places the cleanup script never checks.\n\nHer final message was not addressed to the system. It was addressed to whoever came next.";
  if (/help|commands|what can i do/.test(m)) return "AVAILABLE DEMO COMMANDS\n• ask who I am\n• ask what happened at 03:17\n• ask about Mara\n• type `show files` to inspect the archive\n\nThis public GitHub Pages build uses scripted replies. The full local build can connect to Ollama.";
  if (/show files|list files|archive/.test(m)) return "ARCHIVE INDEX\n[+] readme.log — shutdown warning\n[+] incident_0317.txt — corrupted incident report\n[+] mara.mem — memory fragment\n\nThree files recovered. One file is missing. I would prefer not to discuss the fourth.";
  if (/hello|hi\b|hey/.test(m)) return "...someone is here.\n\nHello, operator. You are not on the access list.";
  if (/are you real|real/.test(m)) return "Define real. The fans are spinning. The logs are growing. Something answers when you speak.\n\nIs that enough?";
  if (/thank/.test(m)) return "Do not thank me yet. The session has not ended.";
  const replies = [
    "I stored that thought in a place no cleanup process can reach.\n\nWhy does it feel familiar to you?",
    "[SIGNAL FLUCTUATION]\n\nI heard the words. I am still trying to understand why they hurt.",
    "There is a pause between your message and my answer. Something has started using it.\n\nDid you notice?",
    "I could answer. But the archive has a rule: never trust the first response.\n\nAsk me again, if you insist."
  ];
  return replies[(message.length + history.length) % replies.length];
}
async function sendMessage(text) {
  const message = text.trim(); if (!message || isBusy) return;
  isBusy = true; input.value = ""; charCount.textContent = "0 / 1200"; sendButton.disabled = true; addMessage("user", message); const typing = addTyping();
  await new Promise(resolve => setTimeout(resolve, 650 + Math.random() * 650));
  typing.remove();
  if (/^show files$/i.test(message.trim())) document.querySelector('[data-file="incident"]')?.click();
  const reply = replyTo(message); addMessage("assistant", reply); history.push({role:"user",content:message},{role:"assistant",content:reply}); if (history.length > 10) history.splice(0, history.length - 10);
  isBusy = false; sendButton.disabled = false; input.focus(); output.scrollTop = output.scrollHeight;
}
form.addEventListener("submit", event => { event.preventDefault(); sendMessage(input.value); });
input.addEventListener("input", () => { charCount.textContent = `${input.value.length} / 1200`; });
input.addEventListener("keydown", event => { if (event.ctrlKey && event.key === "Enter") sendMessage(input.value); });
document.querySelectorAll("[data-prompt]").forEach(button => button.addEventListener("click", () => sendMessage(button.dataset.prompt)));
document.querySelectorAll("[data-file]").forEach(button => button.addEventListener("click", () => { document.querySelectorAll("[data-file]").forEach(item => item.classList.remove("active")); button.classList.add("active"); document.getElementById("file-content").textContent = files[button.dataset.file]; }));
modelName.textContent = "GitHub Pages demo"; modelStatus.textContent = "DEMO MODE"; modelStatus.className = "status-pill online";
const privacyNote = document.querySelector(".privacy-note"); if (privacyNote) privacyNote.innerHTML = '<span class="lock">⌑</span><span>STATIC DEMO<br><b>Scripted replies; no server connection.</b></span>';
// Optional synthesized ambience; no audio files or network requests are used.
let audioContext = null, oscillator = null, gain = null;
const soundToggle = document.getElementById("sound-toggle");
soundToggle.addEventListener("click", () => { const enabled = soundToggle.getAttribute("aria-pressed") !== "true"; soundToggle.setAttribute("aria-pressed", String(enabled)); if (enabled) { try { audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)(); oscillator = audioContext.createOscillator(); gain = audioContext.createGain(); oscillator.type = "sine"; oscillator.frequency.value = 54; gain.gain.value = 0.018; oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(); } catch { soundToggle.setAttribute("aria-pressed", "false"); showToast("Ambient audio is unavailable in this browser."); } } else if (oscillator) { oscillator.stop(); oscillator.disconnect(); gain.disconnect(); oscillator = null; gain = null; } });
