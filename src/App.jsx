import React, { useState, useEffect } from 'react';
import { 
  Atom, Cpu, Globe, Users, FileText, Mail, MapPin, 
  ChevronRight, ChevronLeft, Menu, X, Linkedin, Github, 
  ExternalLink, BookOpen, Calendar, ArrowLeft, LayoutGrid, Info, Download, Instagram
} from 'lucide-react';

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
        url: "/actividades/vive-la-investigacion/CatalinaVIVE.jpeg",
        descripcion: "Catalina Araniz: Caracterización de la hipoxia a partir de redes vasculares simuladas con Vascusynth."
      },
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
        url: "/actividades/idi/CatalinaIDI.jpg",
        descripcion: "Catalina Araniz: Caracterización de la hipoxia a partir de redes vasculares simuladas con Vascusynth."
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
        url: "https://media.licdn.com/dms/image/v2/D4E22AQHFWSJGQLI__Q/feedshare-shrink_1280/B4EZp7lZMQGUAs-/0/1763009991965?e=1770249600&v=beta&t=qgrOfVJsjXvO76jkgQpuv-tGI6kh06kiV8SRmenwUvo",
        descripcion: "Glenn Lanyon: Potenciación de la respuesta neurovascular periespinal gatillada por estimulación eléctrica con pulsos tándem del nervio medial medida con fNIRS en voluntarios sanos"
      },
       {
        url: "https://media.licdn.com/dms/image/v2/D4E22AQEYoRyFhMJ9ow/feedshare-shrink_2048_1536/B4EZp7lZM8KMAw-/0/1763009992067?e=1770249600&v=beta&t=NMy0N0ZVe8ZMbgD20S6tHHZnIlIc53cefH5AT3r3BCg",
        descripcion: "Vicente Escudero: Potenciación de la respuesta neurovascular periespinal gatillada por estimulación eléctrica con pulsos tándem del nervio medial medida con fNIRS en voluntarios sanos"
      },
      {
        url: "https://media.licdn.com/dms/image/v2/D4E22AQGC2_e2lZAyug/feedshare-shrink_1280/B4EZp7lZM_HUAs-/0/1763009992108?e=1770249600&v=beta&t=8mPw8-FnyIysepQUO220FD2Xo_9RurfFskvNTlr_tWQ",
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
        url: "https://media.licdn.com/dms/image/v2/D4E22AQHYUmT-GmLh-A/feedshare-shrink_1280/B4EZq44443KMAs-/0/1764038512980?e=1770249600&v=beta&t=Z2OTAlPdsBK7fDTqp2m0ZJ39A81ZA1OkBGTg6xlj1kA",
        descripcion: "Glenn Lanyon: Caracterización neurofisiológica de la respuesta neurovascular peri-espinal humana en el diagnóstico funcional de la médula espinal."
      },
      {
        url: "https://media.licdn.com/dms/image/v2/D4E22AQEDoq1piwvChg/feedshare-shrink_1280/B4EZrNLQgeGYAc-/0/1764378872154?e=1770249600&v=beta&t=S0OlujfwbP09F67oVgEiUWgy2eE9LmGmAdz-fQdHfo0",
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
        url: "https://media.licdn.com/dms/image/v2/D4E22AQGZUxnTdOFoIA/feedshare-shrink_1280/B4EZqF80vIGYAs-/0/1763183906848?e=1770249600&v=beta&t=yNi3jAe9xc6pi8uE05rsSQrZ1BU_8TkC5-q23kERbtY",
        descripcion: "David Sepúlveda: “Caracterización de nuevos biomarcadores para la respuesta neurovascular peri-espinal obtenida con fNIRS”."
      },
         {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQFp5Xz5J5iY2w/feedshare-shrink_2048_1536/B4DZqpYOcXIAAw-/0/1763778294852?e=1770249600&v=beta&t=U2f2ovfwvKjuf8ie-y-bl-cE-9Fbp9FNEWvwAuozkCo",
        descripcion: "Matías Gajardo: “Comparación de la respuesta neurovascular peri-espinal mediante fNIRS tras estimulación de nervios mediano y tibial en voluntarios sanos."
      },
   {
        url: "https://media.licdn.com/dms/image/v2/D4E22AQHFCqW6A8PQ6Q/feedshare-shrink_1280/B4EZqF80u6HoAs-/0/1763183906525?e=1770249600&v=beta&t=oVQ0E805uwDFV759NtujsVNNTJR61RGl0ZASu_V2JLU",
        descripcion: "Ignacio López: Sistema inteligente para optimizar la voz en dispositivos de laringe electrónica (póster científico)."
      }
    ],
    participantes: ["David Sepúlveda", "Matías Gajardo", "Ignacio López"]
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
        url: "https://media.licdn.com/dms/image/v2/D4D22AQFYQKOkMvji9g/feedshare-shrink_2048_1536/B4DZsGhjHYLgAk-/0/1765341016746?e=1770249600&v=beta&t=T1wlg8qYY-ilFyM3uX08t-bUjnW3o3jzNb3gJzmd4R0",
        descripcion: "Gabriel Araya, Juan Toledo, Matías Gajardo y Camila Guajardo representaron al laboratorio con compromiso y motivación, destacando por su disposición al aprendizaje continuo y por reflejar los valores de colaboración y excelencia que caracterizan a nuestro equipo."
      },
      {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQEd9qMA8SLmbQ/feedshare-shrink_1280/B4DZsGhjHLLsAc-/0/1765341016754?e=1770249600&v=beta&t=aUzhz4awQKI-iVNvs8bpD64Cpx0WIO2ghpfmttMnTWA",
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
        url: "https://media.licdn.com/dms/image/v2/D4D22AQFjiB29uXsyrg/feedshare-shrink_2048_1536/B4DZvKANd2G8Ak-/0/1768620611697?e=1770249600&v=beta&t=mrmpXrG1W5PO7qRNyiHCqGR9e_BaYJGz8_p5onOyHVI",
        descripcion: "En representación de LaTSIB participaron Ignacio López Concha y JUAN CRISTÓBAL TOLEDO FIERRO, mientras que el Laboratorio de Sistemas Complejos fue representado por Camilo Cerda Sarabia y Joaquín Araya."
      },
      {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQHZTtsDgBEo6g/feedshare-shrink_1280/B4DZvKAOUcKYAg-/0/1768620615415?e=1770249600&v=beta&t=9Qqf8ZlMsfXc8ygFWrZeqky74fVFj4tgylU-DRX09yc",
        descripcion: "Matias Zuñiga, Profesor Asistente IDT-UTEM e integrante de @zlab_utem y @moleculas3d, cuyo aporte fue clave para el desarrollo del bootcamp."
      },
            {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQEbB5Ha3q5fRg/feedshare-shrink_1280/B4DZvKANeFJoAc-/0/1768620611756?e=1770249600&v=beta&t=XyXcMbBbH9_ITaMJuosWDw47oRjAY8BoceXxNwyu6xs",
        descripcion: "Destacamos especialmente la participación y liderazgo académico del Profesor Raul Caulier Cisterna."
      },
          {
        url: "https://media.licdn.com/dms/image/v2/D4D22AQEHXP1-WWl8Pg/feedshare-shrink_1280/B4DZvKANdWJMAc-/0/1768620611694?e=1770249600&v=beta&t=-3L0qTmVqplpM42XJnL4owveKZYFGAQ3sodH92tm6to",
        descripcion: "Destacamos especialmente la participación y liderazgo académico del Profesor Jorge Vergara."
      }
    ],
    participantes: ["Ignacio López Concha", "Juan Cristóbal Toledo Fierro", "Raul Caulier Cisterna", "Jorge Vergara"]
  },
];

