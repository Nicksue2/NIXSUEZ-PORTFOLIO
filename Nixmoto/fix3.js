const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove hamburger button and add button from mobile header
// The mobile-header looks like this:
// <div class="mobile-header desktop-only" style="display:none;">
//   <button ... toggleSidebar() ... > ... </button>
//   <div>NixMoto</div>
//   <button ... showPage('add') ... > ... </button>
// </div>

const newMobileHeader = `<div class="mobile-header desktop-only" style="display:none;">
          <div style="width: 34px;"></div>
          <div
            style="font-size: 1.1rem; font-weight: 700; letter-spacing: -0.03em"
          >
            Nix<span style="color: var(--accent)">Moto</span>
          </div>
          <div style="width: 34px;"></div>
        </div>`;

html = html.replace(/<div class="mobile-header desktop-only" style="display:none;">[\s\S]*?<\/div>\s*<\/div>\s*<div\s+id="page-content"/, newMobileHeader + '\n\n        <div\n          id="page-content"');

// 2. Remove redundant "+ Log New Refuel" button from dashboard
const addBtnHtml = `<!-- Quick add CTA -->
            <button class="btn-primary" onclick="showPage('add')">
              + Log New Refuel
            </button>`;

html = html.replace(addBtnHtml, `<!-- Removed Quick add CTA since there is a FAB -->`);

// 3. Update FAB SVG to fuel + plus icon
const oldFab = `<button class="fab-add mobile-only" onclick="showPage('add')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 22V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/>
        <path d="M14 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <circle cx="18" cy="11" r="3"/>
        <path d="M15 22v-5"/>
        <path d="M21 22v-5"/>
        <path d="M7 12h4"/>
        <path d="M9 10v4"/>
      </svg>
    </button>`;

const newFab = `<button class="fab-add mobile-only" onclick="showPage('add')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 22V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/>
        <path d="M14 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <path d="M14 11h2.5a1.5 1.5 0 0 1 1.5 1.5V16"/>
        <circle cx="18" cy="18" r="5" fill="var(--accent)" stroke="#000" stroke-width="2"/>
        <line x1="18" y1="15.5" x2="18" y2="20.5" stroke="#000" stroke-width="2"/>
        <line x1="15.5" y1="18" x2="20.5" y2="18" stroke="#000" stroke-width="2"/>
        <path d="M7 12h4"/>
        <path d="M9 10v4"/>
      </svg>
    </button>`;

html = html.replace(oldFab, newFab);

fs.writeFileSync('index.html', html);
console.log('Done running fix3.js');
