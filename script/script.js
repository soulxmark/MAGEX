  // Wait for the DOM to load before executing
  document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");

    // Show the current slide
    function showSlides() {
        // Hide all slides initially
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Move to the next slide
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }

        // Display the current slide with a fade effect
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].style.opacity = 0; // Start opacity at 0
        setTimeout(function() {
            slides[slideIndex - 1].style.transition = "opacity 1s"; // Fade in effect
            slides[slideIndex - 1].style.opacity = 1; // Fade to opacity 1
        }, 10); // Delay to ensure opacity change works

        // Automatically switch slides every 3 seconds
        setTimeout(showSlides, 10000);
    }

    // Function to navigate between slides manually
    function plusSlides(n) {
        slideIndex += n;
        if (slideIndex > slides.length) { slideIndex = 1; }
        if (slideIndex < 1) { slideIndex = slides.length; }
        showSlides();
    }

    // Start the slideshow
    showSlides();

    // Make sure the navigation buttons call the plusSlides function
    window.plusSlides = plusSlides;
});