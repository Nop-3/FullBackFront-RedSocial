import React from 'react';
import { useSocial } from '../../context/SocialContext';

export default function FriendRequest() {
  const {
    currentUser,
    usersList,
    acceptFriendRequest,
    declineFriendRequest
  } = useSocial();

  const receivedIds = currentUser.requestsReceived || [];
  const pendingRequests = usersList.filter(u => receivedIds.includes(u.id));

  return (
    <div id="solicitudes" className="w3-card w3-round w3-white w3-center">
      <div className="w3-container">
        <p><strong>Solicitud de Amistad</strong></p>

        {pendingRequests.length === 0 ? (
          <p className="w3-text-grey" style={{ fontSize: '13px', margin: '14px 0' }}>
            <i className="fa fa-users"></i> No tienes solicitudes pendientes.
          </p>
        ) : (
          pendingRequests.map(req => (
            <div key={req.id} style={{ marginBottom: '16px' }}>
              <img
                src={req.avatar}
                alt={`Avatar de ${req.name}`}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '8px'
                }}
              />
              <br />
              <strong style={{ fontSize: '14px', color: '#050505', display: 'block' }}>{req.name}</strong>
              <span style={{ fontSize: '12px', color: '#65676b' }}>{req.role}</span>

              <div className="w3-row w3-margin-top" style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => acceptFriendRequest(req.id)}
                    className="w3-button w3-block w3-blue w3-round"
                    style={{ fontWeight: 600, fontSize: '13px', padding: '6px' }}
                    title="Aceptar solicitud de amistad"
                  >
                    <i className="fa fa-check"></i> Aceptar
                  </button>
                </div>
                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => declineFriendRequest(req.id)}
                    className="w3-button w3-block w3-light-grey w3-round"
                    style={{ fontSize: '13px', padding: '6px' }}
                    title="Rechazar solicitud"
                  >
                    <i className="fa fa-remove"></i> Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
