import { prefersReducedMotion } from './utils.js';

/**
 * Elementos que se revelan cinemáticamente al entrar en pantalla con Anime.js.
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

  // Si el usuario prefiere movimiento reducido, mostrar todo inmediatamente
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    document.querySelectorAll(REVEAL_TARGETS).forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
    });
    return;
  }

  const elements = document.querySelectorAll(REVEAL_TARGETS);

  // Escalonado inicial en grupos de badges
  document.querySelectorAll('.badges-flex-container').forEach((group) => {
    [...group.children].forEach((badge, index) => {
      badge.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 35}ms`);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    let order = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      obs.unobserve(element);

      const variant = element.dataset.reveal || 'up';
      const delayMs = Number.parseInt(element.style.getPropertyValue('--reveal-delay')) || (order * 60);
      order += 1;

      element.classList.add('visible');

      // Animación suave con Anime.js si está cargado
      if (typeof window.anime === 'function') {
        window.anime({
          targets: element,
          opacity: [0, 1],
          translateY: variant === 'up' ? [28, 0] : [0, 0],
          translateX: variant === 'left' ? [-32, 0] : (variant === 'right' ? [32, 0] : [0, 0]),
          scale: variant === 'scale' ? [0.93, 1] : [1, 1],
          duration: 650,
          delay: delayMs,
          easing: 'easeOutCubic',
          complete: () => {
            element.style.transform = '';
            element.style.translate = '';
            element.style.opacity = '1';
          }
        });
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  elements.forEach((element) => {
    if (!element.dataset.reveal) {
      const match = Object.keys(DEFAULT_VARIANTS).find((selector) => element.matches(selector));
      if (match) element.dataset.reveal = DEFAULT_VARIANTS[match];
    }
    element.classList.add('reveal-on-scroll');
    observer.observe(element);
  });

  // PROTECCIÓN DE NAVEGACIÓN POR ANCLAS:
  // Si el usuario salta por enlace (#proyectos, #contacto, etc.), revelar inmediatamente la sección
  const revealTargetSection = (hash) => {
    if (!hash || hash === '#' || hash === '#inicio') return;
    try {
      const target = document.querySelector(hash);
      if (target) {
        target.querySelectorAll('.reveal-on-scroll').forEach(el => {
          el.classList.add('visible');
          el.style.opacity = '1';
          el.style.transform = '';
          el.style.translate = '';
          observer.unobserve(el);
        });
      }
    } catch (_) {}
  };

  window.addEventListener('hashchange', () => revealTargetSection(window.location.hash));
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      revealTargetSection(a.getAttribute('href'));
    });
  });

  // RED DE SEGURIDAD: Tras 3.5 segundos, ningún elemento permanece oculto por fallo de scroll
  setTimeout(() => {
    document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
    });
  }, 3500);

  // Micro-interacción decorativa en iconos SVG de encabezados de sección
  initSvgMicroAnimations();
}

/**
 * Micro-animaciones en iconos SVG decorativos con Anime.js
 */
function initSvgMicroAnimations() {
  if (prefersReducedMotion() || typeof window.anime !== 'function') return;

  const sectionBadges = document.querySelectorAll('.section-badge');
  sectionBadges.forEach(badge => {
    const svg = badge.querySelector('svg');
    if (!svg) return;

    badge.addEventListener('mouseenter', () => {
      window.anime({
        targets: svg,
        rotate: [-8, 8, 0],
        scale: [1, 1.25, 1],
        duration: 450,
        easing: 'easeInOutQuad'
      });
    });
  });
}
