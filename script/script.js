// Optional: Smooth scrolling for the page
document.querySelector('html').style.scrollBehavior = 'smooth';
// JavaScript to detect when an element is in view
const fadeElements = document.querySelectorAll('.fade-in');

function checkInView() {
  fadeElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      element.classList.add('visible');
    }
  });
}
const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const body = document.body;

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            body.classList.toggle('menu-active');  // Add or remove background dimming
        })
window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView); // For when the page loads