const PUBLICACIONES = [
  {
    titulo: "Comparison of LED- and LASER-based fNIRS technologies to record the human peri-spinal cord neurovascular response",
    revista: "Medical Engineering & Physics (Elsevier)",
    year: "2024",
    autores: "Raul Caulier Cisterna M. Id, Juan-Pablo Appelgren-Gonzales, Juan-Esteban Oyarzun, Felipe Valenzuela, Ranganatha Sitaram, Antonio Eblen-Zajjur y Sergio Uribe.",
    link: "https://www.sciencedirect.com/science/article/pii/S1350453324000717"
  },
  {
    titulo: "Using Near-Infrared Spectroscopy Wearable Devices to Identify Central Versus Peripheral Limitations During Exercise",
    revista: "JoVE, N° 214, e67609",
    year: "2024",
    autor: "Matías Carreño-Román, Daniel Ramos-López, Benjamín Rapaport, Raúl Caulier-Cisterna, Maximiliano Espinosa-Ramírez y Felipe Contreras-Briceño.",
    link: "https://app.jove.com/t/67609/using-near-infrared-spectroscopy-wearable-devices-to-identify-central"
  },
  {
    titulo: "Sex differences in the prefrontal cortex during exercise",
    revista: "Experimental Physiology",
    year: "2025",
    autor: "Daniel Ramos‐López, Raúl Caulier‐Cisterna, Benjamín Díaz‐Ortiz, Cristóbal Baumann‐Biancani, Kamilo Hunger‐Abbott, Matías Herrera‐Matas, Andrés Vega‐Moraga, Vitor A. Lira, Maximiliano Espinosa‐Ramírez, Karol Ramírez‐Parada, Luigi Gabrielli‐Nervi, Hugo E. Verdejo y Felipe Contreras‐Briceño.",
    link: "https://physoc.onlinelibrary.wiley.com/doi/full/10.1113/EP093287"
  }
];

