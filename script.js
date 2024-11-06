document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    // Function to move the scroll position
    function smoothScroll(offset) {
        galleryGrid.scrollBy({
            left: offset,
            behavior: 'smooth'
        });
    }

    // Function to update gallery positioning to create a seamless loop
    function updateLoopScroll() {
        const scrollPosition = galleryGrid.scrollLeft;
        const maxScrollLeft = galleryGrid.scrollWidth - galleryGrid.clientWidth;

        if (scrollPosition <= 0) {
            galleryGrid.scrollLeft = maxScrollLeft - cardWidth;
        } else if (scrollPosition >= maxScrollLeft) {
            galleryGrid.scrollLeft = cardWidth;
        }
    }

    // Set up automatic scrolling when reaching either end
    galleryGrid.addEventListener('scroll', updateLoopScroll);

    // Arrow navigation
    document.querySelector('.right-arrow').addEventListener('click', () => smoothScroll(cardWidth));
    document.querySelector('.left-arrow').addEventListener('click', () => smoothScroll(-cardWidth));

    // Dragging for smooth swipe on desktop
    galleryGrid.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - galleryGrid.offsetLeft;
        scrollLeft = galleryGrid.scrollLeft;
    });

    galleryGrid.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    galleryGrid.addEventListener('mouseup', () => {
        isDragging = false;
    });

    galleryGrid.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - galleryGrid.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed
        galleryGrid.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    galleryGrid.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - galleryGrid.offsetLeft;
        scrollLeft = galleryGrid.scrollLeft;
    });

    galleryGrid.addEventListener('touchend', () => {
        isDragging = false;
    });

    galleryGrid.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - galleryGrid.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed
        galleryGrid.scrollLeft = scrollLeft - walk;
    });

    // Bounce Effect on Hover for gallery cards
    const allCards = galleryGrid.querySelectorAll('.gallery-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Booking Modal Open/Close
    document.getElementById("openModalButton").addEventListener("click", function() {
        const bookingUrl = "https://beyondtheblondee.glossgenius.com";
        window.open(bookingUrl, '_blank');
    });

    document.getElementById("closeModalButton").addEventListener("click", function() {
        document.getElementById("bookingModal").style.display = "none";
    });

    // Close modal when clicking outside the content
    window.addEventListener("click", function(event) {
        const modal = document.getElementById("bookingModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Header Title Animation on Click
    document.getElementById("header-title").addEventListener("click", function() {
        const letters = this.querySelectorAll("span");
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add("flash");
                setTimeout(() => letter.classList.remove("flash"), 500);
            }, index * 100);
        });
    });

    // Smooth Scroll for Mid Links
    document.querySelectorAll('.mid-links .link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});