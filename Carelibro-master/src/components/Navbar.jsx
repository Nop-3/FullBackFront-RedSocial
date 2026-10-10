import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSocial } from '../context/SocialContext';
import { notificationsList } from '../data/initialData';
import useUserSearch from '../hooks/useUserSearch';
import { matchesUserSearch } from '../utils/userSearch';

export default function Navbar() {
  const {
    currentUser,
    usersList,
    logout,
    sendFriendRequest,
    unreadMessagesCount,
    unreadMessagesList,
    notifications,
    clearNotifications
  } = useSocial();

  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const searchContainerRef = useRef(null);
  const accountRef = useRef(null);
  const notifRef = useRef(null);
  const remoteSearch = useUserSearch(searchTerm);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccountDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  // Busca en los usuarios locales y en el directorio del backend mientras se escribe.
  const usersByIdentity = new Map();
  [...usersList, ...remoteSearch.users].forEach(user => {
    const identity = user.email ? user.email.toLowerCase() : String(user.id);
    usersByIdentity.set(identity, user);
  });
  const searchResults = searchTerm.trim()
    ? [...usersByIdentity.values()].filter(user => matchesUserSearch(user, searchTerm))
    : [];

  const requestsReceivedCount = currentUser.requestsReceived ? currentUser.requestsReceived.length : 0;
  const isJuanaFriend = (currentUser.friends || []).includes('user-3');
  // Si Juana de Arco no es amiga aceptada, se excluyen notificaciones de interacción de ella
  const filteredNotifs = (notifications || []).filter(notif => {
    if (notif.includes('Juana') && !isJuanaFriend) {
      return false;
    }
    return true;
  });
  const totalNotifs = filteredNotifs.length + requestsReceivedCount + (unreadMessagesCount || 0);

  return (
    <>
      {/* Barra de navegación superior fija */}
      <header className="w3-top" style={{ zIndex: 9000, overflow: 'visible' }}>
        <div
          className="w3-bar w3-theme-d2 w3-left-align w3-large"
          style={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'visible',
            position: 'relative',
            padding: '0 8px'
          }}
        >
          {/* Botón hamburguesa móvil */}
          <button
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={toggleNav}
            aria-label="Abrir menú de navegación"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* Marca textual CareLibro */}
          <Link
            to="/"
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w3-bar-item w3-button w3-padding-large w3-hover-white"
            style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', cursor: 'pointer' }}
            title="CareLibro - Ir al Inicio"
            aria-label="Ir al inicio"
          >
            <span style={{ fontSize: '1.15rem', letterSpacing: '0.4px', fontWeight: 700, cursor: 'pointer', color: '#fff' }}>CareLibro</span>
          </Link>

          {/* Buscador de personas en tiempo real (Con overflow visible garantizado) */}
          <div
            ref={searchContainerRef}
            style={{
              position: 'relative',
              margin: '0 12px',
              flex: '0 1 360px',
              overflow: 'visible'
            }}
          >
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Buscar personas, amigos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setShowSearchDropdown(true);
                  }
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w3-input w3-round-xxlarge"
                style={{
                  padding: '7px 32px 7px 16px',
                  fontSize: '13px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  outline: 'none',
                  color: '#050505',
                  width: '100%',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setShowSearchDropdown(false);
                  }}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#65676b',
                    fontSize: '13px'
                  }}
                >
                  <i className="fa fa-times"></i>
                </button>
              )}
            </div>

            {/* Desplegable de resultados garantizado sin recortes de overflow */}
            {showSearchDropdown && searchTerm.trim() && (
              <div
                style={{
                  position: 'absolute',
                  top: '42px',
                  left: 0,
                  width: '100%',
                  minWidth: '340px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25)',
                  borderRadius: '10px',
                  zIndex: 99999,
                  maxHeight: '360px',
                  overflowY: 'auto',
                  border: '1px solid #ced0d4',
                  animation: 'fbFadeIn 0.15s ease'
                }}
              >
                <div style={{ padding: '8px 14px', fontSize: '12px', fontWeight: 700, color: '#65676b', borderBottom: '1px solid #f0f2f5' }}>
                  Resultados para "{searchTerm}" ({searchResults.length})
                </div>

                {remoteSearch.loading && (
                  <div style={{ padding: '8px 14px', color: '#65676b', fontSize: '12px' }} role="status">
                    Buscando en CareLibro...
                  </div>
                )}
                {remoteSearch.error && (
                  <div className="w3-pale-red" style={{ padding: '8px 14px', color: '#8a1c1c', fontSize: '12px' }} role="alert">
                    No se pudo consultar el backend: {remoteSearch.error}
                  </div>
                )}

                {searchResults.length === 0 ? (
                  <div style={{ padding: '20px 14px', textAlign: 'center', color: '#65676b', fontSize: '13px' }}>
                    <i className="fa fa-user-times" style={{ fontSize: '24px', marginBottom: '6px', display: 'block' }}></i>
                    No se encontraron usuarios con ese nombre.
                  </div>
                ) : (
                  searchResults.map((user) => {
                    const isCurrent = user.id === currentUser.id;
                    const isFriend = (currentUser.friends || []).includes(user.id);
                    const isRequestSent = (currentUser.requestsSent || []).includes(user.id);
                    const isRequestReceived = (currentUser.requestsReceived || []).includes(user.id);

                    return (
                      <div
                        key={user.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderBottom: '1px solid #f0f2f5',
                          transition: 'background 0.15s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f7f8fa'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <strong style={{
                              fontSize: '14px',
                              color: '#050505',
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {user.name}
                            </strong>
                            <span style={{
                              fontSize: '12px',
                              color: '#65676b',
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {user.role} · {user.location}
                            </span>
                          </div>
                        </div>

                        <div style={{ marginLeft: '8px' }}>
                          {isCurrent ? (
                            <span style={{ fontSize: '12px', color: '#1877f2', fontWeight: 700 }}>(Tú)</span>
                          ) : isFriend ? (
                            <span className="w3-tag w3-green w3-round w3-small" style={{ fontWeight: 600 }}>
                              ✓ Amigos
                            </span>
                          ) : isRequestReceived ? (
                            <span className="w3-tag w3-amber w3-round w3-small" style={{ fontWeight: 600, color: '#000' }}>
                              Solicitud recibida
                            </span>
                          ) : isRequestSent ? (
                            <span className="w3-tag w3-light-grey w3-round w3-small" style={{ color: '#65676b' }}>
                              Enviada
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="w3-button w3-small w3-blue w3-round"
                              onClick={() => sendFriendRequest(user.id, user)}
                              style={{ fontWeight: 600, padding: '4px 10px' }}
                            >
                              <i className="fa fa-user-plus"></i> Agregar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}></div>

          {/* Iconos de Navegación de Páginas con NavLink (Nota 4.5) */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `w3-bar-item w3-button w3-hide-small w3-padding-large ${isActive ? 'w3-theme-d4' : 'w3-hover-white'}`
            }
            style={{ textDecoration: 'none' }}
            title="Inicio / Feed"
          >
            <i className="fa fa-home"></i>
          </NavLink>

          <NavLink
            to="/perfil"
            className={({ isActive }) =>
              `w3-bar-item w3-button w3-hide-small w3-padding-large ${isActive ? 'w3-theme-d4' : 'w3-hover-white'}`
            }
            style={{ textDecoration: 'none' }}
            title="Mi Perfil"
          >
            <i className="fa fa-user"></i>
          </NavLink>

          <NavLink
            to="/mensajes"
            className={({ isActive }) =>
              `w3-bar-item w3-button w3-hide-small w3-padding-large ${isActive ? 'w3-theme-d4' : 'w3-hover-white'}`
            }
            style={{ textDecoration: 'none', position: 'relative' }}
            title="Mensajes y Chat"
          >
            <i className="fa fa-envelope"></i>
            {unreadMessagesCount > 0 && (
              <span
                className="w3-badge w3-small w3-red"
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  animation: 'pulse 1.5s infinite'
                }}
              >
                {unreadMessagesCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/grupos"
            className={({ isActive }) =>
              `w3-bar-item w3-button w3-hide-small w3-padding-large ${isActive ? 'w3-theme-d4' : 'w3-hover-white'}`
            }
            style={{ textDecoration: 'none' }}
            title="Grupos"
          >
            <i className="fa fa-users"></i>
          </NavLink>

          <NavLink
            to="/configuracion"
            className={({ isActive }) =>
              `w3-bar-item w3-button w3-hide-small w3-padding-large ${isActive ? 'w3-theme-d4' : 'w3-hover-white'}`
            }
            style={{ textDecoration: 'none' }}
            title="Configuración de la cuenta"
          >
            <i className="fa fa-cog"></i>
          </NavLink>

          {/* Menú de Notificaciones */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifDropdown(prev => !prev)}
              className="w3-button w3-padding-large w3-hover-white"
              title="Notificaciones y mensajes"
              style={{
                position: 'relative',
                color: '#ffffff',
                backgroundColor: showNotifDropdown ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              <i className="fa fa-bell" style={{ color: '#ffffff' }}></i>
              {totalNotifs > 0 && (
                <span
                  className="w3-badge w3-small w3-green"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '6px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {totalNotifs}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '52px',
                  right: 0,
                  width: '320px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.22)',
                  borderRadius: '10px',
                  zIndex: 99999,
                  border: '1px solid #e4e6eb',
                  overflow: 'hidden',
                  color: '#050505'
                }}
              >
                <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', backgroundColor: '#ffffff' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#050505' }}>Notificaciones y Avisos</span>
                  {(filteredNotifs.length > 0 || unreadMessagesCount > 0) && (
                    <button
                      type="button"
                      onClick={clearNotifications}
                      className="w3-button w3-small w3-round w3-light-grey"
                      style={{ fontSize: '11px', padding: '4px 8px', color: '#65676b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                      title="Borrar todas las notificaciones"
                    >
                      <i className="fa fa-trash"></i> Borrar notificaciones
                    </button>
                  )}
                </div>

                {/* Alerta de mensajes nuevos sin leer */}
                {unreadMessagesCount > 0 && (
                  <div
                    onClick={() => {
                      setShowNotifDropdown(false);
                      navigate('/mensajes');
                    }}
                    style={{
                      fontSize: '13px',
                      padding: '12px 16px',
                      backgroundColor: '#e7f3ff',
                      color: '#050505',
                      borderBottom: '1px solid #d0e4ff',
                      lineHeight: '1.4',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fa fa-envelope" style={{ color: '#1877f2', marginRight: '6px' }}></i>
                    <span style={{ color: '#050505' }}>
                      Tienes <strong>{unreadMessagesCount}</strong> mensaje(s) nuevo(s) sin leer. <span className="w3-text-blue" style={{ fontWeight: 600 }}>Ver chat →</span>
                    </span>
                  </div>
                )}

                {requestsReceivedCount > 0 && (
                  <div
                    style={{
                      fontSize: '13px',
                      padding: '12px 16px',
                      backgroundColor: '#fef7e6',
                      color: '#050505',
                      borderBottom: '1px solid #f9e2ae',
                      lineHeight: '1.4'
                    }}
                  >
                    <i className="fa fa-user-plus" style={{ color: '#f59e0b', marginRight: '6px' }}></i>
                    <span style={{ color: '#050505' }}>
                      Tienes <strong>{requestsReceivedCount}</strong> solicitud(es) de amistad pendiente(s).
                    </span>
                  </div>
                )}

                {filteredNotifs.length === 0 && requestsReceivedCount === 0 && unreadMessagesCount === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#65676b', fontSize: '13px' }}>
                    No tienes notificaciones nuevas.
                  </div>
                ) : (
                  filteredNotifs.map((notif, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #f0f2f5',
                        fontSize: '13px',
                        color: '#050505',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f2f5';
                        e.currentTarget.style.color = '#050505';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.color = '#050505';
                      }}
                    >
                      <i className="fa fa-circle" style={{ fontSize: '8px', marginRight: '8px', color: '#1877f2' }}></i>
                      <span style={{ color: '#050505' }}>{notif}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Menú de Mi Perfil y Cerrar Sesión */}
          <div ref={accountRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowAccountDropdown(prev => !prev)}
              className="w3-button w3-padding-large w3-hover-white"
              title="Perfil"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff',
                backgroundColor: showAccountDropdown ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              <img
                src={currentUser.avatar}
                className="w3-circle"
                style={{
                  height: '28px',
                  width: '28px',
                  objectFit: 'cover',
                  border: '1.5px solid rgba(255,255,255,0.85)'
                }}
                alt="Avatar"
              />
              <span
                className="w3-hide-small"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                Perfil
              </span>
              <i className="fa fa-caret-down" style={{ fontSize: '12px', color: '#ffffff' }}></i>
            </button>

            {showAccountDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '52px',
                  right: 0,
                  width: '240px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.22)',
                  borderRadius: '10px',
                  zIndex: 99999,
                  border: '1px solid #e4e6eb',
                  overflow: 'hidden'
                }}
              >
                <div style={{ padding: '14px', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={currentUser.avatar}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    alt="Perfil"
                  />
                  <div>
                    <strong style={{ fontSize: '14px', color: '#050505', display: 'block' }}>{currentUser.name}</strong>
                    <span style={{ fontSize: '12px', color: '#65676b' }}>{currentUser.role}</span>
                  </div>
                </div>

                <Link
                  to="/perfil"
                  onClick={() => setShowAccountDropdown(false)}
                  className="w3-button w3-hover-light-grey"
                  style={{
                    textAlign: 'left',
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#050505',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <i className="fa fa-user" style={{ color: '#1877f2', fontSize: '16px' }}></i>
                  <span style={{ color: '#050505', fontWeight: 600 }}>Ver mi perfil</span>
                </Link>

                <Link
                  to="/configuracion"
                  onClick={() => setShowAccountDropdown(false)}
                  className="w3-button w3-hover-light-grey"
                  style={{
                    textAlign: 'left',
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#050505',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <i className="fa fa-cog" style={{ color: '#1877f2', fontSize: '16px' }}></i>
                  <span style={{ color: '#050505', fontWeight: 600 }}>Configuración</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setShowAccountDropdown(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w3-button w3-hover-pale-red"
                  style={{
                    color: '#e41e3f',
                    fontWeight: 600,
                    fontSize: '14px',
                    textAlign: 'left',
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #f0f2f5'
                  }}
                >
                  <i className="fa fa-sign-out" style={{ color: '#e41e3f', fontSize: '16px' }}></i>
                  <span style={{ color: '#e41e3f' }}>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menú de navegación en pantallas pequeñas con Link */}
      <div
        id="navDemo"
        className={`w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large ${
          isNavOpen ? 'w3-show' : ''
        }`}
        style={{ marginTop: '51px' }}
      >
        <Link to="/" onClick={() => setIsNavOpen(false)} className="w3-bar-item w3-button w3-padding-large">
          <i className="fa fa-home w3-margin-right"></i>Inicio
        </Link>
        <Link to="/perfil" onClick={() => setIsNavOpen(false)} className="w3-bar-item w3-button w3-padding-large">
          <i className="fa fa-user w3-margin-right"></i>Mi Perfil ({currentUser.name})
        </Link>
        <Link to="/mensajes" onClick={() => setIsNavOpen(false)} className="w3-bar-item w3-button w3-padding-large">
          <i className="fa fa-envelope w3-margin-right"></i>Mensajes {unreadMessagesCount > 0 && <span className="w3-badge w3-red w3-small" style={{ marginLeft: '8px' }}>{unreadMessagesCount}</span>}
        </Link>
        <Link to="/grupos" onClick={() => setIsNavOpen(false)} className="w3-bar-item w3-button w3-padding-large">
          <i className="fa fa-users w3-margin-right"></i>Grupos
        </Link>
        <Link to="/configuracion" onClick={() => setIsNavOpen(false)} className="w3-bar-item w3-button w3-padding-large">
          <i className="fa fa-cog w3-margin-right"></i>Configuración
        </Link>
        <button
          type="button"
          onClick={() => {
            setIsNavOpen(false);
            logout();
            navigate('/login');
          }}
          className="w3-bar-item w3-button w3-padding-large"
          style={{ color: '#ffb3b3', textAlign: 'left', width: '100%', borderTop: '1px solid rgba(255,255,255,0.2)' }}
        >
          <i className="fa fa-sign-out w3-margin-right"></i>Cerrar sesión
        </button>
      </div>
    </>
  );
}
