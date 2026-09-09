import React, { useState } from 'react';
import { 
  Clock, Search, ShieldCheck, Filter, Download, 
  CheckCircle2, AlertCircle, Edit, PlusCircle, Trash2, RotateCcw
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminHistory = () => {
  const { historial, currentUser, clearHistorial } = useData();
  const [search, setSearch] = useState('');
  const [selectedModule, setSelectedModule] = useState('todos');
  const [feedback, setFeedback] = useState('');

  const isAdmin = currentUser?.rol === 'admin';

  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar todo el historial de cambios? Esta acción no se puede deshacer.')) {
      clearHistorial();
      setFeedback('Historial vaciado correctamente.');
      setTimeout(() => setFeedback(''), 3500);
    }
  };

  const filteredLogs = historial.filter((log) => {
    const term = search.toLowerCase();
    const matchesSearch = (log.usuario || '').toLowerCase().includes(term) ||
                          (log.accion || '').toLowerCase().includes(term) ||
                          (log.modulo || '').toLowerCase().includes(term) ||
                          (log.fecha || '').toLowerCase().includes(term);
    const matchesModule = selectedModule === 'todos' ? true : log.modulo === selectedModule;
    return matchesSearch && matchesModule;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Usuario', 'Rol', 'Modulo', 'Tipo', 'Accion', 'Fecha'];
    const rows = historial.map(h => [
      h.id,
      `"${h.usuario}"`,
      h.rol,
      h.modulo,
      h.tipo,
      `"${h.accion.replace(/"/g, '""')}"`,
      h.fecha
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `latsib_historial_cambios_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modulesList = ['todos', 'Equipo', 'Publicaciones', 'Actividades', 'Proyectos', 'Usuarios', 'Sistema'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast de feedback */}
      {feedback && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2.5">
            <Clock size={24} className="text-teal-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Historial de Cambios</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registro exclusivo de modificaciones de contenido (creaciones, ediciones y eliminaciones en Equipo, Publicaciones, Actividades y Proyectos).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {isAdmin && historial.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-bold border border-rose-500/30 transition-all cursor-pointer"
            >
              <RotateCcw size={14} /> Vaciar Historial
            </button>
          )}

          {historial.length > 0 && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer"
            >
              <Download size={15} className="text-teal-400" /> Exportar (.csv)
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      {historial.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por usuario, acción o módulo..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {modulesList.map((mod) => (
              <button
                key={mod}
                type="button"
                onClick={() => setSelectedModule(mod)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedModule === mod
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {mod === 'todos' ? `Todos (${historial.length})` : mod}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Registros */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Registro de Cambios ({filteredLogs.length} eventos)</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-400" /> Auditoría de contenido en tiempo real
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs space-y-2">
              <Clock size={32} className="mx-auto text-slate-600 opacity-60 mb-2" />
              <p className="font-semibold text-slate-400">Historial limpio</p>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                No hay modificaciones registradas todavía. Cualquier creación, edición o eliminación que se realice en el panel quedará guardada aquí.
              </p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isCreate = log.tipo === 'creacion';
              const isDelete = log.tipo === 'eliminacion';

              return (
                <div
                  key={log.id}
                  className="p-4 sm:p-5 hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isCreate 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : isDelete
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {isCreate && <PlusCircle size={16} />}
                      {isDelete && <Trash2 size={16} />}
                      {!isCreate && !isDelete && <Edit size={16} />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-extrabold text-white text-sm">
                          {log.usuario}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {log.modulo}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.rol === 'admin' 
                            ? 'text-teal-400 bg-teal-500/10' 
                            : 'text-indigo-400 bg-indigo-500/10'
                        }`}>
                          {log.rol || 'integrante'}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {log.accion}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 pl-11 sm:pl-0">
                    <div className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                      <Clock size={12} className="text-slate-500" />
                      {log.fecha}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
