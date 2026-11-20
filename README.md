# Portafolio Profesional - Henrik Anderson Oloroso García

<div align="center">
  <img src="https://img.shields.io/badge/Despliegue-GitHub_Pages-22c55e?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/Arquitectura-Modular_ES6_%2B_CSS_Modules-3b82f6?style=for-the-badge&logo=javascript&logoColor=white" alt="Arquitectura" />
  <img src="https://img.shields.io/badge/Anime.js-v3.2.2-f59e0b?style=for-the-badge&logo=javascript&logoColor=white" alt="Anime.js" />
  <img src="https://img.shields.io/badge/Inmersión-100%25_Cinemática-10b981?style=for-the-badge" alt="Inmersión" />
  <img src="https://img.shields.io/badge/Estado-Producci%C3%B3n-06b6d4?style=for-the-badge" alt="Estado" />
</div>

<br />

> **Técnico en desarrollo de Software**  
> Sitio web personal y portafolio técnico interactivo de alto rendimiento, desarrollado con arquitectura modular, experiencia cinemática exploratoria al 100%, accesibilidad (a11y) y sin dependencias externas pesadas.

---

## Despliegue en Vivo

El portafolio se encuentra publicado y accesible de forma continua a través de GitHub Pages:

**[anderson-oloroso.github.io](https://anderson-oloroso.github.io)**

---

## Propósito del Proyecto

Servir como punto de convergencia profesional e interactivo donde se presentan:
- **Perfil Técnico & Especialidad:** Desarrollo de APIs REST, arquitectura y normalización de bases de datos relacionales (PostgreSQL, MySQL), contenerización con Docker, Prompt Engineering y automatización de flujos con n8n.
- **Catálogo de Proyectos Reales:** Demostración práctica con enlaces directos a repositorios GitHub, tags de tecnologías, filtros animados y modal de inspección de arquitectura técnica por proyecto.
- **Dinámica Lúdica de Descubrimiento («Protocolo Núcleo»):** Minijuego de exploración con 5 nodos de datos cifrados repartidos en las secciones, dossier central de misión, persistencia de progreso y modo visual Overclock como recompensa final.
- **Canales de Comunicación Directa:** LinkedIn, correo y GitHub.
- **Experiencia Personalizable:** Bilingüe (ES/EN) con cambio en tiempo real, modo claro/oscuro y consola CLI interactiva con easter eggs.

---

## Stack Tecnológico & Decisiones de Diseño

### 1. HTML5 Semántico & Accesibilidad
- Jerarquía semántica estricta (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Metadatos optimizados para SEO y Open Graph (vistas previas enriquecidas en redes sociales).
- Atributos ARIA (`aria-expanded`, `aria-controls`, `aria-label`, `aria-hidden`, `role`) en todos los componentes interactivos.
- Soporte completo a `prefers-reduced-motion`: todas las animaciones se desactivan respetando las preferencias del sistema operativo.

### 2. CSS3 Modular & Design Tokens
- **Arquitectura en submódulos (`css/modules/`)**: Separación por responsabilidad: variables, base, navegación, hero, stack, proyectos, interacciones, misión de descubrimiento y media queries.
- **Design Tokens con Variables CSS (`:root`)**: Control centralizado de paleta de colores (modo claro/oscuro), radios de borde, tipografías mono y sans, curvas de transición y profundidades de sombra.
- **Layout Responsivo Nativo**: CSS Grid auto-ajustable (`repeat(auto-fit, minmax(...))`) y Flexbox sin frameworks pesados.
- **Efectos Visuales Avanzados**: Glassmorphism con `backdrop-filter: blur()`, gradientes dinámicos, animación de scanlines para el modo Overclock y efecto glare especular en 3D Tilt.

### 3. JavaScript Moderno (ES6+ Modules) + Anime.js
- **Cero frameworks pesados**: Vanilla JS modular (`<script type="module">`), Anime.js v3.2.2 cargado localmente desde `js/vendor/` para máxima velocidad sin CDN.
- **Módulos desacoplados (`js/modules/`)**:
  - `navigation.js` — Menú móvil hamburguesa, cierre con `Escape` y clics fuera del contenedor, gestión de ARIA.
  - `scrollSpy.js` — Detección de sección activa vía `requestAnimationFrame`; aplica clase `scrolled` al navbar.
  - `cinematic.js` — Barra de progreso de lectura, canvas ambiental 2D interactivo, parallax cinemático en Hero y smooth scroll con Lenis.
  - `animations.js` — Revelado escalonado cinemático con Anime.js (`stagger`, `easeOutExpo`), protección contra saltos de ancla (`hashchange`), fallback de visibilidad (3.5 s) y microinteracción flotante en badges SVG.
  - `cursor.js` — Cursor personalizado con rastro de tela de araña al moverse, efecto de expansión al hacer hover en elementos interactivos.
  - `interactive.js` — 3D Tilt con glare especular en tarjetas, HUD de exploración con interpolación fluida vía Anime.js, chispas cósmicas al clic, efecto magnético en botones y consola CLI interactiva con historial de comandos.
  - `discoveryQuest.js` — Dinámica lúdica **«Protocolo Núcleo»**: 5 nodos cifrados con lore técnico repartidos en el portafolio, animación de desbloqueo con Anime.js + chispas cuánticas, dossier modal con barra de progreso, toast con barra de temporizador y botón de cierre manual, persistencia en `localStorage` y recompensa Overclock al completar los 5/5.
  - `projects.js` — Filtros por categoría con transición escalonada Anime.js en tarjetas y modal de inspección rápida de arquitectura, stack y aspectos técnicos de cada proyecto.
  - `lifeExperience.js` — Visor cinematográfico de pasatiempos con crossfade de fondo (`scale: [1.06, 1]`), entrada escalonada de texto y rotación automática cada 5 segundos.
  - `localization.js` — Sistema i18n reactivo bilingüe (ES/EN): traduce `data-i18n`, `data-i18n-html`, `data-i18n-aria-label`, metadatos SEO, pistas del Protocolo Núcleo y textos de todos los modales. Emite `CustomEvent('languagechange')` para sincronización entre módulos.
  - `theme.js` — Alternancia claro/oscuro con transición circular (`clip-path`) y persistencia en `localStorage`.

---

## Componentes Interactivos Destacados

### 🎯 HUD de Exploración
Cápsula en la barra de navegación que calcula un progreso compuesto entre el scroll continuo del documento y las secciones visitadas. Interpolado fluidamente con Anime.js. Al llegar al 100% muestra un toast de celebración. Al hacer clic, navega a la siguiente sección no explorada.

### 🕹️ Dinámica «Protocolo Núcleo» (Minijuego de Descubrimiento)
5 nodos de datos cifrados ocultos en puntos estratégicos del portafolio:

| Nodo | Ubicación | Fragmento de Conocimiento |
|------|-----------|--------------------------|
| `01` | Hero / Rol profesional | Arquitectura Limpia & Modular |
| `02` | Bloque de Bases de Datos | Persistencia & Normalización SQL |
| `03` | Tarjeta Countries Rate Limit | Blindaje de API & Rate Limiting |
| `04` | Sección «Mi vida» | Automatización & Rendimiento Humano |
| `05` | Terminal CLI (`decode`) | Acceso Root / Shell Kernel |

- Cada nodo al tocarse genera una animación elástica + ráfaga de chispas con Anime.js.
- Toast flotante con temporizador visual y botón `✕` de cierre manual.
- Dossier modal central (`[⚡ Núcleo]` en navbar): barra de progreso, estado por nodo, pista de localización, botón «Rastrear en página».
- Persistencia automática en `localStorage` (`henrik_core_protocol_v1`).
- **Recompensa endgame**: Modo Overclock / Cyber-Matrix (scanlines, acentos reactivos) activable al completar 5/5.

### 💻 Terminal CLI Interactiva
Accesible con el botón `CLI` en el navbar, o con la tecla `` ` `` / `Ctrl+K`. Comandos disponibles:

```
help · bio · stack · projects · contact · cv · theme · matrix · quest · decode · overclock · clear · exit
```

---

## Arquitectura del Repositorio

```text
Anderson-Oloroso.github.io/
├── index.html                     # Estructura semántica, metadatos y todos los modales
├── README.md                      # Documentación técnica del proyecto
├── assets/
│   └── CV_Personalizado_Henrik_Anderson_Oloroso.pdf
├── css/
│   ├── style.css                  # Orquestador de importaciones (@import)
│   └── modules/
│       ├── variables.css          # Design tokens: colores, tipografías, radios, curvas
│       ├── base.css               # Reset, tipografía, cursor personalizado, canvas y progreso
│       ├── navigation.css         # Header, navbar blur, menú móvil, hamburguesa y footer
│       ├── hero-about.css         # Hero, orbes, perfil, especificaciones
│       ├── stack.css              # Grid de tecnologías y competencias
│       ├── projects-contact.css   # Filtros, tarjetas de proyectos, modal inspector y contacto
│       ├── interactive.css        # 3D Tilt + glare, HUD, toast de exploración y Terminal CLI
│       ├── quest.css              # Protocolo Núcleo: nodos, dossier, toast, Overclock
│       └── responsive.css         # Media queries responsivas y prefers-reduced-motion
├── js/
│   ├── script.js                  # Punto de entrada: importa e inicializa todos los módulos
│   ├── vendor/
│   │   └── anime.min.js           # Anime.js v3.2.2 (local, sin CDN)
│   └── modules/
│       ├── animations.js          # Staggered reveal, protección ancla, SVG hover
│       ├── cinematic.js           # Lenis, canvas ambiental, parallax, barra de lectura
│       ├── cursor.js              # Cursor personalizado con tela de araña
│       ├── discoveryQuest.js      # Protocolo Núcleo: nodos, dossier, toast, Overclock, CLI
│       ├── interactive.js         # Tilt 3D, HUD, sparks cósmicos, magnético, Terminal CLI
│       ├── lifeExperience.js      # Visor de pasatiempos con crossfade y auto-rotación
│       ├── localization.js        # i18n reactivo ES/EN con CustomEvent
│       ├── navigation.js          # Menú móvil, ARIA y cierre por teclado
│       ├── projects.js            # Filtros animados y modal de inspección de proyectos
│       ├── scrollSpy.js           # Scroll spy y clase scrolled en navbar
│       ├── theme.js               # Tema claro/oscuro con transición y persistencia
│       └── utils.js               # Funciones utilitarias compartidas
└── img/
    ├── Hnk.jpeg                   # Fotografía de perfil
    ├── favicon.ico
    ├── ia.svg
    ├── tutorbot.jpg
    └── hobbies/                   # Imágenes de pasatiempos
```

---

## Créditos de imagen

La foto de calistenia (`img/hobbies/calisthenics.jpg`) muestra una competencia de dominadas lastradas al aire libre. Original: [Competición de Fuerza](https://commons.wikimedia.org/wiki/File:Competici%C3%B3n_de_Fuerza.jpg), de FESWC, bajo licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

---

## Despliegue Local

Para inspeccionar o ejecutar este portafolio en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Anderson-Oloroso/Anderson-Oloroso.github.io.git
   cd Anderson-Oloroso.github.io
   ```

2. Ábrelo con un servidor estático local (obligatorio para ES6 Modules y `localStorage`):
   - **VS Code Live Server**: Clic derecho en `index.html` > *Open with Live Server*.
   - **Python**:
     ```bash
     python -m http.server 8000
     ```
   - **Node.js (npx serve)**:
     ```bash
     npx serve .
     ```

> **Nota**: No abrir `index.html` directamente desde el sistema de archivos (`file://`). Los ES6 Modules y `localStorage` requieren un servidor HTTP.

---

## Autor

**Henrik Anderson Oloroso García**  
*Técnico en desarrollo de Software*  
Ciudad de Guatemala, Guatemala

- **GitHub:** [@Anderson-Oloroso](https://github.com/Anderson-Oloroso)  
- **LinkedIn:** [linkedin.com/in/Anderson-oloroso](https://www.linkedin.com/in/Anderson-oloroso)  
- **Correo:** [o.and871@gmail.com](mailto:o.and871@gmail.com)

---

<div align="center">
  <sub>Última actualización: 20 de noviembre de 2026</sub>
</div>
