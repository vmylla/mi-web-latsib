import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CONFIG,
  INITIAL_CATEGORIAS_EQUIPO,
  INITIAL_EQUIPO,
  INITIAL_PUBLICACIONES,
  INITIAL_ACTIVIDADES,
  INITIAL_PROYECTOS,
  DEFAULT_USERS,
  INITIAL_HISTORIAL
} from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  CONFIG: 'latsib_config_v2',
  EQUIPO: 'latsib_equipo_v2',
  PUBLICACIONES: 'latsib_publicaciones_v2',
  ACTIVIDADES: 'latsib_actividades_v2',
  PROYECTOS: 'latsib_proyectos_v2',
  HISTORIAL: 'latsib_historial_v2',
  USERS: 'latsib_users_v2',
  SESSION: 'latsib_session_v2'
};

const getStored = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
  }
  return fallback;
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
};

export const DataProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const stored = getStored(STORAGE_KEYS.CONFIG, INITIAL_CONFIG);
    return {
      ...INITIAL_CONFIG,
      ...stored,
      imagenes: {
        ...INITIAL_CONFIG.imagenes,
        ...(stored?.imagenes || {})
      }
    };
  });
  const [equipo, setEquipo] = useState(() => getStored(STORAGE_KEYS.EQUIPO, INITIAL_EQUIPO));
  const [publicaciones, setPublicaciones] = useState(() => getStored(STORAGE_KEYS.PUBLICACIONES, INITIAL_PUBLICACIONES));
  const [actividades, setActividades] = useState(() => getStored(STORAGE_KEYS.ACTIVIDADES, INITIAL_ACTIVIDADES));
  const [proyectos, setProyectos] = useState(() => getStored(STORAGE_KEYS.PROYECTOS, INITIAL_PROYECTOS));
  const [historial, setHistorial] = useState(() => getStored(STORAGE_KEYS.HISTORIAL, INITIAL_HISTORIAL));
  const [users, setUsers] = useState(() => getStored(STORAGE_KEYS.USERS, DEFAULT_USERS));
  const [currentUser, setCurrentUser] = useState(() => getStored(STORAGE_KEYS.SESSION, null));

  // Sync to localStorage
  useEffect(() => setStored(STORAGE_KEYS.CONFIG, config), [config]);
  useEffect(() => setStored(STORAGE_KEYS.EQUIPO, equipo), [equipo]);
  useEffect(() => setStored(STORAGE_KEYS.PUBLICACIONES, publicaciones), [publicaciones]);
  useEffect(() => setStored(STORAGE_KEYS.ACTIVIDADES, actividades), [actividades]);
  useEffect(() => setStored(STORAGE_KEYS.PROYECTOS, proyectos), [proyectos]);
  useEffect(() => setStored(STORAGE_KEYS.HISTORIAL, historial), [historial]);
  useEffect(() => setStored(STORAGE_KEYS.USERS, users), [users]);
  useEffect(() => setStored(STORAGE_KEYS.SESSION, currentUser), [currentUser]);

  // Helper para generar fechas con formato chileno amigable
  const getNowFormatted = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Helper para registrar en el historial de cambios
  const logAction = (accion, modulo, tipo = 'edicion', autorOverride = null) => {
    const autor = autorOverride || (currentUser ? currentUser.nombre : 'Sistema');
    const rol = currentUser ? currentUser.rol : 'admin';
    const newLog = {
      id: `h_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      usuario: autor,
      rol,
      accion,
      modulo,
      tipo,
      fecha: getNowFormatted()
    };
    setHistorial(prev => [newLog, ...prev]);
  };

  // --- AUTENTICACIÓN ---
  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, message: 'El correo electrónico no está registrado en el sistema.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'La contraseña ingresada es incorrecta.' };
    }

    const sessionUser = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      avatar: user.avatar,
      cargo: user.cargo
    };
    setCurrentUser(sessionUser);
    logAction(`Inició sesión en el panel de administración`, 'Seguridad', 'login', user.nombre);
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    if (currentUser) {
      logAction(`Cerró sesión`, 'Seguridad', 'logout', currentUser.nombre);
    }
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  };

  // --- CRUD EQUIPO ---
  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: `m_${Date.now()}`,
      activo: memberData.activo !== undefined ? memberData.activo : true,
      orden: memberData.orden || (equipo.length + 1)
    };
    setEquipo(prev => [...prev, newMember]);
    logAction(`Agregó al integrante "${newMember.nombre}" como ${newMember.rol || 'miembro'}`, 'Equipo', 'creacion');
    return newMember;
  };

  const updateMember = (id, memberData) => {
    setEquipo(prev => prev.map(m => (m.id === id ? { ...m, ...memberData } : m)));
    logAction(`Actualizó la información del integrante "${memberData.nombre || id}"`, 'Equipo', 'edicion');
  };

  const toggleMemberVisibility = (id) => {
    setEquipo(prev => prev.map(m => {
      if (m.id === id) {
        const nuevoEstado = !m.activo;
        logAction(`${nuevoEstado ? 'Habilitó' : 'Ocultó'} al integrante "${m.nombre}"`, 'Equipo', 'edicion');
        return { ...m, activo: nuevoEstado };
      }
      return m;
    }));
  };

  const setMemberExintegrante = (id) => {
    setEquipo(prev => prev.map(m => {
      if (m.id === id) {
        logAction(`Cambió el estado de "${m.nombre}" a Exintegrante (Historial)`, 'Equipo', 'edicion');
        return { ...m, categoria: 'exintegrantes' };
      }
      return m;
    }));
  };

  const deleteMember = (id) => {
    const toDelete = equipo.find(m => m.id === id);
    setEquipo(prev => prev.filter(m => m.id !== id));
    logAction(`Eliminó al integrante "${toDelete ? toDelete.nombre : id}"`, 'Equipo', 'eliminacion');
  };

  // --- CRUD PUBLICACIONES ---
  const addPublication = (pubData) => {
    const newPub = {
      ...pubData,
      id: `p_${Date.now()}`
    };
    setPublicaciones(prev => [newPub, ...prev]);
    logAction(`Publicó el artículo científico "${newPub.titulo}"`, 'Publicaciones', 'creacion');
    return newPub;
  };

  const updatePublication = (id, pubData) => {
    setPublicaciones(prev => prev.map(p => (p.id === id ? { ...p, ...pubData } : p)));
    logAction(`Modificó la publicación "${pubData.titulo || id}"`, 'Publicaciones', 'edicion');
  };

  const deletePublication = (id) => {
    const toDelete = publicaciones.find(p => p.id === id);
    setPublicaciones(prev => prev.filter(p => p.id !== id));
    logAction(`Eliminó la publicación "${toDelete ? toDelete.titulo : id}"`, 'Publicaciones', 'eliminacion');
  };

  // --- CRUD ACTIVIDADES ---
  const addActivity = (actData) => {
    const newAct = {
      ...actData,
      id: actData.id || Date.now()
    };
    setActividades(prev => [newAct, ...prev]);
    logAction(`Añadió la actividad "${newAct.titulo}" (${newAct.tipo})`, 'Actividades', 'creacion');
    return newAct;
  };

  const updateActivity = (id, actData) => {
    setActividades(prev => prev.map(a => (a.id === id ? { ...a, ...actData } : a)));
    logAction(`Actualizó la actividad "${actData.titulo || id}"`, 'Actividades', 'edicion');
  };

  const deleteActivity = (id) => {
    const toDelete = actividades.find(a => a.id === id);
    setActividades(prev => prev.filter(a => a.id !== id));
    logAction(`Eliminó la actividad "${toDelete ? toDelete.titulo : id}"`, 'Actividades', 'eliminacion');
  };

  // --- CRUD PROYECTOS / QUÉ HACEMOS ---
  const addProject = (projData) => {
    const newProj = {
      ...projData,
      id: projData.id || Date.now()
    };
    setProyectos(prev => [...prev, newProj]);
    logAction(`Creó el proyecto / línea de trabajo "${newProj.titulo}"`, 'Proyectos', 'creacion');
    return newProj;
  };

  const updateProject = (id, projData) => {
    setProyectos(prev => prev.map(p => (p.id === id ? { ...p, ...projData } : p)));
    logAction(`Actualizó el proyecto "${projData.titulo || id}"`, 'Proyectos', 'edicion');
  };

  const deleteProject = (id) => {
    const toDelete = proyectos.find(p => p.id === id);
    setProyectos(prev => prev.filter(p => p.id !== id));
    logAction(`Eliminó el proyecto "${toDelete ? toDelete.titulo : id}"`, 'Proyectos', 'eliminacion');
  };

  // --- RESPALDO Y RESTAURACIÓN ---
  const exportBackupJSON = () => {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      config,
      equipo,
      publicaciones,
      actividades,
      proyectos,
      historial,
      users
    };
    return JSON.stringify(data, null, 2);
  };

  const importBackupJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.equipo) setEquipo(data.equipo);
      if (data.publicaciones) setPublicaciones(data.publicaciones);
      if (data.actividades) setActividades(data.actividades);
      if (data.proyectos) setProyectos(data.proyectos);
      if (data.historial) setHistorial(data.historial);
      if (data.config) setConfig(data.config);
      logAction(`Restauró una copia de seguridad externa de datos`, 'Sistema', 'edicion');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const resetToDefaults = () => {
    setEquipo(INITIAL_EQUIPO);
    setPublicaciones(INITIAL_PUBLICACIONES);
    setActividades(INITIAL_ACTIVIDADES);
    setProyectos(INITIAL_PROYECTOS);
    setConfig(INITIAL_CONFIG);
    setUsers(DEFAULT_USERS);
    setHistorial(INITIAL_HISTORIAL);
    logAction(`Restableció todos los datos a la configuración inicial por defecto`, 'Sistema', 'eliminacion');
  };

  const value = {
    config,
    setConfig,
    categoriasEquipo: INITIAL_CATEGORIAS_EQUIPO,
    equipo,
    publicaciones,
    actividades,
    proyectos,
    historial,
    users,
    currentUser,
    login,
    logout,
    logAction,
    // Team CRUD
    addMember,
    updateMember,
    toggleMemberVisibility,
    setMemberExintegrante,
    deleteMember,
    // Publications CRUD
    addPublication,
    updatePublication,
    deletePublication,
    // Activities CRUD
    addActivity,
    updateActivity,
    deleteActivity,
    // Projects CRUD
    addProject,
    updateProject,
    deleteProject,
    // Backup & Restore
    exportBackupJSON,
    importBackupJSON,
    resetToDefaults
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
