class Carousel {
  constructor(root, { autoplay = 0, loop = true } = {}) {
    this.root = root;
    this.track = root.querySelector('.carousel__track');
    this.slides = [...root.querySelectorAll('.carousel__slide')];
    this.dotsWrap = root.querySelector('.carousel__dots');
    this.prevBtn = root.querySelector('.carousel__arrow--prev');
    this.nextBtn = root.querySelector('.carousel__arrow--next');
    this.index = 0;
    this.loop = loop;
    this.autoplayMs = autoplay;
    this.timer = null;

    if (this.dotsWrap) {
      this.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => this.goTo(i));
        this.dotsWrap.appendChild(dot);
      });
      this.dots = [...this.dotsWrap.children];
    }

    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    this.bindDrag();
    this.update();

    if (this.autoplayMs) {
      this.root.addEventListener('mouseenter', () => this.stop());
      this.root.addEventListener('mouseleave', () => this.start());
      this.start();
    }
  }

  bindDrag() {
    let startX = 0;
    let dx = 0;
    let dragging = false;

    const onDown = (x) => { dragging = true; startX = x; this.track.style.transition = 'none'; };
    const onMove = (x) => { if (!dragging) return; dx = x - startX; this.track.style.transform = `translateX(calc(${-this.index * 100}% + ${dx}px))`; };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      this.track.style.transition = '';
      if (Math.abs(dx) > 50) {
        dx < 0 ? this.next() : this.prev();
      } else {
        this.update();
      }
      dx = 0;
    };

    this.track.addEventListener('mousedown', (e) => onDown(e.clientX));
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);

    this.track.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
    this.track.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
    this.track.addEventListener('touchend', onUp);
  }

  goTo(i) {
    const count = this.slides.length;
    this.index = this.loop ? (i + count) % count : Math.max(0, Math.min(i, count - 1));
    this.update();
  }

  next() { this.goTo(this.index + 1); }
  prev() { this.goTo(this.index - 1); }

  update() {
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.dots?.forEach((d, i) => d.classList.toggle('is-active', i === this.index));
  }

  start() {
    if (!this.autoplayMs) return;
    this.stop();
    this.timer = setInterval(() => this.next(), this.autoplayMs);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
  }
}

document.querySelectorAll('[data-carousel]').forEach((el) => {
  const autoplay = Number(el.dataset.autoplay) || 0;
  new Carousel(el, { autoplay });
});
