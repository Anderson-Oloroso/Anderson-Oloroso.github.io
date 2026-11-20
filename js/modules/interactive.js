/**
 * MÓDULO DE INTERACCIONES Y DESCUBRIMIENTO:
 * - 3D Tilt suave con Glare en tarjetas
 * - HUD de Exploración con seguimiento por secciones y logro completado
 * - Terminal interactiva para desarrolladores (Easter egg / CLI)
 */

import { getTranslation } from './localization.js';

export function initInteractive() {
  initCardTilt();
  initExplorationHUD();
  initDevTerminal();
  initMagnetic();
  initRipple();
}

/**
 * 3D Tilt con reflejo especular (glare) en tarjetas interactivas
 */
function initCardTilt() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (prefersReduced || isTouch) return;

  const targetSelector = '.project-card, .spec-box, .experience-card, .hobby-card';
  const cards = document.querySelectorAll(targetSelector);

  cards.forEach(card => {
    card.classList.add('tilt-card-active');

    // Crear capa de glare
    let glare = card.querySelector('.tilt-glare-effect');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare-effect';
      card.appendChild(glare);
    }

    let bounds;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease, border-color 0.25s ease';
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const xPct = x / bounds.width;
      const yPct = y / bounds.height;

      const tiltX = (yPct - 0.5) * -12;
      const tiltY = (xPct - 0.5) * 12;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--glare-x', `${(xPct * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(yPct * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-opacity', '0.75');
    };

    const onMouseLeave = () => {
      card.style.transition = 'transform 0.4s var(--ease-smooth), box-shadow 0.3s ease, border-color 0.3s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.setProperty('--glare-opacity', '0');
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/**
 * HUD de exploración en tiempo real
 */
function initExplorationHUD() {
  const hudProgressText = document.getElementById('hud-progress-text');
  const hudPill = document.getElementById('hud-pill');
  const sections = document.querySelectorAll('section[id]');
  if (!hudProgressText || !sections.length) return;

  const totalSections = sections.length;
  const visited = new Set();
  let toastTriggered = false;

  const updateHUD = () => {
    const progress = Math.round((visited.size / totalSections) * 100);
    hudProgressText.textContent = `${progress}%`;

    if (progress >= 100) {
      hudPill?.classList.add('completed');
      if (!toastTriggered) {
        toastTriggered = true;
        showCompletionToast();
      }
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visited.add(entry.target.id);
        updateHUD();
      }
    });
  }, {
    threshold: 0.25
  });

  sections.forEach(sec => observer.observe(sec));

  function showCompletionToast() {
    let toast = document.getElementById('hud-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hud-toast';
      toast.className = 'hud-toast';
      toast.setAttribute('role', 'status');
      toast.innerHTML = `
        <span class="hud-toast-icon">🚀</span>
        <div class="hud-toast-text">
          <h4 data-i18n="hudToastTitle">¡100% Explorado!</h4>
          <p data-i18n="hudToastDesc">Has recorrido todas las secciones del portafolio.</p>
        </div>
      `;
      document.body.appendChild(toast);
    }

    requestAnimationFrame(() => {
      toast.classList.add('visible');
      setTimeout(() => {
        toast.classList.remove('visible');
      }, 5500);
    });
  }
}

/**
 * Terminal interactiva CLI para desarrolladores (Easter Egg)
 */
