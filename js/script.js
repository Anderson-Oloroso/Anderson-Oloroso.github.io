/**
 * PORTAFOLIO PROFESIONAL - HENRIK ANDERSON OLOROSO GARCÍA
 * Punto de entrada principal (ES6 Modules)
 */
import { initNavigation } from './modules/navigation.js';
import { initScrollSpy } from './modules/scrollSpy.js';
import { initAnimations } from './modules/animations.js';
import { initLocalization } from './modules/localization.js';
import { initTheme } from './modules/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  initLocalization();
  initTheme();
  initNavigation();
  initScrollSpy();
  initAnimations();
});
