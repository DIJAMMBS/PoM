// Portfolio Data Configuration for Miguel Ramón Chávez Santoyo
// Modificar esta estructura para actualizar la información mostrada en el portafolio

const PORTFOLIO_DATA = {
  personalInfo: {
    fullName: "Miguel Ramón Chávez Santoyo",
    primaryTitle: "Junior Systems Engineer",
    secondaryTitles: [
      "Software Engineer",
      "Backend Developer",
      "Mainframe",
      "Unity Developer"
    ],
    heroDescription: "Construyo, mantengo y modernizo sistemas de software, combinando experiencia en backend, automatización, tecnologías Mainframe y desarrollo de aplicaciones.",
    aboutDescription: `Soy Ingeniero Informático titulado y desarrollador de software con experiencia en desarrollo, mantenimiento y soporte de sistemas empresariales.

Durante mi experiencia profesional he participado en proyectos para clientes del sector financiero, principalmente Santander y BBVA, trabajando con tecnologías backend, automatización, procesos Batch y sistemas Mainframe.

Además de mi experiencia corporativa, desarrollé de manera independiente nueve videojuegos para Android utilizando Unity y C#, participando en todo el ciclo de vida de los productos, desde el desarrollo hasta su publicación y mantenimiento.`,
    personalMessage: "Me gusta seguir aprendiendo y enfrentarme a retos que me permitan mejorar, crecer profesionalmente y ampliar mis conocimientos.",
    cvDownloadUrl: "https://github.com/DIJAMMBS/PoM/blob/main/CV/CV.pdf", // Link de descarga del CV en PDF
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mrchavezs/", // Link de LinkedIn
      github: "https://github.com/tu-usuario-placeholder", // Link de GitHub
      googlePlay: "PaginaEnMantenimiento.html", // Link de Google Play
      email: "mailto:miguelchavez250316@gmail.com" // Link de correo electrónico
    }
  },
  stats: [
    { value: "3+", label: "Años de experiencia profesional" },
    { value: "9", label: "Videojuegos desarrollados" },
    { value: "Ingeniería", label: "Informática (Titulado)" },
    { value: "Sector", label: "Financiero (Santander & BBVA)" }
  ],
  experience: [
    {
      company: "Indra Sistemas / Minsait",
      role: "Software Engineer | Backend Developer",
      period: "Marzo 2023 – Julio 2026",
      generalDescription: "Participé en proyectos de desarrollo backend, automatización de procesos, modernización tecnológica y soporte a aplicaciones críticas para clientes del sector financiero, principalmente Santander y BBVA. Durante este periodo colaboré en el desarrollo de microservicios, migración de aplicaciones Java, automatización mediante Shell Script, mantenimiento de aplicaciones Mainframe y monitoreo de procesos Batch, trabajando bajo metodologías ágiles Scrum en equipos multidisciplinarios.",
      technologies: [
        "Java", "Spring Boot", "Shell Script", "JCL", "COBOL", "CICS", "Control-M",
        "PL/SQL", "Linux", "Git", "Maven", "Mockito", "REST API", "Visual Studio Code",
        "Bruno", "ServiceNow", "XINFO", "IDZ", "ESCWA"
      ],
      projects: [
        {
          title: "Obsolescencia SCCC",
          category: "Modernización tecnológica / Backend",
          description: "Participé en la migración de aplicaciones empresariales de Java 8 a Java 17 como parte de un proyecto de modernización tecnológica.",
          responsibilities: [
            "Actualización de dependencias Maven.",
            "Actualización de librerías.",
            "Adecuaciones de scripts Shell.",
            "Corrección y adaptación de pruebas unitarias.",
            "Validación funcional y técnica durante la migración."
          ],
          technologies: ["Java", "Maven", "Nexus", "Shell Script", "Git", "Mockito", "Eclipse", "Visual Studio Code"]
        },
        {
          title: "Gravity — Migración Mainframe a la Nube",
          category: "Mainframe / Cloud Migration / Batch",
          description: "Participé en el monitoreo y administración de procesos Batch durante la migración del Mainframe hacia la plataforma Gravity Cloud.",
          responsibilities: [
            "Monitoreo de procesos Batch utilizando Control-M.",
            "Análisis y resolución de incidencias.",
            "Soporte a ambientes de Producción y Preproducción.",
            "Colaboración con Central Control Batch.",
            "Documentación y seguimiento de incidencias.",
            "Seguimiento de procesos financieros críticos."
          ],
          technologies: ["Control-M", "JCL", "COBOL", "CICS", "Mainframe"]
        },
        {
          title: "BEX de Clients",
          category: "Application Support / Mainframe",
          description: "Brindé soporte a aplicaciones críticas relacionadas con la operación de clientes BBVA.",
          responsibilities: [
            "Análisis y resolución de incidencias.",
            "Monitoreo de procesos diarios.",
            "Corrección de fallas operativas.",
            "Actualización de información de clientes.",
            "Soporte a procesos críticos del negocio."
          ],
          technologies: ["JCL", "COBOL", "CICS", "Mainframe", "IDZ", "XINFO"]
        },
        {
          title: "Desacople Batch — Fondos de Inversión",
          category: "Backend / Microservices",
          description: "Desarrollé un microservicio REST para la consulta de precios de productos financieros utilizando Spring Boot.",
          responsibilities: [
            "Diseño e implementación de soluciones basadas en microservicios.",
            "Desarrollo de API REST.",
            "Pruebas de integración utilizando Bruno.",
            "Colaboración con el equipo backend."
          ],
          technologies: ["Spring Boot", "REST API", "Bruno"]
        },
        {
          title: "Certificación Anual — Secretaría de Finanzas CDMX",
          category: "Automation / Database",
          description: "Desarrollé un script Shell para automatizar la depuración de registros obsoletos en bases de datos.",
          responsibilities: [
            "Desarrollo de scripts Shell.",
            "Implementación de consultas PL/SQL.",
            "Identificación de información susceptible de eliminación.",
            "Validación utilizando Cygwin.",
            "Automatización de tareas de mantenimiento."
          ],
          technologies: ["Shell Script", "PL/SQL", "Cygwin", "MobaXterm", "Virtualización"]
        },
        {
          title: "JCLs Huérfanos y Análisis TRX PB19",
          category: "Mainframe / Batch",
          description: "Analicé incidencias relacionadas con procesos JCL y transacciones Mainframe.",
          responsibilities: [
            "Análisis de incidencias.",
            "Identificación de causas de error.",
            "Implementación de soluciones técnicas.",
            "Mejora de estabilidad y continuidad operativa."
          ],
          technologies: ["JCL", "COBOL", "CICS", "Mainframe"]
        },
        {
          title: "FS-BS Workday",
          category: "Automation",
          description: "Desarrollé scripts Shell para automatizar la transferencia de archivos entre servidores y facilitar la búsqueda y recuperación automatizada de archivos.",
          responsibilities: [
            "Desarrollo de scripts Shell para automatización.",
            "Configuración y prueba de transferencias seguras entre servidores Linux y Windows.",
            "Búsqueda y recuperación automatizada de información basado en patrones definidos."
          ],
          technologies: ["Shell Script", "Linux", "Cygwin", "MobaXterm", "Virtualización"]
        },
        {
          title: "Transformación de Procesos de Nómina",
          category: "Automation",
          description: "Desarrollé scripts Shell para automatizar procesos internos relacionados con la operación de nómina.",
          responsibilities: [
            "Automatización de procesos operativos de nómina.",
            "Validación de procesamiento seguro de datos.",
            "Optimización de scripts en entornos UNIX/Linux."
          ],
          technologies: ["Shell Script", "Linux", "Cygwin", "MobaXterm", "Virtualización"]
        }
      ]
    },
    {
      company: "Independent Game Developer",
      role: "Full Stack Game Developer | Unity Developer",
      period: "Septiembre 2019 – Mayo 2023",
      generalDescription: "Desarrollé de forma independiente nueve videojuegos para dispositivos Android, siendo responsable de todo el ciclo de vida del producto, desde el diseño y programación hasta la publicación y mantenimiento en Google Play Store. Participé en análisis, diseño, desarrollo, pruebas, optimización, publicación y monetización de cada proyecto.",
      technologies: ["Unity", "C#", "Android Studio", "Google Play Console", "Google Play Services", "Google AdMob", "Blender", "Photoshop"],
      isGameDev: true // Bandera especial para aplicar un tratamiento visual creativo
    }
  ],
  games: [
    {
      title: "Tank-Pang",
      type: "Arcade 2.5D",
      shortDescription: "Arcade 2.5D basado en puntuación, con enemigos de múltiples fases, power-ups y dificultad progresiva.",
      technologies: ["Unity", "C#", "2D/3D Physics", "Google Play Services"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Tank-Pang En La Play Store
      colorTheme: "#0ea5e9" // Cyan theme
    },
    {
      title: "Bit-Man",
      type: "Aventura 2.5D",
      shortDescription: "Videojuego de aventura que combina escenarios 2D y 3D con narrativa, exploración y progresión por niveles.",
      technologies: ["Unity", "C#", "Cinemachine", "Level Design"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Bit-Man En La Play Store
      colorTheme: "#8b5cf6" // Violet theme
    },
    {
      title: "Xtreme Maze",
      type: "Exploración 3D",
      shortDescription: "Videojuego 3D de exploración y resolución de laberintos, con selección de personajes, vehículos personalizados e interacción dinámica.",
      technologies: ["Unity", "C#", "3D Navigation", "Custom Vehicles"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Xtreme Maze En La Play Store
      colorTheme: "#10b981" // Emerald theme
    },
    {
      title: "Breaking Blocks",
      type: "Arcade Clásico",
      shortDescription: "Videojuego arcade inspirado en el género Brick Breaker, con sistema de puntuación y progresión.",
      technologies: ["Unity", "C#", "2D Collision", "UI Animation"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Breaking Blocks En La Play Store
      colorTheme: "#f59e0b" // Amber theme
    },
    {
      title: "Digging Dog",
      type: "Endless Runner",
      shortDescription: "Endless Runner 2.5D con generación dinámica de obstáculos y sistema de supervivencia.",
      technologies: ["Unity", "C#", "Dynamic Generation", "Score System"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Digging Dog En La Play Store
      colorTheme: "#ef4444" // Red theme
    },
    {
      title: "Arachne",
      type: "Supervivencia 3D",
      shortDescription: "Videojuego 3D de exploración y supervivencia con inteligencia artificial del enemigo, administración de recursos y sistema de recolección de objetivos.",
      technologies: ["Unity", "C#", "NavMesh AI", "Resource Management", "3D Assets"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Arachne En La Play Store
      colorTheme: "#ec4899" // Pink theme
    },
    {
      title: "Little Blocks",
      type: "Puzzle",
      shortDescription: "Videojuego Puzzle basado en colocación estratégica de piezas y sistema de puntuación.",
      technologies: ["Unity", "C#", "Grid Systems", "Logic Programming"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Little Blocks En La Play Store
      colorTheme: "#06b6d4" // Electric blue theme
    },
    {
      title: "Tec Street",
      type: "Plataformas 2D",
      shortDescription: "Videojuego de plataformas 2D con mecánicas clásicas de desplazamiento lateral.",
      technologies: ["Unity", "C#", "Tilemap", "2D Controller"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Tec Street En La Play Store
      colorTheme: "#6366f1" // Indigo theme
    },
    {
      title: "Fly-Hop",
      type: "Casual",
      shortDescription: "Videojuego casual basado en mecánicas tipo Flappy Bird con temática urbana.",
      technologies: ["Unity", "C#", "Simple Controls", "Parallax Scrolling"],
      storeUrl: "PaginaEnMantenimiento.html", // Link De Fly-Hop En La Play Store
      colorTheme: "#a855f7" // Purple theme
    }
  ],
  skills: {
    lenguajes: ["Java", "C#", "C++", "JavaScript", "Kotlin", "COBOL", "JCL", "Python", "Shell Script"],
    backendDev: ["Spring Boot", "Maven", "Nexus", "Git", "REST API", "Mockito", "Eclipse", "NetBeans", "Visual Studio", "Visual Studio Code", "Spring Tool Suite"],
    mainframe: ["CICS", "JCL", "COBOL", "Control-M", "ESCWA", "XINFO", "IDZ", "Mainframe 390"],
    sistemas: ["Linux", "UNIX", "Windows"],
    tools: ["Cygwin", "MobaXterm", "ServiceNow", "Bruno"],
    gameDev: ["Unity", "C#", "Android Studio", "Google Play Console", "Google Play Services", "Google AdMob"],
    creative3d: ["Blender", "SketchUp", "Photoshop", "Illustrator", "FL Studio", "Filmora"],
    virtualizacion: ["VMware", "VirtualBox"]
  },
  techStackSection: {
    backend: ["Java", "Spring Boot", "Maven", "REST", "Mockito"],
    mainframe: ["COBOL", "JCL", "CICS", "Control-M", "IDZ", "XINFO"],
    automation: ["Shell Script", "Linux", "PL/SQL", "Cygwin", "MobaXterm"],
    gameDev: ["Unity", "C#", "Android Studio", "Google Play", "Google Play Console", "Google Play Services", "Google AdMob"],
    tools: ["Git", "Eclipse", "VS Code", "ServiceNow", "Bruno"],
    virtualization: ["VMware", "VirtualBox"],
    modeling3d: ["Blender", "Google SketchUp"],
    imageEditing: ["Photoshop", "Illustrator"]
  },
  education: {
    degree: "Ingeniería Informática",
    status: "Titulado",
    institution: "Tecnológico de Estudios Superiores de Ecatepec",
    location: "Estado de México",
    period: "2016 – 2021"
  },
  certifications: [
    { title: "Mainframe Host", issuer: "MainWare", date: "Octubre 2025", certificate: "Certificaciones/Host.pdf" },
    { title: "Scrum Master Professional Certificate", issuer: "International Scrum Institute", date: "Octubre 2023", certificate: "Certificaciones/ScrumMaster.pdf" },
    { title: "Complete Agile Scrum Master Certification Training", issuer: "International Scrum Institute", date: "Octubre 2023" },
    { title: "Scrum & Agile: Aprende y Profundiza las Metodologías Ágiles", issuer: "International Scrum Institute", date: "Octubre 2023" },
    { title: "Jenkins, de Cero a Experto: Conviértete en un Jenkins Master", issuer: "Udemy", date: "Julio 2025" },
    { title: "Enterprise Developer for Eclipse Fundamentals", issuer: "Rocket Software", date: "Marzo 2025" },
    { title: "Comandos de Linux: desde cero hasta programar Shell Script", issuer: "Udemy", date: "Marzo 2025" },
    { title: "Programando en COBOL-CICS", issuer: "Udemy", date: "Febrero 2025" },
    { title: "Seguridad de la Información: la aventura continúa", issuer: "INDRA", date: "Octubre 2023" },
    { title: "Ética y Competencia 2023", issuer: "INDRA", date: "Octubre 2023" },
    { title: "Leanmaking White Belt", issuer: "Udemy", date: "Septiembre 2023" },
    { title: "Máster Completo en Java de cero a experto 2023", issuer: "Udemy", date: "Septiembre 2023" },
    { title: "Microservicios con Spring Boot y Spring Cloud nativo eureka", issuer: "INDRA", date: "Septiembre 2023" },
    { title: "Fundamentos de Virtualización", issuer: "TESE", date: "Junio 2021" },
    { title: "Fundamentos de Machine Learning", issuer: "TESE", date: "Junio 2021" },
    { title: "Fundamentos del cómputo en la nube", issuer: "TESE", date: "Abril 2021" },
    { title: "Técnico en Seguridad Informática", issuer: "TESE", date: "Enero 2021" },
    { title: "Técnico en Business Analytics", issuer: "TESE", date: "Enero 2021" }
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Intermedio B1" }
  ],
  competencies: [
    "Desarrollo de software orientado a objetos",
    "Programación en C#",
    "Arquitectura de videojuegos",
    "Diseño UI/UX",
    "Optimización de rendimiento",
    "Gestión del ciclo completo de desarrollo de software",
    "Integración con APIs de Google",
    "Publicación y mantenimiento de aplicaciones Android",
    "Resolución de problemas",
    "Trabajo autónomo",
    "Metodologías Agile / Scrum",
    "Automatización de procesos"
  ]
};
