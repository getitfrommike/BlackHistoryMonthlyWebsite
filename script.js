// Slideshow logic
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 5000);

// Featured figures section
const figures = [
  { name: "Horace Butler", desc: "Author of When Rocks Cry Out.", img: "images/horace.jpg" },
  { name: "Reggie Middleton", desc: "Father of Decentralized Finance.", img: "images/reggie.jpg" },
  { name: "Skipp Townsend", desc: "Community organizer and peace advocate.", img: "images/skipp.jpg" },
  { name: "Michael Wall", desc: "Founder of Black History Monthly.", img: "images/michael.jpg" }
];
const container = document.getElementById("figures-container");
if (container) {
  figures.forEach(fig => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${fig.img}" alt="${fig.name}"><h3>${fig.name}</h3><p>${fig.desc}</p>`;
    container.appendChild(card);
  });
}

// Contact form
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for your message!");
    contactForm.reset();
  });
}

// Timeline animation (repeats on scroll into view)
const timelineSection = document.querySelector('#timeline');
const xOverlay = document.getElementById("x-overlay");
const oldTimeline = document.getElementById("timeline-old");
const newTimeline = document.getElementById("timeline-new");

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
      // Reset everything when section leaves viewport
      newTimeline.classList.remove("fade-in");
      newTimeline.classList.add("hidden");
      oldTimeline.classList.remove("hidden");
    }
  });
}, { threshold: 0.5 });

if (timelineSection) timelineObserver.observe(timelineSection);

// Mobile menu toggle
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("show");
}

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in-on-scroll');
const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // one-time animation
    }
  });
}, { threshold: 0.3 });

faders.forEach(el => fadeObserver.observe(el));
