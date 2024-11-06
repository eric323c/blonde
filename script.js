document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    // Duplicate cards for infinite effect
    galleryCards.forEach(card => {
        const cloneStart = card.cloneNode(true);
        const cloneEnd = card.cloneNode(true);
        galleryGrid.appendChild(cloneEnd); // Append clone to the end
        galleryGrid.insertBefore(cloneStart, galleryGrid.firstChild); // Prepend clone to the start
    });

    // Set initial scroll position to the middle
    galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;

    // Update scroll to create seamless loop
    function updateLoopScroll() {
        const maxScrollLeft = galleryGrid.scrollWidth - galleryGrid.clientWidth;
        if (galleryGrid.scrollLeft <= 0) {
            galleryGrid.scrollLeft = maxScrollLeft / 2 - cardWidth;
        } else if (galleryGrid.scrollLeft >= maxScrollLeft) {
            galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;
        }
    }

    // Event listener to continuously check and adjust for infinite scroll
    galleryGrid.addEventListener('scroll', updateLoopScroll);

    // Arrow navigation
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

    // Toggle card flip on click
    allCards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.gallery-card-inner');
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
            } else {
                inner.style.transform = 'rotateY(180deg)';
            }
        });
    });

    // Adding "Before" and "After" labels to front and back images
    allCards.forEach(card => {
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