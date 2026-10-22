/**
 * Módulo de animaciones de entrada progresiva mediante IntersectionObserver
 */
export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll(
    '.about-main-text, .spec-box, .stack-section-container, .project-card, .contact-tile, .soft-comp-item'
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}
