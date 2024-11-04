const sliders = document.querySelectorAll('.gallery-item .after-overlay');

sliders.forEach(slider => {
    const handle = slider.querySelector('.slider-handle');
    let isDragging = false;

    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.cursor = 'ew-resize';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const rect = slider.parentElement.getBoundingClientRect();
        let offset = e.clientX - rect.left;
        
        // Limit the dragging to within the bounds of the image
        if (offset < 0) offset = 0;
        if (offset > rect.width) offset = rect.width;
        
        // Set the slider overlay width and handle position
        slider.style.width = `${offset}px`;
        handle.style.left = `${offset - 15}px`;
    });
});
const galleryGrid = document.querySelector(".gallery-grid");

function scrollLeft() {
    if (galleryGrid.scrollLeft === 0) {
        galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2;
    }
    galleryGrid.scrollBy({
        left: -200,
        behavior: "smooth"
    });
}

function scrollRight() {
    if (galleryGrid.scrollLeft + galleryGrid.clientWidth >= galleryGrid.scrollWidth) {
        galleryGrid.scrollLeft = galleryGrid.scrollWidth / 2 - galleryGrid.clientWidth;
    }
    galleryGrid.scrollBy({
        left: 200,
        behavior: "smooth"
    });
}
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
document.getElementById("header-title").addEventListener("click", function() {
  this.classList.add("bounce");
  setTimeout(() => {
    this.classList.remove("bounce");
  }, 500);
});