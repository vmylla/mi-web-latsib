import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, ShieldAlert, RefreshCw, X, Mail
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import utemLogo from '../../assets/logo-utem.png';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { loginWithGoogle, config } = useData();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('');

  const handleOpenGoogleAuth = () => {
    setError('');
    setShowGoogleModal(true);
  };

  const handleExecuteGoogleLogin = async (emailToUse) => {
    const targetEmail = (emailToUse || googleEmailInput || '').trim();
    if (!targetEmail) {
      setError('Por favor ingresa tu correo institucional de Google.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await loginWithGoogle({
        email: targetEmail,
        hd: 'utem.cl'
      });

      setLoading(false);

      if (result.success) {
        setShowGoogleModal(false);
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        setError(result.message || 'Acceso denegado: Esta cuenta Google no pertenece al Equipo del Laboratorio.');
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
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">Acceso Institucional Directo</strong>
                Acceso exclusivo para integrantes del <strong>Equipo LaTSIB</strong> mediante su cuenta institucional de Google Workspace.
              </div>
            </div>

            {/* Único Botón Oficial de Google */}
            <button
              type="button"
              onClick={handleOpenGoogleAuth}
              disabled={loading}
              className="w-full py-4 px-5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer border border-slate-200 disabled:opacity-50 text-sm"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <RefreshCw size={18} className="animate-spin text-blue-600" />
                  <span>Verificando con Google...</span>
                </div>
              ) : (
                <>
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
                  <span>Iniciar sesión con Google (Mi UTEM)</span>
                </>
              )}
            </button>

          </div>

          {/* Footer de Seguridad y Encriptación */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-teal-400" />
              <span>Protegido por Google Workspace & Mi UTEM SSO</span>
            </p>
          </div>

        </div>
      </div>

      {/* Modal de Verificación de Cuenta Google */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => {
                setShowGoogleModal(false);
                setError('');
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">
                  Google Workspace (Mi UTEM)
                </h2>
                <p className="text-xs text-slate-400">
                  Acceso institucional LaTSIB / UTEM
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Ingresa tu correo institucional de Google (<span className="text-teal-400 font-mono">@utem.cl</span>) con el que tienes tu sesión activa para verificar tu registro en el equipo:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecuteGoogleLogin();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Correo Institucional de Google:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={googleEmailInput}
                    onChange={(e) => {
                      setGoogleEmailInput(e.target.value);
                      setError('');
                    }}
                    placeholder="tu.correo@utem.cl"
                    autoFocus
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-sm transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <ShieldAlert size={16} className="shrink-0 text-rose-400 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || !googleEmailInput.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg hover:shadow-teal-500/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Validar e Ingresar</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
