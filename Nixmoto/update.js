const fs = require('fs');

// --- UPDATE HTML ---
let html = fs.readFileSync('index.html', 'utf8');

// Replace settings in sidebar with engine oil
html = html.replace(/<button[\s\S]*?id="nav-settings"[\s\S]*?<\/button>/, `
          <button class="nav-item" onclick="showPage('oil')" id="nav-oil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
            </svg>
            Engine Oil
          </button>
`.trim());

// Replace settings in bottom nav with engine oil
html = html.replace(/<button[\s\S]*?id="bnav-settings"[\s\S]*?<\/button>/, `
      <button class="bnav-item" id="bnav-oil" onclick="showPage('oil')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 2px;">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
        </svg>
        Engine Oil
      </button>
`.trim());

// Remove config banner
html = html.replace(/<div id="config-banner"[\s\S]*?<\/div>/, '');

// Convert + Log New Refuel in Dashboard to also have FAB logic, or just add a FAB.
// Wait, the user said "sa mobile ui yung +login new refuel bttn lagay mo sa baba lower right above ng mga nav buttons."
// So we hide the main dashboard button on mobile and show FAB on mobile.
// We can just add the FAB right after page-content, and hide it on desktop.
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
    </button>
`;

// Insert FAB before bottom nav
html = html.replace('<!-- BOTTOM NAV (mobile) -->', fabHtml + '\n    <!-- BOTTOM NAV (mobile) -->');

// Also, hide the dashboard big add button on mobile
html = html.replace('<button class="btn-primary w-full" style="padding: 1rem"', '<button class="btn-primary w-full desktop-only" style="padding: 1rem"');

// Replace Page Settings with Page Oil
const oilPageHtml = `
          <!-- PAGE: OIL -->
          <div class="page" id="page-oil">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem;">
              Engine Oil Tracker
            </h2>

            <!-- Oil Dashboard -->
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

            <!-- Add Oil Change Form -->
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

            <!-- Oil History -->
            <h3 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem;">History</h3>
            <div id="oil-history-list" style="display: flex; flex-direction: column; gap: 0.75rem;"></div>
            <div id="oil-history-empty" style="text-align: center; padding: 2rem 0; color: rgba(255,255,255,0.3); font-size: 0.85rem; display: none;">
              No oil changes logged yet.
            </div>
          </div>
`;

html = html.replace(/<!-- PAGE: SETTINGS -->[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/, oilPageHtml + '\n        </div>\n      </main>');

fs.writeFileSync('index.html', html);


// --- UPDATE CSS ---
let css = fs.readFileSync('style.css', 'utf8');
// Add FAB CSS
css += `

.fab-add {
  position: fixed;
  bottom: 5rem; /* above bottom nav */
  right: 1.25rem;
  width: 56px;
  height: 56px;
  background: var(--accent);
  color: #000;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.4);
  z-index: 50;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}
.fab-add:active {
  transform: scale(0.95);
  background: #25b3a0;
}
`;
fs.writeFileSync('style.css', css);


// --- UPDATE APP.JS ---
let app = fs.readFileSync('app.js', 'utf8');

// Hardcode supabase
app = app.replace(/function getSupabaseConfig\(\) \{[\s\S]*?\}\n/, `
      function getSupabaseConfig() {
        return {
          url: "https://ivziuhxyvcnhuouoruap.supabase.co",
          key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eml1aHh5dmNuaHVvdW9ydWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MTQyOTEsImV4cCI6MjA5MzM5MDI5MX0.8iVPHgqewZzIWaYw9Zc3i_9nV7WejtDmiGxm23IHA0w"
        };
      }
