import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';

export default function SettingsPage() {
  const { currentUser, updateProfile } = useSocial();
  const [activeTab, setActiveTab] = useState('general');

  // Estados de Configuración General
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || `${currentUser.username || 'usuario'}@carelibro.com`);
  const [role, setRole] = useState(currentUser.role || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [birthDate, setBirthDate] = useState(currentUser.birthDate || '');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Estados de Privacidad
  const [profileVisibility, setProfileVisibility] = useState('Solo amigos');
  const [requestVisibility, setRequestVisibility] = useState('Todos');
  const [newPassword, setNewPassword] = useState('');

  // Estados de Notificaciones
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifBirthdays, setNotifBirthdays] = useState(false);
  const [notifGroups, setNotifGroups] = useState(true);

  // Guardar Cambios Generales
  const handleSaveGeneral = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      role: role.trim(),
      location: location.trim(),
      birthDate: birthDate.trim()
    });

    setFeedbackMsg('✅ Información general y correo actualizados con éxito.');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  // Guardar Privacidad y Contraseña
  const handleSavePrivacy = (e) => {
    e.preventDefault();
    if (newPassword.trim()) {
      updateProfile({
        password: newPassword.trim(),
        profileVisibility,
        requestVisibility
      });
      setFeedbackMsg('🔒 Contraseña actualizada correctamente. Úsala en tu próximo inicio de sesión.');
      setNewPassword('');
    } else {
      updateProfile({
        profileVisibility,
        requestVisibility
      });
      setFeedbackMsg('🔒 Opciones de privacidad actualizadas.');
    }
    setTimeout(() => setFeedbackMsg(''), 4500);
  };

  // Guardar Notificaciones
  const handleSaveNotifications = (e) => {
    e.preventDefault();
    setFeedbackMsg('🔔 Preferencias de notificación guardadas.');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '980px', marginTop: '24px', padding: '0 16px 40px 16px' }}>
      <div className="w3-card w3-round-large w3-white" style={{ overflow: 'hidden' }}>
        {/* Cabecera */}
        <div className="w3-container w3-padding-16 w3-theme-d2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="fa fa-cogs" style={{ fontSize: '28px' }}></i>
          <div>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: '22px' }}>Configuración de la cuenta</h2>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>Administra tu información, privacidad y preferencias en CareLibro</span>
          </div>
        </div>

        {/* Mensaje de confirmación */}
        {feedbackMsg && (
          <div className="w3-pale-green w3-padding w3-border-green w3-border-left" style={{ margin: '14px 20px 0 20px', borderRadius: '4px', fontSize: '14px', fontWeight: 600 }}>
            {feedbackMsg}
          </div>
        )}

        {/* Barra de pestañas */}
        <div className="w3-bar w3-theme-l4" style={{ display: 'flex' }}>
          <button
            type="button"
            className={`w3-bar-item w3-button ${activeTab === 'general' ? 'w3-theme-d1' : ''}`}
            onClick={() => setActiveTab('general')}
            style={{ fontWeight: 600, flex: 1, padding: '12px' }}
          >
            <i className="fa fa-user w3-margin-right"></i>General
          </button>
          <button
            type="button"
            className={`w3-bar-item w3-button ${activeTab === 'privacidad' ? 'w3-theme-d1' : ''}`}
            onClick={() => setActiveTab('privacidad')}
            style={{ fontWeight: 600, flex: 1, padding: '12px' }}
          >
            <i className="fa fa-lock w3-margin-right"></i>Privacidad
          </button>
          <button
            type="button"
            className={`w3-bar-item w3-button ${activeTab === 'notificaciones' ? 'w3-theme-d1' : ''}`}
            onClick={() => setActiveTab('notificaciones')}
            style={{ fontWeight: 600, flex: 1, padding: '12px' }}
          >
            <i className="fa fa-bell w3-margin-right"></i>Notificaciones
          </button>
        </div>

        {/* Pestaña 1: General */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveGeneral} className="w3-container w3-padding-24">
            <h4 style={{ fontWeight: 700, margin: '0 0 16px 0', color: '#050505' }}>Información personal</h4>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Nombre completo:</label>
              <input
                className="w3-input w3-border w3-round"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Correo electrónico:</label>
              <input
                className="w3-input w3-border w3-round"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Profesión u ocupación:</label>
              <input
                className="w3-input w3-border w3-round"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Ciudad / Ubicación:</label>
              <input
                className="w3-input w3-border w3-round"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Fecha de nacimiento:</label>
              <input
                className="w3-input w3-border w3-round"
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <button type="submit" className="w3-button w3-theme-d2 w3-round" style={{ fontWeight: 600, marginTop: '10px' }}>
              <i className="fa fa-save w3-margin-right"></i>Guardar cambios
            </button>
          </form>
        )}

        {/* Pestaña 2: Privacidad */}
        {activeTab === 'privacidad' && (
          <form onSubmit={handleSavePrivacy} className="w3-container w3-padding-24">
            <h4 style={{ fontWeight: 700, margin: '0 0 16px 0', color: '#050505' }}>Privacidad y seguridad</h4>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>¿Quién puede ver tu perfil y publicaciones?</label>
              <select
                className="w3-select w3-border w3-round"
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
              >
                <option>Todos (Público)</option>
                <option>Solo amigos</option>
                <option>Solo yo (Privado)</option>
              </select>
            </div>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>¿Quién puede enviarte solicitudes de amistad?</label>
              <select
                className="w3-select w3-border w3-round"
                value={requestVisibility}
                onChange={(e) => setRequestVisibility(e.target.value)}
              >
                <option>Todos</option>
                <option>Amigos de amigos</option>
              </select>
            </div>

            <div className="w3-section">
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Cambiar contraseña:</label>
              <input
                className="w3-input w3-border w3-round"
                type="password"
                placeholder="Escribe tu nueva contraseña..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w3-button w3-theme-d2 w3-round" style={{ fontWeight: 600, marginTop: '10px' }}>
              <i className="fa fa-lock w3-margin-right"></i>Actualizar privacidad
            </button>
          </form>
        )}

        {/* Pestaña 3: Notificaciones */}
        {activeTab === 'notificaciones' && (
          <form onSubmit={handleSaveNotifications} className="w3-container w3-padding-24">
            <h4 style={{ fontWeight: 700, margin: '0 0 16px 0', color: '#050505' }}>Preferencias de notificaciones</h4>

            <div className="w3-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                className="w3-check"
                type="checkbox"
                id="notif1"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
              />
              <label htmlFor="notif1" style={{ fontSize: '14px', cursor: 'pointer' }}>Recibir notificaciones por correo electrónico</label>
            </div>

            <div className="w3-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                className="w3-check"
                type="checkbox"
                id="notif2"
                checked={notifMessages}
                onChange={(e) => setNotifMessages(e.target.checked)}
              />
              <label htmlFor="notif2" style={{ fontSize: '14px', cursor: 'pointer' }}>Notificaciones de nuevos mensajes de chat</label>
            </div>

            <div className="w3-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                className="w3-check"
                type="checkbox"
                id="notif3"
                checked={notifBirthdays}
                onChange={(e) => setNotifBirthdays(e.target.checked)}
              />
              <label htmlFor="notif3" style={{ fontSize: '14px', cursor: 'pointer' }}>Recordatorios de cumpleaños de amigos</label>
            </div>

            <div className="w3-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                className="w3-check"
                type="checkbox"
                id="notif4"
                checked={notifGroups}
                onChange={(e) => setNotifGroups(e.target.checked)}
              />
              <label htmlFor="notif4" style={{ fontSize: '14px', cursor: 'pointer' }}>Actividad y novedades en grupos suscritos</label>
            </div>

            <button type="submit" className="w3-button w3-theme-d2 w3-round" style={{ fontWeight: 600, marginTop: '10px' }}>
              <i className="fa fa-bell w3-margin-right"></i>Guardar preferencias
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
