/**
 * MÓDULO LÚDICO DE DESCUBRIMIENTO: "PROTOCOLO NÚCLEO" (CORE PROTOCOL)
 * Permite al visitante descubrir 5 nodos de datos interactivos ocultos en las secciones del portafolio.
 * Integrado con Anime.js para feedback visual cinemático y persistencia en localStorage.
 */

const STORAGE_KEY = 'henrik_core_protocol_v1';

export const CORE_NODES = [
  {
    id: 'node-hero',
    badge: '01',
    icon: '⚡',
    sectionId: 'inicio',
    title: {
      es: 'Nodo 01: Arquitectura Limpia & Modular',
      en: 'Node 01: Clean & Modular Architecture'
    },
    clue: {
      es: 'Pista: Sintonizado en los cimientos del perfil inicial, donde nacen las soluciones escalables.',
      en: 'Clue: Tuned to the foundation of the initial profile, where scalable solutions are born.'
    },
    lore: {
      es: 'Enfoque metódico en separación de responsabilidades, contratos de datos predecibles y APIs desacopladas para mantener alta escalabilidad y fácil mantenimiento.',
      en: 'Methodical approach to separation of concerns, predictable data contracts, and decoupled APIs ensuring high scalability and maintainability.'
    }
  },
  {
    id: 'node-stack',
    badge: '02',
    icon: '💾',
    sectionId: 'conocimientos',
    title: {
      es: 'Nodo 02: Persistencia & Normalización SQL',
      en: 'Node 02: SQL Persistence & Normalization'
    },
    clue: {
      es: 'Pista: Emite telemetría en el bloque de bases de datos relacionales y procedimientos almacenados.',
      en: 'Clue: Emits telemetry in the relational databases and stored procedures block.'
    },
    lore: {
      es: 'Dominio de 3ra Forma Normal (3FN), integridad referencial estricta, índices B-Tree, transacciones ACID y optimización de consultas complejas en PostgreSQL y MySQL.',
      en: 'Mastery of 3rd Normal Form (3NF), strict referential integrity, B-Tree indexing, ACID transactions, and complex query optimization in PostgreSQL and MySQL.'
    }
  },
  {
    id: 'node-project',
    badge: '03',
    icon: '🛡️',
    sectionId: 'proyectos',
    title: {
      es: 'Nodo 03: Blindaje de API & Control de Tasa',
      en: 'Node 03: API Shielding & Rate Limiting'
    },
    clue: {
      es: 'Pista: Oculto en la tarjeta del proyecto con políticas de Rate Limiting y contenedorización Docker.',
      en: 'Clue: Hidden inside the project card featuring Rate Limiting policies and Docker containerization.'
    },
    lore: {
      es: 'Protección activa contra ataques de denegación de servicio (DoS) y fuerza bruta mediante algoritmos de ventana deslizante, cabeceras seguras y validación estricta de payloads.',
      en: 'Active defense against DoS and brute-force attacks via sliding-window algorithms, security headers, and rigorous request payload validations.'
    }
  },
  {
    id: 'node-hobby',
    badge: '04',
    icon: '🔋',
    sectionId: 'vida',
    title: {
      es: 'Nodo 04: Automatización & Rendimiento Humano',
      en: 'Node 04: Automation & Human Peak Performance'
    },
    clue: {
      es: 'Pista: Ubicado en la sección donde la disciplina física y creativa recargan la mente fuera del código.',
      en: 'Clue: Located in the section where physical and creative discipline recharge the mind beyond code.'
    },
    lore: {
      es: 'El equilibrio entre calistenia, deporte, lectura y automatización de tareas libera carga cognitiva y potencia la capacidad analítica para resolver problemas de software complejos.',
      en: 'Balance across calisthenics, sports, reading, and task automation frees cognitive bandwidth, supercharging analytical power to solve complex software challenges.'
    }
  },
  {
    id: 'node-terminal',
    badge: '05',
    icon: '💻',
    sectionId: 'terminal',
    title: {
      es: 'Nodo 05: Acceso Root / Shell Kernel',
      en: 'Node 05: Root Access / Kernel Shell'
    },
    clue: {
      es: 'Pista: Requiere abrir la consola CLI (botón CLI o tecla `) y pulsar el nodo de descifrado o escribir "decode".',
      en: 'Clue: Open the CLI console (CLI button or ` key) and click the decrypt node or type "decode".'
    },
    lore: {
      es: 'Nivel Kernel desbloqueado: Capacidad para ejecutar pipelines automatizados, gestionar contenedores Docker y orquestar microservicios con precisión quirúrgica.',
      en: 'Kernel level unlocked: Capability to execute automated pipelines, manage Docker containers, and orchestrate microservices with surgical precision.'
    }
  }
];

