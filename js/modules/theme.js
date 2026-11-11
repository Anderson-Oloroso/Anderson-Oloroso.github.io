import { getTranslation } from './localization.js';

export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) {
    throw new Error('Theme toggle was not found');
  }

  let isLightTheme = document.documentElement.dataset.theme === 'light';

  const updateTheme = () => {
    const language = document.documentElement.lang === 'en' ? 'en' : 'es';
    const nextThemeKey = isLightTheme ? 'themeNight' : 'themeDay';
    const ariaLabelKey = isLightTheme ? 'themeNightLabel' : 'themeDayLabel';

    document.documentElement.dataset.theme = isLightTheme ? 'light' : 'dark';
    document.documentElement.style.colorScheme = isLightTheme ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', isLightTheme.toString());
    themeToggle.setAttribute('aria-label', getTranslation(language, ariaLabelKey));
    themeToggle.querySelector('[data-i18n]').textContent = getTranslation(language, nextThemeKey);
  };

  themeToggle.addEventListener('click', () => {
    isLightTheme = !isLightTheme;
    updateTheme();
  });
  document.addEventListener('languagechange', updateTheme);
  updateTheme();
}
