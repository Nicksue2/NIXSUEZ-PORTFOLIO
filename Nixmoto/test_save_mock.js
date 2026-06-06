const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Mock DOM
global.document = {
  addEventListener: () => {},
  getElementById: (id) => {
    if (id === 'oil-odo') return { value: '1000' };
    if (id === 'oil-date') return { value: '2026-06-07' };
    if (id === 'oil-brand') return { value: 'Shell' };
    if (id === 'oil-cost') return { value: '200' };
    if (id === 'oil-save-btn') return { disabled: false, textContent: 'Save Oil Change' };
    if (id === 'oil-history-list') return { innerHTML: '' };
    if (id === 'oil-history-empty') return { style: {} };
    if (id === 'oil-since-km') return { textContent: '' };
    if (id === 'oil-remaining-km') return { textContent: '', style: {} };
    if (id === 'oil-progress-bar') return { style: {} };
    if (id === 'toast') return { classList: { add: ()=>{}, remove: ()=>{} }, style: {} };
    return null; // Return null for elements not explicitly mocked to see if one crashes
  }
};
global.window = { supabase: { createClient: () => null } };
global.localStorage = { getItem: () => null, setItem: () => {} };
global.clearTimeout = () => {};
global.setTimeout = () => {};

// Remove DOMContentLoaded listener to prevent auto-run
code = code.replace(/document\.addEventListener\("DOMContentLoaded"[\s\S]*\}\);/, '');

// Evaluate app.js
eval(code);

(async () => {
  try {
    const origShowToast = showToast;
    let toastMessage = '';
    showToast = (msg, isErr) => {
      toastMessage = msg;
    };

    await saveOilLog();
    console.log('Resulting Toast:', toastMessage);
  } catch (e) {
    console.error('Unhandled Error:', e);
  }
})();
