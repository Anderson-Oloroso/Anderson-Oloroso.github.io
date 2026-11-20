/**
 * MÓDULO DE PROYECTOS EXPLORABLES:
 * - Filtros interactivos por categoría (Backend, Bases de Datos, DevOps, CLI)
 * - Modal / Panel de Inspección Rápida de Arquitectura y detalles técnicos
 */

import { getTranslation } from './localization.js';

const projectsData = {
  'minerva-lib': {
    title: {
      es: 'Minerva-lib — Sistema de gestión de libros para bibliotecas',
      en: 'Minerva-lib — Library Management System'
    },
    badge: 'Full Stack & Docker',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=700&auto=format&fit=crop',
    repoUrl: 'https://github.com/Anderson-Oloroso/minerva-lib.git',
    tags: ['Node.js', 'Express', 'MySQL', 'Docker', 'REST API'],
    overview: {
      es: 'Sistema integral para la administración bibliotecaria moderna con API REST modular y frontend interactivo, empaquetado para despliegue determinista con Docker.',
      en: 'Comprehensive modern library management system with a modular REST API and interactive frontend, containerized for deterministic deployment with Docker.'
    },
    architecture: {
      es: 'Arquitectura MVC desacoplada. El backend en Express gestiona rutas RESTful protegidas para préstamos, usuarios y catálogo. La base de datos MySQL aplica restricciones de integridad referencial e índices de búsqueda rápida.',
      en: 'Decoupled MVC architecture. The Express backend handles protected RESTful routes for book loans, users, and catalog. The MySQL database enforces referential integrity constraints and rapid search indexing.'
    },
    highlights: {
      es: [
        'Contenerización con Docker Compose para backend y motor relacional MySQL.',
        'Manejo de errores centralizado con códigos de estado HTTP estandarizados.',
        'Validación robusta de entradas para evitar registros duplicados.',
        'Arquitectura modular pensada para fácil escalado y mantenimiento.'
      ],
      en: [
        'Multi-container Docker Compose setup for backend and MySQL database.',
        'Centralized error handling pipeline with standardized HTTP status codes.',
        'Strict payload validation preventing duplicated book entries.',
        'Modular design engineered for seamless scalability and maintainability.'
      ]
    }
  },
  'countries-rate-limit': {
    title: {
      es: 'Countries Express Rate Limit — API REST de países',
      en: 'Countries Express Rate Limit — Countries REST API'
    },
    badge: 'API REST & DevOps',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=700&auto=format&fit=crop',
    repoUrl: 'https://github.com/Anderson-Oloroso/countries-express-rate-limit.git',
    tags: ['Node.js', 'Express', 'Docker', 'Rate Limit', 'Postman'],
    overview: {
      es: 'Microservicio RESTful para consulta y gestión de entidades de países con políticas de resiliencia, control estricto de cuotas y contenedorización lista para producción.',
      en: 'RESTful microservice for country data query and management featuring resilience policies, strict traffic rate limiting, and production-ready containerization.'
    },
    architecture: {
      es: 'Middleware pipeline en Express que intercepta solicitudes entrantes aplicando algoritmos de limitación de tasa (rate limiting) para mitigar saturación y abusos DoS. Manejo asíncrono y almacenamiento estructurado en memoria.',
      en: 'Express middleware pipeline that intercepts inbound requests, enforcing rate-limiting algorithms to mitigate denial-of-service and abuse. Asynchronous request handling with structured in-memory data.'
    },
    highlights: {
      es: [
        'Control de concurrencia y límites de solicitudes por ventana de tiempo.',
        'Operaciones CRUD completas con validación de esquemas de datos.',
        'Testeo exhaustivo de endpoints documentado en Postman e Insomnia.',
        'Dockerfile optimizado para despliegues ligeros y reproducibles.'
      ],
      en: [
        'Concurrency throttling and window-based rate limiting safeguards.',
        'Complete CRUD operations with schema-level validation.',
        'End-to-end endpoint testing thoroughly documented in Postman and Insomnia.',
        'Optimized Dockerfile designed for lightweight, reproducible deployments.'
      ]
    }
  },
  'hydra-gym': {
    title: {
      es: 'HYDRA GYM CLI — Sistema de gestión para gimnasio',
      en: 'HYDRA GYM CLI — Gym Management System'
    },
    badge: 'CLI & MySQL',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=700&auto=format&fit=crop',
    repoUrl: 'https://github.com/Anderson-Oloroso/hydra-gym.git',
    tags: ['Node.js', 'JavaScript', 'MySQL', 'CLI', 'Terminal UX'],
    overview: {
      es: 'Sistema de línea de comandos de alta interactividad para gestión de centros fitness, facturación periódica, cálculo de métricas metabólicas e inventario.',
      en: 'High-interactivity command-line management system for fitness clubs, recurring membership billing, metabolic metrics calculation, and operational tracking.'
    },
    architecture: {
      es: 'Patrón Repository desacoplado de la interfaz de consola. Consultas parametrizadas en MySQL para evitar inyecciones SQL, transacciones para cobros y control de membresías activas.',
      en: 'Repository pattern separating CLI views from business logic. Parameterized MySQL queries preventing SQL injection, atomic transactions for billing and membership status validation.'
    },
    highlights: {
      es: [
        'Menús de terminal dinámicos con captura guiada de datos.',
        'Cálculo automatizado de índices de masa corporal (IMC) y requerimientos calóricos.',
        'Módulo contable con balance de ingresos y egresos de caja.',
        'Modelado relacional en MySQL con claves foráneas e integridad referencial.'
      ],
      en: [
        'Dynamic terminal interfaces with guided keyboard input capture.',
        'Automated BMI calculations and tailored caloric requirement estimations.',
        'Integrated accounting module tracking revenue and operational expenses.',
        'Normalized MySQL relational design with strict foreign-key integrity.'
      ]
    }
  },
  'tech-zone': {
    title: {
      es: 'TechZone — Modelo de base de datos para tienda tecnológica',
      en: 'TechZone — Technology Store Database Architecture'
    },
    badge: 'PostgreSQL & PL/pgSQL',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=700&auto=format&fit=crop',
    repoUrl: 'https://github.com/Anderson-Oloroso/tech-zone.git',
    tags: ['PostgreSQL', 'PL/pgSQL', 'RDBMS', 'Data Modeling', 'Triggers'],
    overview: {
      es: 'Modelo de base de datos relacional para e-commerce de hardware y tecnología, optimizado para alto volumen de órdenes y auditoría de transacciones.',
      en: 'Relational database architecture designed for hardware and tech e-commerce, engineered for high-concurrency order processing and audit logging.'
    },
    architecture: {
      es: 'Esquema relacional en 3FN (Tercera Forma Normal). Rutinas avanzadas escritas en PL/pgSQL, triggers automáticos para actualización de stock y procedimientos almacenados para generación de facturas.',
      en: '3NF normalized relational schema. Advanced PL/pgSQL stored procedures, automated database triggers for real-time inventory adjustments, and billing routines.'
    },
    highlights: {
      es: [
        'Triggers y funciones PL/pgSQL para control automático de stock tras ventas.',
        'Procedimientos almacenados para transacciones complejas de órdenes y facturación.',
        'Índices estratégicos para acelerar consultas de catálogo y reportes.',
        'Esquema normalizado para eliminar redundancias y anomalías de actualización.'
      ],
      en: [
        'PL/pgSQL triggers and functions for automatic inventory updates upon sales.',
        'Stored procedures orchestrating multi-table checkout transactions.',
        'Strategic indexing boosting catalog queries and reporting throughput.',
        'Normalized 3NF schema eliminating anomalies and data duplication.'
      ]
    }
  },
  'proyecto-tutorbot': {
    title: {
      es: 'TutorBot — Bot de tutorías académicas en Telegram',
      en: 'TutorBot — Academic Tutoring Telegram Bot'
    },
    badge: 'n8n & Telegram API',
    image: 'img/tutorbot.jpg',
    repoUrl: 'https://github.com/Anderson-Oloroso/proyecto-tutorbot.git',
    tags: ['n8n', 'Telegram API', 'Webhooks', 'Automation', 'Workflow'],
    overview: {
      es: 'Ecosistema automatizado de intermediación y agendamiento entre estudiantes universitarios y tutores mediante webhooks y bots conversacionales.',
      en: 'Automated mediation and scheduling ecosystem connecting university students and tutors through real-time webhooks and conversational Telegram bots.'
    },
    architecture: {
      es: 'Flujos de orquestación en n8n integrados bidireccionalmente con la API de Telegram. Procesamiento de webhooks en tiempo real, validación de horarios y actualización de registros sincronizada.',
      en: 'n8n orchestration workflows integrated with Telegram Bot API. Event-driven webhook processing, appointment validation, and real-time database synchronization.'
    },
    highlights: {
      es: [
        'Gestión de estados conversacionales para registrar peticiones de ayuda.',
        'Notificaciones en tiempo real a tutores según su disponibilidad declarada.',
        'Integración con hojas de cálculo para trazabilidad completa de sesiones.',
        'Reducción drástica del tiempo de emparejamiento tutor-estudiante.'
      ],
      en: [
        'Conversational state handling to intake tutoring requests smoothly.',
        'Real-time automated alerts sent to tutors matching student topics.',
        'Persistent Google Sheets synchronization for session auditing.',
        'Drastic reduction in tutor-student matching turnaround time.'
      ]
    }
  },
  'inventario-tienda': {
    title: {
      es: 'Sistema de gestión de inventario — Python',
      en: 'Store Inventory Management System — Python'
    },
    badge: 'Python CLI',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700&auto=format&fit=crop',
    repoUrl: 'https://github.com/Anderson-Oloroso/inventario-tienda.git',
    tags: ['Python', 'CLI', 'OOP', 'Data Structures', 'Finances'],
    overview: {
      es: 'Herramienta de consola para control de inventario comercial con análisis financiero de existencias y persistencia de catálogo.',
      en: 'Console software utility for commercial inventory management, real-time stock financial evaluation, and catalog persistence.'
    },
    architecture: {
      es: 'Arquitectura modular en Python con orientación a objetos (OOP). Estructuras de datos optimizadas para búsqueda, actualización y cálculo de valoración total de stock.',
      en: 'Object-Oriented Python architecture. High-performance data structures for searching, updating, and computing aggregate inventory valuations.'
    },
    highlights: {
      es: [
        'Control de stock en tiempo real con alertas de nivel crítico.',
        'Módulo financiero que calcula el capital total inmovilizado en almacén.',
        'Validaciones contra tipos de datos inválidos y entradas erróneas.',
        'Estructura limpia con separación de lógica de negocio y presentación en consola.'
      ],
      en: [
        'Real-time stock monitoring with critical-threshold alerts.',
        'Financial intelligence calculation of total capitalized warehouse inventory.',
        'Strict runtime input validation and error containment.',
        'Clean architecture separating business models from CLI rendering.'
      ]
    }
  }
};

