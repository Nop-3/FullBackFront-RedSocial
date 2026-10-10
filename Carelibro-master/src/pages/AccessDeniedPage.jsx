import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Página de Acceso Denegado / Incorrecto para Rutas Restringidas (Nota 5.0)
 * Se muestra cuando un usuario sin autenticar intenta acceder a una ruta privada.
 */
export default function AccessDeniedPage({ currentPath }) {
  const location = useLocation();
  const path = currentPath || location.pathname;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f2f5',
        fontFamily: '"Open Sans", sans-serif'
      }}
    >
      {/* Barra de cabecera sencilla con el logo de CareLibro */}
      <header
        style={{
          backgroundColor: '#4d636f',
          padding: '12px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Link
          to="/login"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#ffffff'
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.4px' }}>
            CareLibro
          </span>
        </Link>

        <div>
          <Link
            to="/login"
            className="w3-button w3-round w3-theme-d4"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              padding: '6px 14px',
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <i className="fa fa-sign-in" style={{ marginRight: '6px' }}></i>
            Iniciar Sesión
          </Link>
        </div>
      </header>

      {/* Contenido principal centrado */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 16px'
        }}
      >
        <div
          className="w3-card w3-round-xlarge w3-white"
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: '1px solid #e4e6eb'
          }}
        >
          {/* Icono de Seguridad / Acceso Denegado */}
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '38px',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.2)'
            }}
          >
            <i className="fa fa-lock"></i>
          </div>

          {/* Título de Acceso Incorrecto */}
          <h2
            style={{
              fontWeight: 800,
              color: '#1c1e21',
              fontSize: '24px',
              margin: '0 0 12px 0'
            }}
          >
            Acceso incorrecto: no puedes ver esta página
          </h2>

          {/* Mensaje descriptivo */}
          <p
            style={{
              fontSize: '14.5px',
              color: '#65676b',
              lineHeight: '1.6',
              margin: '0 0 20px 0'
            }}
          >
            Esta es una <strong>ruta restringida</strong> de <strong>CareLibro</strong>.
            Para proteger la privacidad de los usuarios y ver el contenido de esta sección,
            debes iniciar sesión con una cuenta activa.
          </p>

          {/* Indicador de la ruta intentada */}
          {path && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f8f9fa',
                border: '1px dashed #ced4da',
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#495057',
                marginBottom: '28px'
              }}
            >
              <i className="fa fa-shield" style={{ color: '#dc2626' }}></i>
              <span>Ruta protegida:</span>
              <code style={{ color: '#e41e3f', fontWeight: 600 }}>{path}</code>
            </div>
          )}

          {/* Botón principal de redirección al Login */}
          <div style={{ marginTop: '10px' }}>
            <Link
              to="/login"
              state={{ from: { pathname: path } }}
              className="w3-button w3-round-large"
              style={{
                backgroundColor: '#1877f2',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                padding: '12px 32px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(24, 119, 242, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <i className="fa fa-sign-in"></i>
              <span>Iniciar Sesión en CareLibro</span>
            </Link>
          </div>

          {/* Enlace secundario para registro */}
          <p
            style={{
              fontSize: '13.5px',
              color: '#65676b',
              marginTop: '22px',
              marginBottom: 0
            }}
          >
            ¿Aún no tienes una cuenta?{' '}
            <Link
              to="/registro"
              style={{
                color: '#1877f2',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Regístrate gratis aquí
            </Link>
          </p>
        </div>
      </main>

      {/* Pie de página */}
      <footer
        style={{
          backgroundColor: '#4d636f',
          color: '#ffffff',
          textAlign: 'center',
          padding: '16px',
          fontSize: '13px',
          opacity: 0.95
        }}
      >
        <p style={{ margin: 0 }}>
          CareLibro © {new Date().getFullYear()} · Conectando personas y momentos especiales
        </p>
      </footer>
    </div>
  );
}
