import React, { useState } from 'react';
import { 
  Cpu, Plus, Search, Edit3, Trash2, Atom, 
  FileText, Image, X, Check, Users, ExternalLink, Bookmark
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminProjects = ({ initialOpenModal = false }) => {
  const { 
    proyectos, 
    equipo, 
    currentUser, 
    addProject, 
    updateProject, 
    deleteProject 
  } = useData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(initialOpenModal);
  const [editingProj, setEditingProj] = useState(null);

  const defaultFormData = {
    titulo: '',
    badge: '',
    linea: 'Neuroingeniería y Señales',
    desc: '',
    integrantesText: '',
    imagenes: [{ url: '', desc: '' }],
    documentos: [{ titulo: '', tipo: 'PDF', link: '' }]
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
    setEditingProj(null);
    setFormData(defaultFormData);
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProj(proj);
    const intString = Array.isArray(proj.integrantes) ? proj.integrantes.join(', ') : (proj.integrantes || '');
    setFormData({
      titulo: proj.titulo || '',
      badge: proj.badge || '',
      linea: proj.linea || 'Neuroingeniería y Señales',
      desc: proj.desc || '',
      integrantesText: intString,
      imagenes: proj.imagenes && proj.imagenes.length > 0 
        ? proj.imagenes.map(img => ({ url: img.url || '', desc: img.desc || '' }))
        : [{ url: '', desc: '' }],
      documentos: proj.documentos && proj.documentos.length > 0
        ? proj.documentos.map(doc => ({ titulo: doc.titulo || '', tipo: doc.tipo || 'PDF', link: doc.link || '' }))
        : [{ titulo: '', tipo: 'PDF', link: '' }]
    });
    setModalOpen(true);
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      imagenes: [...prev.imagenes, { url: '', desc: '' }]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.imagenes];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, imagenes: updated };
    });
  };

  const handleAddDoc = () => {
    setFormData(prev => ({
      ...prev,
      documentos: [...prev.documentos, { titulo: '', tipo: 'PDF', link: '' }]
    }));
  };

  const handleRemoveDoc = (index) => {
    setFormData(prev => ({
      ...prev,
      documentos: prev.documentos.filter((_, i) => i !== index)
    }));
  };

  const handleDocChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.documentos];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, documentos: updated };
    });
  };

  const handleAddMemberTag = (member) => {
    const name = member.nombre;
    setFormData(prev => {
      const current = prev.integrantesText.trim();
      if (!current) return { ...prev, integrantesText: name };
      if (current.includes(name)) return prev;
      return { ...prev, integrantesText: `${current}, ${name}` };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim()) {
      alert('El nombre del proyecto es obligatorio.');
      return;
    }

    const membersArray = formData.integrantesText
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    const validImages = formData.imagenes.filter(img => img.url && img.url.trim() !== '');
    const validDocs = formData.documentos.filter(doc => doc.titulo && doc.titulo.trim() !== '');

    const payload = {
      titulo: formData.titulo.trim(),
      badge: formData.badge.trim(),
      linea: formData.linea.trim(),
      desc: formData.desc.trim(),
      color: "from-[#1f7a8c]/10 to-[#1f7a8c]/20 border-[#1f7a8c]/20",
      integrantes: membersArray,
      imagenes: validImages,
      documentos: validDocs
    };

    if (editingProj) {
      updateProject(editingProj.id, payload);
      showFeedback(`Proyecto "${formData.titulo}" actualizado.`);
    } else {
      addProject(payload);
      showFeedback(`Proyecto "${formData.titulo}" creado en "¿Qué Hacemos?".`);
    }

    setModalOpen(false);
    setEditingProj(null);
  };

  const handleDelete = (proj) => {
    if (!isAdmin) {
      alert('Solo los Administradores pueden eliminar proyectos.');
      return;
    }
    if (window.confirm(`¿Deseas eliminar el proyecto "${proj.titulo}"?`)) {
      deleteProject(proj.id);
      showFeedback(`Proyecto eliminado.`);
    }
  };

  const filteredProjects = proyectos.filter((p) => {
    const term = search.toLowerCase();
    return (
      (p.titulo || '').toLowerCase().includes(term) ||
      (p.desc || '').toLowerCase().includes(term) ||
      (p.linea || '').toLowerCase().includes(term)
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
            <Cpu size={24} className="text-pink-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Proyectos e Investigaciones ("¿Qué Hacemos?")</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Administra las fichas de investigación aplicada, tesis y herramientas científicas del laboratorio.
          </p>
        </div>

        {isEditor && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-teal-500 hover:from-pink-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-pink-950 transition-all cursor-pointer shrink-0"
          >
            <Plus size={16} /> Nuevo Proyecto de Investigación
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
          placeholder="Buscar proyectos por nombre, descripción o línea..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Listado de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {proj.linea || 'Investigación'}
                </span>
                {proj.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {proj.badge}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-white text-base mb-2 leading-snug">
                {proj.titulo}
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed line-clamp-4 mb-4">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  <Image size={12} className="text-blue-400" /> {(proj.imagenes || []).length} imágenes
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1">
                  <FileText size={12} className="text-indigo-400" /> {(proj.documentos || []).length} documentos
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                {Array.isArray(proj.integrantes) && proj.integrantes.length > 0
                  ? `${proj.integrantes.length} investigadores`
                  : ''}
              </div>

              <div className="flex items-center gap-2">
                {isEditor && (
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(proj)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={13} /> Editar
                  </button>
                )}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDelete(proj)}
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

      {/* Modal Formulario Proyecto */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h2 className="text-lg font-extrabold text-white">
                {editingProj ? 'Editar Proyecto de Investigación' : 'Nuevo Proyecto para "¿Qué Hacemos?"'}
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
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Nombre del Proyecto / Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej. Sistema Inteligente para Laringe Electrónica"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Línea de Trabajo</label>
                  <input
                    type="text"
                    value={formData.linea}
                    onChange={(e) => setFormData({ ...formData, linea: e.target.value })}
                    placeholder="Ej. Inteligencia Artificial / Neuroingeniería"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Insignia / Badge (Opcional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ej. Trabajo de título / Proyecto Fondecyt"
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">Descripción Completa</label>
                <textarea
                  rows={5}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Detalla los objetivos, metodología, modelos desarrollados e impacto clínico del proyecto..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 leading-relaxed"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider">Investigadores Participantes</label>
                  <span className="text-[11px] text-slate-400">Haz clic para añadir</span>
                </div>
                <input
                  type="text"
                  value={formData.integrantesText}
                  onChange={(e) => setFormData({ ...formData, integrantesText: e.target.value })}
                  placeholder="Separados por coma: Dr. Raúl Caulier, Andrés Vega..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <div className="flex flex-wrap gap-1.5 mt-2 max-h-20 overflow-y-auto p-1 bg-slate-950/60 rounded-xl border border-slate-800">
                  {equipo.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleAddMemberTag(m)}
                      className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      + {m.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Imágenes del Proyecto */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider">
                    Galería Experimental / Esquemas
                  </label>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300 hover:text-white text-[11px] font-bold"
                  >
                    + Añadir Imagen
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                  {formData.imagenes.map((img, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={img.url}
                        onChange={(e) => handleImageChange(idx, 'url', e.target.value)}
                        placeholder="URL de la imagen..."
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <input
                        type="text"
                        value={img.desc}
                        onChange={(e) => handleImageChange(idx, 'desc', e.target.value)}
                        placeholder="Descripción..."
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      {formData.imagenes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentos Asociados */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider">
                    Papers, Posters y Documentos Asociados
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDoc}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white text-[11px] font-bold"
                  >
                    + Añadir Documento
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                  {formData.documentos.map((doc, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={doc.titulo}
                        onChange={(e) => handleDocChange(idx, 'titulo', e.target.value)}
                        placeholder="Título del poster o paper..."
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      <select
                        value={doc.tipo}
                        onChange={(e) => handleDocChange(idx, 'tipo', e.target.value)}
                        className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                      >
                        <option value="Paper">Paper</option>
                        <option value="Poster">Poster</option>
                        <option value="PDF">PDF</option>
                        <option value="Enlace">Enlace</option>
                      </select>
                      <input
                        type="text"
                        value={doc.link}
                        onChange={(e) => handleDocChange(idx, 'link', e.target.value)}
                        placeholder="Enlace URL (Drive/DOI)..."
                        className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                      />
                      {formData.documentos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <X size={14} />
                        </button>
                      )}
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-teal-500 hover:from-pink-500 hover:to-teal-400 text-white font-bold shadow-md cursor-pointer"
                >
                  {editingProj ? 'Guardar Cambios' : 'Guardar Proyecto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
