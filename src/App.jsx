import React, { useState, useEffect } from 'react';
import { 
  Atom, Cpu, Globe, Users, FileText, Mail, MapPin, 
  ChevronRight, ChevronLeft, Menu, X, Linkedin, Github, 
  ExternalLink, BookOpen, Calendar, ArrowLeft, LayoutGrid, Info, Download, Instagram, Youtube, Maximize2
} from 'lucide-react';
import ContactModal from './components/ContactModal';

/**
 * ------------------------------------------------------------------
 * CONFIGURACIÓN Y DATOS
 * ------------------------------------------------------------------
 */

const CONFIG = {
  nombreGrupo: "LaTSIB",
  nombreCompleto: "Laboratorio de Biomédica Traslacional",
  mision: "El Laboratorio de Biomédica Traslacional (LaTSIB) desarrolla investigación aplicada en ingeniería biomédica con un enfoque traslacional, integrando análisis de señales fisiológicas, procesamiento de imágenes médicas, ciencia de datos e inteligencia artificial. Su objetivo es generar conocimiento y soluciones tecnológicas que conecten la investigación en ingeniería con necesidades clínicas reales, contribuyendo al diagnóstico, monitoreo y comprensión de procesos fisiológicos y patológicos.",
  email: "latsibutem@gmail.com",
  direccion: "Av. José Pedro Alessandri 1242, Ñuñoa, Región Metropolitana, Chile",
  year: 2026,
  imagenes: {
    logo: "/logo-circle.png", 
    hero: "/image.jpg"      
  }
};

// --- DATA: LÍNEAS DE INVESTIGACIÓN ---
const LINEAS_INVESTIGACION = [
  {
    id: 1,
    titulo: "Respuesta neurovascular peri-espinal evaluada con fNIRS",
    desc: "Esta línea de investigación se centra en el estudio del funcionamiento de la médula espinal humana utilizando una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). El objetivo principal es comprender cómo responde el sistema nervioso espinal ante distintos estímulos sensoriales, observando cambios en la oxigenación de la médula espinal en tiempo real. A través de la estimulación controlada de nervios periféricos del brazo y la pierna en voluntarios sanos, se analizan patrones de respuesta neurovascular en distintas regiones de la médula espinal. Estos patrones permiten identificar diferencias temporales en la forma en que la médula procesa la información sensorial, aportando una base de referencia sobre el funcionamiento normal del sistema espinal. Los resultados de este trabajo contribuyen a establecer modelos fisiológicos normativos que pueden servir como punto de comparación para futuras investigaciones clínicas. En el largo plazo, esta línea busca apoyar el desarrollo de biomarcadores funcionales que ayuden a detectar alteraciones neurológicas de forma temprana, segura y sin procedimientos invasivos, con potencial aplicación en el estudio de lesiones medulares, dolor crónico y otras condiciones neurológicas.",
    icon: <Cpu className="w-8 h-8 text-[#1f7a8c]" />,
    color: "from-[#1f7a8c]/10 to-[#1f7a8c]/20 border-[#1f7a8c]/20",
    integrantes: ["Matías Gajardo de la Fuente, Andrés Vega-Moraga, Glenn Lanyon-Alarcón , Ana Moya-Beltrán , Sergio Uribe, Jorge Vergara-Quezada, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna"],
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
    desc: "Esta línea de investigación aborda el desarrollo de soluciones basadas en inteligencia artificial para mejorar el acceso, la búsqueda y el uso de información técnica sobre instrumental médico, un proceso que actualmente resulta lento y propenso a errores en entornos clínicos y administrativos. El trabajo se centra en transformar catálogos médicos no estructurados —como documentos escaneados o archivos PDF— en sistemas inteligentes capaces de comprender texto e imágenes, organizar la información y responder consultas en lenguaje natural. Para ello, se integran técnicas de visión por computador, reconocimiento óptico de caracteres y modelos avanzados de recuperación de información, dando origen a un asistente conversacional que facilita la identificación precisa de instrumentos médicos y sus características técnicas. Esta investigación busca optimizar la toma de decisiones, reducir tiempos de búsqueda y apoyar tanto al personal de salud como a equipos administrativos, contribuyendo a procesos más eficientes, seguros y modernos. Además, presenta un alto potencial de transferencia tecnológica y aplicación práctica en hospitales y centros de salud.",
    icon: <Globe className="w-8 h-8 text-[#2f9fb3]" />,
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Juan Toledo-Fierro, Andrés Vega-Moraga, Esteban Gomez-Teran, Bruno Sainz-Silva, Jorge Vergara-Quezada, Marcia Toloza, Raúl Caulier-Cisterna"],
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
    desc: "Esta línea de investigación se centra en el desarrollo de un sistema inteligente para mejorar la calidad de la voz generada por dispositivos de laringe electrónica, utilizados por personas que han perdido la capacidad de hablar tras una laringectomía total. Aunque estos dispositivos permiten la comunicación, la voz producida suele ser poco natural, metálica y difícil de comprender, lo que impacta negativamente en la calidad de vida y la integración social de los usuarios. El proyecto propone el uso de técnicas de inteligencia artificial para procesar el habla electrolaríngea y transformarla en una voz más clara, natural e inteligible. Para ello, se capturan señales de voz generadas por una laringe electrónica y se procesan mediante modelos avanzados de reconocimiento y síntesis de voz, permitiendo convertir el sonido original en una señal de mayor calidad auditiva. Los resultados iniciales muestran que la efectividad del sistema depende tanto de la tecnología utilizada como del correcto uso del dispositivo por parte del usuario, destacando la importancia de una adecuada articulación y posicionamiento. Este enfoque representa una solución prometedora para mejorar la comunicación asistida y sienta las bases para futuras evaluaciones clínicas con pacientes, con el objetivo final de contribuir a una mejor calidad de vida y autonomía comunicativa.",
    icon: <Atom className="w-8 h-8 text-[#1f7a8c]" />,
    color: "from-[#1e5c6b]/10 to-[#1e5c6b]/20 border-[#1e5c6b]/20",
    integrantes: ["Ignacio López-Concha,Andrés Vega-Moraga, Jorge Vergara-Quezada, Marcia Toloza, Raúl Caulier-Cisterna"],
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
    desc: "Este trabajo se centra en el desarrollo de nuevas formas de evaluar el funcionamiento de la médula espinal, más allá de lo que permiten las imágenes médicas tradicionales como la resonancia o el escáner, que muestran principalmente su estructura pero no su actividad funcional. La investigación utiliza una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS), que permite medir cambios en la oxigenación de la sangre asociados a la actividad del sistema nervioso. En particular, se estudia cómo responde la red neurovascular que rodea la médula espinal cuando se aplica una estimulación eléctrica suave en un nervio de la pierna. A partir de estas mediciones, el estudio propone tres nuevos biomarcadores que describen con mayor detalle cómo evoluciona esa respuesta de oxigenación en el tiempo: cuánto “recorre” la señal durante su fase de aumento, qué tan rápido crece y cuánta activación total se acumula. Estos indicadores se evaluaron en un grupo de voluntarios sanos, comparando las respuestas en la zona cervical y lumbar de la columna. Los resultados muestran que la región lumbar presenta una respuesta más prolongada y de mayor magnitud que la cervical, y además más consistente entre personas. Esto sugiere que estos nuevos biomarcadores permiten describir mejor el funcionamiento de la médula espinal que las medidas clásicas usadas hasta ahora. En proyección, esta línea de investigación busca sentar las bases para desarrollar herramientas que permitan detectar alteraciones funcionales de la médula espinal que hoy no son visibles con exámenes estructurales, por ejemplo en personas con dolor crónico u otros trastornos de origen espinal.",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["David Sepúlveda-Velásquez, Andrés Vega-Moraga, Glenn Lanyon-Alarcón , Ana Moya-Beltrán , Sergio Uribe, Jorge Vergara-Quezada, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "", desc: "" }
    ],
    documentos: [
      { titulo: "Paper: Nuevos biomarcadores para la respuesta neurovascular espinal", tipo: "Paper", link: "https://drive.google.com/file/d/1CNV_04HOabK2WFDNmT39IaYB0YURJxVN/view?usp=drive_link" }
    ]
  },
  {
    id: 5,
    titulo: "Clasificación automática de la deglución con inteligencia artificial",
    desc: "Esta línea de investigación busca desarrollar herramientas tecnológicas que permitan detectar de forma temprana y no invasiva los trastornos de la deglución, un problema frecuente en pacientes hospitalizados y especialmente en personas con riesgo de aspiración o complicaciones respiratorias. El estudio utiliza grabaciones de sonido tomadas desde el cuello durante el acto de tragar, las cuales contienen información valiosa sobre cómo funciona el proceso de deglución. A partir de estas señales acústicas, se construyen representaciones que son analizadas mediante modelos de inteligencia artificial capaces de aprender patrones y distinguir entre personas sanas y pacientes con alteraciones deglutorias. La investigación demuestra que es posible automatizar este proceso con buenos niveles de precisión, lo que abre la puerta a crear sistemas de apoyo clínico que complementen o, en algunos casos, sustituyan exámenes más complejos, costosos o invasivos como la videofluoroscopia. Esto resulta especialmente relevante para pacientes que no pueden someterse fácilmente a estos estudios o para contextos donde el acceso a equipamiento especializado es limitado. En proyección, esta línea apunta a facilitar el diagnóstico oportuno de la disfagia, reducir riesgos clínicos y apoyar la toma de decisiones médicas mediante herramientas objetivas, rápidas y basadas en análisis automático de señales biomédicas.",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Vicente Escudero, David Sepúlveda-Velásquez, Glenn Lanyon-Alarcón, Andrés Vega-Moraga, Jorge Vergara-Quezada, Constanza Echeverría, Rodrigo Tobar-Fredes, Gustavo Schleyer, Patricio Fuentealba, Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://i.postimg.cc/bvmXJ8N5/Diseno-sin-titulo-(3).png", desc: "Dispositivo de adquisici´on de audio desarrollo del proyecto Suseso 306-2023" },
      { url: "https://i.postimg.cc/R0ZSGgWg/Imagen-de-referencia.png", desc: "Espectrogramas de se˜nales deglutorias capturadas durante el proceso de deglución" }
    ],
    documentos: [
      { titulo: "Paper: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning", tipo: "Paper", link: "https://drive.google.com/file/d/1YxCNRyKqC9ovUtsG0BlElTK3uFkcfOt-/view?usp=drive_link" }
    ]
  },
  {
    id: 6,
    titulo: "Plataforma web para el análisis funcional de la médula espinal",
    desc: "Esta línea de investigación se enfoca en el desarrollo de una plataforma web interactiva para el análisis y visualización de señales que reflejan el funcionamiento de la médula espinal, obtenidas mediante una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). El problema que aborda este trabajo es que muchas enfermedades de la columna pueden generar dolor o alteraciones motoras y sensoriales sin mostrar cambios visibles en exámenes tradicionales como la resonancia magnética o la tomografía. En este contexto, fNIRS permite observar cómo responde la médula espinal a distintos estímulos, midiendo cambios en la oxigenación de la sangre asociados a su actividad funcional. La plataforma desarrollada permite explorar grandes volúmenes de datos de manera remota y segura, filtrar información por variables clínicas y demográficas, visualizar las respuestas por zonas y canales, detectar y limpiar señales con artefactos, y exportar automáticamente métricas relevantes para análisis clínico o investigación. Gracias a estas herramientas, es posible identificar patrones anómalos y comparar grupos de pacientes de forma más eficiente y sistemática. En conjunto, esta línea busca facilitar el uso clínico y científico de fNIRS en columna, aportando una herramienta práctica para el estudio funcional de la médula espinal y sentando las bases para mejorar la detección temprana y el seguimiento de patologías espinales que no son evidentes en estudios estructurales tradicionales.",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Gabriel Araya López, Andrés Vega-Moraga, Glenn Lanyon-Alarcón, Jorge Vergara-Quezada, Sergio Uribe, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "", desc: "" }
    ],
    documentos: [
      { titulo: "Paper: Spine-fNIRSWeb: Interfaz Gráfica Remota para el Análisis y Visualización de Señales de la Respuesta Neurovascular en la Médula Espinal", tipo: "Paper", link: "https://drive.google.com/file/d/1iqyxVajWzy7b1N9sZ05BiTnpkgAoK7kK/view?usp=drive_link" }
    ]
  },
  {
    id: 7,
    titulo: "Software en Python para analizar la respuesta neurovascular espinal",
    desc: "Esta línea de investigación se centra en el desarrollo de un software en Python para el análisis de la respuesta neurovascular de la médula espinal, medida mediante una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). Esta técnica permite observar cambios en la oxigenación de la sangre asociados a la actividad funcional de la médula, algo que no puede evaluarse directamente con exámenes tradicionales como la resonancia o el escáner. El trabajo combina fNIRS con estimulación eléctrica indolora de nervios periféricos para provocar una respuesta medible en distintos niveles de la columna. A partir de estos datos, el software procesa las señales, elimina ruido, calcula indicadores fisiológicos relevantes y permite caracterizar cómo responde la red neurovascular peri-espinal. Un aspecto clave del estudio es la validación del software en Python mediante la comparación directa con herramientas previamente desarrolladas en MATLAB, mostrando resultados consistentes en la mayoría de las variables analizadas. Esto confirma que la nueva plataforma es una alternativa confiable, más flexible y accesible para el análisis de este tipo de señales. En conjunto, esta línea busca facilitar y estandarizar el análisis de datos fNIRS en columna, apoyando la investigación y abriendo el camino hacia futuras aplicaciones clínicas orientadas a la evaluación funcional de patologías espinales que no presentan cambios estructurales evidentes.",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    color: "from-[#1f7a8c]/10 to-[#1f7a8c]/20 border-[#1f7a8c]/20",
    integrantes: ["Glenn Lanyon-Alarcon, Andrés Vega-Moraga, Jorge Vergara-Quezada, Ana Moya-Beltrán, Sergio Uribe, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "", desc: "" }
    ],
    documentos: [
      { titulo: "Póster: Software en Python para el análisis de la respuesta neurovascular peri-espinal obtenida con fNIRS", tipo: "Paper", link: "https://drive.google.com/file/d/1M2yYsle0MGrwIyioQ5rDqTlrZI8cvYOb/view?usp=drive_link" }
    ]
  },
{
    id: 8,
    titulo: "Respuesta neurovascular espinal y período refractario",
    desc: "Esta línea de investigación estudia cómo responde la médula espinal a estímulos eléctricos suaves y no invasivos, utilizando una técnica llamada espectroscopía funcional de infrarrojo cercano (fNIRS), que permite medir cambios en la oxigenación de la sangre asociados a la actividad del sistema nervioso. El objetivo principal es explorar la existencia de un llamado período refractario neurovascular, es decir, un intervalo de tiempo en el que la médula espinal no logra generar una respuesta completa si los estímulos se aplican demasiado seguido. Para ello, se aplican estímulos con tiempos de espera cada vez más cortos y se observa cómo cambia la señal registrada. Los resultados muestran que, cuando los estímulos se aplican con intervalos muy breves, la respuesta neurovascular disminuye progresivamente, especialmente en la región cervical, lo que entrega evidencia preliminar de este fenómeno de refractariedad. También se observan diferencias entre las zonas cervical y lumbar, lo que sugiere que la respuesta de la médula no es uniforme a lo largo de la columna. En proyección, esta línea de trabajo busca comprender mejor el funcionamiento dinámico de la médula espinal y sentar las bases para utilizar estas mediciones como biomarcadores funcionales, con potencial aplicación en el estudio de dolor neuropático, lesiones medulares y otras condiciones donde los exámenes estructurales tradicionales no muestran alteraciones claras.",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    color: "from-[#2f9fb3]/10 to-[#2f9fb3]/20 border-[#2f9fb3]/20",
    integrantes: ["Glenn Lanyon-Alarcón, Vicente Escudero-Durana, Ana Moya-Beltrán, Jorge Vergara-Quezada, Sergio Uribe, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://i.postimg.cc/RC8tjH9h/Diseno-sin-titulo-(1).jpg", desc: "Posición de los optodos y estimulador." },
      { url: "https://i.postimg.cc/43bbGNPF/unnamed.jpg", desc: "Representación esquemática del período refractario neurovascular en la médula espinal medido mediante fNIRS." }
    ],
    documentos: [
      { titulo: "Póster: Registro de la respuesta neurovascular peri-espinal y detección del período refractario con espectroscopía funcional de infrarrojo cercano", tipo: "Paper", link: "https://drive.google.com/file/d/16sQsgMSYrIOBWN7szBeBbepGM3MG72f2/view?usp=drive_link" }
    ]
  },
{
    id: 9,
    titulo: "Actividad neurovascular de la médula espinal medida con fNIRS",
    desc: "Esta línea de investigación busca comprender cómo responde la médula espinal frente a estímulos nerviosos, utilizando una técnica no invasiva llamada espectroscopía funcional de infrarrojo cercano (fNIRS). El estudio se centra en analizar los cambios en la oxigenación de la sangre alrededor de la médula espinal, con especial énfasis en la desoxihemoglobina, una señal poco explorada que puede entregar información clave sobre el consumo de oxígeno y la dinámica neurovascular. A través de registros realizados en voluntarios sanos y mediante estimulación eléctrica periférica, se observan patrones temporales y espaciales que permiten caracterizar la respuesta funcional de la médula más allá de lo estructural. Estos hallazgos aportan nuevas bases para el desarrollo de herramientas de evaluación funcional, con proyección hacia futuras aplicaciones clínicas en el estudio del dolor lumbar y otras patologías espinales no estructurales.",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    color: "from-[#1e5c6b]/10 to-[#1e5c6b]/20 border-[#1e5c6b]/20",
    integrantes: ["Andrés Vega-Moraga, David Sepúlveda-Velazquez, Gabriel Araya López, Jorge Vergara-Quezada, Sergio Uribe, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna"],
    imagenes: [
      { url: "https://i.postimg.cc/gcRc2X8k/Diseno-sin-titulo.jpg", desc: "Estimulación Nervio Tibial Posterior" },
      { url: "https://i.postimg.cc/jdZpxt8p/Gemini-Generated-Image-qbko4uqbko4uqbko.png", desc: "Representación esquemática de la actividad neurovascular de la médula espinal medida mediante fNIRS." }
    ],
    documentos: [
      { titulo: "Póster: Explorando la dinámica de la desoxihemoglobina en la médula espinal con fNIRS", tipo: "Paper", link: "https://drive.google.com/file/d/11XSWGPeGwT2UQbzL6MG7iSs7oioVjieS/view?usp=drive_link" }
    ]
  }




];

