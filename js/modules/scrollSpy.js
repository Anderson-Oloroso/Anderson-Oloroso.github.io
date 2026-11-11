/**
 * Módulo para control de navbar pegajoso y resaltado de sección activa (ScrollSpy)
 */
export function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!sections.length) return;

  let isScrolling = false;

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const onScroll = () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          navbar?.classList.add('scrolled');
        } else {
          navbar?.classList.remove('scrolled');
        }
        updateActiveNav();
        isScrolling = false;
      });
      isScrolling = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
