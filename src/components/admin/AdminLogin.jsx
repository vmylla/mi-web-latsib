import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShieldCheck, ShieldAlert, Lock, CheckCircle2, RefreshCw
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import utemLogo from '../../assets/logo-utem.png';

// ID de cliente Google OAuth configurable vía variable de entorno o fallback institucional
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1047123984128-utem-latsib.apps.googleusercontent.com';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { loginWithGoogle, config } = useData();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gisReady, setGisReady] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  // Inicializar Google Identity Services (GIS)
  useEffect(() => {
    const initGIS = () => {
      // 1. Inicializar Google Identity Services ID Token (One-Tap / ID Token)
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            auto_select: false,
            callback: async (response) => {
              setLoading(true);
              try {
                const base64Url = response.credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const googleProfile = JSON.parse(jsonPayload);
                
                const result = await loginWithGoogle({
                  email: googleProfile.email,
                  name: googleProfile.name,
                  picture: googleProfile.picture,
                  hd: googleProfile.hd
                });

                setLoading(false);
                if (result.success) {
                  if (onLoginSuccess) onLoginSuccess(result.user);
                } else {
                  setError(result.message || 'La cuenta verificada no tiene permisos de acceso al panel.');
                }
              } catch (e) {
                setLoading(false);
                setError('Error al decodificar credencial de Google.');
              }
            }
          });
        } catch (err) {
          console.warn('GIS ID Init:', err);
        }
      }

      // 2. Inicializar Google OAuth2 Token Client (Popup flow)
      if (window.google?.accounts?.oauth2) {
        try {
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'openid email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            callback: async (tokenResponse) => {
              if (tokenResponse.error) {
                setLoading(false);
                setError('Autenticación cancelada o denegada en la ventana de Google.');
                return;
              }

              try {
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });

                if (!userInfoRes.ok) {
                  throw new Error('No se pudo verificar el perfil con los servidores de Google.');
                }

                const googleProfile = await userInfoRes.json();
                
                const result = await loginWithGoogle({
                  email: googleProfile.email,
                  name: googleProfile.name,
                  picture: googleProfile.picture,
                  hd: googleProfile.hd
                });

                setLoading(false);

                if (result.success) {
                  if (onLoginSuccess) onLoginSuccess(result.user);
                } else {
                  setError(result.message || 'La cuenta verificada no tiene permisos de acceso al panel.');
                }
              } catch (fetchErr) {
                setLoading(false);
                setError('Error al obtener la verificación de Google: ' + (fetchErr.message || 'Error de conexión'));
              }
            }
          });

          setTokenClient(client);
          setGisReady(true);
        } catch (e) {
          console.warn('No se pudo inicializar cliente Google GIS:', e);
        }
      }
    };

    if (window.google?.accounts?.oauth2 || window.google?.accounts?.id) {
      initGIS();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.oauth2 || window.google?.accounts?.id) {
          initGIS();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loginWithGoogle, onLoginSuccess]);

  // Manejar el clic en Iniciar Sesión con Google
  const handleGoogleClick = () => {
    setError('');
    setLoading(true);

    if (tokenClient) {
      // Solicitar autenticación real con Google Popup (Google verifica contraseña y sesión activa)
      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } else {
      // Si el cliente GIS aún no carga en el navegador o está en entorno restringido
      setError('Cargando servicios de seguridad de Google. Por favor intenta nuevamente en unos segundos.');
      setLoading(false);
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
              <Lock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium mb-0.5">Acceso Protegido por Google SSO</strong>
                El acceso requiere verificar tu sesión activa de Google con tu correo institucional (@utem.cl). Solo los integrantes autorizados en el equipo del laboratorio podrán ingresar.
              </div>
            </div>

            {/* Botón Oficial: Continuar con Google */}
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={loading}
              className="w-full py-4 px-5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer border border-slate-200 disabled:opacity-50 text-sm"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <RefreshCw size={18} className="animate-spin text-blue-600" />
                  <span>Verificando credenciales con Google...</span>
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
                  <span>Iniciar Sesión con Google</span>
                </>
              )}
            </button>

          </div>

          {/* Footer de Seguridad y Encriptación */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-teal-400" />
              <span>Autenticación Criptográfica Oficial • Google Identity Services</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
