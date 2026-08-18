import React from 'react';

/**
 * Red de seguridad: si algún componente lanza un error inesperado durante
 * el renderizado, React desmonta toda la app y deja la pantalla en blanco.
 * Este componente atrapa ese error y muestra un mensaje con la opción de
 * volver al inicio, en vez de dejar al usuario con una página en blanco.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Se deja registrado en consola para poder depurar la causa real.
    console.error('Error atrapado por ErrorBoundary:', error, info);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          color: '#1e293b',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Ocurrió un problema al cargar esta sección
          </h1>
          <p style={{ color: '#475569', marginBottom: '1.5rem', maxWidth: 480 }}>
            Puedes volver al inicio del sitio. Si el problema persiste, revisa la
            consola del navegador (F12) para ver el detalle del error.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
