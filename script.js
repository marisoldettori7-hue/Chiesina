// Numero WhatsApp per le prenotazioni (formato internazionale, solo cifre)
const WHATSAPP_NUMBER = "390000000000";

// Orari di apertura: giorno (0 = domenica) -> fasce [apertura, chiusura] in "HH:MM"
const OPENING_HOURS = {
  0: [["12:00", "14:30"], ["19:00", "23:00"]],
  1: [],
  2: [["19:00", "23:00"]],
  3: [["19:00", "23:00"]],
  4: [["19:00", "23:00"]],
  5: [["19:00", "23:30"]],
  6: [["12:00", "14:30"], ["19:00", "23:30"]],
};

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Schede del menù
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", t === tab);
    });
    document.querySelectorAll(".menu-panel").forEach((panel) => {
      panel.hidden = panel.id !== tab.dataset.tab;
    });
  })
);

// Stato aperto/chiuso ed evidenziazione del giorno corrente
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const status = document.getElementById("open-status");

  document.querySelectorAll(".hours tr").forEach((row) =>
    row.classList.toggle("today", Number(row.dataset.day) === day)
  );

  const slots = OPENING_HOURS[day];
  const current = slots.find(([from, to]) => minutes >= toMinutes(from) && minutes < toMinutes(to));
  const next = slots.find(([from]) => minutes < toMinutes(from));

  if (current) {
    status.textContent = `Aperto ora · chiude alle ${current[1]}`;
    status.className = "open-status open";
  } else {
    status.textContent = next ? `Chiuso ora · apre alle ${next[0]}` : "Chiuso ora";
    status.className = "open-status closed";
  }
}
updateOpenStatus();
setInterval(updateOpenStatus, 60 * 1000);

// Prenotazione: data minima oggi, invio tramite WhatsApp
const form = document.getElementById("booking-form");
const today = new Date();
const pad = (n) => String(n).padStart(2, "0");
form.data.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const [y, m, g] = d.data.split("-");
  const lines = [
    "Ciao! Vorrei prenotare un tavolo:",
    `• Nome: ${d.nome}`,
    `• Telefono: ${d.telefono}`,
    `• Data: ${g}/${m}/${y} alle ${d.ora}`,
    `• Persone: ${d.persone}`,
  ];
  if (d.note.trim()) lines.push(`• Note: ${d.note.trim()}`);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
