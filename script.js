// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        
        if (count < target) {
            const increment = target / speed;
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start counter animation after a delay
    setTimeout(animateCounters, 500);
    
    // Set up intersection observer for skill bars
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Smooth scrolling for navigation links - FIXED VERSION
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default for internal links that actually exist
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('mainNav');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'var(--dark-green)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.boxShadow = 'none';
        }
    });

    // Formspree form handling with loading state
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Allow Formspree to handle the submission
            // Remove this timeout if you want Formspree to handle everything
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Scroll to top button functionality
    const scrollButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Debug: Check if buttons are clickable
    console.log('Social buttons initialized:', document.querySelectorAll('.btn-social').length);
    console.log('View Stats button:', document.querySelector('.view-stats-btn'));
});

// Dark mode toggle function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Update button icon
    const darkModeBtn = document.querySelector('[onclick="toggleDarkMode()"]');
    const icon = darkModeBtn.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // Add dark mode styles
        document.documentElement.style.setProperty('--light-green', '#1a1a1a');
        document.documentElement.style.setProperty('--text-dark', '#f8f9fa');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        // Reset to light mode
        document.documentElement.style.setProperty('--light-green', '#e8f5e8');
        document.documentElement.style.setProperty('--text-dark', '#333');
    }
}

// Force enable pointer events for all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('a, button, .btn, .btn-social, .view-stats-btn');
    interactiveElements.forEach(el => {
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
    });
});
