import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import PostCard from '../components/Feed/PostCard';
import CreatePost from '../components/Feed/CreatePost';
import EditProfileModal from '../components/LeftSidebar/EditProfileModal';
import UpcomingEvents from '../components/RightSidebar/UpcomingEvents';
import AdsCard from '../components/RightSidebar/AdsCard';
import { photoGallery } from '../data/initialData';

export default function ProfilePage() {
  const { currentUser, usersList, posts, openLightbox } = useSocial();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  // Filtrar publicaciones del usuario actual o mostrar sus aportes
  const userPosts = posts.filter(
    (p) => p.author === currentUser.name || p.author === 'Mi Perfil' || p.isShared
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1360px', marginTop: '16px', padding: '0 16px 40px 16px' }}>
      {/* Banner / Portada Superior */}
      <div className="w3-card w3-round-xlarge w3-white w3-margin-bottom" style={{ overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: '220px', backgroundColor: '#1877f2' }}>
          <img
            src={currentUser.coverPhoto || "https://www.w3schools.com/w3images/nature.jpg"}
            alt={`Portada de ${currentUser.name}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => openLightbox(currentUser.coverPhoto || "https://www.w3schools.com/w3images/nature.jpg")}
            title="Clic para ampliar foto de portada en pantalla completa"
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              backgroundColor: 'rgba(0,0,0,0.65)',
              color: '#fff',
              padding: '7px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              zIndex: 2
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            title="Cambiar foto de portada"
          >
            <i className="fa fa-camera"></i> Editar portada
          </div>
        </div>

        <div className="w3-container w3-padding-16" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ marginTop: '-60px', position: 'relative' }}>
            <img
              src={currentUser.avatar}
              alt={`Avatar de ${currentUser.name}`}
              className="w3-circle"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                border: '4px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                backgroundColor: '#fff'
              }}
              onClick={() => openLightbox(currentUser.avatar)}
              title="Clic para ampliar foto"
            />
          </div>

          <div style={{ flex: '1 1 280px' }}>
            <h2 style={{ margin: '0 0 4px 0', fontWeight: 800, color: '#050505' }}>
              {currentUser.name}
              <span className="w3-opacity w3-medium" style={{ marginLeft: '10px', fontWeight: 400 }}>
                @{currentUser.username || 'usuario'}
              </span>
            </h2>
            <p style={{ margin: 0, color: '#65676b', fontSize: '14px' }}>
              <i className="fa fa-briefcase w3-margin-right"></i>
              {currentUser.role || 'Miembro de CareLibro'} · <strong>1.4k seguidores</strong> · <strong>420 siguiendo</strong>
            </p>
          </div>

          <div>
            <button
              type="button"
              className="w3-button w3-theme-d2 w3-round-large"
              onClick={() => setIsEditing(true)}
              style={{ fontWeight: 600, fontSize: '14px', color: '#ffffff' }}
            >
              <i className="fa fa-pencil"></i> Editar información
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación del Perfil (Siempre visibles y con alto contraste) */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '4px 16px 0 16px',
            borderTop: '1px solid #e4e6eb',
            backgroundColor: '#ffffff',
            flexWrap: 'wrap'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'posts' ? '3px solid #1877f2' : '3px solid transparent',
              color: activeTab === 'posts' ? '#1877f2' : '#4b5563',
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fa fa-newspaper-o" style={{ color: activeTab === 'posts' ? '#1877f2' : '#65676b' }}></i>
            <span>Publicaciones</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'info' ? '3px solid #1877f2' : '3px solid transparent',
              color: activeTab === 'info' ? '#1877f2' : '#4b5563',
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fa fa-info-circle" style={{ color: activeTab === 'info' ? '#1877f2' : '#65676b' }}></i>
            <span>Información</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('friends')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'friends' ? '3px solid #1877f2' : '3px solid transparent',
              color: activeTab === 'friends' ? '#1877f2' : '#4b5563',
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fa fa-users" style={{ color: activeTab === 'friends' ? '#1877f2' : '#65676b' }}></i>
            <span>Amigos ({(currentUser.friends || []).length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'photos' ? '3px solid #1877f2' : '3px solid transparent',
              color: activeTab === 'photos' ? '#1877f2' : '#4b5563',
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fa fa-camera" style={{ color: activeTab === 'photos' ? '#1877f2' : '#65676b' }}></i>
            <span>Fotos</span>
          </button>
        </div>
      </div>

      {/* Vista según la pestaña activa */}
      {activeTab === 'posts' && (
        <div className="w3-row-padding" style={{ margin: '0 -8px' }}>
          {/* Columna Izquierda: Información personal y Fotos */}
          <div className="w3-col m4 l3 w3-margin-bottom">
            <div className="w3-card w3-round w3-white w3-padding-16">
              <div className="w3-container">
                <h5 style={{ fontWeight: 700, margin: '0 0 12px 0', color: '#050505' }}>
                  <i className="fa fa-info-circle w3-text-theme w3-margin-right"></i>Detalles
                </h5>
                <p style={{ fontSize: '13.5px', margin: '8px 0', color: '#050505' }}>
                  <i className="fa fa-briefcase fa-fw w3-text-theme w3-margin-right"></i>
                  {currentUser.role}
                </p>
                <p style={{ fontSize: '13.5px', margin: '8px 0', color: '#050505' }}>
                  <i className="fa fa-home fa-fw w3-text-theme w3-margin-right"></i>
                  {currentUser.location}
                </p>
                <p style={{ fontSize: '13.5px', margin: '8px 0', color: '#050505' }}>
                  <i className="fa fa-birthday-cake fa-fw w3-text-theme w3-margin-right"></i>
                  {currentUser.birthDate}
                </p>
                <p style={{ fontSize: '13.5px', margin: '8px 0', color: '#050505' }}>
                  <i className="fa fa-users fa-fw w3-text-theme w3-margin-right"></i>
                  Amigos: <strong>{(currentUser.friends || []).length}</strong>
                </p>
                <hr />
                <button
                  type="button"
                  className="w3-button w3-block w3-light-grey w3-round"
                  onClick={() => setIsEditing(true)}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#050505' }}
                >
                  <i className="fa fa-edit"></i> Editar detalles
                </button>
              </div>
            </div>

            <br />

            {/* Fotos destacadas */}
            <div className="w3-card w3-round w3-white w3-padding-16">
              <div className="w3-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h5 style={{ fontWeight: 700, margin: 0, color: '#050505' }}>
                    <i className="fa fa-camera w3-text-theme w3-margin-right"></i>Fotos
                  </h5>
                  <span
                    className="w3-text-blue"
                    style={{ fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => setActiveTab('photos')}
                  >
                    Ver todas
                  </span>
                </div>
                <div className="w3-row-padding" style={{ margin: '0 -4px' }}>
                  {photoGallery.slice(0, 6).map((imgUrl, idx) => (
                    <div key={idx} className="w3-third" style={{ padding: '4px' }}>
                      <img
                        src={imgUrl}
                        alt={`Foto ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '75px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                        onClick={() => openLightbox(imgUrl)}
                        title="Clic para ampliar"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna Central: Publicar estado y Feed del Perfil */}
          <div className="w3-col m8 l6 w3-margin-bottom">
            <CreatePost />

            <div style={{ marginTop: '20px' }}>
              <h5 style={{ fontWeight: 700, margin: '0 0 16px 0', color: '#050505' }}>
                <i className="fa fa-newspaper-o w3-text-theme w3-margin-right"></i>Publicaciones de {currentUser.name}
              </h5>

              {userPosts.length === 0 ? (
                <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
                  <i className="fa fa-pencil-square-o w3-text-theme w3-xxlarge" style={{ marginBottom: '10px' }}></i>
                  <h4 style={{ color: '#050505' }}>Aún no has publicado nada</h4>
                  <p style={{ color: '#65676b' }}>¡Escribe tu primer post arriba para que tus amigos lo vean!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Eventos y Anuncios */}
          <div className="w3-col m12 l3">
            <UpcomingEvents />
            <br />
            <AdsCard />
          </div>
        </div>
      )}

      {/* Pestaña: Información completa */}
      {activeTab === 'info' && (
        <div className="w3-card w3-round w3-white w3-padding-24">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0, fontWeight: 700, color: '#050505' }}>
              <i className="fa fa-info-circle w3-text-theme w3-margin-right"></i>Información Personal y de Contacto
            </h4>
            <button
              type="button"
              className="w3-button w3-theme-d2 w3-round"
              onClick={() => setIsEditing(true)}
              style={{ fontWeight: 600, color: '#ffffff' }}
            >
              <i className="fa fa-pencil"></i> Editar información
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
              <strong style={{ display: 'block', color: '#65676b', fontSize: '12px', textTransform: 'uppercase' }}>Nombre completo</strong>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#050505' }}>{currentUser.name}</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
              <strong style={{ display: 'block', color: '#65676b', fontSize: '12px', textTransform: 'uppercase' }}>Correo electrónico</strong>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#050505' }}>{currentUser.email || `${currentUser.username}@carelibro.com`}</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
              <strong style={{ display: 'block', color: '#65676b', fontSize: '12px', textTransform: 'uppercase' }}>Profesión u ocupación</strong>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#050505' }}>{currentUser.role}</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
              <strong style={{ display: 'block', color: '#65676b', fontSize: '12px', textTransform: 'uppercase' }}>Ubicación</strong>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#050505' }}>{currentUser.location}</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
              <strong style={{ display: 'block', color: '#65676b', fontSize: '12px', textTransform: 'uppercase' }}>Fecha de nacimiento</strong>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#050505' }}>{currentUser.birthDate}</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
              <strong style={{ display: 'block', color: '#65676b', fontSize: '12px', textTransform: 'uppercase' }}>Red Social</strong>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#050505' }}>CareLibro Community</span>
            </div>
          </div>
        </div>
      )}

      {/* Pestaña: Amigos */}
      {activeTab === 'friends' && (
        <div className="w3-card w3-round w3-white w3-padding-24">
          <h4 style={{ margin: '0 0 20px 0', fontWeight: 700, color: '#050505' }}>
            <i className="fa fa-users w3-text-theme w3-margin-right"></i>Amigos de {currentUser.name} ({(currentUser.friends || []).length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {usersList
              .filter(u => (currentUser.friends || []).includes(u.id))
              .map(friend => (
                <div
                  key={friend.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid #e4e6eb',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: 'block', color: '#050505', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {friend.name}
                    </strong>
                    <span style={{ display: 'block', fontSize: '12px', color: '#65676b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {friend.role}
                    </span>
                    <span className="w3-tag w3-green w3-round w3-small" style={{ fontSize: '10px', marginTop: '4px' }}>
                      Amigo
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Pestaña: Fotos */}
      {activeTab === 'photos' && (
        <div className="w3-card w3-round w3-white w3-padding-24">
          <h4 style={{ margin: '0 0 20px 0', fontWeight: 700, color: '#050505' }}>
            <i className="fa fa-camera w3-text-theme w3-margin-right"></i>Galería de Fotos
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {photoGallery.map((imgUrl, idx) => (
              <div key={idx} style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                <img
                  src={imgUrl}
                  alt={`Foto ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '140px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onClick={() => openLightbox(imgUrl)}
                  title="Clic para ampliar"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal para editar perfil */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </div>
  );
}
