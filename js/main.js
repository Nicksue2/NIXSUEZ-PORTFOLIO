document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ============================================================
    // 1. THEME TOGGLE
    // ============================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon      = document.getElementById('theme-icon');

    const sunIcon  = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>`;
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

    const isLightMode = localStorage.getItem('theme') === 'light';
    const profilePic = document.getElementById('hero-profile-pic');

    if (isLightMode) {
        document.documentElement.classList.add('light-theme');
        themeIcon.innerHTML = moonIcon;
        if (profilePic) profilePic.src = 'assets/NA.png';
    } else {
        if (profilePic) profilePic.src = 'assets/NADARK.png';
    }

    themeToggleBtn.addEventListener('click', () => {
        themeToggleBtn.classList.add('switching');
        setTimeout(() => {
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.documentElement.classList.contains('light-theme');
            
            // Swap icons
            themeIcon.innerHTML = isLight ? moonIcon : sunIcon;
            
            // Swap profile picture
            if (profilePic) {
                profilePic.src = isLight ? 'assets/NA.png' : 'assets/NADARK.png';
            }
            
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggleBtn.classList.remove('switching');
        }, 250);
    });

    // ============================================================
    // 2. CUSTOM CURSOR
    // ============================================================
    const cursorDot  = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX  = mouseX;
        let ringY  = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.to(cursorDot, {
                x: mouseX, y: mouseY,
                duration: 0.08,
                ease: 'none'
            });
        });

        (function animateRing() {
            ringX += (mouseX - ringX) * 0.10;
            ringY += (mouseY - ringY) * 0.10;
            gsap.set(cursorRing, { x: ringX, y: ringY });
            requestAnimationFrame(animateRing);
        })();

        // Hover state for interactive elements
        const hoverTargets = document.querySelectorAll(
            'a, button, .bento-card, .glass-icon, .process-step, .stat-item'
        );
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });

        // Click feedback
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('clicking');
            cursorRing.classList.add('clicking');
        });
        document.addEventListener('mouseup', () => {
            cursorDot.classList.remove('clicking');
            cursorRing.classList.remove('clicking');
        });

        // Hide cursor when it leaves the window
        document.addEventListener('mouseleave', () => {
            gsap.to([cursorDot, cursorRing], { opacity: 0, duration: 0.3 });
        });
        document.addEventListener('mouseenter', () => {
            gsap.to([cursorDot, cursorRing], { opacity: 1, duration: 0.3 });
        });
    }

    // ============================================================
    // 3. FLOATING NAV — Appears after scrolling past hero
    // ============================================================
    const floatingNav = document.getElementById('floating-nav');
    if (floatingNav) {
        const heroHeight = window.innerHeight * 0.75;
        ScrollTrigger.create({
            start: `${heroHeight}px top`,
            onEnter:      () => floatingNav.classList.add('visible'),
            onLeaveBack:  () => floatingNav.classList.remove('visible'),
        });

        // --- Nav Scroll Spy ---
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = ['experience', 'process', 'projects', 'contact'];

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 40%",
                    end: "bottom 40%",
                    onToggle: self => {
                        if (self.isActive) {
                            navLinks.forEach(link => {
                                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                            });
                        }
                    }
                });
            }
        });

        // --- Nix Suite Hub Toggle ---
        const suiteToggleBtn = document.getElementById('suite-toggle-btn');
        const suiteHubWrapper = document.querySelector('.suite-hub-wrapper');
        
        if (suiteToggleBtn && suiteHubWrapper) {
            suiteToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                suiteHubWrapper.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!suiteHubWrapper.contains(e.target)) {
                    suiteHubWrapper.classList.remove('active');
                }
            });
        }
    }

    // ============================================================
    // 4. HERO PAGE LOAD ORCHESTRATION
    // ============================================================
    // Set initial invisible states
    gsap.set('.profile-avatar', { scale: 0.6, opacity: 0 });
    gsap.set('.profile-name',   { y: 30, opacity: 0 });
    gsap.set('.availability-badge', { y: 20, opacity: 0 });
    gsap.set('.typewriter-text', { y: 15, opacity: 0 });
    gsap.set('.hero-description', { y: 20, opacity: 0 });
    gsap.set('.hero-cta', { y: 20, opacity: 0 });
    gsap.set('.social-links', { y: 20, opacity: 0 });
    gsap.set('.hero-scroll-indicator', { opacity: 0 });

    const heroTl = gsap.timeline({ delay: 0.3, defaults: { ease: 'expo.out' } });
    heroTl
        .to('.profile-avatar',      { scale: 1, opacity: 1, duration: 0.9 })
        .to('.profile-name',        { y: 0, opacity: 1, duration: 0.9 }, '-=0.55')
        .to('.availability-badge',  { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .to('.typewriter-text',     { y: 0, opacity: 1, duration: 0.7 }, '-=0.45')
        .to('.hero-description',    { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .to('.hero-cta',            { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .to('.social-links',        { y: 0, opacity: 1, duration: 0.7 }, '-=0.35')
        .to('.hero-scroll-indicator',{ opacity: 1, duration: 0.6 }, '-=0.2');

    // ============================================================
    // 5. HERO TYPEWRITER EFFECT
    // ============================================================
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const phrases = [
            'Hello World...',
            '<Hello, I\'m Nickolai!>',
            'Information Technology.',
            'UI/UX Designer.',
            'Aesthetic logic. Automated systems'
        ];
        let phraseIdx   = 0;
        let charIdx     = 0;
        let isDeleting  = false;

        function type() {
            const phrase = phrases[phraseIdx];

            if (isDeleting) {
                typewriterEl.textContent = phrase.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typewriterEl.textContent = phrase.substring(0, charIdx + 1);
                charIdx++;
            }

            let delay = isDeleting ? 45 : 90;

            if (!isDeleting && charIdx === phrase.length) {
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(type, delay);
        }

        // Start after hero animation completes
        setTimeout(type, 1200);
    }

    // ============================================================
    // 6. SPLINE PARALLAX
    // ============================================================
    gsap.to('#spline-wrapper', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
        }
    });

    // ============================================================
    // 7. SCROLL-TRIGGERED WORD REVEAL ("STIR UP YOUR...")
    // ============================================================
    gsap.set('.word', { opacity: 0.08 });

    gsap.to('.word', {
        opacity: 1,
        stagger: 0.18,
        scrollTrigger: {
            trigger: '#scroll-typewriter-section',
            start: 'center center',
            end: '+=900',
            pin: true,
            scrub: 1.2
        }
    });

    // ============================================================
    // 8. STRICT INTERSECTION OBSERVER REVEAL
    // ============================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); // Restores initial hidden state when scrolled past
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ============================================================
    // 9. STATS COUNTER ANIMATION
    // ============================================================
    function animateCounter(el, target, duration = 1800) {
        const start = performance.now();

        function update(timestamp) {
            const elapsed  = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        let countersStarted = false;
        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 75%',
            onEnter: () => {
                if (countersStarted) return;
                countersStarted = true;
                document.querySelectorAll('.stat-number').forEach((el) => {
                    const target = parseInt(el.dataset.target, 10);
                    if (!isNaN(target)) animateCounter(el, target);
                });
            }
        });
    }

    // ============================================================
    // 10. TEXT SCRAMBLE ON BENTO CARD HOVER
    // ============================================================
    const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#@';

    function scramble(el) {
        const finalText = el.dataset.original || el.textContent;
        el.dataset.original = finalText; // cache it
        let iterations = 0;

        const interval = setInterval(() => {
            el.textContent = finalText
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < iterations) return finalText[i];
                    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                })
                .join('');

            if (iterations >= finalText.length) clearInterval(interval);
            iterations += 0.6;
        }, 28);
    }

    document.querySelectorAll('.scramble-target').forEach((el) => {
        el.dataset.original = el.textContent;
        el.closest('.bento-card').addEventListener('mouseenter', () => scramble(el));
    });

    // ============================================================
    // 11. MAGNETIC BUTTONS
    // ============================================================
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.primary-btn, .ghost-btn').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top  - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.25,
                    y: y * 0.25,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0, y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }

    // Note: Scroll animations are now handled by the .reveal class and IntersectionObserver in section 8.

    // ============================================================
    // 15. CONTACT FORM SUBMISSION (EmailJS)
    // ============================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Disable button and show loading state
            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // These IDs are securely linked to your EmailJS account
            const serviceID = 'service_684u0vf'; 
            const templateID = 'template_5h6jt4o';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitBtn.innerHTML = 'Message Sent ✓';
                    submitBtn.style.background = 'rgba(0, 255, 102, 0.2)';
                    submitBtn.style.color = '#00ff66';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Send Message ↗';
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                    }, 4000);
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    formStatus.textContent = 'Failed to send. Please try again or email directly.';
                    formStatus.style.color = '#ff3366';
                    
                    submitBtn.innerHTML = 'Send Message ↗';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                });
        });
    }
});