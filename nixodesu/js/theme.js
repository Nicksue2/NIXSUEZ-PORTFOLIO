// Global Theme Logic — runs before DOMContentLoaded to prevent flash
(function() {
    let theme = localStorage.getItem('nixodesu_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    const SUN_SVG  = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';

    function updateIcons() {
        document.querySelectorAll('.theme-icon-svg').forEach(icon => {
            icon.innerHTML = theme === 'dark' ? MOON_SVG : SUN_SVG;
        });
    }

    function spinIcon(svg) {
        if (!svg) return;
        svg.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        svg.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            svg.style.transition = 'none';
            svg.style.transform = 'rotate(0deg) scale(1)';
        }, 520);
    }

    window.addEventListener('DOMContentLoaded', () => {
        updateIcons();

        document.querySelectorAll('.theme-toggle-btn, .landing-theme-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const icon = btn.querySelector('.theme-icon-svg');
                spinIcon(icon);
                theme = theme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('nixodesu_theme', theme);
                setTimeout(updateIcons, 50); // let spin start before icon swap
            });
        });
    });
})();
