const images = document.querySelectorAll('.project-card');

images.forEach(img => {
  img.addEventListener('click', () => {
    const src = img.style.backgroundImage.slice(5, -2); // get url
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `<img src="${src}" alt=""><span class="close">&times;</span>`;
    document.body.appendChild(overlay);

    overlay.querySelector('.close').addEventListener('click', () => {
      overlay.remove();
    });
  });
});
