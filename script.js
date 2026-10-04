// ===== Portfolio script: Abhishek Budhathoki =====

// ---------- Counter animation (stats + about) ----------
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1500; // ms
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.innerText = Math.round(target * progress);
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.innerText = target;
        }
    }
    requestAnimationFrame(tick);
}

function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    // Fallback for very old browsers: just show final values
    if (!('IntersectionObserver' in window)) {
        counters.forEach(c => (c.innerText = c.getAttribute('data-count')));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target); // animate each counter only once
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
}

// ---------- Skill bars (kept for compatibility; safe if none exist) ----------
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-width') + '%';
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ---------- Dark mode (called from the navbar button's onclick) ----------
function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    const icon = document.querySelector('#mainNav .fa-moon, #mainNav .fa-sun');
    if (icon) {
        icon.classList.toggle('fa-moon', !isDark);
        icon.classList.toggle('fa-sun', isDark);
    }
}

function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) { /* storage unavailable, ignore */ }
}

// ---------- Navbar shrink + scroll-to-top ----------
function handleScroll() {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('navbar-shrink', window.scrollY > 80);

    const topBtn = document.querySelector('.scroll-to-top');
    if (topBtn) {
        const show = window.scrollY > 300;
        topBtn.classList.toggle('show', show);
        topBtn.style.display = show ? 'block' : 'none';
    }
}

// ---------- Smooth scrolling + close mobile menu on link click ----------
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = (document.getElementById('mainNav') || { offsetHeight: 0 }).offsetHeight;
            window.scrollTo({ top: target.offsetTop - offset + 1, behavior: 'smooth' });

            const menu = document.getElementById('navbarResponsive');
            if (menu && menu.classList.contains('show') && window.bootstrap) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    const topBtn = document.querySelector('.scroll-to-top');
    if (topBtn) {
        topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Highlight active nav link while scrolling
    const sections = ['about', 'experience', 'skills', 'projects', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('#mainNav .nav-link').forEach(a => {
                        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(s => spy.observe(s));
    }
}

// ---------- Contact form (Formspree, with friendly feedback) ----------
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form || !window.fetch) return; // falls back to normal form submit

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const original = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

        let note = form.querySelector('.form-status');
        if (!note) {
            note = document.createElement('p');
            note.className = 'form-status mt-3 mb-0';
            form.appendChild(note);
        }

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            if (res.ok) {
                form.reset();
                note.textContent = 'Thank you! Your message has been sent.';
                note.style.color = '#198754';
            } else {
                throw new Error('Request failed');
            }
        } catch (err) {
            note.textContent = 'Sorry, something went wrong. Please email me at jungabhi07@gmail.com.';
            note.style.color = '#dc3545';
        } finally {
            button.disabled = false;
            button.innerHTML = original;
        }
    });
}

// ---------- Initialize ----------
document.addEventListener('DOMContentLoaded', function () {
    // Restore saved theme
    try {
        applyTheme(localStorage.getItem('theme') === 'dark');
    } catch (e) { /* ignore */ }

    setupCounters();
    setupSkillBars();
    setupNavigation();
    setupContactForm();

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});
