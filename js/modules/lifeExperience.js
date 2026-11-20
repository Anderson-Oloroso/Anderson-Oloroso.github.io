/**
 * MÓDULO DE EXPERIENCIA VISUAL INTERACTIVA - "MI VIDA FUERA DEL CÓDIGO"
 * - Visor cinematográfico de hobbies con spotlight
 * - Transiciones suaves, auto-rotación pausada al interactuar
 * - Control por teclado (flechas) y sincronización con miniaturas
 */

const hobbiesData = [
  {
    id: 'futsal',
    img: 'img/hobbies/futsal.jpg',
    tag: {
      es: 'Deporte & Trabajo en Equipo',
      en: 'Sport & Teamwork'
    },
    title: {
      es: 'Futsal — Agilidad, toma de decisiones y sincronización',
      en: 'Futsal — Agility, decision making and synchronization'
    },
    story: {
      es: 'En espacios reducidos cada segundo cuenta. El futsal me enseña comunicación constante, visión táctica y resolución inmediata de jugadas bajo presión; principios clave que aplico directamente en el trabajo en equipo y la arquitectura backend.',
      en: 'In tight spaces every second matters. Futsal develops constant communication, tactical awareness, and split-second problem solving under pressure; core principles I bring to teamwork and backend engineering.'
    }
  },
  {
    id: 'codm',
    img: 'img/hobbies/codm.jpg',
    tag: {
      es: 'Estrategia & Concentración',
      en: 'Strategy & Focus'
    },
    title: {
      es: 'Call of Duty: Mobile — Reflejos, coordinación y táctica',
      en: 'Call of Duty: Mobile — Reflexes, coordination and tactics'
    },
    story: {
      es: 'El juego competitivo demanda lectura rápida del mapa, anticipación y ejecución coordinada en milisegundos. Es un ejercicio de enfoque sostenido y sincronización grupal para cumplir objetivos críticos.',
      en: 'Competitive gaming requires rapid map reading, anticipation, and split-second coordination. It sharpens sustained focus, rapid reflexes, and squad communication toward high-stakes goals.'
    }
  },
  {
    id: 'calisthenics',
    img: 'img/hobbies/calisthenics.jpg',
    tag: {
      es: 'Fuerza & Disciplina',
      en: 'Strength & Discipline'
    },
    title: {
      es: 'Calistenia — Dominio corporal, constancia y superación',
      en: 'Calisthenics — Body mastery, consistency and grit'
    },
    story: {
      es: 'La calistenia enseña que el progreso sostenible no depende de atajos, sino de técnica precisa, repetición y paciencia. Dominar el propio peso corporal refleja el mismo rigor que escribir código robusto y estructurado.',
      en: 'Calisthenics proves that sustainable progress requires zero shortcuts—only clean technique, consistency, and patience. Mastering bodyweight movement reflects the exact rigor needed to write clean, resilient code.'
    }
  },
  {
    id: 'reading',
    img: 'img/hobbies/reading.jpg',
    tag: {
      es: 'Conocimiento & Pensamiento Crítico',
      en: 'Knowledge & Critical Thinking'
    },
    title: {
      es: 'Leer — Expansión mental, análisis y curiosidad continua',
      en: 'Reading — Mind expansion, analysis and continuous curiosity'
    },
    story: {
      es: 'Sumergirme en libros amplía mis perspectivas, fomenta el pensamiento crítico y nutre una mentalidad de aprendizaje permanente frente a los retos tecnológicos y humanos.',
      en: 'Diving into books broadens perspectives, fosters critical thinking, and fuels a lifelong appetite for learning and analytical problem solving.'
    }
  },
  {
    id: 'walking',
    img: 'img/hobbies/walking.jpg',
    tag: {
      es: 'Claridad & Desconexión',
      en: 'Clarity & Mindfulness'
    },
    title: {
      es: 'Caminar — Despejar la mente y encontrar nuevas perspectivas',
      en: 'Walking — Clearing the mind and gaining fresh perspectives'
    },
    story: {
      es: 'Caminar a paso firme al aire libre es el mejor catalizador para reorganizar ideas, desbloquear problemas lógicos complejos y renovar la energía creativa.',
      en: 'Walking outdoors is the ultimate catalyst for organizing thoughts, resolving complex logical blockers, and renewing creative energy.'
    }
  },
  {
    id: 'family',
    img: 'img/hobbies/family.jpg',
    tag: {
      es: 'Vínculos & Empatía',
      en: 'Bonds & Empathy'
    },
    title: {
      es: 'Compartir con familia y amigos — El verdadero pilar de balance',
      en: 'Spending time with family & friends — The anchor of life balance'
    },
    story: {
      es: 'El tiempo de calidad con las personas que valoro recarga el espíritu, cultiva la empatía y me recuerda el valor fundamental de construir relaciones de confianza y apoyo mutuo.',
      en: 'Quality time with loved ones restores the spirit, builds empathy, and reinforces the fundamental value of mutual support and genuine human connection.'
    }
  },
  {
    id: 'nature',
    img: 'img/hobbies/nature.jpg',
    tag: {
      es: 'Paz & Conexión',
      en: 'Peace & Connection'
    },
    title: {
      es: 'Disfrutar de la naturaleza — Serenidad y armonía viva',
      en: 'Enjoying nature — Serenity and living harmony'
    },
    story: {
      es: 'Contemplar entornos naturales ofrece una pausa esencial ante las pantallas. La naturaleza inspira orden orgánico, equilibrio y respeto por los ecosistemas.',
      en: 'Immersing in natural landscapes offers a restorative pause from digital screens. Nature inspires organic structure, balance, and quiet focus.'
    }
  },
  {
    id: 'adventure',
    img: 'img/hobbies/adventure.jpg',
    tag: {
      es: 'Adrenalina & Superación',
      en: 'Adrenaline & Exploration'
    },
    title: {
      es: 'Aventuras llenas de adrenalina — Salir de la zona de confort',
      en: 'Adrenaline adventures — Stepping beyond comfort zones'
    },
    story: {
      es: 'Explorar terrenos desafiantes y vivir experiencias intensas me impulsa a superar miedos, adaptarme a lo impredecible y abrazar la resiliencia en cada reto.',
      en: 'Exploring challenging terrains and adrenaline-fueled adventures trains resilience, adaptability to the unpredictable, and the courage to push past comfort limits.'
    }
  }
];

