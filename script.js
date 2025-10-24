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

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start counter animation after a delay
    setTimeout(animateCounters, 1000);
    
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('mainNav');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'var(--dark-green)';
        } else {
            navbar.style.backgroundColor = '';
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Simple validation
            let isValid = true;
            contactForm.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
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
        // Add dark mode styles dynamically
        document.documentElement.style.setProperty('--light-green', '#1a1a1a');
        document.documentElement.style.setProperty('--primary-green', '#4caf50');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        // Reset to light mode
        document.documentElement.style.setProperty('--light-green', '#e8f5e8');
        document.documentElement.style.setProperty('--primary-green', '#2e7d32');
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'btn btn-primary scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Initialize scroll to top button
createScrollToTopButton();