// --- DATA: ACTIVIDADES ---
const ACTIVIDADES = [
  {
    id: 1,
    titulo: "IV Congreso “Vive la Investigación” UTEM 2025",
    fecha: "Octubre 2025",
    lugar: "Universidad Tecnológica Metropolitana, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "Se llevó a cabo la exposición de pósters científicos, donde nuestros integrantes presentaron sus trabajos de investigación desarrollados en el laboratorio, demostrando el compromiso del estudiantado UTEM con el avance de la ciencia y la tecnología.",

    galeria: [
      {
        url: "/actividades/vive-la-investigacion/AndresVIVE.jpeg",
        descripcion: "Andrés Vega: Importancia de la desoxihemoglobina en la respuesta neurovascular peri-espinal medida con fNIRS."
      },
      {
        url: "/actividades/vive-la-investigacion/MatiasVIVE.jpeg",
        descripcion: "Matías Gajardo: Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras la estimulación eléctrica del nervio tibial posterior y mediano en voluntarios sanos."
      },
      {
        url: "/actividades/vive-la-investigacion/GlennVIVE.jpeg",
        descripcion: "Glenn Lanyon: Evaluación del periodo refractario neurovascular de la médula espinal con fNIRS utilizando un protocolo de estimulación progresiva."
      },
       {
        url: "/actividades/vive-la-investigacion/GabrielVIVE.jpeg",
        descripcion: "Gabriel Araya: Spine-fNIRS Web: plataforma web para la visualización de la dinámica neurovascular espinal mediante fNIRS."
      },
      {
        url: "/actividades/vive-la-investigacion/IgnacioVIVE.jpeg",
        descripcion: "Ignacio López: Sistema inteligente para optimizar la voz en dispositivos de laringe electrónica."
      },
      {
        url: "/actividades/vive-la-investigacion/DavidVIVE.jpeg",
        descripcion: "David Sepúlveda: Análisis de respuesta neurovascular con nuevos biomarcadores utilizando fNIRS."
      },
       {
        url: "/actividades/vive-la-investigacion/JuanVIVE.jpeg",
        descripcion: "Juan Toledo: De la imagen al conocimiento: integración de OCR, YOLO y RAG en la construcción de un chat-bot médico."
      },
       {
        url: "/actividades/vive-la-investigacion/VicenteVIVE.jpeg",
        descripcion: "Vicente Escudero: Clasificación automática de señales deglutorias utilizando Machine Learning, acompañado por el profesor Dr. Raúl Caulier."
      }
      
    ],
    participantes: ["Catalina Araniz","Andrés Vega", "Matías Gajardo", "Glenn Lanyon", "Gabriel Araya", "Ignacio López", "David Sepúlveda", "Juan Toledo", "Vicente Escudero"]
  },
  {
    id: 2,
    titulo: "2da Jornada de Innovación en Ingeniería Biomédica I+D+I UACh",
    fecha: "Octubre 2025",
    lugar: "Universidad Austral de Chile, Valdivia, Chile",
    tipo: "Nacional",
    descripcion: "Presentación de sus pósteres de investigación, compartiendo los avances desarrollados en el laboratorio y generando valiosas instancias de conversación científica ",
    galeria: [
      {
        url: "/actividades/idi/CamilaIDI.jpg",
        descripcion: "Camila Guajardo: Simulación computacional del modelo de Hodgkin-Huxley aplicado a la dinámica neuronal"
      },
      {
        url: "/actividades/idi/JuanIDI.jpg",
        descripcion: "Juan Toledo: Chatbots Inteligentes para la Medicina: Uniendo visión por computador, lenguaje y datos."
      },
      {
        url: "/actividades/idi/VicenteIDI.jpg",
        descripcion: "Vicente Escudero: Arquitectura CNN 2D para la clasificación de patrones espectrales deglutorios."
      },
      {
        url: "/actividades/idi/GlennIDI.jpg",
        descripcion: "Glenn Lanyon: Registro de la respuesta neurovascular peri-espinal y detección del periodo refractario con espectroscopia funcional de infrarrojo cercano."
      },
      {
        url: "/actividades/idi/DavidIDI.jpg",
        descripcion: "David Sepúlveda: Nuevos biomarcadores para el análisis de la respuesta neurovascular peri-espinal mediante fNIRS."
      },
      {
        url: "/actividades/idi/GabrielIDI.jpg",
        descripcion: "Gabriel Araya: Spine-fNIRS: Interfaz para la visualización la respuesta neurovascular en la medula espinal."
      },
      {
        url: "/actividades/idi/MatiasIDI.jpg",
        descripcion: "Matias Gajardo: Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras la estimulación eléctrica del nervio tibial posterior y mediano en voluntarios sanos."
      },
      {
        url: "/actividades/idi/AndresIDI.jpg",
        descripcion: "Andrés Vega: Explorando la dinámica de la desoxihemoglobina en la medula espinal con fNIRS."
      }
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
      {
        url: "/actividades/pucon/PuconGlenn.jpg",
        descripcion: "Glenn Lanyon: Potenciación de la respuesta neurovascular periespinal gatillada por estimulación eléctrica con pulsos tándem del nervio medial medida con fNIRS en voluntarios sanos"
      },
       {
        url: "/actividades/pucon/PuconVicente.jpg",
        descripcion: "Vicente Escudero: Potenciación de la respuesta neurovascular periespinal gatillada por estimulación eléctrica con pulsos tándem del nervio medial medida con fNIRS en voluntarios sanos"
      },
      {
        url: "/actividades/pucon/Pucontodos1.jpg",
        descripcion: "Equipo: Algunos de los integrantes de LaTSIB, que participaron del congreso"
      },
      {
        url: "/actividades/pucon/Pucontodos2.jpg",
        descripcion: "Equipo: Algunos de los integrantes de LaTSIB, que participaron del congreso"
      },
            {
        url: "/actividades/pucon/Pucontodos3.jpg",
        descripcion: "Equipo: Algunos de los integrantes de LaTSIB, que participaron del congreso"
      },
      {
        url: "/actividades/pucon/PuconMati.jpg",
        descripcion: "Matías Gajardo, Andrés Vega y David Sepúlveda: Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras la estimulación eléctrica de los nervios tibial posterior o mediano en voluntarios sanos"
      }
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
      {
        url: "/actividades/caseib/Presentacion Glenn.jpeg",
        descripcion: "Glenn Lanyon: Caracterización neurofisiológica de la respuesta neurovascular peri-espinal humana en el diagnóstico funcional de la médula espinal."
      },
      {
        url: "/actividades/caseib/Presentacion Vicente.jpeg",
         descripcion: "Vicente Escudero: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning."
         },
      {
        url: "/actividades/caseib/Presentacion Vicente 2.jpeg",
             descripcion: "Vicente Escudero: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning."
         },
      {
        url: "/actividades/caseib/Presentacion Vicente 3.jpeg",
        descripcion: "Vicente Escudero: Clasificación Automática de Señales Deglutorias Utilizando Machine Learning."
      }
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
      {
        url: "/actividades/caib/PresentacionDavid.jpeg",
        descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”."
      },
      {
        url: "/actividades/caib/PresentacionDavid2.jpeg",
        descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”."
      },
      {
        url: "/actividades/caib/PresentacionDavid3.jpeg",
        descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”."
      },
         {
        url: "/actividades/caib/PresentacionMati.jpeg",
            descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos."
      },
      {
           url: "/actividades/caib/PresentacionMati2.jpeg",
         descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos."
      },
      {
           url: "/actividades/caib/PresentacionMati3.jpeg",
        descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos."
      },
   {
        url: "/actividades/caib/PaperIgnacio.jpeg",
        descripcion: "Ignacio López: Sistema inteligente para optimizar la voz en dispositivos de laringe electrónica (póster científico)."
      },
      {
        url: "/actividades/caib/EntradaJuan.jpeg",
        descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica."
      },
      {
        url: "/actividades/caib/EntradaDavid.jpeg",
        descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica."
      },
      {
        url: "/actividades/caib/EntradaMati.jpeg",
        descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica."
      },
      {
        url: "/actividades/caib/EntradaEntradaIgnacio.jpeg",
        descripcion: "Integrante del laboratorio previo al inicio de las actividades del Congreso Anual de Ingeniería Biomédica."
      },
        {
        url: "/actividades/caib/Grupal.jpeg",
          descripcion: "Fotografías grupales de los participantes del evento."
        },
      {
           url: "/actividades/caib/Grupal2.jpeg",
        descripcion: "Fotografías grupales de los participantes del evento."
        },
      {
          url: "/actividades/caib/EntradaGrupal.jpeg",
        descripcion: "Fotografías grupales de los participantes del evento."
        }
    ],
    participantes: ["David Sepúlveda", "Matías Gajardo", "Ignacio López", "Juan Toledo"]
  },
    {
    id: 6,
    titulo: "Capacita+",
    fecha: "Diciembre 2025",
    lugar: "Casa Central UTEM, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "participación de parte del equipo del laboratorio en Capacita+, instancia que reunió a estudiantes y profesionales en la Universidad Tecnológica Metropolitana en torno al fortalecimiento de competencias tecnológicas y el desarrollo de soluciones innovadoras.",
    galeria: [
      {
        url: "/actividades/capacita+/3.jpeg",
        descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo representaron al laboratorio con compromiso y motivación, destacando por su disposición al aprendizaje continuo y por reflejar los valores de colaboración y excelencia que caracterizan a nuestro equipo."
      },
       {
        url: "/actividades/capacita+/4.jpeg",
        descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo representaron al laboratorio con compromiso y motivación, destacando por su disposición al aprendizaje continuo y por reflejar los valores de colaboración y excelencia que caracterizan a nuestro equipo."
      },
      {
        url: "/actividades/capacita+/1.jpeg",
        descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo: Aprendiendo IA con Google Cloud."
      },
      {
        url: "/actividades/capacita+/2.jpeg",
        descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo: Aprendiendo IA con Google Cloud."
      }
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
      {
        url: "/actividades/steam-utem/1.jpeg",
        descripcion: "En representación de LaTSIB participaron Ignacio López Concha y JUAN CRISTÓBAL TOLEDO FIERRO, mientras que el Laboratorio de Sistemas Complejos fue representado por Camilo Cerda Sarabia y Joaquín Araya."
      },
      {
        url: "/actividades/steam-utem/2.jpeg",
        descripcion: "En representación de LaTSIB participaron Ignacio López Concha y JUAN CRISTÓBAL TOLEDO FIERRO, mientras que el Laboratorio de Sistemas Complejos fue representado por Camilo Cerda Sarabia y Joaquín Araya."
      }
    ],
    participantes: ["Ignacio López Concha", "Juan Cristóbal Toledo Fierro", "Raul Caulier Cisterna", "Jorge Vergara"]
  },
  {
    id: 8,
    titulo: "Workshop BigMedP",
    fecha: "Junio 2026",
    lugar: "Miraflores de la Sierra, Madrid, España",
    tipo: "Internacional",
    descripcion: "Integrantes del LaTSIB participaron en las Jornadas de Trabajo del Biomedical Engineering and Data Science Group (BigMedP), instancia orientada al intercambio científico, la presentación de investigaciones y el fortalecimiento de redes de colaboración internacional.",
    galeria: [
      {
        url: "/actividades/España/PresentacionRaul.JPG",
        descripcion: "El Dr. Raúl Caulier-Cisterna presentó los avances del Laboratorio."
      },
      {
        url: "/actividades/España/PresentacionRaul2.JPG",
        descripcion: "El Dr. Raúl Caulier-Cisterna presentó los avances del Laboratorio."
      },
      {
        url: "/actividades/España/PresentacionRaul3.JPG",
        descripcion: "El Dr. Raúl Caulier-Cisterna presentó los avances del Laboratorio."
      },
      {
        url: "/actividades/España/PresentacionAndres.JPG",
         descripcion: "Andrés Vega presentó la charla: Análisis morfológico de señales biológicas mediante autoencoders y caracterización del espacio latente. "
      },
      {
        url: "/actividades/España/PresentacionAndres2.JPG",
         descripcion: "Andrés Vega presentó la charla: Análisis morfológico de señales biológicas mediante autoencoders y caracterización del espacio latente. "
      },
      {
        url: "/actividades/España/PresentacionAndres3.JPG",
        descripcion: "Andrés Vega presentó la charla: Análisis morfológico de señales biológicas mediante autoencoders y caracterización del espacio latente. "
      },
         {
      url: "/actividades/España/Grupal.jpg",
           descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra."
    },
      {
           url: "/actividades/España/Grupal2.jpg",
        descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra."
    },
      {
           url: "/actividades/España/AtencionMati.jpg",
        descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra."
    },
      {
           url: "/actividades/España/PoniendoAtencion.jpg",
      descripcion: "Integrantes del LaTSIB durante las jornadas de trabajo realizadas en Miraflores de la Sierra."
    }
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
      {
        url: "/actividades/España/AtencionTesis.jpg",
        descripcion: "Asistencia a la defensa de tesis doctoral realizada en el campus de Fuenlabrada."
      },
      {
        url: "/actividades/España/JuradoDeTesis.jpg",
        descripcion: "Dr. Raúl Caulier como jurado en la tesis doctoral en la Universidad Rey Juan Carlos"
      },
         {
      url: "/actividades/España/ProfeRaulTesis.jpg",
      descripcion: "Finalización de la tesis con académicos e investigadores de la Universidad Rey Juan Carlos."
    },
    ],
    participantes: ["Raúl Caulier", "Andrés Vega", "Matías Gajardo", "Camila Guajardo"]
  },
   {
    id: 10,
    titulo: "Visita académica a la Universidad Pablo de Olavide",
    fecha: "Junio 2026",
    lugar: "Universidad Pablo de Olavide, Sevilla, España",
    tipo: "Internacional",
    descripcion: "Como parte de la visita académica a España, integrantes del LaTSIB participaron en reuniones de trabajo en la Universidad Pablo de Olavide y realizaron una visita al laboratorio IMASD Running. La instancia permitió presentar las líneas de investigación del laboratorio, conocer capacidades en biomecánica, análisis del movimiento humano, evaluación funcional y rendimiento deportivo, además de explorar oportunidades de colaboración internacional en ingeniería biomédica, procesamiento de señales, ciencia de datos y tecnologías aplicadas a la salud.",
    galeria: [
      {
        url: "/actividades/España/VisitaPabloOlavide.jpg",
        descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico del movimiento humano y el rendimiento deportivo."
      },
      {
        url: "/actividades/España/VisitaPabloOlavide2.jpg",
        descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico del movimiento humano y el rendimiento deportivo."
      },
      {
        url: "/actividades/España/VisitaPabloOlavide3.jpg",
        descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico del movimiento humano y el rendimiento deportivo."
      },
      {
        url: "/actividades/España/VisitaPabloOlavide4.jpg",
        descripcion: "Visita al laboratorio IMASD Running, donde se conocieron metodologías y tecnologías aplicadas al análisis biomecánico del movimiento humano y el rendimiento deportivo."
      },
    ],
    participantes: ["Raúl Caulier", "Andrés Vega", "Matías Gajardo", "Camila Guajardo"]
  },
   {
    id: 11,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 1» reunió durante jornadas a especialistas, profesionales, académicos y estudiantes para acercar la ingeniería biomédica a la realidad clínica, las tecnologías emergentes y el futuro de la salud. La iniciativa abordó temáticas como análisis neurovascular, modelamiento biomédico, Deep Learning, comunicación aumentativa, innovación en tecnología médica e inteligencia artificial aplicada al diagnóstico, además de visibilizar proyectos de investigación desarrollados por estudiantes de pregrado, postgrado e integrantes de los laboratorios participantes.",
    galeria: [
      {
        url: "/actividades/ciclodeseminarios/Antonio1.jpg",
        descripcion: "El Dr. Antonio Eblen-Zajjur presentó avances relacionados con la evaluación miocárdica mediante balistocardiograma y destacó la importancia de acercar la medicina clínica a quienes desarrollan soluciones tecnológicas."
      },
      {
        url: "/actividades/ciclodeseminarios/Antonio2.jpg",
        descripcion: "El Dr. Antonio Eblen-Zajjur presentó avances relacionados con la evaluación miocárdica mediante balistocardiograma y destacó la importancia de acercar la medicina clínica a quienes desarrollan soluciones tecnológicas."
      },
      {
        url: "/actividades/ciclodeseminarios/Antonio3.jpg",
        descripcion: "El Dr. Antonio Eblen-Zajjur presentó avances relacionados con la evaluación miocárdica mediante balistocardiograma y destacó la importancia de acercar la medicina clínica a quienes desarrollan soluciones tecnológicas."
      },
      {
        url: "/actividades/ciclodeseminarios/Antonio4.jpg",
        descripcion: "El Dr. Antonio Eblen-Zajjur presentó avances relacionados con la evaluación miocárdica mediante balistocardiograma y destacó la importancia de acercar la medicina clínica a quienes desarrollan soluciones tecnológicas."
      },
      {
        url: "/actividades/ciclodeseminarios/Glenn1.jpg",
        descripcion: "Glenn Lanyon presentó: Desarrollo de software para el análisis de la respuesta neurovascular y la caracterización del período refractario."
      },
      {
         url: "/actividades/ciclodeseminarios/Glenn2.jpg",
        descripcion: "Glenn Lanyon presentó: Desarrollo de software para el análisis de la respuesta neurovascular y la caracterización del período refractario."
      },
      {
         url: "/actividades/ciclodeseminarios/Glenn3.jpg",
        descripcion: "Glenn Lanyon presentó: Desarrollo de software para el análisis de la respuesta neurovascular y la caracterización del período refractario."
      },
      {
         url: "/actividades/ciclodeseminarios/Glenn4.jpg",
        descripcion: "Glenn Lanyon presentó: Desarrollo de software para el análisis de la respuesta neurovascular y la caracterización del período refractario."
      },
       {
        url: "/actividades/ciclodeseminarios/Gabriel1.jpg",
         descripcion: "Gabriel Araya presentó: Spine-fNirs Web: Herramienta para el análisis de la respuesta neurovascular en la médula espinal."
      },
      {
         url: "/actividades/ciclodeseminarios/Gabriel2.jpg",
        descripcion: "Gabriel Araya presentó: Spine-fNirs Web: Herramienta para el análisis de la respuesta neurovascular en la médula espinal."
      },
       {
        url: "/actividades/ciclodeseminarios/Matias1.jpg",
         descripcion: "Matias Gajardo presentó: Modelando la médula espinal con fNIRS: Un enfoque de ineniería biomédica y estadística no paramétrica."
      },
      {
         url: "/actividades/ciclodeseminarios/Matias2.jpg",
        descripcion: "Matias Gajardo presentó: Modelando la médula espinal con fNIRS: Un enfoque de ineniería biomédica y estadística no paramétrica."
      },
      {
         url: "/actividades/ciclodeseminarios/Matias3.jpg",
        descripcion: "Matias Gajardo presentó: Modelando la médula espinal con fNIRS: Un enfoque de ineniería biomédica y estadística no paramétrica."
      },
      {
         url: "/actividades/ciclodeseminarios/Matias4.jpg",
        descripcion: "Matias Gajardo presentó: Modelando la médula espinal con fNIRS: Un enfoque de ineniería biomédica y estadística no paramétrica."
      },
       {
        url: "/actividades/ciclodeseminarios/Renato1.jpg",
         descripcion: "Renato Álvarez del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Detección de anomalías genómicas mediante modelos deep learning en scRNA-seq."
      },
      {
          url: "/actividades/ciclodeseminarios/Renato2.jpg",
        descripcion: "Renato Álvarez del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Detección de anomalías genómicas mediante modelos deep learning en scRNA-seq."
      },
      {
          url: "/actividades/ciclodeseminarios/Renato3.jpg",
        descripcion: "Renato Álvarez del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Detección de anomalías genómicas mediante modelos deep learning en scRNA-seq."
      },
      {
          url: "/actividades/ciclodeseminarios/Renato4.jpg",
        descripcion: "Renato Álvarez del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Detección de anomalías genómicas mediante modelos deep learning en scRNA-seq."
      },
       {
        url: "/actividades/ciclodeseminarios/Alejandro1.jpg",
         descripcion: "Alejandro Sanz del programa Doctorado en Matemáticas UPV presentó: Reconstrucción de imagen de tomografía por emisión de positrones con Deep Learning."
      },
      {
         url: "/actividades/ciclodeseminarios/Alejandro2.jpg",
        descripcion: "Alejandro Sanz del programa Doctorado en Matemáticas UPV presentó: Reconstrucción de imagen de tomografía por emisión de positrones con Deep Learning."
      },
      {
         url: "/actividades/ciclodeseminarios/Alejandro3.jpg",
        descripcion: "Alejandro Sanz del programa Doctorado en Matemáticas UPV presentó: Reconstrucción de imagen de tomografía por emisión de positrones con Deep Learning."
      },
      {
         url: "/actividades/ciclodeseminarios/Alejandro4.jpg",
        descripcion: "Alejandro Sanz del programa Doctorado en Matemáticas UPV presentó: Reconstrucción de imagen de tomografía por emisión de positrones con Deep Learning."
      }
    ],
    participantes: ["Antonio Eblen-Zajjur", "Glenn Lanyon", "Gabriel Araya", "Matias Gajardo", "Renato Álvarez", "Alejandro Sanz"]
  },
    {
    id: 12,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 2» reunió durante jornadas a especialistas, profesionales, académicos y estudiantes para acercar la ingeniería biomédica a la realidad clínica, las tecnologías emergentes y el futuro de la salud. La iniciativa abordó temáticas como análisis neurovascular, modelamiento biomédico, Deep Learning, comunicación aumentativa, innovación en tecnología médica e inteligencia artificial aplicada al diagnóstico, además de visibilizar proyectos de investigación desarrollados por estudiantes de pregrado, postgrado e integrantes de los laboratorios participantes.",
    galeria: [
      {
        url: "/actividades/ciclodeseminarios/Marcia1.jpg",
        descripcion: "La fonoaudióloga Marcia Toloza Dauvergne abordó los desafíos de la comunicación cuando no hay voz y el potencial de las tecnologías de apoyo desarrolladas desde un enfoque interdisciplinario."
      },
      {
        url: "/actividades/ciclodeseminarios/Marcia2.jpg",
        descripcion: "La fonoaudióloga Marcia Toloza Dauvergne abordó los desafíos de la comunicación cuando no hay voz y el potencial de las tecnologías de apoyo desarrolladas desde un enfoque interdisciplinario."
      },
      {
        url: "/actividades/ciclodeseminarios/Marcia3.jpg",
        descripcion: "La fonoaudióloga Marcia Toloza Dauvergne abordó los desafíos de la comunicación cuando no hay voz y el potencial de las tecnologías de apoyo desarrolladas desde un enfoque interdisciplinario."
      },
      {
        url: "/actividades/ciclodeseminarios/Marcia4.jpg",
        descripcion: "La fonoaudióloga Marcia Toloza Dauvergne abordó los desafíos de la comunicación cuando no hay voz y el potencial de las tecnologías de apoyo desarrolladas desde un enfoque interdisciplinario."
      },
      {
        url: "/actividades/ciclodeseminarios/Ignacio1.jpg",
        descripcion: "Ignacio López presentó: Sistema para mejorar la comunicación en dispositivos de laringe electrónica mediante aplicación móvil."
      },
      {
        url: "/actividades/ciclodeseminarios/Ignacio2.jpg",
        descripcion: "Ignacio López presentó: Sistema para mejorar la comunicación en dispositivos de laringe electrónica mediante aplicación móvil."
      },
       {
        url: "/actividades/ciclodeseminarios/David1.jpg",
         descripcion: "David Sepúlveda presentó: Ingeniería biomédica en acción: De la adquisición de señales a la inteligencia artificial en salud."
      },
      {
         url: "/actividades/ciclodeseminarios/David2.jpg",
        descripcion: "David Sepúlveda presentó: Ingeniería biomédica en acción: De la adquisición de señales a la inteligencia artificial en salud."
      },
      {
         url: "/actividades/ciclodeseminarios/David3.jpg",
        descripcion: "David Sepúlveda presentó: Ingeniería biomédica en acción: De la adquisición de señales a la inteligencia artificial en salud."
      },
       {
        url: "/actividades/ciclodeseminarios/Camilo1.jpg",
         descripcion: "Camilo Cerda del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: ¿Cómo lee una IA el ADN? Representación de datos y predicción de resistencia a antibióticos."
      },
      {
         url: "/actividades/ciclodeseminarios/Camilo2.jpg",
        descripcion: "Camilo Cerda del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: ¿Cómo lee una IA el ADN? Representación de datos y predicción de resistencia a antibióticos."
      },
      {
         url: "/actividades/ciclodeseminarios/Camilo3.jpg",
        descripcion: "Camilo Cerda del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: ¿Cómo lee una IA el ADN? Representación de datos y predicción de resistencia a antibióticos."
      },
      {
         url: "/actividades/ciclodeseminarios/Camilo4.jpg",
        descripcion: "Camilo Cerda del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: ¿Cómo lee una IA el ADN? Representación de datos y predicción de resistencia a antibióticos."
      },
       {
        url: "/actividades/ciclodeseminarios/Wellinton1.jpg",
         descripcion: "Wellinton Barrera del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Beyond Linearity: From clustering benchmarks to deep latent representations in Single-Cell lung cancer transcriptomics."
      },
      {
         url: "/actividades/ciclodeseminarios/Wellinton2.jpg",
        descripcion: "Wellinton Barrera del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Beyond Linearity: From clustering benchmarks to deep latent representations in Single-Cell lung cancer transcriptomics."
      },
      {
         url: "/actividades/ciclodeseminarios/Wellinton3.jpg",
        descripcion: "Wellinton Barrera del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Beyond Linearity: From clustering benchmarks to deep latent representations in Single-Cell lung cancer transcriptomics."
      },
       {
        url: "/actividades/ciclodeseminarios/Felipe1.jpg",
         descripcion: "Felipe Espinoza del programa Doctorado en Informática aaplicada a salud y medio ambiente presentó: Análisis de señales ECG y clasificación de arritmias con deep learning."
      },
      {
         url: "/actividades/ciclodeseminarios/Felipe2.jpg",
        descripcion: "Felipe Espinoza del programa Doctorado en Informática aaplicada a salud y medio ambiente presentó: Análisis de señales ECG y clasificación de arritmias con deep learning."
      },
      {
         url: "/actividades/ciclodeseminarios/Felipe3.jpg",
        descripcion: "Felipe Espinoza del programa Doctorado en Informática aaplicada a salud y medio ambiente presentó: Análisis de señales ECG y clasificación de arritmias con deep learning."
      }
    ],
    participantes: ["Marcia Toloza", "Ignacio López", "David Sepúlveda", "Camilo Cerda", "Wellinton Barrera", "Felipe Espinoza"]
  },
   {
    id: 13,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 3» reunió durante jornadas a especialistas, profesionales, académicos y estudiantes para acercar la ingeniería biomédica a la realidad clínica, las tecnologías emergentes y el futuro de la salud. La iniciativa abordó temáticas como análisis neurovascular, modelamiento biomédico, Deep Learning, comunicación aumentativa, innovación en tecnología médica e inteligencia artificial aplicada al diagnóstico, además de visibilizar proyectos de investigación desarrollados por estudiantes de pregrado, postgrado e integrantes de los laboratorios participantes.",
    galeria: [
      {
        url: "/actividades/ciclodeseminarios/Carolina1.jpg",
        descripcion: "Carolina Giesen compartió su experiencia en innovación y mercados globales, vinculando la práctica clínica con el desarrollo y liderazgo en tecnología médica."
      },
      {
        url: "/actividades/ciclodeseminarios/Carolina2.jpg",
        descripcion: "Carolina Giesen compartió su experiencia en innovación y mercados globales, vinculando la práctica clínica con el desarrollo y liderazgo en tecnología médica."
      },
      {
        url: "/actividades/ciclodeseminarios/Carolina3.jpg",
        descripcion: "Carolina Giesen compartió su experiencia en innovación y mercados globales, vinculando la práctica clínica con el desarrollo y liderazgo en tecnología médica."
      },
      {
        url: "/actividades/ciclodeseminarios/Carolina4.jpg",
        descripcion: "Carolina Giesen compartió su experiencia en innovación y mercados globales, vinculando la práctica clínica con el desarrollo y liderazgo en tecnología médica."
      },
      {
        url: "/actividades/ciclodeseminarios/Camila1.jpg",
        descripcion: "Camila Guajardo presentó: Divulgación Científica: Acercando el conocimiento a la sociedad."
      },
      {
        url: "/actividades/ciclodeseminarios/Camila2.jpg",
        descripcion: "Camila Guajardo presentó: Divulgación Científica: Acercando el conocimiento a la sociedad."
      },
      {
        url: "/actividades/ciclodeseminarios/Camila3.jpg",
        descripcion: "Camila Guajardo presentó: Divulgación Científica: Acercando el conocimiento a la sociedad."
      },
      {
        url: "/actividades/ciclodeseminarios/Camila4.jpg",
        descripcion: "Camila Guajardo presentó: Divulgación Científica: Acercando el conocimiento a la sociedad."
      },
       {
        url: "/actividades/ciclodeseminarios/Claudia1.jpg",
         descripcion: "Claudia Cancino del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Interpretable deep learning for classification of plasma metabolomic profiles in lung adenocarcinoma."
      },
      {
         url: "/actividades/ciclodeseminarios/Claudia2.jpg",
        descripcion: "Claudia Cancino del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Interpretable deep learning for classification of plasma metabolomic profiles in lung adenocarcinoma."
      },
      {
         url: "/actividades/ciclodeseminarios/Claudia3.jpg",
        descripcion: "Claudia Cancino del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Interpretable deep learning for classification of plasma metabolomic profiles in lung adenocarcinoma."
      },
      {
         url: "/actividades/ciclodeseminarios/Claudia4.jpg",
        descripcion: "Claudia Cancino del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Interpretable deep learning for classification of plasma metabolomic profiles in lung adenocarcinoma."
      },
       {
        url: "/actividades/ciclodeseminarios/ProfeDavid1.jpg",
         descripcion: "David Castro-Salinas del programa Magíster en ingeniería informática y estudiante de Doctorado presentó: Realidad virtual y entornos inmersivos para la formación en Ciencias e Ingeniería."
      },
      {
         url: "/actividades/ciclodeseminarios/ProfeDavid2.jpg",
        descripcion: "David Castro-Salinas del programa Magíster en ingeniería informática y estudiante de Doctorado presentó: Realidad virtual y entornos inmersivos para la formación en Ciencias e Ingeniería."
      },
      {
         url: "/actividades/ciclodeseminarios/ProfeDavid3.jpg",
        descripcion: "David Castro-Salinas del programa Magíster en ingeniería informática y estudiante de Doctorado presentó: Realidad virtual y entornos inmersivos para la formación en Ciencias e Ingeniería."
      },
      {
         url: "/actividades/ciclodeseminarios/ProfeDavid4.jpg",
        descripcion: "David Castro-Salinas del programa Magíster en ingeniería informática y estudiante de Doctorado presentó: Realidad virtual y entornos inmersivos para la formación en Ciencias e Ingeniería."
      }
    ],
    participantes: ["Carolina Giesen", "Camila Guajardo", "Claudia Cancino", "David Castro-Salinas"]
  },
   {
    id: 14,
    titulo: "Ciclo de Seminarios LaTSIB",
    fecha: "Primer Semestre del 2026",
    lugar: "Universidad Tecnológica Metropolitana, Facultad de Ingeniería, Santiago, Chile",
    tipo: "Nacional",
    descripcion: "El ciclo de seminarios «Introducción a la Ingeniería Civil Biomédica | Jornada 4» reunió durante jornadas a especialistas, profesionales, académicos y estudiantes para acercar la ingeniería biomédica a la realidad clínica, las tecnologías emergentes y el futuro de la salud. La iniciativa abordó temáticas como análisis neurovascular, modelamiento biomédico, Deep Learning, comunicación aumentativa, innovación en tecnología médica e inteligencia artificial aplicada al diagnóstico, además de visibilizar proyectos de investigación desarrollados por estudiantes de pregrado, postgrado e integrantes de los laboratorios participantes.",
    galeria: [
      {
        url: "/actividades/ciclodeseminarios/Marcelo1.JPG",
        descripcion: "El Dr. Marcelo Andia presentó el papel de la inteligencia artificial y las imágenes médicas en el procesamiento de datos, la reducción de costos y la anticipación de diagnósticos."
      },
      {
        url: "/actividades/ciclodeseminarios/Marcelo2.JPG",
        descripcion: "El Dr. Marcelo Andia presentó el papel de la inteligencia artificial y las imágenes médicas en el procesamiento de datos, la reducción de costos y la anticipación de diagnósticos."
      },
      {
        url: "/actividades/ciclodeseminarios/Marcelo3.JPG",
        descripcion: "El Dr. Marcelo Andia presentó el papel de la inteligencia artificial y las imágenes médicas en el procesamiento de datos, la reducción de costos y la anticipación de diagnósticos."
      },
      {
        url: "/actividades/ciclodeseminarios/Marcelo4.JPG",
        descripcion: "El Dr. Marcelo Andia presentó el papel de la inteligencia artificial y las imágenes médicas en el procesamiento de datos, la reducción de costos y la anticipación de diagnósticos."
      },
      {
        url: "/actividades/ciclodeseminarios/Juan1.JPG",
        descripcion: "Juan Toledo presentó: Generación de señales biomédicas usando deep learning"
      },
      {
        url: "/actividades/ciclodeseminarios/Juan2.JPG",
        descripcion: "Juan Toledo presentó: Generación de señales biomédicas usando deep learning"
      },
      {
        url: "/actividades/ciclodeseminarios/Juan3.JPG",
        descripcion: "Juan Toledo presentó: Generación de señales biomédicas usando deep learning"
      },
      {
        url: "/actividades/ciclodeseminarios/Juan4.JPG",
        descripcion: "Juan Toledo presentó: Generación de señales biomédicas usando deep learning"
      },
       {
        url: "/actividades/ciclodeseminarios/Cristopher1.JPG",
         descripcion: "Cristopher Retamales del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Scaling pangenome alignment: GPU acceleration and performance bottleneck analysis of wfmash for large-scale genomics."
      },
      {
         url: "/actividades/ciclodeseminarios/Cristopher2.JPG",
        descripcion: "Cristopher Retamales del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Scaling pangenome alignment: GPU acceleration and performance bottleneck analysis of wfmash for large-scale genomics."
      },
      {
         url: "/actividades/ciclodeseminarios/Cristopher3.JPG",
        descripcion: "Cristopher Retamales del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Scaling pangenome alignment: GPU acceleration and performance bottleneck analysis of wfmash for large-scale genomics."
      },
      {
         url: "/actividades/ciclodeseminarios/Cristopher4.JPG",
        descripcion: "Cristopher Retamales del Laboratorio de Sistemas Complejos Impulsados por Datos presentó: Scaling pangenome alignment: GPU acceleration and performance bottleneck analysis of wfmash for large-scale genomics."
      },
       {
        url: "/actividades/ciclodeseminarios/Fausto1.JPG",
         descripcion: "Fausto Cabezas del programa Doctorado, DIASMA presentó: Selección natural digital: Evolución y priorización de novo de péptidos terapéuticos con PEGA.py."
      },
      {
         url: "/actividades/ciclodeseminarios/Fausto2.JPG",
        descripcion: "Fausto Cabezas del programa Doctorado, DIASMA presentó: Selección natural digital: Evolución y priorización de novo de péptidos terapéuticos con PEGA.py."
      },
      {
         url: "/actividades/ciclodeseminarios/Fausto3.JPG",
        descripcion: "Fausto Cabezas del programa Doctorado, DIASMA presentó: Selección natural digital: Evolución y priorización de novo de péptidos terapéuticos con PEGA.py."
      },
      {
         url: "/actividades/ciclodeseminarios/Fausto4.JPG",
        descripcion: "Fausto Cabezas del programa Doctorado, DIASMA presentó: Selección natural digital: Evolución y priorización de novo de péptidos terapéuticos con PEGA.py."
      }
    ],
    participantes: ["Marcelo Andia", "Juan Toledo", "Cristopher Retamales", "Fausto Cabezas"]
  },
];

