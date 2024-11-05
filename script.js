document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Set up continuous scroll by repositioning cards
    function setupContinuousLoop() {
        galleryCards.forEach((card, index) => {
            card.style.left = `${index * cardWidth}px`;
        });
    }

    function handleContinuousScroll() {
        const scrollPos = galleryGrid.scrollLeft;
        const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;

        if (scrollPos >= maxScroll) {
            galleryGrid.scrollLeft = 0; // Reset to start for seamless loop
        } else if (scrollPos <= 0) {
            galleryGrid.scrollLeft = maxScroll - cardWidth; // Seamlessly move to end
        }
    }

    // Initialize continuous loop setup
    setupContinuousLoop();

    // Arrow navigation
    document.querySelector('.right-arrow').addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: cardWidth,
            behavior: "smooth"
        });
    });

    document.querySelector('.left-arrow').addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: -cardWidth,
            behavior: "smooth"
        });
    });

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

    // Event listener for infinite loop
    galleryGrid.addEventListener('scroll', handleContinuousScroll);

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

    // Booking Modal - Opens booking page in a new tab and shows modal
    document.getElementById("openModalButton").addEventListener("click", function() {
        const bookingUrl = "https://beyondtheblondee.glossgenius.com";
        window.open(bookingUrl, '_blank');

        const modal = document.getElementById("bookingModal");
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 3000);
    });

    // Close modal manually
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