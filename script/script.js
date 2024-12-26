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

window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView); // For when the page loads
