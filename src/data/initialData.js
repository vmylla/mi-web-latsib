/**
 * ------------------------------------------------------------------
 * DATOS INICIALES DEL LABORATORIO LaTSIB
 * ------------------------------------------------------------------
 */

export const INITIAL_CONFIG = {
  nombreGrupo: "LaTSIB",
  nombreCompleto: "Laboratorio de Biomédica Traslacional",
  mision: "El Laboratorio de Biomédica Traslacional (LaTSIB) de la Universidad Tecnológica Metropolitana (UTEM), une la ingeniería, la ciencia de datos y la medicina para transformar datos biológicos complejos en soluciones de salud reales y no invasivas. Desarrollamos investigación aplicada en ingeniería biomédica con un enfoque traslacional, integrando análisis de señales fisiológicas, procesamiento de imágenes médicas, ciencia de datos e inteligencia artificial. Su objetivo es generar conocimiento y soluciones tecnológicas que conecten la investigación en ingeniería con necesidades clínicas reales, contribuyendo al diagnóstico, monitoreo y comprensión de procesos fisiológicos y patológicos.",
  email: "latsibutem@gmail.com",
  direccion: "Av. José Pedro Alessandri 1242, Ñuñoa, Región Metropolitana, Chile",
  year: 2026,
  imagenes: {
    logo: "/logo-circle.png",
    logoUtem: "/logo-utem.png",
    hero: "/image.jpg"
  }
};

export const INITIAL_CATEGORIAS_EQUIPO = [
  { id: 'academicos', titulo: 'Académicos' },
  { id: 'colaboradores', titulo: 'Colaboradores' },
  { id: 'asistentes', titulo: 'Asistentes de Investigación' },
  { id: 'doctorandos', titulo: 'Doctorandos' },
  { id: 'exintegrantes', titulo: 'Exintegrantes' },
];

