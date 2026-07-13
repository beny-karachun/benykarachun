const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const progressBar = document.querySelector(".scroll-progress span");
const hero = document.querySelector(".hero");

const setMenuState = (isOpen, returnFocus = false) => {
  if (!menuToggle || !mobileMenu) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  mobileMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);

  if (returnFocus) menuToggle.focus();
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenuState(isOpen);

  if (isOpen) {
    window.requestAnimationFrame(() => mobileMenu?.querySelector("a")?.focus());
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false, true);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960 && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
  }
});

const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

let scrollFrame = 0;

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;

  header?.classList.toggle("is-scrolled", scrollTop > 18);
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  scrollFrame = 0;
};

window.addEventListener(
  "scroll",
  () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollState);
  },
  { passive: true },
);

updateScrollState();

if (hero && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const updatePointer = () => {
    hero.style.setProperty("--pointer-x", pointerX.toFixed(3));
    hero.style.setProperty("--pointer-y", pointerY.toFixed(3));
    pointerFrame = 0;
  };

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
  });

  hero.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointer);
  });
}
