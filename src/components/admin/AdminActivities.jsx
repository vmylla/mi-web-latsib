import React, { useState } from 'react';
import { 
  Calendar, Plus, Search, Edit3, Trash2, MapPin, 
  Globe, Image, X, Check, Users, Sparkles, AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminActivities = ({ initialOpenModal = false }) => {
  const { 
    actividades, 
    equipo, 
    currentUser, 
    addActivity, 
    updateActivity, 
    deleteActivity 
  } = useData();

  const [search, setSearch] = useState('');
  const [filterTipo, setFilterTipo] = useState('todas');
  const [modalOpen, setModalOpen] = useState(initialOpenModal);
  const [editingAct, setEditingAct] = useState(null);

  const defaultFormData = {
    titulo: '',
    fecha: 'Octubre 2025',
    lugar: 'Universidad Tecnológica Metropolitana, Santiago, Chile',
    tipo: 'Nacional',
    descripcion: '',
    participantesText: '',
    galeria: [
      { url: '', descripcion: '' }
    ]
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [feedback, setFeedback] = useState(null);

  const isAdmin = currentUser?.rol === 'admin';
  const isEditor = currentUser?.rol === 'editor' || isAdmin;

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingAct(null);
    setFormData(defaultFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (act) => {
    setEditingAct(act);
    const partString = Array.isArray(act.participantes) ? act.participantes.join(', ') : (act.participantes || '');
    setFormData({
      titulo: act.titulo || '',
      fecha: act.fecha || '',
      lugar: act.lugar || '',
      tipo: act.tipo || 'Nacional',
      descripcion: act.descripcion || '',
      participantesText: partString,
      galeria: act.galeria && act.galeria.length > 0 
        ? act.galeria.map(g => ({ url: g.url || '', descripcion: g.descripcion || '' }))
        : [{ url: '', descripcion: '' }]
    });
    setModalOpen(true);
  };

  const handleAddGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      galeria: [...prev.galeria, { url: '', descripcion: '' }]
    }));
  };

  const handleRemoveGalleryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      galeria: prev.galeria.filter((_, i) => i !== index)
    }));
  };

  const handleGalleryChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.galeria];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, galeria: updated };
    });
  };

  const handleAddParticipantTag = (member) => {
    const name = member.nombre;
    setFormData(prev => {
      const current = prev.participantesText.trim();
      if (!current) return { ...prev, participantesText: name };
      if (current.includes(name)) return prev;
      return { ...prev, participantesText: `${current}, ${name}` };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert('El título es obligatorio.');
      return;
    }

    const participantsArray = formData.participantesText
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    const validGaleria = formData.galeria.filter(g => g.url && g.url.trim() !== '');

    const payload = {
      titulo: formData.titulo.trim(),
      fecha: formData.fecha.trim(),
      lugar: formData.lugar.trim(),
      tipo: formData.tipo,
      descripcion: formData.descripcion.trim(),
      participantes: participantsArray,
      galeria: validGaleria
    };

    if (editingAct) {
      updateActivity(editingAct.id, payload);
      showFeedback(`Actividad "${formData.titulo}" actualizada.`);
    } else {
      addActivity(payload);
      showFeedback(`Actividad "${formData.titulo}" creada con éxito.`);
    }

    setModalOpen(false);
    setEditingAct(null);
  };

  const handleDelete = (act) => {
    if (!isAdmin) {
      alert('Solo los Administradores pueden eliminar actividades registradas.');
      return;
    }
    if (window.confirm(`¿Deseas eliminar la actividad "${act.titulo}"?`)) {
      deleteActivity(act.id);
      showFeedback(`Actividad eliminada.`);
    }
  };

  const filteredActs = actividades.filter((a) => {
    const term = search.toLowerCase();
    const matchesSearch = (a.titulo || '').toLowerCase().includes(term) ||
                          (a.lugar || '').toLowerCase().includes(term) ||
                          (a.descripcion || '').toLowerCase().includes(term);
    const matchesTipo = filterTipo === 'todas' ? true : a.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Feedback Toast */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl bg-slate-900 border border-teal-500 text-white text-xs font-semibold flex items-center gap-3">
          <Check size={16} className="text-teal-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2.5">
            <Calendar size={24} className="text-indigo-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Gestión de Novedades y Actividades</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Administra congresos nacionales e internacionales, seminarios, pasantías y talleres con sus galerías de imágenes.
          </p>
        </div>

        {isEditor && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-indigo-950 transition-all cursor-pointer shrink-0"
          >
            <Plus size={16} /> Registrar Nueva Actividad
          </button>
        )}
      </div>

      {/* Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar actividades por título, lugar, descripción..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {['todas', 'Nacional', 'Internacional'].map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setFilterTipo(tipo)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterTipo === tipo
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tipo === 'todas' ? `Todas (${actividades.length})` : `${tipo} (${actividades.filter(a => a.tipo === tipo).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Listado de Actividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredActs.map((act) => (
          <div
            key={act.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  act.tipo === 'Internacional'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {act.tipo}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                  <Calendar size={13} className="text-indigo-400" /> {act.fecha}
                </span>
              </div>

              <h3 className="font-bold text-white text-base mb-2 leading-snug">
                {act.titulo}
              </h3>

              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
                <MapPin size={13} className="text-teal-400 shrink-0" />
                <span className="truncate">{act.lugar}</span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                {act.descripcion}
              </p>

              {/* Previews de Galería */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <Image size={13} className="text-blue-400" /> {(act.galeria || []).length} fotos en galería
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                {Array.isArray(act.participantes) && act.participantes.length > 0
                  ? `${act.participantes.length} participantes`
                  : 'Sin participantes listados'}
              </div>

              <div className="flex items-center gap-2">
                {isEditor && (
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(act)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={13} /> Editar
                  </button>
                )}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDelete(act)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs transition-all cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Formulario Actividad */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h2 className="text-lg font-extrabold text-white">
                {editingAct ? 'Editar Actividad' : 'Registrar Nueva Actividad / Congreso'}
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
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Título de la Actividad</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej. IV Congreso “Vive la Investigación” UTEM 2025"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Fecha / Período</label>
                  <input
                    type="text"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    placeholder="Ej. Octubre 2025"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Tipo de Alcance</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Nacional">Nacional</option>
                    <option value="Internacional">Internacional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Lugar / Sede</label>
                  <input
                    type="text"
                    value={formData.lugar}
                    onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                    placeholder="Ej. Santiago, Chile"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Descripción de la Actividad</label>
                <textarea
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Detalla el objetivo del viaje, ponencias realizadas, impacto y colaboraciones logradas..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider">Integrantes Participantes</label>
                  <span className="text-[11px] text-slate-400">Haz clic para añadir nombres</span>
                </div>
                <input
                  type="text"
                  value={formData.participantesText}
                  onChange={(e) => setFormData({ ...formData, participantesText: e.target.value })}
                  placeholder="Separados por coma: Dr. Raúl Caulier, Andrés Vega, Vicente Escudero..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex flex-wrap gap-1.5 mt-2 max-h-20 overflow-y-auto p-1 bg-slate-950/60 rounded-xl border border-slate-800">
                  {equipo.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleAddParticipantTag(m)}
                      className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      + {m.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECCIÓN DE GALERÍA DE IMÁGENES */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider">
                    Galería de Fotos y Evidencias ({formData.galeria.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} /> Añadir Foto
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto p-2 bg-slate-950/70 rounded-2xl border border-slate-800">
                  {formData.galeria.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-400">Foto #{idx + 1}</span>
                        {formData.galeria.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryItem(idx)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => handleGalleryChange(idx, 'url', e.target.value)}
                          placeholder="URL o ruta: /actividades/... o https://..."
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs"
                        />
                        <input
                          type="text"
                          value={item.descripcion}
                          onChange={(e) => handleGalleryChange(idx, 'descripcion', e.target.value)}
                          placeholder="Pie de foto descriptivo..."
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs"
                        />
                      </div>
                    </div>
                  ))}
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-bold shadow-md cursor-pointer"
                >
                  {editingAct ? 'Guardar Cambios' : 'Guardar Actividad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
