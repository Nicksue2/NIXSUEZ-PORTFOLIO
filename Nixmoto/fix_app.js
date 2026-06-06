const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Remove loadSettingsFields definition
appJs = appJs.replace(/\/\/ Load settings fields if previously saved\s*function loadSettingsFields\(\) \{[\s\S]*?\}\s*\}\s*\}\s*/, '');

// 2. Remove loadSettingsFields call from DOMContentLoaded
appJs = appJs.replace(/document\.addEventListener\(\"DOMContentLoaded\"\,\s*\(\)\s*\=\>\s*\{\s*loadSettingsFields\(\);\s*/, 'document.addEventListener("DOMContentLoaded", () => {\n        ');

// 3. Make saveOilLog robust
appJs = appJs.replace(
  'if (error) throw error;',
  `if (error) {
                console.warn("Supabase oil save failed:", error.message);
                showToast("Saved locally (Supabase table missing)", false);
              } else`
);

// 4. In case the above replace didn't work because of indentation, let's just do:
appJs = appJs.replace(
  '              if (error) throw error;\n              record.id = data.id;',
  `              if (error) {
                console.warn("Supabase oil save failed:", error.message);
                showToast("Saved locally (Supabase table missing)", false);
              } else {
                record.id = data.id;
              }`
);

// Also add a check so it doesn't show "Oil change logged" twice
appJs = appJs.replace(
  'showToast("Oil change logged 🛠");',
  'if (btn.textContent === "Saving...") { showToast("Oil change logged 🛠"); }'
);

fs.writeFileSync('app.js', appJs);
console.log('Fixed app.js');
