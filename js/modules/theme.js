import { getTranslation } from './localization.js';
import { prefersReducedMotion } from './utils.js';

export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) {
    throw new Error('Theme toggle was not found');
  }

  const root = document.documentElement;
  let isLightTheme = root.dataset.theme === 'light';
  let fadeTimer = 0;

  const currentLanguage = () => (root.lang === 'en' ? 'en' : 'es');

  // Etiquetas accesibles y texto del botón (dependen del idioma)
  const renderLabels = () => {
    const language = currentLanguage();
    const nextThemeKey = isLightTheme ? 'themeNight' : 'themeDay';
    const ariaLabelKey = isLightTheme ? 'themeNightLabel' : 'themeDayLabel';

    themeToggle.setAttribute('aria-pressed', isLightTheme.toString());
    themeToggle.setAttribute('aria-label', getTranslation(language, ariaLabelKey));
    const labelSpan = themeToggle.querySelector('[data-i18n]');
    if (labelSpan) labelSpan.textContent = getTranslation(language, nextThemeKey);
  };

  // Cambia los tokens de color y avisa al resto de módulos (p. ej. canvas)
  const applyTheme = () => {
    root.dataset.theme = isLightTheme ? 'light' : 'dark';
    root.style.colorScheme = isLightTheme ? 'light' : 'dark';
    renderLabels();
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: root.dataset.theme }
    }));
  };

  // Fallback sin View Transitions: fundido de colores suave durante 450 ms
  const applyWithFade = () => {
    window.clearTimeout(fadeTimer);
    root.classList.add('theme-fade');
    applyTheme();
    fadeTimer = window.setTimeout(() => root.classList.remove('theme-fade'), 500);
  };

  // View Transitions: el tema nuevo se revela en círculo expansivo desde el botón
  const applyWithReveal = () => {
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {
      applyTheme();
    });
  };

  // Cambia los tokens de color y avisa al resto de módulos (p. ej. el canvas)
  const applyTheme = () => {
    root.dataset.theme = isLightTheme ? 'light' : 'dark';
    root.style.colorScheme = isLightTheme ? 'light' : 'dark';
    renderLabels();
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: root.dataset.theme }
    }));
  };

  // Fallback sin View Transitions: fundido de colores durante ~450 ms
  const applyWithFade = () => {
    window.clearTimeout(fadeTimer);
    root.classList.add('theme-fade');
    applyTheme();
    fadeTimer = window.setTimeout(() => root.classList.remove('theme-fade'), 500);
  };

  // View Transitions: el tema nuevo se revela en círculo desde el botón
  const applyWithReveal = () => {
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  };

  themeToggle.addEventListener('click', () => {
    isLightTheme = !isLightTheme;

    if (prefersReducedMotion()) {
      applyTheme();
    } else if (typeof document.startViewTransition === 'function') {
      applyWithReveal();
    } else {
      applyWithFade();
    }
  });

  document.addEventListener('languagechange', renderLabels);
  applyTheme();
}
