const translations = {
  es: {
    eyebrow: "XV Años",
    subtitle: "Sábado 20 de junio de 2026",
    musicButton: "Música",
    ctaConfirm: "Confirmar asistencia",
    ctaLocation: "Ver ubicación",
    parentsLabel: "Papás de la quinceañera",
    parentsTitle: "Lilliana Rose Ramírez",
    parentsBody: "Acompañada de su abuelita y padres.",
    familyBlock:
      "Tenemos el honor de invitarles a celebrar los XV Años.\nLilliana Rose Ramírez\nAcompañada de su abuelita y padres:\nAbuelita: Teresa Ramírez\nPadres: Naomi Ramírez\nKristian Ramírez",
    dateLabel: "Fecha",
    dateTitle: "20 de junio de 2026",
    dateBody:
      "¿Cuándo y dónde?\nA continuación encontrarás el horario y ubicación del evento, así como un botón directo a Google Maps, para que te sea más fácil llegar.\n7658 Olive Tree Ln\nHighland, CA. 92335\n4 pm a 10 pm",
    musicLabel: "Canción especial",
    musicTitle: "“No crezcas más” - Tercer Cielo",
    musicBody: "La sección musical está lista para acompañar la experiencia.",
    galleryLabel: "Fotografías",
    galleryTitle: "Una celebración llena de luz y azul rey",
    locationLabel: "Ubicación de la fiesta",
    locationBody: "Presiona el botón para abrir la ruta en Google Maps.",
    mapsButton: "Abrir Google Maps",
    copyAddress: "Copiar dirección",
    rsvpLabel: "Confirmación de asistencia",
    rsvpTitle: "Confirma por WhatsApp",
    nameLabel: "Nombre",
    attendanceLabel: "¿Asistirás?",
    yesOption: "Sí, asistiré",
    noOption: "No podré asistir",
    guestsLabel: "Número de invitados",
    messageLabel: "Mensaje opcional",
    whatsappButton: "Confirmar por WhatsApp",
    counterLabel: "Confirmaciones registradas",
    rsvpNote:
      "El contador queda guardado en este dispositivo. Si quieres un conteo global para todos los invitados, hay que conectarlo a una base de datos o Google Sheets.",
    musicMissing: "Agrega el archivo musica.mp3 para reproducir la canción aquí.",
    musicStarted: "Reproduciendo música.",
    musicPaused: "Música pausada.",
    copied: "Dirección copiada.",
    whatsappTextYes: "Sí asistiré",
    whatsappTextNo: "No podré asistir",
    giftsLabel: "Regalos",
    giftsTitle: "Tu serás participe de mi próximo sueño",
    giftsBody: "¡Lluvia de sobres!",
    dressLabel: "Código de vestimenta",
    dressTitle: "Semi-formal",
    dressBody: "Colores reservados para la quinceañera\nTodos tonos de azul",
  },
  en: {
    eyebrow: "Sweet Fifteen",
    subtitle: "Saturday, June 20, 2026",
    musicButton: "Music",
    ctaConfirm: "Confirm attendance",
    ctaLocation: "View location",
    parentsLabel: "Parents of the quinceañera",
    parentsTitle: "Lilliana Rose Ramírez",
    parentsBody: "Joined by her grandmother and parents.",
    familyBlock:
      "We are honored to invite you to celebrate Lilliana’s XV.\nLilliana Rose Ramírez\nJoined by her grandmother and parents:\nGrandmother: Teresa Ramírez\nParents: Naomi Ramírez\nKristian Ramírez",
    dateLabel: "Date",
    dateTitle: "June 20, 2026",
    dateBody:
      "When and where?\nBelow you will find the schedule and location of the event, plus a direct button to Google Maps so it is easier to arrive.\n7658 Olive Tree Ln\nHighland, CA. 92335\n4 pm to 10 pm",
    musicLabel: "Special song",
    musicTitle: "“No crezcas más” - Tercer Cielo",
    musicBody: "The music area is ready to accompany the experience.",
    galleryLabel: "Photos",
    galleryTitle: "A celebration full of light and royal blue",
    locationLabel: "Party location",
    locationBody: "Press the button to open the route in Google Maps.",
    mapsButton: "Open Google Maps",
    copyAddress: "Copy address",
    rsvpLabel: "Attendance confirmation",
    rsvpTitle: "Confirm by WhatsApp",
    nameLabel: "Name",
    attendanceLabel: "Will you attend?",
    yesOption: "Yes, I will attend",
    noOption: "I can't attend",
    guestsLabel: "Number of guests",
    messageLabel: "Optional message",
    whatsappButton: "Confirm via WhatsApp",
    counterLabel: "Recorded confirmations",
    rsvpNote:
      "The counter is saved on this device. If you want a global count for all guests, it needs a database or Google Sheets connection.",
    musicMissing: "Add the file musica.mp3 to play the song here.",
    musicStarted: "Music playing.",
    musicPaused: "Music paused.",
    copied: "Address copied.",
    whatsappTextYes: "Yes, I will attend",
    whatsappTextNo: "I can't attend",
    giftsLabel: "Gifts",
    giftsTitle: "You will be part of my next dream",
    giftsBody: "Envelope shower!",
    dressLabel: "Dress code",
    dressTitle: "Semi-formal",
    dressBody: "Reserved colors for the quinceañera\nAll shades of blue",
  },
};

const state = {
  lang: localStorage.getItem("invitation-lang") || "es",
  counter: 0,
};