// --- DATA: EQUIPO ---

const EQUIPO = [
  {
    nombre: "DR. Raúl Caulier Cisterna",
    rol: "Director e Investigador Principal del Laboratorio LaTSIB",
    bio: "PhD en Multimedia y Comunicaciones, Especialista en Biomédica, Machine Learning, Análisis de Señales y Datos",
    img: "https://fing.utem.cl/wp-content/uploads/sites/6/2023/11/Raul-Paul-Caulier-Cisterna.jpg",
    contactos: {
      linkedin: "https://www.linkedin.com/in/rcaulier/",
      github: "",
      email: "rcaulier@utem.cl"
    }
  },
  {
    nombre: "Matías Gajardo De La Fuente",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería civil en computación menc. informática",
    img: "/equipo/MatiasPERFIL.JPG",
    contactos: {
      linkedin: "https://www.linkedin.com/in/matias-adrian-gajardo-de-la-fuente/",
      github: "https://github.com/xhorus11",
      email: "mgajardod@utem.cl"
    }
  },
  {
    nombre: "Juan Toledo Fierro",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/JuanPERFIL.JPG",
    contactos: {
      linkedin: "https://www.linkedin.com/in/juan-crist%C3%B3bal-toledo-fierro-83787129b/",
      github: "",
      email: "jtoledof@utem.cl"
    }
  },
  {
    nombre: "David Sepulveda Velásquez",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/DavidPERFIL.JPG",
    contactos: {
      linkedin: "https://www.linkedin.com/in/david-sepulveda-vel%C3%A1squez-6311602a8/",
      github: "",
      email: "svelasquez@utem.cl"
    }
  },
  {
    nombre: "Andrés Vega Moraga",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/AndrésPERFIL.JPG",
    contactos: {
      linkedin: "https://www.linkedin.com/in/andres-nicolas-vega-moraga-950b3128b/",
      github: "",
      email: "avega@utem.cl"
    }
  },
   {
    nombre: "Clemente Uribe Ortiz",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "/equipo/ClementePERFIL.JPG",
    contactos: {
      linkedin: "",
      github: "",
      email: "curibeo@utem.cl"
    }
  },
   {
    nombre: "Glenn Lanyon Lanyon",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "https://i.postimg.cc/C5HX3VtG/Imagen-de-referencia-(1).png",
    contactos: {
      linkedin: "",
      github: "",
      email: "glanyon@utem.cl"
    }
  },
   {
    nombre: "Catalina Araniz Arancibia",
    rol: "Asistente Investigadora",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "/equipo/CatalinaPERFIL.JPG",
    contactos: {
      linkedin: "",
      github: "https://github.com/cataaraniz",
      email: "caraniz@utem.cl"
    }
  },
   {
    nombre: "Gabriel Araya López",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Informática",
    img: "/equipo/GabrielPERFIL.JPG",
    contactos: {
      linkedin: "",
      github: "",
      email: "garaya@utem.cl"
    }
  },
   {
    nombre: "Vicente Escudero Durana",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Ciencia de Datos",
    img: "",
    contactos: {
      linkedin: "",
      github: "",
      email: "vescuderod@utem.cl"
    }
  },
   {
    nombre: "Camila Guajardo Bravo",
    rol: "Asistente Investigadora",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "/equipo/CamilaPERFIL.JPG",
    contactos: {
      linkedin: "https://www.linkedin.com/in/camila-millaray-guajardo-bravo-b94297293/",
      github: "https://github.com/vmylla",
      email: "cguajardo@utem.cl"
      }
    },
    {
    nombre: "Ignacio López Concha",
    rol: "Asistente Investigador",
    bio: "Estudiante de Ingeniería Civil en Computación mención Informática",
    img: "",
    contactos: {
      linkedin: "",
      github: "",
      email: "ilopezc@utem.cl"
      }
    },
];