export function initProjects() {
  initProjectFilters();
  initProjectInspectorModal();
}

/**
 * Filtros interactivos por categoría de tecnología con Anime.js
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.dataset.filter;

      // Actualizar estado activo en botones
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Micro-rebote cinemático en el botón activo
      if (typeof window.anime === 'function') {
        window.anime({
          targets: btn,
          scale: [0.94, 1.05, 1],
          duration: 300,
          easing: 'easeOutBack'
        });
      }

      // Separar tarjetas coincidentes y no coincidentes
      const matched = [];
      const unmatched = [];

      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        const isMatch = selectedCategory === 'all' || categories.includes(selectedCategory);
        if (isMatch) matched.push(card);
        else unmatched.push(card);
      });

      // Animación suave con Anime.js
      if (typeof window.anime === 'function') {
        // Desvanecer no coincidentes
        if (unmatched.length) {
          window.anime({
            targets: unmatched,
            opacity: [1, 0],
            scale: [1, 0.92],
            duration: 200,
            easing: 'easeInQuad',
            complete: () => {
              unmatched.forEach(card => {
                card.classList.add('filter-hidden');
                card.style.display = 'none';
              });
            }
          });
        }

        // Mostrar y animar en cascada (stagger) los coincidentes
        matched.forEach(card => {
          card.classList.remove('filter-hidden');
          card.style.display = 'flex';
          card.style.opacity = '0';
        });

        window.anime({
          targets: matched,
          opacity: [0, 1],
          translateY: [16, 0],
          scale: [0.94, 1],
          delay: window.anime.stagger(60, { start: 90 }),
          duration: 380,
          easing: 'easeOutCubic',
          complete: () => {
            matched.forEach(c => {
              c.style.transform = '';
              c.style.translate = '';
              c.style.opacity = '1';
            });
          }
        });
      } else {
        // Fallback nativo
        unmatched.forEach(card => {
          card.classList.add('filter-hidden');
          card.style.display = 'none';
        });
        matched.forEach(card => {
          card.classList.remove('filter-hidden');
          card.style.display = 'flex';
          card.style.opacity = '1';
        });
      }
    });
  });
}

/**
 * Modal de inspección de arquitectura rápida
 */