const PUBLICACIONES = [
  {
    titulo: "The Effectiveness of NIRS-Based Wearable Devices in Estimating Physical Activity Intensity in Patients with Chronic Non-Communicable Diseases: A Structured Narrative Review",
    revista: "Medical Sciences",
    year: "2026",
    autor: "Raúl Caulier-Cisterna, Andrés Vega-Moraga, Diego Ramos-López y Felipe Contreras-Briceño.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13304124/",
    instagram: "https://www.instagram.com/p/DbdkZhqkUsL/?img_index=1"
  },
  {
    titulo: "Altered neurovascular responses recorded after incomplete spinal cord injury recorded by a noninvasive near-infrared spectroscopy in a pilot case-control report",
    revista: "Discover Neuroscience",
    year: "2026",
    autor: "Juan P. Appelgren-Gonzalez, Raúl Caulier-Cisterna, Juan E. Oyarzún, Sergio Uribe y Antonio Eblen-Zajjur.",
    link: "https://link.springer.com/article/10.1186/s13064-026-00266-5",
    instagram: "https://www.instagram.com/p/Dbo5XJaEYa0/?img_index=1"
  },
  {
    titulo: "Neonatal anthropometry outcomes comparing two gestational weight gain standards",
    revista: "Obstetrics & Gynecology International Journal",
    year: "2025",
    autor: "Francisco Mardones, Pedro Rosso, Marcelo Farías-Jofré, Sofia Ulloa, Luis Villarroel, Raúl Caulier-Cisterna, Martin Miranda-Hurtado, Álvaro Erazo, Glenn Lanyon-Alarcón.",
    link: "https://medcraveonline.com/OGIJ/neonatal-anthropometry-outcomes-comparing-two-gestational-weight-gain-standards.html",
    instagram: "https://www.instagram.com/p/DYCy6KikVBa/?img_index=1"
  },
  {
    titulo: "Clasificación Automática de Señales Deglutorias Utilizando Machine Learning",
    revista: "CASEIB 2025: Libro de Actas del XLIII Congreso Anual de la Sociedad Española de Ingeniería Biomédica",
    year: "2025",
    autor: "Vicente Escudero, David Sepúlveda-Velazquez, Glenn Lanyon-Alarcón, Andrés Vega-Moraga, Jorge Vergara-Quezada, Constanza Echeverria, Rodrigo Tobar-Fredes, Gustavo Schleyer, Patricio Fuentealba, Raúl Caulier-Cisterna et al.",
    link: "https://dialnet.unirioja.es/servlet/articulo?codigo=10695623",
    instagram: "https://www.instagram.com/p/DZYqdwzDNiV/?img_index=1"
  },
  {
    titulo: "Spine-fNIRS Web: Interfaz Gráfica Remota para el Análisis y Visualización de Señales de la Respuesta Neurovascular en la Médula Espinal",
    revista: "CASEIB 2025: Libro de Actas del XLIII Congreso Anual de la Sociedad Española de Ingeniería Biomédica",
    year: "2025",
    autor: "Gabriel Araya López, Andrés Vega-Moraga, Glenn Lanyon-Alarcón, Jorge Vergara-Quezada, Sergio Uribe, Antonio Eblen-Zajjur, Raúl Caulier-Cisterna.",
    link: "https://lnkd.in/dgvE2KJa",
    instagram: "https://www.instagram.com/p/DZbQNwQjNvJ/?img_index=1"
  },
  {
    titulo: "Interpretable machine learning model for characterizing magnetic susceptibility-based biomarkers in first episode psychosis",
    revista: "Computer Methods and Programs in Biomedicine (Elsevier)",
    year: "2025",
    autor: "Cristian Montalba, Raúl Caulier-Cisterna, Carlos Milovic, Alfonso González, Juan Pablo Ramirez-Mahaluf, Juan Undurraga, Rodrigo Salas, Nicolás Crossley, Cristian Tejos y Sergio Uribe.",
    link: "https://www.sciencedirect.com/science/article/pii/S0169260725004845",
    instagram: "https://www.instagram.com/p/DXz_PtkkbtE/?img_index=1"
  },
  {
    titulo: "Sex differences in the prefrontal cortex during exercise",
    revista: "Experimental Physiology",
    year: "2025",
    autor: "Daniel Ramos‐López, Raúl Caulier‐Cisterna, Benjamín Díaz‐Ortiz, Cristóbal Baumann‐Biancani, Kamilo Hunger‐Abbott, Matías Herrera‐Matas, Andrés Vega‐Moraga, Vitor A. Lira, Maximiliano Espinosa‐Ramírez, Karol Ramírez‐Parada, Luigi Gabrielli‐Nervi, Hugo E. Verdejo y Felipe Contreras‐Briceño.",
    link: "https://physoc.onlinelibrary.wiley.com/doi/full/10.1113/EP093287",
    instagram: ""
  },
  {
    titulo: "Comparison of LED- and LASER-based fNIRS technologies to record the human peri-spinal cord neurovascular response",
    revista: "Medical Engineering & Physics (Elsevier)",
    year: "2024",
    autores: "Raul Caulier Cisterna M. Id, Juan-Pablo Appelgren-Gonzales, Juan-Esteban Oyarzun, Felipe Valenzuela, Ranganatha Sitaram, Antonio Eblen-Zajjur y Sergio Uribe.",
    link: "https://www.sciencedirect.com/science/article/pii/S1350453324000717",
    instagram: "https://www.instagram.com/p/DWpiJRgEYxO/?img_index=1"
  },
  {
    titulo: "Using Near-Infrared Spectroscopy Wearable Devices to Identify Central Versus Peripheral Limitations During Exercise",
    revista: "JoVE, N° 214, e67609",
    year: "2024",
    autor: "Matías Carreño-Román, Daniel Ramos-López, Benjamín Rapaport, Raúl Caulier-Cisterna, Maximiliano Espinosa-Ramírez y Felipe Contreras-Briceño.",
    link: "https://app.jove.com/t/67609/using-near-infrared-spectroscopy-wearable-devices-to-identify-central",
    instagram: "https://www.instagram.com/p/DXAdZIEkdYb/?img_index=1"
  },
];

