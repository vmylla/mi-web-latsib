import React, { useState } from 'react';
import { 
  X, User, Lock, ShieldCheck, KeyRound, CheckCircle2, 
  AlertCircle, Smartphone, Check, Eye, EyeOff, Sparkles 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, changePassword, toggle2FA } = useData();
  const [activeTab, setActiveTab] = useState('perfil'); // 'perfil' | 'seguridad' | '2fa'

  // Perfil form
  const [nombre, setNombre] = useState(currentUser?.nombre || '');
  const [cargo, setCargo] = useState(currentUser?.cargo || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  // Password form
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Status and messages
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen || !currentUser) return null;

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const res = updateUserProfile(currentUser.id, { nombre, cargo, avatar });
    if (res.success) {
      setMessage('Datos de perfil actualizados exitosamente');
      setTimeout(() => setMessage(null), 3500);
    } else {
      setError(res.error || 'Error al actualizar perfil');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!currentPass || !newPass || !confirmPass) {
      setError('Por favor complete todos los campos de contraseña');
      return;
    }

    if (newPass !== confirmPass) {
      setError('La nueva contraseña y su confirmación no coinciden');
      return;
    }

    if (newPass.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    const res = await changePassword(currentUser.id, currentPass, newPass);
    if (res.success) {
      setMessage('¡Contraseña actualizada con éxito!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setMessage(null), 4000);
    } else {
      setError(res.error || 'Contraseña actual incorrecta');
    }
  };

  const handleToggle2FA = () => {
    const newState = !currentUser.twoFactorEnabled;
    toggle2FA(currentUser.id, newState);
    setMessage(newState ? '2FA activado con éxito para tu cuenta' : '2FA desactivado');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Mi Cuenta y Seguridad</h3>
              <p className="text-xs text-slate-400">Gestiona tu identidad, credenciales y autenticación</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Pestañas */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => { setActiveTab('perfil'); setError(null); setMessage(null); }}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'perfil'
                ? 'text-teal-400 border-teal-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Datos Personales
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('seguridad'); setError(null); setMessage(null); }}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'seguridad'
                ? 'text-teal-400 border-teal-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Cambiar Contraseña
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('2fa'); setError(null); setMessage(null); }}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === '2fa'
                ? 'text-teal-400 border-teal-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Seguridad 2FA
            {currentUser.twoFactorEnabled && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20"></span>
            )}
          </button>
        </div>

        {/* Notificaciones */}
        <div className="px-6 pt-4">
          {message && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{message}</span>
            </div>
          )}
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Contenido según pestaña */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {activeTab === 'perfil' && (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                  {avatar ? (
                    <img src={avatar} alt={nombre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xl">
                      {nombre ? nombre.charAt(0) : 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{currentUser.nombre}</div>
                  <div className="text-xs text-teal-400 font-mono">{currentUser.email}</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                    Rol: {currentUser.rol} {currentUser.isPrimaryAdmin && '• Administrador Principal'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cargo / Función en LaTSIB</label>
                <input
                  type="text"
                  placeholder="Ej. Desarrolladora Web, Asistente de Investigación..."
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Foto de Perfil (URL de imagen)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-900/40 transition-all cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}

          {activeTab === 'seguridad' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-blue-300 text-xs leading-relaxed">
                Para tu seguridad, ingresa tu contraseña actual para autorizar la creación de una nueva clave.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contraseña Actual</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Tu clave actual"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nueva Contraseña</label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-teal-500 outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Lock size={14} />
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          )}

          {activeTab === '2fa' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <Smartphone className="text-teal-400 shrink-0 mt-0.5" size={22} />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">Autenticación en Dos Pasos (2FA)</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Protege tu cuenta de administrador exigiendo un código temporal de 6 dígitos cada vez que inicies sesión.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Estado de 2FA</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {currentUser.twoFactorEnabled ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Activo y protegiendo tu sesión
                      </span>
                    ) : (
                      <span className="text-slate-500">Desactivado (Recomendado activar para administradores)</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggle2FA}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentUser.twoFactorEnabled
                      ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                  }`}
                >
                  {currentUser.twoFactorEnabled ? 'Desactivar 2FA' : 'Activar 2FA'}
                </button>
              </div>

              {currentUser.twoFactorEnabled && (
                <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-teal-400 font-bold">
                    <Sparkles size={16} /> Clave Secreta de Respaldo
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Al iniciar sesión con 2FA activo, el sistema te solicitará un código de 6 dígitos para validar tu identidad.
                  </p>
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 select-all">
                    LATSIB-{currentUser.id.toUpperCase()}-AUTH2FA
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
