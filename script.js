// Select the gallery grid and arrows
const galleryGrid = document.querySelector(".gallery-grid");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// Duplicate the gallery items for smooth looping
const cards = Array.from(galleryGrid.children);
cards.forEach(card => {
    const clone = card.cloneNode(true);
    galleryGrid.appendChild(clone);
});
cards.forEach(card => {
    const clone = card.cloneNode(true);
    galleryGrid.insertBefore(clone, galleryGrid.firstChild);
});

// Adjust initial scroll position to the middle of duplicated cards
const cardWidth = cards[0].offsetWidth + 20; // Assuming 20px gap
galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;

// Function to handle the infinite scroll effect
function handleScroll() {
    if (galleryGrid.scrollLeft <= 0) {
        // If scrolled to the very left, reset to the middle
        galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2 - cardWidth;
    } else if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth) {
        // If scrolled to the very right, reset to the middle
        galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2 + cardWidth;
    }
}

// Attach event listeners to the arrow buttons
rightArrow.addEventListener('click', () => {
    galleryGrid.scrollBy({
        left: cardWidth,
        behavior: "smooth"
    });
});

leftArrow.addEventListener('click', () => {
    galleryGrid.scrollBy({
        left: -cardWidth,
        behavior: "smooth"
    });
});

// Apply the same behavior for swipe on mobile
let startX;
galleryGrid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

galleryGrid.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX;
    const distance = moveX - startX;
    galleryGrid.scrollLeft -= distance;
    startX = moveX;
});

// Event listener to reset scroll position for infinite effect
galleryGrid.addEventListener('scroll', handleScroll);

// Bounce Effect on Hover
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
