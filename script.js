// Select the gallery grid and calculate card width including margin
const galleryGrid = document.querySelector(".gallery-grid");
const cardWidth = galleryGrid.children[0].offsetWidth + 20; // Card width + gap

// Function to handle infinite scroll effect by looping back seamlessly
function checkScrollPosition() {
    const maxScrollLeft = galleryGrid.scrollWidth - galleryGrid.clientWidth;
    
    if (galleryGrid.scrollLeft >= maxScrollLeft) {
        // When reaching the end, reset to just after the start
        galleryGrid.scrollLeft = 1;
    } else if (galleryGrid.scrollLeft <= 0) {
        // When reaching the beginning, reset to just before the end
        galleryGrid.scrollLeft = maxScrollLeft - 1;
    }
}

// Attach event listener to detect scroll position changes
galleryGrid.addEventListener("scroll", checkScrollPosition);

// Right arrow scrolls one card width to the right
document.querySelector(".right-arrow").addEventListener("click", () => {
    galleryGrid.scrollBy({
        left: cardWidth,
        behavior: "smooth"
    });
});

// Left arrow scrolls one card width to the left
document.querySelector(".left-arrow").addEventListener("click", () => {
    galleryGrid.scrollBy({
        left: -cardWidth,
        behavior: "smooth"
    });
});

// Swipe support for mobile to scroll cards
let startX;
galleryGrid.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

galleryGrid.addEventListener("touchmove", (e) => {
    const moveX = e.touches[0].clientX;
    const distance = moveX - startX;
    galleryGrid.scrollLeft -= distance;
    startX = moveX;
});

// Bounce Effect on Hover for gallery cards
const galleryCards = document.querySelectorAll('.gallery-card');
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
