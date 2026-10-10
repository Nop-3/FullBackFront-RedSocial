import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { photoGallery } from '../../data/initialData';
import { useSocial } from '../../context/SocialContext';

export default function AccordionMenu() {
  const { openLightbox } = useSocial();
  const [openSections, setOpenSections] = useState({
    groups: true,
    events: true,
    photos: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w3-card w3-round">
      <div className="w3-white">
        {/* Mis Grupos */}
        <button
          onClick={() => toggleSection('groups')}
          className={`w3-button w3-block w3-theme-l1 w3-left-align ${
            openSections.groups ? 'w3-theme-d1' : ''
          }`}
        >
          <i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> Mis Grupos
        </button>
        <div
          className={`w3-container ${
            openSections.groups ? 'w3-show' : 'w3-hide'
          }`}
        >
          <p style={{ margin: '8px 0 4px 0' }}>Desarrollo Web, React y Diseño UI/UX...</p>
          <Link to="/grupos" className="w3-text-theme w3-small" style={{ fontWeight: 600, display: 'inline-block', marginBottom: '8px' }}>
            Explorar todos los grupos →
          </Link>
        </div>

        {/* Mis Eventos */}
        <button
          onClick={() => toggleSection('events')}
          className={`w3-button w3-block w3-theme-l1 w3-left-align ${
            openSections.events ? 'w3-theme-d1' : ''
          }`}
        >
          <i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> Mis Eventos
        </button>
        <div
          className={`w3-container ${
            openSections.events ? 'w3-show' : 'w3-hide'
          }`}
        >
          <p>Conferencia de tecnología este viernes...</p>
        </div>

        {/* Mis Fotos */}
        <button
          onClick={() => toggleSection('photos')}
          className={`w3-button w3-block w3-theme-l1 w3-left-align ${
            openSections.photos ? 'w3-theme-d1' : ''
          }`}
        >
          <i className="fa fa-users fa-fw w3-margin-right"></i> Mis Fotos
        </button>
        <div
          className={`w3-container ${
            openSections.photos ? 'w3-show' : 'w3-hide'
          }`}
        >
          <div className="w3-row-padding">
            <br />
            {photoGallery.map((imgUrl, index) => (
              <div key={index} className="w3-half">
                <img
                  src={imgUrl}
                  style={{ width: '100%', cursor: 'pointer', borderRadius: '4px' }}
                  className="w3-margin-bottom"
                  alt={`Fotografía ${index + 1}`}
                  onClick={() => openLightbox(imgUrl)}
                  title="Haz clic para ver en pantalla completa"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
