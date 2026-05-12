/**
 * nixoshin-utils.js — Shared utilities for all Nixoshin pages
 * Theme toggle, Service Worker, Custom Modal
 */

/* ─── THEME: Apply immediately (before render, no FOUC) ─── */
(function () {
    const t = localStorage.getItem('nixoshin_theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
})();

/* ─── SERVICE WORKER ─── */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
}

/* ─── THEME TOGGLE ─── */
function _getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

function _setThemeIcon(btn) {
    const isDark = _getTheme() === 'dark';
    btn.innerHTML = isDark
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

function toggleTheme() {
    const next = _getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nixoshin_theme', next);
    document.querySelectorAll('.theme-toggle').forEach(_setThemeIcon);
}

/* Init all toggle buttons as soon as DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        _setThemeIcon(btn);
        btn.addEventListener('click', toggleTheme);
    });
});

/* ─── CUSTOM MODAL ─── */
function showModal({ title = '', message = '', confirmLabel = 'OK', cancelLabel = 'Cancel', confirm = false } = {}) {
    return new Promise(resolve => {
        let overlay = document.getElementById('nx-modal-overlay');

        /* Create overlay on-the-fly if it doesn't exist in the page */
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'nx-modal-overlay';
            overlay.innerHTML = `
                <div class="nx-modal-box">
                    <h3 class="nx-modal-title"></h3>
                    <p class="nx-modal-message"></p>
                    <div class="nx-modal-actions">
                        <button class="nx-modal-btn secondary nx-modal-cancel">${cancelLabel}</button>
                        <button class="nx-modal-btn primary nx-modal-confirm">${confirmLabel}</button>
                    </div>
                </div>`;
            /* Inject minimal styles so modal works even without style.css */
            if (!document.getElementById('nx-modal-style')) {
                const s = document.createElement('style');
                s.id = 'nx-modal-style';
                s.textContent = `
                    #nx-modal-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.65);
                        backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
                        display:flex;align-items:center;justify-content:center;padding:1.5rem;
                        opacity:0;pointer-events:none;transition:opacity .25s ease}
                    #nx-modal-overlay.active{opacity:1;pointer-events:all}
                    .nx-modal-box{background:rgba(18,18,18,.95);border:1px solid rgba(255,255,255,.15);
                        border-radius:20px;padding:1.75rem;max-width:340px;width:100%;
                        box-shadow:0 24px 60px rgba(0,0,0,.6);
                        transform:scale(.95) translateY(10px);transition:transform .3s cubic-bezier(.23,1,.32,1)}
                    #nx-modal-overlay.active .nx-modal-box{transform:scale(1) translateY(0)}
                    .nx-modal-title{font-family:inherit;font-size:1rem;font-weight:700;margin-bottom:.5rem;color:#f5f5f5}
                    .nx-modal-message{font-size:.875rem;color:#8a8a8a;line-height:1.6;margin-bottom:1.25rem}
                    .nx-modal-actions{display:flex;gap:8px;justify-content:flex-end}
                    .nx-modal-btn{font-family:inherit;font-size:.85rem;font-weight:700;padding:9px 20px;
                        border-radius:50px;border:none;cursor:pointer;transition:all .2s}
                    .nx-modal-btn.primary{background:#fff;color:#000}
                    .nx-modal-btn.secondary{background:transparent;color:#8a8a8a;border:1px solid rgba(255,255,255,.12)}`;
                document.head.appendChild(s);
            }
            document.body.appendChild(overlay);
        }

        overlay.querySelector('.nx-modal-title').textContent = title;
        overlay.querySelector('.nx-modal-message').textContent = message;

        const confirmBtn = overlay.querySelector('.nx-modal-confirm');
        const cancelBtn  = overlay.querySelector('.nx-modal-cancel');
        confirmBtn.textContent = confirmLabel;
        cancelBtn.style.display = confirm ? '' : 'none';

        const close = (val) => { overlay.classList.remove('active'); resolve(val); };
        confirmBtn.onclick = () => close(true);
        cancelBtn.onclick  = () => close(false);

        overlay.classList.add('active');
        confirmBtn.focus();
    });
}