export function initLifeExperience() {
  const spotlight = document.getElementById('hobby-spotlight');
  const spotlightBg = document.getElementById('hobby-spotlight-bg');
  const tagEl = document.getElementById('hobby-spotlight-tag');
  const counterEl = document.getElementById('hobby-spotlight-counter');
  const titleEl = document.getElementById('hobby-spotlight-title');
  const storyEl = document.getElementById('hobby-spotlight-story');
  const dotsContainer = document.getElementById('hobby-dots-indicator');
  const prevBtn = document.getElementById('hobby-prev-btn');
  const nextBtn = document.getElementById('hobby-next-btn');
  const hobbyCards = document.querySelectorAll('.hobby-card');

  if (!spotlight || !hobbyCards.length) return;

  let currentIndex = 0;
  let timer = null;
  const total = hobbiesData.length;

  // Generar dots indicadores
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = `hobby-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ver interés ${i + 1}`);
      dot.addEventListener('click', () => {
        setHobby(i);
        restartTimer();
      });
      dotsContainer.appendChild(dot);
    }
  }

  const setHobby = (index) => {
    currentIndex = (index + total) % total;
    const data = hobbiesData[currentIndex];
    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';

    // Transición suave en spotlight
    if (spotlightBg) {
      spotlightBg.style.opacity = '0.35';
      setTimeout(() => {
        spotlightBg.style.backgroundImage = `url('${data.img}')`;
        spotlightBg.style.opacity = '0.9';
      }, 150);
    }

    if (tagEl) tagEl.textContent = data.tag[lang];
    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${total}`;
    if (titleEl) titleEl.textContent = data.title[lang];
    if (storyEl) storyEl.textContent = data.story[lang];

    // Actualizar dots
    const dots = dotsContainer?.querySelectorAll('.hobby-dot');
    dots?.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    // Actualizar tarjetas activas
    hobbyCards.forEach((card, idx) => {
      const isActive = idx === currentIndex;
      card.classList.toggle('active-hobby', isActive);
      card.setAttribute('aria-selected', isActive.toString());
    });
  };

  const next = () => {
    setHobby(currentIndex + 1);
  };

  const prev = () => {
    setHobby(currentIndex - 1);
  };

  prevBtn?.addEventListener('click', () => {
    prev();
    restartTimer();
  });

  nextBtn?.addEventListener('click', () => {
    next();
    restartTimer();
  });

  // Click en tarjetas de la cuadrícula
  hobbyCards.forEach((card, idx) => {
    card.setAttribute('role', 'tab');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => {
      setHobby(idx);
      restartTimer();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setHobby(idx);
        restartTimer();
      }
    });
  });

  // Pausar auto-rotación en hover o focus
  const stopTimer = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const startTimer = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    stopTimer();
    timer = setInterval(next, 5000);
  };

  const restartTimer = () => {
    stopTimer();
    startTimer();
  };

  spotlight.addEventListener('mouseenter', stopTimer);
  spotlight.addEventListener('mouseleave', startTimer);
  spotlight.addEventListener('focusin', stopTimer);
  spotlight.addEventListener('focusout', startTimer);

  // Escuchar cambio de idioma
  document.addEventListener('languagechange', () => {
    setHobby(currentIndex);
  });

  // Inicializar estado
  setHobby(0);
  startTimer();
}
