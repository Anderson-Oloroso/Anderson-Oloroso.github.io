document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos del DOM ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinksList = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // --- 1. Control del Menú Hamburguesa en Móviles ---
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- 2. Sombra y Estilo en Navbar al hacer Scroll ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    highlightActiveNavLink();
  });

  // --- 3. Subrayado Activo Automático según la Sección Visible ---
  function highlightActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- 4. Animaciones de Entrada al Scroll (Intersection Observer) ---
  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar transición suave a tarjetas y secciones
  const elementsToAnimate = document.querySelectorAll('.interest-card, .project-card, .area-card, .contact-card, .about-bio, .tech-table-container');
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
  });
});