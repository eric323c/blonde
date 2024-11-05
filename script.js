const galleryGrid = document.querySelector(".gallery-grid");

// Set a variable to track the card width (includes the gap between cards)
const cardWidth = galleryGrid.children[0].offsetWidth + 20;

// Function to cycle cards infinitely by reordering them
function checkInfiniteScroll() {
    // If scrolling to the right
    if (galleryGrid.scrollLeft >= galleryGrid.scrollWidth - galleryGrid.clientWidth) {
        galleryGrid.scrollLeft -= cardWidth; // Adjust scroll position slightly

        // Move the first card to the end of the gallery
        galleryGrid.appendChild(galleryGrid.children[0]);
    }
    
    // If scrolling to the left
    else if (galleryGrid.scrollLeft <= 0) {
        galleryGrid.scrollLeft += cardWidth; // Adjust scroll position slightly

        // Move the last card to the beginning of the gallery
        galleryGrid.insertBefore(galleryGrid.children[galleryGrid.children.length - 1], galleryGrid.children[0]);
    }
}

// Attach the event listener to detect scroll position changes
galleryGrid.addEventListener("scroll", checkInfiniteScroll);

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