import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Edit3, Eye, EyeOff, UserCheck, 
  Trash2, X, Check, AlertCircle, Sparkles, ExternalLink, Mail, Linkedin, Github
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminTeam = ({ initialOpenModal = false }) => {
  const { 
    equipo, 
    categoriasEquipo, 
    currentUser, 
    addMember, 
    updateMember, 
    toggleMemberVisibility, 
    setMemberExintegrante, 
    deleteMember 
  } = useData();

  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('todas');
  const [modalOpen, setModalOpen] = useState(initialOpenModal);
  const [editingMember, setEditingMember] = useState(null);

  // Form State
  const defaultFormData = {
    nombre: '',
    apellido: '',
    rol: 'Asistente Investigador',
    categoria: 'asistentes',
    bio: '',
    actividadesLab: '',
    img: '/logo-circle.png',
    esTesista: false,
    activo: true,
    orden: 1,
    email: '',
    linkedin: '',
    github: '',
    orcid: '',
    scholar: ''
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [feedback, setFeedback] = useState(null);

  const isAdmin = currentUser?.rol === 'admin';
  const isEditor = currentUser?.rol === 'editor' || isAdmin;

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      ...defaultFormData,
      orden: equipo.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (miembro) => {
    // Si no es admin y no es su propio perfil
    if (!isAdmin && currentUser?.email && miembro.contactos?.email !== currentUser.email) {
      alert('Solo puedes editar tu propio perfil o necesitas permisos de Administrador.');
      return;
    }

    setEditingMember(miembro);
    // Parse nombre y apellido si vienen juntos
    const parts = (miembro.nombre || '').split(' ');
    const nombreFirst = parts[0] || '';
    const apellidoRest = parts.slice(1).join(' ') || '';

    setFormData({
      nombre: nombreFirst,
      apellido: apellidoRest,
      rol: miembro.rol || '',
      categoria: miembro.categoria || 'asistentes',
      bio: miembro.bio || '',
      actividadesLab: miembro.actividadesLab || '',
      img: miembro.img || '/logo-circle.png',
      esTesista: Boolean(miembro.esTesista),
      activo: miembro.activo !== false,
      orden: miembro.orden || 1,
      email: miembro.contactos?.email || '',
      linkedin: miembro.contactos?.linkedin || '',
      github: miembro.contactos?.github || '',
      orcid: miembro.contactos?.orcid || '',
      scholar: miembro.contactos?.scholar || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio.');
      return;
    }

    const fullName = `${formData.nombre.trim()} ${formData.apellido.trim()}`.trim();

    const payload = {
      nombre: fullName,
      rol: formData.rol.trim(),
      categoria: formData.categoria,
      bio: formData.bio.trim(),
      actividadesLab: formData.actividadesLab.trim(),
      img: formData.img.trim() || '/logo-circle.png',
      esTesista: formData.esTesista,
      activo: formData.activo,
      orden: Number(formData.orden) || 1,
      contactos: {
        email: formData.email.trim(),
        linkedin: formData.linkedin.trim(),
        github: formData.github.trim(),
        orcid: formData.orcid.trim(),
        scholar: formData.scholar.trim()
      }
    };

    if (editingMember) {
      updateMember(editingMember.id, payload);
      showFeedback(`Integrante "${fullName}" actualizado con éxito.`);
    } else {
      addMember(payload);
      showFeedback(`Integrante "${fullName}" agregado al laboratorio.`);
    }

    setModalOpen(false);
    setEditingMember(null);
  };

  const handleDelete = (miembro) => {
    if (!isAdmin) {
      alert('Solo los Administradores pueden eliminar integrantes.');
      return;
    }
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente a "${miembro.nombre}"? Puedes en su lugar moverlo a "Exintegrante" para preservar el historial.`)) {
      deleteMember(miembro.id);
      showFeedback(`Integrante "${miembro.nombre}" eliminado.`, 'info');
    }
  };

  const handleExintegrante = (miembro) => {
    if (window.confirm(`¿Mover a "${miembro.nombre}" a la categoría de Exintegrantes? Se conservará su registro histórico en el laboratorio.`)) {
      setMemberExintegrante(miembro.id);
      showFeedback(`"${miembro.nombre}" fue trasladado a Exintegrantes.`);
    }
  };

  // Filtrado de integrantes
  const filteredMembers = equipo.filter((m) => {
    const matchesSearch = (m.nombre || '').toLowerCase().includes(search.toLowerCase()) ||
                          (m.rol || '').toLowerCase().includes(search.toLowerCase()) ||
                          (m.bio || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'todas' ? true : m.categoria === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Feedback Toast */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl bg-slate-900 border border-teal-500 text-white text-xs font-semibold flex items-center gap-3">
          <Check size={16} className="text-teal-400" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2.5">
            <Users size={24} className="text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Gestión de Integrantes del Laboratorio</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Administra investigadores, tesistas, colaboradores y exintegrantes. Los cambios se sincronizan en vivo con la web pública.
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-blue-950 transition-all cursor-pointer shrink-0"
          >
            <Plus size={16} /> Agregar Nuevo Integrante
          </button>
        )}
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, cargo o tema de investigación..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilterCat('todas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterCat === 'todas'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todos ({equipo.length})
          </button>
          {categoriasEquipo.map((cat) => {
            const count = equipo.filter(m => m.categoria === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCat(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterCat === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.titulo} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Listado de Integrantes (Tarjetas Administrativas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((miembro) => {
          const isCurrentUserProfile = currentUser?.email && miembro.contactos?.email === currentUser.email;
          const canEdit = isAdmin || isCurrentUserProfile;

          return (
            <div
              key={miembro.id}
              className={`bg-slate-900/90 border rounded-3xl p-5 flex flex-col justify-between transition-all hover:shadow-lg ${
                miembro.activo === false 
                  ? 'border-slate-800 opacity-60' 
                  : miembro.categoria === 'exintegrantes'
                    ? 'border-amber-500/30'
                    : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                    <img
                      src={miembro.img || '/logo-circle.png'}
                      alt={miembro.nombre}
                      className="w-full h-full object-cover"
                    />
                    {miembro.esTesista && (
                      <span className="absolute bottom-0 inset-x-0 bg-teal-600/90 text-[9px] font-bold text-white text-center py-0.5">
                        Tesista
                      </span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        miembro.categoria === 'academicos' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : miembro.categoria === 'exintegrantes'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-teal-500/20 text-teal-300'
                      }`}>
                        {categoriasEquipo.find(c => c.id === miembro.categoria)?.titulo || miembro.categoria}
                      </span>
                      {miembro.activo === false && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300">
                          Oculto
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-sm truncate">{miembro.nombre}</h3>
                    <p className="text-teal-400 text-xs truncate">{miembro.rol}</p>
                    <p className="text-slate-400 text-[11px] truncate mt-0.5">{miembro.bio}</p>
                  </div>
                </div>

                {miembro.actividadesLab && (
                  <p className="text-slate-300 text-xs bg-slate-950/60 p-3 rounded-2xl line-clamp-3 mb-4 leading-relaxed">
                    {miembro.actividadesLab}
                  </p>
                )}

                {/* Enlaces de Contacto */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-4">
                  {miembro.contactos?.email && (
                    <span className="inline-flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                      <Mail size={12} className="text-teal-400" /> {miembro.contactos.email}
                    </span>
                  )}
                  {miembro.contactos?.linkedin && (
                    <span className="inline-flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                      <Linkedin size={12} className="text-blue-400" /> LinkedIn
                    </span>
                  )}
                  {miembro.contactos?.github && (
                    <span className="inline-flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                      <Github size={12} className="text-slate-300" /> GitHub
                    </span>
                  )}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(miembro)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 size={13} /> Editar
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => toggleMemberVisibility(miembro.id)}
                      title={miembro.activo ? 'Ocultar de la web' : 'Mostrar en la web'}
                      className={`p-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        miembro.activo 
                          ? 'bg-slate-950 text-slate-400 hover:text-white border-slate-800' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {miembro.activo ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  )}
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-1.5">
                    {miembro.categoria !== 'exintegrantes' && (
                      <button
                        type="button"
                        onClick={() => handleExintegrante(miembro)}
                        title="Cambiar a Exintegrante (conservar historial)"
                        className="p-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs transition-all cursor-pointer flex items-center gap-1"
                      >
                        <UserCheck size={14} />
                        <span className="hidden sm:inline text-[11px]">Exintegrante</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(miembro)}
                      title="Eliminar integrante"
                      className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: FORMULARIO AGREGAR / EDITAR INTEGRANTE */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h2 className="text-lg font-extrabold text-white">
                {editingMember ? `Editar: ${editingMember.nombre}` : 'Agregar Nuevo Integrante al Laboratorio'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Matías"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Apellido(s)</label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    placeholder="Ej. Gajardo De La Fuente"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Cargo / Rol en LaTSIB</label>
                  <input
                    type="text"
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    placeholder="Ej. Asistente Investigador"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categoriasEquipo.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.titulo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Formación Académica (Bio Corta)</label>
                <input
                  type="text"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Ej. Estudiante de Ingeniería Civil en Ciencia de Datos"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Descripción Detallada (Labor y Proyectos en el Laboratorio)
                </label>
                <textarea
                  rows={4}
                  value={formData.actividadesLab}
                  onChange={(e) => setFormData({ ...formData, actividadesLab: e.target.value })}
                  placeholder="Describe las investigaciones, modelos, procesamiento de señales o tareas que desarrolla en LaTSIB..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Foto de Perfil (URL o Ruta)</label>
                  <input
                    type="text"
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    placeholder="/equipo/nombrePERFIL.jpg o https://..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Correo Institucional</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="usuario@utem.cl"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">GitHub</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">ORCID / Scholar</label>
                  <input
                    type="text"
                    value={formData.orcid}
                    onChange={(e) => setFormData({ ...formData, orcid: e.target.value })}
                    placeholder="https://orcid.org/..."
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs"
                  />
                </div>
              </div>

              {/* Casillas de Verificación Especiales */}
              <div className="flex flex-wrap items-center gap-6 pt-2 pb-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.esTesista}
                    onChange={(e) => setFormData({ ...formData, esTesista: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-700 bg-slate-950"
                  />
                  <span className="text-slate-300 font-semibold">Lleva insignia de "Tesista"</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-700 bg-slate-950"
                  />
                  <span className="text-slate-300 font-semibold">Visible en la web pública</span>
                </label>
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold shadow-md cursor-pointer"
                >
                  {editingMember ? 'Guardar Cambios' : 'Guardar Integrante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
