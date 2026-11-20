import { prefersReducedMotion, hasFinePointer } from './utils.js';

/**
 * Botones magnéticos: [data-magnetic="0.3"] (fuerza opcional, 0.3 por defecto).
 * Usa la propiedad `translate`, independiente de `transform`, así que convive
 * con los hover de elevación definidos en CSS.
 */
export function initMagnetic() {
  if (prefersReducedMotion() || !hasFinePointer()) return;

  document.querySelectorAll('[data-magnetic]').forEach((element) => {
    const strength = Number.parseFloat(element.dataset.magnetic) || 0.3;
    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      // El rect ya incluye el desplazamiento actual: se resta para no realimentar
      const centerX = rect.left + rect.width / 2 - offsetX;
      const centerY = rect.top + rect.height / 2 - offsetY;
      offsetX = (event.clientX - centerX) * strength;
      offsetY = (event.clientY - centerY) * strength;
      element.style.translate = `${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px`;
    }, { passive: true });

    element.addEventListener('pointerleave', () => {
      offsetX = 0;
      offsetY = 0;
      element.style.translate = '';
    });
  });
}

/**
 * Ripple (onda) al pulsar botones y tarjetas de contacto.
 * Un único listener delegado; el nodo se elimina al terminar la animación.
 */
export function initRipple() {
  if (prefersReducedMotion()) return;

  const SELECTOR = '.btn, .project-link-btn, .theme-toggle, .contact-tile';

  document.addEventListener('pointerdown', (event) => {
    if (!(event.target instanceof Element) || event.button > 0) return;
    const host = event.target.closest(SELECTOR);
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    host.appendChild(ripple);
  });
}
