import React, { useState } from 'react';
import { upcomingEvent } from '../../data/initialData';

export default function UpcomingEvents() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w3-card w3-round w3-white w3-center">
      <div className="w3-container">
        <p><strong>Próximos Eventos:</strong></p>
        <img
          src={upcomingEvent.image}
          alt="Bosque y eventos"
          style={{ width: '100%' }}
        />
        <p><strong>{upcomingEvent.title}</strong></p>
        <p>{upcomingEvent.time}</p>
        <p>
          <button
            onClick={() => setShowInfo(prev => !prev)}
            className="w3-button w3-block w3-theme-l4"
          >
            {showInfo ? 'Ocultar' : 'Más Información'}
          </button>
        </p>
        {showInfo && (
          <p className="w3-small w3-pale-yellow w3-padding w3-round">
            ¡Día festivo nacional! Revisa las actividades planificadas para compartir en comunidad.
          </p>
        )}
      </div>
    </div>
  );
}
