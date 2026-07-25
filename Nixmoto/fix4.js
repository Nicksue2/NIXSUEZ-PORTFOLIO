const fs = require('fs');

let lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);

let outLines = [];
let skipMode = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // 1. Mobile header
  if (line.includes('<div class="mobile-header desktop-only" style="display:none;">')) {
    outLines.push('        <div class="mobile-header desktop-only" style="display:none;">');
    outLines.push('          <div style="width: 34px;"></div>');
    outLines.push('          <div style="font-size: 1.1rem; font-weight: 700; letter-spacing: -0.03em">');
    outLines.push('            Nix<span style="color: var(--accent)">Moto</span>');
    outLines.push('          </div>');
    outLines.push('          <div style="width: 34px;"></div>');
    outLines.push('        </div>');
    // Skip original lines until closing div of mobile-header
    skipMode = 'mobile-header';
    continue;
  }
  
  if (skipMode === 'mobile-header' && line.includes('<div') && line.includes('id="page-content"')) {
    skipMode = false;
    outLines.push(line);
    continue;
  }

  // 2. Dashboard large add button
  if (!skipMode && line.includes('<!-- Quick add CTA -->')) {
    outLines.push('            <!-- Removed Quick add CTA since there is a FAB -->');
    skipMode = 'quick-add';
    continue;
  }
  if (skipMode === 'quick-add' && line.includes('</button>')) {
    skipMode = false;
    continue;
  }

  // 3. FAB
  if (!skipMode && line.includes('<!-- FAB (Mobile Only) -->')) {
    outLines.push('    <!-- FAB (Mobile Only) -->');
    outLines.push('    <button class="fab-add mobile-only" onclick="showPage(\'add\')">');
    outLines.push('      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">');
    outLines.push('        <path d="M3 22V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/>');
    outLines.push('        <path d="M14 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>');
    outLines.push('        <path d="M14 11h2.5a1.5 1.5 0 0 1 1.5 1.5V16"/>');
    outLines.push('        <circle cx="18" cy="18" r="5" fill="var(--accent)" stroke="#000" stroke-width="2"/>');
    outLines.push('        <line x1="18" y1="15.5" x2="18" y2="20.5" stroke="#000" stroke-width="2"/>');
    outLines.push('        <line x1="15.5" y1="18" x2="20.5" y2="18" stroke="#000" stroke-width="2"/>');
    outLines.push('        <path d="M7 12h4"/>');
    outLines.push('        <path d="M9 10v4"/>');
    outLines.push('      </svg>');
    outLines.push('    </button>');
    skipMode = 'fab';
    continue;
  }
  if (skipMode === 'fab' && line.includes('<!-- BOTTOM NAV (mobile) -->')) {
    skipMode = false;
    outLines.push(line);
    continue;
  }

  if (!skipMode) {
    outLines.push(line);
  }
}

fs.writeFileSync('index.html', outLines.join('\n'));
console.log('Done fix4.js');
