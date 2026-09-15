/* ==========================================================================
   APPLICATION LOGIC: Miguel Ramón Chávez Santoyo - Professional Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initTheme();
  initMobileMenu();
  initDynamicContent();
  initCertificateModal();
  initAccordion();
  initCertsToggle();
  initScrollAnimations();
  initHeroCanvas();
  initContactForm();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Check saved theme or user preference
  const savedTheme = localStorage.getItem('theme');
  const userPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && userPrefersLight)) {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  } else {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }

  // Toggle theme click event
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }

    // Dispatch custom event to let canvas redraw in corresponding colors
    window.dispatchEvent(new CustomEvent('theme-changed'));
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileNav) return;

  const toggleMenu = () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // Prevent scroll when open
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close mobile nav when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

/* ==========================================================================
   3. DYNAMIC CONTENT RENDERING FROM DATA.JS
   ========================================================================== */
function initDynamicContent() {
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('PORTFOLIO_DATA not found. Make sure data.js is loaded first.');
    return;
  }

  const data = PORTFOLIO_DATA;

  // A. HERO SECTION
  document.getElementById('hero-name-render').textContent = data.personalInfo.fullName;
  document.getElementById('hero-title-primary').textContent = data.personalInfo.primaryTitle;
  document.getElementById('hero-description-render').textContent = data.personalInfo.heroDescription;

  // Secondary Titles (rendered as badge tags in the slider row)
  const titlesWrapper = document.getElementById('hero-titles-wrapper');
  if (titlesWrapper) {
    titlesWrapper.innerHTML = data.personalInfo.secondaryTitles
      .map(title => `<span class="title-slide-item">${title}</span>`)
      .join(' <span class="title-separator-dot">•</span> ');
  }

  // Social Links & CV
  const cvButtons = document.querySelectorAll('.cv-download-btn');
  cvButtons.forEach(btn => {
    btn.href = data.personalInfo.cvDownloadUrl;
    if (data.personalInfo.cvDownloadUrl === '#') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('El archivo CV PDF estará disponible próximamente en este espacio.');
      });
    }
  });

  const liUrl = data.personalInfo.socialLinks.linkedin;
  const ghUrl = data.personalInfo.socialLinks.github;
  const gpUrl = data.personalInfo.socialLinks.googlePlay;
  const emailUrl = data.personalInfo.socialLinks.email;

  // Set Hero links
  setLinkAttributes('social-linkedin', liUrl);
  setLinkAttributes('social-github', ghUrl);
  setLinkAttributes('social-googleplay', gpUrl);

  // Set Contact links
  setLinkAttributes('contact-linkedin', liUrl);
  setLinkAttributes('contact-github', ghUrl);
  setLinkAttributes('contact-googleplay', gpUrl);
  setLinkAttributes('contact-email', 'https://mail.google.com/mail/?view=cm&fs=1&to=miguelchavez250316@gmail.com');

  document.getElementById('contact-email').setAttribute('target', '_blank');

  if (emailUrl) {
    const emailTxt = emailUrl.replace('mailto:', '');
    const emailEl = document.getElementById('contact-email-text');
    if (emailEl) emailEl.textContent = emailTxt;
  }

  // B. ABOUT ME SECTION
  const paragraphsHtml = data.personalInfo.aboutDescription
    .split('\n\n')
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
  document.getElementById('about-text-render').innerHTML = paragraphsHtml;
  document.getElementById('about-quote-render').textContent = `"${data.personalInfo.personalMessage}"`;

  // Render Stats
  const statsContainer = document.getElementById('about-stats-render');
  if (statsContainer) {
    statsContainer.innerHTML = data.stats.map(stat => `
      <div class="stat-card">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');
  }

  // C. TECH STACK (MI STACK) SECTION
  const stackContainer = document.getElementById('stack-showcase-render');
  if (stackContainer) {
    // Helper to get matching icons (SVG)
    const getStackIcon = (key) => {
      const icons = {
        backend: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        mainframe: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
        automation: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        gameDev: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>`,
        tools: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
        virtualization: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="3" y="15" width="18" height="6" rx="1"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="7" y1="18" x2="7.01" y2="18"/></svg>`,
        modeling3d: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="m3 7 9 5 9-5"/><path d="M12 12v10"/></svg>`,
        imageEditing: `<svg class="stack-widget-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`
      };
      return icons[key] || '';
    };

    const categoryNames = {
      backend: "Backend Development",
      mainframe: "Mainframe Systems",
      automation: "Process Automation",
      gameDev: "Game Development",
      tools: "Engineering Tools",
      virtualization: "Virtualización",
      modeling3d: "Modelado 3D",
      imageEditing: "Edición de Imagen"
    };

    const renderStack = Object.keys(data.techStackSection).map(key => {
      const isGameDev = key === 'gameDev';
      const items = data.techStackSection[key].map(tech => `
        <div class="stack-tech-item">
          <span class="stack-tech-indicator"></span>
          <span>${tech}</span>
        </div>
      `).join('');

      return `
        <div class="stack-widget ${isGameDev ? 'game-dev-stack' : ''} reveal-fade">
          <div class="stack-widget-header">
            ${getStackIcon(key)}
            <h3 class="stack-widget-title">${categoryNames[key]}</h3>
          </div>
          <div class="stack-widget-list">
            ${items}
          </div>
        </div>
      `;
    }).join('');

    stackContainer.innerHTML = renderStack;
  }

  // D. TIMELINE SECTION
  const timelineContainer = document.getElementById('experience-timeline-render');
  if (timelineContainer) {
    const timelineItems = data.experience.map(exp => {
      const isGameDev = exp.isGameDev === true;
      const techBadges = exp.technologies.map(t => `<span class="tag-badge">${t}</span>`).join('');

      let projectsAccordionHtml = '';
      if (exp.projects && exp.projects.length > 0) {
        const projectsList = exp.projects.map((proj, idx) => {
          const respList = proj.responsibilities.map(r => `<li>${r}</li>`).join('');
          const innerTags = proj.technologies.map(t => `<span class="project-inner-tag">${t}</span>`).join('');

          return `
            <div class="project-accordion-card" data-project-id="proj-${idx}">
              <div class="project-accordion-trigger">
                <div class="project-header-left">
                  <span class="project-card-category">${proj.category}</span>
                  <h4 class="project-card-title">${proj.title}</h4>
                </div>
                <svg class="project-accordion-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="project-accordion-content">
                <div class="project-accordion-inner">
                  <p class="project-inner-desc">${proj.description}</p>
                  <div>
                    <h5 class="project-inner-title">Responsabilidades</h5>
                    <ul class="project-responsibilities-list">
                      ${respList}
                    </ul>
                  </div>
                  <div>
                    <h5 class="project-inner-title">Tecnologías</h5>
                    <div class="project-inner-tags">
                      ${innerTags}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        projectsAccordionHtml = `
          <div class="projects-accordion-wrapper">
            <h4 class="projects-accordion-title">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              Proyectos Corporativos Detallados (${exp.projects.length})
            </h4>
            <div class="projects-accordion-grid">
              ${projectsList}
            </div>
          </div>
        `;
      }

      return `
        <div class="timeline-item ${isGameDev ? 'game-dev-item' : ''} reveal-slide-left">
          <div class="timeline-marker"></div>
          <div class="timeline-header-info">
            <h3 class="timeline-company">${exp.company}</h3>
            <div class="timeline-role-row">
              <span class="timeline-role">${exp.role}</span>
              <span class="timeline-period font-mono">${exp.period}</span>
            </div>
          </div>
          <p class="timeline-desc">${exp.generalDescription}</p>
          
          <div class="timeline-tags">
            ${techBadges}
          </div>

          ${projectsAccordionHtml}
        </div>
      `;
    }).join('');

    timelineContainer.innerHTML = timelineItems;
  }

  // E. VIDEO GAMES SECTION (GRID)
  const gamesContainer = document.getElementById('games-grid-render');
  if (gamesContainer) {
    // Generate icons for visual representation
    const getGameIconSVG = (title) => {
      // Return game-related retro SVG templates
      const templates = {
        'Tank-Pang': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><path d="M4 11h16v3H4zM8 8V5h8v3M12 5V2"/><circle cx="6" cy="17" r="2"/><circle cx="12" cy="17" r="2"/><circle cx="18" cy="17" r="2"/></svg>`,
        'Bit-Man': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 14 0v2M19 12l2 2-2 2M15 16h6"/></svg>`,
        'Xtreme Maze': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><path d="M20 20h2M2 20h2M12 2v2M12 20v2M4 12H2M22 12h-2M8 8h8v8H8zM4 4h4v4H4zM16 4h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4z"/></svg>`,
        'Breaking Blocks': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="6" y="20" width="12" height="2" rx="1"/><circle cx="12" cy="14" r="2"/></svg>`,
        'Digging Dog': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><path d="M12 3a6 6 0 0 1 6 6c0 4-4 9-6 12-2-3-6-8-6-12a6 6 0 0 1 6-6z"/><path d="M12 6a3 3 0 0 1 3 3c0 2-2 4-3 5-1-1-3-3-3-5a3 3 0 0 1 3-3z"/></svg>`,
        'Arachne': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5M4.5 4.5l3.5 3.5M16 16l3.5 3.5M19.5 4.5L16 8M8 16l-3.5 3.5"/></svg>`,
        'Little Blocks': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
        'Tec Street': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><path d="M3 21h18M6 21v-4h12v4M10 17v-4h4v4M12 13V8h4"/></svg>`,
        'Fly-Hop': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><path d="M21 12c0-1.66-1.34-3-3-3h-5l-4-4v4H7a4 4 0 0 0-4 4c0 1.66 1.34 3 3 3h12a3 3 0 0 0 3-3z"/><path d="M17 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>`
      };
      return templates[title] || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="game-icon-abstract"><rect x="2" y="6" width="20" height="12" rx="3"/></svg>`;
    };

    const gamesHtml = data.games.map(game => {
      const techTags = game.technologies.map(t => `<span class="game-tech-tag">${t}</span>`).join('');

      // Inline visual customization using hex codes
      return `
        <div class="game-card reveal-fade" style="--card-glow: ${hexToRgbString(game.colorTheme)}">
          <div class="game-visual-mock">
            <div class="game-canvas-effect"></div>
            ${getGameIconSVG(game.title)}
            <span class="game-type-badge">${game.type}</span>
          </div>
          <div class="game-details">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.shortDescription}</p>
            <div class="game-tech-list">
              ${techTags}
            </div>
            
            <a href="${game.storeUrl}" target="_blank" rel="noopener noreferrer" class="game-btn">
              <svg class="game-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Ver en Google Play</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    gamesContainer.innerHTML = gamesHtml;
  }

  // F. TECHNICAL SKILLS SECTION
  const skillsContainer = document.getElementById('skills-categories-render');
  if (skillsContainer) {
    const categoryTitles = {
      lenguajes: { label: "Lenguajes", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>` },
      backendDev: { label: "Backend / Desarrollo", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>` },
      mainframe: { label: "Mainframe", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>` },
      sistemas: { label: "Sistemas Operativos", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` },
      tools: { label: "Herramientas (Tools)", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>` },
      gameDev: { label: "Game Development", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>` },
      creative3d: { label: "3D / Diseño Creativo", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>` },
      virtualizacion: { label: "Virtualización", icon: `<svg class="skills-category-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="3" y="15" width="18" height="6" rx="1"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="7" y1="18" x2="7.01" y2="18"/></svg>` }
    };

    const skillsHtml = Object.keys(data.skills).map(key => {
      const cat = categoryTitles[key];
      const badges = data.skills[key].map(skill => `<span class="skill-badge">${skill}</span>`).join('');
      return `
        <div class="skills-category-card reveal-fade">
          <div class="skills-category-header">
            ${cat.icon}
            <h3 class="skills-category-title">${cat.label}</h3>
          </div>
          <div class="skills-badge-list">
            ${badges}
          </div>
        </div>
      `;
    }).join('');

    skillsContainer.innerHTML = skillsHtml;
  }

  // G. EDUCATION
  const eduCard = document.getElementById('education-card-render');
  if (eduCard) {
    eduCard.innerHTML = `
      <h4 class="edu-degree">${data.education.degree}</h4>
      <span class="edu-status">${data.education.status}</span>
      <p class="edu-institution">${data.education.institution}</p>
      <p class="edu-location">${data.education.location}</p>
      <span class="edu-period font-mono">${data.education.period}</span>
    `;
  }

  // H. LANGUAGES
  const langList = document.getElementById('languages-list-render');
  if (langList) {
    langList.innerHTML = data.languages.map(lang => `
      <li class="lang-item">
        <span class="lang-name">${lang.name}</span>
        <span class="lang-level font-mono">${lang.level}</span>
      </li>
    `).join('');
  }

  // I. COMPETENCIES
  const compGrid = document.getElementById('competencies-grid-render');
  if (compGrid) {
    compGrid.innerHTML = data.competencies.map(comp => `
      <div class="competency-item">
        <span class="competency-bullet"></span>
        <span>${comp}</span>
      </div>
    `).join('');
  }

  // Lista de certificaciones
  const certsList = document.getElementById('certifications-list-render');
  if (certsList) {
    const certsHtml = data.certifications.map((cert, index) => {
      const isHidden = index >= 5;

      const titleHtml = cert.certificate
        ? `
          <button
            type="button"
            class="cert-title cert-link"
            data-certificate="${cert.certificate}"
            data-cert-title="${cert.title}"
            aria-label="Ver certificado: ${cert.title}"
          >

            <span class="cert-link-text">${cert.title}</span>

            <span class="cert-link-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="8" y1="13" x2="16" y2="13"></line>
                <line x1="8" y1="17" x2="14" y2="17"></line>
              </svg>
            </span>
          </button>
        `
        : `<h4 class="cert-title">${cert.title}</h4>`;

      return `
        <li class="cert-item ${isHidden ? 'hidden-cert' : ''}">
          ${titleHtml}
          <div class="cert-meta">
            <span class="cert-issuer">${cert.issuer}</span>
            <span class="cert-date font-mono">${cert.date}</span>
          </div>
        </li>
      `;
    }).join('');

    certsList.innerHTML = certsHtml;
  }
}

// Helper utility to safely configure placeholders or actual URLs
function setLinkAttributes(elementId, url) {
  const element = document.getElementById(elementId);
  if (!element) return;

  if (!url || url === '#' || url.includes('placeholder')) {
    // Styling placeholders safely
    element.href = '#';
    element.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Este enlace estará activo próximamente cuando se configuren las cuentas personales correspondientes.');
    });
  } else {
    element.href = url;
  }
}

// Convert Hex to RGB strings to dynamically configure transparent neon shadows in JS
function hexToRgbString(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/* ==========================================================================
   4. ACCORDION COMPONENT FOR PROJECT DETAILS
   ========================================================================== */
function initAccordion() {
  const triggers = document.querySelectorAll('.project-accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.parentElement;
      const content = card.querySelector('.project-accordion-content');

      // Close other accordions in the same section for grid readability
      const siblingCards = card.parentElement.querySelectorAll('.project-accordion-card');
      siblingCards.forEach(sibling => {
        if (sibling !== card && sibling.classList.contains('expanded')) {
          sibling.classList.remove('expanded');
          sibling.querySelector('.project-accordion-content').style.maxHeight = '0px';
        }
      });

      // Toggle current accordion
      const isExpanded = card.classList.toggle('expanded');

      if (isExpanded) {
        // Animate content height
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  });
}

/* ==========================================================================
   CERTIFICATE MODAL
   ========================================================================== */
function initCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  const overlay = modal?.querySelector('.certificate-modal-overlay');
  const closeBtn = document.getElementById('certificate-modal-close');
  const title = document.getElementById('certificate-modal-title');
  const pdf = document.getElementById('certificate-modal-pdf');
  const certsList = document.getElementById('certifications-list-render');

  if (!modal || !overlay || !closeBtn || !title || !pdf || !certsList) return;

  let lastFocusedElement = null;

  const openModal = (button) => {
    const certificate = button.dataset.certificate;
    const certTitle = button.dataset.certTitle;

    if (!certificate) return;

    lastFocusedElement = document.activeElement;

    title.textContent = certTitle || 'Certificado';
    pdf.src = certificate;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');

    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    // Liberamos el PDF al cerrar
    pdf.src = '';

    document.body.classList.remove('overflow-hidden');

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  // Detecta los certificados que tienen archivo asociado
  certsList.addEventListener('click', (event) => {
    const button = event.target.closest('.cert-link');

    if (!button) return;

    openModal(button);
  });

  // Botón X
  closeBtn.addEventListener('click', closeModal);

  // Clic fuera de la ventana
  overlay.addEventListener('click', closeModal);

  // Tecla ESC
  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      modal.classList.contains('active')
    ) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CERTIFICATIONS COLLAPSIBLE LIST
   ========================================================================== */
function initCertsToggle() {
  const toggleBtn = document.getElementById('certs-toggle-btn');
  const hiddenCerts = document.querySelectorAll('.hidden-cert');

  if (!toggleBtn || hiddenCerts.length === 0) return;

  let isExpanded = false;

  toggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;

    toggleBtn.classList.toggle('expanded', isExpanded);

    hiddenCerts.forEach(cert => {
      if (isExpanded) {
        cert.classList.add('reveal');
      } else {
        cert.classList.remove('reveal');
      }
    });

    const btnText = toggleBtn.querySelector('span');
    if (btnText) {
      btnText.textContent = isExpanded
        ? "Mostrar menos certificaciones"
        : "Ver todas las certificaciones";
    }

    // Scroll back slightly if collapse leaves view high up
    if (!isExpanded) {
      document.getElementById('educacion-certificaciones').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   6. SCROLL ANIMATIONS (INTERSECTION OBSERVER) & ACTIVE SECTION HIGHLIGHTS
   ========================================================================== */
function initScrollAnimations() {
  // A. Scroll Animations Reveal
  const animatedElements = document.querySelectorAll('.reveal-fade, .reveal-slide-left, .reveal-slide-right');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animated to optimize scroll performance
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => revealObserver.observe(el));

  // B. Active Link Navigation Tracking
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');

  const highlightCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Update Desktop Navbar
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        // Update Mobile Navbar
        mobileNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  const highlightObserver = new IntersectionObserver(highlightCallback, {
    threshold: 0.4,
    rootMargin: '-80px 0px -40% 0px' // Adjust bounds based on sticky navbar height
  });

  sections.forEach(sec => highlightObserver.observe(sec));
}

/* ==========================================================================
   7. HERO INTERACTIVE CANVAS (NODE-NETWORK BACKGROUND)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Configuration
  let particles = [];
  const particleCount = 65;
  const maxDistance = 120;

  // Set dimensions
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Color selection based on theme
  let particleColor = 'rgba(0, 216, 255, '; // default cyan
  let connectionColor = 'rgba(139, 92, 246, '; // default violet

  const updateColors = () => {
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
      particleColor = 'rgba(2, 132, 199, ';  // Sky blue
      connectionColor = 'rgba(109, 40, 217, '; // Violet
    } else {
      particleColor = 'rgba(0, 216, 255, ';  // Cyan glow
      connectionColor = 'rgba(139, 92, 246, '; // Violet glow
    }
  };

  // Listen for custom theme change events
  window.addEventListener('theme-changed', updateColors);
  updateColors();

  // Mouse interaction
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle constructor
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6; // subtle speeds
      this.vy = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 2 + 1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor + '0.6)';
      ctx.fill();
    }

    update() {
      // Bounds check
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Gently push away
          this.x -= Math.cos(angle) * force * 1.2;
          this.y -= Math.sin(angle) * force * 1.2;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // Populate particle system
  const createParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };
  createParticles();

  // Connections renderer
  const connect = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);

          // Gradient connection color lines (Cyan to Violet)
          const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          grad.addColorStop(0, particleColor + opacity + ')');
          grad.addColorStop(1, connectionColor + opacity + ')');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  };

  // Main Loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connect();

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  // Cleanup references on reload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMessage = document.getElementById('form-status-message');

  if (!form || !statusMessage) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const submitBtn = form.querySelector('.submit-btn');

    if (!name || !email || !subject || !message) {
      showStatus('Por favor, rellena todos los campos requeridos.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showStatus('Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }

    submitBtn.disabled = true;

    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    btnText.textContent = "Enviando...";

    try {
      const formData = new FormData(form);
      const formDataObject = Object.fromEntries(formData.entries());
      const response = await fetch(
        'https://formsubmit.co/ajax/miguelchavez250316@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formDataObject)
        }
      );

      // Leer la respuesta real de FormSubmit
      const data = await response.json();

      console.log('Respuesta de FormSubmit:', data);

      // Verificar si hubo un error HTTP
      if (!response.ok) {
        throw new Error(
          data?.message || 'FormSubmit rechazó el envío'
        );
      }

      // Verificar si FormSubmit indica explícitamente un error
      if (data?.success === false) {
        throw new Error(
          data?.message || 'FormSubmit no aceptó el envío'
        );
      }

      // Si llegamos aquí, FormSubmit aceptó la solicitud
      showStatus(
        '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.',
        'success'
      );

      form.reset();

    } catch (error) {
      console.error('Error al enviar el formulario:', error);

      showStatus(
        'No se pudo enviar el mensaje. Por favor, inténtalo nuevamente.',
        'error'
      );
    }

    submitBtn.disabled = false;
    btnText.textContent = originalText;
  });

  const showStatus = (msg, type) => {
    statusMessage.textContent = msg;
    statusMessage.className = `form-status ${type}`;

    if (type === 'error') {
      setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = 'form-status';
      }, 5000);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
}