document.addEventListener('DOMContentLoaded', () => {
    // Select the gallery grid and get the width of each card
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryCards = Array.from(galleryGrid.children);
    const cardWidth = galleryCards[0].offsetWidth + 20; // Card width + margin
    const totalCards = galleryCards.length;
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Function to scroll to a specific card
    function scrollToCard(index) {
        const offset = index * cardWidth;
        galleryGrid.scrollTo({
            left: offset,
            behavior: 'smooth'
        });
    }

    // Function to handle left arrow click
    function scrollLeftArrow() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        scrollToCard(currentIndex);
    }

    // Function to handle right arrow click
    function scrollRightArrow() {
        currentIndex = (currentIndex + 1) % totalCards;
        scrollToCard(currentIndex);
    }

    // Event listeners for arrow buttons
    document.querySelector('.left-arrow').addEventListener('click', scrollLeftArrow);
    document.querySelector('.right-arrow').addEventListener('click', scrollRightArrow);

    // Touch and mouse events for swiping
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
        const walk = (x - startX) * 2; // Adjust scroll speed
        galleryGrid.scrollLeft = scrollLeft - walk;
    });

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
        const walk = (x - startX) * 2; // Adjust scroll speed
        galleryGrid.scrollLeft = scrollLeft - walk;
    });

    // Infinite scroll effect
    galleryGrid.addEventListener('scroll', () => {
        if (galleryGrid.scrollLeft <= 0) {
            galleryGrid.scrollLeft = galleryGrid.scrollWidth - galleryGrid.clientWidth - 1;
        } else if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth) {
            galleryGrid.scrollLeft = 1;
        }
    });

    // Bounce Effect on Hover for gallery cards
    galleryCards.forEach(card => {
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