const elements = {
  root: document.documentElement,
  langButtons: [...document.querySelectorAll("[data-lang-btn]")],
  i18n: [...document.querySelectorAll("[data-i18n]")],
  musicBtn: document.getElementById("musicBtn"),
  musicLabel: document.getElementById("musicLabel"),
  music: document.getElementById("bgMusic"),
  mapsBtn: document.getElementById("mapsBtn"),
  copyAddressBtn: document.getElementById("copyAddressBtn"),
  rsvpForm: document.getElementById("rsvpForm"),
  guestName: document.getElementById("guestName"),
  attendance: document.getElementById("attendance"),
  guestCount: document.getElementById("guestCount"),
  guestMessage: document.getElementById("guestMessage"),
  rsvpCount: document.getElementById("rsvpCount"),
};

function getDictionary() {
  return translations[state.lang] || translations.es;
}

function applyLanguage() {
  const dict = getDictionary();
  elements.root.lang = state.lang;
  document.documentElement.lang = state.lang;
  document.title =
    state.lang === "es"
      ? "XV Años | Lilliana Rose Ramírez"
      : "Sweet Fifteen | Lilliana Rose Ramírez";

  elements.langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langBtn === state.lang);
  });

  elements.i18n.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  const currentAttendance = elements.attendance.value || "yes";
  elements.attendance.innerHTML = `
    <option value="yes">${dict.yesOption}</option>
    <option value="no">${dict.noOption}</option>
  `;
  elements.attendance.value = currentAttendance;

  const placeholders = {
    guestName: state.lang === "es" ? "Tu nombre" : "Your name",
    guestMessage: state.lang === "es" ? "Escribe un mensaje corto" : "Write a short message",
  };

  elements.guestName.placeholder = placeholders.guestName;
  elements.guestMessage.placeholder = placeholders.guestMessage;
  elements.rsvpCount.textContent = String(state.counter);
}

async function loadRsvpCount() {
  try {
    const response = await fetch("/api/rsvp");
    if (!response.ok) throw new Error("count-fetch-failed");
    const data = await response.json();
    state.counter = Number(data.count || 0);
    elements.rsvpCount.textContent = String(state.counter);
  } catch {
    state.counter = Number(localStorage.getItem("invitation-rsvp-count") || "0");
    elements.rsvpCount.textContent = String(state.counter);
  }
}

function formatWhatsAppMessage() {
  const dict = getDictionary();
  const name = elements.guestName.value.trim() || (state.lang === "es" ? "Invitado" : "Guest");
  const attending = elements.attendance.value === "yes" ? dict.whatsappTextYes : dict.whatsappTextNo;
  const guests = Number(elements.guestCount.value || 1);
  const message = elements.guestMessage.value.trim();

  const lines = [
    state.lang === "es" ? "Confirmación de XV años" : "XV confirmation",
    `${state.lang === "es" ? "Nombre" : "Name"}: ${name}`,
    `${state.lang === "es" ? "Asistencia" : "Attendance"}: ${attending}`,
    `${state.lang === "es" ? "Invitados" : "Guests"}: ${guests}`,
  ];

  if (message) {
    lines.push(`${state.lang === "es" ? "Mensaje" : "Message"}: ${message}`);
  }

  lines.push("Lilliana Rose Ramírez");
  return lines.join("\n");
}

function openWhatsApp() {
  const text = encodeURIComponent(formatWhatsAppMessage());
  const phone = "525532533605";
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("invitation-lang", lang);
  applyLanguage();
}

elements.langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langBtn));
});

elements.musicBtn.addEventListener("click", async () => {
  const dict = getDictionary();
  const source = elements.music.querySelector("source");
  const src = source?.getAttribute("src");
  const musicSearchUrl =
    "https://www.youtube.com/results?search_query=No+crezcas+m%C3%A1s+Tercer+Cielo";

  if (elements.music.paused) {
    try {
      if (src) {
        const response = await fetch(src, { method: "HEAD" });
        if (!response.ok) throw new Error("missing-audio");
      } else {
        throw new Error("missing-audio");
      }

      await elements.music.play();
    } catch {
      window.open(musicSearchUrl, "_blank", "noopener,noreferrer");
      alert(dict.musicMissing);
    }
  } else {
    elements.music.pause();
  }
});

elements.copyAddressBtn.addEventListener("click", async () => {
  const address = "7658 Olive Tree Ln, Highland, CA 92335";
  try {
    await navigator.clipboard.writeText(address);
    elements.copyAddressBtn.textContent = getDictionary().copied;
    setTimeout(() => {
      elements.copyAddressBtn.textContent = getDictionary().copyAddress;
    }, 1800);
  } catch {
    window.prompt(
      state.lang === "es" ? "Copia la dirección" : "Copy the address",
      address,
    );
  }
});

elements.rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const payload = {
    name: elements.guestName.value.trim(),
    attending: elements.attendance.value,
    guests: Number(elements.guestCount.value || 1),
    message: elements.guestMessage.value.trim(),
    language: state.lang,
  };

  fetch("/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("rsvp-save-failed");
      const data = await response.json();
      state.counter = Number(data.count || state.counter);
      elements.rsvpCount.textContent = String(state.counter);
      openWhatsApp();
    })
    .catch(() => {
      openWhatsApp();
    });
});

window.addEventListener("load", async () => {
  try {
    await elements.music.play();
  } catch {
    // Browsers can block autoplay until the first user gesture.
  }
});

loadRsvpCount();

applyLanguage();