let questState = {
  unlocked: [],
  overclock: false,
  selectedNodeId: null
};

/**
 * Inicializador principal de la misión de descubrimiento
 */
export function initDiscoveryQuest() {
  loadQuestState();
  initNodesOnPage();
  initQuestNavbarTrigger();
  initQuestModal();
  initLanguageSync();
  applyOverclockState(questState.overclock);
  updateQuestUI();
}

/**
 * Carga el progreso desde localStorage
 */
function loadQuestState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.unlocked)) {
        questState.unlocked = parsed.unlocked.filter(id => CORE_NODES.some(n => n.id === id));
      }
      questState.overclock = Boolean(parsed.overclock);
    }
  } catch (e) {
    console.warn('No se pudo acceder a localStorage para el Protocolo Núcleo:', e);
  }
}

/**
 * Guarda el progreso en localStorage
 */
function saveQuestState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      unlocked: questState.unlocked,
      overclock: questState.overclock,
      updatedAt: Date.now()
    }));
  } catch (e) {
    console.warn('Error al guardar en localStorage:', e);
  }
}

/**
 * Vincula los nodos interactivos incrustados en las secciones
 */
function initNodesOnPage() {
  const nodeButtons = document.querySelectorAll('.core-node');
  nodeButtons.forEach(btn => {
    const nodeId = btn.getAttribute('data-node-id');
    if (!nodeId) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleNodeClick(nodeId, btn);
    });
  });
}

/**
 * Maneja el clic sobre un nodo en la página
 */
function handleNodeClick(nodeId, btnEl) {
  const isAlreadyUnlocked = questState.unlocked.includes(nodeId);

  if (!isAlreadyUnlocked) {
    unlockNode(nodeId, btnEl);
  } else {
    // Si ya está desbloqueado, abrir el dossier centrado en este nodo
    openQuestModal(nodeId);
  }
}

/**
 * Desencripta un nodo de datos
 */
export function unlockNode(nodeId, triggerElement = null) {
  const nodeData = CORE_NODES.find(n => n.id === nodeId);
  if (!nodeData) return false;

  if (!questState.unlocked.includes(nodeId)) {
    questState.unlocked.push(nodeId);
    saveQuestState();

    // 1. Efecto visual en el botón del nodo (Anime.js)
    const targetEl = triggerElement || document.querySelector(`.core-node[data-node-id="${nodeId}"]`);
    if (targetEl) {
      targetEl.classList.add('is-unlocked');
      const iconSpan = targetEl.querySelector('.core-node-icon');
      if (iconSpan) iconSpan.textContent = '✓';

      animateNodeUnlock(targetEl);
      spawnCyberSparks(targetEl);
    }

    // 2. Mostrar toast cinematográfico
    showQuestToast(nodeData);

    // 3. Actualizar UI y verificar si completó todos los 5 nodos
    updateQuestUI();

    if (questState.unlocked.length === CORE_NODES.length) {
      triggerQuestVictory();
    }
    return true;
  }
  return false;
}

/**
 * Animación cinemática al desbloquear nodo con Anime.js
 */
