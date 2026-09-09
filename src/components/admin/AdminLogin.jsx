import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Mail, ShieldAlert, 
  Users, ChevronRight 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import utemLogo from '../../assets/logo-utem.png';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { loginWithGoogle, equipo, config } = useData();
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  // Lista de miembros activos del equipo con correo válido
  const teamMembers = (Array.isArray(equipo) ? equipo : []).filter(
    (m) => m.activo !== false && (m.contactos?.email || m.email)
  );

  const handleGoogleSubmit = async (targetEmail) => {
    setError('');
    const emailToAuth = (targetEmail || emailInput || '').trim();

    if (!emailToAuth) {
      setError('Por favor ingresa o selecciona tu correo institucional de Google.');
      return;
    }

    setLoading(true);

    try {
      // Autenticación con Google y validación estricta de Whitelist contra integrantes
      const result = await loginWithGoogle(emailToAuth);
      setLoading(false);

      if (result.success) {
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        setError(result.message || 'No se pudo autenticar la cuenta de Google.');
      }
    } catch (err) {
      setLoading(false);
      setError('Error al procesar el inicio de sesión con Google.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Fondo con resplandores tecnológicos */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-teal-500 rounded-full blur-[140px]" />
      </div>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Botón Volver */}
      <button
        type="button"
        onClick={onBackToSite}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-all cursor-pointer backdrop-blur-md shadow-sm z-20"
      >
        <ArrowLeft size={16} /> Volver a la web pública
      </button>

      <div className="w-full max-w-md relative z-10 my-8">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-950/50">
          
          {/* Logo Principal e Identidad */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src={utemLogo || config?.imagenes?.logoUtem || '/logo-utem.png'}
                alt="Logo UTEM"
                className="h-14 w-auto object-contain"
              />
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl blur-md opacity-70"></div>
                <img
                  src={config?.imagenes?.logo || '/logo-circle.png'}
                  alt="Logo LaTSIB"
                  className="relative h-14 w-14 object-cover rounded-2xl border-2 border-white/20 shadow-xl"
                />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-teal-400 font-semibold text-xs tracking-wider uppercase mt-1">
              Laboratorio de Biomédica Traslacional (LaTSIB)
            </p>
          </div>

          {/* Mensajes de Error o Bloqueo */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3 animate-in fade-in">
              <ShieldAlert size={20} className="shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-rose-300 block">Acceso Denegado</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Sección de Autenticación con Google */}
          <div className="space-y-6">
            
            {/* Tarjeta de Seguridad Informativa */}
            <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-4 text-xs text-blue-200/90 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">Acceso Exclusivo para el Equipo</strong>
                Solo las cuentas de Google registradas en la sección <strong>Equipo</strong> de esta página tienen permiso para ingresar.
              </div>
            </div>

            {/* Botón Principal: Continuar con Google */}
            <button
              type="button"
              onClick={() => handleGoogleSubmit()}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer border border-slate-200 disabled:opacity-50 text-sm"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Verificando autorización...' : 'Iniciar Sesión con Google'}</span>
            </button>

            {/* Input de Correo Google / Prueba Directa */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Ingresa tu Correo Google (@utem.cl)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="nombre@utem.cl"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGoogleSubmit()}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleGoogleSubmit()}
                  disabled={loading}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 shrink-0"
                >
                  Entrar
                </button>
              </div>
            </div>

            {/* Acceso Rápido para Integrantes del Laboratorio */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTeamSelector(!showTeamSelector)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Users size={15} className="text-teal-400" />
                  <span>Ver Integrantes con Acceso Permitido ({teamMembers.length})</span>
                </span>
                <ChevronRight size={15} className={`transition-transform duration-200 ${showTeamSelector ? 'rotate-90' : ''}`} />
              </button>

              {showTeamSelector && (
                <div className="mt-3 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 max-h-56 overflow-y-auto space-y-1.5 custom-scrollbar">
                  <p className="text-[11px] text-slate-400 px-2 py-1">
                    Haz clic en tu perfil para ingresar con tu cuenta institucional:
                  </p>
                  {teamMembers.map((member) => {
                    const memberEmail = member.contactos?.email || member.email;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => {
                          setEmailInput(memberEmail);
                          handleGoogleSubmit(memberEmail);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={member.img || '/logo-circle.png'}
                            alt={member.nombre}
                            className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
                          />
                          <div className="truncate">
                            <span className="text-xs font-medium text-slate-200 group-hover:text-teal-300 block truncate">
                              {member.nombre}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {memberEmail}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                          {member.rol || 'Miembro'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Footer de Seguridad y Encriptación */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-teal-400" />
              <span>Protegido por Google Workspace & UTEM SSO</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
