import { prefersReducedMotion, hasFinePointer, clamp } from './utils.js';

const LINK_DISTANCE = 140;
const POINTER_DISTANCE = 180;

/**
 * Fondo del hero: una red de servicios (nodos) conectada por enlaces.
 * Pequeños "paquetes" viajan entre nodos como peticiones y el puntero actúa
 * como un cliente que se conecta a los nodos cercanos.
 *
 * Rendimiento: DPR limitado, nº de nodos proporcional al área, bucle pausado
 * fuera de pantalla y con la pestaña oculta. Con prefers-reduced-motion se
 * dibuja un único fotograma estático.
 */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  const hero = canvas?.closest('.hero');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !hero || !ctx) return;

  const reduced = prefersReducedMotion();
  const trackPointer = hasFinePointer() && !reduced;

  let width = 0;
  let height = 0;
  let nodes = [];
  let packets = [];
  let edges = [];
  let frame = 0;
  let lastTime = 0;
  let sinceSpawn = 0;
  let inView = true;
  let tabVisible = !document.hidden;
  let resizeFrame = 0;
  const pointer = { clientX: 0, clientY: 0, x: 0, y: 0, active: false };

  const readPalette = () => {
    const styles = getComputedStyle(document.documentElement);
    const read = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
    return {
      node: read('--fx-node', '6, 182, 212'),
      link: read('--fx-link', '59, 130, 246'),
      packet: read('--fx-packet', '16, 185, 129')
    };
  };
  let palette = readPalette();

  const createNode = () => {
    const vx = (Math.random() - 0.5) * 0.36;
    const vy = (Math.random() - 0.5) * 0.36;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      bx: vx, by: vy, vx, vy,
      r: 1 + Math.random() * 1.4
    };
  };

  const resize = () => {
    resizeFrame = 0;
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));

    const isSmall = width < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = clamp(Math.round((width * height) / 17000), 16, isSmall ? 34 : 72);
    while (nodes.length < target) nodes.push(createNode());
    nodes.length = Math.min(nodes.length, target);
    nodes.forEach((node) => {
      node.x = Math.min(node.x, width);
      node.y = Math.min(node.y, height);
    });

    if (!frame) draw();
  };

  const update = (dt) => {
    if (pointer.active) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = pointer.clientX - rect.left;
      pointer.y = pointer.clientY - rect.top;
    }

    for (const node of nodes) {
      if (pointer.active) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_DISTANCE * POINTER_DISTANCE && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const pull = (1 - dist / POINTER_DISTANCE) * 0.02 * dt;
          node.vx += (dx / dist) * pull;
          node.vy += (dy / dist) * pull;
        }
      }

      // La velocidad vuelve poco a poco a su deriva natural
      node.vx += (node.bx - node.vx) * 0.02 * dt;
      node.vy += (node.by - node.vy) * 0.02 * dt;
      node.x += node.vx * dt;
      node.y += node.vy * dt;

      if (node.x < 0 || node.x > width) {
        node.vx *= -1;
        node.bx *= -1;
        node.x = clamp(node.x, 0, width);
      }
      if (node.y < 0 || node.y > height) {
        node.vy *= -1;
        node.by *= -1;
        node.y = clamp(node.y, 0, height);
      }
    }

    for (const packet of packets) packet.t += 0.022 * dt;
    packets = packets.filter((packet) => packet.t < 1);

    sinceSpawn += dt;
    if (sinceSpawn > 40 && packets.length < 5 && edges.length) {
      sinceSpawn = 0;
      const pick = Math.floor(Math.random() * (edges.length / 2)) * 2;
      const forward = Math.random() > 0.5;
      packets.push({
        from: nodes[edges[forward ? pick : pick + 1]],
        to: nodes[edges[forward ? pick + 1 : pick]],
        t: 0
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    edges.length = 0;
    ctx.lineWidth = 1;

    // Enlaces entre nodos cercanos
    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;
        const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * 0.32;
        ctx.strokeStyle = `rgba(${palette.link}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        edges.push(i, j);
      }
    }

    // El puntero se conecta a los nodos cercanos
    if (pointer.active) {
      for (const node of nodes) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist > POINTER_DISTANCE) continue;
        const alpha = (1 - dist / POINTER_DISTANCE) * 0.55;
        ctx.strokeStyle = `rgba(${palette.node}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      }
    }

    // Nodos (un solo trazo para todos)
    ctx.fillStyle = `rgba(${palette.node}, 0.75)`;
    ctx.beginPath();
    for (const node of nodes) {
      ctx.moveTo(node.x + node.r, node.y);
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    }
    ctx.fill();

    // Paquetes en tránsito
    for (const packet of packets) {
      const eased = packet.t < 0.5 ? 2 * packet.t * packet.t : 1 - ((-2 * packet.t + 2) ** 2) / 2;
      const x = packet.from.x + (packet.to.x - packet.from.x) * eased;
      const y = packet.from.y + (packet.to.y - packet.from.y) * eased;
      ctx.fillStyle = `rgba(${palette.packet}, 0.18)`;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${palette.packet}, 0.95)`;
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (now) => {
    frame = 0;
    const dt = clamp((now - lastTime) / 16.667, 0.2, 3);
    lastTime = now;
    update(dt);
    draw();
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (reduced || frame || !inView || !tabVisible) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const scheduleResize = () => {
    if (!resizeFrame) resizeFrame = requestAnimationFrame(resize);
  };

  resize();
  // Primer fotograma estático: con reduced-motion es el único
  if (reduced) draw();

  new ResizeObserver(scheduleResize).observe(hero);

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) start(); else stop();
  }).observe(hero);

  document.addEventListener('visibilitychange', () => {
    tabVisible = !document.hidden;
    if (tabVisible) start(); else stop();
  });

  document.addEventListener('themechange', () => {
    palette = readPalette();
    if (!frame) draw();
  });

  if (trackPointer) {
    hero.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.active = true;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { pointer.active = false; });
  }

  start();
}
