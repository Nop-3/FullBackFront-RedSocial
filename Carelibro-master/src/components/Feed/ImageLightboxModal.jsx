import React from 'react';
import { useSocial } from '../../context/SocialContext';

export default function ImageLightboxModal() {
  const { lightboxImage, closeLightbox } = useSocial();

  if (!lightboxImage) return null;

  return (
    <div
      onClick={closeLightbox}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '20px',
        boxSizing: 'border-box',
        cursor: 'zoom-out',
        animation: 'fbFadeIn 0.2s ease'
      }}
    >
      {/* Botón cerrar en la esquina superior derecha */}
      <button
        onClick={closeLightbox}
        style={{
          position: 'absolute',
          top: '20px',
          right: '25px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: '#ffffff',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          zIndex: 100000
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
        title="Cerrar imagen (Escape)"
      >
        <i className="fa fa-times"></i>
      </button>

      {/* Imagen a tamaño completo */}
      <img
        src={lightboxImage}
        alt="Visualización ampliada"
        onClick={(e) => e.stopPropagation()} // Evita cerrar si hace clic en la propia imagen
        style={{
          maxWidth: '92vw',
          maxHeight: '88vh',
          objectFit: 'contain',
          borderRadius: '8px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
          cursor: 'default',
          animation: 'fbScaleIn 0.2s ease'
        }}
      />
    </div>
  );
}
