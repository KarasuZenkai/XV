const state = {
  counter: 0,
  scrollRaf: 0,
  parallaxItems: [],
};

const elements = {
  musicBtn: document.getElementById("musicBtn"),
  music: document.getElementById("bgMusic"),
  copyAddressBtn: document.getElementById("copyAddressBtn"),
  rsvpForm: document.getElementById("rsvpForm"),
  guestName: document.getElementById("guestName"),
  attendance: document.getElementById("attendance"),
  guestCount: document.getElementById("guestCount"),
  guestMessage: document.getElementById("guestMessage"),
  rsvpCount: document.getElementById("rsvpCount"),
};

const address = "7658 Olive Tree Ln, Highland, CA 92335";
const whatsappPhone = "525532533605";

function openWhatsApp() {
  const name = elements.guestName.value.trim() || "Invitado";
  const attendance = elements.attendance.value === "yes" ? "Sí, asistiré" : "No podré asistir";
  const guests = Number(elements.guestCount.value || 1);
  const message = elements.guestMessage.value.trim();

  const lines = [
    "Confirmación de XV años",
    `Nombre: ${name}`,
    `Asistencia: ${attendance}`,
    `Número de invitados: ${guests}`,
  ];

  if (message) {
    lines.push(`Mensaje: ${message}`);
  }

  lines.push("Lilliana Rose Ramírez");

  const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

async function loadCounter() {
  try {
    const response = await fetch("/api/rsvp");
    if (!response.ok) throw new Error("bad-response");
    const data = await response.json();
    state.counter = Number(data.count || 0);
    elements.rsvpCount.textContent = String(state.counter);
  } catch {
    elements.rsvpCount.textContent = "0";
  }
}

async function saveRsvp() {
  const payload = {
    name: elements.guestName.value.trim(),
    attending: elements.attendance.value,
    guests: Number(elements.guestCount.value || 1),
    message: elements.guestMessage.value.trim(),
  };

  try {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      state.counter = Number(data.count || state.counter);
      elements.rsvpCount.textContent = String(state.counter);
    }
  } catch {
    // If the API fails, we still let the guest send the WhatsApp confirmation.
  }
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((item) => observer.observe(item));
}

function updateScrollState() {
  state.scrollRaf = 0;
  document.documentElement.style.setProperty("--scroll-y", String(window.scrollY || 0));
}

function requestScrollState() {
  if (state.scrollRaf) return;
  state.scrollRaf = window.requestAnimationFrame(updateScrollState);
}

function setupParallax() {
  state.parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));

  state.parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    item.style.setProperty("--parallax-speed", String(speed));
  });

  updateScrollState();
  window.addEventListener("scroll", requestScrollState, { passive: true });
  window.addEventListener("resize", requestScrollState, { passive: true });
}

function setMusicButtonState(isPlaying) {
  elements.musicBtn.textContent = isPlaying ? "Pausar música" : "Reproducir música";
}

elements.copyAddressBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(address);
    elements.copyAddressBtn.textContent = "Dirección copiada";
    setTimeout(() => {
      elements.copyAddressBtn.textContent = "Copiar dirección";
    }, 1800);
  } catch {
    window.prompt("Copia la dirección", address);
  }
});

elements.musicBtn.addEventListener("click", async () => {
  if (elements.music.paused) {
    try {
      await elements.music.play();
      setMusicButtonState(true);
    } catch {
      // Autoplay can be blocked until a user gesture; the manual button remains available.
    }
  } else {
    elements.music.pause();
    setMusicButtonState(false);
  }
});

elements.rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveRsvp();
  openWhatsApp();
});

window.addEventListener("load", async () => {
  setupRevealAnimations();
  setupParallax();
  loadCounter();

  try {
    await elements.music.play();
    setMusicButtonState(true);
  } catch {
    // Browsers may block autoplay with sound.
    setMusicButtonState(false);
  }
});
