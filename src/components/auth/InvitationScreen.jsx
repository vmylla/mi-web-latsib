import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, 
  ArrowRight, KeyRound, Sparkles, HelpCircle 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const InvitationScreen = ({ mode = 'invitacion', onComplete, onCancel }) => {
  const { 
    config, 
    getInvitationByToken, 
    acceptInvitation, 
    getResetByTokenOrCode, 
    resetPassword 
  } = useData();

  const [token, setToken] = useState('');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Parse token from hash (e.g. #invitacion?token=xxx or #recuperar?token=xxx)
    const hash = window.location.hash || '';
    const params = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    const foundToken = params.get('token') || params.get('code') || '';
    setToken(foundToken);

    if (!foundToken) {
      setError('No se proporcionó un token o enlace de acceso válido en la dirección.');
      setLoading(false);
      return;
    }

    if (mode === 'invitacion') {
      const inv = getInvitationByToken(foundToken);
      if (!inv) {
        setError('El enlace de invitación no es válido o ha expirado. Por favor solicita una nueva invitación al administrador.');
      } else {
        setRecord(inv);
      }
    } else {
      // mode === 'recuperar'
      const rst = getResetByTokenOrCode(foundToken);
      if (!rst) {
        setError('El enlace de recuperación no es válido o ya fue utilizado.');
      } else {
        setRecord(rst);
      }
    }
    setLoading(false);
  }, [mode, getInvitationByToken, getResetByTokenOrCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError('Por favor complete todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe contener al menos 6 caracteres.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'invitacion') {
        const res = await acceptInvitation(token, password);
        if (res.success) {
          setSuccess(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2000);
        } else {
          setError(res.error || 'Error al activar la cuenta');
        }
      } else {
        const res = await resetPassword(token, password);
        if (res.success) {
          setSuccess(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2000);
        } else {
          setError(res.error || 'Error al restablecer la contraseña');
        }
      }
    } catch (err) {
      setError('Ocurrió un error inesperado al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Luces de Fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Cabecera de Logos */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-14 px-3 py-1.5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
              <img
                src={config?.imagenes?.logoUtem || '/utem-logo.png'}
                alt="Logo UTEM"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="h-14 w-14 rounded-2xl overflow-hidden border border-teal-500/30 shadow-lg shadow-teal-950/50 bg-slate-950 flex items-center justify-center">
              <img
                src={config?.imagenes?.logo || '/logo-circle.png'}
                alt="Logo LaTSIB"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-white text-center">
            {mode === 'invitacion' ? 'Activación de Cuenta' : 'Restablecer Contraseña'}
          </h1>
          <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider mt-1 text-center">
            Laboratorio de Biomédica Traslacional (LaTSIB)
          </p>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400">Verificando enlace de seguridad...</p>
          </div>
        ) : error && !record ? (
          <div className="space-y-5">
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-300 text-xs flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 text-rose-400 mt-0.5" />
              <div>
                <div className="font-bold text-sm text-rose-200 mb-1">Enlace no disponible</div>
                <div>{error}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              Volver al Inicio
            </button>
          </div>
        ) : success ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">¡Operación Exitosa!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tu contraseña ha sido guardada de forma segura y cifrada. Ingresando a la plataforma...
              </p>
            </div>
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tarjeta de Usuario Identificado */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[11px] text-slate-400">Cuenta identificada:</div>
              <div className="text-sm font-bold text-white mt-0.5">{record?.nombre || 'Usuario'}</div>
              <div className="text-xs text-teal-400 font-mono mt-0.5">{record?.email}</div>
              {record?.rol && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 text-[10px] font-bold uppercase border border-teal-500/20">
                  <Sparkles size={12} /> Rol Asignado: {record.rol}
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {mode === 'invitacion' ? 'Crea tu Contraseña Privada' : 'Nueva Contraseña'}
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirma tu Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <KeyRound size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                🔒 Tu clave se encripta mediante hash seguro en el sistema. Nadie más (ni siquiera los administradores) puede leer tu contraseña.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'invitacion' ? 'Activar Cuenta y Acceder' : 'Guardar y Continuar'}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
          >
            ← Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );
};
