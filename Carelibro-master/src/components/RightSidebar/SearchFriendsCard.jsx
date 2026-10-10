import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import useUserSearch from '../../hooks/useUserSearch';
import { matchesUserSearch } from '../../utils/userSearch';

export default function SearchFriendsCard() {
  const { currentUser, usersList, sendFriendRequest } = useSocial();
  const [filterText, setFilterText] = useState('');
  const remoteSearch = useUserSearch(filterText);

  // Combina las sugerencias locales con los resultados del directorio del backend.
  const usersByIdentity = new Map();
  [...usersList, ...remoteSearch.users].forEach(user => {
    const identity = user.email ? user.email.toLowerCase() : String(user.id);
    usersByIdentity.set(identity, user);
  });
  const otherUsers = [...usersByIdentity.values()].filter(u => u.id !== currentUser.id);

  const displayedUsers = filterText.trim()
    ? otherUsers.filter(user => matchesUserSearch(user, filterText))
    : otherUsers.slice(0, 4); // Muestra 4 sugerencias si no hay búsqueda

  return (
    <div className="w3-card w3-round w3-white">
      <div className="w3-container" style={{ padding: '16px' }}>
        <p style={{ margin: '0 0 10px 0' }}>
          <strong><i className="fa fa-user-plus w3-text-blue"></i> Conectar con Personas</strong>
        </p>

        {/* Input de búsqueda local en el panel */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            type="text"
            className="w3-input w3-border w3-round"
            placeholder="Buscar por nombre o ciudad..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ fontSize: '13px', padding: '6px 10px' }}
          />
          {filterText && (
            <button
              type="button"
              onClick={() => setFilterText('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer'
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          )}
        </div>

        {/* Lista de usuarios encontrados */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {remoteSearch.loading && (
            <p className="w3-text-grey w3-small" style={{ margin: '4px 0' }} role="status">
              Buscando en CareLibro...
            </p>
          )}
          {remoteSearch.error && (
            <p className="w3-text-red w3-small" style={{ margin: '4px 0' }} role="alert">
              No se pudo consultar el backend: {remoteSearch.error}
            </p>
          )}
          {displayedUsers.length === 0 ? (
            <p className="w3-text-grey w3-small" style={{ margin: '8px 0', textAlign: 'center' }}>
              No se encontraron usuarios con "{filterText}".
            </p>
          ) : (
            displayedUsers.map(user => {
              const isFriend = (currentUser.friends || []).includes(user.id);
              const isSent = (currentUser.requestsSent || []).includes(user.id);
              const isReceived = (currentUser.requestsReceived || []).includes(user.id);

              return (
                <div
                  key={user.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #f0f2f5'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <strong style={{
                        fontSize: '13px',
                        color: '#050505',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {user.name}
                      </strong>
                      <span style={{
                        fontSize: '11px',
                        color: '#65676b',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginLeft: '6px' }}>
                    {isFriend ? (
                      <span className="w3-tag w3-green w3-round w3-tiny">
                        ✓ Amigos
                      </span>
                    ) : isReceived ? (
                      <span className="w3-tag w3-amber w3-round w3-tiny" style={{ color: '#000' }} title="Te envió solicitud">
                        Pendiente
                      </span>
                    ) : isSent ? (
                      <span className="w3-tag w3-light-grey w3-round w3-tiny" style={{ color: '#65676b' }}>
                        Enviada
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => sendFriendRequest(user.id, user)}
                        className="w3-button w3-blue w3-round"
                        style={{ padding: '4px 8px', fontSize: '11px', fontWeight: 600 }}
                        title="Enviar solicitud de amistad"
                      >
                        + Agregar
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
