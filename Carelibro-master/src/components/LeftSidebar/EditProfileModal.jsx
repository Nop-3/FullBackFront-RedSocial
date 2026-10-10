import React, { useState, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { photoGallery } from '../../data/initialData';

export default function EditProfileModal({ isOpen, onClose }) {
  const { currentUser, updateProfile } = useSocial();

  const [name, setName] = useState(currentUser.name || '');
  const [role, setRole] = useState(currentUser.role || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [birthDate, setBirthDate] = useState(currentUser.birthDate || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [coverPhoto, setCoverPhoto] = useState(currentUser.coverPhoto || 'https://www.w3schools.com/w3images/nature.jpg');
  const [showGallery, setShowGallery] = useState(false);
  const [showCoverGallery, setShowCoverGallery] = useState(false);

  const fileInputRef = useRef(null);
  const coverFileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleAvatarFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target.result);
      setShowGallery(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCoverPhoto(event.target.result);
      setShowCoverGallery(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProfile({
      name: name.trim(),
      role: role.trim() || 'Usuario de CareLibro',
      location: location.trim() || 'No especificada',
      birthDate: birthDate.trim() || 'No especificada',
      avatar: avatar || currentUser.avatar,
      currentUserAvatar: avatar || currentUser.avatar,
      coverPhoto: coverPhoto || currentUser.coverPhoto || 'https://www.w3schools.com/w3images/nature.jpg'
    });

    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          animation: 'fbScaleIn 0.2s ease'
        }}
      >
        {/* Cabecera del modal */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #e4e6eb'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#050505' }}>
            ✏️ Editar Perfil
          </h3>
          <button
            onClick={onClose}
            style={{
              background: '#e4e6eb',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#65676b'
            }}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSave} style={{ padding: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
          {/* Foto de portada */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#65676b', marginBottom: '6px' }}>
              🖼️ Foto de Portada:
            </label>
            <div style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#e4e6eb', border: '1px solid #ddd' }}>
              <img
                src={coverPhoto}
                alt="Vista previa de portada"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => coverFileInputRef.current && coverFileInputRef.current.click()}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fa fa-camera"></i> Cambiar portada
              </button>
            </div>

            <input
              type="file"
              ref={coverFileInputRef}
              onChange={handleCoverFile}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="w3-button w3-small w3-light-grey w3-round"
                onClick={() => coverFileInputRef.current && coverFileInputRef.current.click()}
                style={{ fontSize: '12px' }}
              >
                <i className="fa fa-upload"></i> Subir portada de mi PC
              </button>
              <button
                type="button"
                className="w3-button w3-small w3-light-grey w3-round"
                onClick={() => setShowCoverGallery(prev => !prev)}
                style={{ fontSize: '12px' }}
              >
                <i className="fa fa-image"></i> Elegir de galería
              </button>
            </div>

            {showCoverGallery && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                gap: '8px',
                background: '#f0f2f5',
                padding: '10px',
                borderRadius: '8px',
                marginTop: '8px'
              }}>
                {[
                  "https://www.w3schools.com/w3images/nature.jpg",
                  "https://www.w3schools.com/w3images/lights.jpg",
                  "https://www.w3schools.com/w3images/mountains.jpg",
                  "https://www.w3schools.com/w3images/forest.jpg"
                ].map((cov, idx) => (
                  <img
                    key={idx}
                    src={cov}
                    alt={`Portada ${idx + 1}`}
                    onClick={() => { setCoverPhoto(cov); setShowCoverGallery(false); }}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: coverPhoto === cov ? '2px solid #1877f2' : '1px solid #ccc'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Foto de perfil */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#65676b', marginBottom: '6px' }}>
              👤 Foto de Perfil:
            </label>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={avatar}
                alt="Foto de perfil"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #1877f2',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  background: '#1877f2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}
                title="Cambiar foto de perfil desde el ordenador"
              >
                <i className="fa fa-camera"></i>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarFile}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button
                type="button"
                className="w3-button w3-small w3-light-grey w3-round"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <i className="fa fa-upload"></i> Subir foto de mi PC
              </button>
              <button
                type="button"
                className="w3-button w3-small w3-light-grey w3-round"
                onClick={() => setShowGallery(prev => !prev)}
              >
                <i className="fa fa-image"></i> Elegir de galería
              </button>
            </div>

            {showGallery && (
              <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                background: '#f0f2f5',
                padding: '10px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                {[
                  "https://www.w3schools.com/w3images/avatar1.png",
                  "https://www.w3schools.com/w3images/avatar2.png",
                  "https://www.w3schools.com/w3images/avatar3.png",
                  "https://www.w3schools.com/w3images/avatar4.png",
                  "https://www.w3schools.com/w3images/avatar5.png",
                  "https://www.w3schools.com/w3images/avatar6.png"
                ].map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt={`Avatar ${idx + 1}`}
                    onClick={() => { setAvatar(av); setShowGallery(false); }}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: avatar === av ? '2px solid #1877f2' : '1px solid #ccc'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Campo Nombre */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#65676b', marginBottom: '4px' }}>
              Nombre completo:
            </label>
            <input
              type="text"
              required
              className="w3-input w3-border w3-round"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Campo Profesión / Rol */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#65676b', marginBottom: '4px' }}>
              Profesión / Especialidad:
            </label>
            <input
              type="text"
              className="w3-input w3-border w3-round"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ej: Diseñador UI / Ingeniero"
            />
          </div>

          {/* Campo Ubicación */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#65676b', marginBottom: '4px' }}>
              Ciudad y País:
            </label>
            <input
              type="text"
              className="w3-input w3-border w3-round"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Londres, Reino Unido"
            />
          </div>

          {/* Campo Fecha de Nacimiento */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#65676b', marginBottom: '4px' }}>
              Fecha de nacimiento:
            </label>
            <input
              type="text"
              className="w3-input w3-border w3-round"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="Ej: 1 de abril de 1988"
            />
          </div>

          {/* Botones Guardar / Cancelar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="w3-button w3-light-grey w3-round"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w3-button w3-blue w3-round"
              style={{ fontWeight: 600 }}
            >
              <i className="fa fa-save"></i> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
