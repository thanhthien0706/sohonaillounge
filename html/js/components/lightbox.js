const lightboxLinks = [...document.querySelectorAll('.image-lightbox')];

if (lightboxLinks.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__prev" aria-label="Previous">&#10094;</button>
    <img class="lightbox__img" src="" alt="">
    <button class="lightbox__next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.lightbox__img');
  let current = 0;

  const open = (i) => {
    current = i;
    img.src = lightboxLinks[current].href;
    overlay.classList.add('is-open');
  };

  const close = () => overlay.classList.remove('is-open');
  const step = (delta) => open((current + delta + lightboxLinks.length) % lightboxLinks.length);

  lightboxLinks.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  overlay.querySelector('.lightbox__close').addEventListener('click', close);
  overlay.querySelector('.lightbox__prev').addEventListener('click', () => step(-1));
  overlay.querySelector('.lightbox__next').addEventListener('click', () => step(1));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}
