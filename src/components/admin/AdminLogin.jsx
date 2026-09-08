import React, { useState, useEffect } from 'react';
import { Lock, Mail, KeyRound, ArrowLeft, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { login, config, users } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Cuenta regresiva en caso de bloqueo por intentos fallidos
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds(s => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (lockoutSeconds > 0) {
      setError(`Acceso bloqueado temporalmente por seguridad. Espera ${lockoutSeconds} segundos.`);
      return;
    }

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        setFailedAttempts(0);
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLockoutSeconds(30);
          setError('Demasiados intentos fallidos. Bloqueado temporalmente por 30 segundos.');
        } else {
          setError(result.message || 'Credenciales inválidas.');
        }
      }
    }, 400);
  };

  const handleQuickSelect = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
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
          {/* Logo Principal en Grande */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-md opacity-70"></div>
              <img
                src={config?.imagenes?.logo || '/logo-circle.png'}
                alt="Logo LaTSIB"
                className="relative h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full mx-auto border-2 border-white/20 shadow-xl"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-teal-400 font-semibold text-xs tracking-wider uppercase mt-1">
              Laboratorio de Biomédica Traslacional (LaTSIB)
            </p>
          </div>

          {/* Mensajes de Error */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in">
              <AlertCircle size={18} className="shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Correo Institucional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@utem.cl"
                  disabled={lockoutSeconds > 0}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={lockoutSeconds > 0}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || lockoutSeconds > 0}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Verificando credenciales...</span>
              ) : lockoutSeconds > 0 ? (
                <span>Bloqueado ({lockoutSeconds}s)</span>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Ingresar al Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Selector Rápido para Prueba de Roles */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-3">
              <Sparkles size={14} className="text-teal-400" />
              <span>Acceso Rápido de Prueba (Selecciona un perfil):</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickSelect('rcaulier@utem.cl', 'admin.latsib.2026')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-blue-400 truncate">Dr. Raúl Caulier</div>
                <div className="text-[10px] text-teal-400">Admin (Director)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('cguajardo@utem.cl', 'admin.latsib.2026')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-blue-400 truncate">Camila Guajardo</div>
                <div className="text-[10px] text-teal-400">Admin (Divulgación)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('avega@utem.cl', 'admin.latsib.2026')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-blue-400 truncate">Andrés Vega</div>
                <div className="text-[10px] text-teal-400">Admin (Tesista)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('vescuderod@utem.cl', 'admin.latsib.2026')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-blue-400 truncate">Vicente Escudero</div>
                <div className="text-[10px] text-teal-400">Admin (Investigador)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('glanyon@utem.cl', 'admin.latsib.2026')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-blue-400 truncate">Glenn Lanyon</div>
                <div className="text-[10px] text-teal-400">Admin (Tesista)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('jvergara@utem.cl', 'editor.latsib.2026')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-blue-400 truncate">Jorge Vergara</div>
                <div className="text-[10px] text-indigo-400">Editor (Colaborador)</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="text-teal-500" />
              <span>Conexión cifrada institucional LaTSIB & UTEM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
