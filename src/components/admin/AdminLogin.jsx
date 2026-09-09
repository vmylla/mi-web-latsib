import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ShieldCheck, ShieldAlert, RefreshCw 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import utemLogo from '../../assets/logo-utem.png';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { loginWithGoogle, config } = useData();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const googleBtnContainerRef = useRef(null);

  // Inicializar Google Identity Services (GIS) si está configurado el Client ID
  useEffect(() => {
    const clientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();

    if (clientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            if (response.credential) {
              try {
                // Decodificar el JWT de Google
                const base64Url = response.credential.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                  atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
                );
                const googleProfile = JSON.parse(jsonPayload);
                await handleProcessGoogleUser(googleProfile);
              } catch (e) {
                setError('Error al decodificar la respuesta de Google OAuth.');
              }
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      } catch (err) {
        console.warn('Google Identity Services init notice:', err);
      }
    }
  }, []);

  const handleProcessGoogleUser = async (googleProfile) => {
    setError('');
    setLoading(true);

    try {
      const result = await loginWithGoogle(googleProfile);
      setLoading(false);

      if (result.success) {
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        setError(result.message || 'Acceso denegado: Tu cuenta no figura en la lista autorizada del equipo LaTSIB.');
      }
    } catch (err) {
      setLoading(false);
      setError('Error al procesar la autenticación con Google.');
    }
  };

  const handleGoogleSignInClick = () => {
    setError('');
    const clientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();

    if (!clientId) {
      setError('Configuración requerida: Debes definir tu VITE_GOOGLE_CLIENT_ID en el archivo .env (creado en Google Cloud Console con orígenes autorizados como http://localhost:5173).');
      return;
    }

    setLoading(true);

    // Si Google OAuth2 Token Client está disponible y configurado
    if (window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid email profile',
          hosted_domain: 'utem.cl',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              setLoading(false);
              if (tokenResponse.error === 'invalid_client' || tokenResponse.error_description?.includes('invalid_client')) {
                setError('Error 401 (invalid_client): El VITE_GOOGLE_CLIENT_ID configurado no existe o no coincide con los orígenes autorizados en Google Cloud Console.');
              } else {
                setError(`Error de autenticación Google: ${tokenResponse.error_description || tokenResponse.error}`);
              }
              return;
            }

            if (tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const userInfo = await res.json();
                await handleProcessGoogleUser(userInfo);
              } catch (e) {
                setLoading(false);
                setError('Error al obtener los datos de la cuenta desde Google.');
              }
            }
          }
        });
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        console.warn('Google Token Client init fallback:', err);
      }
    }

    // Si Google One Tap / Prompt está listo
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setLoading(false);
          triggerOAuthPopupFallback();
        }
      });
      return;
    }

    triggerOAuthPopupFallback();
  };

  // Ventana emergente nativa de Google OAuth
  const triggerOAuthPopupFallback = () => {
    const clientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();
    
    if (clientId) {
      const redirectUri = window.location.origin;
      const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token%20id_token&scope=openid%20email%20profile&hd=utem.cl&prompt=select_account`;
      window.open(oauthUrl, 'google_oauth_popup', 'width=500,height=600');
      setLoading(false);
    } else {
      setLoading(false);
      setError('Configuración requerida: Agrega tu VITE_GOOGLE_CLIENT_ID en el archivo .env para habilitar Google OAuth.');
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

            {/* Contenedor del botón nativo de Google GIS si se renderiza */}
            <div ref={googleBtnContainerRef} className="hidden" />

            {/* Único Botón Oficial de Google */}
            <button
              type="button"
              onClick={handleGoogleSignInClick}
              disabled={loading}
              className="w-full py-4 px-5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer border border-slate-200 disabled:opacity-50 text-sm"
            >
              {loading ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <RefreshCw size={18} className="animate-spin text-blue-600" />
                  <span>Conectando con Google...</span>
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
    </div>
  );
};