`);

// Remove saveSupabaseConfig and testConnection
app = app.replace(/function saveSupabaseConfig\(\) \{[\s\S]*?\}\n\s*async function testConnection\(\) \{[\s\S]*?\}\n/g, '');
// Remove showCfgStatus and updateConfigBanner and loadSettingsFields
app = app.replace(/function showCfgStatus\([\s\S]*?\}\n/g, '');
app = app.replace(/function updateConfigBanner\([\s\S]*?\}\n/g, '');
app = app.replace(/function loadSettingsFields\([\s\S]*?\}\n/g, '');
// Remove updateConfigBanner and loadSettingsFields calls
app = app.replace(/updateConfigBanner\(\);/g, '');
app = app.replace(/loadSettingsFields\(\);/g, '');

// Add Oil logic
const oilJS = `
      let oilLogs = [];
      const OIL_LSKEY = "nixmoto_oil_v1";

      function loadOilLocal() {
        try {
          const parsed = JSON.parse(localStorage.getItem(OIL_LSKEY));
          oilLogs = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          oilLogs = [];
        }
        sortOilLogs();
      }

      function saveOilLocal() {
        localStorage.setItem(OIL_LSKEY, JSON.stringify(oilLogs));
      }

      function sortOilLogs() {
        oilLogs.sort((a, b) => (a.odometer > b.odometer ? -1 : 1)); // descending
      }

      async function syncOilFromSupabase() {
        if (!supabaseClient) return;
        try {
          const { data, error } = await supabaseClient.from("oil_logs").select("*").order("odometer", { ascending: false });
          if (error) throw error;
          if (data && data.length > 0) {
            oilLogs = data;
            saveOilLocal();
          }
        } catch (e) {
          console.warn("Oil sync failed:", e.message);
        }
      }

      async function saveOilLog() {
        const btn = document.getElementById("oil-save-btn");
        const odo = parseFloat(document.getElementById("oil-odo").value);
        const date = document.getElementById("oil-date").value || nowDate();
        const brand = document.getElementById("oil-brand").value.trim();
        const cost = parseFloat(document.getElementById("oil-cost").value) || 0;

        if (!odo || odo <= 0) {
          showToast("Enter a valid odometer reading.", true);
          return;
        }

        btn.disabled = true;
        btn.textContent = "Saving...";

        const record = { log_date: date, odometer: odo, brand, cost };

        try {
          if (supabaseClient) {
            const { data, error } = await supabaseClient.from("oil_logs").insert([record]).select().single();
            if (error) throw error;
            record.id = data.id;
          }
          oilLogs.push(record);
          sortOilLogs();
          saveOilLocal();
          
          document.getElementById("oil-odo").value = "";
          document.getElementById("oil-brand").value = "";
          document.getElementById("oil-cost").value = "";
          document.getElementById("oil-date").value = nowDate();

          renderOil();
          showToast("Oil change logged ✓");
        } catch(e) {
          showToast("Failed to save oil change.", true);
        } finally {
          btn.disabled = false;
          btn.textContent = "Save Oil Change";
        }
      }

      async function deleteOilLog(id, idx) {
        if(!confirm("Delete this oil change log?")) return;
        try {
          if (supabaseClient && id) {
            await supabaseClient.from("oil_logs").delete().eq("id", id);
          }
          oilLogs.splice(idx, 1);
          saveOilLocal();
          renderOil();
          showToast("Oil log deleted.");
        } catch(e) {
          showToast("Failed to delete.", true);
        }
      }

      function renderOil() {
        const listEl = document.getElementById("oil-history-list");
        const emptyEl = document.getElementById("oil-history-empty");

        if (oilLogs.length === 0) {
          listEl.innerHTML = "";
          emptyEl.style.display = "";
          document.getElementById("oil-since-km").textContent = "-- km";
          document.getElementById("oil-remaining-km").textContent = "-- km";
          document.getElementById("oil-progress-bar").style.width = "0%";
          return;
        }

        emptyEl.style.display = "none";

        // Dashboard calculation
        const lastOil = oilLogs[0]; // because it's sorted descending
        // Find latest fuel log odo
        let currentOdo = lastOil.odometer;
        if (logs.length > 0) {
          const lastFuel = logs[logs.length - 1]; // fuel logs are ascending
          if (lastFuel.odometer > currentOdo) currentOdo = lastFuel.odometer;
        }

        const since = currentOdo - lastOil.odometer;
        const remaining = 900 - since;
        const pct = Math.min(100, Math.max(0, (since / 900) * 100));

        document.getElementById("oil-since-km").textContent = since.toFixed(1) + " km";
        
        const remEl = document.getElementById("oil-remaining-km");
        remEl.textContent = remaining.toFixed(1) + " km";
        remEl.style.color = remaining <= 0 ? "var(--danger)" : remaining <= 150 ? "var(--warn)" : "#fff";

        const bar = document.getElementById("oil-progress-bar");
        bar.style.width = pct + "%";
        bar.style.background = remaining <= 0 ? "var(--danger)" : remaining <= 150 ? "var(--warn)" : "var(--accent)";

        // History
        listEl.innerHTML = oilLogs.map((l, i) => \`
          <div class="glass" style="padding: 1rem; border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">\${l.odometer.toLocaleString()} km</div>
              <div style="font-size: 0.7rem; color: rgba(255,255,255,0.4);">\${formatDateStr(l.log_date)} \${l.brand ? '· ' + l.brand : ''}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              \${l.cost ? \`<div style="font-family: 'DM Mono', monospace; font-size: 0.85rem; color: var(--accent);">₱\${l.cost.toFixed(2)}</div>\` : ''}
              <button onclick="deleteOilLog(\${l.id || 'null'}, \${i})" style="color: rgba(255,80,80,0.5); background: none; border: none; padding: 4px; cursor: pointer;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        \`).join('');
      }

      // Hook into init and renderAll
`;

app = app.replace('function renderAll() {', 'function renderAll() {\n        renderOil();');
app = app.replace('loadLocal();', 'loadLocal();\n        loadOilLocal();');
app = app.replace('syncFromSupabase(),', 'syncFromSupabase(), syncOilFromSupabase(),');
app += oilJS;

fs.writeFileSync('app.js', app);

console.log('Update script finished');
