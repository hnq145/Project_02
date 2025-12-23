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

// Close menu when clicking outside (optional but good UX)
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
