// ============================================
// HERO SLIDESHOW FUNCTIONALITY
// ============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let slideInterval;

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Function to go to previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Event listeners for navigation buttons
document.querySelector('.hero-nav.next').addEventListener('click', () => {
    nextSlide();
    stopSlideshow();
    startSlideshow(); // Restart timer after manual navigation
});

document.querySelector('.hero-nav.prev').addEventListener('click', () => {
    prevSlide();
    stopSlideshow();
    startSlideshow();
});

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopSlideshow();
        startSlideshow();
    });
});

// Pause slideshow on hover
document.querySelector('.hero').addEventListener('mouseenter', stopSlideshow);
document.querySelector('.hero').addEventListener('mouseleave', startSlideshow);

// Start the slideshow
startSlideshow();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    }
});

// ============================================
// RANDOMIZE PORTFOLIO GALLERY
// ============================================

function shuffleGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const items = Array.from(gallery.querySelectorAll('.gallery-item'));
    
    // Fisher-Yates shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    
    // Clear gallery and append shuffled items
    gallery.innerHTML = '';
    items.forEach((item, index) => {
        // Reset animation delay for shuffled order
        item.style.animationDelay = `${index * 0.1}s`;
        gallery.appendChild(item);
    });
}

// Optional: Add a shuffle button
function addShuffleButton() {
    const portfolio = document.querySelector('.portfolio');
    const title = portfolio.querySelector('.section-title');
    
    const shuffleBtn = document.createElement('button');
    shuffleBtn.className = 'shuffle-button';
    shuffleBtn.innerHTML = '🔀 Shuffle Gallery';
    shuffleBtn.onclick = () => {
        shuffleGallery();
        // Add visual feedback
        shuffleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            shuffleBtn.style.transform = 'rotate(0deg)';
        }, 600);
    };
    
    title.parentNode.insertBefore(shuffleBtn, title.nextSibling);
}

// Shuffle gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    shuffleGallery();
    
    // Uncomment the line below if you want a shuffle button
    // addShuffleButton();
});

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

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

// ============================================
// ACTIVE STATE FOR NAVIGATION LINKS
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// EMAIL LINK HANDLING
// ============================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Email link clicked: ' + this.href);
    });
});

// ============================================
// SCROLL ANIMATIONS FOR ELEMENTS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items for scroll animations
document.querySelectorAll('.gallery-item, .rate-card').forEach(item => {
    observer.observe(item);
});

// ============================================
// MOBILE MENU TOGGLE (Optional)
// ============================================

function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

setupMobileMenu();

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent flash of unstyled content
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible';
});

// ============================================
// CONSOLE LOG (Optional - for debugging)
// ============================================

console.log('MAGE ARK Studio - Website Loaded Successfully! 📸');
console.log('Hero Slideshow: Active ✓');
console.log('Portfolio Gallery: Randomized ✓');