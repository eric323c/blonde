document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    const totalCards = galleryCards.length;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Clone cards at the start and end to create a seamless circular effect
    galleryCards.forEach(card => {
        const cloneStart = card.cloneNode(true);
        const cloneEnd = card.cloneNode(true);
        galleryGrid.appendChild(cloneEnd); // Append clones to the end
        galleryGrid.insertBefore(cloneStart, galleryCards[0]); // Prepend clones to the start
    });

    // Adjust initial scroll position to the middle of the gallery
    galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;

    // Function to handle infinite scrolling without "jumping"
    function handleInfiniteScroll() {
        const maxScrollLeft = galleryGrid.scrollWidth - galleryGrid.clientWidth;

        if (galleryGrid.scrollLeft <= 0) {
            galleryGrid.scrollLeft = maxScrollLeft / 2;
        } else if (galleryGrid.scrollLeft >= maxScrollLeft) {
            galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;
        }
    }

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

    // Dragging for smooth swipe on desktop and touch devices
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
        const walk = (x - startX) * 2; // Speed up scroll
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
        const walk = (x - startX) * 2; // Speed up scroll
        galleryGrid.scrollLeft = scrollLeft - walk;
    });

    // Event listener to continuously check and adjust for infinite scroll
    galleryGrid.addEventListener('scroll', handleInfiniteScroll);

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
        document.getElementById("bookingModal").style.display = "flex";
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
            }, index * 100); // Staggered delay of 100ms per letter
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