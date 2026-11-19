/**
 * Módulo para control de navbar pegajoso y resaltado de sección activa (ScrollSpy)
 */
export function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');
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

  // Se escribe el transform del propio elemento: evita invalidar estilos de toda la página
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
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
        updateProgress();
        isScrolling = false;
      });
      isScrolling = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}
