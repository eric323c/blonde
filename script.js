document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Clone cards for smoother looping
    galleryCards.forEach(card => {
        const clone = card.cloneNode(true);
        galleryGrid.appendChild(clone);
    });

    // Set initial scroll position
    galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;

    // Function to move cards to the end to create the infinite illusion
    function infiniteLoop() {
        const firstCard = galleryGrid.firstElementChild;
        const lastCard = galleryGrid.lastElementChild;
        
        if (galleryGrid.scrollLeft <= 0) {
            galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;
        } else if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth) {
            galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2 - galleryGrid.clientWidth;
        }

        if (galleryGrid.scrollLeft < cardWidth) {
            galleryGrid.appendChild(firstCard); // Move the first card to the end
            galleryGrid.scrollLeft += cardWidth;
        } else if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth - cardWidth) {
            galleryGrid.prepend(lastCard); // Move the last card to the beginning
            galleryGrid.scrollLeft -= cardWidth;
        }
    }

    // Attach scroll listener for continuous loop effect
    galleryGrid.addEventListener('scroll', infiniteLoop);

    // Arrow navigation for smooth scrolling
    document.querySelector('.right-arrow').addEventListener('click', () => {
        galleryGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    document.querySelector('.left-arrow').addEventListener('click', () => {
        galleryGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Dragging functionality
    galleryGrid.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - galleryGrid.offsetLeft;
        scrollLeft = galleryGrid.scrollLeft;
    });

    galleryGrid.addEventListener('mouseleave', () => isDragging = false);
    galleryGrid.addEventListener('mouseup', () => isDragging = false);

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

    galleryGrid.addEventListener('touchend', () => isDragging = false);

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

    // Add "Before" and "After" labels
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