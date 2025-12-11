// Injects a hamburger toggle and controls mobile nav behaviour
document.addEventListener('DOMContentLoaded', function(){
  // Find nav containers that have a .nav-links list
  var navContainers = document.querySelectorAll('.nav');
  navContainers.forEach(function(container){
    var nav = container.querySelector('nav') || container;
    if(!nav) return;
    var links = nav.querySelector('.nav-links') || nav.querySelector('ul');
    if(!links) return;

    // Normalize: if links is a <ul> not having .nav-links, add class
    if(!links.classList.contains('nav-links')){
      links.classList.add('nav-links');
    }

    // Create toggle if not present
    if(!nav.querySelector('.nav-toggle')){
      var btn = document.createElement('button');
      btn.className = 'nav-toggle';
      btn.type = 'button';
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Toggle navigation');
      var span = document.createElement('span');
      span.className = 'hamburger';
      btn.appendChild(span);
      // Insert at the start of nav so it is visible on small screens
      nav.insertBefore(btn, nav.firstChild);

      // Toggle behaviour
      btn.addEventListener('click', function(e){
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        links.classList.toggle('open');
      });

      // Close when clicking a link
      links.addEventListener('click', function(e){
        if(e.target.tagName.toLowerCase() === 'a'){
          btn.setAttribute('aria-expanded','false');
          links.classList.remove('open');
        }
      });

      // Close when clicking outside
      document.addEventListener('click', function(e){
        if(!nav.contains(e.target)){
          btn.setAttribute('aria-expanded','false');
          links.classList.remove('open');
        }
      });
    }
  });
});

/* Lightbox: open images or project-card backgrounds in a modal */
document.addEventListener('DOMContentLoaded', function(){
  // create modal element
  var modal = document.createElement('div');
  modal.id = 'image-modal';
  modal.style.display = 'none';
  modal.innerHTML = '<div class="modal-inner"><button class="modal-close" aria-label="Close">×</button><img class="modal-img" src="" alt=""/></div>';
  document.body.appendChild(modal);

  var modalImg = modal.querySelector('.modal-img');
  var closeBtn = modal.querySelector('.modal-close');

  function openModal(src, alt){
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.style.display = 'none';
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });

  // Click handlers for images and project cards
  function getBgImageUrl(el){
    var bg = window.getComputedStyle(el).backgroundImage;
    if(!bg || bg === 'none') return null;
    // backgroundImage: url("...") or url(...)
    var m = bg.match(/url\(["']?(.*?)["']?\)/);
    return m ? m[1] : null;
  }

  // Images inside galleries or project-img
  var imgs = document.querySelectorAll('.project-img img, .project-gallery img, .project-gallery-mockups img');
  imgs.forEach(function(img){
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function(){ openModal(img.src, img.alt); });
  });

  // project-card anchors with background images
  var cards = document.querySelectorAll('.project-card');
  cards.forEach(function(card){
    card.style.cursor = 'zoom-in';
    card.addEventListener('click', function(e){
      // if the card contains a real link with href we still open modal for background
      var src = getBgImageUrl(card) || card.getAttribute('data-img');
      if(src){
        e.preventDefault();
        openModal(src, 'Project image');
      }
    });
  });
});
