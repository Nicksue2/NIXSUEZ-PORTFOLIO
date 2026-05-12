/**
 * nixoshin-utils.js — Shared utilities for all Nixoshin pages
 * Theme toggle, Service Worker, Custom Modal, and Centralized Cursor
 */

/* ─── THEME: Apply immediately ─── */
(function () {
  const t = localStorage.getItem("nixoshin_theme") || "dark";
  document.documentElement.setAttribute("data-theme", t);
})();

/* ─── SERVICE WORKER ─── */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

/* ─── THEME TOGGLE ─── */
function _getTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function _setThemeIcon(btn) {
  const isDark = _getTheme() === "dark";
  btn.innerHTML = isDark
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
}

function toggleTheme() {
  const next = _getTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("nixoshin_theme", next);
  document.querySelectorAll(".theme-toggle").forEach(_setThemeIcon);
}

/* ─── CENTRALIZED CUSTOM CURSOR ─── */
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle init
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    _setThemeIcon(btn);
    btn.addEventListener("click", toggleTheme);
  });

  // 1. Strict Mobile/Touch Check
  const isTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(any-pointer: coarse)").matches;

  if (isTouch) return;

  // 2. Better Visibility/Color & Style
  const cursorStyles = document.createElement("style");
  cursorStyles.innerHTML = `
        body, *, *::before, *::after { cursor: none !important; }
        #nx-cursor-dot {
            position: fixed; top: 0; left: 0; width: 8px; height: 8px;
            background: #FF3D00; /* Intense Core */
            border-radius: 50%; pointer-events: none; z-index: 999999;
            transition: width 0.2s, height 0.2s, opacity 0.3s; will-change: transform;
        }
        #nx-cursor-ring {
            position: fixed; top: 0; left: 0; width: 38px; height: 38px;
            border: 3px solid #FF6511; /* Brand Orange Circle */
            border-radius: 50%; pointer-events: none; z-index: 999998;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
            transition: width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s;
            will-change: transform;
        }
        #nx-cursor-dot.hover { width: 12px; height: 12px; }
        #nx-cursor-ring.hover { width: 56px; height: 56px; opacity: 0.3; }
        #nx-cursor-dot.clicking { transform: scale(0.7); }
        #nx-cursor-ring.clicking { transform: scale(0.85); }
    `;
  document.head.appendChild(cursorStyles);

  // Inject Cursor HTML
  const dot = document.createElement("div");
  dot.id = "nx-cursor-dot";
  const ring = document.createElement("div");
  ring.id = "nx-cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;
  let dotX = mouseX,
    dotY = mouseY,
    ringX = mouseX,
    ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 3. Fade Out on Window Leave / Fade In on Enter
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });

  const render = () => {
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  // Hover Tracking
  const addHover = () => {
    dot.classList.add("hover");
    ring.classList.add("hover");
  };
  const removeHover = () => {
    dot.classList.remove("hover");
    ring.classList.remove("hover");
  };

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(
      "a, button, input, .layout-card, .sticker-img, canvas, .strip-clickable",
    );
    if (target) addHover();
    else removeHover();
  });

  document.addEventListener("mousedown", () => {
    dot.classList.add("clicking");
    ring.classList.add("clicking");
  });
  document.addEventListener("mouseup", () => {
    dot.classList.remove("clicking");
    ring.classList.remove("clicking");
  });
});

/* ─── CUSTOM MODAL ─── */
function showModal({
  title = "",
  message = "",
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  confirm = false,
} = {}) {
  return new Promise((resolve) => {
    let overlay = document.getElementById("nx-modal-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "nx-modal-overlay";
      overlay.innerHTML = `
                <div class="nx-modal-box">
                    <h3 class="nx-modal-title"></h3>
                    <p class="nx-modal-message"></p>
                    <div class="nx-modal-actions">
                        <button class="nx-modal-btn secondary nx-modal-cancel">${cancelLabel}</button>
                        <button class="nx-modal-btn primary nx-modal-confirm">${confirmLabel}</button>
                    </div>
                </div>`;
      document.body.appendChild(overlay);
    }
    overlay.querySelector(".nx-modal-title").textContent = title;
    overlay.querySelector(".nx-modal-message").textContent = message;
    const confirmBtn = overlay.querySelector(".nx-modal-confirm");
    const cancelBtn = overlay.querySelector(".nx-modal-cancel");
    confirmBtn.textContent = confirmLabel;
    cancelBtn.style.display = confirm ? "" : "none";

    const close = (val) => {
      overlay.classList.remove("active");
      resolve(val);
    };
    confirmBtn.onclick = () => close(true);
    cancelBtn.onclick = () => close(false);

    overlay.classList.add("active");
    confirmBtn.focus();
  });
}
