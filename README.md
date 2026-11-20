# Portafolio Profesional - Henrik Anderson Oloroso García

<div align="center">
  <img src="https://img.shields.io/badge/Despliegue-GitHub_Pages-22c55e?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/Arquitectura-Modular_ES6_%2B_CSS_Modules-3b82f6?style=for-the-badge&logo=javascript&logoColor=white" alt="Arquitectura" />
  <img src="https://img.shields.io/badge/Estado-Producci%C3%B3n-06b6d4?style=for-the-badge" alt="Estado" />
</div>

<br />

> **Técnico en desarrollo de Software**  
> Sitio web personal y portafolio técnico interactivo, desarrollado bajo estándares modernos de desarrollo web, accesibilidad (a11y), modularidad y alto rendimiento sin dependencias externas pesadas.

---

## Despliegue en Vivo

El portafolio se encuentra publicado y accesible de forma continua a través de GitHub Pages:

**[anderson-oloroso.github.io](https://anderson-oloroso.github.io)**

---

## Propósito del Proyecto

Servir como punto de convergencia profesional donde se presentan:
- **Perfil Técnico & Especialidad:** Desarrollo de APIs REST, arquitectura y normalización de bases de datos relacionales (PostgreSQL, MySQL), contenerización con Docker, Prompt Engineering y automatización de flujos de trabajo con n8n.
- **Catálogo de Proyectos Reales:** Demostración práctica con enlaces directos a repositorios de GitHub, tags de tecnologías y especificaciones de arquitectura.
- **Canales de Comunicación Directa:** Enlaces vectorizados a LinkedIn, Correo y GitHub.
- **Experiencia Personalizable:** Selector español/inglés, modo claro/oscuro y una sección dedicada a sus pasatiempos.

---

## Stack Tecnológico & Decisiones de Diseño

### 1. HTML5 Semántico & Accesibilidad
- Jerarquía semántica estricta (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Metadatos optimizados para SEO y Open Graph (vistas previas enriquecidas en redes sociales).
- Atributos ARIA (`aria-expanded`, `aria-controls`, `aria-label`) para compatibilidad con lectores de pantalla.

### 2. CSS3 Modular & Design Tokens
- **Arquitectura en submódulos (`css/modules/`)**: Separación limpia por responsabilidades (variables, estilos base, navegación, hero, stack tecnológico, proyectos y media queries).
- **Design Tokens con Variables CSS (`:root`)**: Control centralizado de colores para los temas claro y oscuro, radios de borde, tipografías y curvas de transición.
- **Layout Responsivo Nativo**: CSS Grid auto-ajustable (`repeat(auto-fit, minmax(...))`) y Flexbox, evitando frameworks pesados y garantizando tiempos de carga casi instantáneos.
- **Respeto a Preferencias del Usuario**: Soporte completo para `@media (prefers-reduced-motion: reduce)`.

### 3. JavaScript Moderno (ES6+ Modules) & Experiencia Cinemática
- **Cero dependencias pesadas**: Código Vanilla puro ejecutado con `<script type="module">`, complementado con librerías hiper-ligeras como Lenis para smooth scrolling.
- **Módulos desacoplados (`js/modules/`)**:
  - `navigation.js`: Control del menú móvil, eventos de teclado (`Escape`) y clics fuera del contenedor.
  - `scrollSpy.js`: Detección eficiente de sección activa con `requestAnimationFrame` y estilo sticky del navbar.
  - `cinematic.js`: Barra superior de progreso de lectura, fondo ambiental interactivo con canvas 2D, parallax cinemático en Hero y smooth scroll con Lenis.
  - `animations.js`: Revelado progresivo escalonado (Staggered Reveal) en scroll utilizando la API nativa `IntersectionObserver`.
  - `interactive.js`: 3D Tilt suave con reflejo especular (glare) en tarjetas, HUD radar de exploración del portafolio y consola interactiva para desarrolladores (Easter egg CLI con atajos `~` y `Ctrl+K`).
  - `projects.js`: Filtros reactivos por categoría tecnológica y panel/modal de inspección rápida de arquitectura y flujo de datos.
  - `lifeExperience.js`: Showcase interactivo y cinematográfico de pasatiempos ("Mi vida fuera del código") con visor dinámico y rotación táctil/teclado.
  - `localization.js`: Traducción completa en tiempo real de la interfaz entre español e inglés, incluidos metadatos, tags y diálogos modales.
  - `theme.js`: Alternancia entre los temas claro y oscuro con persistencia visual.

---

## Arquitectura del Repositorio

```text
Anderson-Oloroso.github.io/
├── index.html                  # Estructura semántica principal y metadatos
├── README.md                   # Documentación técnica del proyecto
├── assets/
│   └── CV_Personalizado_Henrik_Anderson_Oloroso.pdf  # Currículum descargable
├── css/
│   ├── style.css               # Orquestador principal de importaciones
│   └── modules/                # Submódulos organizados por responsabilidad
│       ├── variables.css       # Design tokens y variables de diseño (:root)
│       ├── base.css            # Resets, tipografía, barra de progreso y canvas ambiental
│       ├── navigation.css      # Header, navbar blur, menú móvil y footer
│       ├── hero-about.css      # Hero interactivo y perfil profesional
│       ├── stack.css           # Grid y flexbox de tecnologías y competencias
│       ├── projects-contact.css# Filtros, modal de arquitectura, showcase de vida y contacto
│       ├── interactive.css     # Estilos para 3D Tilt, HUD de lectura y Terminal CLI
│       └── responsive.css      # Media queries y accesibilidad de movimiento
├── js/
│   ├── script.js               # Punto de entrada orquestador
│   └── modules/                # Lógica desacoplada en módulos ES6
│       ├── cinematic.js        # Smooth scroll, barra de lectura, ambient canvas y parallax
│       ├── interactive.js      # 3D Tilt con glare, HUD de progreso y terminal CLI
│       ├── projects.js         # Filtros por categoría y modal de arquitectura técnica
│       ├── lifeExperience.js   # Visor cinemático de vida personal y pasatiempos
│       ├── navigation.js       # Comportamiento del menú móvil y ARIA
│       ├── scrollSpy.js        # Detección de scroll y clase de navbar
│       ├── animations.js       # IntersectionObserver con ritmo escalonado
│       ├── localization.js     # Selector de idioma español/inglés reactivo
│       └── theme.js            # Alternancia de tema claro/oscuro
└── img/
    ├── Hnk.jpeg                # Fotografía profesional de perfil
    ├── favicon.ico             # Favicon oficial del sitio
    ├── ia.svg                  # Icono vectorial para Prompt Engineering
    ├── tutorbot.jpg            # Activo visual del proyecto TutorBot
    └── hobbies/                # Fotografías locales de los pasatiempos
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

2. Ábrelo con cualquier servidor estático local (recomendado para ES6 Modules):
   - **VS Code Live Server**: Clic derecho en `index.html` > *Open with Live Server*.
   - **Python**:
     ```bash
     python -m http.server 8000
     ```
   - **Node.js (npx serve)**:
     ```bash
     npx serve .
     ```

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
  <sub>Última actualización: 21 de octubre de 2026</sub>
</div>