function animateNodeUnlock(element) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || typeof window.anime !== 'function') return;

  window.anime({
    targets: element,
    scale: [0.75, 1.28, 1],
    rotate: [0, 360],
    duration: 850,
    easing: 'easeOutElastic(1, .5)'
  });
}

/**
 * Genera chispas cuánticas alrededor del nodo al desencriptar
 */
function spawnCyberSparks(element) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || typeof window.anime !== 'function') return;

  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const count = 14;
  const colors = ['#f59e0b', '#10b981', '#06b6d4', '#fbbf24'];

  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'quest-particle';
    const size = Math.random() * 5 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];

    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.backgroundColor = color;
    spark.style.boxShadow = `0 0 8px ${color}`;
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    document.body.appendChild(spark);

    const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const distance = Math.random() * 50 + 35;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    window.anime({
      targets: spark,
      translateX: destX,
      translateY: destY,
      scale: [1, 0.2],
      opacity: [1, 0],
      duration: Math.random() * 400 + 450,
      easing: 'easeOutExpo',
      complete: () => spark.remove()
    });
  }
}

/**
 * Muestra el toast flotante con la información técnica del fragmento
 */
function showQuestToast(nodeData) {
  const isEn = document.documentElement.lang === 'en';
  const toast = document.getElementById('quest-toast');
  if (!toast) return;

  const tagEl = toast.querySelector('.quest-toast-tag');
  const titleEl = toast.querySelector('.quest-toast-title');
  const loreEl = toast.querySelector('.quest-toast-lore');

  const countUnlocked = questState.unlocked.length;
  const total = CORE_NODES.length;

  if (tagEl) {
    tagEl.textContent = isEn
      ? `NODE DECRYPTED [${countUnlocked}/${total}]`
      : `NODO DESENCRIPTADO [${countUnlocked}/${total}]`;
  }
  if (titleEl) {
    titleEl.textContent = isEn ? nodeData.title.en : nodeData.title.es;
  }
  if (loreEl) {
    loreEl.textContent = isEn ? nodeData.lore.en : nodeData.lore.es;
  }

  toast.classList.add('visible');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && typeof window.anime === 'function') {
    window.anime({
      targets: toast,
      translateY: [-24, 0],
      opacity: [0, 1],
      scale: [0.94, 1],
      duration: 400,
      easing: 'easeOutBack'
    });
  }

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 6000);
}

/**
 * Inicializa el botón disparador en el Navbar
 */
function initQuestNavbarTrigger() {
  const triggerBtn = document.getElementById('quest-trigger');
  if (!triggerBtn) return;

  triggerBtn.addEventListener('click', () => {
    openQuestModal();
  });
}

/**
 * Inicializa el Modal Dossier del Protocolo Núcleo
 */
function initQuestModal() {
  const modal = document.getElementById('quest-modal');
  const backdrop = document.getElementById('quest-backdrop');
  const closeBtn = document.getElementById('quest-modal-close');
  const footerCloseBtn = document.getElementById('quest-footer-close');
  const resetBtn = document.getElementById('quest-reset-btn');
  const trackBtn = document.getElementById('dossier-track-btn');
  const overclockBtn = document.getElementById('overclock-toggle-btn');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  footerCloseBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  resetBtn?.addEventListener('click', () => {
    const isEn = document.documentElement.lang === 'en';
    const confirmMsg = isEn
      ? 'Reset Core Protocol discovery progress?'
      : '¿Reiniciar el progreso del Protocolo Núcleo? Podrás volver a buscar y desencriptar los nodos.';
    if (window.confirm(confirmMsg)) {
      resetQuest();
    }
  });

  trackBtn?.addEventListener('click', () => {
    if (!questState.selectedNodeId) return;
    const nodeData = CORE_NODES.find(n => n.id === questState.selectedNodeId);
    if (!nodeData) return;

    closeModal();

    if (nodeData.id === 'node-terminal') {
      const cliBtn = document.getElementById('terminal-trigger');
      cliBtn?.click();
    } else {
      const section = document.getElementById(nodeData.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nodeBtn = section.querySelector(`.core-node[data-node-id="${nodeData.id}"]`);
          if (nodeBtn) {
            animateNodeUnlock(nodeBtn);
          }
        }, 600);
      }
    }
  });

  overclockBtn?.addEventListener('click', () => {
    toggleOverclock();
  });
}