// --- DATA: CATEGORÍAS Y EQUIPO ---

const CATEGORIAS_EQUIPO = [
  { id: 'academicos', titulo: 'Académicos' },
  { id: 'colaboradores', titulo: 'Colaboradores' },
  { id: 'asistentes', titulo: 'Asistentes de Investigación' },
  { id: 'tesistas', titulo: 'Tesistas' },
  { id: 'doctorandos', titulo: 'Doctorandos' },
];

const EQUIPO = [
  {
    nombre: "DR. Raúl Caulier Cisterna",
    categoria: "academicos",
    rol: "Director e Investigador Principal del Laboratorio LaTSIB",
    bio: "PhD en Multimedia y Comunicaciones, Especialista en Biomédica, Machine Learning, Análisis de Señales y Datos",
    img: "https://fing.utem.cl/wp-content/uploads/sites/6/2023/11/Raul-Paul-Caulier-Cisterna.jpg",
    actividadesLab: "Dirección general e investigación principal en el Laboratorio LaTSIB. Liderazgo de proyectos en procesamiento de señales biomédicas (fNIRS, EMG, EEG), machine learning aplicado al diagnóstico clínico y colaboración interdisciplinaria.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/rcaulier/",
      github: "",
      email: "rcaulier@utem.cl"
    }
  },
  {
    nombre: "Matías Gajardo De La Fuente",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería civil en computación menc. informática",
    img: "/equipo/MatiasPERFIL.jpg",
    actividadesLab: "El trabajo de Matías se centra en el análisis de señales biomédicas y neurocientíficas, utilizando herramientas de procesamiento y análisis de datos para estudiar respuestas fisiológicas y explorar su potencial aplicación en investigación y diagnóstico.\n\nParticipa en el análisis de la respuesta neurovascular espinal (RNV) mediante fNIRS frente a la estimulación de los nervios tibial posterior y mediano. Además, apoya el análisis espectral de señales acústicas intestinales en modelos murinos, orientado a la caracterización de cólicos y la identificación de posibles biomarcadores diagnósticos.\n\nTambién participa en la comparación de equipamiento neurocientífico, evaluando tecnologías como fNIRS, EEG Bitbrain y eye-tracking Tobii para apoyar futuros estudios colaborativos entre distintos centros de investigación.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/matias-adrian-gajardo-de-la-fuente/",
      github: "https://github.com/xhorus11",
      email: "mgajardod@utem.cl"
    }
  },
  {
    nombre: "Juan Toledo Fierro",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/JuanPERFIL.jpg",
    actividadesLab: "El trabajo de Juan se centra en la aplicación de inteligencia artificial al procesamiento de señales biomédicas, específicamente en el uso de algoritmos de Self-Supervised Learning para el análisis y generación de señales electrocardiográficas (ECG).\n\nSu investigación busca generar señales ECG sintéticas mediante técnicas de autoaprendizaje, con el objetivo de realizar data augmentation y construir bases de datos más balanceadas, contribuyendo al desarrollo de modelos de inteligencia artificial más robustos para aplicaciones biomédicas.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/juan-crist%C3%B3bal-toledo-fierro-83787129b/",
      github: "",
      email: "jtoledof@utem.cl"
    }
  },
  {
    nombre: "David Sepulveda Velásquez",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/DavidPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "https://www.linkedin.com/in/david-sepulveda-vel%C3%A1squez-6311602a8/",
      github: "",
      email: "svelasquez@utem.cl"
    }
  },
  {
    nombre: "Andrés Vega Moraga",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/AndrésPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "https://www.linkedin.com/in/andres-nicolas-vega-moraga-950b3128b/",
      github: "",
      email: "avega@utem.cl"
    }
  },
  {
    nombre: "Clemente Uribe Ortiz",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/ClementePERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "https://www.linkedin.com/in/clemente-uribe-18b79a39b/",
      github: "",
      email: "curibeo@utem.cl"
    }
  },
  {
    nombre: "Glenn Lanyon Lanyon",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/GlennPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "",
      github: "",
      email: "glanyon@utem.cl"
    }
  },
  {
    nombre: "Catalina Araniz Arancibia",
    categoria: "asistentes",
    rol: "Asistente Investigadora",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "/equipo/CatalinaPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "",
      github: "https://github.com/cataaraniz",
      email: "caraniz@utem.cl"
    }
  },
   {
    nombre: "Gabriel Araya López",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Informática",
    img: "/equipo/GabrielPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "https://www.linkedin.com/in/gabriel-ignacio-a-6924b921a/",
      github: "",
      email: "garaya@utem.cl"
    }
  },
  {
    nombre: "Vicente Escudero Durana",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/VicentePERFIL.jpg",
    actividadesLab: "El trabajo de Vicente se centra en la investigación y desarrollo de herramientas de apoyo al diagnóstico mediante inteligencia artificial y procesamiento de señales biomédicas.\n\nActualmente investiga señales acústicas intestinales en modelos murinos como posibles biomarcadores de cólicos. Además, desarrolla una aplicación de apoyo diagnóstico que integra visión artificial y modelos matemáticos para la segmentación de lesiones óseas, contribuyendo a la automatización y análisis de información médica.",
    contactos: {
      linkedin: "",
      github: "",
      email: "vescuderod@utem.cl"
    }
  },
  {
    nombre: "Camila Guajardo Bravo",
    categoria: "asistentes",
    rol: "Asistente Investigadora",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "/equipo/CamilaPERFIL.jpg",
    actividadesLab: "El trabajo de Camila se centra principalmente en la divulgación científica, buscando transformar y comunicar el conocimiento generado en el laboratorio de manera clara, visual y accesible, acercando la investigación científica a la comunidad y a públicos no especializados.\n\nPara ello, desarrolla contenido para redes sociales y plataformas digitales, difundiendo investigaciones, proyectos, publicaciones, seminarios y actividades del laboratorio. También apoya la creación de material gráfico y audiovisual, así como la gestión de su presencia digital y página web.\n\nEl objetivo es visibilizar el trabajo científico del LaTSIB, facilitar su comprensión y fortalecer la conexión entre la investigación, la comunidad y el entorno académico.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/camila-millaray-guajardo-bravo-b94297293/",
      github: "https://github.com/vmylla",
      email: "cguajardo@utem.cl"
    }
  },
  {
    nombre: "Nicolás Frieri Baez",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil Biomédica",
    img: "/equipo/NicolasPERFIL.png",
    actividadesLab: "",
    contactos: {
      linkedin: "",
      github: "",
      email: "nfrieri@utem.cl"
    }
  },
  {
    nombre: "Lucas Valdebenito Maldonado",
    categoria: "asistentes",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil Biomédica",
    img: "/equipo/LucasPERFIL.jpg",
    actividadesLab: "El trabajo de Lucas se centra en el desarrollo de soluciones basadas en inteligencia artificial, en el marco del proyecto Nuevo Paradigma, explorando nuevas herramientas y metodologías para abordar desafíos de investigación mediante tecnologías de IA, indagando en procesos biomédicos aplicables.\n\nSu participación contempla el desarrollo y aplicación de modelos de inteligencia artificial, contribuyendo a la incorporación de estas tecnologías en los procesos de investigación e innovación del laboratorio.",
    contactos: {
      linkedin: "",
      github: "",
      email: "lvaldebenito@utem.cl"
    }
  },
  {
    nombre: "Juan Toledo Fierro",
    categoria: "tesistas",
    rol: "Tesista / Egresado",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos · Proyecto de Tesis",
    img: "/equipo/JuanPERFIL.jpg",
    actividadesLab: "El trabajo de Juan se centra en la aplicación de inteligencia artificial al procesamiento de señales biomédicas, específicamente en el uso de algoritmos de Self-Supervised Learning para el análisis y generación de señales electrocardiográficas (ECG).\n\nSu investigación busca generar señales ECG sintéticas mediante técnicas de autoaprendizaje, con el objetivo de realizar data augmentation y construir bases de datos más balanceadas, contribuyendo al desarrollo de modelos de inteligencia artificial más robustos para aplicaciones biomédicas.",
    contactos: {
      linkedin: "https://www.linkedin.com/in/juan-crist%C3%B3bal-toledo-fierro-83787129b/",
      github: "",
      email: "jtoledof@utem.cl"
    }
  },
  {
    nombre: "Andrés Vega Moraga",
    categoria: "tesistas",
    rol: "Tesista / Egresado",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos · Proyecto de Tesis",
    img: "/equipo/AndrésPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "https://www.linkedin.com/in/andres-nicolas-vega-moraga-950b3128b/",
      github: "",
      email: "avega@utem.cl"
    }
  },
  {
    nombre: "Glenn Lanyon Lanyon",
    categoria: "tesistas",
    rol: "Tesista / Egresado",
    bio: "Egresado de Ingeniería Civil en Ciencia de Datos · Proyecto de Tesis",
    img: "/equipo/GlennPERFIL.jpg",
    actividadesLab: "",
    contactos: {
      linkedin: "",
      github: "",
      email: "glanyon@utem.cl"
    }
  },
];


