const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const header = `<!doctype html>
<html lang="en">
  <head>
    <script>
      // Fix for Vercel trailing slash issue
      if (!window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('.html')) {
        window.location.replace(window.location.pathname + '/' + window.location.search + window.location.hash);
      }
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
`;
fs.writeFileSync('index.html', header + html);
console.log('Fixed index.html headers');
