/**
 * PORTAFOLIO PROFESIONAL - HENRIK ANDERSON OLOROSO GARCÍA
 * Punto de entrada principal (ES6 Modules)
 */
import { initNavigation } from './modules/navigation.js';
import { initScrollSpy } from './modules/scrollSpy.js';
import { initAnimations } from './modules/animations.js';
import { initLocalization } from './modules/localization.js';
import { initTheme } from './modules/theme.js';
import { initParallax } from './modules/parallax.js';
import { initHeroCanvas } from './modules/heroCanvas.js';
import { initCardEffects } from './modules/cardEffects.js';
import { initMagnetic, initRipple } from './modules/interactions.js';
import { initCursor } from './modules/cursor.js';

/**
 * Los efectos inmersivos son una mejora progresiva: si uno falla,
 * el resto del portafolio sigue funcionando.
 */
const safely = (initializer) => {
  try {
    initializer();
  } catch (error) {
    console.warn(`[inmersión] ${initializer.name} no pudo iniciarse:`, error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Núcleo
  initLocalization();
  initTheme();
  initNavigation();
  initScrollSpy();
  initAnimations();

  // Capa inmersiva
  safely(initParallax);
  safely(initHeroCanvas);
  safely(initCardEffects);
  safely(initMagnetic);
  safely(initRipple);
  safely(initCursor);
});
