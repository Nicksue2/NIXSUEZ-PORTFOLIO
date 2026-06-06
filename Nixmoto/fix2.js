const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Remove loadSettingsFields completely
code = code.replace(/function loadSettingsFields\(\) \{[\s\S]*?\}\s*(?=\/\/ ─── START)/, '');

// 2. Remove any lingering calls to loadSettingsFields
code = code.replace(/loadSettingsFields\(\);\s*/g, '');

// 3. Fix saveOilLog error handling
code = code.replace(
  'const { data, error } = await supabaseClient.from("oil_logs").insert([record]).select().single();\n              if (error) throw error;\n              record.id = data.id;',
  `const { data, error } = await supabaseClient.from("oil_logs").insert([record]).select().single();
              if (error) {
                console.warn("Supabase oil save failed:", error.message);
                showToast("Saved locally (Run SQL for online sync)", false);
              } else {
                record.id = data.id;
              }`
);

// 4. Update the success toast to only show if it wasn't already shown
code = code.replace(
  'renderOil();\n            showToast("Oil change logged 🛠");',
  `renderOil();
            if (btn.textContent === "Saving...") {
              showToast("Oil change logged 🛠");
            }`
);

fs.writeFileSync('app.js', code);
console.log('Fixed app.js properly');
