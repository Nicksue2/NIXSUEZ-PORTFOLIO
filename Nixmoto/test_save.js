const fs = require('fs');
const { JSDOM } = require('jsdom');

let code = fs.readFileSync('app.js', 'utf8');
const dom = `
<div id='oil-save-btn'></div>
<input id='oil-odo' value='1000' />
<input id='oil-date' value='2026-06-07' />
<input id='oil-brand' value='Shell' />
<input id='oil-cost' value='200' />
<div id='oil-history-list'></div>
<div id='oil-history-empty'></div>
<div id='oil-since-km'></div>
<div id='oil-remaining-km'></div>
<div id='oil-progress-bar'></div>
<div id='toast'></div>
`;
const jsdom = new JSDOM(dom);
global.window = jsdom.window;
global.document = window.document;
global.localStorage = { getItem: () => null, setItem: () => {} };

code = code.replace(/document\.addEventListener\(\"DOMContentLoaded\"[\s\S]*?\}\);/, '');
code = code.replace(/window\.supabase/g, '{}');

eval(code);

(async () => {
  try {
    const originalShowToast = showToast;
    let toastMsg = '';
    showToast = (msg, isErr) => {
      toastMsg = msg;
      console.log('TOAST CALLED:', msg);
    };
    
    await saveOilLog();
    console.log('Toast result:', toastMsg);
  } catch(e) {
    console.error('Unhandled Error:', e);
  }
})();
