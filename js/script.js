// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('mobile-open');
}

// Contact Form Validation
if (document.getElementById('contactForm')) {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Add validation feedback
    form.addEventListener('submit', function(e) {
        let isValid = true;

        // Validate name
        if (nameInput.value.trim().length < 2) {
            nameInput.setCustomValidity('Please enter a valid name (at least 2 characters)');
            isValid = false;
        } else {
            nameInput.setCustomValidity('');
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address');
            isValid = false;
        } else {
            emailInput.setCustomValidity('');
        }

        // Validate phone (if provided)
        if (phoneInput.value && !/^[\(\)\d\s\-\+\.]+$/.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Please enter a valid phone number');
            isValid = false;
        } else {
            phoneInput.setCustomValidity('');
        }

        if (!isValid) {
            e.preventDefault();
        }
        // If valid, Netlify will handle the form submission
    });

    // Clear custom validation on input
    [nameInput, emailInput, phoneInput].forEach(input => {
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current page nav link
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const hash = window.location.hash;
    const isIndexPage = currentPage === 'index.html' || currentPage === '';

    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        // Check if it's a hash link on current page
        if (href.startsWith('#') && href === hash && isIndexPage) {
            link.classList.add('active');
        }
        // Check if it's index.html#services and we're on index with that hash
        else if (href === 'index.html#services' && isIndexPage && hash === '#services') {
            link.classList.add('active');
        }
        // Check if it's the current page link (Home)
        else if (href === 'index.html' && isIndexPage && !hash) {
            link.classList.add('active');
        }
        // Check if it's the current page without hash for other pages
        else if (href === currentPage && !isIndexPage && !hash) {
            link.classList.add('active');
        }
    });
}

// Update on page load
updateActiveNav();

// Update active state when hash changes
window.addEventListener('hashchange', updateActiveNav);

// Testimonial Carousel
if (document.querySelector('.testimonial-carousel')) {
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoPlayInterval;

    function updateCarousel(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % dots.length;
        updateCarousel(currentIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            updateCarousel(index);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    });

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
}
