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

// ==========================================
// ENHANCEMENT SCRIPTS
// ==========================================

// 3. Dark Mode
const darkModeBtn = document.getElementById("dark-mode-toggle");
const bodyEl = document.body;

// Check Local Storage
if (localStorage.getItem("darkMode") === "enabled") {
  bodyEl.classList.add("dark-mode");
  darkModeBtn.innerText = "☀️";
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    bodyEl.classList.toggle("dark-mode");
    if (bodyEl.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeBtn.innerText = "☀️";
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeBtn.innerText = "🌙";
    }
  });
}

// 4. Promo Bar & Timer
const closePromo = document.querySelector(".close-promo");
const promoBar = document.querySelector(".promo-bar");
const headerEl = document.querySelector(".header");

if (closePromo && promoBar) {
  closePromo.addEventListener("click", () => {
    promoBar.style.display = "none";
    headerEl.style.top = "0"; // Reset sticky header if needed
  });
}

// Countdown Logic
const promoTimer = document.querySelector(".promo-timer");
if (promoTimer) {
  // Set deadline to 2 days from now
  const deadline = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

  function updateTimer() {
    const now = new Date().getTime();
    const t = deadline - now;

    if (t < 0) return;

    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((t % (1000 * 60)) / 1000);

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMin = document.getElementById("minutes");
    const elSec = document.getElementById("seconds");

    // Promo Bar Timer
    const miniTimer = document.getElementById("promo-timer");
    if (miniTimer) miniTimer.innerText = `${hours}h ${minutes}m ${seconds}s`;

    if (elDays) elDays.innerText = days < 10 ? "0" + days : days;
    if (elHours) elHours.innerText = hours < 10 ? "0" + hours : hours;
    if (elMin) elMin.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (elSec) elSec.innerText = seconds < 10 ? "0" + seconds : seconds;
  }

  setInterval(updateTimer, 1000);
}

// 5. FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    // Close other items
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

// 6. Back to Top
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

/* Fix: The previous implementation didn't check if backToTopBtn exists */
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 7. Cookie Consent
const cookieBanner = document.getElementById("cookie-consent");
const acceptCookiesBtn = document.getElementById("accept-cookies");

if (!localStorage.getItem("cookiesAccepted")) {
  // Delay showing it for better UX
  setTimeout(() => {
    if (cookieBanner) cookieBanner.classList.add("show");
  }, 2000);
}

if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener("click", () => {
    if (cookieBanner) cookieBanner.classList.remove("show");
    localStorage.setItem("cookiesAccepted", "true");
  });
}

// 8. Toast Notifications
const toastContainer = document.getElementById("toast-container");

function showToast(message, type = "success") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  const icon = type === "success" ? "✅" : "⚠️";

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <h4>${type === "success" ? "Success" : "Error"}</h4>
      <p>${message}</p>
    </div>
    <div class="toast-close">&times;</div>
  `;

  toastContainer.appendChild(toast);

  // Close logic
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });

  // Auto remove
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Newsletter Submit Simulation
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector("input");
    if (input.value) {
      showToast("Thanks for subscribing! Check your inbox.", "success");
      input.value = "";
    }
  });
}

// 9. Pricing Toggle
const pricingToggle = document.getElementById("pricing-toggle-checkbox");
if (pricingToggle) {
  pricingToggle.addEventListener("change", () => {
    const isYearly = pricingToggle.checked;

    // Select all price elements (assumes strictly ordered: Free, Pro, Enterprise)
    // Or we can select by generic .price class
    const prices = document.querySelectorAll(".pricing-card .price");

    // Mapping: Base Monthly Prices
    // Free: 0
    // Pro: 29
    // Enterprise: 99

    if (isYearly) {
      // Switch to Yearly
      // Pro: 29 * 12 * 0.8 = ~279
      // Ent: 99 * 12 * 0.8 = ~950

      if (prices[0]) prices[0].innerHTML = "$0<span>/yr</span>";
      if (prices[1]) prices[1].innerHTML = "$279<span>/yr</span>";
      if (prices[2]) prices[2].innerHTML = "$950<span>/yr</span>";
    } else {
      // Back to Monthly
      if (prices[0]) prices[0].innerHTML = "$0<span>/mo</span>";
      if (prices[1]) prices[1].innerHTML = "$29<span>/mo</span>";
      if (prices[2]) prices[2].innerHTML = "$99<span>/mo</span>";
    }
  });
}
