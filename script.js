document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Set initial scroll position to the starting center for a continuous scroll illusion
    galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;

    // Infinite loop function to reposition cards
    function seamlessLoop() {
        const maxScrollLeft = galleryGrid.scrollWidth - galleryGrid.clientWidth;

        if (galleryGrid.scrollLeft <= 0) {
            galleryGrid.scrollLeft = maxScrollLeft - galleryGrid.clientWidth;
        } else if (galleryGrid.scrollLeft >= maxScrollLeft) {
            galleryGrid.scrollLeft = galleryGrid.clientWidth;
        }
    }

    // Add scroll listener for infinite effect
    galleryGrid.addEventListener('scroll', seamlessLoop);

    // Arrow navigation for scrolling
    document.querySelector('.right-arrow').addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    });

    document.querySelector('.left-arrow').addEventListener('click', () => {
        galleryGrid.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });

    // Dragging functionality for desktop
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
        const walk = (x - startX) * 1.5;
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
        const walk = (x - startX) * 1.5;
        galleryGrid.scrollLeft = scrollLeft - walk;
    });

    // Toggle flip on click
    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.gallery-card-inner');
            inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });

    // Adding "Before" and "After" labels
    galleryCards.forEach(card => {
        const frontLabel = document.createElement('div');
        frontLabel.className = 'label';
        frontLabel.textContent = 'After';
        card.querySelector('.gallery-card-front').appendChild(frontLabel);

        const backLabel = document.createElement('div');
        backLabel.className = 'label';
        backLabel.textContent = 'Before';
        card.querySelector('.gallery-card-back').appendChild(backLabel);
    });

    // Booking Modal Open/Close
    document.getElementById("openModalButton").addEventListener("click", function() {
        const bookingUrl = "https://beyondtheblondee.glossgenius.com";
        window.open(bookingUrl, '_blank');
    });

    document.getElementById("closeModalButton").addEventListener("click", function() {
        document.getElementById("bookingModal").style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        const modal = document.getElementById("bookingModal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Header Title Animation
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