const themeToggle = document.querySelector("[data-theme-toggle]");
const rootEl = document.documentElement;

const applyTheme = (theme) => {
  rootEl.setAttribute("data-theme", theme);
  if (!themeToggle) return;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
};

applyTheme(rootEl.getAttribute("data-theme") || "light");

themeToggle?.addEventListener("click", () => {
  const next = rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  applyTheme(next);
});

const header = document.querySelector("[data-header]");
const brandMarks = document.querySelectorAll(".brand-mark");
let progress = document.querySelector("[data-scroll-progress]");
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const counters = document.querySelectorAll("[data-count]");
const interactiveCards = document.querySelectorAll(".interactive-card");
const zoomableFigures = document.querySelectorAll(".process-shot, .final-screen");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const typewriterHeading = document.querySelector("[data-typewriter]");

if (typewriterHeading && !prefersReducedMotion) {
  typewriterHeading.style.minHeight = `${typewriterHeading.offsetHeight}px`;

  const lines = [...typewriterHeading.querySelectorAll(".tw-line")].map((line) => {
    const textNode = line.firstChild;
    const fullText = textNode.data.replace(/\s+/g, " ").trim();
    textNode.data = "";
    return { line, textNode, fullText };
  });

  let lineIndex = 0;
  let charIndex = 0;

  const typeNextChar = () => {
    const current = lines[lineIndex];
    current.line.classList.add("is-typing");
    charIndex++;
    current.textNode.data = current.fullText.slice(0, charIndex);

    if (charIndex < current.fullText.length) {
      window.setTimeout(typeNextChar, 85);
    } else if (lineIndex < lines.length - 1) {
      current.line.classList.remove("is-typing");
      lineIndex++;
      charIndex = 0;
      window.setTimeout(typeNextChar, 85);
    }
  };
  window.setTimeout(typeNextChar, 400);
}

const logoSvg = `
  <svg class="brand-logo" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
    <rect class="logo-piece" style="--logo-delay: 40ms" x="8" y="8" width="25" height="25" rx="7"></rect>
    <rect class="logo-piece" style="--logo-delay: 100ms" x="42" y="8" width="46" height="25" rx="7"></rect>
    <rect class="logo-piece" style="--logo-delay: 160ms" x="8" y="36" width="25" height="25" rx="7"></rect>
    <rect class="logo-piece" style="--logo-delay: 220ms" x="42" y="36" width="34" height="25" rx="7"></rect>
    <rect class="logo-piece" style="--logo-delay: 280ms" x="8" y="64" width="25" height="25" rx="7"></rect>
    <rect class="logo-piece" style="--logo-delay: 340ms" x="42" y="64" width="46" height="25" rx="7"></rect>
  </svg>
`;

brandMarks.forEach((mark) => {
  mark.innerHTML = logoSvg;

  if (prefersReducedMotion) {
    mark.classList.add("is-logo-ready");
    return;
  }

  requestAnimationFrame(() => mark.classList.add("is-logo-ready"));

  mark.closest(".brand")?.addEventListener("pointerenter", () => {
    mark.classList.add("is-logo-active");
    window.setTimeout(() => mark.classList.remove("is-logo-active"), 520);
  });
});

if (!progress) {
  progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.dataset.scrollProgress = "";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);
}

const autoRevealTargets = document.querySelectorAll(
  ".section:not(.hero), .case-hero, .case-snapshot, .case-cover, .case-section, .case-nav, .hire-card, .snapshot-card, .toolbox-card, .skills-grid span, .process-grid article, .insight-card, .process-shot, .final-screen, .case-meta div"
);

autoRevealTargets.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 55, 275)}ms`);
});

const reveals = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const updateProgress = () => {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
};

const updateActiveNav = () => {
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const active = sections
    .filter((section) => section.getBoundingClientRect().top <= 120)
    .pop();

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", active && link.getAttribute("href") === `#${active.id}`);
  });
};

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  if (!Number.isFinite(target)) return;

  if (prefersReducedMotion) {
    counter.textContent = String(target).padStart(2, "0");
    return;
  }

  let start;
  const duration = 900;

  const tick = (timestamp) => {
    start ??= timestamp;
    const progressValue = Math.min(1, (timestamp - start) / duration);
    const value = Math.round(target * progressValue);
    counter.textContent = String(value).padStart(2, "0");

    if (progressValue < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));

    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = selected === "all" || categories.includes(selected);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((item) => observer.observe(item));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
  counters.forEach(animateCounter);
}

if (!prefersReducedMotion) {
  interactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.hidden = true;
lightbox.innerHTML = `
  <button type="button" aria-label="Close image preview">x</button>
  <figure>
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="">
    <figcaption></figcaption>
  </figure>
`;
document.body.append(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const closeLightbox = () => {
  lightbox.hidden = true;
  document.body.style.overflow = "";
};

zoomableFigures.forEach((figure) => {
  figure.setAttribute("tabindex", "0");
  figure.setAttribute("role", "button");
  figure.setAttribute("aria-label", "Open larger image preview");

  const open = () => {
    const image = figure.querySelector("img");
    const caption = figure.querySelector("figcaption");
    if (!image) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "";
    lightboxCaption.textContent = caption?.textContent || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  figure.addEventListener("click", open);
  figure.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest("button")) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

updateHeader();
updateProgress();
updateActiveNav();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("scroll", updateActiveNav, { passive: true });
