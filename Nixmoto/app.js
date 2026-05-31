// ─── CONFIG ──────────────────────────────────────────────────
      const LSKEY = "nixmoto_v2";
      const CFGKEY = "nixmoto_supabase";
      const PRICEKEY = "nixmoto_last_price";
      const TABLE = "fuel_logs";

      // ─── STATE ───────────────────────────────────────────────────
      let logs = []; // sorted asc by date
      let supabaseClient = null;
      let modalCallback = null;
      let currentPage = "dashboard";

      // ─── INIT ────────────────────────────────────────────────────
      async function init() {
        try {
          loadLocal();
        loadOilLocal();
          initSupabase();
          setDefaultDateTime();
          loadLastPrice();
          if (supabaseClient) {
            await Promise.race([
              syncFromSupabase(), syncOilFromSupabase(),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Sync timeout')), 5000))
            ]);
          }
        } catch (e) {
          console.warn('Init error:', e.message);
        } finally {
          renderAll();
        }
      }

      // ─── LOCAL STORAGE ───────────────────────────────────────────
      function loadLocal() {
        try {
          const parsed = JSON.parse(localStorage.getItem(LSKEY));
          logs = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          logs = [];
        }
        sortLogs();
      }

      function saveLocal() {
        localStorage.setItem(LSKEY, JSON.stringify(logs));
      }

      function sortLogs() {
        logs.sort((a, b) => {
          const da = a.log_date + "T" + (a.log_time || "00:00");
          const db = b.log_date + "T" + (b.log_time || "00:00");
          return da < db ? -1 : da > db ? 1 : 0;
        });
      }

      // ─── SUPABASE ────────────────────────────────────────────────
      function initSupabase() {
        const cfg = getSupabaseConfig();
        if (!cfg) return;
        try {
          supabaseClient = window.supabase.createClient(cfg.url, cfg.key);
          updateSyncStatus("⬤ Connected", "rgba(45,212,191,0.8)");
        } catch (e) {
          supabaseClient = null;
          updateSyncStatus("⬤ Config error", "rgba(255,80,80,0.7)");
        }
      }

      function getSupabaseConfig() {
        try {
          const local = JSON.parse(localStorage.getItem(CFGKEY));
          if (local && local.url && local.key) return local;
        } catch (e) {}
        return {
          url: "https://ivziuhxyvcnhuouoruap.supabase.co",
          key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eml1aHh5dmNuaHVvdW9ydWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MTQyOTEsImV4cCI6MjA5MzM5MDI5MX0.8iVPHgqewZzIWaYw9Zc3i_9nV7WejtDmiGxm23IHA0w"
        };
      }

      function saveSupabaseConfig() {
        let url = document.getElementById("cfg-url").value.trim();
        const key = document.getElementById("cfg-key").value.trim();
        
        // Auto-correct if user pastes the dashboard URL instead of API URL
        if (url.includes("supabase.com/dashboard/project/")) {
          const match = url.match(/project\/([a-z0-9]+)/i);
          if (match && match[1]) {
            url = `https://${match[1]}.supabase.co`;
            document.getElementById("cfg-url").value = url;
          }
        }
        
        if (!url || !key) {
          showToast("Enter both URL and key.", true);
          return;
        }
        localStorage.setItem(CFGKEY, JSON.stringify({ url, key }));
        supabaseClient = null;
        initSupabase();
        showToast("Supabase config saved!");
        showCfgStatus("Saved. Testing connection…", "var(--accent)");
        setTimeout(testConnection, 600);
      }

      async function testConnection() {
        if (!supabaseClient) {
          showToast("Not configured yet.", true);
          return;
        }
        showCfgStatus("Testing…", "rgba(255,255,255,0.4)");
        try {
          const { error } = await supabaseClient.from(TABLE).select("id").limit(1);
          if (error) throw error;
          showCfgStatus("✓ Connected successfully!", "var(--good)");
          showToast("Connection OK ✓");
        } catch (e) {
          showCfgStatus(
            "✗ " + (e.message || "Connection failed"),
            "var(--danger)",
          );
          showToast("Connection failed.", true);
        }
      }

      function showCfgStatus(msg, color) {
        const el = document.getElementById("cfg-status");
        el.textContent = msg;
        el.style.color = color;
        el.style.display = "block";
      }

      async function syncFromSupabase() {
        if (!supabaseClient) return;
        try {
          const { data, error } = await supabaseClient
            .from(TABLE)
            .select("*")
            .order("log_date", { ascending: true })
            .order("log_time", { ascending: true });
          if (error) throw error;
          if (data && data.length > 0) {
            logs = data;
            saveLocal();
          }
        } catch (e) {
          console.warn("Supabase sync failed:", e.message);
        }
      }

      // ─── DATE / TIME HELPERS ─────────────────────────────────────
      function nowDate() {
        const d = new Date();
        return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
      }
      function nowTime() {
        const d = new Date();
        return `${p2(d.getHours())}:${p2(d.getMinutes())}`;
      }
      function p2(n) {
        return String(n).padStart(2, "0");
      }

      function setDefaultDateTime() {
        document.getElementById("inp-date").value = nowDate();
        document.getElementById("inp-time").value = nowTime();
      }

      function loadLastPrice() {
        const lp = localStorage.getItem(PRICEKEY);
        if (lp) document.getElementById("inp-price").value = lp;
      }

      // ─── PREVIEW ─────────────────────────────────────────────────
      function calcPreview() {
        const paid = parseFloat(document.getElementById("inp-paid").value);
        const price = parseFloat(document.getElementById("inp-price").value);
        const odo = parseFloat(document.getElementById("inp-odo").value);
        const card = document.getElementById("preview-card");
        if (!paid || !price || paid <= 0 || price <= 0) {
          card.style.display = "none";
          return;
        }
        const liters = paid / price;
        document.getElementById("prev-liters").textContent =
          liters.toFixed(3) + " L";
        const kmlWrap = document.getElementById("prev-kml-wrap");
        const tkmWrap = document.getElementById("prev-tripkm-wrap");
        if (odo > 0 && logs.length > 0) {
          const prev = logs[logs.length - 1];
          if (odo > prev.odometer) {
            const tkm = odo - prev.odometer;
            document.getElementById("prev-tripkm").textContent =
              tkm.toFixed(1) + " km";
            document.getElementById("prev-kml").textContent =
              (tkm / liters).toFixed(2) + " km/L";
            kmlWrap.style.display = "";
            tkmWrap.style.display = "";
          } else {
            kmlWrap.style.display = "none";
            tkmWrap.style.display = "none";
          }
        } else {
          kmlWrap.style.display = "none";
          tkmWrap.style.display = "none";
        }
        card.style.display = "";
      }

      // hook odo input too
      document.getElementById("inp-odo").addEventListener("input", calcPreview);

      // ─── SAVE LOG ────────────────────────────────────────────────
      async function saveLog() {
        const btn = document.getElementById("save-btn");
        const errEl = document.getElementById("save-error");
        errEl.style.display = "none";

        const odo = parseFloat(document.getElementById("inp-odo").value);
        const paid = parseFloat(document.getElementById("inp-paid").value);
        const price = parseFloat(document.getElementById("inp-price").value);
        const date = document.getElementById("inp-date").value || nowDate();
        const time = document.getElementById("inp-time").value || nowTime();
        const note = document.getElementById("inp-note").value.trim();

        if (!odo || odo <= 0) {
          showErr("Enter a valid odometer reading.");
          return;
        }
        if (!paid || paid <= 0) {
          showErr("Enter total amount paid.");
          return;
        }
        if (!price || price <= 0) {
          showErr("Enter price per liter.");
          return;
        }
        if (logs.length > 0 && odo <= logs[logs.length - 1].odometer) {
          showErr(
            `Odometer must be higher than last entry (${logs[logs.length - 1].odometer.toLocaleString()} km).`,
          );
          return;
        }

        function showErr(msg) {
          errEl.textContent = "⚠ " + msg;
          errEl.style.display = "block";
        }

        const liters = paid / price;
        let trip_km = null,
          kml = null;
        if (logs.length > 0) {
          trip_km = odo - logs[logs.length - 1].odometer;
          kml = trip_km / liters;
        }

        const record = {
          log_date: date,
          log_time: time,
          odometer: odo,
          total_paid: paid,
          price_liter: price,
          liters: liters,
          trip_km,
          kml,
          note: note || null,
        };

        btn.disabled = true;
        btn.textContent = "Saving…";

        try {
          if (supabaseClient) {
            const { data, error } = await supabaseClient
              .from(TABLE)
              .insert([
                {
                  log_date: record.log_date,
                  log_time: record.log_time,
                  odometer: record.odometer,
                  total_paid: record.total_paid,
                  price_liter: record.price_liter,
                  trip_km: record.trip_km,
                  kml: record.kml,
                  note: record.note,
                },
              ])
              .select()
              .single();
            if (error) throw error;
            record.id = data.id;
            record.created_at = data.created_at;
            record.liters = data.liters; // use DB computed value
          }
          logs.push(record);
          sortLogs();
          saveLocal();
          localStorage.setItem(PRICEKEY, price);

          // Reset form
          document.getElementById("inp-odo").value = "";
          document.getElementById("inp-paid").value = "";
          document.getElementById("inp-note").value = "";
          setDefaultDateTime();
          document.getElementById("preview-card").style.display = "none";

          renderAll();
          showToast(
            kml !== null
              ? `Saved · ${kml.toFixed(2)} km/L ✓`
              : "Baseline saved ✓",
          );
          showPage("dashboard");
        } catch (e) {
          showErr("Save failed: " + (e.message || "Unknown error"));
        } finally {
          btn.disabled = false;
          btn.textContent = "Save Fuel Log";
        }
      }

      // ─── DELETE ──────────────────────────────────────────────────
      function promptDelete(id, idx) {
        openModal(
          "Delete this entry?",
          "This log will be removed and efficiency of following entries will be recalculated.",
          "Delete Entry",
          async () => {
            await deleteLog(id, idx);
          },
        );
      }

      async function deleteLog(id, idx) {
        try {
          if (supabaseClient && id) {
            const { error } = await supabaseClient.from(TABLE).delete().eq("id", id);
            if (error) throw error;
          }
          logs.splice(idx, 1);
          // Recalculate trip_km / kml
          for (let i = 0; i < logs.length; i++) {
            if (i === 0) {
              logs[i].trip_km = null;
              logs[i].kml = null;
            } else {
              const tkm = logs[i].odometer - logs[i - 1].odometer;
              logs[i].trip_km = tkm;
              logs[i].kml = tkm / logs[i].liters;
              // Update supabase row
              if (supabaseClient && logs[i].id) {
                await supabaseClient
                  .from(TABLE)
                  .update({ trip_km: tkm, kml: logs[i].kml })
                  .eq("id", logs[i].id);
              }
            }
          }
          saveLocal();
          renderAll();
          showToast("Entry deleted.");
        } catch (e) {
          showToast("Delete failed: " + (e.message || ""), true);
        }
      }

      function confirmClearAll() {
        openModal(
          "Clear all local data?",
          "This removes all locally stored logs. Your Supabase data (if connected) will remain.",
          "Clear Local Data",
          () => {
            logs = [];
            localStorage.removeItem(LSKEY);
            renderAll();
            showToast("Local data cleared.");
          },
        );
      }

      function updateSyncStatus(text, color) {
        const el = document.getElementById("sync-status-sidebar");
        if (el) {
          el.textContent = text;
          el.style.color = color;
        }
      }

      function updateConfigBanner() {
        const banner = document.getElementById("config-banner");
        if (banner) {
          banner.style.display = supabaseClient ? "none" : "block";
        }
      }

      // ─── RENDER ALL ──────────────────────────────────────────────
      function renderAll() {
        renderOil();
        renderDashboard();
        renderHistory();
        renderStats();
        
      }

      // ─── DASHBOARD ───────────────────────────────────────────────
      function renderDashboard() {
        const valid = logs.filter((l) => l.kml !== null && l.trip_km > 0);
        const totalKm = valid.reduce((s, l) => s + (l.trip_km || 0), 0);
        const totalLiters = logs.reduce((s, l) => s + (l.liters || 0), 0);
        const totalSpent = logs.reduce((s, l) => s + (l.total_paid || 0), 0);
        const avgKml =
          valid.length && totalLiters > 0 ? totalKm / totalLiters : null;
        const costPerKm = totalKm > 0 ? totalSpent / totalKm : null;

        const kmlEl = document.getElementById("dash-avg-kml");
        const badge = document.getElementById("dash-trip-badge");

        kmlEl.textContent = avgKml ? avgKml.toFixed(2) : "--";
        kmlEl.style.color = avgKml ? effColor(avgKml) : "var(--accent)";
        badge.style.display = valid.length ? "" : "none";
        badge.textContent = `${valid.length} trip${valid.length !== 1 ? "s" : ""}`;

        document.getElementById("dash-total-spent").textContent = logs.length
          ? `₱ ${fmt(totalSpent)}`
          : "₱ --";
        document.getElementById("dash-total-liters").textContent = logs.length
          ? `${totalLiters.toFixed(2)} L`
          : "-- L";
        document.getElementById("dash-total-km").textContent =
          totalKm > 0 ? `${totalKm.toFixed(1)} km` : "-- km";
        document.getElementById("dash-cost-km").textContent = costPerKm
          ? `₱ ${costPerKm.toFixed(2)}`
          : "₱ --";

        // Mini chart
        const recent = valid.slice(-10);
        renderChart("dash-chart", recent, 80);

        // Last log card
        const lastLogCard = document.getElementById("last-log-card");
        if (logs.length > 0) {
          const l = logs[logs.length - 1];
          lastLogCard.style.display = "";
          document.getElementById("last-log-content").innerHTML = `
      <div style="display:flex; gap:1.5rem; flex-wrap:wrap; align-items:center;">
        <div>
          <div style="font-size:0.65rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:2px;">Date</div>
          <div style="font-size:0.875rem; font-weight:500;">${formatDateStr(l.log_date)} ${l.log_time ? "· " + l.log_time : ""}</div>
        </div>
        <div>
          <div style="font-size:0.65rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:2px;">Odometer</div>
          <div style="font-family:'DM Mono',monospace; font-size:0.875rem;">${l.odometer.toLocaleString()} km</div>
        </div>
        <div>
          <div style="font-size:0.65rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:2px;">Paid</div>
          <div style="font-family:'DM Mono',monospace; font-size:0.875rem;">₱${fmt(l.total_paid)}</div>
        </div>
        ${
          l.kml
            ? `<div>
          <div style="font-size:0.65rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:2px;">Efficiency</div>
          <div style="font-family:'DM Mono',monospace; font-size:1rem; font-weight:700; color:${effColor(l.kml)};">${l.kml.toFixed(2)} km/L</div>
        </div>`
            : `<div style="font-size:0.75rem; color:rgba(255,255,255,0.3); font-style:italic;">Baseline entry</div>`
        }
      </div>
      ${l.note ? `<div style="margin-top:0.5rem; font-size:0.75rem; color:rgba(255,255,255,0.35);">📝 ${l.note}</div>` : ""}
    `;
        } else {
          lastLogCard.style.display = "none";
        }
      }

      // ─── HISTORY ─────────────────────────────────────────────────
      function renderHistory() {
        const reversed = [...logs].reverse();
        const desktopList = document.getElementById("history-list");
        const mobileList = document.getElementById("history-list-mobile");
        const empty = document.getElementById("history-empty");

        if (logs.length === 0) {
          desktopList.innerHTML = "";
          mobileList.innerHTML = "";
          empty.style.display = "";
          return;
        }
        empty.style.display = "none";

        // Desktop rows
        desktopList.innerHTML = reversed
          .map((l, ri) => {
            const origIdx = logs.length - 1 - ri;
            const kmlStr = l.kml
              ? `<span style="font-family:'DM Mono',monospace; font-size:0.85rem; font-weight:600; color:${effColor(l.kml)};">${l.kml.toFixed(2)}</span>`
              : `<span style="font-size:0.72rem; color:rgba(255,255,255,0.2); font-style:italic;">baseline</span>`;
            return `
      <div class="log-row">
        <div>
          <div style="font-size:0.78rem; font-weight:500;">${formatDateStr(l.log_date)}</div>
          <div style="font-size:0.65rem; color:rgba(255,255,255,0.3); font-family:'DM Mono',monospace;">${l.log_time || ""}</div>
        </div>
        <div style="font-family:'DM Mono',monospace; font-size:0.9rem;">${l.odometer.toLocaleString()} <span style="font-size:0.7rem; opacity:0.35;">km</span></div>
        <div style="font-family:'DM Mono',monospace; font-size:0.82rem; color:rgba(255,255,255,0.55);">${l.trip_km ? l.trip_km.toFixed(1) : "--"}</div>
        <div style="font-family:'DM Mono',monospace; font-size:0.82rem;">₱${fmt(l.total_paid)}</div>
        <div style="font-family:'DM Mono',monospace; font-size:0.82rem; color:rgba(255,255,255,0.55);">${(+l.liters).toFixed(3)} L</div>
        <div>${kmlStr}</div>
        <button onclick="promptDelete(${l.id || "null"},${origIdx})" style="color:rgba(255,80,80,0.45); padding:4px; border-radius:6px; transition:color 0.15s; background:transparent; border:none; cursor:pointer;" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='rgba(255,80,80,0.45)'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
          })
          .join("");

        // Mobile cards
        mobileList.innerHTML = reversed
          .map((l, ri) => {
            const origIdx = logs.length - 1 - ri;
            const kmlStr = l.kml
              ? `<span style="font-family:'DM Mono',monospace; font-size:0.95rem; font-weight:700; color:${effColor(l.kml)};">${l.kml.toFixed(2)} <span style="font-size:0.68rem; opacity:0.6;">km/L</span></span>`
              : `<span style="font-size:0.7rem; color:rgba(255,255,255,0.25); font-style:italic;">Baseline</span>`;
            return `
      <div class="glass rounded-2xl p-4">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <div>
            <div style="font-size:0.8rem; font-weight:600;">${formatDateStr(l.log_date)}</div>
            <div style="font-size:0.65rem; color:rgba(255,255,255,0.3); font-family:'DM Mono',monospace;">${l.log_time || ""}</div>
          </div>
          <div style="display:flex; align-items:center; gap:0.625rem;">
            ${kmlStr}
            <button onclick="promptDelete(${l.id || "null"},${origIdx})" style="color:rgba(255,80,80,0.4); padding:4px; border:none; background:transparent; cursor:pointer;" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='rgba(255,80,80,0.4)'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
        <div style="display:flex; gap:1.25rem; flex-wrap:wrap;">
          <div>
            <div style="font-size:0.6rem; color:rgba(255,255,255,0.28); text-transform:uppercase; letter-spacing:0.07em;">Odometer</div>
            <div style="font-family:'DM Mono',monospace; font-size:0.82rem;">${l.odometer.toLocaleString()} km</div>
          </div>
          <div>
            <div style="font-size:0.6rem; color:rgba(255,255,255,0.28); text-transform:uppercase; letter-spacing:0.07em;">Paid</div>
            <div style="font-family:'DM Mono',monospace; font-size:0.82rem;">₱${fmt(l.total_paid)}</div>
          </div>
          <div>
            <div style="font-size:0.6rem; color:rgba(255,255,255,0.28); text-transform:uppercase; letter-spacing:0.07em;">Liters</div>
            <div style="font-family:'DM Mono',monospace; font-size:0.82rem;">${(+l.liters).toFixed(3)} L</div>
          </div>
          ${
            l.trip_km
              ? `<div>
            <div style="font-size:0.6rem; color:rgba(255,255,255,0.28); text-transform:uppercase; letter-spacing:0.07em;">Trip</div>
            <div style="font-family:'DM Mono',monospace; font-size:0.82rem;">${l.trip_km.toFixed(1)} km</div>
          </div>`
              : ""
          }
        </div>
        ${l.note ? `<div style="margin-top:0.5rem; font-size:0.72rem; color:rgba(255,255,255,0.3);">📝 ${l.note}</div>` : ""}
      </div>
    `;
          })
          .join("");
      }

      // ─── STATISTICS ──────────────────────────────────────────────
      function renderStats() {
        const valid = logs.filter((l) => l.kml !== null && l.trip_km > 0);

        // Big chart
        renderChart("stats-chart", valid.slice(-20), 120);

        document.getElementById("stat-count").textContent = logs.length;

        if (!valid.length) {
          ["stat-best", "stat-worst", "stat-avg-spend"].forEach(
            (id) => (document.getElementById(id).textContent = "--"),
          );
          document.getElementById("monthly-breakdown").innerHTML = "";
          document.getElementById("monthly-empty").style.display = "";
          return;
        }

        const best = valid.reduce((a, b) => (b.kml > a.kml ? b : a));
        const worst = valid.reduce((a, b) => (b.kml < a.kml ? b : a));
        const avgSpend =
          logs.reduce((s, l) => s + l.total_paid, 0) / logs.length;

        document.getElementById("stat-best").textContent =
          best.kml.toFixed(2) + " km/L";
        document.getElementById("stat-best-date").textContent = formatDateStr(
          best.log_date,
        );
        document.getElementById("stat-worst").textContent =
          worst.kml.toFixed(2) + " km/L";
        document.getElementById("stat-worst-date").textContent = formatDateStr(
          worst.log_date,
        );
        document.getElementById("stat-avg-spend").textContent =
          "₱ " + avgSpend.toFixed(2);

        // Monthly
        const monthly = {};
        logs.forEach((l) => {
          const m = l.log_date.slice(0, 7);
          if (!monthly[m])
            monthly[m] = { spent: 0, liters: 0, km: 0, count: 0 };
          monthly[m].spent += l.total_paid;
          monthly[m].liters += l.liters;
          if (l.trip_km) monthly[m].km += l.trip_km;
          monthly[m].count++;
        });
        const months = Object.keys(monthly).sort().reverse();
        const monthEl = document.getElementById("monthly-breakdown");
        const emptyEl = document.getElementById("monthly-empty");

        if (!months.length) {
          monthEl.innerHTML = "";
          emptyEl.style.display = "";
          return;
        }
        emptyEl.style.display = "none";

        monthEl.innerHTML = months
          .map((m) => {
            const d = monthly[m];
            const avgKml = d.km > 0 ? d.km / d.liters : null;
            const [yr, mo] = m.split("-");
            const label = new Date(yr, mo - 1, 1).toLocaleString("en-PH", {
              month: "long",
              year: "numeric",
            });
            return `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:0.625rem 0; border-bottom:1px solid rgba(255,255,255,0.05);">
        <div>
          <div style="font-size:0.82rem; font-weight:500;">${label}</div>
          <div style="font-size:0.68rem; color:rgba(255,255,255,0.28);">${d.count} fill-ups · ₱${fmt(d.spent)} · ${d.liters.toFixed(2)} L</div>
        </div>
        <div style="font-family:'DM Mono',monospace; font-size:0.95rem; font-weight:600; color:${avgKml ? effColor(avgKml) : "rgba(255,255,255,0.3)"};">
          ${avgKml ? avgKml.toFixed(2) + " km/L" : "--"}
        </div>
      </div>
    `;
          })
          .join("");
      }

      // ─── CHART ───────────────────────────────────────────────────
      function renderChart(containerId, data, height) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.style.height = height + "px";
        if (!data.length) {
          el.innerHTML = `<div style="width:100%;text-align:center;color:rgba(255,255,255,0.2);font-size:0.75rem;align-self:center;">No data yet</div>`;
          return;
        }
        const max = Math.max(...data.map((d) => d.kml));
        el.innerHTML = data
          .map((d) => {
            const pct = max > 0 ? (d.kml / max) * 100 : 0;
            const color = effColor(d.kml);
            return `
      <div class="chart-bar" style="height:${pct}%; background:${color}; opacity:0.75; min-height:4px;">
        <div class="chart-tooltip">${d.kml.toFixed(2)} km/L<br>${formatDateStr(d.log_date)}</div>
      </div>
    `;
          })
          .join("");
      }

      // ─── HELPERS ─────────────────────────────────────────────────
      function effColor(kml) {
        if (kml >= 40) return "var(--good)";
        if (kml >= 30) return "var(--accent)";
        if (kml >= 20) return "var(--warn)";
        return "var(--danger)";
      }

      function fmt(n) {
        return (+n).toLocaleString("en-PH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      function formatDateStr(iso) {
        if (!iso) return "";
        try {
          const [y, m, d] = iso.split("-");
          return new Date(+y, +m - 1, +d).toLocaleDateString("en-PH", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        } catch (e) {
          return iso;
        }
      }


      // ─── EXPORT CSV ──────────────────────────────────────────────
      function exportCSV() {
        if (!logs.length) {
          showToast("No data to export.", true);
          return;
        }
        const hdr =
          "Date,Time,Odometer,Trip km,Total Paid,Price/L,Liters,km/L,Note\n";
        const rows = logs
          .map(
            (l) =>
              `${l.log_date},${l.log_time || ""},${l.odometer},${l.trip_km || ""},${l.total_paid},${l.price_liter},${(+l.liters).toFixed(3)},${l.kml ? l.kml.toFixed(2) : ""},"${l.note || ""}"`,
          )
          .join("\n");
        const blob = new Blob([hdr + rows], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `nixmoto_${nowDate()}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
        showToast("CSV exported ✓");
      }

      // ─── SQL COPY ────────────────────────────────────────────────
      function copySql() {
        const text = document.getElementById("sql-block").textContent;
        navigator.clipboard
          .writeText(text)
          .then(() => showToast("SQL copied ✓"))
          .catch(() => showToast("Copy failed", true));
      }

      // ─── NAVIGATION ──────────────────────────────────────────────
      function showPage(name) {
        currentPage = name;
        document
          .querySelectorAll(".page")
          .forEach((p) => p.classList.remove("active"));
        document.getElementById("page-" + name).classList.add("active");
        // Sidebar nav
        document
          .querySelectorAll(".nav-item")
          .forEach((n) => n.classList.remove("active"));
        const navEl = document.getElementById("nav-" + name);
        if (navEl) navEl.classList.add("active");
        // Bottom nav
        document
          .querySelectorAll(".bnav-item")
          .forEach((n) => n.classList.remove("active"));
        const bnavEl = document.getElementById("bnav-" + name);
        if (bnavEl) bnavEl.classList.add("active");
        // Mobile: reset date/time when going to add
        if (name === "add") setDefaultDateTime();
        closeSidebar();
      }

      function toggleSidebar() {
        document.getElementById("sidebar").classList.toggle("open");
        document.getElementById("sidebar-overlay").style.display = document
          .getElementById("sidebar")
          .classList.contains("open")
          ? "block"
          : "none";
      }

      function closeSidebar() {
        document.getElementById("sidebar").classList.remove("open");
        document.getElementById("sidebar-overlay").style.display = "none";
      }

      // ─── MODAL ───────────────────────────────────────────────────
      function openModal(title, msg, btnLabel, onConfirm) {
        document.getElementById("modal-title").textContent = title;
        document.getElementById("modal-msg").textContent = msg;
        document.getElementById("modal-confirm-btn").textContent = btnLabel;
        modalCallback = onConfirm;
        document.getElementById("modal").classList.add("open");
      }

      function closeModal() {
        document.getElementById("modal").classList.remove("open");
        modalCallback = null;
      }

      document
        .getElementById("modal-confirm-btn")
        .addEventListener("click", async () => {
          if (modalCallback) {
            await modalCallback();
          }
          closeModal();
        });

      document.getElementById("modal").addEventListener("click", function (e) {
        if (e.target === this) closeModal();
      });

      // ─── TOAST ───────────────────────────────────────────────────
      let toastTimer;
      function showToast(msg, isError = false) {
        const t = document.getElementById("toast");
        t.textContent = msg;
        t.style.background = isError
          ? "rgba(60,15,15,0.97)"
          : "rgba(18,18,18,0.97)";
        t.style.color = isError ? "var(--danger)" : "#f5f5f7";
        t.style.borderColor = isError
          ? "rgba(255,70,70,0.2)"
          : "rgba(255,255,255,0.12)";
        t.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
      }

      // Load settings fields if previously saved
      function loadSettingsFields() {
        const cfg = getSupabaseConfig();
        if (cfg) {
          document.getElementById("cfg-url").value = cfg.url || "";
          document.getElementById("cfg-key").value = cfg.key || "";
          showCfgStatus(
            "Config loaded from storage.",
            "rgba(255,255,255,0.35)",
          );
        }
      }

      // ─── START ───────────────────────────────────────────────────
      document.addEventListener("DOMContentLoaded", () => {
        
        init();
      });

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
        listEl.innerHTML = oilLogs.map((l, i) => `
          <div class="glass" style="padding: 1rem; border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${l.odometer.toLocaleString()} km</div>
              <div style="font-size: 0.7rem; color: rgba(255,255,255,0.4);">${formatDateStr(l.log_date)} ${l.brand ? '· ' + l.brand : ''}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              ${l.cost ? `<div style="font-family: 'DM Mono', monospace; font-size: 0.85rem; color: var(--accent);">₱${l.cost.toFixed(2)}</div>` : ''}
              <button onclick="deleteOilLog(${l.id || 'null'}, ${i})" style="color: rgba(255,80,80,0.5); background: none; border: none; padding: 4px; cursor: pointer;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        `).join('');
      }

      // Hook into init and renderAll
