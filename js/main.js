document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // SVGs for Sun and Moon
    const sunIcon = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>`;
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

    // Check for saved user preference, if any, on load of the website
    const isLightMode = localStorage.getItem('theme') === 'light';
    if (isLightMode) {
        document.body.classList.add('light-theme');
        themeIcon.innerHTML = moonIcon;
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        // Update icon based on theme
        if (document.body.classList.contains('light-theme')) {
            themeIcon.innerHTML = moonIcon;
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const text1 = "Hello World...";
        const text2 = "<Hello I'm Nickolai!>";
        let isDeleting = false;
        let charIndex = 0;
        let currentText = text1;
        let isText1 = true;

        function typeWriter() {
            if (!isDeleting && charIndex < currentText.length) {
                // Typing
                typewriterElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, 50);
            } else if (!isDeleting && charIndex === currentText.length) {
                // Finished typing
                if (isText1) {
                    isDeleting = true;
                    setTimeout(typeWriter, 1000); // Pause before deleting
                }
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting
                isDeleting = false;
                isText1 = false;
                currentText = text2;
                setTimeout(typeWriter, 500); // Pause before typing text2
            }
        }
        
        // Start typewriter
        setTimeout(typeWriter, 500);
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});
