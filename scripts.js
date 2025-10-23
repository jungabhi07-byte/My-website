/*!
 * Custom JS for Navbar shrink and responsive menu toggle
 */

window.addEventListener('DOMContentLoaded', () => {

  // Function to shrink navbar on scroll
  const navbarShrink = () => {
    const navbar = document.body.querySelector('#mainNav');
    if (!navbar) return;

    if (window.scrollY === 0) {
      navbar.classList.remove('navbar-shrink');
    } else {
      navbar.classList.add('navbar-shrink');
    }
  };

  // Shrink navbar immediately if page is not at top
  navbarShrink();

  // Shrink navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on #mainNav for smooth highlighting
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 72,
    });
  }

  // Collapse responsive navbar when a nav link is clicked (for mobile)
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));

  responsiveNavItems.forEach((navLink) => {
    navLink.addEventListener('click', () => {
      // Only toggle collapse if toggler is visible (mobile)
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

});
