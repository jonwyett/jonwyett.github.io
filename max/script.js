document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    let currentSlide = 0;
    let isPinching = false;
    let touchStartX = 0;
    let touchStartY = 0;

    // Show first slide
    slides[0].classList.add('active');

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add click event listeners for navigation
    navLeft.addEventListener('click', prevSlide);
    navRight.addEventListener('click', nextSlide);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Add touch events for mobile
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            isPinching = true;
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (isPinching || e.touches.length > 1) {
            isPinching = true;
            return; // Allow pinch-to-zoom to work
        }

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Only trigger navigation if the horizontal movement is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            e.preventDefault(); // Prevent scrolling
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    document.addEventListener('touchend', () => {
        isPinching = false;
    });
}); 