/**
 * PORTAFOLIO PROFESIONAL - HENRIK ANDERSON OLOROSO GARCÍA
 * Punto de entrada principal (ES6 Modules)
 */
import { initNavigation } from './modules/navigation.js';
import { initScrollSpy } from './modules/scrollSpy.js';
import { initAnimations } from './modules/animations.js';
import { initLocalization } from './modules/localization.js';
import { initTheme } from './modules/theme.js';
import { initCinematic } from './modules/cinematic.js';
import { initInteractive } from './modules/interactive.js';

document.addEventListener('DOMContentLoaded', () => {
  initLocalization();
  initTheme();
  initNavigation();
  initScrollSpy();
  initAnimations();
  initCinematic();
  initInteractive();
});
