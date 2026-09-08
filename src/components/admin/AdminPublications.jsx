import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Edit3, Trash2, ExternalLink, 
  Instagram, X, Check, BookOpen, Calendar, Users
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminPublications = ({ initialOpenModal = false }) => {
  const { 
    publicaciones, 
    equipo, 
    currentUser, 
    addPublication, 
    updatePublication, 
    deletePublication 
  } = useData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(initialOpenModal);
  const [editingPub, setEditingPub] = useState(null);

  const defaultFormData = {
    titulo: '',
    revista: '',
    year: new Date().getFullYear().toString(),
    autor: '',
    link: '',
    instagram: '',
    pdf: ''
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
    setEditingPub(null);
    setFormData(defaultFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (pub) => {
    setEditingPub(pub);
    setFormData({
      titulo: pub.titulo || '',
      revista: pub.revista || '',
      year: pub.year ? String(pub.year) : new Date().getFullYear().toString(),
      autor: pub.autor || pub.autores || '',
      link: pub.link || '',
      instagram: pub.instagram || '',
      pdf: pub.pdf || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert('El título es obligatorio.');
      return;
    }

    const payload = {
      titulo: formData.titulo.trim(),
      revista: formData.revista.trim(),
      year: formData.year.trim(),
      autor: formData.autor.trim(),
      link: formData.link.trim(),
      instagram: formData.instagram.trim(),
      pdf: formData.pdf.trim()
    };

    if (editingPub) {
      updatePublication(editingPub.id || editingPub.titulo, payload);
      showFeedback(`Publicación "${formData.titulo}" actualizada.`);
    } else {
      addPublication(payload);
      showFeedback(`Publicación "${formData.titulo}" añadida con éxito.`);
    }

    setModalOpen(false);
    setEditingPub(null);
  };

  const handleDelete = (pub) => {
    if (!isAdmin) {
      alert('Solo los Administradores pueden eliminar artículos del repositorio.');
      return;
    }
    if (window.confirm(`¿Deseas eliminar la publicación "${pub.titulo}"?`)) {
      deletePublication(pub.id || pub.titulo);
      showFeedback(`Publicación eliminada.`);
    }
  };

  const handleAddAuthorTag = (authorName) => {
    setFormData(prev => {
      const current = prev.autor.trim();
      if (!current) return { ...prev, autor: authorName };
      if (current.includes(authorName)) return prev;
      return { ...prev, autor: `${current}, ${authorName}` };
    });
  };

  const filteredPubs = publicaciones.filter((p) => {
    const term = search.toLowerCase();
    return (
      (p.titulo || '').toLowerCase().includes(term) ||
      (p.revista || '').toLowerCase().includes(term) ||
      (p.autor || p.autores || '').toLowerCase().includes(term) ||
      (p.year || '').toString().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast */}
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
            <FileText size={24} className="text-teal-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Gestión de Publicaciones y Papers</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Administra los artículos científicos, congresos y enlaces a infografías de Instagram.
          </p>
        </div>

        {isEditor && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-teal-950 transition-all cursor-pointer shrink-0"
          >
            <Plus size={16} /> Cargar Nueva Publicación
          </button>
        )}
      </div>

      {/* Barra de Búsqueda */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar publicaciones por título, revista, autor o año..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Listado de Publicaciones */}
      <div className="space-y-4">
        {filteredPubs.map((pub, idx) => (
          <div
            key={pub.id || idx}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-grow min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {pub.year}
                </span>
                <span className="text-slate-400 text-xs uppercase font-semibold tracking-wider truncate">
                  {pub.revista}
                </span>
              </div>
              <h3 className="font-bold text-white text-base leading-snug">
                {pub.titulo}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {pub.autor || pub.autores}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20"
                  >
                    <ExternalLink size={12} /> Enlace al Artículo
                  </a>
                )}
                {pub.instagram && (
                  <a
                    href={pub.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-400 hover:text-pink-300 bg-pink-500/10 px-2.5 py-1 rounded-lg border border-pink-500/20"
                  >
                    <Instagram size={12} /> Infografía Instagram
                  </a>
                )}
                {pub.pdf && (
                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20"
                  >
                    <FileText size={12} /> PDF Adjunto
                  </a>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {isEditor && (
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pub)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 size={14} /> Editar
                </button>
              )}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => handleDelete(pub)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs transition-all cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Formulario Publicación */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h2 className="text-lg font-extrabold text-white">
                {editingPub ? 'Editar Publicación' : 'Cargar Nuevo Paper / Artículo'}
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
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Título de la Investigación</label>
                <textarea
                  rows={2}
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej. The Effectiveness of NIRS-Based Wearable Devices..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-snug"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Journal / Congreso / Conferencia</label>
                  <input
                    type="text"
                    value={formData.revista}
                    onChange={(e) => setFormData({ ...formData, revista: e.target.value })}
                    placeholder="Ej. Medical Sciences / CASEIB 2025"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Año de Publicación</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider">Autores</label>
                  <span className="text-[11px] text-slate-400">Haz clic en un integrante para agregarlo rápidamente</span>
                </div>
                <textarea
                  rows={2}
                  value={formData.autor}
                  onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                  placeholder="Ej. Raúl Caulier-Cisterna, Andrés Vega-Moraga..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-snug"
                  required
                />
                <div className="flex flex-wrap gap-1.5 mt-2 max-h-24 overflow-y-auto p-1 bg-slate-950/60 rounded-xl border border-slate-800">
                  {equipo.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleAddAuthorTag(m.nombre)}
                      className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      + {m.nombre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Enlace Directo / DOI / Paper</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://sciencedirect.com/..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Infografía de Instagram (URL)</label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://www.instagram.com/p/..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Archivo PDF (URL de descarga directa)</label>
                <input
                  type="text"
                  value={formData.pdf}
                  onChange={(e) => setFormData({ ...formData, pdf: e.target.value })}
                  placeholder="https://drive.google.com/... o enlace de descarga"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold shadow-md cursor-pointer"
                >
                  {editingPub ? 'Guardar Cambios' : 'Guardar Publicación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
