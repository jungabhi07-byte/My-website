// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeDarkMode();
    initializeTypewriter();
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeMobileMenu();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeDataVisualizations();
}

// Dark Mode Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme or prefered scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateDarkModeIcon(false);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateDarkModeIcon(true);
        }
    });
}

function updateDarkModeIcon(isDark) {
    const icon = document.querySelector('#darkModeToggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Typewriter Effect with Data Science focus
function initializeTypewriter() {
    const texts = [
        "Data Science Student",
        "Machine Learning Enthusiast",
        "Data Analyst",
        "Python Developer",
        "AI Researcher"
    ];
    const typewriterElement = document.querySelector('.typewriter-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a delay
    setTimeout(type, 1000);
}

// Data Visualization Placeholders
function initializeDataVisualizations() {
    // This is where you can add actual data visualizations later
    // For now, we'll just add some interactive elements
    
    // Add click handlers for project cards to show more details
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animation for skills
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animation = 'bounceIn 0.6s ease';
                }
            }
        });
    }, observerOptions);

    // Observe all sections and project cards
    document.querySelectorAll('section, .project-card, .skill-item, .stat').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Counter Animation for Stats
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-count');
                const count = +entry.target.innerText;
                const inc = target / speed;

                if (count < target) {
                    entry.target.innerText = Math.ceil(count + inc);
                    setTimeout(() => {
                        observer.observe(entry.target);
                    }, 1);
                } else {
                    entry.target.innerText = target;
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        const isVisible = navMenu.style.display === 'flex';
        navMenu.style.display = isVisible ? 'none' : 'flex';
        mobileMenuBtn.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!validateEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    if (type === 'success') {
        notification.style.background = 'var(--success-color)';
    } else if (type === 'error') {
        notification.style.background = 'var(--danger-color)';
    } else {
        notification.style.background = 'var(--info-color)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .project-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .project-card.expanded {
        transform: scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    
    .skill-item:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .skill-item:hover i {
        color: white;
    }
`;
document.head.appendChild(additionalStyles);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add a small delay to ensure all elements are loaded
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 500);
});
