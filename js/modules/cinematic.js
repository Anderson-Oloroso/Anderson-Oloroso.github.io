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
  initBadgeGlint();
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
  const count = Math.min(55, Math.max(22, Math.floor(width / 32)));
  const particles = [];
  const packets = [];
  let sincePacket = 0;
  const mouse = { x: null, y: null, radius: 175 };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.9;
      this.baseAlpha = Math.random() * 0.4 + 0.25;
    }
    update() {
      // Interacción con mouse: atracción suave ("arañita" que se adhiere al puntero)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius && dist > 5) {
          const pull = (1 - dist / mouse.radius) * 0.035;
          this.vx += (dx / dist) * pull;
          this.vy += (dy / dist) * pull;
        }
      }

      this.vx *= 0.985;
      this.vy *= 0.985;
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) {
        this.vx *= -1;
        this.x = Math.max(0, Math.min(width, this.x));
      }
      if (this.y < 0 || this.y > height) {
        this.vy *= -1;
        this.y = Math.max(0, Math.min(height, this.y));
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

  const connectionDist = 125;

  function loop() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const light = isLight();
    const lineColor = light ? '59, 130, 246' : '56, 189, 248';
    const activeEdges = [];

    // Actualizar y dibujar partículas
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Enlaces entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * (light ? 0.1 : 0.16);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
          activeEdges.push([p1, p2]);
        }
      }
    }

    // CONEXIÓN AL CURSOR: Pequeñas líneas que se adhieren al puntero ("arañita")
    if (mouse.x !== null && mouse.y !== null) {
      const spiderColor = light ? '59, 130, 246' : '6, 182, 212';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * (light ? 0.45 : 0.65);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${spiderColor}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Generar pulsos / paquetes de datos viajando entre nodos
    sincePacket++;
    if (sincePacket > 25 && packets.length < 6 && activeEdges.length > 0) {
      sincePacket = 0;
      const [from, to] = activeEdges[Math.floor(Math.random() * activeEdges.length)];
      packets.push({ from, to, t: 0 });
    }

    // Dibujar paquetes en tránsito
    for (let i = packets.length - 1; i >= 0; i--) {
      const pkt = packets[i];
      pkt.t += 0.022;
      if (pkt.t >= 1) {
        packets.splice(i, 1);
        continue;
      }
      const px = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.t;
      const py = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.t;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = light ? 'rgba(37, 99, 235, 0.9)' : 'rgba(16, 185, 129, 0.95)';
      ctx.fill();
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
 * Destello puntual aleatorio en los tech-badges de #conocimientos
 * - Inyecta un pequeño <span> con animación glintPulse en posición aleatoria
 * - Intervalo de disparo por badge: aleatorio entre 1.5 s y 6 s
 * - Sobrio y no invasivo; respeta prefers-reduced-motion
 */
function initBadgeGlint() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const badges = Array.from(document.querySelectorAll('#conocimientos .tech-badge'));
  if (!badges.length) return;

  function fireGlint(badge) {
    const glint = document.createElement('span');
    glint.className = 'badge-glint';

    // Posición aleatoria dentro del badge (evitar bordes extremos)
    const gx = (15 + Math.random() * 70).toFixed(1) + '%';
    const gy = (20 + Math.random() * 60).toFixed(1) + '%';
    glint.style.setProperty('--gx', gx);
    glint.style.setProperty('--gy', gy);

    badge.appendChild(glint);
    glint.addEventListener('animationend', () => glint.remove(), { once: true });
    // Fallback limpieza
    setTimeout(() => glint.remove(), 800);
  }

  function scheduleGlint(badge) {
    // Retraso aleatorio: entre 3 s y 7 s — sutil, no invasivo
    const delay = 3000 + Math.random() * 4000;
    setTimeout(() => {
      fireGlint(badge);
      scheduleGlint(badge);
    }, delay);
  }

  // Offset inicial escalonado para evitar que todos disparen juntos
  badges.forEach((badge) => {
    const initDelay = Math.random() * 6000;
    setTimeout(() => scheduleGlint(badge), initDelay);
  });
}
