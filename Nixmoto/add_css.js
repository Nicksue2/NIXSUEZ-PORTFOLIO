const fs = require('fs');

const loaderCss = `
/* 🟢 LOADER OVERLAY 🟢 */
#loader {
  position: fixed;
  inset: 0;
  z-index: 500;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: opacity 0.4s;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

fs.appendFileSync('style.css', loaderCss);
console.log('Appended loader CSS');
