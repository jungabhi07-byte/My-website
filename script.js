/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Simple Text Rotator - No Bouncing
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = [
            "Data Science Student",
            "Machine Learning Enthusiast", 
            "Data Analyst",
            "Python Developer",
            "AI Researcher"
        ];

        let currentIndex = 0;

        function rotateText() {
            typewriterElement.style.opacity = '0';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                typewriterElement.textContent = texts[currentIndex];
                typewriterElement.style.opacity = '1';
                typewriterElement.style.transition = 'opacity 0.5s ease';
            }, 500);
            
            // Change text every 3 seconds
            setTimeout(rotateText, 3000);
        }

        // Start the rotation
        setTimeout(rotateText, 2000);
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

    // Contact form with Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('✅ Message sent successfully! I\'ll reply to you soon.', 'success');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showNotification('❌ Failed to send message. Please email me directly at jungabhi07@gmail.com', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                submitBtn.disabled = false;
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.custom-notification').forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `custom-notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
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
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Animate skill bars on scroll
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            bar.style.transition = 'width 1.5s ease-in-out';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Observe when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Social icon hover effects
    const socialIcons = document.querySelectorAll('.social-icon, .btn-social');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dark Mode functionality
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const darkModeBtn = document.querySelector('[onclick="toggleDarkMode()"]');
        const icon = darkModeBtn.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('darkMode', 'enabled');
            // Update navbar for dark mode
            const navbar = document.getElementById('mainNav');
            if (navbar) {
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
            }
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('darkMode', 'disabled');
            // Update navbar for light mode
            const navbar = document.getElementById('mainNav');
            if (navbar) {
                navbar.classList.remove('navbar-dark');
                navbar.classList.add('navbar-light');
            }
        }
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const darkModeBtn = document.querySelector('[onclick="toggleDarkMode()"]');
        if (darkModeBtn) {
            darkModeBtn.querySelector('i').className = 'fas fa-sun';
            // Update navbar for dark mode
            const navbar = document.getElementById('mainNav');
            if (navbar) {
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
            }
        }
    }

    // Add dark mode styles dynamically
    const darkModeStyles = `
        .dark-mode {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        
        .dark-mode .bg-light {
            background-color: #2d2d2d !important;
            color: #ffffff;
        }
        
        .dark-mode .bg-white {
            background-color: #2d2d2d !important;
            color: #ffffff;
        }
        
        .dark-mode .project-card {
            background-color: #2d2d2d;
            color: #ffffff;
            border: 1px solid #404040;
        }
        
        .dark-mode .card {
            background-color: #2d2d2d;
            color: #ffffff;
            border: 1px solid #404040;
        }
        
        .dark-mode .form-control {
            background-color: #2d2d2d;
            color: #ffffff;
            border-color: #404040;
        }
        
        .dark-mode .form-control:focus {
            background-color: #2d2d2d;
            color: #ffffff;
            border-color: #1cbbb4;
        }
        
        .dark-mode .text-muted {
            color: #adb5bd !important;
        }
        
        .dark-mode .text-dark {
            color: #ffffff !important;
        }
        
        .dark-mode .skill-bar {
            background: #404040;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = darkModeStyles;
    document.head.appendChild(styleSheet);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Add CSS for animations
    const animationStyles = `
        .loaded * {
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Pulse animation for CTA buttons */
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(28, 187, 180, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(28, 187, 180, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(28, 187, 180, 0);
            }
        }
        
        .btn-primary {
            animation: pulse 2s infinite;
        }
        
        /* Floating animation for profile photo */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .masthead-avatar {
            animation: float 6s ease-in-out infinite;
        }
    `;

    const animationStyleSheet = document.createElement('style');
    animationStyleSheet.textContent = animationStyles;
    document.head.appendChild(animationStyleSheet);

});
