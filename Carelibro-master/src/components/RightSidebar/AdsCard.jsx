import React from 'react';
import { useSocial } from '../../context/SocialContext';

export default function AdsCard() {
  const { openLightbox } = useSocial();

  return (
    <div className="w3-card w3-round w3-white w3-padding-16 w3-center" style={{ overflow: 'hidden' }}>
      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#65676b', fontWeight: 700, letterSpacing: '0.5px' }}>
        COMUNIDAD CARELIBRO
      </p>
      <div style={{ padding: '0 8px' }}>
        <img
          src="https://www.w3schools.com/w3images/nature.jpg"
          alt="CareLibro"
          style={{ width: '100%', borderRadius: '8px', cursor: 'pointer', objectFit: 'cover' }}
          onClick={() => openLightbox('https://www.w3schools.com/w3images/nature.jpg')}
          title="Haz clic para ampliar imagen"
        />
      </div>
      <p style={{ fontSize: '12px', color: '#65676b', margin: '8px 12px 0 12px' }}>
        ¡Conéctate desde cualquier dispositivo y comparte tus mejores momentos!
      </p>
    </div>
  );
}
