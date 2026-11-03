const navToggle = document.querySelector('.header__nav-toggle');
const nav = document.querySelector('.header__nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}
