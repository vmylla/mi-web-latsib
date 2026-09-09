import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Calendar, Cpu, Clock, 
  LogOut, Globe, Menu, X, Shield, ChevronRight, UserCircle, 
  Settings, UserPlus, Sun, Moon, Sparkles 
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminTeam } from './AdminTeam';
import { AdminPublications } from './AdminPublications';
import { AdminActivities } from './AdminActivities';
import { AdminProjects } from './AdminProjects';
import { AdminHistory } from './AdminHistory';
import { AdminUsers } from './AdminUsers';
import { AdminProfileModal } from './AdminProfileModal';
import utemLogo from '../../assets/logo-utem.png';

export const AdminLayout = ({ onExitToSite, initialTab = 'dashboard' }) => {
  const { currentUser, logout, config, adminTheme, setAdminTheme, toggleAdminTheme } = useData();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalParam, setModalParam] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const isAdmin = currentUser?.rol === 'admin';
  const isEditor = currentUser?.rol === 'editor' || isAdmin;
  const isLight = adminTheme === 'light';

  const handleNavigate = (tab, options = {}) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (options.openNewModal) {
      setModalParam(true);
    } else {
      setModalParam(false);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'team', label: 'Gestión de Equipo', icon: <Users size={18} /> },
    { id: 'publications', label: 'Publicaciones', icon: <FileText size={18} /> },
    { id: 'activities', label: 'Actividades', icon: <Calendar size={18} /> },
    { id: 'projects', label: 'Qué Hacemos (Proyectos)', icon: <Cpu size={18} /> },
    ...(isAdmin ? [{ id: 'users', label: 'Cuentas & Invitaciones', icon: <Shield size={18} /> }] : []),
    { id: 'history', label: 'Historial de Cambios', icon: <Clock size={18} /> },
  ];

  const THEMES = [
    { id: 'dark', label: 'Oscuro', icon: <Moon size={14} />, color: 'bg-slate-900 border-teal-400 text-teal-400' },
    { id: 'light', label: 'Claro', icon: <Sun size={14} />, color: 'bg-slate-100 border-slate-400 text-slate-700' },
    { id: 'pink', label: 'Rosa Chicle', icon: '🌸', color: 'bg-pink-100 border-pink-400 text-pink-600' },
    { id: 'lightblue', label: 'Azul Cielo', icon: '💧', color: 'bg-sky-100 border-sky-400 text-sky-600' },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 admin-theme-${adminTheme || 'dark'} ${
      adminTheme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* SIDEBAR ESCRITORIO */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 shrink-0 p-6">
        {/* Cabecera Sidebar con Logos */}
        <div className="flex items-center justify-between pb-6 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src={utemLogo || config?.imagenes?.logoUtem || '/logo-utem.png'}
              alt="Logo UTEM"
              className="h-10 w-auto object-contain"
            />
            <img
              src={config?.imagenes?.logo || '/logo-circle.png'}
              alt="Logo LaTSIB"
              className="h-10 w-10 object-cover rounded-full shadow-md border border-teal-500/30"
            />
            <div>
              <div className="font-extrabold text-white text-sm tracking-tight leading-none">Panel LaTSIB</div>
              <div className="text-[10px] text-teal-400 font-bold uppercase tracking-wider mt-1">Gestión & Control</div>
            </div>
          </div>
        </div>

        {/* Selector Rápido de 4 Temas Visuales */}
        <div className="mb-5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles size={12} className="text-teal-400" /> Tema Visual
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-teal-400 font-mono">
              {THEMES.find(t => t.id === adminTheme)?.label || 'Personalizado'}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {THEMES.map((th) => {
              const isSelected = adminTheme === th.id;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setAdminTheme(th.id)}
                  title={`Tema ${th.label}`}
                  className={`h-8 rounded-xl flex items-center justify-center text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-white ring-2 ring-teal-400 scale-105 shadow-md'
                      : 'border-slate-700/80 hover:scale-105 opacity-70 hover:opacity-100'
                  } ${th.color}`}
                >
                  {typeof th.icon === 'string' ? th.icon : th.icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navegación */}
        <nav className="space-y-1.5 flex-grow">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md shadow-blue-950/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </button>
            );
          })}
        </nav>

        {/* Perfil del Usuario Activo */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 cursor-pointer transition-all group"
            title="Haz clic para editar tu perfil, tema o cambiar contraseña"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm bg-slate-850">
                  {currentUser?.nombre ? currentUser.nombre.charAt(0) : 'U'}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-grow">
              <div className="font-bold text-white text-xs truncate group-hover:text-teal-300 transition-colors">
                {currentUser?.nombre}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                isAdmin ? 'text-teal-400' : isEditor ? 'text-indigo-400' : 'text-blue-400'
              }`}>
                {isAdmin ? 'Administrador' : isEditor ? 'Editor' : 'Integrante'}
              </div>
            </div>
            <Settings size={15} className="text-slate-500 group-hover:text-teal-400 transition-colors shrink-0" />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onExitToSite}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Globe size={15} /> Ver Web Pública
            </button>

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20 transition-all cursor-pointer"
            >
              <LogOut size={15} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* HEADER MÓVIL */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <img src={config?.imagenes?.logo || '/logo-circle.png'} alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-white text-sm">Admin LaTSIB</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleAdminTheme}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            title="Cambiar Tema"
          >
            {isLight ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-teal-400" />}
          </button>
          <button
            type="button"
            onClick={() => setIsProfileModalOpen(true)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <Settings size={18} />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold ${
                activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <button
              type="button"
              onClick={onExitToSite}
              className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
            >
              Web Pública
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex-1 py-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-semibold"
            >
              Salir
            </button>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && <AdminDashboard onNavigate={handleNavigate} />}
        {activeTab === 'team' && <AdminTeam initialOpenModal={modalParam} />}
        {activeTab === 'publications' && <AdminPublications initialOpenModal={modalParam} />}
        {activeTab === 'activities' && <AdminActivities initialOpenModal={modalParam} />}
        {activeTab === 'projects' && <AdminProjects initialOpenModal={modalParam} />}
        {activeTab === 'users' && isAdmin && <AdminUsers />}
        {activeTab === 'history' && <AdminHistory />}
      </main>

      {/* MODAL PERFIL Y SEGURIDAD */}
      <AdminProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