/**
 * Abre el modal del dossier
 */
export function openQuestModal(nodeIdToSelect = null) {
  const modal = document.getElementById('quest-modal');
  if (!modal) return;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Si se pasa un nodo específico, seleccionarlo; si no, el primer nodo desbloqueado o el primero de la lista
  questState.selectedNodeId = nodeIdToSelect || questState.unlocked[0] || CORE_NODES[0].id;

  renderQuestModalContent();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && typeof window.anime === 'function') {
    window.anime({
      targets: '.quest-node-item',
      opacity: [0, 1],
      translateY: [12, 0],
      delay: window.anime.stagger(50),
      duration: 350,
      easing: 'easeOutCubic'
    });
  }
}

/**
 * Renderiza el contenido dinámico del modal dossier
 */
function renderQuestModalContent() {
  const isEn = document.documentElement.lang === 'en';
  const grid = document.getElementById('quest-nodes-grid');
  const progressVal = document.getElementById('quest-progress-val');
  const progressFill = document.getElementById('quest-progress-fill');
  const overclockBox = document.getElementById('quest-overclock-reward');
  const overclockBtn = document.getElementById('overclock-toggle-btn');

  const count = questState.unlocked.length;
  const total = CORE_NODES.length;
  const pct = Math.round((count / total) * 100);

  if (progressVal) {
    progressVal.textContent = `${pct}% (${count}/${total})`;
  }
  if (progressFill) {
    progressFill.style.width = `${pct}%`;
  }

  // Renderizar los 5 items de la cuadrícula
  if (grid) {
    grid.innerHTML = '';
    CORE_NODES.forEach(node => {
      const isUnlocked = questState.unlocked.includes(node.id);
      const isSelected = questState.selectedNodeId === node.id;

      const item = document.createElement('div');
      item.className = `quest-node-item ${isUnlocked ? 'is-unlocked' : ''} ${isSelected ? 'active-item' : ''}`;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');

      item.innerHTML = `
        <div class="quest-node-item-icon">${isUnlocked ? '✓' : node.badge}</div>
        <div class="quest-node-item-label">Nodo ${node.badge}</div>
        <div class="quest-node-item-status">${isUnlocked ? (isEn ? 'Unlocked' : 'Descifrado') : (isEn ? 'Encrypted' : 'Cifrado')}</div>
      `;

      item.addEventListener('click', () => {
        questState.selectedNodeId = node.id;
        renderQuestModalContent();
      });

      grid.appendChild(item);
    });
  }

  // Renderizar el detalle del nodo seleccionado
  renderSelectedNodeDossier(isEn);

  // Recompensa Overclock al completar los 5 nodos
  if (overclockBox && overclockBtn) {
    if (count === total) {
      overclockBox.style.display = 'flex';
      overclockBtn.textContent = questState.overclock
        ? (isEn ? 'Active (Turn Off)' : 'Activo (Desactivar)')
        : (isEn ? 'Activate' : 'Activar');
      overclockBtn.classList.toggle('is-active', questState.overclock);
    } else {
      overclockBox.style.display = 'none';
    }
  }
}

/**
 * Renderiza el panel de telemetría y detalles del nodo seleccionado
 */
