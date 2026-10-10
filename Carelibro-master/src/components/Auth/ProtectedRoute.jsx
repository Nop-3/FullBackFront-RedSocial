import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSocial } from '../../context/SocialContext';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ImageLightboxModal from '../Feed/ImageLightboxModal';
import AccessDeniedPage from '../../pages/AccessDeniedPage';

/**
 * Componente Guardián de Ruta Restringida (Nota 5.0)
 * Si el usuario no está autenticado, muestra la página de Acceso Incorrecto con botón de login.
 * Si está autenticado, renderiza la vista solicitada envuelta en el Layout de PochecheBook.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSocial();
  const location = useLocation();

  if (!isAuthenticated) {
    // Muestra pantalla informativa de Acceso Incorrecto / Ruta Restringida con botón al Login
    return <AccessDeniedPage currentPath={location.pathname} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, paddingTop: '62px' }}>
        {children}
      </div>

      <Footer />
      <ImageLightboxModal />
    </div>
  );
}
