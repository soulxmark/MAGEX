// Wait for the DOM to load before executing
document.addEventListener("DOMContentLoaded", function() {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('primary-navigation');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            navLinks.classList.toggle('active');
        });
    }

    // Slideshow
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");

    function showSlides() {
        // Hide all slides initially
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].style.opacity = 0;
        }

        // Move to the next slide
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }

        // Display the current slide with a fade effect
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            setTimeout(function() {
                slides[slideIndex - 1].style.transition = "opacity 1s"; // Fade in effect
                slides[slideIndex - 1].style.opacity = 1; // Fade to opacity 1
            }, 10);
        }

        // Automatically switch slides every 10 seconds
        setTimeout(showSlides, 10000);
    }

    function plusSlides(n) {
        slideIndex += n;
        if (slideIndex > slides.length) { slideIndex = 1; }
        if (slideIndex < 1) { slideIndex = slides.length; }
        showSlides();
    }

    // Start the slideshow
    showSlides();

    // Expose plusSlides to global scope for inline onclick handlers
    window.plusSlides = plusSlides;
});