import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSocial } from '../../context/SocialContext';

/**
 * Componente Guardián para Rutas Públicas Exclusivas (/login, /registro)
 * Si el usuario ya está autenticado, lo redirige al inicio (/)
 */
export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useSocial();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
