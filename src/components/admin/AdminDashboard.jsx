import React, { useState } from 'react';
import { 
  Users, FileText, Calendar, Cpu, Clock, 
  ArrowUpRight, Plus, ShieldCheck, Download, Upload, RotateCcw,
  CheckCircle, AlertTriangle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminDashboard = ({ onNavigate }) => {
  const { 
    currentUser, 
    equipo, 
    publicaciones, 
    actividades, 
    proyectos, 
    historial,
    exportBackupJSON,
    importBackupJSON,
    resetToDefaults
  } = useData();

  const [notification, setNotification] = useState(null);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `latsib_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Copia de seguridad descargada correctamente.');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importBackupJSON(content);
        if (res.success) {
          showToast('Datos restaurados exitosamente desde la copia de seguridad.');
        } else {
          showToast(`Error al restaurar: ${res.error}`, 'error');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas restablecer los datos a los valores originales por defecto?')) {
      resetToDefaults();
      showToast('Datos restablecidos a los valores originales.');
    }
  };

  const isAdmin = currentUser?.rol === 'admin';
  const isEditor = currentUser?.rol === 'editor' || isAdmin;

  const totalIntegrantes = equipo.length;
  const integrantesActivos = equipo.filter(m => m.activo && m.categoria !== 'exintegrantes').length;
  const exintegrantes = equipo.filter(m => m.categoria === 'exintegrantes').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-sm font-medium animate-in slide-in-from-bottom-5 ${
          notification.type === 'error' 
            ? 'bg-rose-900/90 text-white border-rose-700' 
            : 'bg-emerald-900/90 text-white border-emerald-700'
        }`}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Saludo y Tarjeta de Bienvenida */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isAdmin 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                  : isEditor 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {isAdmin ? 'Nivel: Administrador (Total)' : isEditor ? 'Nivel: Editor' : 'Nivel: Integrante'}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <ShieldCheck size={14} className="text-teal-400" /> Sesión activa
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bienvenido, {currentUser?.nombre || 'Colega de LaTSIB'}
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              Panel de control y gestión de contenidos en tiempo real. Cualquier modificación que realices se reflejará automáticamente en la web pública de LaTSIB.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={() => onNavigate('team', { openNewModal: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-blue-950 transition-all cursor-pointer"
              >
                <Plus size={16} /> Agregar Integrante
              </button>
            )}
            {isEditor && (
              <button
                type="button"
                onClick={() => onNavigate('publications', { openNewModal: true })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer"
              >
                <Plus size={16} /> Cargar Paper
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Métricas Generales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Tarjeta 1: Integrantes */}
        <div 
          onClick={() => onNavigate('team')}
          className="bg-slate-900/90 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-blue-950/30 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{totalIntegrantes}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Integrantes Registrados</div>
          <div className="text-[11px] text-teal-400 mt-2 font-medium">
            {integrantesActivos} activos • {exintegrantes} exintegrantes
          </div>
        </div>

        {/* Tarjeta 2: Publicaciones */}
        <div 
          onClick={() => onNavigate('publications')}
          className="bg-slate-900/90 border border-slate-800/80 hover:border-teal-500/40 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-teal-950/30 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{publicaciones.length}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artículos y Papers</div>
          <div className="text-[11px] text-slate-500 mt-2 font-medium">
            Indexados y mostrados en repositorio
          </div>
        </div>

        {/* Tarjeta 3: Actividades */}
        <div 
          onClick={() => onNavigate('activities')}
          className="bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-indigo-950/30 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{actividades.length}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Actividades y Congresos</div>
          <div className="text-[11px] text-slate-500 mt-2 font-medium">
            Nacionales e internacionales con galería
          </div>
        </div>

        {/* Tarjeta 4: Proyectos */}
        <div 
          onClick={() => onNavigate('projects')}
          className="bg-slate-900/90 border border-slate-800/80 hover:border-pink-500/40 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-pink-950/30 cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu size={22} />
            </div>
            <ArrowUpRight size={18} className="text-slate-500 group-hover:text-pink-400 transition-colors" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{proyectos.length}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proyectos "¿Qué Hacemos?"</div>
          <div className="text-[11px] text-slate-500 mt-2 font-medium">
            Fichas activas de investigación
          </div>
        </div>
      </div>

      {/* Bloque Dividido: Historial de Cambios Recientes + Herramientas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Historial Reciente de Auditoría (Trazabilidad) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Clock size={20} className="text-teal-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Historial de Cambios Recientes</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('history')}
              className="text-xs font-bold text-teal-400 hover:text-teal-300 hover:underline cursor-pointer"
            >
              Ver todo el historial →
            </button>
          </div>

          <div className="space-y-3.5">
            {historial.slice(0, 6).map((log) => (
              <div 
                key={log.id}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-all text-xs"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  log.tipo === 'creacion' 
                    ? 'bg-emerald-400' 
                    : log.tipo === 'eliminacion' 
                      ? 'bg-rose-400' 
                      : 'bg-blue-400'
                }`} />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{log.usuario}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                      {log.modulo}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{log.accion}</p>
                </div>
                <div className="text-[11px] text-slate-500 whitespace-nowrap shrink-0">
                  {log.fecha}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Lateral: Herramientas de Mantenimiento y Respaldos */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-slate-800">
              <ShieldCheck size={20} className="text-blue-400" />
              <h3 className="text-lg font-bold text-white">Seguridad y Respaldo</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Puedes descargar una copia de seguridad con todos los integrantes, publicaciones, actividades e historial para resguardar o transferir los datos del laboratorio.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleExportBackup}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={16} className="text-teal-400" /> Descargar Copia JSON
              </button>

              {isAdmin && (
                <>
                  <label className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Upload size={16} className="text-blue-400" /> Cargar Copia JSON
                    <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                  </label>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <RotateCcw size={15} /> Restablecer datos iniciales
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
            Laboratorio LaTSIB • Sistema v2.0
          </div>
        </div>
      </div>
    </div>
  );
};
