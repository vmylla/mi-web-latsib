import React, { useState, useEffect } from 'react';
import {
  Shield, FileText, Cookie, CheckCircle2, XCircle, Clock,
  Download, Trash2, ArrowLeft, ExternalLink, Scale, Lock,
  UserCheck, Eye, Edit3, Ban, Share2, Info, X
} from 'lucide-react';

export const CONSENT_STORAGE_KEY = 'latsib_cookie_preference_v1';
export const CONSENT_LOGS_KEY = 'latsib_consent_logs_v1';
export const LEGAL_DOC_VERSION = 'v1.0 (Cumplimiento Ley N° 21.719 y Ley N° 19.628 - Chile)';

/**
 * Obtiene la preferencia actual de cookies guardada en el navegador
 */
export function getCookiePreference() {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Obtiene el historial completo de registros de consentimiento almacenados
 */
export function getConsentLogs() {
  try {
    const raw = localStorage.getItem(CONSENT_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Registra de forma auditable cuándo y cómo una persona aceptó o rechazó cookies / políticas
 */
export function recordConsent({
  source,
  cookieDecision,
  acceptedPrivacyAndTerms = true,
  userEmail = 'Anónimo (Visitante Web)',
  userName = 'Visitante',
}) {
  const now = new Date();
  const fechaChile = now.toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const entry = {
    id: `CONSENT-${now.getTime()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    timestampISO: now.toISOString(),
    fechaHoraChile: fechaChile,
    usuario: userName,
    correo: userEmail,
    metodoComoAcepto: source,
    decisionCookies: cookieDecision === 'accepted' ? 'Aceptar cookies' : 'Rechazar cookies',
    estadoCookiesCodigo: cookieDecision,
    aceptoPrivacidadYTerminos: acceptedPrivacyAndTerms,
    versionDocumentos: LEGAL_DOC_VERSION,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Desconocido',
  };

  try {
    const prefObj = {
      decision: cookieDecision,
      updatedAt: now.toISOString(),
      fechaHoraChile: fechaChile,
      source,
      version: LEGAL_DOC_VERSION,
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefObj));

    const existingLogs = getConsentLogs();
    const updatedLogs = [entry, ...existingLogs].slice(0, 200);
    localStorage.setItem(CONSENT_LOGS_KEY, JSON.stringify(updatedLogs));
    window.dispatchEvent(new CustomEvent('latsib-consent-updated', { detail: entry }));
  } catch (err) {
    console.error('Error al guardar registro de consentimiento:', err);
  }

  return entry;
}

/**
 * Contenido íntegro de los documentos legales conforme a la Ley N° 21.719 (Chile)
 */
export function LegalDocumentContent({ activeTab, setActiveTab }) {
  const [logs, setLogs] = useState(() => getConsentLogs());
  const [currentPref, setCurrentPref] = useState(() => getCookiePreference());

  useEffect(() => {
    const refresh = () => {
      setLogs(getConsentLogs());
      setCurrentPref(getCookiePreference());
    };
    window.addEventListener('latsib-consent-updated', refresh);
    return () => window.removeEventListener('latsib-consent-updated', refresh);
  }, []);

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `registro-consentimientos-latsib-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleUpdateCookiePref = (decision) => {
    recordConsent({
      source: 'Panel de Gestión de Privacidad y Cookies (Centro Legal)',
      cookieDecision: decision,
      acceptedPrivacyAndTerms: true,
    });
  };

  return (
    <div className="space-y-8">
      {/* Navegación por pestañas entre documentos legales */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('privacidad')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'privacidad'
              ? 'bg-[#08182b] text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Shield size={16} />
          <span>Política de Privacidad (Ley 21.719)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('terminos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'terminos'
              ? 'bg-[#08182b] text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileText size={16} />
          <span>Términos y Condiciones</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cookies')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'cookies'
              ? 'bg-[#08182b] text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Cookie size={16} />
          <span>Política de Cookies</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('registro')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'registro'
              ? 'bg-[#08182b] text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Clock size={16} />
          <span> Derechos ARCOP y Registro de Consentimiento</span>
        </button>
      </div>

      {/* 1. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS (LEY 21.719 CHILE) */}
      {activeTab === 'privacidad' && (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-teal-300 shrink-0" size={26} />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                Cumplimiento Normativo Chile · Ley N° 21.719 y Ley N° 19.628
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Política de Privacidad y Protección de Datos Personales
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm">
              Última actualización: Noviembre 2026 · Versión {LEGAL_DOC_VERSION}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Scale size={18} className="text-blue-600" />
                1. Identificación del Responsable del Tratamiento
              </h3>
              <p>
                El responsable del tratamiento de los datos personales recolectados a través de este sitio web es el{' '}
                <strong>Laboratorio de Biomédica Traslacional (LaTSIB)</strong>, perteneciente a la{' '}
                <strong>Universidad Tecnológica Metropolitana (UTEM)</strong>, institución de educación superior del Estado de Chile, con domicilio en{' '}
                <strong>Av. José Pedro Alessandri 1242, Ñuñoa, Región Metropolitana, Santiago, Chile</strong>.
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-slate-600 space-y-1">
                <li><strong>Director / Investigador Responsable:</strong> Dr. Raúl Caulier Cisterna</li>
                <li><strong>Correos oficiales de contacto y protección de datos:</strong> <a href="mailto:rcaulier@utem.cl" className="text-blue-600 hover:underline">rcaulier@utem.cl</a> y <a href="mailto:latsibutem@gmail.com" className="text-blue-600 hover:underline">latsibutem@gmail.com</a></li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Lock size={18} className="text-blue-600" />
                2. Marco Legal Aplicable (Ley N° 21.719 de Chile)
              </h3>
              <p>
                Esta Política de Privacidad se rige por la legislación chilena vigente, en especial por el artículo 19 N° 4 de la Constitución Política de la República, la{' '}
                <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> y su modificación integral introducida por la{' '}
                <strong>Ley N° 21.719</strong> (que regula la protección y el tratamiento de los datos personales y crea la Agencia de Protección de Datos Personales), observando estrictamente los principios de{' '}
                <strong>licitud, lealtad, transparencia, finalidad, proporcionalidad, calidad, responsabilidad, seguridad y confidencialidad</strong>.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                3. Datos Personales que Recolectamos y Finalidad del Tratamiento
              </h3>
              <p className="mb-2">
                LaTSIB recolecta únicamente los datos estrictamente necesarios (principio de minimización de datos) cuando usted utiliza voluntariamente nuestro formulario de contacto o interactúa con el sitio:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600">
                <li><strong>Datos identificatorios y de contacto:</strong> Nombre y apellido, dirección de correo electrónico, ocupación o institución de pertenencia.</li>
                <li><strong>Datos de la consulta:</strong> Motivo de contacto (colaboración científica, tesis/prácticas, consultas sobre publicaciones o seminarios) y el mensaje o contexto proporcionado por el usuario.</li>
                <li><strong>Datos de registro de consentimiento (trazabilidad legal):</strong> Fecha y hora exacta de otorgamiento o rechazo del consentimiento, modalidad de aceptación (casillas del formulario o banner), versión de los textos legales aceptados y preferencia de cookies.</li>
              </ul>
              <p className="mt-2">
                <strong>Finalidad exclusiva:</strong> Responder a sus consultas académicas, científicas o institucionales, gestionar solicitudes de colaboración, pasantías o tesis, y mantener evidencia auditable del cumplimiento de la Ley N° 21.719. <strong>No utilizamos sus datos para fines comerciales, publicitarios ni elaboración de perfiles automatizados.</strong>
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                4. Base de Licitud del Tratamiento
              </h3>
              <p>
                Conforme al artículo 12 de la Ley N° 21.719, la base de licitud para el tratamiento de sus datos personales es el{' '}
                <strong>consentimiento libre, informado, específico, inequívoco y previo del titular</strong>, manifestado mediante la marcación activa de las casillas correspondientes antes de enviar el formulario de contacto o al configurar sus preferencias de cookies. El titular puede revocar este consentimiento en cualquier momento sin efecto retroactivo.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                5. Destinatarios, Encargados de Tratamiento y Transferencias
              </h3>
              <p>
                Sus datos no son vendidos, arrendados ni cedidos a terceros. Para el envío técnico de las notificaciones de correo electrónico desde el formulario web hacia las casillas institucionales (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">rcaulier@utem.cl</code> y <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">latsibutem@gmail.com</code>), se utiliza el servicio de despacho de formularios <strong>Web3Forms</strong> bajo cifrado HTTPS/TLS, actuando únicamente como canal de transmisión técnica de la comunicación solicitada por el titular.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                6. Plazo de Conservación de los Datos
              </h3>
              <p>
                Los datos personales asociados a consultas académicas o institucionales se conservarán únicamente durante el tiempo necesario para atender y dar seguimiento a la solicitud del titular, o hasta que el titular solicite su supresión o revoque su consentimiento, sin perjuicio de la conservación de los registros de auditoría de consentimiento exigidos para demostrar el cumplimiento legal.
              </p>
            </section>

            <section className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <UserCheck size={20} className="text-blue-700" />
                7. Derechos del Titular de los Datos (Derechos ARCOP + Portabilidad · Ley N° 21.719)
              </h3>
              <p className="text-sm mb-3">
                De acuerdo con la Ley N° 21.719, toda persona titular de datos personales tiene garantizados los siguientes derechos gratuitos, irrenunciables y exigibles ante LaTSIB:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <strong className="flex items-center gap-1.5 text-slate-900 mb-1"><Eye size={15} className="text-blue-600" /> Derecho de Acceso:</strong>
                  Solicitar y obtener confirmación de si sus datos están siendo tratados por LaTSIB, conocer su origen, finalidad y obtener copia de ellos.
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <strong className="flex items-center gap-1.5 text-slate-900 mb-1"><Edit3 size={15} className="text-blue-600" /> Derecho de Rectificación:</strong>
                  Exigir que se modifiquen o actualicen sus datos personales cuando sean inexactos, incompletos, equívocos o desactualizados.
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <strong className="flex items-center gap-1.5 text-slate-900 mb-1"><Trash2 size={15} className="text-blue-600" /> Derecho de Supresión (Cancelación):</strong>
                  Solicitar la eliminación o borrado de sus datos personales cuando ya no sean necesarios para los fines autorizados o cuando revoque su consentimiento.
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                  <strong className="flex items-center gap-1.5 text-slate-900 mb-1"><Ban size={15} className="text-blue-600" /> Derecho de Oposición y Bloqueo:</strong>
                  Oponerse a un tratamiento determinado de sus datos personales o solicitar el bloqueo temporal de los mismos mientras se resuelve una solicitud.
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100 sm:col-span-2">
                  <strong className="flex items-center gap-1.5 text-slate-900 mb-1"><Share2 size={15} className="text-blue-600" /> Derecho a la Portabilidad y Revocación:</strong>
                  Solicitar una copia de sus datos personales y de su registro de consentimiento en un formato electrónico estructurado, genérico y de uso común (JSON), así como revocar su consentimiento en cualquier momento.
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                <strong>¿Cómo ejercer sus derechos?</strong> Puede ejercer cualquiera de estos derechos escribiendo a{' '}
                <a href="mailto:rcaulier@utem.cl?subject=Ejercicio%20de%20Derechos%20ARCOP%20-%20Ley%2021.719" className="text-blue-700 font-bold hover:underline">rcaulier@utem.cl</a> o{' '}
                <a href="mailto:latsibutem@gmail.com?subject=Ejercicio%20de%20Derechos%20ARCOP%20-%20Ley%2021.719" className="text-blue-700 font-bold hover:underline">latsibutem@gmail.com</a>, o utilizando la pestaña{' '}
                <button type="button" onClick={() => setActiveTab('registro')} className="text-blue-700 font-bold underline cursor-pointer">
                  Derechos ARCOP y Registro de Consentimiento
                </button>{' '}
                en esta misma sección. Asimismo, le asiste el derecho de reclamar ante la Agencia de Protección de Datos Personales de Chile conforme a la Ley N° 21.719.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 2. TÉRMINOS Y CONDICIONES DE USO */}
      {activeTab === 'terminos' && (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="text-teal-300 shrink-0" size={26} />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                Marco Institucional · LaTSIB UTEM
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Términos y Condiciones de Uso del Sitio Web
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm">
              Última actualización: Noviembre 2026 · Versión {LEGAL_DOC_VERSION}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Objeto y Aceptación</h3>
              <p>
                Los presentes Términos y Condiciones regulan el acceso y uso del portal web oficial del{' '}
                <strong>Laboratorio de Biomédica Traslacional (LaTSIB)</strong> de la Universidad Tecnológica Metropolitana (UTEM). El acceso, navegación o utilización del formulario de contacto implica la lectura y aceptación informada de estas condiciones y de nuestra Política de Privacidad.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Carácter Académico, Científico e Informativo (Exención de Consejo Médico)</h3>
              <p>
                Todo el contenido publicado en este sitio web —incluyendo líneas de investigación, proyectos en neurociencia, procesamiento de señales (fNIRS, ECG, EEG, EMG), modelos de inteligencia artificial, fotografías de congresos y enlaces a publicaciones científicas— tiene un propósito estrictamente{' '}
                <strong>académico, investigativo, docente y de divulgación científica</strong>. Ninguna información publicada en este sitio constituye diagnóstico clínico, prescripción ni consejo médico profesional para pacientes.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Propiedad Intelectual e Industrial (Ley N° 17.336)</h3>
              <p>
                Los textos, logotipos de LaTSIB y UTEM, fotografías de actividades, infografías científicas, código fuente y diseño gráfico se encuentran protegidos por la{' '}
                <strong>Ley N° 17.336 sobre Propiedad Intelectual de Chile</strong> y los tratados internacionales aplicables. Los artículos científicos enlazados pertenecen a sus respectivos autores y editoriales académicas (bajo sus licencias Open Access o copyright editorial correspondiente). Se autoriza la cita con fines académicos e investigativos indicando siempre la fuente y autoría del Laboratorio LaTSIB - UTEM.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">4. Uso Correcto del Sitio y del Formulario de Contacto</h3>
              <p>
                El usuario se compromete a utilizar el sitio web y su formulario de contacto de buena fe, conforme a la ley chilena y al orden público, absteniéndose de enviar información falsa, correo no deseado (spam), código malicioso o realizar acciones que vulneren la seguridad informática del sitio (Ley N° 21.459 sobre Delitos Informáticos).
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">5. Enlaces a Sitios de Terceros</h3>
              <p>
                Este portal contiene enlaces externos hacia revistas científicas (Springer, PubMed Central, MDPI), redes sociales institucionales (Instagram, LinkedIn, YouTube, TikTok) y sitios gubernamentales o universitarios (UTEM, ANID). LaTSIB no controla ni asume responsabilidad por las políticas de privacidad o cookies propias de dichos portales externos.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">6. Legislación Aplicable y Jurisdicción</h3>
              <p>
                Estos Términos y Condiciones se rigen íntegramente por las leyes de la República de Chile. Para cualquier controversia derivada del uso del sitio o del tratamiento de datos personales, serán competentes los tribunales ordinarios de justicia con asiento en la ciudad de Santiago de Chile y la Agencia de Protección de Datos Personales conforme a la Ley N° 21.719.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 3. POLÍTICA DE COOKIES Y EVALUACIÓN DE CONSENTIMIENTO */}
      {activeTab === 'cookies' && (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Cookie className="text-teal-300 shrink-0" size={26} />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                Transparencia Técnica · Ley N° 21.719 Chile
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Política de Cookies y Almacenamiento Local
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm">
              Última actualización: Noviembre 2026 · Evaluación de consentimiento y tecnologías utilizadas
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <section className="bg-teal-50/70 border border-teal-200 p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Info size={20} className="text-teal-700 shrink-0" />
                ¿Necesita este sitio consentimiento para usar cookies según la Ley N° 21.719?
              </h3>
              <p className="text-sm text-slate-700">
                <strong>Diagnóstico técnico y legal del sitio LaTSIB:</strong> Nuestro sitio web <strong>no utiliza cookies publicitarias, de rastreo comercial ni píxeles de seguimiento de terceros</strong>. Únicamente emplea almacenamiento técnico local (<code className="bg-white px-1.5 py-0.5 rounded border text-xs">localStorage</code>) para la carga rápida de contenidos públicos del laboratorio y para guardar su decisión de consentimiento. Sin embargo, en cumplimiento estricto del estándar de consentimiento expreso e informado de la <strong>Ley N° 21.719</strong>, ponemos a su disposición tanto en el banner del sitio como en cada formulario <strong>dos casillas separadas ("Aceptar cookies" y "Rechazar cookies")</strong>, garantizando que si usted elige <strong>Rechazar cookies</strong>, el sitio bloqueará cualquier almacenamiento opcional o no esencial sin impedirle navegar ni enviar su consulta de contacto.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Detalle de Tecnologías de Almacenamiento Utilizadas
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="p-3 font-bold">Nombre / Clave</th>
                      <th className="p-3 font-bold">Tipo</th>
                      <th className="p-3 font-bold">Finalidad</th>
                      <th className="p-3 font-bold">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-mono text-xs">latsib_cookie_preference_v1</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">Técnica / Legal</span></td>
                      <td className="p-3">Guarda si el usuario seleccionó "Aceptar cookies" o "Rechazar cookies".</td>
                      <td className="p-3">12 meses o hasta revocación</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">latsib_consent_logs_v1</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">Auditoría Ley 21.719</span></td>
                      <td className="p-3">Registra fecha, hora, versión legal y cómo el usuario otorgó o rechazó el consentimiento.</td>
                      <td className="p-3">Permanente / Descargable por el titular</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">latsib_config / equipo / publicaciones</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">Funcional / Caché</span></td>
                      <td className="p-3">Almacena el catálogo público de integrantes, actividades y publicaciones del laboratorio (no contiene datos personales del visitante).</td>
                      <td className="p-3">Sesión / Local (se limpia si rechaza cookies opcionales)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Estado actual de su preferencia de cookies:</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {currentPref ? (
                    <>
                      Usted seleccionó:{' '}
                      <strong className={currentPref.decision === 'accepted' ? 'text-emerald-700' : 'text-amber-700'}>
                        {currentPref.decision === 'accepted' ? 'Aceptar cookies' : 'Rechazar cookies'}
                      </strong>{' '}
                      el {currentPref.fechaHoraChile} ({currentPref.source}).
                    </>
                  ) : (
                    'Aún no ha registrado una preferencia de cookies.'
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleUpdateCookiePref('rejected')}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Rechazar cookies
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateCookiePref('accepted')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#08182b] text-white hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  Aceptar cookies
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* 4. REGISTRO AUDITABLE DE CONSENTIMIENTO Y EJERCICIO DE DERECHOS ARCOP */}
      {activeTab === 'registro' && (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-teal-300 shrink-0" size={26} />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                Trazabilidad y Derechos del Titular · Ley N° 21.719
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Registro de Consentimientos y Ejercicio de Derechos ARCOP
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm">
              Verificación de cuándo y cómo se otorgó el consentimiento y canal directo para ejercer sus derechos legales
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Historial de Consentimientos Registrados
                </h3>
                <p className="text-xs text-slate-500">
                  Cada vez que usted acepta o rechaza cookies (en el banner o en el formulario de contacto), se guarda un registro con fecha, hora y vía de aceptación, además de adjuntarse en el comprobante del formulario enviado al laboratorio.
                </p>
              </div>
              {logs.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportLogs}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Download size={15} />
                  Descargar Registro (JSON)
                </button>
              )}
            </div>

            {logs.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-sm">
                Aún no hay registros de consentimiento guardados en este navegador. Al aceptar o rechazar cookies en el banner inferior o en el formulario de contacto, el registro aparecerá aquí con su fecha, hora y modalidad.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="p-3 font-bold">ID Registro</th>
                      <th className="p-3 font-bold">Fecha y Hora (Chile)</th>
                      <th className="p-3 font-bold">Titular / Correo</th>
                      <th className="p-3 font-bold">Cómo Aceptó / Origen</th>
                      <th className="p-3 font-bold">Decisión Cookies</th>
                      <th className="p-3 font-bold">Privacidad y T&amp;C</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-semibold text-slate-800">{log.id}</td>
                        <td className="p-3 whitespace-nowrap">{log.fechaHoraChile}</td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-800">{log.usuario}</div>
                          <div className="text-slate-500">{log.correo}</div>
                        </td>
                        <td className="p-3">{log.metodoComoAcepto}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${
                              log.estadoCookiesCodigo === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {log.estadoCookiesCodigo === 'accepted' ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              <XCircle size={12} />
                            )}
                            {log.decisionCookies}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                            {log.aceptoPrivacidadYTerminos ? 'Aceptado' : 'No requerido'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Solicitud rápida de Derechos ARCOP */}
            <div className="mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <UserCheck size={18} className="text-blue-600" />
                Canal Directo para Ejercer Derechos ARCOP y Portabilidad (Ley N° 21.719)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Seleccione el derecho que desea ejercer para generar una solicitud formal dirigida al Responsable de Datos del Laboratorio LaTSIB (<code className="bg-white px-1.5 py-0.5 rounded border text-xs">rcaulier@utem.cl</code> y <code className="bg-white px-1.5 py-0.5 rounded border text-xs">latsibutem@gmail.com</code>):
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'Solicitar Acceso a mis Datos', right: 'Acceso' },
                  { label: 'Solicitar Rectificación', right: 'Rectificación' },
                  { label: 'Solicitar Supresión / Eliminación', right: 'Supresión (Cancelación)' },
                  { label: 'Oponerme al Tratamiento', right: 'Oposición' },
                  { label: 'Solicitar Portabilidad de Datos', right: 'Portabilidad' },
                  { label: 'Revocar mi Consentimiento', right: 'Revocación de Consentimiento' },
                ].map((item) => {
                  const mailHref = `mailto:rcaulier@utem.cl,latsibutem@gmail.com?subject=${encodeURIComponent(
                    `Solicitud Derechos ARCOP (Ley 21.719): ${item.right}`
                  )}&body=${encodeURIComponent(
                    `Estimado equipo responsable de datos de LaTSIB - UTEM,\n\nPor medio del presente correo ejerzo mi derecho de ${item.right.toUpperCase()} garantizado por la Ley N° 21.719 sobre Protección de Datos Personales de Chile.\n\n- Nombre completo del titular: \n- Correo electrónico asociado: \n- Detalle de la solicitud: \n\nAtentamente,`
                  )}`;
                  return (
                    <a
                      key={item.right}
                      href={mailHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-bold transition-all shadow-2xs"
                    >
                      <ExternalLink size={13} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Vista de página completa para #privacidad, #terminos y #cookies
 */
export function LegalPageView({ initialTab = 'privacidad', onBack }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 animate-in fade-in duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-semibold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 cursor-pointer hover:shadow"
        >
          <ArrowLeft size={18} /> Volver al inicio
        </button>

        <LegalDocumentContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

/**
 * Modal flotante para leer los documentos legales sin perder los datos escritos en un formulario
 */
export function LegalQuickModal({ isOpen, initialTab = 'privacidad', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-slate-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-br from-[#08182b] via-[#0d2a45] to-[#0a3853] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-circle.png" alt="Logo LaTSIB" className="h-10 w-10 object-contain" />
            <div>
              <span className="text-[11px] uppercase tracking-widest text-teal-300 font-bold block">
                Centro Legal y Protección de Datos · Ley N° 21.719 Chile
              </span>
              <h3 className="text-lg font-extrabold">Documentación Legal LaTSIB</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar documentos legales"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <LegalDocumentContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

/**
 * Banner inferior de consentimiento de cookies conforme a la Ley N° 21.719
 */
export function CookieConsentBanner({ onOpenLegal }) {
  const [pref, setPref] = useState(() => getCookiePreference());

  useEffect(() => {
    const handleUpdate = () => setPref(getCookiePreference());
    window.addEventListener('latsib-consent-updated', handleUpdate);
    return () => window.removeEventListener('latsib-consent-updated', handleUpdate);
  }, []);

  if (pref) return null;

  const handleDecision = (decision) => {
    recordConsent({
      source: 'Banner de Consentimiento Inicial del Sitio Web',
      cookieDecision: decision,
      acceptedPrivacyAndTerms: true,
    });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] p-4 sm:p-6 pointer-events-none">
      <div className="container mx-auto max-w-5xl pointer-events-auto bg-[#08182b]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl shadow-2xl border border-cyan-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 flex-1">
          <div className="flex items-center gap-2 font-bold text-white text-sm sm:text-base">
            <Cookie size={18} className="text-teal-300 shrink-0" />
            <span>Privacidad, Cookies y Protección de Datos (Ley N° 21.719 Chile)</span>
          </div>
          <p className="leading-relaxed">
            Este sitio utiliza almacenamiento técnico local para su funcionamiento y registra su preferencia de privacidad conforme a la{' '}
            <strong>Ley N° 21.719 sobre Protección de Datos Personales</strong>. No utilizamos cookies publicitarias ni de rastreo comercial. Puede consultar nuestra{' '}
            <button
              type="button"
              onClick={() => onOpenLegal('privacidad')}
              className="text-teal-300 font-semibold underline hover:text-teal-200 cursor-pointer"
            >
              Política de Privacidad
            </button>
            ,{' '}
            <button
              type="button"
              onClick={() => onOpenLegal('terminos')}
              className="text-teal-300 font-semibold underline hover:text-teal-200 cursor-pointer"
            >
              Términos y Condiciones
            </button>{' '}
            y{' '}
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="text-teal-300 font-semibold underline hover:text-teal-200 cursor-pointer"
            >
              Política de Cookies
            </button>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
          <button
            type="button"
            onClick={() => handleDecision('rejected')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors cursor-pointer"
          >
            Rechazar cookies
          </button>
          <button
            type="button"
            onClick={() => handleDecision('accepted')}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md transition-all cursor-pointer"
          >
            Aceptar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
