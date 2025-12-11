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
document.addEventListener('DOMContentLoaded', () => {
  // Select images commonly used on the detailed/project pages.
  // This is intentionally broad: it targets images inside .project-images, .project-img,
  // individual .project-card images and any element with .lightboxable class.
  const images = document.querySelectorAll('.project-images img, .project-img img, .project-card img, img.lightboxable');
  if (!images || images.length === 0) return;

  function openLightbox(src, alt = '') {
    // create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    overlay.innerHTML = `
      <div class="lightbox-inner" role="dialog" aria-modal="true">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <img src="${src}" alt="${alt}">
      </div>
    `;

    document.body.appendChild(overlay);
    // prevent background scroll while open
    document.body.style.overflow = 'hidden';

    function close() {
      document.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = '';
      overlay.remove();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') close();
    }

    // close when clicking outside the inner container
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    document.addEventListener('keydown', onKeydown);
  }

  images.forEach(img => {
    // make it obvious it's clickable
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', (e) => {
      const src = img.dataset.fullsrc || img.src || (img.style.backgroundImage && img.style.backgroundImage.slice(5, -2));
      const alt = img.alt || '';
      if (src) openLightbox(src, alt);
    });
  });
});
