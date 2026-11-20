/**
 * MÓDULO CINEMATOGRÁFICO:
 * - Barra de progreso de exploración/lectura
 * - Smooth scroll cinemático (Lenis con fallback nativo)
 * - Canvas ambiental interactivo de alto rendimiento (partículas cuánticas / nodos de datos)
 * - Parallax sutil de profundidad en Hero
 */

export function initCinematic() {
  initReadingProgressBar();
  initAmbientCanvas();
  initHeroParallax();
  initSmoothScroll();
  initCustomCursor();
}

/**
 * Barra sutil de progreso superior
 */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

/**
 * Smooth Scroll cinemático utilizando Lenis si está disponible,
 * respetando estrictamente prefers-reduced-motion.
 */
function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Cargar Lenis dinámicamente si no está presente en el documento
  if (typeof window.Lenis === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js';
    script.async = true;
    script.onload = () => {
      startLenis();
    };
    document.head.appendChild(script);
  } else {
    startLenis();
  }

  function startLenis() {
    if (typeof window.Lenis === 'undefined') return;
    try {
      const lenis = new window.Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5
      });

      window.__lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis smooth scroll fallback to native', e);
    }
  }
}

/**
 * Canvas ambiental interactivo de partículas / constelación digital
 * - Se adapta a modo claro / oscuro automáticamente
 * - Pausa cuando la pestaña no es visible
 * - Se desactiva si prefers-reduced-motion está activo
 */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let animationFrameId = null;
  let isVisible = true;

  // Detección de tema
  const isLight = () => document.documentElement.dataset.theme === 'light';

  // Configuración de partículas
  const count = Math.min(45, Math.max(18, Math.floor(width / 35)));
  const particles = [];
  const mouse = { x: null, y: null, radius: 120 };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.5 + 0.8;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Interacción con mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }
    draw() {
      const light = isLight();
      const color = light ? '59, 130, 246' : '6, 182, 212';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.baseAlpha * (light ? 0.45 : 0.65)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const handleMouseLeave = () => {
    mouse.x = null;
    mouse.y = null;
  };

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

  // Pausar si no es visible
  document.addEventListener('visibilitychange', () => {
    isVisible = document.visibilityState === 'visible';
    if (isVisible && !animationFrameId) {
      loop();
    }
  });

  const connectionDist = 110;

  function loop() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const light = isLight();
    const lineColor = light ? '59, 130, 246' : '56, 189, 248';

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.update();
      p1.draw();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * (light ? 0.08 : 0.14);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
}

/**
 * Parallax de profundidad en Hero con micro-inclinación basada en cursor y scroll
 */
function initHeroParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const hero = document.getElementById('inicio');
  const profileCard = document.querySelector('.profile-card');
  const heroBadge = document.querySelector('.hero-badge-role');
  if (!hero || !profileCard) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovering = false;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX = (x / rect.width) * 14;
    mouseY = (y / rect.height) * 14;
    isHovering = true;
  });

  hero.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
    isHovering = false;
  });

  function update() {
    // Easing suave hacia el destino
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (Math.abs(mouseX - currentX) > 0.01 || Math.abs(mouseY - currentY) > 0.01 || isHovering) {
      profileCard.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg) translateY(-2px)`;
      if (heroBadge) {
        heroBadge.style.transform = `translate3d(${currentX * 0.4}px, ${currentY * 0.4}px, 0)`;
      }
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/**
 * Cursor cinematográfico personalizado (dot + ring con easing)
 * - Activo solo en dispositivos non-touch
 * - Desactivado con prefers-reduced-motion
 * - Se expande en hover sobre elementos interactivos
 */
function initCustomCursor() {
  // No activar en dispositivos táctiles
  if (window.matchMedia('(hover: none)').matches) return;

  // No activar si el usuario prefiere movimiento reducido
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Mostrar cursores y ocultar el nativo
  dot.style.opacity  = '1';
  ring.style.opacity = '1';
  document.body.classList.add('custom-cursor-active');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId  = null;

  // Dot sigue al cursor directamente
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  }, { passive: true });

  // Ring sigue con easing (efecto lag cinematográfico)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover sobre elementos interactivos: expande ring y cambia color dot
  const interactiveSelector = 'a, button, [role="button"], .tech-badge, .project-card, .filter-btn, .tilt-card, label[for], .nav-link, .btn';

  function onEnter() { document.body.classList.add('cursor-hover'); }
  function onLeave() { document.body.classList.remove('cursor-hover'); }

  // Delegación de eventos en document
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) onEnter();
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) onLeave();
  }, { passive: true });

  // Ocultar cursores si el mouse sale de la ventana
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  }, { passive: true });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  }, { passive: true });
}
