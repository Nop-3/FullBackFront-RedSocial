import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SocialProvider, useSocial } from './context/SocialContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicOnlyRoute from './components/Auth/PublicOnlyRoute';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import GroupsPage from './pages/GroupsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

/**
 * Componente Toast Global para notificaciones de PochecheBook
 */
function GlobalToast() {
  const { toastMessage } = useSocial();
  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#1c1e21',
        color: '#ffffff',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontWeight: 500,
        animation: 'fbFadeIn 0.2s ease'
      }}
    >
      <i className="fa fa-info-circle" style={{ color: '#1877f2', fontSize: '18px' }}></i>
      <span>{toastMessage}</span>
    </div>
  );
}

export default function App() {
  return (
    <SocialProvider>
      <BrowserRouter>
        <Routes>
          {/* ========================================================
              RUTAS RESTRINGIDAS / PROTEGIDAS (CUMPLIMIENTO NOTA 5.0)
              Acceso exclusivo para usuarios autenticados.
              Si no ha iniciado sesión, redirige inmediatamente a /login
              ======================================================== */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mensajes"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grupos"
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* ========================================================
              RUTAS PÚBLICAS EXCLUSIVAS (CUMPLIMIENTO NOTA 4.5)
              Si el usuario ya está autenticado, lo redirige al Feed (/)
              ======================================================== */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/registro"
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            }
          />

          {/* Ruta 404 No Encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <GlobalToast />
      </BrowserRouter>
    </SocialProvider>
  );
}
