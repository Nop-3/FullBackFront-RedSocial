import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

export default function PostCard({ post }) {
  const {
    currentUser,
    usersList,
    toggleLikePost,
    addComment,
    toggleLikeComment,
    addReply,
    toggleLikeReply,
    sharePost,
    deletePost,
    openLightbox
  } = useSocial();

  const [showComments, setShowComments] = useState(true);
  const [commentInput, setCommentInput] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null); // ID del comentario al que se está respondiendo
  const [replyInput, setReplyInput] = useState('');
  const [showMenu, setShowMenu] = useState(false); // Menú de 3 puntos (Opciones)

  const handleLikePost = () => {
    toggleLikePost(post.id);
  };

  const handleDeletePost = () => {
    setShowMenu(false);
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      deletePost(post.id);
    }
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      addComment(post.id, commentInput);
      setCommentInput('');
    }
  };

  const handleCreateReply = (e, commentId) => {
    e.preventDefault();
    if (replyInput.trim()) {
      addReply(post.id, commentId, replyInput);
      setReplyInput('');
      setActiveReplyId(null);
    }
  };

  const handleShare = () => {
    sharePost(post.id);
  };

  // Validación de amistad para comentarios:
  // Si Juana de Arco no es amiga aceptada, ni ella puede comentar ni el usuario ve comentarios de ella
  const isFriendOrSelf = (authorName) => {
    if (!authorName) return false;
    if (authorName === currentUser.name || authorName === 'Mi Perfil' || authorName === 'PochecheBook Oficial') {
      return true;
    }
    const authorUser = (usersList || []).find(
      u => u.name.toLowerCase() === authorName.toLowerCase()
    );
    if (authorUser) {
      return (currentUser.friends || []).includes(authorUser.id) || authorUser.id === currentUser.id;
    }
    return true;
  };

  const rawComments = post.comments || [];
  const commentsList = rawComments
    .filter(comment => isFriendOrSelf(comment.author))
    .map(comment => ({
      ...comment,
      replies: (comment.replies || []).filter(reply => isFriendOrSelf(reply.author))
    }));

  const totalCommentsCount = commentsList.reduce(
    (acc, curr) => acc + 1 + (curr.replies ? curr.replies.length : 0),
    0
  );

  return (
    <article className="fb-card">
      {/* Cabecera idéntica a Facebook */}
      <header className="fb-header">
        <div className="fb-author-wrapper">
          <img
            src={post.avatar}
            alt={post.author}
            className="fb-avatar"
          />
          <div className="fb-author-info">
            <span className="fb-author-name">{post.author}</span>
            <div className="fb-meta">
              <span>{post.time}</span>
              <span>·</span>
              <i className="fa fa-globe" title="Público"></i>
            </div>
          </div>
        </div>

        {/* Menú de opciones (Eliminar post) */}
        <div className="fb-header-options" style={{ position: 'relative' }}>
          <button
            type="button"
            className="fb-icon-btn"
            title="Opciones de publicación"
            aria-label="Opciones de publicación"
            onClick={() => setShowMenu(prev => !prev)}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>

          {showMenu && (
            <div
              style={{
                position: 'absolute',
                top: '42px',
                right: 0,
                background: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
                border: '1px solid #e4e6eb',
                zIndex: 100,
                minWidth: '210px',
                padding: '6px 0',
                animation: 'fbFadeIn 0.15s ease'
              }}
            >
              <button
                type="button"
                onClick={handleDeletePost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 18px',
                  border: 'none',
                  background: 'none',
                  color: '#e41e3f',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f2f5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <i className="fa fa-trash" style={{ fontSize: '16px' }}></i>
                <span>Eliminar publicación</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Texto de la publicación */}
      <div className="fb-content">
        <p>{post.content}</p>
      </div>

      {/* Si es una publicación compartida, mostramos la tarjeta original */}
      {post.isShared && (
        <div className="fb-shared-box">
          <div className="fb-header" style={{ padding: '8px 12px 0 12px' }}>
            <div className="fb-author-wrapper">
              <img
                src={post.originalAvatar || post.avatar}
                alt={post.originalAuthor}
                className="fb-avatar-sm"
              />
              <div className="fb-author-info">
                <span className="fb-author-name">{post.originalAuthor}</span>
                <div className="fb-meta">
                  <span>{post.originalTime || 'Hace unos momentos'}</span>
                  <span>·</span>
                  <i className="fa fa-globe"></i>
                </div>
              </div>
            </div>
          </div>
          {post.originalContent && (
            <div className="fb-content" style={{ padding: '8px 12px' }}>
              <p>{post.originalContent}</p>
            </div>
          )}
        </div>
      )}

      {/* Contenedor Multimedia: Soporte completo para Vídeos e Imágenes con ampliación */}
      {post.video && (
        <div className="fb-media-container">
          <video
            controls
            className="fb-video-player"
            poster={post.video.poster || ''}
            src={post.video.url}
          >
            Tu navegador no soporta la reproducción de video HTML5.
          </video>
        </div>
      )}

      {!post.video && post.images && post.images.length === 1 && (
        <div
          className="fb-media-container"
          style={{ cursor: 'pointer' }}
          onClick={() => openLightbox(post.images[0])}
          title="Haz clic para ver la imagen en pantalla completa"
        >
          <img
            src={post.images[0]}
            alt="Fotografía de publicación"
            className="fb-single-image"
          />
        </div>
      )}

      {!post.video && post.images && post.images.length >= 2 && (
        <div className="fb-media-container fb-images-grid">
          {post.images.slice(0, 2).map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Imagen ${idx + 1}`}
              style={{ cursor: 'pointer' }}
              onClick={() => openLightbox(imgUrl)}
              title="Haz clic para ver la imagen en pantalla completa"
            />
          ))}
        </div>
      )}

      {/* Barra de Reacciones y Contadores de Facebook */}
      <div className="fb-stats-bar">
        <div className="fb-reactions-group">
          {post.likes > 0 && (
            <>
              <div className="fb-icons-overlap">
                <span className="fb-react-icon fb-react-like"><i className="fa fa-thumbs-up"></i></span>
                {post.likes > 5 && <span className="fb-react-icon fb-react-love"><i className="fa fa-heart"></i></span>}
                {post.likes > 15 && <span className="fb-react-icon fb-react-haha"><i className="fa fa-smile-o"></i></span>}
              </div>
              <span>{post.likes}</span>
            </>
          )}
        </div>

        <div className="fb-stats-counts">
          {totalCommentsCount > 0 && (
            <span
              className="fb-stat-link"
              onClick={() => setShowComments(prev => !prev)}
            >
              {totalCommentsCount} {totalCommentsCount === 1 ? 'comentario' : 'comentarios'}
            </span>
          )}
          {(post.sharesCount || 0) > 0 && (
            <span className="fb-stat-link">
              {post.sharesCount} {post.sharesCount === 1 ? 'vez compartido' : 'veces compartido'}
            </span>
          )}
        </div>
      </div>

      <div className="fb-divider"></div>

      {/* Barra de 3 Botones de Acción Oficiales de Facebook */}
      <div className="fb-actions-bar">
        <button
          type="button"
          onClick={handleLikePost}
          className={`fb-action-btn ${post.isLiked ? 'fb-liked' : ''}`}
        >
          <i className={`fa ${post.isLiked ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`}></i>
          <span>Me gusta</span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments(prev => !prev)}
          className="fb-action-btn"
        >
          <i className="fa fa-comment-o"></i>
          <span>Comentar</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="fb-action-btn"
        >
          <i className="fa fa-share"></i>
          <span>Compartir</span>
        </button>
      </div>

      {/* Sección de Comentarios Estilo Facebook */}
      {showComments && (
        <section className="fb-comments-section">
          <div className="fb-divider" style={{ margin: '0 0 14px 0' }}></div>

          {/* Formulario para nuevo comentario */}
          <form onSubmit={handleCreateComment} className="fb-comment-form">
            <img
              src={currentUser.currentUserAvatar}
              alt={currentUser.name}
              className="fb-avatar-sm"
            />
            <div className="fb-comment-input-pill">
              <input
                type="text"
                className="fb-comment-input"
                placeholder="Escribe un comentario público..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button
                type="submit"
                className="fb-comment-submit-btn"
                disabled={!commentInput.trim()}
                title="Publicar comentario"
              >
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>

          {/* Lista de comentarios */}
          {commentsList.map((comment) => (
            <div key={comment.id} className="fb-comment-item">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="fb-avatar-sm"
              />

              <div className="fb-comment-body">
                <div className="fb-bubble-wrapper">
                  <div className="fb-comment-bubble">
                    <div className="fb-comment-author">{comment.author}</div>
                    <div className="fb-comment-text">{comment.content}</div>
                  </div>

                  {/* Insignia de reacción flotante si el comentario tiene likes */}
                  {(comment.likes || 0) > 0 && (
                    <span className="fb-comment-badge">
                      <span className="fb-react-icon fb-react-like" style={{ width: '14px', height: '14px', fontSize: '9px' }}>
                        <i className="fa fa-thumbs-up"></i>
                      </span>
                      {comment.likes}
                    </span>
                  )}
                </div>

                {/* Acciones del comentario: Me gusta, Responder, Tiempo */}
                <div className="fb-comment-actions">
                  <button
                    type="button"
                    onClick={() => toggleLikeComment(post.id, comment.id)}
                    className={`fb-comment-link ${comment.isLiked ? 'fb-link-active' : ''}`}
                  >
                    Me gusta
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveReplyId(prev => prev === comment.id ? null : comment.id);
                      setReplyInput('');
                    }}
                    className="fb-comment-link"
                  >
                    Responder
                  </button>

                  <span className="fb-comment-time">{comment.time}</span>
                </div>

                {/* Respuestas anidadas (Criterio 5.0) */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="fb-replies-container">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="fb-reply-item">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="fb-avatar-xs"
                        />
                        <div style={{ flex: 1 }}>
                          <div className="fb-bubble-wrapper">
                            <div className="fb-comment-bubble" style={{ padding: '6px 10px', fontSize: '13px' }}>
                              <div className="fb-comment-author">{reply.author}</div>
                              <div className="fb-comment-text">{reply.content}</div>
                            </div>
                            {(reply.likes || 0) > 0 && (
                              <span className="fb-comment-badge">
                                <span className="fb-react-icon fb-react-like" style={{ width: '12px', height: '12px', fontSize: '8px' }}>
                                  <i className="fa fa-thumbs-up"></i>
                                </span>
                                {reply.likes}
                              </span>
                            )}
                          </div>
                          <div className="fb-comment-actions">
                            <button
                              type="button"
                              onClick={() => toggleLikeReply(post.id, comment.id, reply.id)}
                              className={`fb-comment-link ${reply.isLiked ? 'fb-link-active' : ''}`}
                            >
                              Me gusta
                            </button>
                            <span className="fb-comment-time">{reply.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulario de respuesta cuando se presiona 'Responder' */}
                {activeReplyId === comment.id && (
                  <form
                    onSubmit={(e) => handleCreateReply(e, comment.id)}
                    className="fb-reply-form"
                  >
                    <img
                      src={currentUser.currentUserAvatar}
                      alt={currentUser.name}
                      className="fb-avatar-xs"
                    />
                    <div className="fb-comment-input-pill" style={{ padding: '4px 10px' }}>
                      <input
                        type="text"
                        autoFocus
                        className="fb-comment-input"
                        style={{ fontSize: '13px' }}
                        placeholder={`Responde a ${comment.author.split(' ')[0]}...`}
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="fb-comment-submit-btn"
                        disabled={!replyInput.trim()}
                        title="Enviar respuesta"
                      >
                        <i className="fa fa-paper-plane" style={{ fontSize: '12px' }}></i>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
