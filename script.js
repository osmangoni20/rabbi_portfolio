// Mobile nav toggle
(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !header) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    header.classList.toggle('open');
  });

  // Close nav when clicking a link (on mobile)
  nav?.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 880px)').matches) {
        header.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

// Smooth scroll for anchor links (enhanced)
(function () {
  const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (supportsSmooth) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 64;
        window.scrollTo(0, top);
      }
    });
  });
})();

// Reveal on scroll
(function () {
  const revealables = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  );
  revealables.forEach((el) => io.observe(el));
})();

// Custom cursor removed; using default pointer

// Swap hero image if local file exists (assets/images/hero.webp|jpg|png)
(function () {
  const img = document.getElementById('hero-image');
  if (!img) return;
  const sources = [
    'assets/images/hero.webp',
    'assets/images/hero.jpg',
    'assets/images/hero.png',
  ];
  const tryLoad = (srcIndex) => {
    if (srcIndex >= sources.length) return; // keep placeholder
    const test = new Image();
    test.onload = () => { img.src = sources[srcIndex]; };
    test.onerror = () => { tryLoad(srcIndex + 1); };
    test.src = sources[srcIndex] + '?v=' + Date.now();
  };
  tryLoad(0);
})();
