// Lightbox script
const overlay = document.getElementById("lightbox-overlay");
const overlayImg = document.getElementById("lightbox-img");

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("click", () => {
    overlayImg.src = img.src;
    overlay.classList.add("show");
  });
});

// Close when clicking anywhere on the dark background
overlay.addEventListener("click", () => {
  overlay.classList.remove("show");
});
