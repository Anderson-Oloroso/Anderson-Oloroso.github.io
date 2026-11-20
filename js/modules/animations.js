import { prefersReducedMotion } from './utils.js';

/**
 * Elementos que se revelan cinemáticamente al entrar en pantalla.
 * Variante por atributo: data-reveal="up | left | right | scale" (up por defecto).
 */
const REVEAL_TARGETS = [
  '.section-header',
  '.about-main-text',
  '.spec-box',
  '.experience-card',
  '.stack-section-container',
  '.tech-badge',
  '.soft-comp-item',
  '.project-card',
  '.projects-footer-cta',
  '.hobby-card',
  '.hobby-spotlight',
  '.project-filters-container',
  '.contact-tile'
].join(', ');

/** Variante por defecto cuando el elemento no declara data-reveal */
const DEFAULT_VARIANTS = {
  '.stack-section-container': 'scale',
  '.tech-badge': 'scale',
  '.hobby-card': 'scale',
  '.hobby-spotlight': 'scale'
};

/**
 * Marca la página como lista para disparar la entrada orquestada del hero.
 * Espera a las fuentes (máx. 900 ms) para que el texto no cambie a mitad de animación.
 */
function markReady() {
  const root = document.documentElement;
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const timeout = new Promise((resolve) => window.setTimeout(resolve, 900));

  Promise.race([fontsReady, timeout]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-ready')));
  });
}

export function initAnimations() {
  markReady();

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const elements = document.querySelectorAll(REVEAL_TARGETS);

  // Escalonado fijo dentro de cada grupo de insignias (40 ms entre una y otra)
  document.querySelectorAll('.badges-flex-container').forEach((group) => {
    [...group.children].forEach((badge, index) => {
      badge.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 40}ms`);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    // Escalonado dinámico: los elementos que entran juntos aparecen en cascada
    let order = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      if (!element.style.getPropertyValue('--reveal-delay')) {
        element.style.setProperty('--reveal-delay', `${Math.min(order, 6) * 80}ms`);
      }
      order += 1;
      element.classList.add('visible');
      obs.unobserve(element);
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  elements.forEach((element) => {
    if (!element.dataset.reveal) {
      const match = Object.keys(DEFAULT_VARIANTS).find((selector) => element.matches(selector));
      if (match) element.dataset.reveal = DEFAULT_VARIANTS[match];
    }
    element.classList.add('reveal-on-scroll');
    observer.observe(element);
  });
}
