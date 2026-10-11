const hero = document.querySelector('#hero');

if (hero) {
  const layers = hero.querySelectorAll('.space-layer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let pending = false;

  function updateParallax() {
    pending = false;

    const rect = hero.getBoundingClientRect();
    const scroll = Math.max(0, Math.min(-rect.top, rect.height));

    layers.forEach((layer) => {
      const speed = Number(layer.dataset.speed) / 100;

      // Compensate for the hero's normal movement up the page.
      const offset = reducedMotion.matches ? 0 : scroll * (1 - speed);

      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }

  function requestUpdate() {
    if (pending) return;

    pending = true;
    requestAnimationFrame(updateParallax);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('pageshow', requestUpdate);
  reducedMotion.addEventListener('change', requestUpdate);

  new ResizeObserver(requestUpdate).observe(hero);

  updateParallax();
}
