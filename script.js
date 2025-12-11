// Sections for active nav highlighting
const sections = document.querySelectorAll(
  "#hero, #overview, #lab-setup, #attacks, #defense, #documents, #reflection, #gallery"
);
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-55% 0px -40% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navContainer = document.querySelector(".nav-links");

if (navToggle && navContainer) {
  navToggle.addEventListener("click", () => {
    navContainer.classList.toggle("open");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      navContainer.classList.remove("open");
    })
  );
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeEls.forEach((el) => fadeObserver.observe(el));

// Document viewer tabs
const docTabs = document.querySelectorAll(".doc-tab");
const docFrames = {
  report: document.getElementById("doc-report"),
  slides: document.getElementById("doc-slides"),
};

docTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.doc;

    docTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    Object.keys(docFrames).forEach((key) => {
      docFrames[key].classList.toggle("active", key === target);
    });
  });
});

// Lightbox / image overlay for gallery
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-card").forEach((card) => {
  const img = card.querySelector("img");
  const caption = card.querySelector("figcaption");

  card.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.textContent = caption ? caption.textContent : img.alt || "";
    lightbox.classList.add("open");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
  }
});
