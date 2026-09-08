import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, KeyRound, ArrowLeft, ShieldCheck, AlertCircle, 
  Smartphone, CheckCircle2, ArrowRight, HelpCircle, X 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import utemLogo from '../../assets/logo-utem.png';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { login, verify2FALogin, requestPasswordReset, config } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // 2FA state
  const [twoFactorPending, setTwoFactorPending] = useState(null); // { tempUserId, email, code }
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Password recovery modal state
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState(null);
  const [recoveryError, setRecoveryError] = useState(null);
  const [recoveryData, setRecoveryData] = useState(null);

  // Countdown timer in case of temporary lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleLoginSubmit = async (e) => {
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

    try {
      const result = await login(email, password);
      setLoading(false);

      if (result.success) {
        if (result.requires2FA) {
          // Trigger 2FA step
          setTwoFactorPending({
            tempUserId: result.tempUserId,
            email: email,
            demoCode: result.demoCode
          });
          setTwoFactorCode('');
        } else {
          setFailedAttempts(0);
          if (onLoginSuccess) onLoginSuccess(result.user);
        }
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLockoutSeconds(30);
          setError('Demasiados intentos fallidos. Acceso bloqueado temporalmente por 30 segundos.');
        } else {
          setError(result.message || 'Credenciales no válidas o cuenta no activa.');
        }
      }
    } catch (err) {
      setLoading(false);
      setError('Error al procesar el inicio de sesión.');
    }
  };

  const handle2FASubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!twoFactorCode || twoFactorCode.trim().length !== 6) {
      setError('Ingresa el código de 6 dígitos.');
      return;
    }

    setLoading(true);
    const result = verify2FALogin(twoFactorPending.tempUserId, twoFactorCode);
    setLoading(false);

    if (result.success) {
      setFailedAttempts(0);
      if (onLoginSuccess) onLoginSuccess(result.user);
    } else {
      setError(result.message || 'Código de seguridad incorrecto o expirado.');
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    setRecoveryError(null);
    setRecoveryMessage(null);
    setRecoveryData(null);

    if (!recoveryEmail) {
      setRecoveryError('Por favor ingresa tu correo institucional.');
      return;
    }

    const res = requestPasswordReset(recoveryEmail);
    if (res.success) {
      setRecoveryMessage(res.message);
      setRecoveryData(res);
    } else {
      setRecoveryError(res.message);
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
              <div className="h-14 px-3 py-1.5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                <img
                  src={utemLogo || config?.imagenes?.logoUtem || '/logo-utem.png'}
                  alt="Logo UTEM"
                  className="h-8 w-auto object-contain"
                />
              </div>
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

          {/* Mensajes de Error */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in">
              <AlertCircle size={18} className="shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!twoFactorPending ? (
            /* FORMULARIO DE INICIO DE SESIÓN */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRecoveryModal(true);
                      setRecoveryEmail(email);
                      setRecoveryMessage(null);
                      setRecoveryError(null);
                    }}
                    className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
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
          ) : (
            /* PASO DE AUTENTICACIÓN 2FA */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center space-y-2">
                <Smartphone className="w-8 h-8 text-teal-400 mx-auto" />
                <div className="text-sm font-bold text-white">Verificación en Dos Pasos (2FA)</div>
                <p className="text-xs text-slate-300">
                  Ingresa el código de 6 dígitos generado para la cuenta <span className="text-teal-300 font-mono">{twoFactorPending.email}</span>.
                </p>
                {twoFactorPending.demoCode && (
                  <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-teal-400 font-mono select-all">
                    Código de verificación: <span className="font-bold text-sm tracking-widest">{twoFactorPending.demoCode}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handle2FASubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    autoFocus
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full py-3 text-center text-2xl tracking-[0.5em] font-mono font-bold bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || twoFactorCode.length !== 6}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-teal-900/40 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck size={16} />
                  <span>Validar y Entrar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTwoFactorPending(null)}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  ← Cancelar e intentar con otra cuenta
                </button>
              </form>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="text-teal-500" />
              <span>Acceso seguro institucional LaTSIB & UTEM</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL RECUPERACIÓN DE CONTRASEÑA */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold">
                <KeyRound className="text-teal-400" size={20} />
                <span>Restablecer Contraseña</span>
              </div>
              <button
                type="button"
                onClick={() => setShowRecoveryModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Ingresa tu correo institucional registrado. Si tu cuenta existe en el sistema, generaremos un enlace seguro para que puedas definir una nueva contraseña.
            </p>

            {recoveryError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{recoveryError}</span>
              </div>
            )}

            {recoveryMessage ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 size={18} /> Enlace de restablecimiento generado
                  </div>
                  <p>{recoveryMessage}</p>
                </div>

                {recoveryData?.token && (
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-[11px] text-slate-400 font-semibold">Enlace directo de recuperación:</div>
                    <a
                      href={`#recuperar?token=${recoveryData.token}`}
                      onClick={() => setShowRecoveryModal(false)}
                      className="block p-2.5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-300 text-xs font-mono break-all transition-colors"
                    >
                      {window.location.origin}/#recuperar?token={recoveryData.token}
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowRecoveryModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="tu.nombre@utem.cl"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-teal-500 outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRecoveryModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-900/40 cursor-pointer"
                  >
                    Generar Enlace
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
