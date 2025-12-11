document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.about-me-img');
  
  if (!images.length) return;

  const observerOptions = {
    threshold: 0.2, // trigger when 20% of image is visible
    rootMargin: '0px 0px -50px 0px' // start animation slightly before reaching viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  images.forEach(img => {
    observer.observe(img);
  });
});
