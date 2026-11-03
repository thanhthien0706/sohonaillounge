document.querySelectorAll('.accordion-item').forEach((item) => {
  const title = item.querySelector('.accordion-title');
  const inner = item.querySelector('.accordion-inner');

  title.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = item.classList.toggle('is-open');
    title.setAttribute('aria-expanded', String(isOpen));
    inner.style.maxHeight = isOpen ? `${inner.scrollHeight}px` : '0px';
  });
});
