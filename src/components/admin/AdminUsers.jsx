import React, { useState } from 'react';
import { 
  UserPlus, Users, Shield, Mail, Copy, Check, ExternalLink, 
  Trash2, Power, RefreshCw, X, AlertCircle, Sparkles, Send, Lock
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminUsers = () => {
  const { 
    users, 
    currentUser, 
    createInvitation, 
    deleteUser, 
    toggleUserStatus 
  } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'member',
    cargo: ''
  });
  const [invitationResult, setInvitationResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenInvite = () => {
    setFormData({
      nombre: '',
      email: '',
      rol: 'member',
      cargo: 'Asistente Investigador'
    });
    setInvitationResult(null);
    setModalOpen(true);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim()) {
      alert('Completa el nombre y el correo institucional.');
      return;
    }

    const res = createInvitation(formData);
    if (res.success) {
      setInvitationResult(res);
      showToast(`Invitación generada para ${formData.nombre}`);
    } else {
      alert(res.message);
    }
  };

  const handleCopy = (text, isMessage = false) => {
    navigator.clipboard.writeText(text);
    if (isMessage) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
    showToast('Copiado al portapapeles.');
  };

  const handleDelete = (u) => {
    if (u.isPrimaryAdmin) {
      alert('No puedes eliminar la cuenta de la Administradora Principal.');
      return;
    }
    if (window.confirm(`¿Estás seguro de que deseas eliminar la cuenta de "${u.nombre}" (${u.email})?`)) {
      const res = deleteUser(u.id);
      if (res.success) {
        showToast(`Usuario ${u.nombre} eliminado.`);
      }
    }
  };

  const handleToggleStatus = (u) => {
    if (u.isPrimaryAdmin) return;
    toggleUserStatus(u.id);
    showToast(`Estado de la cuenta de ${u.nombre} actualizado.`);
  };

  const roleBadge = (rol) => {
    if (rol === 'admin') return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">Administrador</span>;
    if (rol === 'editor') return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Editor</span>;
    return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">Integrante</span>;
  };

  const statusBadge = (estado) => {
    if (estado === 'activo') return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Activo</span>;
    if (estado === 'invitacion_pendiente') return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">Invitación Pendiente</span>;
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400">Desactivado</span>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl bg-slate-900 border border-teal-500 text-white text-xs font-semibold flex items-center gap-3">
          <Check size={16} className="text-teal-400" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2.5">
            <Shield size={24} className="text-teal-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Gestión de Cuentas, Roles y Accesos</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Invita a nuevos investigadores o administradores mediante enlaces temporales de registro seguro. Cada integrante administra y gestiona su propia contraseña de forma privada y encriptada.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenInvite}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-teal-950 transition-all cursor-pointer shrink-0"
        >
          <UserPlus size={16} /> Invitar Nuevo Integrante
        </button>
      </div>

      {/* Lista de Usuarios Registrados */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Usuarios con acceso autorizado ({users.length})</span>
          <span className="text-[11px] text-teal-400 font-medium">Contraseñas encriptadas y autogestionadas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6">Integrante</th>
                <th className="py-3.5 px-6">Correo Institucional</th>
                <th className="py-3.5 px-6">Rol Asignado</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6">2FA</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u) => {
                const isSelf = currentUser?.id === u.id;

                return (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || '/logo-circle.png'}
                          alt={u.nombre}
                          className="w-9 h-9 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div>
                          <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                            {u.nombre}
                            {u.isPrimaryAdmin && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">
                                Principal
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{u.cargo || 'Integrante'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-[11px]">
                      {u.email}
                    </td>
                    <td className="py-4 px-6">
                      {roleBadge(u.rol)}
                    </td>
                    <td className="py-4 px-6">
                      {statusBadge(u.estado)}
                    </td>
                    <td className="py-4 px-6">
                      {u.has2FA ? (
                        <span className="text-teal-400 font-bold text-[11px] flex items-center gap-1">
                          <Lock size={12} /> Activo
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Opcional</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {u.estado === 'invitacion_pendiente' && u.invitationToken && (
                          <button
                            type="button"
                            onClick={() => {
                              const link = `${window.location.origin}${window.location.pathname}#invitacion?token=${u.invitationToken}`;
                              handleCopy(link);
                            }}
                            className="p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs transition-colors cursor-pointer"
                            title="Copiar enlace de invitación"
                          >
                            <Copy size={14} />
                          </button>
                        )}

                        {!u.isPrimaryAdmin && !isSelf && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(u)}
                              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                u.estado === 'activo'
                                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'
                              }`}
                              title={u.estado === 'activo' ? 'Desactivar cuenta' : 'Activar cuenta'}
                            >
                              <Power size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(u)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs transition-colors cursor-pointer"
                              title="Eliminar usuario"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA ENVIAR / GENERAR INVITACIÓN */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />

          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserPlus size={20} className="text-teal-400" />
                <h2 className="text-lg font-extrabold text-white">
                  {invitationResult ? 'Invitación Generada con Éxito' : 'Invitar Integrante a la Plataforma'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {!invitationResult ? (
              <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
                <p className="text-slate-400 leading-relaxed mb-4">
                  Ingresa el correo institucional del integrante. El sistema generará una invitación única y segura para que el usuario configure su propia contraseña personal de manera privada.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej. Dr. Jorge Vergara"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                      Correo Institucional
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="usuario@utem.cl"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                      Rol de Acceso Asignado
                    </label>
                    <select
                      value={formData.rol}
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="admin">Administrador (Control Total)</option>
                      <option value="editor">Editor (Publicaciones, Actividades, Proyectos)</option>
                      <option value="member">Integrante / Asistente (Gestión de su Perfil)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                      Cargo / Especialidad
                    </label>
                    <input
                      type="text"
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      placeholder="Ej. Investigador Adjunto / Doctorando"
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-bold shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Send size={15} /> Generar Invitación
                  </button>
                </div>
              </form>
            ) : (
              /* VISTA DE LA INVITACIÓN GENERADA */
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-start gap-3">
                  <Sparkles size={20} className="shrink-0 mt-0.5 text-teal-400" />
                  <div>
                    <div className="font-bold">Invitación creada para {invitationResult.invitation.nombre}</div>
                    <div className="text-[11px] text-teal-200 mt-0.5">
                      El enlace es único y tiene una vigencia de 48 horas. Puedes copiar el texto oficial del correo o el enlace directo.
                    </div>
                  </div>
                </div>

                {/* Previsualización del mensaje exacto requerido */}
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">
                    Cuerpo del Mensaje Automatizado
                  </label>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {invitationResult.messageText}
                  </pre>
                </div>

                {/* Acciones para Compartir */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(invitationResult.messageText, true)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-700"
                  >
                    {copiedMessage ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                    <span>{copiedMessage ? '¡Mensaje Copiado!' : 'Copiar Mensaje'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(invitationResult.link, false)}
                    className="py-2.5 px-3 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-teal-500/30"
                  >
                    {copiedLink ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                    <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
                  </button>

                  <a
                    href={invitationResult.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Probar Enlace</span>
                  </a>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      setInvitationResult(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
