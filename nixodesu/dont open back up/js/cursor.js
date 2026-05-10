// --- CUSTOM CURSOR ---
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on devices that support hover (non-touch)
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    if (!cursorDot || !cursorRing) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Dot position (follows exactly)
    let dotX = mouseX;
    let dotY = mouseY;
    
    // Ring position (trails behind)
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderCursor() {
        // Dot interpolation (fast)
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        
        // Ring interpolation (smooth, trailing)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorDot.style.transform = `translate(-50%, -50%) translate3d(${dotX}px, ${dotY}px, 0)`;
        cursorRing.style.transform = `translate(-50%, -50%) translate3d(${ringX}px, ${ringY}px, 0)`;

        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover state observer (handles dynamically added elements too)
    function attachHoverEvents() {
        const hoverTargets = document.querySelectorAll('button, a, .card-label, .group-header, input[type="text"], input[type="email"], input[type="password"]');
        hoverTargets.forEach(el => {
            if (el.dataset.cursorAttached) return;
            el.dataset.cursorAttached = 'true';
            
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });
    }

    // Initial attach
    attachHoverEvents();

    // Re-attach when DOM changes (e.g., when switching views in app.js)
    const observer = new MutationObserver(() => attachHoverEvents());
    observer.observe(document.body, { childList: true, subtree: true });

    // Click feedback
    document.addEventListener('mousedown', () => {
        cursorDot.classList.add('clicking');
        cursorRing.classList.add('clicking');
    });
    document.addEventListener('mouseup', () => {
        cursorDot.classList.remove('clicking');
        cursorRing.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

    // ==========================================
    // MAGNETIC BUTTON EFFECT
    // ==========================================
    function attachMagneticEvents() {
        // Target primary buttons and auth buttons
        const magneticBtns = document.querySelectorAll('.primary-btn, .auth-submit-btn, .ghost-btn, #auth-open-btn, #auth-logout-btn');
        
        magneticBtns.forEach(btn => {
            if (btn.dataset.magneticAttached) return;
            btn.dataset.magneticAttached = 'true';

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Remove transition while moving so it perfectly tracks cursor without lag
                btn.style.transition = 'none';
                // Pull effect: moves 30% of the distance to the edge
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                // Smoothly snap back into place
                btn.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                btn.style.transform = 'translate(0px, 0px)';
                
                // Clean up transition property after animation completes
                setTimeout(() => {
                    if (btn.style.transform === 'translate(0px, 0px)') {
                        btn.style.transition = '';
                    }
                }, 400);
            });
        });
    }

    // Initial attach for magnetic buttons
    attachMagneticEvents();
    
    // Add magnetic attach to mutation observer so it grabs dynamic buttons too
    const magneticObserver = new MutationObserver(() => attachMagneticEvents());
    magneticObserver.observe(document.body, { childList: true, subtree: true });
});
