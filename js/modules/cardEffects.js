import { prefersReducedMotion, hasFinePointer, lerp, clamp } from './utils.js';

/**
 * Efectos de tarjeta dirigidos por atributos:
 *   [data-spotlight]            brillo interior + borde luminoso que sigue al puntero
 *   [data-tilt="6"]             inclinación 3D (grados máximos; por defecto 6)
 *   [data-tilt-lift="-4"]       elevación en px mientras hay hover (por defecto -4)
 * Solo ratón/lápiz: en pantallas táctiles no se registra nada.
 */
export function initCardEffects() {
  if (!hasFinePointer()) return;

  document.querySelectorAll('[data-spotlight]').forEach(setupSpotlight);

  if (!prefersReducedMotion()) {
    document.querySelectorAll('[data-tilt]').forEach(setupTilt);
  }
}

function setupSpotlight(element) {
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const paint = () => {
    frame = 0;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mx', `${(pointerX - rect.left).toFixed(1)}px`);
    element.style.setProperty('--my', `${(pointerY - rect.top).toFixed(1)}px`);
  };

  element.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });
}

function setupTilt(element) {
  const maxAngle = Number.parseFloat(element.dataset.tilt) || 6;
  const hoverLift = element.dataset.tiltLift !== undefined
    ? Number.parseFloat(element.dataset.tiltLift) || 0
    : -4;

  const state = {
    targetX: 0, targetY: 0, targetLift: 0,
    x: 0, y: 0, lift: 0,
    hovering: false,
    frame: 0,
    rect: null
  };

  const step = () => {
    state.x = lerp(state.x, state.targetX, 0.14);
    state.y = lerp(state.y, state.targetY, 0.14);
    state.lift = lerp(state.lift, state.targetLift, 0.14);

    element.style.transform =
      `perspective(900px) translate3d(0, ${state.lift.toFixed(2)}px, 0) ` +
      `rotateX(${state.x.toFixed(2)}deg) rotateY(${state.y.toFixed(2)}deg)`;

    const converged =
      Math.abs(state.x - state.targetX) < 0.02 &&
      Math.abs(state.y - state.targetY) < 0.02 &&
      Math.abs(state.lift - state.targetLift) < 0.05;

    if (converged) {
      state.frame = 0;
      if (!state.hovering) {
        element.style.transform = '';
        element.classList.remove('is-tilting');
      }
      return;
    }
    state.frame = requestAnimationFrame(step);
  };

  const wake = () => {
    if (state.frame) return;
    element.classList.add('is-tilting');
    state.frame = requestAnimationFrame(step);
  };

  element.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    state.hovering = true;
    state.targetLift = hoverLift;
    state.rect = element.getBoundingClientRect();
    wake();
  });

  element.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const rect = state.rect ?? (state.rect = element.getBoundingClientRect());
    const px = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    const py = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    state.targetY = px * maxAngle * 2;
    state.targetX = -py * maxAngle * 2;
    wake();
  }, { passive: true });

  element.addEventListener('pointerleave', () => {
    state.hovering = false;
    state.targetX = 0;
    state.targetY = 0;
    state.targetLift = 0;
    state.rect = null;
    wake();
  });

  // La posición cambia al hacer scroll: se recalcula en el siguiente movimiento
  window.addEventListener('scroll', () => { state.rect = null; }, { passive: true });
}