export const INITIAL_EQUIPO = [
  {
    id: 'm1',
    nombre: "Dr. Raúl Caulier Cisterna",
    categoria: "academicos",
    rol: "Director e Investigador Principal del Laboratorio LaTSIB",
    bio: "PhD en Multimedia y Comunicaciones, Especialista en Biomédica, Machine Learning, Análisis de Señales y Datos",
    img: "https://fing.utem.cl/wp-content/uploads/sites/6/2023/11/Raul-Paul-Caulier-Cisterna.jpg",
    actividadesLab: "Dirección general e investigación principal en el Laboratorio LaTSIB. Liderazgo de proyectos en procesamiento de señales biomédicas (fNIRS, EMG, EEG), machine learning aplicado al diagnóstico clínico y colaboración interdisciplinaria.",
    esTesista: false,
    activo: true,
    orden: 1,
    contactos: {
      linkedin: "https://www.linkedin.com/in/rcaulier/",
      github: "",
      email: "rcaulier@utem.cl",
      orcid: "https://orcid.org/0000-0002-3929-2374",
      scholar: ""
    }
  },
  {
    id: 'm2',
    nombre: "Matías Gajardo De La Fuente",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería civil en computación menc. informática",
    img: "/equipo/MatiasPERFIL.jpg",
    actividadesLab: "El trabajo de Matías se centra en el análisis de señales biomédicas y neurocientíficas, utilizando herramientas de procesamiento y análisis de datos para estudiar respuestas fisiológicas y explorar su potencial aplicación en investigación y diagnóstico.\n\nParticipa en el análisis de la respuesta neurovascular espinal (RNV) mediante fNIRS frente a la estimulación de los nervios tibial posterior y mediano. Además, apoya el análisis espectral de señales acústicas intestinales en modelos murinos, orientado a la caracterización de cólicos y la identificación de posibles biomarcadores diagnósticos.\n\nTambién participa en la comparación de equipamiento neurocientífico, evaluando tecnologías como fNIRS, EEG Bitbrain y eye-tracking Tobii para apoyar futuros estudios colaborativos entre distintos centros de investigación.",
    esTesista: false,
    activo: true,
    orden: 2,
    contactos: {
      linkedin: "https://www.linkedin.com/in/matias-adrian-gajardo-de-la-fuente/",
      github: "https://github.com/xhorus11",
      email: "mgajardod@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm3',
    nombre: "Juan Toledo Fierro",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/JuanPERFIL.jpg",
    esTesista: true,
    activo: true,
    orden: 3,
    actividadesLab: "El trabajo de Juan se centra en la aplicación de inteligencia artificial al procesamiento de señales biomédicas, específicamente en el uso de algoritmos de Self-Supervised Learning para el análisis y generación de señales electrocardiográficas (ECG).\n\nSu investigación busca generar señales ECG sintéticas mediante técnicas de autoaprendizaje, con el objetivo de realizar data augmentation y construir bases de datos más balanceadas, contribuyendo al desarrollo de modelos de inteligencia artificial más robustos para aplicaciones biomédicas.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/juan-crist%C3%B3bal-toledo-fierro-83787129b/",
      github: "",
      email: "jtoledof@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm4',
    nombre: "David Sepúlveda Velásquez",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/DavidPERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 4,
    actividadesLab: "Investigación aplicada al procesamiento de señales fNIRS y caracterización de nuevos biomarcadores funcionales para el estudio de la médula espinal humana.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/david-sepulveda-vel%C3%A1squez-6311602a8/",
      github: "",
      email: "svelasquez@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm5',
    nombre: "Andrés Vega Moraga",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/AndrésPERFIL.jpg",
    esTesista: true,
    activo: true,
    orden: 5,
    actividadesLab: "El trabajo de Andrés se desarrolla en dos áreas principales de desarrollo, combinando la investigación en inteligencia artificial aplicada a señales biomédicas con el desarrollo de herramientas tecnológicas para la educación.\n\nPor un lado, se dedica al desarrollo de Machine Learning y Deep Learning en la investigación de fNIRS en la médula espinal, buscando modelos autoencoder capaces de encontrar características dentro del espacio latente. Esto permite detectar patrones y explorar nuevas aplicaciones, como la modulación de señales y el análisis de cómo variables antropométricas como la edad, el sexo y el IMC pueden inducir cambios en las señales fNIRS.\n\nPor otro lado, trabaja en el desarrollo de una App para el ámbito de la educación, pensada para la planificación de clases de un semestre o año escolar de manera contextualizada. Esta herramienta integra las bases de datos de Objetivos de Aprendizaje (OAs) con la información complementaria proporcionada por el profesor, con el objetivo directo de reducir sus tiempos de trabajo y facilitar el proceso de planificación, utilizando la tecnología como un apoyo concreto para la labor docente.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/andres-nicolas-vega-moraga-950b3128b/",
      github: "",
      email: "avega@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm6',
    nombre: "Clemente Uribe Ortiz",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/ClementePERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 6,
    actividadesLab: "El trabajo de Clemente se desarrolla en la intersección entre inteligencia artificial, aprendizaje automático y análisis de imágenes médicas, buscando desarrollar herramientas capaces de apoyar la detección y caracterización de distintas patologías mediante modelos computacionales.\n\nSu trabajo consiste en desarrollar y evaluar modelos de aprendizaje supervisado (YOLO26-seg, Random Forest/XGBoost) con explicabilidad (SHAP), aplicados a la detección de patologías médicas:\n• Patologías gastrointestinales (segmentación en endoscopías multi-fuente).\n• fNIRS (dolor lumbar y biomarcadores hemodinámicos).\n• Cáncer óseo (análisis de imágenes para apoyo diagnóstico).",
    contactos: {
      linkedin: "https://www.linkedin.com/in/clemente-uribe-18b79a39b/",
      github: "",
      email: "curibeo@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm7',
    nombre: "Glenn Lanyon Lanyon",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/GlennPERFIL.jpg",
    esTesista: true,
    activo: true,
    orden: 7,
    actividadesLab: "El trabajo de Glenn se desarrolla en el área de la investigación de la respuesta neurovascular (RNV) de la médula espinal humana, utilizando tecnologías de espectroscopía funcional para estudiar cómo responde el sistema neurovascular frente a estímulos sucesivos.\n\nSu trabajo se centra en el estudio del período refractario de la respuesta neurovascular (RNV) peri-espinal de la médula espinal humana mediante espectroscopía funcional de infrarrojo cercano (fNIRS), utilizando la señal de oxihemoglobina (O₂Hb) obtenida ante estímulos eléctricos sucesivos del nervio mediano.",
    contactos: {
      linkedin: "",
      github: "",
      email: "glanyon@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm8',
    nombre: "Catalina Araniz Arancibia",
    categoria: "asistentes",
    rol: "Asistente Investigadora",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "/equipo/CatalinaPERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 8,
    actividadesLab: "El trabajo de Catalina se enfoca en la creación de soluciones tecnológicas que conectan el desarrollo de software con la investigación biomédica, buscando facilitar el manejo, análisis y aprovechamiento de grandes volúmenes de información clínica.\n\nParticipa en el desarrollo de DataLab, una herramienta web diseñada para trabajar de manera eficiente con grandes bases de datos clínicas. Además, desarrolla software para la integración y utilización de tecnologías como EEG Bitbrain y eye-tracking Tobii.",
    contactos: {
      linkedin: "",
      github: "https://github.com/cataaraniz",
      email: "caraniz@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm9',
    nombre: "Gabriel Araya López",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Informática",
    img: "/equipo/GabrielPERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 9,
    actividadesLab: "El trabajo de Gabriel se desarrolla en el área de la investigación y visualización de señales biomédicas, buscando transformar información compleja en herramientas que permitan comprender y analizar de manera más clara la respuesta del sistema neurovascular.\n\nSu trabajo se centra en el desarrollo de una plataforma estandarizada para la visualización y análisis de la respuesta neurovascular (RNV) a través de señales e imágenes biomédicas.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/gabriel-ignacio-a-6924b921a/",
      github: "",
      email: "garaya@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm10',
    nombre: "Vicente Escudero Durana",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/VicentePERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 10,
    actividadesLab: "El trabajo de Vicente se centra en la investigación y desarrollo de herramientas de apoyo al diagnóstico mediante inteligencia artificial y procesamiento de señales biomédicas.\n\nActualmente investiga señales acústicas intestinales en modelos murinos como posibles biomarcadores de cólicos. Además, desarrolla una aplicación de apoyo diagnóstico que integra visión artificial y modelos matemáticos para la segmentación de lesiones óseas, contribuyendo a la automatización y análisis de información médica.",
    contactos: {
      linkedin: "",
      github: "",
      email: "vescuderod@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm11',
    nombre: "Camila Guajardo Bravo",
    categoria: "asistentes",
    rol: "Asistente Investigadora",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "/equipo/CamilaPERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 11,
    actividadesLab: "El trabajo de Camila se centra principalmente en la divulgación científica, buscando transformar y comunicar el conocimiento generado en el laboratorio de manera clara, visual y accesible, acercando la investigación científica a la comunidad y a públicos no especializados.\n\nPara ello, desarrolla contenido para redes sociales y plataformas digitales, difundiendo investigaciones, proyectos, publicaciones, seminarios y actividades del laboratorio. También apoya la creación de material gráfico y audiovisual, así como la gestión de su presencia digital y página web.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/camila-millaray-guajardo-bravo-b94297293/",
      github: "https://github.com/vmylla",
      email: "cguajardo@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm12',
    nombre: "Nicolás Frieri Baez",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil Biomédica",
    img: "/equipo/NicolasPERFIL.png",
    esTesista: false,
    activo: true,
    orden: 12,
    actividadesLab: "El trabajo de Nicolás se centra en la investigación y aplicación de inteligencia artificial dentro del proyecto Nuevo Paradigma, contribuyendo al desarrollo y exploración de soluciones basadas en IA.\n\nParticipa como ayudante de investigación, apoyando las distintas etapas del proyecto y colaborando en la incorporación de herramientas de inteligencia artificial a los procesos de investigación e innovación del laboratorio.",
    contactos: {
      linkedin: "",
      github: "",
      email: "nfrieri@utem.cl",
      orcid: "",
      scholar: ""
    }
  },
  {
    id: 'm13',
    nombre: "Lucas Valdebenito Maldonado",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil Biomédica",
    img: "/equipo/LucasPERFIL.jpg",
    esTesista: false,
    activo: true,
    orden: 13,
    actividadesLab: "El trabajo de Lucas se centra en el desarrollo de soluciones basadas en inteligencia artificial, en el marco del proyecto Nuevo Paradigma, explorando nuevas herramientas y metodologías para abordar desafíos de investigación mediante tecnologías de IA, indagando en procesos biomédicos aplicables.\n\nSu participación contempla el desarrollo y aplicación de modelos de inteligencia artificial, contribuyendo a la incorporación de estas tecnologías en los procesos de investigación e innovación del laboratorio.",
    contactos: {
      linkedin: "",
      github: "",
      email: "lvaldebenito@utem.cl",
      orcid: "",
      scholar: ""
    }
  }
];

export const INITIAL_PUBLICACIONES = [
  {
    id: 'p1',
    titulo: "The Effectiveness of NIRS-Based Wearable Devices in Estimating Physical Activity Intensity in Patients with Chronic Non-Communicable Diseases: A Structured Narrative Review",
    revista: "Medical Sciences",
    year: "2026",
    autor: "Raúl Caulier-Cisterna, Andrés Vega-Moraga, Diego Ramos-López y Felipe Contreras-Briceño.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13304124/",
    instagram: "https://www.instagram.com/p/DbdkZhqkUsL/?img_index=1",
    pdf: ""
  },
  {
    id: 'p2',
    titulo: "Altered neurovascular responses recorded after incomplete spinal cord injury recorded by a noninvasive near-infrared spectroscopy in a pilot case-control report",
    revista: "Discover Neuroscience",
    year: "2026",
    autor: "Juan P. Appelgren-Gonzalez, Raúl Caulier-Cisterna, Juan E. Oyarzún, Sergio Uribe y Antonio Eblen-Zajjur.",
    link: "https://link.springer.com/article/10.1186/s13064-026-00266-5",
    instagram: "https://www.instagram.com/p/Dbo5XJaEYa0/?img_index=1",
    pdf: ""
  },
  {
    id: 'p3',
    titulo: "Neonatal anthropometry outcomes comparing two gestational weight gain standards",
    revista: "Obstetrics & Gynecology International Journal",
    year: "2025",
    autor: "Francisco Mardones, Pedro Rosso, Marcelo Farías-Jofré, Sofia Ulloa, Luis Villarroel, Raúl Caulier-Cisterna, Martin Miranda-Hurtado, Álvaro Erazo, Glenn Lanyon-Alarcón.",
    link: "https://medcraveonline.com/OGIJ/neonatal-anthropometry-outcomes-comparing-two-gestational-weight-gain-standards.html",
    instagram: "https://www.instagram.com/p/DYCy6KikVBa/?img_index=1",
    pdf: ""
  },
  {
    id: 'p4',
    titulo: "Clasificación Automática de Señales Deglutorias Utilizando Machine Learning",
    revista: "CASEIB 2025: Libro de Actas del XLIII Congreso Anual de la Sociedad Española de Ingeniería Biomédica",
    year: "2025",
    autor: "Vicente Escudero, David Sepúlveda-Velazquez, Glenn Lanyon-Alarcón, Andrés Vega-Moraga, Jorge Vergara-Quezada, Constanza Echeverria, Rodrigo Tobar-Fredes, Gustavo Schleyer, Patricio Fuentealba, Raúl Caulier-Cisterna et al.",
    link: "https://dialnet.unirioja.es/servlet/articulo?codigo=10695623",
    instagram: "https://www.instagram.com/p/DZYqdwzDNiV/?img_index=1",
    pdf: ""
  },
  {
    id: 'p5',
    titulo: "Spine-fNIRS Web: Interfaz Gráfica Remota para el Análisis y Visualización de Señales de la Respuesta Neurovascular en la Médula Espinal",
    revista: "CASEIB 2025: Libro de Actas del XLIII Congreso Anual de la Sociedad Española de Ingeniería Biomédica",
    year: "2025",
    autor: "Gabriel Araya López, Andrés Vega-Moraga, Glenn Lanyon-Alarcón, Jorge Vergara-Quezada, Sergio Uribe, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna.",
    link: "https://lnkd.in/dgvE2KJa",
    instagram: "https://www.instagram.com/p/DZbQNwQjNvJ/?img_index=1",
    pdf: ""
  },
  {
    id: 'p6',
    titulo: "Interpretable machine learning model for characterizing magnetic susceptibility-based biomarkers in first episode psychosis",
    revista: "Computer Methods and Programs in Biomedicine (Elsevier)",
    year: "2025",
    autor: "Cristian Montalba, Raúl Caulier-Cisterna, Carlos Milovic, Alfonso González, Juan Pablo Ramirez-Mahaluf, Juan Undurraga, Rodrigo Salas, Nicolás Crossley, Cristian Tejos y Sergio Uribe.",
    link: "https://www.sciencedirect.com/science/article/pii/S0169260725004845",
    instagram: "https://www.instagram.com/p/DXz_PtkkbtE/?img_index=1",
    pdf: ""
  },
  {
    id: 'p7',
    titulo: "Sex differences in the prefrontal cortex during exercise",
    revista: "Experimental Physiology",
    year: "2025",
    autor: "Daniel Ramos‐López, Raúl Caulier‐Cisterna, Benjamín Díaz‐Ortiz, Cristóbal Baumann‐Biancani, Kamilo Hunger‐Abbott, Matías Herrera‐Matas, Andrés Vega‐Moraga, Vitor A. Lira, Maximiliano Espinosa‐Ramírez, Karol Ramírez‐Parada, Luigi Gabrielli‐Nervi, Hugo E. Verdejo y Felipe Contreras‐Briceño.",
    link: "https://physoc.onlinelibrary.wiley.com/doi/full/10.1113/EP093287",
    instagram: "",
    pdf: ""
  },
  {
    id: 'p8',
    titulo: "Comparison of LED- and LASER-based fNIRS technologies to record the human peri-spinal cord neurovascular response",
    revista: "Medical Engineering & Physics (Elsevier)",
    year: "2024",
    autor: "Raul Caulier Cisterna M. Id, Juan-Pablo Appelgren-Gonzales, Juan-Esteban Oyarzun, Felipe Valenzuela, Ranganatha Sitaram, Antonio Eblen-Zajjur y Sergio Uribe.",
    link: "https://www.sciencedirect.com/science/article/pii/S1350453324000717",
    instagram: "https://www.instagram.com/p/DWpiJRgEYxO/?img_index=1",
    pdf: ""
  },
  {
    id: 'p9',
    titulo: "Using Near-Infrared Spectroscopy Wearable Devices to Identify Central Versus Peripheral Limitations During Exercise",
    revista: "JoVE, N° 214, e67609",
    year: "2024",
    autor: "Matías Carreño-Román, Daniel Ramos-López, Benjamín Rapaport, Raúl Caulier-Cisterna, Maximiliano Espinosa-Ramírez y Felipe Contreras-Briceño.",
    link: "https://app.jove.com/t/67609/using-near-infrared-spectroscopy-wearable-devices-to-identify-central",
    instagram: "https://www.instagram.com/p/DXAdZIEkdYb/?img_index=1",
    pdf: ""
  }
];

export const INITIAL_ACTIVIDADES = [
  {
    id: 1,
    titulo: "IV Congreso “Vive la Investigación” UTEM 2025",
    fecha: "Octubre 2025",
    lugar: "Universidad Tecnológica Metropolitana, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "Se llevó a cabo la exposición de pósters científicos, donde nuestros integrantes presentaron sus trabajos de investigación desarrollados en el laboratorio, demostrando el compromiso del estudiantado UTEM con el avance de la ciencia y la tecnología.",
    galeria: [
      { url: "/actividades/vive-la-investigacion/AndresVIVE.jpeg", descripcion: "Andrés Vega: Importancia de la desoxihemoglobina en la respuesta neurovascular peri-espinal medida con fNIRS." },
      { url: "/actividades/vive-la-investigacion/MatiasVIVE.jpeg", descripcion: "Matías Gajardo: Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras la estimulación eléctrica del nervio tibial posterior y mediano en voluntarios sanos." },
      { url: "/actividades/vive-la-investigacion/GlennVIVE.jpeg", descripcion: "Glenn Lanyon: Evaluación del periodo refractario neurovascular de la médula espinal con fNIRS utilizando un protocolo de estimulación progresiva." },
      { url: "/actividades/vive-la-investigacion/GabrielVIVE.jpeg", descripcion: "Gabriel Araya: Spine-fNIRS Web: plataforma web para la visualización de la dinámica neurovascular espinal mediante fNIRS." },
      { url: "/actividades/vive-la-investigacion/IgnacioVIVE.jpeg", descripcion: "Ignacio López: Sistema inteligente para optimizar la voz en dispositivos de laringe electrónica." },
      { url: "/actividades/vive-la-investigacion/DavidVIVE.jpeg", descripcion: "David Sepúlveda: Análisis de respuesta neurovascular con nuevos biomarcadores utilizando fNIRS." },
      { url: "/actividades/vive-la-investigacion/JuanVIVE.jpeg", descripcion: "Juan Toledo: De la imagen al conocimiento: integración de OCR, YOLO y RAG en la construcción de un chat-bot médico." },
      { url: "/actividades/vive-la-investigacion/VicenteVIVE.jpeg", descripcion: "Vicente Escudero: Clasificación automática de señales deglutorias utilizando Machine Learning, acompañado por el profesor Dr. Raúl Caulier." }
    ],
    participantes: ["Catalina Araniz", "Andrés Vega", "Matías Gajardo", "Glenn Lanyon", "Gabriel Araya", "Ignacio López", "David Sepúlveda", "Juan Toledo", "Vicente Escudero"]
  },
  {
    id: 2,
    titulo: "2da Jornada de Innovación en Ingeniería Biomédica I+D+I UACh",
    fecha: "Octubre 2025",
    lugar: "Universidad Austral de Chile, Valdivia, Chile",
    tipo: "Nacional",
    descripcion: "Presentación de pósteres de investigación, compartiendo los avances desarrollados en el laboratorio y generando valiosas instancias de conversación científica.",
    galeria: [
      { url: "/actividades/idi/CamilaIDI.jpg", descripcion: "Camila Guajardo: Simulación computacional del modelo de Hodgkin-Huxley aplicado a la dinámica neuronal" },
      { url: "/actividades/idi/JuanIDI.jpg", descripcion: "Juan Toledo: Chatbots Inteligentes para la Medicina: Uniendo visión por computador, lenguaje y datos." },
      { url: "/actividades/idi/VicenteIDI.jpg", descripcion: "Vicente Escudero: Arquitectura CNN 2D para la clasificación de patrones espectrales deglutorios." },
      { url: "/actividades/idi/GlennIDI.jpg", descripcion: "Glenn Lanyon: Registro de la respuesta neurovascular peri-espinal y detección del periodo refractario con espectroscopia funcional de infrarrojo cercano." },
      { url: "/actividades/idi/DavidIDI.jpg", descripcion: "David Sepúlveda: Nuevos biomarcadores para el análisis de la respuesta neurovascular peri-espinal mediante fNIRS." },
      { url: "/actividades/idi/GabrielIDI.jpg", descripcion: "Gabriel Araya: Spine-fNIRS: Interfaz para la visualización la respuesta neurovascular en la medula espinal." },
      { url: "/actividades/idi/MatiasIDI.jpg", descripcion: "Matias Gajardo: Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras la estimulación eléctrica del nervio tibial posterior y mediano en voluntarios sanos." },
      { url: "/actividades/idi/AndresIDI.jpg", descripcion: "Andrés Vega: Explorando la dinámica de la desoxihemoglobina en la medula espinal con fNIRS." }
    ],
    participantes: ["Camila Guajardo", "Catalina Araniz", "Juan Toledo", "Vicente Escudero", "Glenn Lanyon", "David Sepúlveda", "Gabriel Araya", "Matias Gajardo", "Andrés Vega"]
  },
  {
    id: 3,
    titulo: "LXXX Congreso de la Sociedad de Neurología, Psiquiatría y Neurocirugía de Chile (SONEPSYN 2025)",
    fecha: "Octubre 2025",
    lugar: "Gran Hotel Pucón, Pucón, Chile",
    tipo: "Nacional",
    descripcion: "Esta participación tuvo como principal objetivo representar a la UTEM en un evento nacional de alta relevancia científica, fortaleciendo el compromiso del estudiantado con la investigación biomédica y reafirmando la importancia de la formación interdisciplinaria en el ámbito de la salud y la ingeniería.",
    galeria: [
      { url: "/actividades/pucon/PuconGlenn.jpg", descripcion: "Glenn Lanyon: Potenciación de la respuesta neurovascular periespinal gatillada por estimulación eléctrica con pulsos tándem del nervio medial medida con fNIRS en voluntarios sanos" },
      { url: "/actividades/pucon/PuconVicente.jpg", descripcion: "Vicente Escudero: Potenciación de la respuesta neurovascular periespinal gatillada por estimulación eléctrica con pulsos tándem del nervio medial medida con fNIRS en voluntarios sanos" },
      { url: "/actividades/pucon/Pucontodos1.jpg", descripcion: "Equipo: Algunos de los integrantes de LaTSIB, que participaron del congreso" },
      { url: "/actividades/pucon/Pucontodos2.jpg", descripcion: "Equipo: Algunos de los integrantes de LaTSIB, que participaron del congreso" },
      { url: "/actividades/pucon/Pucontodos3.jpg", descripcion: "Equipo: Algunos de los integrantes de LaTSIB, que participaron del congreso" },
      { url: "/actividades/pucon/PuconMati.jpg", descripcion: "Matías Gajardo, Andrés Vega y David Sepúlveda: Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras la estimulación eléctrica de los nervios tibial posterior o mediano en voluntarios sanos" }
    ],
    participantes: ["Dr. Raúl Caulier", "Glenn Lanyon", "Vicente Escudero", "Matías Gajardo", "Andrés Vega", "David Sepúlveda"]
  },
  {
    id: 4,
    titulo: "XLIII Congreso Anual de la Sociedad Española de Ingeniería Biomédica (CASEIB 2025)",
    fecha: "Noviembre 2025",
    lugar: "Universidad de Zaragoza, Zaragoza, España",
    tipo: "Internacional",
    descripcion: "Un entorno que reunió a especialistas de diversas áreas de la ingeniería biomédica, favoreciendo el intercambio científico y nuevas perspectivas para el estudio de la función espinal.",
    galeria: [
      { url: "/actividades/caseib/Presentacion Glenn.jpeg", descripcion: "Glenn Lanyon: Caracterización neurofisiológica de la respuesta neurovascular peri-espinal humana en el diagnóstico funcional de la médula espinal." },
      { url: "/actividades/caseib/Presentacion Vicente.jpeg", descripcion: "Vicente Escudero: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning." },
      { url: "/actividades/caseib/Presentacion Vicente 2.jpeg", descripcion: "Vicente Escudero: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning." },
      { url: "/actividades/caseib/Presentacion Vicente 3.jpeg", descripcion: "Vicente Escudero: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning." }
    ],
    participantes: ["Glenn Lanyon", "Vicente Escudero"]
  },
  {
    id: 5,
    titulo: "18° versión del Congreso Anual de Ingeniería Biomédica (CAIB 2025)",
    fecha: "Noviembre 2025",
    lugar: "Universidad de Concepción, Concepción, Chile",
    tipo: "Nacional",
    descripcion: "Nuestros integrantes expusieron trabajos en las áreas de neuroimagen, biomarcadores y tecnologías asistivas, contribuyendo a la discusión científica desde diversas líneas del laboratorio.",
    galeria: [
      { url: "/actividades/caib/PresentacionDavid.jpeg", descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”." },
      { url: "/actividades/caib/PresentacionDavid2.jpeg", descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”." },
      { url: "/actividades/caib/PresentacionDavid3.jpeg", descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”." },
      { url: "/actividades/caib/PresentacionMati.jpeg", descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos." },
      { url: "/actividades/caib/PresentacionMati2.jpeg", descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos." },
      { url: "/actividades/caib/PresentacionMati3.jpeg", descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos." },
      { url: "/actividades/caib/PaperIgnacio.jpeg", descripcion: "Ignacio López: Sistema inteligente para optimizar la voz en dispositivos de laringe electrónica (póster científico)." },
      { url: "/actividades/caib/EntradaJuan.jpeg", descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica." },
      { url: "/actividades/caib/EntradaDavid.jpeg", descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica." },
      { url: "/actividades/caib/EntradaMati.jpeg", descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica." },
      { url: "/actividades/caib/EntradaEntradaIgnacio.jpeg", descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica." },
      { url: "/actividades/caib/Grupal.jpeg", descripcion: "Fotografías grupales de los participantes del evento." },
      { url: "/actividades/caib/Grupal2.jpeg", descripcion: "Fotografías grupales de los participantes del evento." },
      { url: "/actividades/caib/EntradaGrupal.jpeg", descripcion: "Fotografías grupales de los participantes del evento." }
    ],
    participantes: ["David Sepúlveda", "Matías Gajardo", "Ignacio López", "Juan Toledo"]
  },
  {
    id: 6,
    titulo: "Capacita+",
    fecha: "Diciembre 2025",
    lugar: "Casa Central UTEM, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "Participación de parte del equipo del laboratorio en Capacita+, instancia que reunió a estudiantes y profesionales en la Universidad Tecnológica Metropolitana en torno al fortalecimiento de competencias tecnológicas y el desarrollo de soluciones innovadoras.",
    galeria: [
      { url: "/actividades/capacita+/3.jpeg", descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo representaron al laboratorio con compromiso y motivación." },
      { url: "/actividades/capacita+/4.jpeg", descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo representaron al laboratorio con compromiso y motivación." },
      { url: "/actividades/capacita+/1.jpeg", descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo: Aprendiendo IA con Google Cloud." },
      { url: "/actividades/capacita+/2.jpeg", descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo: Aprendiendo IA con Google Cloud." }
    ],
    participantes: ["Gabriel Araya", "Juan Toledo", "Matías Gajardo", "Camila Guajardo"]
  },
  {
    id: 7,
    titulo: "STEAM-UTEM Bootcamp: Formación Docente en Tecnologías Emergentes",
    fecha: "Enero 2026",
    lugar: "Casa Central UTEM, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "Se desarrollaron módulos teórico-prácticos sobre visualización e impresión 3D, realidad virtual aplicada a sistemas biológicos complejos e inteligencia artificial en la enseñanza de las ciencias, finalizando con un foro de discusión y la entrega de certificados.",
    galeria: [
      { url: "/actividades/steam-utem/1.jpeg", descripcion: "En representación de LaTSIB participaron Ignacio López Concha y Juan Cristóbal Toledo Fierro." },
      { url: "/actividades/steam-utem/2.jpeg", descripcion: "En representación de LaTSIB participaron Ignacio López Concha y Juan Cristóbal Toledo Fierro." }
    ],
    participantes: ["Ignacio López Concha", "Juan Cristóbal Toledo Fierro", "Raúl Caulier Cisterna", "Jorge Vergara"]
  },
  {
    id: 8,
    titulo: "Workshop BigMedP",
    fecha: "Junio 2026",
    lugar: "Miraflores de la Sierra, Madrid, España",
    tipo: "Internacional",
    descripcion: "Integrantes del LaTSIB participaron en las Jornadas de Trabajo del Biomedical Engineering and Data Science Group (BigMedP), instancia orientada al intercambio científico, la presentación de investigaciones y el fortalecimiento de redes de colaboración internacional.",
    galeria: [
      { url: "/actividades/España/PresentacionRaul.JPG", descripcion: "El Dr. Raúl Caulier-Cisterna presentó los avances del Laboratorio." },
      { url: "/actividades/España/PresentacionRaul2.JPG", descripcion: "El Dr. Raúl Caulier-Cisterna presentó los avances del Laboratorio." },
      { url: "/actividades/España/PresentacionRaul3.JPG", descripcion: "El Dr. Raúl Caulier-Cisterna presentó los avances del Laboratorio." },
      { url: "/actividades/España/PresentacionAndres.JPG", descripcion: "Andrés Vega presentó la charla: Análisis morfológico de señales biológicas mediante autoencoders y caracterización del espacio latente." },
      { url: "/actividades/España/PresentacionAndres2.JPG", descripcion: "Andrés Vega presentó la charla: Análisis morfológico de señales biológicas mediante autoencoders y caracterización del espacio latente." },
      { url: "/actividades/España/PresentacionAndres3.JPG", descripcion: "Andrés Vega presentó la charla: Análisis morfológico de señales biológicas mediante autoencoders y caracterización del espacio latente." },
      { url: "/actividades/España/Grupal.jpg", descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra." },
      { url: "/actividades/España/Grupal2.jpg", descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra." },
      { url: "/actividades/España/AtencionMati.jpg", descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra." },
      { url: "/actividades/España/PoniendoAtencion.jpg", descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra." }
    ],
    participantes: ["Raúl Caulier", "Andrés Vega", "Matías Gajardo", "Camila Guajardo"]
  },
  {
    id: 9,
    titulo: "Defensa de tesis doctoral en la Universidad Rey Juan Carlos",
    fecha: "Junio 2026",
    lugar: "Universidad Rey Juan Carlos, Fuenlabrada, Madrid, España",
    tipo: "Internacional",
    descripcion: "Como parte de la visita académica a España, integrantes del LaTSIB asistieron a una defensa de tesis doctoral en la Universidad Rey Juan Carlos, conociendo investigaciones desarrolladas en el ámbito de la ingeniería biomédica y compartiendo con la comunidad académica de la institución.",
    galeria: [
      { url: "/actividades/España/AtencionTesis.jpg", descripcion: "Asistencia a la defensa de tesis doctoral realizada en el campus de Fuenlabrada." },
      { url: "/actividades/España/JuradoDeTesis.jpg", descripcion: "Dr. Raúl Caulier como jurado en la tesis doctoral en la Universidad Rey Juan Carlos." },
      { url: "/actividades/España/ProfeRaulTesis.jpg", descripcion: "Finalización de la tesis con académicos e investigadores de la Universidad Rey Juan Carlos." }
    ],
    participantes: ["Raúl Caulier", "Andrés Vega", "Matías Gajardo", "Camila Guajardo"]
  },
  {
    id: 10,
    titulo: "Visita académica a la Universidad Pablo de Olavide",
    fecha: "Junio 2026",
    lugar: "Universidad Pablo de Olavide, Sevilla, España",
    tipo: "Internacional",
    descripcion: "Como parte de la visita académica a España, integrantes del LaTSIB participaron en reuniones de trabajo en la Universidad Pablo de Olavide y realizaron una visita al laboratorio IMASD Running.",
    galeria: [
      { url: "/actividades/España/VisitaPabloOlavide.jpg", descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico." },
      { url: "/actividades/España/VisitaPabloOlavide2.jpg", descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico." },
      { url: "/actividades/España/VisitaPabloOlavide3.jpg", descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico." },
      { url: "/actividades/España/VisitaPabloOlavide4.jpg", descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico." }
    ],
    participantes: ["Raúl Caulier", "Andrés Vega", "Matías Gajardo", "Camila Guajardo"]
  },
  {
    id: 11,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 1» reunió durante jornadas a especialistas, profesionales, académicos y estudiantes para acercar la ingeniería biomédica a la realidad clínica.",
    galeria: [
      { url: "/actividades/ciclodeseminarios/Antonio1.jpg", descripcion: "El Dr. Antonio Eblen-Zajjur presentó avances relacionados con la evaluación miocárdica mediante balistocardiograma." },
      { url: "/actividades/ciclodeseminarios/Antonio2.jpg", descripcion: "El Dr. Antonio Eblen-Zajjur presentó avances relacionados con la evaluación miocárdica mediante balistocardiograma." },
      { url: "/actividades/ciclodeseminarios/Glenn1.jpg", descripcion: "Glenn Lanyon presentó: Desarrollo de software para el análisis de la respuesta neurovascular y la caracterización del período refractario." },
      { url: "/actividades/ciclodeseminarios/Gabriel1.jpg", descripcion: "Gabriel Araya presentó: Spine-fNirs Web: Herramienta para el análisis de la respuesta neurovascular en la médula espinal." },
      { url: "/actividades/ciclodeseminarios/Matias1.jpg", descripcion: "Matias Gajardo presentó: Modelando la médula espinal con fNIRS: Un enfoque de ingeniería biomédica y estadística no paramétrica." }
    ],
    participantes: ["Antonio Eblen-Zajjur", "Glenn Lanyon", "Gabriel Araya", "Matías Gajardo", "Renato Álvarez", "Alejandro Sanz"]
  },
  {
    id: 12,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 2» abordó temáticas de modelamiento biomédico, comunicación aumentativa e inteligencia artificial.",
    galeria: [
      { url: "/actividades/ciclodeseminarios/Marcia1.jpg", descripcion: "La fonoaudióloga Marcia Toloza Dauvergne abordó los desafíos de la comunicación cuando no hay voz." },
      { url: "/actividades/ciclodeseminarios/Ignacio1.jpg", descripcion: "Ignacio López presentó: Sistema para mejorar la comunicación en dispositivos de laringe electrónica mediante aplicación móvil." },
      { url: "/actividades/ciclodeseminarios/David1.jpg", descripcion: "David Sepúlveda presentó: Ingeniería biomédica en acción: De la adquisición de señales a la inteligencia artificial en salud." }
    ],
    participantes: ["Marcia Toloza", "Ignacio López", "David Sepúlveda", "Camilo Cerda", "Wellinton Barrera", "Felipe Espinoza"]
  },
  {
    id: 13,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 3» reunió especialistas en innovación y tecnologías médicas.",
    galeria: [
      { url: "/actividades/ciclodeseminarios/Carolina1.jpg", descripcion: "Carolina Giesen compartió su experiencia en innovación y mercados globales." },
      { url: "/actividades/ciclodeseminarios/Camila1.jpg", descripcion: "Camila Guajardo presentó: Divulgación Científica: Acercando el conocimiento a la sociedad." }
    ],
    participantes: ["Carolina Giesen", "Camila Guajardo", "Claudia Cancino", "David Castro-Salinas"]
  },
  {
    id: 14,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 4» exploró deep learning y genómica computacional.",
    galeria: [
      { url: "/actividades/ciclodeseminarios/Marcelo1.JPG", descripcion: "El Dr. Marcelo Andia presentó el papel de la inteligencia artificial y las imágenes médicas." },
      { url: "/actividades/ciclodeseminarios/Juan1.JPG", descripcion: "Juan Toledo presentó: Generación de señales biomédicas usando deep learning." }
    ],
    participantes: ["Marcelo Andia", "Juan Toledo", "Cristopher Retamales", "Fausto Cabezas"]
  }
];

export const INITIAL_PROYECTOS = [
  {
    id: 1,
    titulo: "Respuesta neurovascular peri-espinal evaluada con fNIRS",
    badge: "",
    linea: "Neuroingeniería y Señales",
    desc: "Esta línea de investigación se centra en el estudio del funcionamiento de la médula espinal humana utilizando una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). El objetivo principal es comprender cómo responde el sistema nervioso espinal ante distintos estímulos sensoriales, observando cambios en la oxigenación de la médula espinal en tiempo real. A través de la estimulación controlada de nervios periféricos del brazo y la pierna en voluntarios sanos, se analizan patrones de respuesta neurovascular en distintas regiones de la médula espinal. Estos patrones permiten identificar diferencias temporales en la forma en que la médula procesa la información sensorial, aportando una base de referencia sobre el funcionamiento normal del sistema espinal. Los resultados de este trabajo contribuyen a establecer modelos fisiológicos normativos que pueden servir como punto de comparación para futuras investigaciones clínicas. En el largo plazo, esta línea busca apoyar el desarrollo de biomarcadores funcionales que ayuden a detectar alteraciones neurológicas de forma temprana, segura y sin procedimientos invasivos, con potencial aplicación en el estudio de lesiones medulares, dolor crónico y otras condiciones neurológicas.",
    color: "from-[#1f7a8c]/10 to-[#1f7a8c]/20 border-[#1f7a8c]/20",
    integrantes: ["Matías Gajardo de la Fuente", "Andrés Vega-Moraga", "Glenn Lanyon-Alarcón", "Ana Moya-Beltrán", "Sergio Uribe", "Jorge Vergara-Quezada", "Antonio Eblen-Zajjur", "Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800", desc: "Configuración experimental fNIRS en laboratorio." },
      { url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800", desc: "Análisis de señales hemodinámicas en tiempo real." }
    ],
    documentos: [
      { titulo: "Paper: Comparación de la respuesta neurovascular peri-espinal adquirida con fNIRS ante la estimulación del nervio mediano y tibial en voluntarios sanos", tipo: "PDF", link: "https://drive.google.com/file/d/1UQWZ8p3JsArjQw1WDtiJrL2lFCrOQWmZ/view?usp=drive_link" },
      { titulo: "Paper: Comparison of LED vs LASER", tipo: "Articulo", link: "https://www.sciencedirect.com/science/article/pii/S1350453324000717" }
    ]
  },
  {
    id: 2,
    titulo: "Construcción de un Chatbot Médico",
    badge: "",
    linea: "Inteligencia Artificial y NLP",
    desc: "Esta línea de investigación aborda el desarrollo de soluciones basadas en inteligencia artificial para mejorar el acceso, la búsqueda y el uso de información técnica sobre instrumental médico, un proceso que actualmente resulta lento y propenso a errores en entornos clínicos y administrativos. El trabajo se centra en transformar catálogos médicos no estructurados —como documentos escaneados o archivos PDF— en sistemas inteligentes capaces de comprender texto e imágenes, organizar la información y responder consultas en lenguaje natural. Para ello, se integran técnicas de visión por computador, reconocimiento óptico de caracteres y modelos avanzados de recuperación de información, dando origen a un asistente conversacional que facilita la identificación precisa de instrumentos médicos y sus características técnicas. Esta investigación busca optimizar la toma de decisiones, reducir tiempos de búsqueda y apoyar tanto al personal de salud como a equipos administrativos, contribuyendo a procesos más eficientes, seguros y modernos. Además, presenta un alto potencial de transferencia tecnológica y aplicación práctica en hospitales y centros de salud.",
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Juan Toledo-Fierro", "Andrés Vega-Moraga", "Esteban Gomez-Teran", "Bruno Sainz-Silva", "Jorge Vergara-Quezada", "Marcia Toloza", "Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800", desc: "Interfaz del asistente virtual médico." },
      { url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800", desc: "Arquitectura del modelo LLM utilizado." }
    ],
    documentos: [
      { titulo: "Póster: De la Imagen al Conocimiento: Integración de OCR, YOLO y RAG en la Construcción de un Chatbot Médico.", tipo: "Poster", link: "https://drive.google.com/file/d/1olc7S9Jr1YzouvzKyOvbRCHWb7dsmo__/view?usp=drive_link" }
    ]
  },
  {
    id: 3,
    titulo: "Sistema Inteligente para Laringe Electrónica",
    badge: "Trabajo de título",
    linea: "Tecnologías Asistivas y Voz",
    desc: "Esta línea de investigación se centra en el desarrollo de un sistema inteligente para mejorar la calidad de la voz generada por dispositivos de laringe electrónica, utilizados por personas que han perdido la capacidad de hablar tras una laringectomía total. Aunque estos dispositivos permiten la comunicación, la voz producida suele ser poco natural, metálica y difícil de comprender, lo que impacta negativamente en la calidad de vida y la integración social de los usuarios. El proyecto propone el uso de técnicas de inteligencia artificial para procesar el habla electrolaríngea y transformarla en una voz más clara, natural e inteligible. Para ello, se capturan señales de voz generadas por una laringe electrónica y se procesan mediante modelos avanzados de reconocimiento y síntesis de voz, permitiendo convertir el sonido original en una señal de mayor calidad auditiva. Los resultados iniciales muestran que la efectividad del sistema depende tanto de la tecnología utilizada como del correcto uso del dispositivo por parte del usuario, destacando la importancia de una adecuada articulación y posicionamiento. Este enfoque representa una solución prometedora para mejorar la comunicación asistida y sienta las bases para futuras evaluaciones clínicas con pacientes, con el objetivo final de contribuir a una mejor calidad de vida y autonomía comunicativa.",
    color: "from-[#1e5c6b]/10 to-[#1e5c6b]/20 border-[#1e5c6b]/20",
    integrantes: ["Ignacio López-Concha", "Andrés Vega-Moraga", "Jorge Vergara-Quezada", "Marcia Toloza", "Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://i.postimg.cc/sXMLghNq/Diseno-sin-titulo.png", desc: "Laringe Electrónica" },
      { url: "https://i.postimg.cc/634HXN75/Diseno-sin-titulo-(1).png", desc: "Posicionamiento sobre el tejido blando" },
      { url: "https://www.romet.us/images/products/1628676420.jpg", desc: "Romet R700" },
      { url: "https://i.postimg.cc/c1gqspqc/Diseno-sin-titulo.jpg", desc: "Laringectomía Total" }
    ],
    documentos: [
      { titulo: "Póster: Sistema Inteligente para Optimizar la Voz en Dispositivos de Laringe Electrónica", tipo: "Paper", link: "https://drive.google.com/file/d/1L5hvUGYqisEzxEJ6NR5i5U5g7F9VSQ7I/view?usp=drive_link" }
    ]
  },
  {
    id: 4,
    titulo: "Nuevos biomarcadores para la respuesta neurovascular espinal",
    badge: "",
    linea: "Biomarcadores y fNIRS",
    desc: "Este trabajo se centra en el desarrollo de nuevas formas de evaluar el funcionamiento de la médula espinal, más allá de lo que permiten las imágenes médicas tradicionales como la resonancia o el escáner, que muestran principalmente su estructura pero no su actividad funcional. La investigación utiliza una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS), que permite medir cambios en la oxigenación de la sangre asociados a la actividad del sistema nervioso. En particular, se estudia cómo responde la red neurovascular que rodea la médula espinal cuando se aplica una estimulación eléctrica suave en un nervio de la pierna. A partir de estas mediciones, el estudio propone tres nuevos biomarcadores que describen con mayor detalle cómo evoluciona esa respuesta de oxigenación en el tiempo: cuánto “recorre” la señal durante su fase de aumento, qué tan rápido crece y cuánta activación total se acumula. Estos indicadores se evaluaron en un grupo de voluntarios sanos, comparando las respuestas en la zona cervical y lumbar de la columna. Los resultados muestran que la región lumbar presenta una respuesta más prolongada y de mayor magnitud que la cervical, y además más consistente entre personas. Esto sugiere que estos nuevos biomarcadores permiten describir mejor el funcionamiento de la médula espinal que las medidas clásicas usadas hasta ahora. En proyección, esta línea de investigación busca sentar las bases para desarrollar herramientas que permitan detectar alteraciones funcionales de la médula espinal que hoy no son visibles con exámenes estructurales, por ejemplo en personas con dolor crónico u otros trastornos de origen espinal.",
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["David Sepúlveda-Velásquez", "Andrés Vega-Moraga", "Glenn Lanyon-Alarcón", "Ana Moya-Beltrán", "Sergio Uribe", "Jorge Vergara-Quezada", "Antonio Eblen-Zajjur", "Raúl Caulier-Cisterna"],
    imagenes: [],
    documentos: [
      { titulo: "Paper: Nuevos biomarcadores para la respuesta neurovascular espinal", tipo: "Paper", link: "https://drive.google.com/file/d/1CNV_04HOabK2WFDNmT39IaYB0YURJxVN/view?usp=drive_link" }
    ]
  },
  {
    id: 5,
    titulo: "Clasificación automática de la deglución con inteligencia artificial",
    badge: "",
    linea: "Inteligencia Artificial Médica",
    desc: "Esta línea de investigación busca desarrollar herramientas tecnológicas que permitan detectar de forma temprana y no invasiva los trastornos de la deglución, un problema frecuente en pacientes hospitalizados y especialmente en personas con riesgo de aspiración o complicaciones respiratorias. El estudio utiliza grabaciones de sonido tomadas desde el cuello durante el acto de tragar, las cuales contienen información valiosa sobre cómo funciona el proceso de deglución. A partir de estas señales acústicas, se construyen representaciones que son analizadas mediante modelos de inteligencia artificial capaces de aprender patrones y distinguir entre personas sanas y pacientes con alteraciones deglutorias. La investigación demuestra que es posible automatizar este proceso con buenos niveles de precisión, lo que abre la puerta a crear sistemas de apoyo clínico que complementen o, en algunos casos, sustituyan exámenes más complejos, costosos o invasivos como la videofluoroscopia. Esto resulta especialmente relevante para pacientes que no pueden someterse fácilmente a estos estudios o para contextos donde el acceso a equipamiento especializado es limitado. En proyección, esta línea apunta a facilitar el diagnóstico oportuno de la disfagia, reducir riesgos clínicos y apoyar la toma de decisiones médicas mediante herramientas objetivas, rápidas y basadas en análisis automático de señales biomédicas.",
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Vicente Escudero", "David Sepúlveda-Velásquez", "Glenn Lanyon-Alarcón", "Andrés Vega-Moraga", "Jorge Vergara-Quezada", "Constanza Echeverría", "Rodrigo Tobar-Fredes", "Gustavo Schleyer", "Patricio Fuentealba", "Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://i.postimg.cc/bvmXJ8N5/Diseno-sin-titulo-(3).png", desc: "Dispositivo de adquisición de audio desarrollo del proyecto Suseso 306-2023" },
      { url: "https://i.postimg.cc/R0ZSGgWg/Imagen-de-referencia.png", desc: "Espectrogramas de señales deglutorias capturadas durante el proceso de deglución" }
    ],
    documentos: [
      { titulo: "Paper: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning", tipo: "Paper", link: "https://drive.google.com/file/d/1YxCNRyKqC9ovUtsG0BlElTK3uFkcfOt-/view?usp=drive_link" }
    ]
  },
  {
    id: 6,
    titulo: "Plataforma web para el análisis funcional de la médula espinal",
    badge: "",
    linea: "Desarrollo de Software Biomédico",
    desc: "Esta línea de investigación se enfoca en el desarrollo de una plataforma web interactiva para el análisis y visualización de señales que reflejan el funcionamiento de la médula espinal, obtenidas mediante una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). El problema que aborda este trabajo es que muchas enfermedades de la columna pueden generar dolor o alteraciones motoras y sensoriales sin mostrar cambios visibles en exámenes tradicionales como la resonancia magnética o la tomografía. En este contexto, fNIRS permite observar cómo responde la médula espinal a distintos estímulos, midiendo cambios en la oxigenación de la sangre asociados a su actividad funcional. La plataforma desarrollada permite explorar grandes volúmenes de datos de manera remota y segura, filtrar información por variables clínicas y demográficas, visualizar las respuestas por zonas y canales, detectar y limpiar señales con artefactos, y exportar automáticamente métricas relevantes para análisis clínico o investigación. Gracias a estas herramientas, es posible identificar patrones anómalos y comparar grupos de pacientes de forma más eficiente y sistemática. En conjunto, esta línea busca facilitar el uso clínico y científico de fNIRS en columna, aportando una herramienta práctica para el estudio funcional de la médula espinal y sentando las bases para mejorar la detección temprana y el seguimiento de patologías espinales que no son evidentes en estudios estructurales tradicionales.",
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Gabriel Araya López", "Andrés Vega-Moraga", "Glenn Lanyon-Alarcón", "Jorge Vergara-Quezada", "Sergio Uribe", "Antonio Eblen-Zajjur", "Raúl Caulier-Cisterna"],
    imagenes: [],
    documentos: [
      { titulo: "Paper: Spine-fNIRSWeb: Interfaz Gráfica Remota para el Análisis y Visualización de Señales de la Respuesta Neurovascular en la Médula Espinal", tipo: "Paper", link: "https://drive.google.com/file/d/1iqyxVajWzy7b1N9sZ05BiTnpkgAoK7kK/view?usp=drive_link" }
    ]
  },
  {
    id: 7,
    titulo: "Software en Python para analizar la respuesta neurovascular espinal",
    badge: "",
    linea: "Desarrollo de Software Biomédico",
    desc: "Esta línea de investigación se centra en el desarrollo de un software en Python para el análisis de la respuesta neurovascular de la médula espinal, medida mediante una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). Esta técnica permite observar cambios en la oxigenación de la sangre asociados a la actividad funcional de la médula, algo que no puede evaluarse directamente con exámenes tradicionales como la resonancia o el escáner. El trabajo combina fNIRS con estimulación eléctrica indolora de nervios periféricos para provocar una respuesta medible en distintos niveles de la columna. A partir de estos datos, el software procesa las señales, elimina ruido, calcula indicadores fisiológicos relevantes y permite caracterizar cómo responde la red neurovascular peri-espinal. Un aspecto clave del estudio es la validación del software en Python mediante la comparación directa con herramientas previamente desarrolladas en MATLAB, mostrando resultados consistentes en la mayoría de las variables analizadas. Esto confirma que la nueva plataforma es una alternativa confiable, más flexible y accesible para el análisis de este tipo de señales. En conjunto, esta línea busca facilitar y estandarizar el análisis de datos fNIRS en columna, apoyando la investigación y abriendo el camino hacia futuras aplicaciones clínicas orientadas a la evaluación funcional de patologías espinales que no presentan cambios estructurales evidentes.",
    color: "from-[#1f7a8c]/10 to-[#1f7a8c]/20 border-[#1f7a8c]/20",
    integrantes: ["Glenn Lanyon-Alarcon", "Andrés Vega-Moraga", "Jorge Vergara-Quezada", "Ana Moya-Beltrán", "Sergio Uribe", "Antonio Eblen-Zajjur", "Raúl Caulier-Cisterna"],
    imagenes: [],
    documentos: [
      { titulo: "Póster: Software en Python para el análisis de la respuesta neurovascular peri-espinal obtenida con fNIRS", tipo: "Paper", link: "https://drive.google.com/file/d/1M2yYsle0MGrwIyioQ5rDqTlrZI8cvYOb/view?usp=drive_link" }
    ]
  },
  {
    id: 8,
    titulo: "Respuesta neurovascular espinal y período refractario",
    badge: "",
    linea: "Neurofisiología y fNIRS",
    desc: "Esta línea de investigación estudia cómo responde la médula espinal a estímulos eléctricos suaves y no invasivos, utilizando una técnica llamada espectroscopía funcional de infrarrojo cercano (fNIRS), que permite medir cambios en la oxigenación de la sangre asociados a la actividad del sistema nervioso. El objetivo principal es explorar la existencia de un llamado período refractario neurovascular, es decir, un intervalo de tiempo en el que la médula espinal no logra generar una respuesta completa si los estímulos se aplican demasiado seguido. Para ello, se aplican estímulos con tiempos de espera cada vez más cortos y se observa cómo cambia la señal registrada. Los resultados muestran que, cuando los estímulos se aplican con intervalos muy breves, la respuesta neurovascular disminuye progresivamente, especialmente en la región cervical, lo que entrega evidencia preliminar de este fenómeno de refractariedad. También se observan diferencias entre las zonas cervical y lumbar, lo que sugiere que la respuesta de la médula no es uniforme a lo largo de la columna. En proyección, esta línea de trabajo busca comprender mejor el funcionamiento dinámico de la médula espinal y sentar las bases para utilizar estas mediciones como biomarcadores funcionales, con potencial aplicación en el estudio de dolor neuropático, lesiones medulares y otras condiciones donde los exámenes estructurales tradicionales no muestran alteraciones claras.",
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Glenn Lanyon-Alarcón", "Vicente Escudero-Durana", "Ana Moya-Beltrán", "Jorge Vergara-Quezada", "Sergio Uribe", "Antonio Eblen-Zajjur", "Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://i.postimg.cc/RC8tjH9h/Diseno-sin-titulo-(1).jpg", desc: "Posición de los optodos y estimulador." },
      { url: "https://i.postimg.cc/43bbGNPF/unnamed.jpg", desc: "Representación esquemática del período refractario neurovascular en la médula espinal medido mediante fNIRS." }
    ],
    documentos: [
      { titulo: "Póster: Registro de la respuesta neurovascular peri-espinal y detección del período refractario con espectroscopía funcional de infrarrojo cercano", tipo: "Paper", link: "https://drive.google.com/file/d/16sQsgMSYrIOBWN7szBeBbepGM3MG72f2/view?usp=drive_link" }
    ]
  }
];

export const INVITATION_TEMPLATE = (nombre, rol, link) => {
  return `Hola, ${nombre}:

Se ha creado tu acceso para la plataforma web del Laboratorio de Biomédica Traslacional (LaTSIB) de la Universidad Tecnológica Metropolitana.

Se te ha asignado el rol de ${rol}, lo que te permitirá gestionar tus datos de perfil, publicar contenidos y colaborar en la administración del sitio según tus permisos.

Para activar tu cuenta y configurar tu contraseña personal, por favor haz clic en el siguiente enlace:
👉 [Configurar mi contraseña y acceder al sitio] ${link}

(Nota: Este enlace es personal, único y expirará en 48 horas por motivos de seguridad).

Si tienes alguna duda o problema durante el registro, puedes responder directamente a este correo o contactar al equipo de desarrollo web del laboratorio.

Saludos cordiales,
Equipo de Desarrollo Web & Soporte
Laboratorio de Biomédica Traslacional (LaTSIB)
Universidad Tecnológica Metropolitana (UTEM)`;
};

export const DEFAULT_USERS = [
  // Administradora Principal / Desarrolladora
  {
    id: 'u_camila',
    nombre: 'Camila Guajardo',
    email: 'cguajardo@utem.cl',
    password: 'admin.latsib.2026',
    rol: 'admin',
    estado: 'activo',
    isPrimaryAdmin: true,
    has2FA: false,
    avatar: '/equipo/CamilaPERFIL.jpg',
    cargo: 'Desarrolladora Web / Asistente Investigadora',
    creadoEl: '08/09/2026'
  },
  // Director e Investigadores Administradores
  {
    id: 'u_raul',
    nombre: 'Dr. Raúl Caulier',
    email: 'rcaulier@utem.cl',
    password: 'admin.latsib.2026',
    rol: 'admin',
    estado: 'activo',
    has2FA: true,
    avatar: 'https://fing.utem.cl/wp-content/uploads/sites/6/2023/11/Raul-Paul-Caulier-Cisterna.jpg',
    cargo: 'Director e Investigador Principal',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_andres',
    nombre: 'Andrés Vega',
    email: 'avega@utem.cl',
    password: 'admin.latsib.2026',
    rol: 'admin',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/AndrésPERFIL.jpg',
    cargo: 'Asistente Investigador / Tesista',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_vicente',
    nombre: 'Vicente Escudero',
    email: 'vescuderod@utem.cl',
    password: 'admin.latsib.2026',
    rol: 'admin',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/VicentePERFIL.jpg',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_glenn',
    nombre: 'Glenn Lanyon',
    email: 'glanyon@utem.cl',
    password: 'admin.latsib.2026',
    rol: 'admin',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/GlennPERFIL.jpg',
    cargo: 'Asistente Investigador / Tesista',
    creadoEl: '08/09/2026'
  },
  // Editores (Colaboradores y Doctorandos)
  {
    id: 'u_jorge',
    nombre: 'Jorge Vergara',
    email: 'jvergara@utem.cl',
    password: 'editor.latsib.2026',
    rol: 'editor',
    estado: 'activo',
    has2FA: false,
    avatar: '/logo-circle.png',
    cargo: 'Investigador Colaborador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_felipe',
    nombre: 'Felipe Espinoza',
    email: 'fespinoza@utem.cl',
    password: 'editor.latsib.2026',
    rol: 'editor',
    estado: 'activo',
    has2FA: false,
    avatar: '/logo-circle.png',
    cargo: 'Estudiante de Doctorado',
    creadoEl: '08/09/2026'
  },
  // Integrantes / Asistentes
  {
    id: 'u_matias',
    nombre: 'Matías Gajardo',
    email: 'mgajardod@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/MatiasPERFIL.jpg',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_juan',
    nombre: 'Juan Toledo',
    email: 'jtoledof@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/JuanPERFIL.jpg',
    cargo: 'Asistente Investigador / Tesista',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_david',
    nombre: 'David Sepúlveda',
    email: 'svelasquez@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/DavidPERFIL.jpg',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_catalina',
    nombre: 'Catalina Araniz',
    email: 'caraniz@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/CatalinaPERFIL.jpg',
    cargo: 'Asistente Investigadora',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_gabriel',
    nombre: 'Gabriel Araya',
    email: 'garaya@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/GabrielPERFIL.jpg',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_clemente',
    nombre: 'Clemente Uribe',
    email: 'curibeo@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/ClementePERFIL.jpg',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_nicolas',
    nombre: 'Nicolás Frieri',
    email: 'nfrieri@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/NicolasPERFIL.png',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  },
  {
    id: 'u_lucas',
    nombre: 'Lucas Valdebenito',
    email: 'lvaldebenito@utem.cl',
    password: 'miembro.latsib.2026',
    rol: 'member',
    estado: 'activo',
    has2FA: false,
    avatar: '/equipo/LucasPERFIL.jpg',
    cargo: 'Asistente Investigador',
    creadoEl: '08/09/2026'
  }
];

export const INITIAL_HISTORIAL = [];


