const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace "Add" bottom nav button with "Oil" button
const addBnavOld = `<button class="bnav-item" id="bnav-add" onclick="showPage('add')">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Add
      </button>`;

const oilBnavNew = `<button class="bnav-item" id="bnav-oil" onclick="showPage('oil')">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 2c0 0-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" />
        </svg>
        Oil
      </button>`;

if (html.includes('id="bnav-add"')) {
  html = html.replace(addBnavOld, oilBnavNew);
  console.log('Replaced Add bottom nav with Oil');
} else {
  console.log('Warning: bnav-add not found');
}

// 2. Add oil warning banner to dashboard page (after the page-dashboard div opens)
const dashTarget = '<div class="page active fade-up" id="page-dashboard">';
if (html.includes(dashTarget)) {
  html = html.replace(
    dashTarget,
    dashTarget + '\n            <!-- Oil change warning banner -->\n            <div id="dash-oil-warning" style="display:none; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid rgba(255,60,60,0.3); margin-bottom: 1rem; font-size: 0.85rem; cursor: pointer;" onclick="showPage(\'oil\')"></div>\n'
  );
  console.log('Added oil warning banner to dashboard');
} else {
  console.log('Warning: page-dashboard not found');
}

fs.writeFileSync('index.html', html);
console.log('Done!');
