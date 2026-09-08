import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CONFIG,
  INITIAL_CATEGORIAS_EQUIPO,
  INITIAL_EQUIPO,
  INITIAL_PUBLICACIONES,
  INITIAL_ACTIVIDADES,
  INITIAL_PROYECTOS,
  DEFAULT_USERS,
  INITIAL_HISTORIAL,
  INVITATION_TEMPLATE
} from '../data/initialData';
import { generateToken, generate2FACode } from '../utils/security';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  CONFIG: 'latsib_config_v3',
  EQUIPO: 'latsib_equipo_v3',
  PUBLICACIONES: 'latsib_publicaciones_v3',
  ACTIVIDADES: 'latsib_actividades_v3',
  PROYECTOS: 'latsib_proyectos_v3',
  HISTORIAL: 'latsib_historial_v3',
  USERS: 'latsib_users_v3',
  INVITATIONS: 'latsib_invitations_v3',
  RESETS: 'latsib_resets_v3',
  SESSION: 'latsib_session_v3',
  THEME: 'latsib_admin_theme_v3'
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
        ...(stored?.imagenes || {}),
        logoUtem: stored?.imagenes?.logoUtem || INITIAL_CONFIG.imagenes.logoUtem
      }
    };
  });
  const [equipo, setEquipo] = useState(() => getStored(STORAGE_KEYS.EQUIPO, INITIAL_EQUIPO));
  const [publicaciones, setPublicaciones] = useState(() => getStored(STORAGE_KEYS.PUBLICACIONES, INITIAL_PUBLICACIONES));
  const [actividades, setActividades] = useState(() => getStored(STORAGE_KEYS.ACTIVIDADES, INITIAL_ACTIVIDADES));
  const [proyectos, setProyectos] = useState(() => getStored(STORAGE_KEYS.PROYECTOS, INITIAL_PROYECTOS));
  const [historial, setHistorial] = useState(() => getStored(STORAGE_KEYS.HISTORIAL, INITIAL_HISTORIAL));
  const [users, setUsers] = useState(() => getStored(STORAGE_KEYS.USERS, DEFAULT_USERS));
  const [invitations, setInvitations] = useState(() => getStored(STORAGE_KEYS.INVITATIONS, []));
  const [resets, setResets] = useState(() => getStored(STORAGE_KEYS.RESETS, []));
  const [currentUser, setCurrentUser] = useState(() => getStored(STORAGE_KEYS.SESSION, null));
  const [adminTheme, setAdminTheme] = useState(() => getStored(STORAGE_KEYS.THEME, 'dark'));

  // Sincronización persistente
  useEffect(() => setStored(STORAGE_KEYS.CONFIG, config), [config]);
  useEffect(() => setStored(STORAGE_KEYS.EQUIPO, equipo), [equipo]);
  useEffect(() => setStored(STORAGE_KEYS.PUBLICACIONES, publicaciones), [publicaciones]);
  useEffect(() => setStored(STORAGE_KEYS.ACTIVIDADES, actividades), [actividades]);
  useEffect(() => setStored(STORAGE_KEYS.PROYECTOS, proyectos), [proyectos]);
  useEffect(() => setStored(STORAGE_KEYS.HISTORIAL, historial), [historial]);
  useEffect(() => setStored(STORAGE_KEYS.USERS, users), [users]);
  useEffect(() => setStored(STORAGE_KEYS.INVITATIONS, invitations), [invitations]);
  useEffect(() => setStored(STORAGE_KEYS.RESETS, resets), [resets]);
  useEffect(() => setStored(STORAGE_KEYS.SESSION, currentUser), [currentUser]);
  useEffect(() => setStored(STORAGE_KEYS.THEME, adminTheme), [adminTheme]);

  const toggleAdminTheme = () => {
    setAdminTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getNowFormatted = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

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

  // --- AUTENTICACIÓN Y DOBLE FACTOR (2FA) ---
  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, message: 'El correo electrónico no se encuentra registrado.' };
    }
    if (user.estado === 'inactivo') {
      return { success: false, message: 'Tu cuenta ha sido desactivada. Contacta al administrador.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'La contraseña ingresada es incorrecta.' };
    }

    // Si tiene 2FA activado (ej. para administradores)
    if (user.has2FA) {
      const code = generate2FACode();
      return {
        success: true,
        requires2FA: true,
        tempUser: user,
        verificationCode: code,
        message: 'Se requiere verificación de dos factores (2FA).'
      };
    }

    const sessionUser = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      avatar: user.avatar,
      cargo: user.cargo,
      has2FA: Boolean(user.has2FA)
    };
    setCurrentUser(sessionUser);
    logAction(`Inició sesión en el panel`, 'Seguridad', 'login', user.nombre);
    return { success: true, requires2FA: false, user: sessionUser };
  };

  const verify2FALogin = (user, inputCode, expectedCode) => {
    if (String(inputCode).trim() !== String(expectedCode).trim()) {
      return { success: false, message: 'Código 2FA incorrecto. Por favor verifícalo e intenta nuevamente.' };
    }

    const sessionUser = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      avatar: user.avatar,
      cargo: user.cargo,
      has2FA: Boolean(user.has2FA)
    };
    setCurrentUser(sessionUser);
    logAction(`Inició sesión con verificación 2FA`, 'Seguridad', 'login', user.nombre);
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    if (currentUser) {
      logAction(`Cerró sesión`, 'Seguridad', 'logout', currentUser.nombre);
    }
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  };

  // --- GESTIÓN DE INVITACIONES Y REGISTRO AUTÓNOMO ---
  const createInvitation = ({ nombre, email, rol, cargo }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existingUser && existingUser.estado === 'activo') {
      return { success: false, message: `El correo "${email}" ya tiene una cuenta activa.` };
    }

    const token = generateToken('inv');
    const baseUrl = window.location.origin + window.location.pathname;
    const invitationLink = `${baseUrl}#invitacion?token=${token}`;

    const roleName = rol === 'admin' ? 'Administrador' : rol === 'editor' ? 'Editor' : 'Investigador / Integrante';
    const emailMessage = INVITATION_TEMPLATE(nombre, roleName, invitationLink);

    const newInvitation = {
      token,
      nombre,
      email: cleanEmail,
      rol,
      cargo: cargo || 'Integrante de Investigación',
      link: invitationLink,
      messageText: emailMessage,
      creadoEl: getNowFormatted(),
      expiraEl: '48 horas',
      usado: false
    };

    // Agregar a la lista de usuarios en estado "invitacion_pendiente"
    const newUserRecord = {
      id: `u_${Date.now()}`,
      nombre,
      email: cleanEmail,
      password: '',
      rol,
      estado: 'invitacion_pendiente',
      has2FA: rol === 'admin', // 2FA por defecto para nuevos administradores
      avatar: '/logo-circle.png',
      cargo: cargo || 'Integrante de Investigación',
      invitationToken: token,
      creadoEl: getNowFormatted()
    };

    setUsers(prev => {
      const filtered = prev.filter(u => u.email.toLowerCase() !== cleanEmail);
      return [...filtered, newUserRecord];
    });

    setInvitations(prev => [newInvitation, ...prev]);
    logAction(`Generó invitación para "${nombre}" (${roleName}) a ${cleanEmail}`, 'Usuarios', 'creacion');

    return {
      success: true,
      invitation: newInvitation,
      link: invitationLink,
      messageText: emailMessage
    };
  };

  const getInvitationByToken = (token) => {
    return invitations.find(inv => inv.token === token && !inv.usado);
  };

  const acceptInvitation = (token, password) => {
    const inv = invitations.find(i => i.token === token && !i.usado);
    if (!inv) {
      return { success: false, message: 'La invitación no existe o ya ha sido utilizada.' };
    }

    if (!password || password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    // Actualizar usuario a activo
    let activatedUser = null;
    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === inv.email.toLowerCase() || u.invitationToken === token) {
        activatedUser = {
          ...u,
          password,
          estado: 'activo',
          invitationToken: null
        };
        return activatedUser;
      }
      return u;
    }));

    // Marcar invitación como usada
    setInvitations(prev => prev.map(i => (i.token === token ? { ...i, usado: true } : i)));

    logAction(`El usuario "${inv.nombre}" activó su cuenta y configuró su contraseña`, 'Usuarios', 'creacion', inv.nombre);

    if (activatedUser) {
      const sessionUser = {
        id: activatedUser.id,
        nombre: activatedUser.nombre,
        email: activatedUser.email,
        rol: activatedUser.rol,
        avatar: activatedUser.avatar,
        cargo: activatedUser.cargo,
        has2FA: Boolean(activatedUser.has2FA)
      };
      setCurrentUser(sessionUser);
      return { success: true, user: sessionUser };
    }

    return { success: true };
  };

  // --- RECUPERACIÓN AUTÓNOMA DE CONTRASEÑA ---
  const requestPasswordReset = (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, message: 'No existe ninguna cuenta registrada con este correo institucional.' };
    }

    const token = generateToken('rst');
    const code = generate2FACode();
    const baseUrl = window.location.origin + window.location.pathname;
    const resetLink = `${baseUrl}#recuperar?token=${token}`;

    const newReset = {
      token,
      code,
      email: cleanEmail,
      nombre: user.nombre,
      link: resetLink,
      creadoEl: getNowFormatted(),
      usado: false
    };

    setResets(prev => [newReset, ...prev]);
    logAction(`Solicitó recuperación de contraseña para ${cleanEmail}`, 'Seguridad', 'edicion', user.nombre);

    return {
      success: true,
      reset: newReset,
      link: resetLink,
      code
    };
  };

  const getResetByTokenOrCode = (tokenOrCode) => {
    return resets.find(r => (r.token === tokenOrCode || r.code === tokenOrCode) && !r.usado);
  };

  const resetPassword = (tokenOrCode, newPassword) => {
    const record = resets.find(r => (r.token === tokenOrCode || r.code === tokenOrCode) && !r.usado);
    if (!record) {
      return { success: false, message: 'El enlace o código de recuperación es inválido o ya fue utilizado.' };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'La contraseña debe contener al menos 6 caracteres.' };
    }

    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === record.email.toLowerCase()) {
        return { ...u, password: newPassword, estado: 'activo' };
      }
      return u;
    }));

    setResets(prev => prev.map(r => (r.token === record.token ? { ...r, usado: true } : r)));
    logAction(`Restableció su contraseña exitosamente`, 'Seguridad', 'edicion', record.nombre);

    return { success: true };
  };

  // --- AUTOGESTIÓN DE PERFIL Y AJUSTES DE CUENTA ---
  const changePassword = (userId, currentPass, newPass) => {
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, message: 'Usuario no encontrado.' };
    if (user.password !== currentPass) {
      return { success: false, message: 'La contraseña actual ingresada es incorrecta.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, message: 'La nueva contraseña debe tener al menos 6 caracteres.' };
    }

    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, password: newPass } : u)));
    logAction(`Cambió su contraseña desde los ajustes de perfil`, 'Seguridad', 'edicion', user.nombre);
    return { success: true, message: 'Contraseña actualizada con éxito.' };
  };

  const updateUserProfile = (userId, profileData) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...profileData };
        if (currentUser?.id === userId) {
          setCurrentUser({
            id: updated.id,
            nombre: updated.nombre,
            email: updated.email,
            rol: updated.rol,
            avatar: updated.avatar,
            cargo: updated.cargo,
            has2FA: Boolean(updated.has2FA)
          });
        }
        return updated;
      }
      return u;
    }));
    logAction(`Actualizó su información de perfil personal`, 'Usuarios', 'edicion');
  };

  const toggle2FA = (userId, enabled) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, has2FA: enabled };
        if (currentUser?.id === userId) {
          setCurrentUser(prevUser => ({ ...prevUser, has2FA: enabled }));
        }
        logAction(`${enabled ? 'Activó' : 'Desactivó'} la verificación en dos pasos (2FA)`, 'Seguridad', 'edicion', u.nombre);
        return updated;
      }
      return u;
    }));
  };

  const deleteUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (target?.isPrimaryAdmin) {
      return { success: false, message: 'No es posible eliminar a la cuenta Administradora Principal.' };
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    logAction(`Eliminó al usuario ${target ? target.nombre : userId}`, 'Usuarios', 'eliminacion');
    return { success: true };
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId && !u.isPrimaryAdmin) {
        const nuevoEstado = u.estado === 'activo' ? 'inactivo' : 'activo';
        logAction(`${nuevoEstado === 'activo' ? 'Reactivó' : 'Desactivó'} la cuenta de ${u.nombre}`, 'Usuarios', 'edicion');
        return { ...u, estado: nuevoEstado };
      }
      return u;
    }));
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
      version: '3.0',
      exportedAt: new Date().toISOString(),
      config,
      equipo,
      publicaciones,
      actividades,
      proyectos,
      historial,
      users,
      invitations
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
      if (data.users) setUsers(data.users);
      if (data.invitations) setInvitations(data.invitations);
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
    setInvitations([]);
    setResets([]);
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
    invitations,
    currentUser,
    adminTheme,
    setAdminTheme,
    toggleAdminTheme,
    login,
    verify2FALogin,
    logout,
    logAction,
    // Invitations & User Management
    createInvitation,
    getInvitationByToken,
    acceptInvitation,
    requestPasswordReset,
    getResetByTokenOrCode,
    resetPassword,
    changePassword,
    updateUserProfile,
    toggle2FA,
    deleteUser,
    toggleUserStatus,
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
