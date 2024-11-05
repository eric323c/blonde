// Gallery Infinite Scrolling with Button Controls
const galleryGrid = document.querySelector(".gallery-grid");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// Clone gallery cards for infinite scroll effect
function cloneGalleryCards() {
    const cards = Array.from(galleryGrid.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        galleryGrid.appendChild(clone);
    });
}

// Call clone function to set up infinite scroll
cloneGalleryCards();

// Scroll to the right by 200px when right arrow is clicked
rightArrow.addEventListener('click', () => {
    galleryGrid.scrollBy({
        left: 200,
        behavior: "smooth"
    });
});

// Scroll to the left by 200px when left arrow is clicked
leftArrow.addEventListener('click', () => {
    galleryGrid.scrollBy({
        left: -200,
        behavior: "smooth"
    });
});

// Infinite scroll effect
galleryGrid.addEventListener('scroll', () => {
    if (galleryGrid.scrollLeft === 0) {
        galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;
    } else if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth) {
        galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2 - galleryGrid.clientWidth;
    }
});

// Enable swipe for mobile devices
let startX;
galleryGrid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

galleryGrid.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX;
    const distance = moveX - startX;
    galleryGrid.scrollBy({
        left: -distance,
        behavior: "auto"
    });
    startX = moveX;
});

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
