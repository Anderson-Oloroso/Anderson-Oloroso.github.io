/**
 * PORTAFOLIO PROFESIONAL - HENRIK ANDERSON OLOROSO GARCÍA
 * Punto de entrada principal (ES6 Modules)
 */
import { initNavigation } from './modules/navigation.js';
import { initScrollSpy } from './modules/scrollSpy.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  initAnimations();
});
