const fs = require('fs');

// Fix index.html
let html = fs.readFileSync('index.html', 'utf8');

// Remove the dangerous redirect script
html = html.replace(/<script>\s*\/\/\s*Fix for Vercel trailing slash issue[\s\S]*?<\/script>\s*/, '');

// Convert to absolute paths
html = html.replace('href="manifest.json"', 'href="/Nixmoto/manifest.json"');
html = html.replace('href="icon512.png"', 'href="/Nixmoto/icon512.png"');
html = html.replace("href='style.css'", "href='/Nixmoto/style.css'");
html = html.replace("src='app.js'", "src='/Nixmoto/app.js'");
html = html.replace("register('sw.js')", "register('/Nixmoto/sw.js')");

fs.writeFileSync('index.html', html);

// Also need to fix sw.js to use absolute paths so it caches correctly
let sw = fs.readFileSync('sw.js', 'utf8');
sw = sw.replace(/const ASSETS_TO_CACHE = \[[^\]]+\];/, `const ASSETS_TO_CACHE = [
  '/Nixmoto/',
  '/Nixmoto/index.html',
  '/Nixmoto/style.css',
  '/Nixmoto/app.js',
  '/Nixmoto/manifest.json',
  '/Nixmoto/icon512.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@300;400;500&display=swap'
];`);
fs.writeFileSync('sw.js', sw);

// And manifest.json start_url
let manifest = fs.readFileSync('manifest.json', 'utf8');
manifest = manifest.replace('"start_url": "./index.html"', '"start_url": "/Nixmoto/"');
manifest = manifest.replace('"src": "icon512.png"', '"src": "/Nixmoto/icon512.png"');
fs.writeFileSync('manifest.json', manifest);

console.log('Fixed absolute paths for Vercel!');
