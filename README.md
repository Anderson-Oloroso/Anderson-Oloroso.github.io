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

### 3. JavaScript Moderno (ES6+ Modules)
- **Cero dependencias externas**: Código Vanilla puro ejecutado con `<script type="module">`.
- **Módulos desacoplados (`js/modules/`)**:
  - `navigation.js`: Control del menú móvil, eventos de teclado (`Escape`) y clics fuera del contenedor.
  - `scrollSpy.js`: Detección eficiente de sección activa con `requestAnimationFrame` y estilo sticky del navbar.
  - `animations.js`: Revelado progresivo en scroll (`IntersectionObserver`) con variantes y escalonado, más la entrada orquestada del hero.
  - `localization.js`: Traducción de la interfaz entre español e inglés, con fundido de textos, metadatos y etiquetas accesibles.
  - `theme.js`: Alternancia entre los temas claro y oscuro con revelado circular (View Transitions API) y fundido como respaldo.
  - `heroCanvas.js`, `parallax.js`, `cursor.js`, `cardEffects.js`, `interactions.js`: capa inmersiva descrita más abajo.

### 4. Capa inmersiva (sin librerías)
Todo está escrito en JavaScript vanilla y CSS: no se añade ninguna dependencia. Cada efecto es una mejora progresiva, se pausa fuera de pantalla y se desactiva con `prefers-reduced-motion`; los efectos de puntero solo se activan con ratón o trackpad.

| Atributo | Efecto |
| --- | --- |
| `data-reveal="up \| left \| right \| scale"` | Variante del revelado en scroll (`up` por defecto) |
| `data-spotlight` | Brillo interior y borde luminoso que siguen al puntero |
| `data-tilt="6"` | Inclinación 3D de hasta 6°; `data-tilt-lift` ajusta la elevación en hover |
| `data-magnetic="0.3"` | El elemento se acerca al puntero (la cifra es la fuerza) |
| `data-parallax="0.2"` / `data-depth="24"` | Parallax del hero por scroll / por posición del puntero |

Además: cursor personalizado con aro de inercia, glow ambiental, barra de progreso de lectura, ripple en botones y un fondo en canvas con una red de nodos y paquetes que viajan entre ellos. Los tokens (colores del canvas, spotlight, elevación y sombras) viven en `css/modules/variables.css`.

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
│       ├── base.css            # Resets, tipografía base y componentes globales
│       ├── navigation.css      # Header, navbar blur, menú móvil y footer
│       ├── hero-about.css      # Hero interactivo y perfil profesional
│       ├── stack.css           # Grid y flexbox de tecnologías y competencias
│       ├── projects-contact.css# Tarjetas de proyectos y canales de contacto
│       ├── effects.css         # Cursor, spotlight, tilt, magnético, ripple y transición de tema
│       └── responsive.css      # Revelado en scroll, media queries y accesibilidad de movimiento
├── js/
│   ├── script.js               # Punto de entrada orquestador
│   └── modules/                # Lógica desacoplada en módulos ES6
│       ├── navigation.js       # Comportamiento del menú móvil y ARIA
│       ├── scrollSpy.js        # Detección de scroll y clase de navbar
│       ├── animations.js       # Revelado en scroll y entrada del hero
│       ├── localization.js     # Selector de idioma español/inglés (con fundido)
│       ├── theme.js            # Alternancia de tema claro/oscuro (con transición)
│       ├── utils.js            # Helpers compartidos (reduced-motion, puntero fino, lerp)
│       ├── heroCanvas.js       # Fondo interactivo del hero (red de nodos)
│       ├── parallax.js         # Parallax por scroll y puntero en el hero
│       ├── cursor.js           # Cursor personalizado y glow ambiental
│       ├── cardEffects.js      # Spotlight y tilt 3D de tarjetas
│       └── interactions.js     # Botones magnéticos y ripple
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
  <sub>Última actualización: 18 de noviembre de 2026</sub>
</div>
