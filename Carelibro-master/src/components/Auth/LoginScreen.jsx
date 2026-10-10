import React, { useState, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';

export default function LoginScreen() {
  const { usersList, login, registerUser } = useSocial();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'

  // Estados para nuevo registro
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('');
  const [regLocation, setRegLocation] = useState('');
  const [regBirthDate, setRegBirthDate] = useState('');
  const [regAvatar, setRegAvatar] = useState('https://www.w3schools.com/w3images/avatar2.png');
  const [regError, setRegError] = useState('');

  const avatarInputRef = useRef(null);

  // Manejar subida de foto de perfil desde el PC
  const handleAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setRegAvatar(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Enviar registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError('El nombre completo es obligatorio.');
      return;
    }

    registerUser({
      name: regName.trim(),
      role: regRole.trim() || 'Usuario de CareLibro',
      location: regLocation.trim() || 'No especificada',
      birthDate: regBirthDate.trim() || 'No especificada',
      avatar: regAvatar
    });

    // Limpiar
    setRegName('');
    setRegRole('');
    setRegLocation('');
    setRegBirthDate('');
    setRegError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '980px',
        width: '100%',
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Lado Izquierdo: Presentación con Logo e Imagen Oficial */}
        <div style={{ flex: '1 1 360px', maxWidth: '460px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <h1 style={{ color: '#1877f2', fontSize: '42px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
              CareLibro
            </h1>
          </div>
          <p style={{ fontSize: '18px', lineHeight: 1.45, color: '#1c1e21', margin: '0 0 20px 0' }}>
            Conéctate con tus amigos, comparte tus fotos y vídeos en alta definición y vive la experiencia <strong>CareLibro</strong>.
          </p>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: '#ffffff'
          }}>
            <img
              src="https://www.w3schools.com/w3images/forest.jpg"
              alt="Comunidad CareLibro"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Lado Derecho: Tarjeta de Acceso y Registro */}
        <div style={{
          flex: '1 1 420px',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          {/* Selector de Pestañas (Iniciar Sesión / Crear Cuenta) */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e4e6eb', paddingBottom: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: activeTab === 'login' ? '#e7f3ff' : 'transparent',
                color: activeTab === 'login' ? '#1877f2' : '#65676b',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: activeTab === 'register' ? '#e7f3ff' : 'transparent',
                color: activeTab === 'register' ? '#1877f2' : '#65676b',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Crear Cuenta
            </button>
          </div>

          {/* PESTAÑA 1: INICIAR SESIÓN */}
          {activeTab === 'login' && (
            <div>
              <p style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#65676b' }}>
                Selecciona una cuenta registrada para ingresar al instante:
              </p>

              {/* Lista dinámica de todos los usuarios registrados (incluyendo nuevos) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
                {usersList.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => login(user)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e4e6eb',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      backgroundColor: '#ffffff'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f2f5';
                      e.currentTarget.style.borderColor = '#1877f2';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.borderColor = '#e4e6eb';
                    }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ fontSize: '14px', color: '#050505', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.name}
                      </strong>
                      <span style={{ fontSize: '12px', color: '#65676b', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.role} · {user.location}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#1877f2', fontWeight: 600 }}>Entrar →</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '13px', color: '#65676b' }}>¿No tienes una cuenta aún? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  style={{ background: 'none', border: 'none', color: '#1877f2', fontWeight: 600, cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
                >
                  Regístrate aquí
                </button>
              </div>
            </div>
          )}

          {/* PESTAÑA 2: CREAR CUENTA NUEVA */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              {regError && (
                <div style={{ background: '#ffebe8', color: '#e41e3f', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', marginBottom: '12px', border: '1px solid #f5c2c7' }}>
                  {regError}
                </div>
              )}

              {/* Selector de Foto */}
              <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={regAvatar}
                    alt="Foto de registro"
                    style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1877f2' }}
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      background: '#1877f2',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Subir foto desde tu PC"
                  >
                    <i className="fa fa-camera"></i>
                  </button>
                </div>
                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div style={{ marginTop: '8px' }}>
                  <button
                    type="button"
                    className="w3-button w3-tiny w3-light-grey w3-round"
                    onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
                  >
                    <i className="fa fa-upload"></i> Subir foto de mi PC
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '8px' }}>
                  {[
                    "https://www.w3schools.com/w3images/avatar2.png",
                    "https://www.w3schools.com/w3images/avatar5.png",
                    "https://www.w3schools.com/w3images/avatar6.png"
                  ].map((preset, i) => (
                    <img
                      key={i}
                      src={preset}
                      alt={`Avatar preset ${i}`}
                      onClick={() => setRegAvatar(preset)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: regAvatar === preset ? '2px solid #1877f2' : '1px solid #ccc'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Nombre completo */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#65676b', marginBottom: '3px' }}>
                  Nombre completo: *
                </label>
                <input
                  type="text"
                  required
                  className="w3-input w3-border w3-round"
                  placeholder="Ej: Daniel Castillo"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              {/* Profesión */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#65676b', marginBottom: '3px' }}>
                  Profesión / Ocupación:
                </label>
                <input
                  type="text"
                  className="w3-input w3-border w3-round"
                  placeholder="Ej: Desarrollador React / Estudiante"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                />
              </div>

              {/* Ubicación */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#65676b', marginBottom: '3px' }}>
                  Ciudad y País:
                </label>
                <input
                  type="text"
                  className="w3-input w3-border w3-round"
                  placeholder="Ej: Bogotá, Colombia"
                  value={regLocation}
                  onChange={(e) => setRegLocation(e.target.value)}
                />
              </div>

              {/* Fecha de nacimiento */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#65676b', marginBottom: '3px' }}>
                  Fecha de nacimiento:
                </label>
                <input
                  type="text"
                  className="w3-input w3-border w3-round"
                  placeholder="Ej: 14 de agosto de 1998"
                  value={regBirthDate}
                  onChange={(e) => setRegBirthDate(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w3-button w3-block w3-blue w3-round"
                style={{ fontWeight: 700, padding: '10px', fontSize: '15px' }}
              >
                Registrarme y Entrar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
