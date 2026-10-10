import React, { useState, useRef, useEffect } from 'react';
import { useSocial } from '../context/SocialContext';

export default function ChatPage() {
  const { currentUser, usersList, chatMessages, sendMessage, sendReplyAsUser, markMessagesAsRead } = useSocial();

  // Contactos disponibles para chatear: únicamente amigos confirmados del usuario
  const contacts = usersList.filter(
    u => u.id !== currentUser.id && (currentUser.friends || []).includes(u.id)
  );

  const [activeContactId, setActiveContactId] = useState(contacts[0]?.id || 'user-2');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const chatScrollRef = useRef(null);

  const activeContact = usersList.find(u => u.id === activeContactId) || contacts[0] || {
    name: 'Usuario',
    avatar: 'https://www.w3schools.com/w3images/avatar2.png'
  };

  // Marcar mensajes del contacto activo como leídos
  useEffect(() => {
    if (activeContactId) {
      markMessagesAsRead(activeContactId);
    }
  }, [activeContactId, chatMessages.length]);

  // Filtrar los mensajes de la conversación activa entre currentUser y activeContact
  const activeMessages = (chatMessages || []).filter(
    m => (m.senderId === currentUser.id && m.receiverId === activeContactId) ||
         (m.senderId === activeContactId && m.receiverId === currentUser.id)
  );

  // Auto-scroll al final del chat cuando entran mensajes
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(activeContactId, inputMessage.trim());
    setInputMessage('');
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1200px', marginTop: '20px', padding: '0 16px 40px 16px' }}>
      <div className="w3-row-padding" style={{ margin: '0 -8px' }}>
        {/* Columna Izquierda: Lista de Chats */}
        <div className="w3-col m4 w3-margin-bottom">
          <div className="w3-card w3-round-large w3-white" style={{ overflow: 'hidden' }}>
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h4 style={{ margin: '0 0 10px 0', fontWeight: 700 }}>
                <i className="fa fa-comments w3-margin-right"></i>Conversaciones
              </h4>
              <div style={{ position: 'relative' }}>
                <input
                  className="w3-input w3-border w3-round-large"
                  type="text"
                  placeholder="🔍 Buscar contacto o chat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '13px', backgroundColor: '#fff', color: '#050505' }}
                />
              </div>
            </div>

            <ul className="w3-ul w3-hoverable" style={{ maxHeight: '520px', overflowY: 'auto' }}>
              {filteredContacts.map((contact) => {
                const isSelected = contact.id === activeContactId;
                const contactMsgs = (chatMessages || []).filter(
                  m => (m.senderId === currentUser.id && m.receiverId === contact.id) ||
                       (m.senderId === contact.id && m.receiverId === currentUser.id)
                );
                const lastMsg = contactMsgs[contactMsgs.length - 1];
                const unreadForContact = (chatMessages || []).filter(
                  m => m.senderId === contact.id && m.receiverId === currentUser.id && !m.isRead
                ).length;

                return (
                  <li
                    key={contact.id}
                    onClick={() => setActiveContactId(contact.id)}
                    className={isSelected ? 'w3-theme-l4' : ''}
                    style={{
                      cursor: 'pointer',
                      borderLeft: isSelected ? '4px solid #1877f2' : '4px solid transparent',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={contact.avatar}
                          className="w3-circle"
                          style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                          alt={contact.name}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#31a24c',
                            borderRadius: '50%',
                            border: '2px solid #fff'
                          }}
                        ></span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '14px', color: '#050505' }}>{contact.name}</strong>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {unreadForContact > 0 && (
                              <span className="w3-badge w3-small w3-red" style={{ fontSize: '10px' }}>
                                {unreadForContact}
                              </span>
                            )}
                            <span className="w3-small w3-text-theme" style={{ fontSize: '11px' }}>
                              {lastMsg ? lastMsg.time : '10:30'}
                            </span>
                          </div>
                        </div>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#65676b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lastMsg ? lastMsg.text : 'Haz clic para iniciar conversación...'}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Ventana de Chat Activa */}
        <div className="w3-col m8">
          <div className="w3-card w3-round-large w3-white" style={{ display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}>
            {/* Cabecera del chat */}
            <div className="w3-container w3-padding-16 w3-theme-d2" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={activeContact.avatar}
                className="w3-circle"
                style={{ width: '44px', height: '44px', objectFit: 'cover', border: '2px solid #fff' }}
                alt={activeContact.name}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontWeight: 700, fontSize: '16px' }}>
                  {activeContact.name}
                </h4>
                <span style={{ fontSize: '12px', opacity: 0.9 }}>
                  <i className="fa fa-circle" style={{ color: '#00e676', fontSize: '10px', marginRight: '5px' }}></i>
                  Activo(a) ahora · CareLibro Chat
                </span>
              </div>
            </div>

            {/* Mensajes con scroll */}
            <div
              ref={chatScrollRef}
              className="w3-container w3-padding-16"
              style={{
                flex: 1,
                overflowY: 'auto',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {activeMessages.length === 0 ? (
                <div style={{ textAlign: 'center', margin: 'auto', color: '#65676b' }}>
                  <i className="fa fa-comments-o" style={{ fontSize: '42px', marginBottom: '8px', color: '#1877f2' }}></i>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Inicia una conversación con {activeContact.name}</p>
                  <span style={{ fontSize: '12px' }}>Escribe un mensaje abajo o presiona una respuesta rápida.</span>
                </div>
              ) : (
                activeMessages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  const senderName = isMe ? 'Tú' : (msg.senderName || activeContact.name);

                  return (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '75%'
                      }}
                    >
                      <div
                        style={{
                          padding: '10px 14px',
                          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          backgroundColor: isMe ? '#1877f2' : '#ffffff',
                          color: isMe ? '#ffffff' : '#050505',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                          fontSize: '14px',
                          lineHeight: '1.4'
                        }}
                      >
                        {!isMe && (
                          <strong style={{ fontSize: '11px', color: '#1877f2', display: 'block', marginBottom: '2px' }}>
                            {senderName}
                          </strong>
                        )}
                        {msg.text}
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: '#65676b',
                          marginTop: '3px',
                          textAlign: isMe ? 'right' : 'left',
                          padding: '0 4px'
                        }}
                      >
                        {msg.time} {isMe && '· Enviado ✓✓'}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Barra de respuestas interactivas como el otro usuario */}
            <div
              style={{
                backgroundColor: '#eef2f6',
                borderTop: '1px solid #e4e6eb',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '11.5px', color: '#4b5563', fontWeight: 700 }}>
                <i className="fa fa-reply" style={{ color: '#1877f2', marginRight: '4px' }}></i>
                Responder como {activeContact.name.split(' ')[0]}:
              </span>
              <button
                type="button"
                onClick={() => sendReplyAsUser(activeContact.id, currentUser.id, '¡Hola! Todo va excelente por aquí 👏')}
                className="w3-button w3-tiny w3-white w3-border w3-round"
                style={{ fontSize: '11px', padding: '3px 8px', color: '#050505' }}
                title={`Enviar respuesta automática como ${activeContact.name}`}
              >
                "¡Todo excelente! 👏"
              </button>
              <button
                type="button"
                onClick={() => sendReplyAsUser(activeContact.id, currentUser.id, '¡Me encantó tu última publicación!')}
                className="w3-button w3-tiny w3-white w3-border w3-round"
                style={{ fontSize: '11px', padding: '3px 8px', color: '#050505' }}
                title={`Enviar respuesta automática como ${activeContact.name}`}
              >
                "¡Me encantó tu post! ⭐"
              </button>
              <button
                type="button"
                onClick={() => sendReplyAsUser(activeContact.id, currentUser.id, '¿Tienes tiempo para revisar un diseño hoy?')}
                className="w3-button w3-tiny w3-white w3-border w3-round"
                style={{ fontSize: '11px', padding: '3px 8px', color: '#050505' }}
                title={`Enviar respuesta automática como ${activeContact.name}`}
              >
                "¿Tienes tiempo hoy?"
              </button>
            </div>

            {/* Formulario para enviar mensaje como usuario actual */}
            <form onSubmit={handleSendMessage} className="w3-container w3-padding-16 w3-border-top" style={{ backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  className="w3-input w3-border w3-round-large"
                  type="text"
                  placeholder={`Escribe un mensaje a ${activeContact.name}...`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  style={{ fontSize: '14px', color: '#050505' }}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="w3-button w3-theme-d2 w3-round-large"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
                >
                  <i className="fa fa-paper-plane"></i>
                  <span>Enviar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
