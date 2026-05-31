const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\nicks\\AppData\\Roaming\\Code\\User\\History\\5b1a615\\TG7D.html', 'utf8');

// 1. Strip original style and scripts (replace with style.css and app.js)
html = html.replace(/<style>[\s\S]*?<\/style>/i, "<link rel='stylesheet' href='style.css' />");
html = html.replace(/<script>\s*\/\/\s*───\s*CONFIG\s*───[\s\S]*?<\/script>/i, '');

// Add app.js and SW script before </body>
html = html.replace(/<\/body>/, `
    <script src='app.js' defer></script>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('sw.js');
        });
      }
    </script>
  </body>`);
  
// Add PWA meta
html = html.replace('<title>NixMoto</title>', `
    <title>NixMoto</title>
    <link rel="manifest" href="manifest.json" />
    <link rel="apple-touch-icon" href="icon512.png" />`.trim());

// 2. Remove Settings Navigation
html = html.replace(/<button[^>]*id="nav-settings"[^>]*>[\s\S]*?<\/button>/, '');
html = html.replace(/<button[^>]*id="bnav-settings"[^>]*>[\s\S]*?<\/button>/, '');

// 3. Convert + Log New Refuel to FAB on mobile, hide big button on mobile
html = html.replace('<button class="btn-primary w-full" style="padding: 1rem"', '<button class="btn-primary w-full desktop-only" style="padding: 1rem"');
const fabHtml = `
    <!-- FAB (Mobile Only) -->
    <button class="fab-add mobile-only" onclick="showPage('add')">
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
html = html.replace(/<!-- BOTTOM NAV \(mobile\) -->/, fabHtml + '\n    <!-- BOTTOM NAV (mobile) -->');

// 4. Add Engine Oil to Navigation
const navOilHtml = `
          <button class="nav-item" onclick="showPage('oil')" id="nav-oil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
            </svg>
            Engine Oil
          </button>`;
html = html.replace(/<\/nav>/, navOilHtml + '\n        </nav>');

const bnavOilHtml = `
      <button class="bnav-item" id="bnav-oil" onclick="showPage('oil')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 2px;">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
        </svg>
        Engine Oil
      </button>`;
html = html.replace(/<\/nav>/, '\n' + bnavOilHtml + '\n    </nav>'); 

// 5. Replace Settings Page with Engine Oil Page
const oilPageHtml = `
          <!-- PAGE: OIL -->
          <div class="page" id="page-oil">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;">
              Engine Oil Tracker
            </h2>

            <div class="glass" style="padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">
                  Next Change Due
                </div>
              </div>
              <div style="font-family: 'DM Mono', monospace; font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em;" id="oil-remaining-km">
                -- km
              </div>
              
              <div style="margin-top: 1.5rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-bottom: 0.5rem;">
                  <span>Since last change: <span id="oil-since-km" style="color: #fff">-- km</span></span>
                  <span>Interval: 900 km</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                  <div id="oil-progress-bar" style="height: 100%; width: 0%; background: var(--accent); border-radius: 3px; transition: width 0.3s ease, background 0.3s ease;"></div>
                </div>
              </div>
            </div>

            <div class="glass" style="padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem;">
              <h3 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem;">Log Oil Change</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <label class="field-label">Odometer (km)</label>
                  <input type="number" id="oil-odo" class="input-field" placeholder="0" />
                </div>
                <div>
                  <label class="field-label">Date</label>
                  <input type="date" id="oil-date" class="input-field" />
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <label class="field-label">Brand / Viscosity</label>
                  <input type="text" id="oil-brand" class="input-field" placeholder="e.g. Yamalube 10W-40" />
                </div>
                <div>
                  <label class="field-label">Cost (₱)</label>
                  <input type="number" id="oil-cost" class="input-field" placeholder="0.00" />
                </div>
              </div>
              <button class="btn-primary w-full" id="oil-save-btn" onclick="saveOilLog()">Save Oil Change</button>
            </div>

            <h3 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem;">History</h3>
            <div id="oil-history-list" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
            <div id="oil-history-empty" style="text-align: center; padding: 2rem 0; color: rgba(255,255,255,0.3); font-size: 0.85rem; display: none;">
              No oil changes logged yet.
            </div>
          </div>`;

// Replace the SETTINGS PAGE with OIL PAGE
html = html.replace(/<!-- PAGE: SETTINGS -->[\s\S]*?(?=<\/div>\s*<!-- \/page-content -->\s*<\/main>)/, oilPageHtml + '\n        ');

// 6. Remove config banner
html = html.replace(/<div id="config-banner"[\s\S]*?<\/div>/, '');

// 7. Hide Mobile Header (hamburger menu)
html = html.replace(/<div class="mobile-header">/, '<div class="mobile-header desktop-only" style="display:none;">');

fs.writeFileSync('index.html', html);
console.log('index.html properly restored and updated with Oil Tracker!');
