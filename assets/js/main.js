// Sticky Header
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const body = document.querySelector("body");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuBtn.classList.toggle("active");
    body.classList.toggle("overflow-hidden");
  });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !nav.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    nav.classList.contains("active")
  ) {
    nav.classList.remove("active");
    menuBtn.classList.remove("active");
    body.classList.remove("overflow-hidden");
  }
});

// ==========================================
// DYNAMIC FEATURES
// ==========================================

// 1. Count Up Animation
const counters = document.querySelectorAll("[data-count]");
const speed = 200; // The lower the slower

const countUp = (counter) => {
  const target = +counter.getAttribute("data-count");
  const count = +counter.innerText.replace("+", ""); // remove + if present

  // Lower increment to slow and higher to fast
  const inc = target / speed;

  if (count < target) {
    // Check if it's the 1000 case (fake 1M+)
    let displayValue = Math.ceil(count + inc);

    // Custom formatting for the last item if it detects 1000
    if (target === 1000) {
      counter.innerText = (displayValue >= 1000 ? "1M" : displayValue) + "+";
      // Override logic to just jump to 1M if we want simple or...
      // Actually let's just count to 1000 and show 1M at the end?
      // A better way: just count numbers logic
      if (displayValue >= 1000) counter.innerText = "1M+";
      else counter.innerText = displayValue + "+";
    } else {
      counter.innerText = displayValue + "+";
    }

    setTimeout(() => countUp(counter), 20);
  } else {
    // Ensure final value matches format
    if (target === 1000) counter.innerText = "1M+";
    else counter.innerText = target + "+";
  }
};

const observerOptions = {
  root: null,
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      countUp(counter);
      observer.unobserve(counter); // Only run once
    }
  });
}, observerOptions);

counters.forEach((counter) => {
  observer.observe(counter);
});

// 2. Feedback Slider
const feedbacks = [
  {
    quote:
      "“They are the best people. And this is the suitable platform to learn from distance.”",
    name: "Ben Foakes",
    role: "Student",
  },
  {
    quote:
      "“The courses are thoroughly explained and easy to follow. I learned a new skill in no time!”",
    name: "Alice M.",
    role: "Designer",
  },
  {
    quote:
      "“Great support team and fantastic community. Highly recommend to anyone.”",
    name: "John D.",
    role: "Developer",
  },
];

let currentFeedback = 0;
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quoteEl = document.getElementById("feedback-quote");
const nameEl = document.getElementById("feedback-name");

const updateFeedback = () => {
  // Fade out effect
  quoteEl.style.opacity = 0;
  nameEl.parentElement.style.opacity = 0;

  setTimeout(() => {
    const item = feedbacks[currentFeedback];
    quoteEl.innerText = item.quote;
    nameEl.innerText = item.name + " ";

    // Fade in
    quoteEl.style.opacity = 1;
    nameEl.parentElement.style.opacity = 1;
  }, 300);
};

// Add transition styles via JS or assume CSS handles default opacity transition,
// strictly adding transition here to ensure smoothness
quoteEl.style.transition = "opacity 0.3s ease";
nameEl.parentElement.style.transition = "opacity 0.3s ease";

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentFeedback--;
    if (currentFeedback < 0) {
      currentFeedback = feedbacks.length - 1;
    }
    updateFeedback();
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentFeedback++;
    if (currentFeedback > feedbacks.length - 1) {
      currentFeedback = 0;
    }
    updateFeedback();
  });
}
