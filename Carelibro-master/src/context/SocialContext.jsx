import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPosts, defaultUsers, initialChatMessages, notificationsList } from '../data/initialData';
import { registerWithApi } from '../utils/authApi';

// Creación del Contexto Global con createContext
const SocialContext = createContext(null);
const AUTH_STORAGE_KEYS = ['pochechebook_auth_v1', 'red_social_auth_v2', 'carelibro_auth_v1'];
const USER_STORAGE_KEYS = [
  'pochechebook_current_user_v2',
  'pochechebook_current_user_v1',
  'red_social_current_user_v2',
  'carelibro_current_user_v1'
];

const clearAuthSessionStorage = () => {
  AUTH_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
  USER_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
};

export const SocialProvider = ({ children }) => {
  // Hook useState: Lista de usuarios registrados en el sistema
  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem('pochechebook_users_v2') || localStorage.getItem('pochechebook_users_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(u => ({
            ...u,
            email: u.email || `${u.username || 'usuario'}@carelibro.com`,
            password: u.password || '123456'
          }));
        }
      }
    } catch (e) {
      console.warn('Error al cargar usuarios de localStorage:', e);
    }
    return defaultUsers;
  });

  // Hook useState: Usuario autenticado actual
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pochechebook_current_user_v2') || localStorage.getItem('pochechebook_current_user_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          email: parsed.email || `${parsed.username || 'usuario'}@carelibro.com`,
          password: parsed.password || '123456'
        };
      }
    } catch (e) {
      console.warn('Error al cargar usuario actual:', e);
    }
    return defaultUsers[0];
  });

  // Hook useState: Historial global persistente de mensajes de chat
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('pochechebook_chat_messages_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error al cargar mensajes de chat:', e);
    }
    return initialChatMessages;
  });

  // Hook useState: Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    for (const key of AUTH_STORAGE_KEYS) {
      const saved = localStorage.getItem(key);
      if (saved === null) continue;
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'boolean') return parsed;
        if (parsed === 'true') return true;
        if (parsed === 'false') return false;
      } catch (e) {
        console.warn(`Error al leer la sesión persistida (${key}):`, e);
      }
    }
    return false;
  });

  // Hook useState: Estado de publicaciones
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('pochechebook_posts_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.warn('No se pudo cargar desde localStorage:', err);
    }
    return initialPosts;
  });

  // Hook useState: Mensaje de notificación Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Hook useState: Estado del visor de imagen en pantalla completa (Lightbox)
  const [lightboxImage, setLightboxImage] = useState(null);

  // Hook useState: Notificaciones
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('pochechebook_notifications_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error al cargar notificaciones:', e);
    }
    return notificationsList;
  });

  // Hook useEffect: Persistencia automática de notificaciones
  useEffect(() => {
    try {
      localStorage.setItem('pochechebook_notifications_v1', JSON.stringify(notifications));
    } catch (err) {
      console.error('Error al persistir notificaciones:', err);
    }
  }, [notifications]);

  // Borrar todas las notificaciones y marcar mensajes como leídos
  const clearNotifications = () => {
    setNotifications([]);
    setChatMessages(prev => prev.map(m => ({ ...m, isRead: true })));
    setToastMessage('🗑️ Notificaciones eliminadas.');
  };

  // Hook useEffect: Persistencia automática de posts
  useEffect(() => {
    try {
      localStorage.setItem('pochechebook_posts_v2', JSON.stringify(posts));
    } catch (err) {
      console.error('Error al persistir posts:', err);
    }
  }, [posts]);

  // Hook useEffect: Persistencia automática de mensajes de chat
  useEffect(() => {
    try {
      localStorage.setItem('pochechebook_chat_messages_v2', JSON.stringify(chatMessages));
    } catch (err) {
      console.error('Error al persistir mensajes de chat:', err);
    }
  }, [chatMessages]);

  // Hook useEffect: Persistencia de usuarios y sesión
  useEffect(() => {
    try {
      localStorage.setItem('pochechebook_users_v2', JSON.stringify(usersList));
      localStorage.setItem('pochechebook_current_user_v2', JSON.stringify(currentUser));

      const authValue = JSON.stringify(Boolean(isAuthenticated));
      AUTH_STORAGE_KEYS.forEach(key => localStorage.setItem(key, authValue));
      if (isAuthenticated) {
        localStorage.setItem('pochechebook_current_user_v2', JSON.stringify(currentUser));
      } else {
        clearAuthSessionStorage();
      }
    } catch (err) {
      console.error('Error al persistir sesión:', err);
    }
  }, [usersList, currentUser, isAuthenticated]);

  // Hook useEffect: Auto-limpieza del mensaje Toast tras 3.5 segundos
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Hook useEffect: Cerrar visor de imagen con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  /* ========================================================
     ACCIONES DE AUTENTICACIÓN Y PERFIL
     ======================================================== */

  // Iniciar sesión con un usuario
  const login = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    // Asegurar que el usuario esté en usersList
    setUsersList(prev => {
      if (!prev.some(u => u.id === user.id)) {
        return [...prev, user];
      }
      return prev;
    });
    setToastMessage(`¡Bienvenido de nuevo, ${user.name}!`);
  };

  // Registrar un nuevo usuario de forma permanente
  const registerUser = async (userData) => {
    const newUser = await registerWithApi(userData);
    setUsersList(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setToastMessage(`¡Cuenta creada con éxito! Bienvenido a CareLibro, ${newUser.name}.`);
    return newUser;
  };

  // Cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(defaultUsers[0]);
    clearAuthSessionStorage();
    localStorage.setItem('pochechebook_auth_v1', JSON.stringify(false));
    localStorage.setItem('red_social_auth_v2', JSON.stringify(false));
    localStorage.setItem('carelibro_auth_v1', JSON.stringify(false));
    setToastMessage('Sesión cerrada correctamente.');
  };

  // Actualizar datos del perfil, contraseña y foto
  const updateProfile = (updatedFields) => {
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);

    // Actualizar también en la lista general de usuarios
    setUsersList(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));

    // Actualizar nombre y avatar en los posts creados por este usuario si cambiaron
    if (updatedFields.name || updatedFields.avatar) {
      setPosts(prev => prev.map(p => {
        if (p.author === currentUser.name || p.author === updatedUser.name) {
          return {
            ...p,
            author: updatedUser.name,
            avatar: updatedUser.avatar
          };
        }
        return p;
      }));
    }

    setToastMessage('¡Perfil y datos actualizados con éxito!');
  };

  /* ========================================================
     ACCIONES DE MENSAJERÍA Y CHAT
     ======================================================== */

  // Enviar mensaje en el chat
  const sendMessage = (receiverId, text) => {
    if (!text || !text.trim()) return;
    const receiver = usersList.find(u => u.id === receiverId);
    const newMsg = {
      id: generateId('msg'),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: receiverId,
      receiverName: receiver ? receiver.name : 'Usuario',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      isRead: true
    };
    setChatMessages(prev => [...prev, newMsg]);
    return newMsg;
  };

  // Responder mensaje como otro usuario (para interactuar y simular respuestas)
  const sendReplyAsUser = (senderUserId, receiverUserId, text) => {
    if (!text || !text.trim()) return;
    const sender = usersList.find(u => u.id === senderUserId);
    if (!sender) return;
    const isToCurrent = receiverUserId === currentUser.id;
    const newMsg = {
      id: generateId('msg'),
      senderId: sender.id,
      senderName: sender.name,
      senderAvatar: sender.avatar,
      receiverId: receiverUserId,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      isRead: !isToCurrent // Si va dirigido al usuario activo, se marca como no leído para generar alerta
    };
    setChatMessages(prev => [...prev, newMsg]);

    // Alerta visual Toast en la campana / interfaz
    if (isToCurrent) {
      const snippet = text.trim().length > 30 ? text.trim().slice(0, 30) + '...' : text.trim();
      setToastMessage(`🔔 Nuevo mensaje de ${sender.name}: "${snippet}"`);
    }

    return newMsg;
  };

  // Marcar mensajes como leídos al abrir conversación con un contacto
  const markMessagesAsRead = (contactId) => {
    setChatMessages(prev =>
      prev.map(m => {
        if (m.receiverId === currentUser.id && m.senderId === contactId && !m.isRead) {
          return { ...m, isRead: true };
        }
        return m;
      })
    );
  };

  // Cálculo reactivo de mensajes sin leer dirigidos al usuario actual
  const unreadMessagesCount = chatMessages.filter(
    m => m.receiverId === currentUser.id && !m.isRead
  ).length;

  const unreadMessagesList = chatMessages.filter(
    m => m.receiverId === currentUser.id && !m.isRead
  );

  /* ========================================================
     ACCIONES DE AMIGOS Y SOLICITUDES
     ======================================================== */

  // Enviar solicitud de amistad
  const sendFriendRequest = (targetUserId, targetUserData) => {
    const target = usersList.find(u => u.id === targetUserId) || targetUserData;
    if (!target) return;
    if ((currentUser.requestsSent || []).includes(targetUserId) ||
        (currentUser.friends || []).includes(targetUserId)) return;

    // Actualizar usuario actual (requestsSent)
    const updatedCurrent = {
      ...currentUser,
      requestsSent: [...(currentUser.requestsSent || []), targetUserId]
    };
    setCurrentUser(updatedCurrent);

    // Actualizar usuario destino (requestsReceived)
    setUsersList(prev => {
      const users = prev.some(u => u.id === targetUserId) ? prev : [...prev, target];
      return users.map(u => {
        if (u.id === targetUserId) {
          return {
            ...u,
            requestsReceived: [...(u.requestsReceived || []), currentUser.id]
          };
        }
        if (u.id === currentUser.id) {
          return updatedCurrent;
        }
        return u;
      });
    });

    setToastMessage(`Solicitud de amistad enviada a ${target.name}.`);
  };

  // Aceptar solicitud de amistad
  const acceptFriendRequest = (senderUserId) => {
    const sender = usersList.find(u => u.id === senderUserId);
    if (!sender) return;

    // Añadir a amigos y quitar de solicitudes recibidas
    const updatedCurrent = {
      ...currentUser,
      friends: [...(currentUser.friends || []), senderUserId],
      requestsReceived: (currentUser.requestsReceived || []).filter(id => id !== senderUserId)
    };
    setCurrentUser(updatedCurrent);

    // Actualizar emisor
    setUsersList(prev => prev.map(u => {
      if (u.id === senderUserId) {
        return {
          ...u,
          friends: [...(u.friends || []), currentUser.id],
          requestsSent: (u.requestsSent || []).filter(id => id !== currentUser.id)
        };
      }
      if (u.id === currentUser.id) {
        return updatedCurrent;
      }
      return u;
    }));

    setToastMessage(`¡Ahora eres amigo de ${sender.name}!`);
  };

  // Rechazar solicitud de amistad
  const declineFriendRequest = (senderUserId) => {
    const updatedCurrent = {
      ...currentUser,
      requestsReceived: (currentUser.requestsReceived || []).filter(id => id !== senderUserId)
    };
    setCurrentUser(updatedCurrent);

    setUsersList(prev => prev.map(u => {
      if (u.id === senderUserId) {
        return {
          ...u,
          requestsSent: (u.requestsSent || []).filter(id => id !== currentUser.id)
        };
      }
      if (u.id === currentUser.id) {
        return updatedCurrent;
      }
      return u;
    }));

    setToastMessage('Solicitud de amistad rechazada.');
  };

  /* ========================================================
     ACCIONES DE POSTS
     ======================================================== */

  const addPost = ({ content, images = [], video = null }) => {
    const newPost = {
      id: generateId('post'),
      author: currentUser.name,
      avatar: currentUser.avatar,
      time: 'Justo ahora',
      content,
      images,
      video,
      likes: 0,
      isLiked: false,
      sharesCount: 0,
      isShared: false,
      comments: []
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setToastMessage('¡Publicación creada exitosamente!');
  };

  const deletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    setToastMessage('Publicación eliminada correctamente.');
  };

  const openLightbox = (imageUrl) => {
    if (imageUrl) setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const toggleLikePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          const likes = isLiked ? post.likes + 1 : Math.max(0, post.likes - 1);
          return { ...post, isLiked, likes };
        }
        return post;
      })
    );
  };

  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: generateId('comm'),
      author: currentUser.name,
      avatar: currentUser.avatar,
      time: 'Justo ahora',
      content: commentText.trim(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );
  };

  const toggleLikeComment = (postId, commentId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = (post.comments || []).map(comment => {
            if (comment.id === commentId) {
              const isLiked = !comment.isLiked;
              const likes = isLiked ? comment.likes + 1 : Math.max(0, comment.likes - 1);
              return { ...comment, isLiked, likes };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  const addReply = (postId, commentId, replyText) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: generateId('reply'),
      author: currentUser.name,
      avatar: currentUser.avatar,
      time: 'Justo ahora',
      content: replyText.trim(),
      likes: 0,
      isLiked: false
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = (post.comments || []).map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
              };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  const toggleLikeReply = (postId, commentId, replyId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updatedComments = (post.comments || []).map(comment => {
            if (comment.id === commentId) {
              const updatedReplies = (comment.replies || []).map(reply => {
                if (reply.id === replyId) {
                  const isLiked = !reply.isLiked;
                  const likes = isLiked ? reply.likes + 1 : Math.max(0, reply.likes - 1);
                  return { ...reply, isLiked, likes };
                }
                return reply;
              });
              return { ...comment, replies: updatedReplies };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
  };

  const sharePost = (postId) => {
    const postToShare = posts.find(p => p.id === postId);
    if (!postToShare) return;

    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return { ...p, sharesCount: (p.sharesCount || 0) + 1 };
      }
      return p;
    });

    const sharedPost = {
      id: generateId('post-shared'),
      author: currentUser.name,
      avatar: currentUser.avatar,
      time: 'Justo ahora',
      content: `Compartió la publicación de ${postToShare.author}:`,
      isShared: true,
      originalAuthor: postToShare.author,
      originalAvatar: postToShare.avatar,
      originalTime: postToShare.time,
      originalContent: postToShare.content,
      images: postToShare.images || [],
      video: postToShare.video || null,
      likes: 0,
      isLiked: false,
      sharesCount: 0,
      comments: []
    };

    setPosts([sharedPost, ...updatedPosts]);
    setToastMessage(`¡Publicación de ${postToShare.author} compartida en tu muro!`);
  };

  const resetPostsToDefault = () => {
    setPosts(initialPosts);
    setUsersList(defaultUsers);
    setCurrentUser(defaultUsers[0]);
    localStorage.removeItem('red_social_posts_v2');
    localStorage.removeItem('red_social_users_v2');
    localStorage.removeItem('red_social_current_user_v2');
    setToastMessage('Sistema restaurado a los valores predeterminados.');
  };

  return (
    <SocialContext.Provider
      value={{
        posts,
        usersList,
        currentUser,
        isAuthenticated,
        toastMessage,
        setToastMessage,
        lightboxImage,
        openLightbox,
        closeLightbox,
        login,
        registerUser,
        logout,
        updateProfile,
        chatMessages,
        sendMessage,
        sendReplyAsUser,
        markMessagesAsRead,
        unreadMessagesCount,
        unreadMessagesList,
        notifications,
        clearNotifications,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        addPost,
        deletePost,
        toggleLikePost,
        addComment,
        toggleLikeComment,
        addReply,
        toggleLikeReply,
        sharePost,
        resetPostsToDefault
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial debe ser usado dentro de un SocialProvider');
  }
  return context;
};
