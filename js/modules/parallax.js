import { prefersReducedMotion, hasFinePointer, lerp } from './utils.js';

/**
 * Parallax del hero con tres fuentes de movimiento combinadas:
 *   data-parallax="0.2"  velocidad respecto al scroll (px de desplazamiento por px scrolleado)
 *   data-depth="24"      amplitud en px del movimiento según la posición del puntero
 * Se escribe en la propiedad `translate`, que no choca con `transform`.
 * El bucle solo corre mientras el hero está visible.
 */
export function initParallax() {
  if (prefersReducedMotion()) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const layers = [...hero.querySelectorAll('[data-parallax]')].map((element) => ({
    element,
    speed: Number.parseFloat(element.dataset.parallax) || 0,
    depth: Number.parseFloat(element.dataset.depth) || 0
  }));
  if (!layers.length) return;

  const usePointer = hasFinePointer();
  let pointerX = 0;
  let pointerY = 0;
  let smoothX = 0;
  let smoothY = 0;
  let visible = true;
  let frame = 0;

  const render = () => {
    frame = 0;
    const scrolled = window.scrollY;
    smoothX = lerp(smoothX, pointerX, 0.08);
    smoothY = lerp(smoothY, pointerY, 0.08);

    for (const layer of layers) {
      const x = smoothX * layer.depth;
      const y = scrolled * layer.speed + smoothY * layer.depth;
      layer.element.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
    }

    const moving = Math.abs(pointerX - smoothX) > 0.001 || Math.abs(pointerY - smoothY) > 0.001;
    if (visible && moving) frame = requestAnimationFrame(render);
  };

  const request = () => {
    if (!frame && visible) frame = requestAnimationFrame(render);
  };

  window.addEventListener('scroll', request, { passive: true });

  if (usePointer) {
    hero.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      request();
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      pointerX = 0;
      pointerY = 0;
      request();
    });
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) request();
  }).observe(hero);

  request();
}
