/**
 * Módulo de navegación accesible y control del menú móvil
 */
export function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (!hamburger || !navLinks) return;

  const updateMenuLabel = () => {
    const language = document.documentElement.lang === 'en' ? 'en' : 'es';
    const isExpanded = hamburger.classList.contains('active');
    const labels = {
      es: { open: 'Abrir menú de navegación', close: 'Cerrar menú de navegación' },
      en: { open: 'Open navigation menu', close: 'Close navigation menu' }
    };
    hamburger.setAttribute('aria-label', isExpanded ? labels[language].close : labels[language].open);
  };

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : !hamburger.classList.contains('active');
    hamburger.classList.toggle('active', isExpanded);
    navLinks.classList.toggle('active', isExpanded);
    hamburger.setAttribute('aria-expanded', isExpanded.toString());
    document.body.style.overflow = isExpanded ? 'hidden' : '';
    updateMenuLabel();
  };

  document.addEventListener('languagechange', updateMenuLabel);
  updateMenuLabel();
  hamburger.addEventListener('click', () => toggleMenu());

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (
      hamburger.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });
}