function initDevTerminal() {
  const triggerBtn = document.getElementById('terminal-trigger');
  const modal = document.getElementById('dev-terminal-modal');
  const backdrop = document.getElementById('dev-terminal-backdrop');
  const closeBtn = document.getElementById('terminal-close-btn');
  const headerClose = document.getElementById('terminal-header-close');
  const output = document.getElementById('dev-terminal-output');
  const input = document.getElementById('terminal-input');

  if (!modal || !output || !input) return;

  let commandHistory = [];
  let historyIndex = -1;

  const openTerminal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    input.focus();
    if (output.children.length === 0) {
      printWelcome();
    }
  };

  const closeTerminal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggerBtn?.addEventListener('click', openTerminal);
  backdrop?.addEventListener('click', closeTerminal);
  closeBtn?.addEventListener('click', closeTerminal);
  headerClose?.addEventListener('click', closeTerminal);

  // Atajos de teclado: ` (backtick) o Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.key === '`' && !isTypingInInput(e)) || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeTerminal();
    }
  });

  function isTypingInInput(e) {
    const tag = e.target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
  }

  function appendLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function printWelcome() {
    const isEn = document.documentElement.lang === 'en';
    const welcome = isEn
      ? `Anderson Oloroso [Version 2.0.26 - High Performance Shell]<br>Type <span class="cyan">'help'</span> to see available commands or <span class="cyan">'exit'</span> to close.`
      : `Anderson Oloroso [Versión 2.0.26 - Shell de Alto Rendimiento]<br>Escribe <span class="cyan">'help'</span> para ver los comandos o <span class="cyan">'exit'</span> para cerrar.`;

    const banner = `
  __  __               _ _      ____              
 | | | | ___ _ __  _ __(_) | __ |  _ \\  _____   __ 
 | |_| |/ _ \\ '_ \\| '__| | |/ / | | | |/ _ \\ \\ / / 
 |  _  |  __/ | | | |  | |   <  | |_| |  __/\\ V /  
 |_| |_|\\___|_| |_|_|  |_|_|\\_\\ |____/ \\___| \\_/   
    `;

    appendLine(`<pre class="terminal-ascii-art">${banner}</pre>`);
    appendLine(welcome, 'accent');
    appendLine('───────────────────────────────────────────────────────', 'terminal-line');
  }

  const commands = {
    help: () => {
      const isEn = document.documentElement.lang === 'en';
      if (isEn) {
        appendLine('Available commands:', 'accent');
        appendLine('  <span class="cyan">bio</span>        : Professional profile overview');
        appendLine('  <span class="cyan">stack</span>      : Technologies & core tools');
        appendLine('  <span class="cyan">projects</span>   : Featured repositories list');
        appendLine('  <span class="cyan">contact</span>    : Direct channels & social links');
        appendLine('  <span class="cyan">cv</span>         : Download Curriculum Vitae (PDF)');
        appendLine('  <span class="cyan">theme</span>      : Toggle light / dark mode');
        appendLine('  <span class="cyan">matrix</span>     : Cyber matrix visual effect');
        appendLine('  <span class="cyan">clear</span>      : Clear the terminal output');
        appendLine('  <span class="cyan">exit</span>       : Close the terminal');
      } else {
        appendLine('Comandos disponibles:', 'accent');
        appendLine('  <span class="cyan">bio</span>        : Resumen del perfil profesional');
        appendLine('  <span class="cyan">stack</span>      : Tecnologías y herramientas principales');
        appendLine('  <span class="cyan">projects</span>   : Lista de proyectos destacados');
        appendLine('  <span class="cyan">contact</span>    : Enlaces directos de contacto');
        appendLine('  <span class="cyan">cv</span>         : Descargar Currículum Vitae (PDF)');
        appendLine('  <span class="cyan">theme</span>      : Alternar modo día / noche');
        appendLine('  <span class="cyan">matrix</span>     : Efecto visual cyber matrix');
        appendLine('  <span class="cyan">clear</span>      : Limpiar pantalla de la consola');
        appendLine('  <span class="cyan">exit</span>       : Cerrar la terminal');
      }
    },
    bio: () => {
      const isEn = document.documentElement.lang === 'en';
      if (isEn) {
        appendLine('<strong>Henrik Anderson Oloroso García</strong> - Software Development Technician', 'success');
        appendLine('Specialized in REST APIs, relational database normalization (PostgreSQL, MySQL), Docker containerization, n8n automations, and C1 English proficiency.');
      } else {
        appendLine('<strong>Henrik Anderson Oloroso García</strong> - Técnico en Desarrollo de Software', 'success');
        appendLine('Especializado en diseño de APIs REST, bases de datos relacionales normalizadas (PostgreSQL, MySQL), Docker, automatizaciones n8n y nivel de inglés C1.');
      }
    },
    stack: () => {
      appendLine('Tech Stack:', 'accent');
      appendLine('  • <strong>Backend:</strong> Node.js, Express, JavaScript, Python, C++, TypeScript');
      appendLine('  • <strong>Databases:</strong> PostgreSQL, MySQL, PL/pgSQL, pgAdmin 4, MySQL Workbench');
      appendLine('  • <strong>DevOps & Tools:</strong> Docker, Git, GitHub, Postman, Insomnia, VS Code');
      appendLine('  • <strong>Automation & AI:</strong> n8n, Telegram Bot API, Google Sheets API, Prompt Engineering');
    },
    projects: () => {
      appendLine('Featured Projects:', 'accent');
      appendLine('  1. <strong>Minerva-lib:</strong> Library management system (Node.js, Express, MySQL, Docker) <a href="https://github.com/Anderson-Oloroso/minerva-lib.git" target="_blank" style="color:#58a6ff;">[GitHub]</a>');
      appendLine('  2. <strong>Countries Rate Limit:</strong> Robust REST API with rate limits & Docker <a href="https://github.com/Anderson-Oloroso/countries-express-rate-limit.git" target="_blank" style="color:#58a6ff;">[GitHub]</a>');
      appendLine('  3. <strong>HYDRA GYM CLI:</strong> Interactive gym management console <a href="https://github.com/Anderson-Oloroso/hydra-gym.git" target="_blank" style="color:#58a6ff;">[GitHub]</a>');
      appendLine('  4. <strong>TechZone:</strong> E-commerce database model & stored procedures <a href="https://github.com/Anderson-Oloroso/tech-zone.git" target="_blank" style="color:#58a6ff;">[GitHub]</a>');
      appendLine('  5. <strong>TutorBot:</strong> Telegram tutoring automation bot with n8n <a href="https://github.com/Anderson-Oloroso/proyecto-tutorbot.git" target="_blank" style="color:#58a6ff;">[GitHub]</a>');
      appendLine('  6. <strong>Inventario Python:</strong> CLI store inventory management <a href="https://github.com/Anderson-Oloroso/inventario-tienda.git" target="_blank" style="color:#58a6ff;">[GitHub]</a>');
    },
    contact: () => {
      appendLine('Direct Contacts:', 'accent');
      appendLine('  • <strong>Email:</strong> <a href="mailto:o.and871@gmail.com" style="color:#58a6ff;">o.and871@gmail.com</a>');
      appendLine('  • <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/Anderson-oloroso" target="_blank" style="color:#58a6ff;">linkedin.com/in/Anderson-oloroso</a>');
      appendLine('  • <strong>GitHub:</strong> <a href="https://github.com/Anderson-Oloroso" target="_blank" style="color:#58a6ff;">github.com/Anderson-Oloroso</a>');
    },
    cv: () => {
      const link = document.createElement('a');
      link.href = 'assets/CV_Personalizado_Henrik_Anderson_Oloroso.pdf';
      link.download = 'CV_Henrik_Anderson_Oloroso.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      appendLine('✓ Iniciando descarga del CV en formato PDF...', 'success');
    },
    theme: () => {
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.click();
        appendLine('✓ Tema visual alternado con éxito.', 'success');
      }
    },
    matrix: () => {
      appendLine('Iniciando subrutina Matrix...', 'success');
      const chars = '01ABCDEFGHJKLMNOPQRSTUVWXYZ#$%&*+-/<>=~';
      let count = 0;
      const interval = setInterval(() => {
        let stream = '';
        for (let i = 0; i < 48; i++) {
          stream += chars[Math.floor(Math.random() * chars.length)];
        }
        appendLine(stream, 'success');
        count++;
        if (count > 10) {
          clearInterval(interval);
          appendLine('Matriz estabilizada.', 'cyan');
        }
      }, 100);
    },
    clear: () => {
      output.innerHTML = '';
      printWelcome();
    },
    exit: () => {
      closeTerminal();
    },
    close: () => {
      closeTerminal();
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      input.value = '';

      if (!rawCmd) return;

      commandHistory.push(rawCmd);
      historyIndex = commandHistory.length;

      appendLine(`<span class="terminal-prompt-sym">guest@henrik-portfolio:~$</span> ${escapeHTML(rawCmd)}`, 'cmd-echo');

      const cmdKey = rawCmd.toLowerCase();
      if (commands[cmdKey]) {
        commands[cmdKey]();
      } else {
        appendLine(`Comando no reconocido: "${escapeHTML(rawCmd)}". Escribe <span class="cyan">'help'</span> para ver comandos.`, 'error');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

/**
 * Botones magnéticos: atracción suave hacia el puntero (unificado de main)
 */
function initMagnetic() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (prefersReduced || !isFinePointer) return;

  document.querySelectorAll('[data-magnetic]').forEach((element) => {
    const strength = Number.parseFloat(element.dataset.magnetic) || 0.25;
    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - offsetX;
      const centerY = rect.top + rect.height / 2 - offsetY;
      offsetX = (event.clientX - centerX) * strength;
      offsetY = (event.clientY - centerY) * strength;
      element.style.translate = `${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px`;
    }, { passive: true });

    element.addEventListener('pointerleave', () => {
      offsetX = 0;
      offsetY = 0;
      element.style.translate = '';
    });
  });
}

/**
 * Efecto Ripple de onda al pulsar botones y controles (unificado de main)
 */
function initRipple() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const SELECTOR = '.btn, .project-link-btn, .theme-toggle, .contact-tile, .filter-btn, .inspect-btn';

  document.addEventListener('pointerdown', (event) => {
    if (!(event.target instanceof Element) || event.button > 0) return;
    const host = event.target.closest(SELECTOR);
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    host.appendChild(ripple);
  });
}
