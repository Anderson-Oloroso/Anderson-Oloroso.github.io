/**
 * PORTAFOLIO PROFESIONAL - HENRIK ANDERSON OLOROSO GARCÍA
 * Técnico en Desarrollo de Software
 * Script JS Moderno, Ligero y Accesible (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales del DOM
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // 1. Menú Móvil con Accesibilidad (ARIA + Keyboard + Outside Click)
  if (hamburger && navLinks) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : !hamburger.classList.contains('active');
      hamburger.classList.toggle('active', isExpanded);
      navLinks.classList.toggle('active', isExpanded);
      hamburger.setAttribute('aria-expanded', isExpanded.toString());
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    };

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

  // 2. Control de Navbar y Scroll Spy con requestAnimationFrame
  let isScrolling = false;
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

  // 3. Resaltado de Sección Activa
  function updateActiveNav() {
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
  }

  // 4. Animación de Entrada Suave con IntersectionObserver
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.about-main-text, .spec-box, .stack-section-container, .project-card, .contact-tile, .soft-comp-item'
    );

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
      observer.observe(el);
    });
  }
});