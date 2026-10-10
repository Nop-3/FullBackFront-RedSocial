import React, { useState } from 'react';

export default function AlertNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
      <button
        onClick={() => setVisible(false)}
        className="w3-button w3-theme-l3 w3-display-topright"
        aria-label="Cerrar notificación"
      >
        <i className="fa fa-remove"></i>
      </button>
      <p><strong>¡Hola!</strong></p>
      <p>Varias personas han visitado tu perfil recientemente. Descubre quiénes son.</p>
    </div>
  );
}