function initProjectInspectorModal() {
  const modal = document.getElementById('project-inspector-modal');
  const backdrop = document.getElementById('project-inspector-backdrop');
  const closeBtn = document.getElementById('project-inspector-close');
  const inspectButtons = document.querySelectorAll('.project-inspect-btn');

  if (!modal) return;

  let currentProjectId = null;

  const openInspector = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    currentProjectId = projectId;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';

    // Rellenar datos
    const titleEl = document.getElementById('inspector-title');
    const badgeEl = document.getElementById('inspector-badge');
    const imgEl = document.getElementById('inspector-img');
    const overviewEl = document.getElementById('inspector-overview');
    const archEl = document.getElementById('inspector-arch');
    const highlightsEl = document.getElementById('inspector-highlights');
    const tagsEl = document.getElementById('inspector-tags');
    const repoBtn = document.getElementById('inspector-repo-link');

    if (titleEl) titleEl.textContent = data.title[lang];
    if (badgeEl) badgeEl.textContent = data.badge;
    if (imgEl) {
      imgEl.src = data.image;
      imgEl.alt = data.title[lang];
    }
    if (overviewEl) overviewEl.textContent = data.overview[lang];
    if (archEl) archEl.textContent = data.architecture[lang];

    if (highlightsEl) {
      highlightsEl.innerHTML = '';
      data.highlights[lang].forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="highlight-bullet">▸</span> <span>${item}</span>`;
        highlightsEl.appendChild(li);
      });
    }

    if (tagsEl) {
      tagsEl.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'project-pill';
        span.textContent = tag;
        tagsEl.appendChild(span);
      });
    }

    if (repoBtn) {
      repoBtn.href = data.repoUrl;
      const repoText = repoBtn.querySelector('[data-i18n]');
      if (repoText) repoText.textContent = getTranslation(lang, 'viewRepository');
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeInspector = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  inspectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.projectId;
      openInspector(id);
    });
  });

  backdrop?.addEventListener('click', closeInspector);
  closeBtn?.addEventListener('click', closeInspector);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeInspector();
    }
  });

  // Actualizar contenido si el idioma cambia mientras está abierto
  document.addEventListener('languagechange', () => {
    if (modal.classList.contains('active') && currentProjectId) {
      openInspector(currentProjectId);
    }
  });
}
