// Make script safe to run even if included in <head>
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      // Prevent background scrolling while nav is open on mobile
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Lightbox for project images
  const images = document.querySelectorAll('.project-card img');
  if (images.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox-overlay');
    document.body.appendChild(lightbox);

    images.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.innerHTML = `<span class="close-lightbox" aria-label="Close">&times;</span><img src="${img.src}" alt="${img.alt || ''}">`;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', e => {
      if (e.target.classList.contains('close-lightbox') || e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.style.display = 'none';
    });
  }
});
