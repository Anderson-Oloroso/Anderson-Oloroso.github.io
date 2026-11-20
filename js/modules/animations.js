/**
 * Módulo de animaciones de entrada progresiva con ritmo cinematográfico escalonado (Staggered Reveal)
 */
export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  // Selección de grupos para revelado escalonado
  const gridContainers = document.querySelectorAll(
    '.projects-grid, .hobbies-grid, .about-specs, .contact-cards-grid, .soft-competencies-grid, .stack-section-container'
  );

  gridContainers.forEach(container => {
    const children = container.querySelectorAll(
      '.project-card, .hobby-card, .spec-box, .contact-tile, .soft-comp-item, .stack-group-block'
    );
    children.forEach((child, index) => {
      child.style.transitionDelay = `${(index % 4) * 80}ms`;
      child.classList.add('reveal-on-scroll');
    });
  });

  // Elementos individuales restantes
  const singleElements = document.querySelectorAll(
    '.about-main-text, .experience-card, .section-header, .hobby-spotlight, .project-filters-container'
  );

  singleElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  const allRevealElements = document.querySelectorAll('.reveal-on-scroll');

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

  allRevealElements.forEach(el => {
    observer.observe(el);
  });
}
