import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';

export default function GroupsPage() {
  const { openLightbox } = useSocial();

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');

  // Grupos del usuario
  const [myGroups, setMyGroups] = useState([
    {
      id: 'g-1',
      name: 'Diseñadores UI/UX & React',
      members: '1.2k miembros',
      news: '15 publicaciones nuevas',
      image: 'https://www.w3schools.com/w3images/lights.jpg'
    },
    {
      id: 'g-2',
      name: 'Comunidad Desarrollo Web Frontend',
      members: '3.4k miembros',
      news: '8 publicaciones nuevas',
      image: 'https://www.w3schools.com/w3images/nature.jpg'
    },
    {
      id: 'g-3',
      name: 'Fotografía Creativa y Paisajes',
      members: '856 miembros',
      news: '3 publicaciones nuevas',
      image: 'https://www.w3schools.com/w3images/forest.jpg'
    }
  ]);

  // Grupos sugeridos
  const [suggestedGroups, setSuggestedGroups] = useState([
    {
      id: 'sg-1',
      name: 'Viajeros y Mochileros del Mundo',
      members: '5.1k miembros',
      image: 'https://www.w3schools.com/w3images/mountains.jpg',
      isJoined: false
    },
    {
      id: 'sg-2',
      name: 'Tecnología, Gadgets y Futuro',
      members: '8.2k miembros',
      image: 'https://www.w3schools.com/w3images/nature.jpg',
      isJoined: false
    },
    {
      id: 'sg-3',
      name: 'Cocina Fácil y Recetas Rápidas',
      members: '2.7k miembros',
      image: 'https://www.w3schools.com/w3images/nature.jpg',
      isJoined: false
    },
    {
      id: 'sg-4',
      name: 'Fans Oficiales CareLibro',
      members: '14.5k miembros',
      image: 'https://www.w3schools.com/w3images/forest.jpg',
      isJoined: true
    }
  ]);

  // Unirse o salir de grupo
  const toggleJoinGroup = (groupId) => {
    setSuggestedGroups(prev =>
      prev.map(g => {
        if (g.id === groupId) {
          const nextState = !g.isJoined;
          if (nextState) {
            // Añadir a Mis Grupos
            setMyGroups(myPrev => [
              ...myPrev,
              {
                id: g.id,
                name: g.name,
                members: g.members,
                news: '¡Recién unido!',
                image: g.image
              }
            ]);
          } else {
            // Quitar de Mis Grupos
            setMyGroups(myPrev => myPrev.filter(mg => mg.id !== g.id));
          }
          return { ...g, isJoined: nextState };
        }
        return g;
      })
    );
  };

  // Crear nuevo grupo
  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: `g-custom-${Date.now()}`,
      name: newGroupName.trim(),
      members: '1 miembro (Administrador)',
      news: 'Grupo recién creado',
      image: 'https://www.w3schools.com/w3images/nature.jpg'
    };

    setMyGroups(prev => [newGroup, ...prev]);
    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateModal(false);
  };

  // Filtros de búsqueda
  const filteredMyGroups = myGroups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSuggested = suggestedGroups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1240px', marginTop: '20px', padding: '0 16px 40px 16px' }}>
      {/* Barra superior de encabezado y buscador espaciosa */}
      <div
        className="w3-card w3-round-large w3-white"
        style={{
          padding: '24px 28px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ margin: 0, fontWeight: 800, color: '#050505', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa fa-users w3-text-theme"></i> Grupos y Comunidades
            </h2>
            <p style={{ margin: '6px 0 0 0', color: '#65676b', fontSize: '14.5px' }}>
              Descubre grupos de tu interés, comparte experiencias o crea tu propia comunidad en CareLibro.
            </p>
          </div>

          <button
            type="button"
            className="w3-button w3-theme-d2 w3-round-large"
            onClick={() => setShowCreateModal(true)}
            style={{
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            <i className="fa fa-plus-circle" style={{ fontSize: '16px' }}></i> Crear nuevo grupo
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f0f2f5', paddingTop: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <input
              className="w3-input w3-border w3-round-large"
              type="text"
              placeholder="🔍 Buscar entre todos los grupos por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '13.5px', padding: '10px 14px' }}
            />
          </div>
          {searchTerm && (
            <button
              type="button"
              className="w3-button w3-light-grey w3-round-large"
              onClick={() => setSearchTerm('')}
              style={{ fontSize: '13px' }}
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      </div>

      <div className="w3-row-padding" style={{ margin: '0 -8px' }}>
        {/* Columna Izquierda: Mis Grupos */}
        <div className="w3-col m6 w3-margin-bottom">
          <div className="w3-card w3-round-large w3-white" style={{ overflow: 'hidden' }}>
            <div className="w3-container w3-padding-16 w3-theme-d2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: '18px' }}>
                <i className="fa fa-group w3-margin-right"></i> Mis grupos ({filteredMyGroups.length})
              </h3>
            </div>

            <ul className="w3-ul w3-hoverable">
              {filteredMyGroups.length === 0 ? (
                <li className="w3-padding-24 w3-center w3-text-grey">
                  No se encontraron grupos en tu lista.
                </li>
              ) : (
                filteredMyGroups.map((group) => (
                  <li key={group.id} className="w3-padding-16" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={group.image}
                      className="w3-circle"
                      style={{ width: '56px', height: '56px', objectFit: 'cover', cursor: 'pointer' }}
                      alt={group.name}
                      onClick={() => openLightbox(group.image)}
                      title="Clic para ver foto"
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ fontSize: '15px', color: '#050505', display: 'block' }}>{group.name}</strong>
                      <span className="w3-opacity" style={{ fontSize: '12px' }}>{group.members} · {group.news}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="w3-button w3-small w3-theme-d2 w3-round"
                        onClick={() => alert(`Accediendo al grupo "${group.name}".`)}
                      >
                        Ver grupo
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="w3-container w3-padding-16" style={{ borderTop: '1px solid #f0f2f5', backgroundColor: '#fafbfc' }}>
              <button
                type="button"
                className="w3-button w3-block w3-theme-l4 w3-round-large"
                onClick={() => setShowCreateModal(true)}
                style={{ fontWeight: 600, padding: '10px', color: '#1877f2', border: '1px dashed #1877f2' }}
              >
                <i className="fa fa-plus"></i> Crear un grupo nuevo
              </button>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Grupos sugeridos */}
        <div className="w3-col m6">
          <div className="w3-card w3-round-large w3-white" style={{ overflow: 'hidden' }}>
            <div className="w3-container w3-padding-16 w3-theme-d1">
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: '18px' }}>
                <i className="fa fa-star w3-margin-right"></i> Grupos sugeridos para ti
              </h3>
            </div>

            <ul className="w3-ul w3-hoverable">
              {filteredSuggested.length === 0 ? (
                <li className="w3-padding-24 w3-center w3-text-grey">
                  No hay grupos sugeridos que coincidan con la búsqueda.
                </li>
              ) : (
                filteredSuggested.map((group) => (
                  <li key={group.id} className="w3-padding-16" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={group.image}
                      className="w3-circle"
                      style={{ width: '56px', height: '56px', objectFit: 'cover', cursor: 'pointer' }}
                      alt={group.name}
                      onClick={() => openLightbox(group.image)}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ fontSize: '15px', color: '#050505', display: 'block' }}>{group.name}</strong>
                      <span className="w3-opacity" style={{ fontSize: '12px' }}>{group.members}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleJoinGroup(group.id)}
                        className={`w3-button w3-small w3-round ${
                          group.isJoined ? 'w3-light-grey w3-text-grey' : 'w3-theme'
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        {group.isJoined ? (
                          <span><i className="fa fa-check"></i> Miembro</span>
                        ) : (
                          <span><i className="fa fa-plus"></i> Unirse</span>
                        )}
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Crear Grupo */}
      {showCreateModal && (
        <div
          onClick={() => setShowCreateModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              maxWidth: '460px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
            }}
          >
            <div className="w3-container w3-theme-d2 w3-padding-16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontWeight: 700 }}>
                <i className="fa fa-plus-circle w3-margin-right"></i>Crear nuevo grupo
              </h4>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="w3-container w3-padding-24">
              <div className="w3-section">
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Nombre del grupo: *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Aficionados al Cine y Series"
                  className="w3-input w3-border w3-round"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
              <div className="w3-section">
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Descripción:</label>
                <textarea
                  rows="3"
                  placeholder="¿De qué trata tu grupo?"
                  className="w3-input w3-border w3-round"
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
                <button
                  type="button"
                  className="w3-button w3-light-grey w3-round"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="w3-button w3-theme-d2 w3-round" style={{ fontWeight: 600 }}>
                  <i className="fa fa-check"></i> Crear grupo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
