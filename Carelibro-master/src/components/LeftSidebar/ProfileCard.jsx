import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocial } from '../../context/SocialContext';
import EditProfileModal from './EditProfileModal';

export default function ProfileCard() {
  const { currentUser, openLightbox } = useSocial();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <h4 className="w3-center" style={{ fontWeight: 600 }}>{currentUser.name}</h4>
          <p className="w3-center">
            <img
              src={currentUser.avatar}
              className="w3-circle"
              style={{
                height: '106px',
                width: '106px',
                objectFit: 'cover',
                cursor: 'pointer',
                border: '2px solid #e4e6eb'
              }}
              alt={`Avatar de ${currentUser.name}`}
              onClick={() => openLightbox(currentUser.avatar)}
              title="Haz clic para ver foto en pantalla completa"
            />
          </p>
          <hr />
          <p>
            <i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>
            {currentUser.role}
          </p>
          <p>
            <i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
            {currentUser.location}
          </p>
          <p>
            <i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>
            {currentUser.birthDate}
          </p>

          <Link
            to="/perfil"
            className="w3-button w3-block w3-theme-l4 w3-round w3-margin-top"
            style={{ fontWeight: 600, fontSize: '13px', textDecoration: 'none' }}
          >
            <i className="fa fa-user"></i> Ver perfil completo
          </Link>

          <button
            type="button"
            className="w3-button w3-block w3-light-grey w3-round w3-margin-top"
            onClick={() => setIsEditing(true)}
            style={{ fontWeight: 600, fontSize: '13px' }}
          >
            <i className="fa fa-edit"></i> Editar perfil
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}
