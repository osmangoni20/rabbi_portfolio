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

// Custom cursor (dot + ring)
(function () {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  const isFine = matchMedia('(pointer: fine)').matches;
  if (!isFine) return; // don't show on touch

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf = 0;

  const render = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
    dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
    raf = requestAnimationFrame(render);
  };

  const show = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };
  const hide = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (!raf) raf = requestAnimationFrame(render);
    show();
  });
  window.addEventListener('mouseleave', () => { hide(); cancelAnimationFrame(raf); raf = 0; });

  window.addEventListener('mousedown', () => { ring.style.transform += ' scale(0.85)'; });
  window.addEventListener('mouseup', () => { ring.style.transform = ring.style.transform.replace(' scale(0.85)', ''); });

  // Hovering interactive elements enlarges ring
  const interactive = 'a, button, .btn, .site-nav a';
  document.querySelectorAll(interactive).forEach((el) => {
    el.addEventListener('mouseenter', () => { ring.style.transform += ' scale(1.2)'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = ring.style.transform.replace(' scale(1.2)', ''); });
  });
})();