// --- COMPONENTES AUXILIARES ---

// Carrusel de imágenes
const ImageSlider = ({ items, autoSlide = true, autoSlideInterval = 3500 }) => {
  const [curr, setCurr] = useState(0);
  const validItems = (items || []).filter(item => item && item.url && item.url.trim() !== '');

  const next = () => setCurr((c) => (c === validItems.length - 1 ? 0 : c + 1));
  const prev = () => setCurr((c) => (c === 0 ? validItems.length - 1 : c - 1));

  useEffect(() => {
    if (!autoSlide || validItems.length <= 1) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [validItems.length, autoSlide, autoSlideInterval]);

  if (validItems.length === 0) return null;

  return (
    <div className="overflow-hidden relative h-full w-full group">
      <div className="flex transition-transform ease-out duration-500 h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {validItems.map((item, i) => (
          <img key={i} src={item.url} alt={item.descripcion || ""} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>
      {validItems.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="p-1.5 rounded-full shadow-md bg-white/90 text-gray-800 hover:bg-white hover:scale-110 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Siguiente imagen"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="p-1.5 rounded-full shadow-md bg-white/90 text-gray-800 hover:bg-white hover:scale-110 transition-all pointer-events-auto cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="absolute bottom-2 right-0 left-0 pointer-events-none">
            <div className="flex items-center justify-center gap-1.5">
              {validItems.map((_, i) => (
                <div key={i} className={`transition-all rounded-full ${curr === i ? "w-4 h-1.5 bg-white shadow-sm" : "w-1.5 h-1.5 bg-white/60"}`} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Tarjeta de Actividad
const ActivityCard = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(item); } }}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="h-48 overflow-hidden relative bg-slate-200">
      <ImageSlider items={item.galeria} />
      <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-400 z-10 pointer-events-none shadow-sm">
        {item.tipo}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow relative">
      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
        <Calendar size={14} className="text-blue-500" /> {item.fecha}
        <span className="text-slate-300">•</span>
        <MapPin size={14} className="text-teal-500" /> {item.lugar}
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors">
        {item.titulo}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
        {item.descripcion}
      </p>
      <div className="pt-3 mt-auto border-t border-slate-100 text-blue-600 text-xs font-bold flex items-center justify-between">
        <span>Ver fotos y detalles</span>
        <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

// --- COMPONENTE VISTA DETALLE DE ACTIVIDAD ---
const ActivityDetailView = ({ activity, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cerrar lightbox con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const validGallery = (activity?.galeria || []).filter(f => f && f.url && f.url.trim() !== '');
  const participantesList = (activity?.participantes || [])
    .flatMap(item => (typeof item === 'string' ? item.split(',') : [item]))
    .map(name => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in zoom-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow hover:border-blue-200"
        >
          <ArrowLeft size={18} /> Volver a Actividades
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 md:p-12 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {activity.tipo}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <Calendar size={16} className="text-blue-500" /> {activity.fecha}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                <MapPin size={16} className="text-teal-500" /> {activity.lugar}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {activity.titulo}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
              {activity.descripcion}
            </p>
          </div>

          {validGallery.length > 0 && (
            <div className="p-8 md:p-12 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <LayoutGrid size={20} className="text-blue-500" /> Galería de Imágenes ({validGallery.length})
                </h3>
                <span className="text-xs text-slate-500 hidden sm:inline-block">Haz clic en cualquier imagen para verla en pantalla completa</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {validGallery.map((foto, idx) => (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full border border-slate-200">
                    {/* CONTENEDOR DE IMAGEN COMPLETA SIN RECORTES */}
                    <div
                      className="relative h-72 sm:h-80 w-full bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(foto)}
                      title="Haz clic para ver la imagen completa"
                    >
                      {/* Fondo difuminado para rellenar estéticamente espacios de fotos verticales */}
                      <img
                        src={foto.url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-md opacity-35 scale-110 pointer-events-none"
                        aria-hidden="true"
                      />
                      {/* Imagen principal 100% completa sin recortar */}
                      <img
                        src={foto.url}
                        alt={foto.descripcion || `Evidencia ${idx + 1}`}
                        className="relative z-10 max-h-full max-w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white/90 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm flex items-center gap-1 text-xs font-semibold">
                        <Maximize2 size={14} /> Ampliar
                      </div>
                    </div>

                    {/* DESCRIPCIÓN DE LA FOTO */}
                    {foto.descripcion && (
                      <div className="p-5 flex gap-3 items-start flex-grow bg-white border-t border-slate-100">
                        <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-slate-700 text-sm leading-relaxed">{foto.descripcion}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {participantesList.length > 0 && (
            <div className="p-8 md:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users size={20} className="text-teal-500" /> Integrantes Participantes
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {participantesList.map((persona, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 shadow-2xs hover:border-teal-300 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    {persona}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL LIGHTBOX PARA PANTALLA COMPLETA */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-30"
            aria-label="Cerrar imagen"
          >
            <X size={26} />
          </button>
          <div
            className="relative max-h-[85vh] max-w-[92vw] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.descripcion || "Imagen completa"}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            {selectedImage.descripcion && (
              <div className="mt-4 p-4 bg-slate-900/90 backdrop-blur-md border border-white/10 text-white text-sm max-w-2xl text-center rounded-2xl">
                {selectedImage.descripcion}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE VISTA DETALLE DE LÍNEA DE INVESTIGACIÓN ---
const ResearchDetailView = ({ research, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headerGradient = research?.color || "from-slate-50 to-white";
  const validImages = (research?.imagenes || []).filter(img => img && img.url && img.url.trim() !== '');
  const integrantesList = (research?.integrantes || [])
    .flatMap(item => (typeof item === 'string' ? item.split(',') : [item]))
    .map(name => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean);
  const docsList = (research?.documentos || []).filter(doc => doc && doc.titulo);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in zoom-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow hover:border-blue-200"
        >
          <ArrowLeft size={18} /> Volver a Investigaciones
        </button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className={`p-8 md:p-12 border-b border-slate-100 bg-gradient-to-r ${headerGradient}`}>
            <div className="mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-2xl w-fit shadow-md border border-slate-100">
              {research?.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {research?.titulo}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed max-w-4xl">
              {research?.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-2 p-8 md:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <LayoutGrid size={20} className="text-blue-500" /> Galería y Evidencia Experimental
              </h3>

              {validImages.length > 0 ? (
                <div className="grid gap-6">
                  {validImages.map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                      <img src={img.url} alt={img.desc || `Evidencia ${idx + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                      {img.desc && (
                        <div className="p-4 bg-slate-50 text-sm text-slate-600 italic border-t border-slate-100 flex items-start gap-2">
                          <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
                          <span>{img.desc}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-8 text-center">
                  <BookOpen size={36} className="mx-auto text-slate-400 mb-3" />
                  <h4 className="font-bold text-slate-700 mb-1">Proyecto en Desarrollo Activo</h4>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Los registros experimentales, diagramas de arquitectura y material audiovisual asociado a esta línea se actualizan continuamente conforme avanzan las publicaciones.
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 md:p-12 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100">
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users size={18} className="text-teal-500" /> Investigadores ({integrantesList.length})
                </h3>
                <ul className="space-y-2.5">
                  {integrantesList.map((member, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-sm font-medium hover:border-teal-300 transition-colors"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0"></div>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {docsList.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-indigo-500" /> Documentos y Papers
                  </h3>
                  <ul className="space-y-3">
                    {docsList.map((doc, i) => (
                      <li key={i}>
                        <a
                          href={doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all group"
                        >
                          <div className="font-semibold text-slate-800 text-sm mb-1.5 group-hover:text-indigo-600 leading-snug">
                            {doc.titulo}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-indigo-500 font-medium">
                            <Download size={13} /> {doc.tipo || "Enlace"}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES UI: EQUIPO ---
const MemberDetailModal = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Fondo desenfocado */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
        {/* Cabecera estilizada */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 px-6 py-4 text-white flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-blue-100 font-bold">
            Perfil del Integrante
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Fila superior: Foto + Información principal */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-6 pb-6 border-b border-slate-100">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-md border-2 border-white ring-2 ring-slate-100">
              <img src={member.img} alt={member.nombre} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 text-blue-700 border border-blue-100">
                {member.categoria === 'academicos' ? 'Académico' : member.categoria === 'tesistas' ? 'Tesista' : 'Asistente de Investigación'}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-1">{member.nombre}</h3>
              <p className="text-blue-600 text-sm font-semibold mb-2">{member.rol}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
            </div>
          </div>

          {/* Bloque: Actividades y Labor Actual */}
          <div className="mb-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              Actividades y Proyectos en el Laboratorio
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {member.actividadesLab || "Desarrollo de proyectos de investigación, análisis de datos biomédicos, procesamiento de señales y colaboración en las líneas activas de investigación de LaTSIB."}
            </p>
          </div>

          {/* Bloque: Enlaces de Contacto */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {member.contactos?.linkedin && (
                <a
                  href={member.contactos.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-white hover:bg-blue-600 transition-colors shadow-2xs"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
              {member.contactos?.github && (
                <a
                  href={member.contactos.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-white hover:bg-slate-900 transition-colors shadow-2xs"
                >
                  <Github size={15} /> GitHub
                </a>
              )}
              {member.contactos?.email && (
                <a
                  href={`mailto:${member.contactos.email}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-50 text-teal-700 hover:text-white hover:bg-teal-600 transition-colors border border-teal-100 shadow-2xs"
                >
                  <Mail size={15} /> {member.contactos.email}
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ miembro, categoriaId, onSelect }) => (
  <div
    onClick={() => onSelect(miembro)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(miembro); } }}
    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all text-center group border border-slate-100 flex flex-col relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="h-48 overflow-hidden relative bg-slate-200">
      <img src={miembro.img} alt={miembro.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      {categoriaId === 'tesistas' && (
        <div className="absolute top-3 right-3 bg-teal-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-teal-400 z-10 shadow-sm">
          Tesista
        </div>
      )}
      <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-3">
        <span className="text-[11px] font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-md flex items-center gap-1.5">
          <Info size={13} /> Ver actividades
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-bold text-slate-900 text-lg mb-1 leading-snug group-hover:text-blue-600 transition-colors">{miembro.nombre}</h3>
      <p className="text-blue-600 text-sm font-semibold mb-3">{miembro.rol}</p>
      <p className="text-slate-500 text-xs leading-relaxed mb-5 flex-grow">{miembro.bio}</p>
      
      {/* REDES SOCIALES */}
      <div className="flex justify-center items-center gap-3 pt-3 border-t border-slate-100 mt-auto" onClick={(e) => e.stopPropagation()}>
        {miembro.contactos?.linkedin && (
          <a
            href={miembro.contactos.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-all shadow-2xs"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        )}
        {miembro.contactos?.github && (
          <a
            href={miembro.contactos.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        )}
        {miembro.contactos?.email && (
          <a
            href={`mailto:${miembro.contactos.email}`}
            className="p-2 rounded-full text-slate-400 hover:text-teal-600 hover:bg-slate-50 transition-all shadow-2xs"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>
  </div>
);

// --- COMPONENTES UI BÁSICOS ---
const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{children}</h2>
    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">{subtitle}</p>}
  </div>
);

const NavLink = ({ children, mobile, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${mobile ? 'block w-full text-left py-3 text-lg border-b border-slate-100' : 'text-sm font-medium'} text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wide cursor-pointer`}
  >
    {children}
  </button>
);

/**
 * ------------------------------------------------------------------
 * COMPONENTE PRINCIPAL (APP) CON ENRUTAMIENTO SEGURO
 * ------------------------------------------------------------------
 */

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Función para parsear el hash actual de forma segura
  const parseRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash || hash === 'about' || hash === 'research' || hash === 'activities' || hash === 'team' || hash === 'publications' || hash === 'contact') {
      return { view: 'landing', id: null, section: hash || null };
    }
    if (hash === 'investigaciones') {
      return { view: 'research-list', id: null, section: null };
    }
    if (hash.startsWith('investigacion/')) {
      const rawId = hash.replace('investigacion/', '');
      const numId = parseInt(rawId, 10);
      return { view: 'research-detail', id: isNaN(numId) ? rawId : numId, section: null };
    }
    if (hash === 'actividades') {
      return { view: 'activities-list', id: null, section: null };
    }
    if (hash.startsWith('actividad/')) {
      const rawId = hash.replace('actividad/', '');
      const numId = parseInt(rawId, 10);
      return { view: 'activity-detail', id: isNaN(numId) ? rawId : numId, section: null };
    }
    if (hash === 'publicaciones') {
      return { view: 'publications-list', id: null, section: null };
    }
    if (hash === 'equipo') {
      return { view: 'team-list', id: null, section: null };
    }
    return { view: 'landing', id: null, section: null };
  };

  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const currentRoute = parseRoute();
      setRoute(currentRoute);
      if (currentRoute.section) {
        setTimeout(() => {
          const el = document.getElementById(currentRoute.section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    // Si carga con sección en el hash, asegurar scroll
    if (route.section) {
      setTimeout(() => {
        const el = document.getElementById(route.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (targetView, id = null) => {
    let newHash = '';
    if (targetView === 'landing') newHash = '';
    else if (targetView === 'research-list') newHash = 'investigaciones';
    else if (targetView === 'research-detail') newHash = `investigacion/${id}`;
    else if (targetView === 'activities-list') newHash = 'actividades';
    else if (targetView === 'activity-detail') newHash = `actividad/${id}`;
    else if (targetView === 'publications-list') newHash = 'publicaciones';
    else if (targetView === 'team-list') newHash = 'equipo';

    const fullNewHash = newHash ? `#${newHash}` : '#';
    if (window.location.hash === fullNewHash || (!window.location.hash && fullNewHash === '#')) {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = newHash;
    }
  };

  const handleBack = (fallbackView = 'landing') => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo(fallbackView);
    }
  };

  const handleViewResearch = (research) => {
    navigateTo('research-detail', research.id);
  };

  const handleViewActivity = (activity) => {
    navigateTo('activity-detail', activity.id);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (id === 'all-activities') { navigateTo('activities-list'); return; }
    if (id === 'all-research') { navigateTo('research-list'); return; }
    if (id === 'all-publications') { navigateTo('publications-list'); return; } 
    if (id === 'all-team') { navigateTo('team-list'); return; }

    if (route.view !== 'landing') {
      window.location.hash = id;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Resolver item actual con seguridad
  const currentResearch = route.view === 'research-detail'
    ? LINEAS_INVESTIGACION.find((r) => r.id === route.id || String(r.id) === String(route.id)) || null
    : null;

  const currentActivity = route.view === 'activity-detail'
    ? ACTIVIDADES.find((a) => a.id === route.id || String(a.id) === String(route.id)) || null
    : null;

  const actividadesNacionales = ACTIVIDADES.filter((a) => a.tipo === 'Nacional');
  const actividadesInternacionales = ACTIVIDADES.filter((a) => a.tipo === 'Internacional');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || route.view !== 'landing' ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-3.5 cursor-pointer select-none group"
            onClick={() => { navigateTo('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img src={CONFIG.imagenes.logo} alt="Logo" className="h-14 w-14 sm:h-16 sm:w-16 object-cover rounded-full shadow-md group-hover:scale-105 transition-transform duration-300" />
            <span className={`text-2xl font-extrabold tracking-tight ${isScrolled || route.view !== 'landing' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} transition-colors`}>
              {CONFIG.nombreGrupo}
            </span>
          </div>
          <div className={`hidden md:flex items-center gap-8 ${isScrolled || route.view !== 'landing' ? 'text-slate-600' : 'text-white'}`}>
            <button type="button" onClick={() => scrollToSection('about')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Nosotros</button>
            <button type="button" onClick={() => scrollToSection('research')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Investigación</button>
            <button type="button" onClick={() => scrollToSection('activities')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Actividades</button>
            <button type="button" onClick={() => scrollToSection('team')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Equipo</button>
            <button type="button" onClick={() => scrollToSection('publications')} className="hover:text-blue-500 font-medium transition-colors cursor-pointer">Publicaciones</button>
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className={`px-5 py-2 rounded-full font-semibold transition-all shadow-sm cursor-pointer ${isScrolled || route.view !== 'landing' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-900 hover:bg-blue-50'}`}
            >
              Contacto
            </button>
          </div>
          <button
            type="button"
            className="md:hidden text-slate-800 p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X /> : <Menu className={isScrolled || route.view !== 'landing' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-2 animate-in fade-in duration-200">
            <NavLink mobile onClick={() => scrollToSection('about')}>Nosotros</NavLink>
            <NavLink mobile onClick={() => scrollToSection('research')}>Investigación</NavLink>
            <NavLink mobile onClick={() => scrollToSection('activities')}>Actividades</NavLink>
            <NavLink mobile onClick={() => scrollToSection('team')}>Equipo</NavLink>
            <NavLink mobile onClick={() => scrollToSection('publications')}>Publicaciones</NavLink>
            <NavLink mobile onClick={() => { setMobileMenuOpen(false); setIsContactModalOpen(true); }}>Contacto</NavLink>
          </div>
        )}
      </nav>

      {/* --- RENDERIZADO CONDICIONAL DE VISTAS CON PROTECCIÓN ANTE PANTALLA EN BLANCO --- */}

      {/* VISTA: DETALLE DE LÍNEA DE INVESTIGACIÓN */}
      {route.view === 'research-detail' && currentResearch ? (
        <ResearchDetailView research={currentResearch} onBack={() => handleBack('research-list')} />
      ) : route.view === 'research-list' ? (
        /* VISTA: LISTADO COMPLETO DE INVESTIGACIONES */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Líneas de Investigación</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Explora nuestras áreas de desarrollo científico y tecnológico.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LINEAS_INVESTIGACION.map((item, idx) => (
                <div
                  key={item.id || idx}
                  onClick={() => handleViewResearch(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleViewResearch(item); } }}
                  className={`group flex flex-col h-full cursor-pointer bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-br ${item.color}`}
                >
                  <div className="mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white group-hover:scale-105 transition-all border border-white/60 shadow-sm">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">{item.titulo}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow line-clamp-3 mb-6 text-sm">{item.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center justify-between text-blue-700 font-bold text-sm">
                    <span>Ver proyecto completo</span>
                    <ChevronRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : route.view === 'activity-detail' && currentActivity ? (
        /* VISTA: DETALLE DE ACTIVIDAD */
        <ActivityDetailView activity={currentActivity} onBack={() => handleBack('activities-list')} />
      ) : route.view === 'activities-list' ? (
        /* VISTA: LISTADO COMPLETO DE ACTIVIDADES */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Bitácora de Actividades</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Registro completo de nuestras actividades y participaciones académicas nacionales e internacionales.</p>
            </div>

            <div className="space-y-16">
              {/* ACTIVIDADES NACIONALES */}
              {actividadesNacionales.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Nacionales</h2>
                      <p className="text-xs text-slate-500 font-medium">Congresos, simposios y jornadas científicas en Chile</p>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {actividadesNacionales.length} {actividadesNacionales.length === 1 ? 'actividad' : 'actividades'}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {actividadesNacionales.map((act) => (
                      <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                    ))}
                  </div>
                </div>
              )}

              {/* ACTIVIDADES INTERNACIONALES */}
              {actividadesInternacionales.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                    <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Internacionales</h2>
                      <p className="text-xs text-slate-500 font-medium">Pasantías, defensas doctorales y congresos internacionales</p>
                    </div>
                    <span className="ml-auto px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                      {actividadesInternacionales.length} {actividadesInternacionales.length === 1 ? 'actividad' : 'actividades'}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {actividadesInternacionales.map((act) => (
                      <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : route.view === 'publications-list' ? (
        /* VISTA: LISTADO COMPLETO DE PUBLICACIONES */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Repositorio de Publicaciones</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Lista completa de artículos científicos y contribuciones académicas.</p>
            </div>
            <div className="grid gap-4 max-w-4xl mx-auto">
              {PUBLICACIONES.map((pub, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white hover:bg-slate-50/90 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all hover:shadow-md"
                >
                  <div className="pr-4 flex-grow mb-4 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{pub.year}</span>
                      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{pub.revista}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-700 transition-colors leading-snug">
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {pub.titulo}
                      </a>
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{pub.autor ? pub.autor : pub.autores}</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    {pub.instagram && (
                      <a
                        href={pub.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-pink-600 hover:text-white bg-pink-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 border border-pink-200 hover:border-transparent rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                        title="Ver infografía explicativa en Instagram"
                        aria-label="Ver infografía en Instagram"
                      >
                        <Instagram size={16} />
                        <span>Infografía</span>
                      </a>
                    )}
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                      title="Ver artículo científico original"
                      aria-label="Ver artículo científico original"
                    >
                      <ExternalLink size={16} />
                      <span className="hidden sm:inline">Artículo</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : route.view === 'team-list' ? (
        /* VISTA: DIRECTORIO COMPLETO DEL EQUIPO */
        <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in duration-300">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Directorio del Equipo</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Investigadores, asistentes, tesistas y colaboradores del Laboratorio de Biomédica Traslacional.</p>
            </div>

            <div className="space-y-16">
              {CATEGORIAS_EQUIPO.map((cat) => {
                const miembrosCat = EQUIPO.filter((m) => m.categoria === cat.id);
                if (miembrosCat.length === 0) return null;

                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{cat.titulo}</h2>
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${cat.id === 'tesistas' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                        {miembrosCat.length}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {miembrosCat.map((miembro, idx) => (
                        <TeamMemberCard
                          key={idx}
                          miembro={miembro}
                          categoriaId={cat.id}
                          onSelect={setSelectedMember}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* VISTA: PORTADA (LANDING) - FALLBACK PRINCIPAL SEGURO */
        <>
          <header className="relative pt-32 pb-20 lg:min-h-screen flex items-center overflow-hidden bg-slate-900" id="about">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500 rounded-full blur-[100px]"></div>
            </div>
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-200 text-xs font-semibold mb-6 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Investigación Activa {CONFIG.year}
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                  Donde la ciencia <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                    se encuentra con la tecnología
                  </span>
                </h1>
                <p className="text-lg text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                  {CONFIG.mision}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => scrollToSection('research')}
                    className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/30 cursor-pointer"
                  >
                    Nuestras Líneas <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('publications')}
                    className="px-8 py-3.5 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-sm cursor-pointer"
                  >
                    Ver Publicaciones
                  </button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-2 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src={CONFIG.imagenes.hero} alt="Lab Vis" className="rounded-xl w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </header>

          <section id="research" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Creamos conocimiento que conecta datos, tecnología y personas para avanzar en la salud del futuro.">
                Líneas de Investigación
              </SectionTitle>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {LINEAS_INVESTIGACION.slice(0, 3).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    onClick={() => handleViewResearch(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleViewResearch(item); } }}
                    className={`group flex flex-col h-full cursor-pointer bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-br ${item.color}`}
                  >
                    <div className="mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white group-hover:scale-105 transition-all border border-white/60 shadow-sm">{item.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">{item.titulo}</h3>
                    <p className="text-slate-600 leading-relaxed flex-grow line-clamp-3 mb-6 text-sm">{item.desc}</p>
                    <div className="mt-auto pt-4 border-t border-slate-200/60 flex items-center justify-between text-blue-700 font-bold text-sm">
                      <span>Ver proyecto completo</span>
                      <ChevronRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-research')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group cursor-pointer"
                >
                  <LayoutGrid size={20} className="group-hover:scale-110 transition-transform" /> Ver todas las líneas de investigación
                </button>
              </div>
            </div>
          </section>

          <section id="activities" className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Registro completo de actividades académicas, presentaciones y participación institucional del Laboratorio.">
                Actividades y Congresos
              </SectionTitle>

              <div className="space-y-16 mb-12">
                {/* GRUPO 1: ACTIVIDADES NACIONALES */}
                {actividadesNacionales.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                      <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Nacionales</h3>
                        <p className="text-xs text-slate-500 font-medium">Congresos, simposios y jornadas científicas en Chile</p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        {actividadesNacionales.length} {actividadesNacionales.length === 1 ? 'actividad' : 'actividades'}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {actividadesNacionales.slice(0, 3).map((act) => (
                        <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                      ))}
                    </div>
                  </div>
                )}

                {/* GRUPO 2: ACTIVIDADES INTERNACIONALES */}
                {actividadesInternacionales.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                      <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Actividades Internacionales</h3>
                        <p className="text-xs text-slate-500 font-medium">Pasantías, defensas doctorales y congresos internacionales</p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                        {actividadesInternacionales.length} {actividadesInternacionales.length === 1 ? 'actividad' : 'actividades'}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {actividadesInternacionales.slice(0, 3).map((act) => (
                        <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-activities')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group cursor-pointer"
                >
                  <LayoutGrid size={20} className="group-hover:scale-110 transition-transform" /> Ver bitácora completa de actividades
                </button>
              </div>
            </div>
          </section>

          <section id="team" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Investigadores, estudiantes y profesionales trabajando juntos para construir ciencia con propósito.">
                Integrantes del Laboratorio
              </SectionTitle>
              <div className="space-y-16 mb-12">
                {CATEGORIAS_EQUIPO.map((cat) => {
                  const miembrosCat = EQUIPO.filter((m) => m.categoria === cat.id);
                  if (miembrosCat.length === 0) return null;
                  
                  // En la portada mostramos hasta 4 integrantes por categoría para no saturar
                  const miembrosMostrar = cat.id === 'asistentes' ? miembrosCat.slice(0, 4) : miembrosCat;

                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-3 mb-8 pb-3 border-b border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{cat.titulo}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${cat.id === 'tesistas' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                          {miembrosCat.length}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {miembrosMostrar.map((miembro, idx) => (
                          <TeamMemberCard
                            key={idx}
                            miembro={miembro}
                            categoriaId={cat.id}
                            onSelect={setSelectedMember}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-team')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group cursor-pointer"
                >
                  <Users size={20} className="group-hover:scale-110 transition-transform" /> Ver directorio completo del equipo
                </button>
              </div>
            </div>
          </section>

          <section id="publications" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
            <div className="container mx-auto px-6">
              <SectionTitle>Publicaciones Recientes</SectionTitle>
              <div className="grid gap-4 max-w-4xl mx-auto">
                {PUBLICACIONES.slice(0, 3).map((pub, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white hover:bg-slate-50/90 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all hover:shadow-md"
                  >
                    <div className="pr-4 flex-grow mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{pub.year}</span>
                        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{pub.revista}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-700 transition-colors leading-snug">
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {pub.titulo}
                        </a>
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{pub.autor ? pub.autor : pub.autores}</p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                      {pub.instagram && (
                        <a
                          href={pub.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-pink-600 hover:text-white bg-pink-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 border border-pink-200 hover:border-transparent rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                          title="Ver infografía explicativa en Instagram"
                          aria-label="Ver infografía en Instagram"
                        >
                          <Instagram size={16} />
                          <span>Infografía</span>
                        </a>
                      )}
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow"
                        title="Ver artículo científico original"
                        aria-label="Ver artículo científico original"
                      >
                        <ExternalLink size={16} />
                        <span className="hidden sm:inline">Artículo</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => scrollToSection('all-publications')}
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Ver todas las publicaciones <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          <footer id="contact" className="bg-slate-900 text-slate-300 py-16">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4">
                  <img src={CONFIG.imagenes.logo} alt="Logo" className="h-8 w-8 object-cover rounded-full" />
                  {CONFIG.nombreGrupo}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Ciencia, datos y tecnología al servicio de la salud. Desarrollamos investigación biomédica con impacto real en la práctica clínica.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/latsib-utem-b87337396/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/latsib.utem/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.youtube.com/@LaTSIBUTEM" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="YouTube">
                    <Youtube size={20} />
                  </a>
                  <a href="https://www.tiktok.com/@latsibutem" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white" aria-label="TikTok">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Contacto</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-blue-500 mt-1 shrink-0" size={20} />
                    <span className="text-sm">{CONFIG.direccion}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-blue-500 shrink-0" size={20} />
                    <a href={`mailto:${CONFIG.email}`} className="text-sm hover:text-white transition-colors">{CONFIG.email}</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Enlaces de Interés</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Universidad Tecnológica Metropolitana</a></li>
                  <li><a href="https://www.anid.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">ANID Chile</a></li>
                  <li><a href="https://postgrado.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Postulaciones a Magíster</a></li>
                  <li><a href="https://noticias.utem.cl/2026/07/21/seminarios-de-ingenieria-civil-biomedica-utem-impulsan-uso-de-ia/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Noticia seminarios de ingeniería civil biomédica UTEM</a></li>
                </ul>
              </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
              © {CONFIG.year} {CONFIG.nombreCompleto}. Todos los derechos reservados.
            </div>
          </footer>
        </>
      )}

      {/* FORMULARIO MODAL DE CONTACTO */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* MODAL DE PERFIL Y ACTIVIDADES DEL INTEGRANTE */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