// --- COMPONENTES AUXILIARES ---

// Carrusel de imágenes
const ImageSlider = ({ items, autoSlide = true, autoSlideInterval = 3000 }) => {
  const [curr, setCurr] = useState(0);
  const next = () => setCurr((curr) => (curr === items.length - 1 ? 0 : curr + 1));
  const prev = () => setCurr((curr) => (curr === 0 ? items.length - 1 : curr - 1));

  useEffect(() => {
    if (!autoSlide || !items || items.length === 0) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="overflow-hidden relative h-full w-full group">
      <div className="flex transition-transform ease-out duration-500 h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {items.map((item, i) => (
          <img key={i} src={item.url} alt="" className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>
      {items.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button onClick={(e) => {e.stopPropagation(); prev()}} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white pointer-events-auto"><ChevronLeft size={16} /></button>
            <button onClick={(e) => {e.stopPropagation(); next()}} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white pointer-events-auto"><ChevronRight size={16} /></button>
          </div>
          <div className="absolute bottom-2 right-0 left-0">
            <div className="flex items-center justify-center gap-1">
              {items.map((_, i) => (
                <div key={i} className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${curr === i ? "p-1" : "bg-opacity-50"}`} />
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
  <div onClick={() => onClick(item)} className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col h-full cursor-pointer hover:-translate-y-1">
    <div className="h-48 overflow-hidden relative bg-slate-200">
      <ImageSlider items={item.galeria} />
      <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-400 z-10 pointer-events-none">{item.tipo}</div>
    </div>
    <div className="p-6 flex flex-col flex-grow relative">
      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3"><Calendar size={14} className="text-blue-500" /> {item.fecha} <MapPin size={14} className="text-teal-500" /> {item.lugar}</div>
      <h3 className="font-bold text-slate-900 text-lg mb-3 leading-tight group-hover:text-blue-600 transition-colors">{item.titulo}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{item.descripcion}</p>
      <div className="pt-2 mt-auto border-t border-slate-50 text-blue-600 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Ver fotos y detalles <ArrowLeft className="rotate-180" size={12}/></div>
    </div>
  </div>
);

// --- COMPONENTE VISTA DETALLE DE ACTIVIDAD ---
const ActivityDetailView = ({ activity, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in zoom-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"><ArrowLeft size={20} /> Volver a Actividades</button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8 md:p-12 border-b border-slate-100">
            <div className="flex flex-wrap gap-3 mb-4"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{activity.tipo}</span><span className="flex items-center gap-1 text-slate-500 text-sm"><Calendar size={16}/> {activity.fecha}</span><span className="flex items-center gap-1 text-slate-500 text-sm"><MapPin size={16}/> {activity.lugar}</span></div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{activity.titulo}</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{activity.descripcion}</p>
          </div>
          <div className="p-8 md:p-12 bg-slate-50">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2"><LayoutGrid size={20} className="text-blue-500"/> Galería de Imágenes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activity.galeria.map((foto, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
                  <div className="aspect-video overflow-hidden bg-gray-100"><img src={foto.url} alt={`Foto ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                  <div className="p-5 flex gap-3 items-start"><Info size={18} className="text-blue-400 mt-1 flex-shrink-0" /><p className="text-slate-600 text-sm leading-relaxed">{foto.descripcion}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 md:p-12 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Users size={20} className="text-teal-500"/> Integrantes Participantes</h3>
            <div className="flex flex-wrap gap-2">{activity.participantes.map((persona, idx) => (<span key={idx} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200">{persona}</span>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE VISTA DETALLE DE LÍNEA DE INVESTIGACIÓN ---
const ResearchDetailView = ({ research, onBack }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const headerGradient = research.color || "from-slate-50 to-white";
  
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 animate-in fade-in zoom-in duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"><ArrowLeft size={20} /> Volver a Investigaciones</button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className={`p-8 md:p-12 border-b border-slate-100 bg-gradient-to-r ${headerGradient}`}>
            <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm border border-slate-100">{research.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{research.titulo}</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">{research.desc}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-2 p-8 md:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><LayoutGrid size={20} className="text-blue-500"/> Galería y Ejemplos</h3>
              <div className="grid gap-6">
                {research.imagenes.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                    <img src={img.url} alt="" className="w-full h-auto object-cover" />
                    <div className="p-4 bg-slate-50 text-sm text-slate-600 italic border-t border-slate-100">{img.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 bg-slate-50 border-l border-slate-100">
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Users size={18} className="text-teal-500"/> Investigadores</h3>
                <ul className="space-y-3">
                  {research.integrantes.map((member, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-sm"><div className="w-2 h-2 rounded-full bg-teal-400"></div>{member}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText size={18} className="text-indigo-500"/> Documentos</h3>
                <ul className="space-y-3">
                  {research.documentos.map((doc, i) => (
                    <li key={i}>
                      <a href={doc.link} target="_blank" rel="noopener noreferrer" className="block p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group">
                        <div className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-indigo-600">{doc.titulo}</div>
                        <div className="flex items-center gap-1 text-xs text-slate-400"><Download size={12}/> {doc.tipo}</div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES UI BÁSICOS ---
const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{children}</h2>
    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 ${className}`}>{children}</div>
);

const NavLink = ({ href, children, mobile, onClick }) => (
  <a href={href} onClick={onClick} className={`${mobile ? 'block py-3 text-lg border-b border-slate-100' : 'text-sm font-medium'} text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wide cursor-pointer`}>{children}</a>
);

/**
 * ------------------------------------------------------------------
 * COMPONENTE PRINCIPAL (APP)
 * ------------------------------------------------------------------
 */

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState('landing');
  const [selectedItem, setSelectedItem] = useState(null); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewActivity = (activity) => { setSelectedItem(activity); setView('activity-detail'); };
  const handleViewResearch = (research) => { setSelectedItem(research); setView('research-detail'); };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (id === 'all-activities') { setView('activities-list'); window.scrollTo(0,0); return; }
    if (id === 'all-research') { setView('research-list'); window.scrollTo(0,0); return; }
    if (id === 'all-publications') { setView('publications-list'); window.scrollTo(0,0); return; } 
    
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => { const element = document.getElementById(id); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || view !== 'landing' ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('landing'); setTimeout(() => window.scrollTo(0,0), 50); }}>
            <img src={CONFIG.imagenes.logo} alt="Logo" className="h-12 w-12 object-cover rounded-full" />
            <span className={`text-xl font-bold tracking-tighter ${isScrolled || view !== 'landing' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} transition-colors`}>{CONFIG.nombreGrupo}</span>
          </div>
          <div className={`hidden md:flex items-center gap-8 ${isScrolled || view !== 'landing' ? 'text-slate-600' : 'text-white'}`}>
            <button onClick={() => scrollToSection('about')}>Nosotros</button>
            <button onClick={() => scrollToSection('research')}>Investigación</button>
            <button onClick={() => scrollToSection('activities')}>Actividades</button>
            <button onClick={() => scrollToSection('team')}>Equipo</button>
            <button onClick={() => scrollToSection('publications')}>Publicaciones</button>
            <button onClick={() => scrollToSection('contact')} className={`px-5 py-2 rounded-full font-semibold transition-all ${isScrolled || view !== 'landing' ? 'bg-blue-600 text-white' : 'bg-white text-blue-900'}`}>Contacto</button>
          </div>
          <button className="md:hidden text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu className={isScrolled || view !== 'landing' ? 'text-slate-900' : 'text-slate-900 lg:text-white'} />}</button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-2">
            <NavLink mobile onClick={() => scrollToSection('about')}>Nosotros</NavLink>
            <NavLink mobile onClick={() => scrollToSection('research')}>Investigación</NavLink>
            <NavLink mobile onClick={() => scrollToSection('activities')}>Actividades</NavLink>
            <NavLink mobile onClick={() => scrollToSection('team')}>Equipo</NavLink>
            <NavLink mobile onClick={() => scrollToSection('publications')}>Publicaciones</NavLink>
            <NavLink mobile onClick={() => scrollToSection('contact')}>Contacto</NavLink>
          </div>
        )}
      </nav>

      {/* --- RENDERIZADO CONDICIONAL DE VISTAS --- */}

      {/* VISTA: DETALLE DE LÍNEA DE INVESTIGACIÓN */}
      {view === 'research-detail' && selectedItem && (
        <ResearchDetailView research={selectedItem} onBack={() => setView('research-list')} />
      )}

      {/* VISTA: LISTADO COMPLETO DE INVESTIGACIONES */}
      {view === 'research-list' && (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium transition-colors"><ArrowLeft size={20} /> Volver al inicio</button>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Líneas de Investigación</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Explora nuestras áreas de desarrollo científico y tecnológico.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LINEAS_INVESTIGACION.map((item, idx) => (
                <Card key={idx} className={`group flex flex-col h-full bg-gradient-to-br ${item.color}`}>
                  <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white transition-colors border border-white/50">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.titulo}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow line-clamp-3">{item.desc}</p>
                  <div className="mt-6 pt-6 border-t border-slate-200/50">
                    <button onClick={() => handleViewResearch(item)} className="flex items-center text-blue-700 font-bold text-sm cursor-pointer hover:underline gap-2">Ver proyecto completo <ChevronRight size={16} /></button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VISTA: DETALLE DE ACTIVIDAD */}
      {view === 'activity-detail' && selectedItem && (
        <ActivityDetailView activity={selectedItem} onBack={() => setView('activities-list')} />
      )}

      {/* VISTA: LISTADO COMPLETO DE ACTIVIDADES */}
      {view === 'activities-list' && (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium transition-colors"><ArrowLeft size={20} /> Volver al inicio</button>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Bitácora de Actividades</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Registro completo de nuestras actividades.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ACTIVIDADES.map((act) => <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />)}
            </div>
          </div>
        </div>
      )}

      {/* VISTA NUEVA: LISTADO COMPLETO DE PUBLICACIONES */}
      {view === 'publications-list' && (
        <div className="pt-32 pb-20 min-h-screen bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium transition-colors"><ArrowLeft size={20} /> Volver al inicio</button>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Repositorio de Publicaciones</h1>
              <p className="text-slate-600 max-w-3xl text-lg">Lista completa de artículos científicos y contribuciones académicas.</p>
            </div>
            <div className="grid gap-4 max-w-4xl mx-auto">
              {PUBLICACIONES.map((pub, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition-all hover:shadow-md">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">{pub.year}</span>
                      <span className="text-slate-500 text-xs font-semibold uppercase">{pub.revista}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">{pub.titulo}</h4>
                    <p className="text-slate-500 text-sm">{pub.autor ? pub.autor : pub.autores}</p>
                  </div>
                  <a href={pub.link} className="mt-4 md:mt-0 p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-all"><ExternalLink size={20} /></a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VISTA: PORTADA (LANDING) */}
      {view === 'landing' && (
        <>
          <header className="relative pt-32 pb-20 lg:min-h-screen flex items-center overflow-hidden bg-slate-900" id="about">
            <div className="absolute inset-0 z-0 opacity-20"><div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px]"></div><div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500 rounded-full blur-[100px]"></div></div>
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-200 text-xs font-semibold mb-6">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
                  Investigación Activa {CONFIG.year}
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">Donde la ciencia <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">se encuentra con la tecnología</span></h1>
                <p className="text-lg text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">{CONFIG.mision}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button onClick={() => scrollToSection('research')} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">Nuestras Líneas <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
                  <button onClick={() => scrollToSection('publications')} className="px-8 py-3 bg-slate-800 text-white border border-slate-700 rounded-lg font-semibold hover:bg-slate-700 transition-all">Ver Publicaciones</button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-2 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"><img src={CONFIG.imagenes.hero} alt="Lab Vis" className="rounded-xl w-full h-auto" /></div>
              </div>
            </div>
          </header>

          <section id="research" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Creamos conocimiento que conecta datos, tecnología y personas para avanzar en la salud del futuro.">Líneas de Investigación</SectionTitle>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {LINEAS_INVESTIGACION.slice(0, 3).map((item, idx) => (
                  <Card key={idx} className={`group flex flex-col h-full hover:-translate-y-2 bg-gradient-to-br ${item.color}`}>
                    <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white transition-colors border border-white/50">{item.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.titulo}</h3>
                    <p className="text-slate-600 leading-relaxed flex-grow line-clamp-3">{item.desc}</p>
                    <div className="mt-6 pt-6 border-t border-slate-200/50">
                      <button onClick={() => handleViewResearch(item)} className="flex items-center text-blue-700 font-bold text-sm cursor-pointer hover:underline gap-2">Ver proyecto completo <ChevronRight size={16} /></button>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <button onClick={() => scrollToSection('all-research')} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group">
                  <LayoutGrid size={20} className="group-hover:scale-110 transition-transform" /> Ver todas las líneas de investigación
                </button>
              </div>
            </div>
          </section>

          <section id="activities" className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Registro completo de actividades académicas, presentaciones y participación institucional del Laboratorio.">Actividades Recientes</SectionTitle>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {ACTIVIDADES.slice(0, 3).map((act) => <ActivityCard key={act.id} item={act} onClick={handleViewActivity} />)}
              </div>
              <div className="text-center">
                <button onClick={() => scrollToSection('all-activities')} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all group">
                  <LayoutGrid size={20} className="group-hover:scale-110 transition-transform" /> Ver bitácora completa
                </button>
              </div>
            </div>
          </section>

          <section id="team" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <SectionTitle subtitle="Investigadores, estudiantes y profesionales trabajando juntos para construir ciencia con propósito.">Integrantes del Laboratorio</SectionTitle>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {EQUIPO.map((miembro, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all text-center group">
                    <div className="h-48 overflow-hidden relative"><img src={miembro.img} alt={miembro.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                    <div className="p-6">
                      <h4 className="font-bold text-slate-900 text-lg">{miembro.nombre}</h4>
                      <p className="text-blue-600 text-sm font-medium mb-3">{miembro.rol}</p>
                      <p className="text-slate-500 text-sm mb-4">{miembro.bio}</p>
                      
                      {/* REDES SOCIALES */}
                      <div className="flex justify-center gap-3">
                        {miembro.contactos.linkedin && (
                          <a href={miembro.contactos.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600">
                            <Linkedin size={18} />
                          </a>
                        )}
                        {miembro.contactos.github && (
                          <a href={miembro.contactos.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900">
                            <Github size={18} />
                          </a>
                        )}
                        {miembro.contactos.email && (
                          <a href={`mailto:${miembro.contactos.email}`} className="text-slate-400 hover:text-teal-600">
                            <Mail size={18} />
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="publications" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6">
              <SectionTitle>Publicaciones Recientes</SectionTitle>
              <div className="grid gap-4 max-w-4xl mx-auto">
                {PUBLICACIONES.slice(0, 3).map((pub, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition-all hover:shadow-md">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">{pub.year}</span>
                        <span className="text-slate-500 text-xs font-semibold uppercase">{pub.revista}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{pub.titulo}</h4>
                      <p className="text-slate-500 text-sm">{pub.autor ? pub.autor : pub.autores}</p>
                    </div>
                    <a href={pub.link} className="mt-4 md:mt-0 p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-all"><ExternalLink size={20} /></a>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <button onClick={() => scrollToSection('all-publications')} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">Ver todas las publicaciones <ChevronRight size={16} /></button>
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
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/latsib-utem-b87337396/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Contacto</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-blue-500 mt-1" size={20} />
                    <span className="text-sm">{CONFIG.direccion}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-blue-500" size={20} />
                    <a href={`mailto:${CONFIG.email}`} className="text-sm hover:text-white transition-colors">{CONFIG.email}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Instagram size={20} className="text-blue-500" />
                    <a href="https://www.instagram.com/latsib.utem/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">@latsib.utem</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-6">Enlaces de Interés</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Universidad Tecnológica Metropolitana</a></li>
                  <li><a href="https://www.anid.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">ANID Chile</a></li>
                  <li><a href="https://postgrado.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Postulaciones a Magíster</a></li>
                  <li><a href="https://rrii.utem.cl" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Colaboración Internacional</a></li>
                </ul>
              </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
              © {CONFIG.year} {CONFIG.nombreCompleto}. Todos los derechos reservados.
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