function renderSelectedNodeDossier(isEn) {
  const node = CORE_NODES.find(n => n.id === questState.selectedNodeId) || CORE_NODES[0];
  const isUnlocked = questState.unlocked.includes(node.id);

  const statusTag = document.getElementById('dossier-status-tag');
  const titleEl = document.getElementById('dossier-node-title');
  const descEl = document.getElementById('dossier-node-desc');
  const trackBtn = document.getElementById('dossier-track-btn');

  if (statusTag) {
    statusTag.className = `dossier-status-tag ${isUnlocked ? 'unlocked-tag' : ''}`;
    statusTag.textContent = isUnlocked
      ? (isEn ? `[FRAGMENT ${node.badge} DECRYPTED]` : `[FRAGMENTO ${node.badge} DESENCRIPTADO]`)
      : (isEn ? `[FRAGMENT ${node.badge} ENCRYPTED - LOCKED]` : `[FRAGMENTO ${node.badge} CIFRADO - BLOQUEADO]`);
  }

  if (titleEl) {
    titleEl.textContent = isUnlocked
      ? (isEn ? node.title.en : node.title.es)
      : (isEn ? `Encrypted Data Node #${node.badge}` : `Nodo de Datos Encriptado #${node.badge}`);
  }

  if (descEl) {
    descEl.textContent = isUnlocked
      ? (isEn ? node.lore.en : node.lore.es)
      : (isEn ? node.clue.en : node.clue.es);
  }

  if (trackBtn) {
    trackBtn.style.display = isUnlocked ? 'none' : 'inline-flex';
    const trackSpan = trackBtn.querySelector('span');
    if (trackSpan) {
      trackSpan.textContent = isEn ? 'Track on page' : 'Rastrear en página';
    }
  }
}

/**
 * Actualiza los contadores y clases en el Navbar y la página
 */
function updateQuestUI() {
  const count = questState.unlocked.length;
  const total = CORE_NODES.length;

  const counterEl = document.getElementById('quest-nav-counter');
  const triggerBtn = document.getElementById('quest-trigger');

  if (counterEl) {
    counterEl.textContent = `${count}/${total}`;
  }

  if (triggerBtn) {
    if (count === total) {
      triggerBtn.classList.add('is-completed');
    } else {
      triggerBtn.classList.remove('is-completed');
    }
  }

  // Marcar los nodos desbloqueados en el DOM
  document.querySelectorAll('.core-node').forEach(btn => {
    const id = btn.getAttribute('data-node-id');
    if (questState.unlocked.includes(id)) {
      btn.classList.add('is-unlocked');
      const icon = btn.querySelector('.core-node-icon');
      if (icon) icon.textContent = '✓';
    } else {
      btn.classList.remove('is-unlocked');
      const icon = btn.querySelector('.core-node-icon');
      if (icon) icon.textContent = '◆';
    }
  });
}

/**
 * Reinicia la misión de descubrimiento
 */
export function resetQuest() {
  questState.unlocked = [];
  questState.overclock = false;
  saveQuestState();
  applyOverclockState(false);
  updateQuestUI();
  renderQuestModalContent();

  const isEn = document.documentElement.lang === 'en';
  alert(isEn
    ? 'Core Protocol reset successfully. Happy hunting!'
    : 'Protocolo Núcleo reiniciado. ¡Buena caza de nodos!');
}

/**
 * Alterna el modo Overclock
 */
export function toggleOverclock(forceState = null) {
  questState.overclock = forceState !== null ? forceState : !questState.overclock;
  saveQuestState();
  applyOverclockState(questState.overclock);
  renderQuestModalContent();
  return questState.overclock;
}

/**
 * Aplica el estado visual del Overclock en el <body>
 */
function applyOverclockState(isActive) {
  if (isActive) {
    document.body.classList.add('overclock-active');
  } else {
    document.body.classList.remove('overclock-active');
  }
}

/**
 * Celebración cuando el usuario completa los 5 nodos
 */
