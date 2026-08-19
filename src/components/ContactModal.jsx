import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Briefcase, HelpCircle, MessageSquare } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    ocupacion: '',
    motivo: '',
    motivoPersonalizado: '',
    comentarios: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevenir scroll en el body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    // Si terminó en éxito, reiniciar estado después de cerrar
    if (status === 'success') {
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          nombre: '',
          email: '',
          ocupacion: '',
          motivo: '',
          motivoPersonalizado: '',
          comentarios: '',
        });
      }, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const motivoFinal = formData.motivo === 'Otro' 
      ? `Otro: ${formData.motivoPersonalizado || 'Sin especificar'}` 
      : formData.motivo || 'Consulta General';

    // ─────────────────────────────────────────────────────────────────
    // Web3Forms – correo principal: latsibutem@gmail.com
    // CC: rcaulier@utem.cl
    // ─────────────────────────────────────────────────────────────────
    const WEB3FORMS_KEY = '52fff220-4e6e-4c4f-bc0c-3c785536a88e';

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `Nuevo Contacto LaTSIB: ${motivoFinal} - ${formData.nombre.trim()}`,
      from_name: 'LaTSIB Web',
      cc: 'rcaulier@utem.cl',
      // Campos del formulario
      'Nombre y Apellido': formData.nombre.trim(),
      'Correo de Contacto': formData.email.trim(),
      'Ocupación / Institución': formData.ocupacion.trim() || 'No especificada',
      'Motivo de Contacto': motivoFinal,
      'Comentarios y Contexto': formData.comentarios.trim(),
      replyto: formData.email.trim(),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'Error al procesar el formulario.');
      }
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setStatus('error');
      setErrorMessage('No fue posible enviar el formulario automáticamente. Por favor usa el enlace de correo directo para asegurarte de que tu mensaje llegue.');
    }
  };

  // Enlace mailto de respaldo en caso de fallo de red
  const getMailtoLink = () => {
    const motivoFinal = formData.motivo === 'Otro' ? formData.motivoPersonalizado : formData.motivo;
    const subject = encodeURIComponent(`Contacto LaTSIB: ${motivoFinal || 'Consulta'} - ${formData.nombre}`);
    const body = encodeURIComponent(
      `Nombre y Apellido: ${formData.nombre}\n` +
      `Correo de Contacto: ${formData.email}\n` +
      `Ocupación / Institución: ${formData.ocupacion}\n` +
      `Motivo de Contacto: ${motivoFinal}\n\n` +
      `Comentarios y Contexto:\n${formData.comentarios}`
    );
    return `mailto:rcaulier@utem.cl,latsibutem@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Fondo desenfocado */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={handleClose}
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Cabecera del Modal */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-blue-200 font-bold mb-1">
              Laboratorio de Biomédica Traslacional
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight">Formulario de Contacto</h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X size={22} />
          </button>
        </div>

        {/* Contenido del Modal según estado */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje Enviado con Éxito!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Gracias por comunicarte con nosotros. Tu información ha sido enviada a la coordinación del laboratorio y te responderemos a la brevedad posible.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-500 mb-6">
                Mensaje enviado a: <strong className="text-slate-700">rcaulier@utem.cl</strong> &amp; <strong className="text-slate-700">latsibutem@gmail.com</strong>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Completa los siguientes campos para contactar al equipo de <strong className="text-slate-800">LaTSIB</strong>. Responderemos directamente a tu correo.
              </p>

              {status === 'error' && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm flex flex-col gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle size={18} className="text-rose-600 shrink-0" />
                    <span>Aviso al enviar</span>
                  </div>
                  <p className="text-xs text-rose-700 leading-relaxed">{errorMessage}</p>
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center justify-center gap-2 mt-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <Mail size={14} /> Enviar directamente con mi app de correo
                  </a>
                </div>
              )}

              {/* NOMBRE Y APELLIDO */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-blue-600" />
                  Nombre y Apellido <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Ej. Francisca Valenzuela"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* CORREO / CONTACTO */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail size={14} className="text-blue-600" />
                  Correo de Contacto <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* OCUPACIÓN */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-blue-600" />
                  Ocupación / Institución
                </label>
                <input
                  type="text"
                  name="ocupacion"
                  placeholder="Ej. Estudiante de Ing. Biomédica (UTEM), Investigador, Profesional, etc."
                  value={formData.ocupacion}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* MOTIVO DE CONTACTO */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-blue-600" />
                  Motivo de Contacto <span className="text-rose-500">*</span>
                </label>
                <select
                  name="motivo"
                  required
                  value={formData.motivo}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="">Selecciona un motivo...</option>
                  <option value="Colaboración en Investigación">Colaboración en Investigación / Proyectos</option>
                  <option value="Tesis o Prácticas Profesionales">Tesis, Pasantías o Prácticas Profesionales</option>
                  <option value="Consulta sobre Líneas o Publicaciones">Consulta sobre Líneas o Publicaciones Científicas</option>
                  <option value="Información sobre Postgrados / Cursos">Información sobre Formación y Seminarios</option>
                  <option value="Otro">Otro motivo (especificar)</option>
                </select>
              </div>

              {formData.motivo === 'Otro' && (
                <div className="animate-in fade-in duration-200">
                  <input
                    type="text"
                    name="motivoPersonalizado"
                    placeholder="Describe brevemente el motivo..."
                    value={formData.motivoPersonalizado}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              )}

              {/* COMENTARIOS / MENSAJE */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-blue-600" />
                  Comentarios y Contexto del Mensaje <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="comentarios"
                  required
                  rows={4}
                  placeholder="Escribe aquí tu mensaje, consultas o el contexto de tu interés para que podamos responderte con mayor precisión..."
                  value={formData.comentarios}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* ENLACE ALTERNATIVO SIEMPRE VISIBLE */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail size={12} className="shrink-0" />
                <span>
                  También puedes escribirnos directamente a{' '}
                  <a href="mailto:rcaulier@utem.cl" className="text-blue-500 hover:underline">rcaulier@utem.cl</a>
                  {' '}o{' '}
                  <a href="mailto:latsibutem@gmail.com" className="text-blue-500 hover:underline">latsibutem@gmail.com</a>
                </span>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-5 py-2.5 text-slate-600 hover:text-slate-900 font-medium text-sm rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
