// ================= Slideshow =================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const prevBtn = document.querySelector('.slideshow-btn.prev');
const nextBtn = document.querySelector('.slideshow-btn.next');

function showSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 0) {
  setInterval(() => showSlide(currentSlide + 1), 5000);
}

if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

// ================= Featured Figures =================
const figures = [
  {
    name: "Horace Butler",
    desc: "Author of When Rocks Cry Out.",
    img: "images/horace.jpg",
    link: "pages/horace.html"
  },
  {
    name: "Reggie Middleton",
    desc: "Father of Decentralized Finance.",
    img: "images/reggie.jpg",
    link: "pages/reggie.html"
  },
  {
    name: "Skipp Townsend",
    desc: "Community organizer and peace advocate.",
    img: "images/skipp.jpg",
    link: "pages/skipp.html"
  },
  {
    name: "Michael Wall",
    desc: "Founder of Black History Monthly.",
    img: "images/michael.jpg",
    link: "pages/michael.html"
  }
];

const container = document.getElementById("figures-container");
if (container) {
  figures.forEach(fig => {
    const card = document.createElement("div");
    card.className = "card";
    // ✅ FIX: add backticks for template string
    card.innerHTML = `
      <a href="${fig.link}">
        <img src="${fig.img}" alt="${fig.name}" />
        <h3>${fig.name}</h3>
        <p>${fig.desc}</p>
      </a>
    `;
    container.appendChild(card);
  });
}

// ================= Monthly Feature (MANUAL) =================
const FEATURED = {
  name: "Jay Riches",
  desc: "Creator of The90DayTrader.com.",
  img: "images/jay.jpg",
  link: "pages/jay.html",
  cta: "Explore Jay Riches"
};

(function renderMonthlyFeatureManual(){
  const wrap = document.getElementById("monthly-feature");
  if (!wrap) return;

  const nameEl = document.getElementById("monthly-feature-name");
  const descEl = document.getElementById("monthly-feature-desc");
  const imgEl  = document.getElementById("monthly-feature-img");
  const linkA  = document.getElementById("monthly-feature-link");
  const ctaA   = document.getElementById("monthly-feature-cta");

  if (nameEl) nameEl.textContent = FEATURED.name;
  if (descEl) descEl.textContent = FEATURED.desc;
  if (imgEl)  { imgEl.src = FEATURED.img; imgEl.alt = FEATURED.name; }
  if (linkA)  linkA.href = FEATURED.link;
  if (ctaA)   { ctaA.href = FEATURED.link; ctaA.textContent = FEATURED.cta || "Read more"; }
})();

// ================= Contact form =================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for your message!");
    contactForm.reset();
  });
}

// ================= Timeline animation =================
const timelineSection = document.querySelector('#timeline');
const xOverlay = document.getElementById("x-overlay");
const oldTimeline = document.getElementById("timeline-old");
const newTimeline = document.getElementById("timeline-new");

if (timelineSection && xOverlay && oldTimeline && newTimeline) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        xOverlay.style.opacity = "1";
        xOverlay.style.animation = "strikeX 2s ease-in-out";

        setTimeout(() => {
          oldTimeline.classList.add("hidden");
          xOverlay.style.opacity = "0";

          // Reset animation
          newTimeline.classList.remove("fade-in");
          void newTimeline.offsetWidth; // force reflow
          newTimeline.classList.remove("hidden");
          newTimeline.classList.add("fade-in");
        }, 2500);
      } else {
        // Reset when section leaves viewport
        newTimeline.classList.remove("fade-in");
        newTimeline.classList.add("hidden");
        oldTimeline.classList.remove("hidden");
      }
    });
  }, { threshold: 0.5 });

  timelineObserver.observe(timelineSection);
}

// ================= Mobile menu toggle =================
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  if (nav) nav.classList.toggle("show");
}
window.toggleMenu = toggleMenu; // expose to inline onclick

// ================= Fade-in on scroll =================
const faders = document.querySelectorAll('.fade-in-on-scroll');
if (faders.length) {
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // one-time animation
      }
    });
  }, { threshold: 0.3 });

  faders.forEach(el => fadeObserver.observe(el));
}
