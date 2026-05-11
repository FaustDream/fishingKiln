const bgLayer1 = document.querySelector(".bg-layer-1");
const bgLayer2 = document.querySelector(".bg-layer-2");
const sideNav = document.querySelector(".side-nav");
const scrollHint = document.querySelector(".scroll-hint");
const detailModal = document.getElementById("detailModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.querySelector(".modal-close");

if (bgLayer1) {
  bgLayer1.style.backgroundSize = "cover";
}

if (bgLayer2) {
  bgLayer2.style.backgroundSize = "cover";
}

const inkElements = [...document.querySelectorAll(".glitch")];

function triggerInkEffect() {
  inkElements.forEach((element) => {
    element.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
    setTimeout(() => {
      element.style.transform = "";
    }, 100);
  });
}

if (inkElements.length) {
  setInterval(triggerInkEffect, 8000);
}

if (scrollHint) {
  window.addEventListener("scroll", () => {
    scrollHint.style.opacity = window.scrollY > 100 ? "0" : "1";
  }, { passive: true });

  scrollHint.addEventListener("click", (event) => {
    event.preventDefault();
    const exploreSection = document.getElementById("exploreMore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = "1";
    entry.target.style.transform = "translateY(0)";
    animationObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

[...document.querySelectorAll(".info-card, .item-card, .tea-category-tab, .tea-detail-panel")].forEach((element, index) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = `opacity 600ms ${index * 80}ms ease, transform 600ms ${index * 80}ms ease`;
  animationObserver.observe(element);
});

if (sideNav) {
  sideNav.addEventListener("mouseenter", () => {
    sideNav.classList.add("expanded");
  });

  sideNav.addEventListener("mouseleave", () => {
    sideNav.classList.remove("expanded");
  });
}

function hideDetail() {
  if (!detailModal) return;
  detailModal.classList.remove("active");
  document.body.style.overflow = "";
}

function showDetail(detailKey) {
  const detailData = window.detailData || {};
  const data = detailData[detailKey];
  if (!data || !detailModal || !modalBody) return;

  const imageHtml = data.img
    ? `<div class="detail-img"><img src="${data.img}" alt="${data.title}"></div>`
    : "";

  modalBody.innerHTML = `<h3 class="cursive-text">${data.title}</h3>${imageHtml}${data.content}`;
  detailModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

[...document.querySelectorAll(".clickable-card")].forEach((card) => {
  card.addEventListener("click", () => {
    showDetail(card.dataset.detail);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", hideDetail);
}

if (detailModal) {
  detailModal.addEventListener("click", (event) => {
    if (event.target === detailModal) {
      hideDetail();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (sideNav) {
      sideNav.classList.remove("expanded");
    }
    hideDetail();
  }
});

function initInkCursor() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const canHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!canHoverQuery.matches || reduceMotionQuery.matches) return;

  const cursorLayer = document.createElement("div");
  cursorLayer.className = "ink-cursor-layer";
  document.body.appendChild(cursorLayer);

  let lastStamp = 0;
  let lastX = 0;
  let lastY = 0;
  let activeBlooms = 0;
  const maxBlooms = 32;

  function spawnBloom(x, y, size, offsetX, offsetY, delayMs) {
    if (activeBlooms >= maxBlooms) return;

    const bloom = document.createElement("span");
    bloom.className = "ink-cursor-bloom";
    bloom.style.left = `${x + offsetX}px`;
    bloom.style.top = `${y + offsetY}px`;
    bloom.style.width = `${size}px`;
    bloom.style.height = `${size}px`;
    bloom.style.animationDelay = `${delayMs}ms`;
    bloom.style.opacity = `${0.18 + Math.random() * 0.16}`;
    cursorLayer.appendChild(bloom);
    activeBlooms += 1;

    bloom.addEventListener("animationend", () => {
      bloom.remove();
      activeBlooms = Math.max(0, activeBlooms - 1);
    }, { once: true });
  }

  window.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastStamp < 16) return;

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    const velocity = Math.min(Math.hypot(deltaX, deltaY), 42);
    const size = 28 + velocity * 1.05;

    spawnBloom(event.clientX, event.clientY, size, 0, 0, 0);
    spawnBloom(event.clientX, event.clientY, size * 0.82, 8 - Math.random() * 16, 6 - Math.random() * 12, 20);
    spawnBloom(event.clientX, event.clientY, size * 0.62, 10 - Math.random() * 20, 10 - Math.random() * 20, 45);

    lastStamp = now;
    lastX = event.clientX;
    lastY = event.clientY;
  }, { passive: true });
}

const teaCategoryTabs = [...document.querySelectorAll(".tea-category-tab")];
const teaDetailPanels = [...document.querySelectorAll(".tea-detail-panel")];

function setActiveTeaPanel(panelKey) {
  if (!panelKey || !teaCategoryTabs.length || !teaDetailPanels.length) return;

  teaCategoryTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === panelKey;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });

  teaDetailPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === panelKey;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

teaCategoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTeaPanel(tab.dataset.tab);
  });
});

if (teaCategoryTabs.length) {
  setActiveTeaPanel(teaCategoryTabs[0].dataset.tab);
}

initInkCursor();