function triggerQuestVictory() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && typeof window.anime === 'function') {
    // Ráfaga de confeti estelar
    for (let i = 0; i < 30; i++) {
      const spark = document.createElement('div');
      spark.className = 'quest-particle';
      const size = Math.random() * 8 + 4;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.backgroundColor = i % 2 === 0 ? '#10b981' : '#06b6d4';
      spark.style.left = `${Math.random() * 100}vw`;
      spark.style.top = `${Math.random() * 20 + 10}vh`;
      document.body.appendChild(spark);

      window.anime({
        targets: spark,
        translateY: [0, Math.random() * 300 + 100],
        translateX: [0, (Math.random() - 0.5) * 200],
        rotate: Math.random() * 720,
        opacity: [1, 0],
        duration: Math.random() * 1000 + 1200,
        easing: 'easeOutCubic',
        complete: () => spark.remove()
      });
    }
  }

  // Notificar al usuario con un retardo para que disfrute el momento
  setTimeout(() => {
    openQuestModal();
  }, 1000);
}

/**
 * Sincronización con el selector de idioma
 */
function initLanguageSync() {
  document.addEventListener('languagechange', () => {
    updateQuestUI();
    if (document.getElementById('quest-modal')?.classList.contains('active')) {
      renderQuestModalContent();
    }
  });
}

/**
 * Integración con la consola CLI Terminal
 */
export function handleQuestCliCommand(rawCmd, appendLine, isEn) {
  const parts = rawCmd.trim().split(/\s+/);
  const subCmd = parts[1]?.toLowerCase();

  if (subCmd === 'decode' || subCmd === 'unlock' || rawCmd.toLowerCase() === 'decode') {
    const unlocked = unlockNode('node-terminal');
    if (unlocked) {
      appendLine('🔓 [PROTOCOLO NÚCLEO] Nodo 05: Shell Kernel DESENCRIPTADO con éxito.', 'success');
      appendLine('Acceso root validado. Fragmento de arquitectura registrado en el dossier.', 'cyan');
    } else {
      appendLine('El Nodo 05 (Shell Kernel) ya se encuentra desencriptado en el sistema.', 'accent');
    }
    return;
  }

  if (subCmd === 'overclock' || rawCmd.toLowerCase() === 'overclock') {
    if (questState.unlocked.length < CORE_NODES.length) {
      appendLine(isEn
        ? '⚠️ Overclock Mode locked: Decrypt all 5 Core Protocol nodes first.'
        : '⚠️ Modo Overclock bloqueado: Debes desencriptar primero los 5 nodos del Protocolo Núcleo.', 'error');
    } else {
      const active = toggleOverclock();
      appendLine(active
        ? (isEn ? '⚡ Overclock Mode ACTIVATED.' : '⚡ Modo Overclock ACTIVADO.')
        : (isEn ? 'Overclock Mode DEACTIVATED.' : 'Modo Overclock DESACTIVADO.'), 'success');
    }
    return;
  }

  // Estado general de la misión
  const count = questState.unlocked.length;
  const total = CORE_NODES.length;

  appendLine(isEn ? '── CORE PROTOCOL: DISCOVERY STATUS ──' : '── PROTOCOLO NÚCLEO: ESTADO DE DESCUBRIMIENTO ──', 'accent');
  appendLine(`${isEn ? 'Progress' : 'Progreso'}: <strong>${count}/${total} (${Math.round((count / total) * 100)}%)</strong>`, 'success');

  CORE_NODES.forEach(n => {
    const isUnlocked = questState.unlocked.includes(n.id);
    const title = isEn ? n.title.en : n.title.es;
    const clue = isEn ? n.clue.en : n.clue.es;

    if (isUnlocked) {
      appendLine(`  ✓ <strong>[${n.badge}]</strong> ${title}`, 'success');
    } else {
      appendLine(`  🔒 <strong>[${n.badge}]</strong> ${isEn ? 'ENCRYPTED' : 'CIFRADO'} — ${clue}`, 'cyan');
    }
  });

  appendLine(isEn
    ? `Tip: Type <span class="cyan">'decode'</span> to decrypt Node 05 (Terminal Kernel).`
    : `Pista: Escribe <span class="cyan">'decode'</span> para descifrar el Nodo 05 (Terminal Kernel).`, 'terminal-line');
}
