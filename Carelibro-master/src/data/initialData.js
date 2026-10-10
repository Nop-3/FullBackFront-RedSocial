export const defaultUsers = [
  {
    id: "user-1",
    name: "Mi Perfil",
    username: "miperfil",
    email: "miperfil@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar3.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar3.png",
    coverPhoto: "https://www.w3schools.com/w3images/nature.jpg",
    role: "Diseñador, UI",
    location: "Londres, Reino Unido",
    birthDate: "1 de abril de 1988",
    friends: ["user-2"],
    requestsSent: [],
    requestsReceived: ["user-3"]
  },
  {
    id: "user-2",
    name: "Juan Pérez",
    username: "juanperez",
    email: "juanperez@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar2.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar2.png",
    role: "Fotógrafo & Viajero",
    location: "Madrid, España",
    birthDate: "15 de mayo de 1990",
    friends: ["user-1"],
    requestsSent: [],
    requestsReceived: []
  },
  {
    id: "user-3",
    name: "Juana de Arco",
    username: "juanadearco",
    email: "juanadearco@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar5.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar5.png",
    role: "Ingeniera de Software",
    location: "París, Francia",
    birthDate: "6 de enero de 1994",
    friends: [],
    requestsSent: ["user-1"],
    requestsReceived: []
  },
  {
    id: "user-4",
    name: "Angie López",
    username: "angielopez",
    email: "angielopez@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar6.png",
    role: "Diseñadora Gráfica",
    location: "Bogotá, Colombia",
    birthDate: "22 de septiembre de 1992",
    friends: [],
    requestsSent: [],
    requestsReceived: []
  },
  {
    id: "user-5",
    name: "Carlos Mendoza",
    username: "carlosm",
    email: "carlosm@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar4.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar4.png",
    role: "Desarrollador Full Stack",
    location: "Buenos Aires, Argentina",
    birthDate: "10 de noviembre de 1995",
    friends: [],
    requestsSent: [],
    requestsReceived: []
  },
  {
    id: "user-6",
    name: "Sofía Gómez",
    username: "sofiag",
    email: "sofiag@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar5.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar5.png",
    role: "Especialista en Marketing Digital",
    location: "Ciudad de México, México",
    birthDate: "14 de julio de 1996",
    friends: [],
    requestsSent: [],
    requestsReceived: []
  },
  {
    id: "user-7",
    name: "Mateo Rodríguez",
    username: "mateor",
    email: "mateor@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar1.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar1.png",
    role: "Diseñador UX/UI",
    location: "Medellín, Colombia",
    birthDate: "3 de marzo de 1993",
    friends: [],
    requestsSent: [],
    requestsReceived: []
  },
  {
    id: "user-8",
    name: "Valentina Morales",
    username: "valentinam",
    email: "valentinam@carelibro.com",
    password: "123456",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    currentUserAvatar: "https://www.w3schools.com/w3images/avatar6.png",
    role: "Community Manager & Redes",
    location: "Santiago, Chile",
    birthDate: "28 de agosto de 1997",
    friends: [],
    requestsSent: [],
    requestsReceived: []
  }
];

export const initialChatMessages = [
  {
    id: "msg-1",
    senderId: "user-2",
    senderName: "Juan Pérez",
    senderAvatar: "https://www.w3schools.com/w3images/avatar2.png",
    receiverId: "user-1",
    text: "¡Hola! ¿Cómo va el diseño de CareLibro?",
    time: "10:28",
    timestamp: Date.now() - 3600000,
    isRead: true
  },
  {
    id: "msg-2",
    senderId: "user-1",
    senderName: "Mi Perfil",
    senderAvatar: "https://www.w3schools.com/w3images/avatar3.png",
    receiverId: "user-2",
    text: "Muy bien, casi terminado. ¿Te gustó la última versión?",
    time: "10:30",
    timestamp: Date.now() - 3500000,
    isRead: true
  },
  {
    id: "msg-3",
    senderId: "user-2",
    senderName: "Juan Pérez",
    senderAvatar: "https://www.w3schools.com/w3images/avatar2.png",
    receiverId: "user-1",
    text: "Sí, está genial. Quedó súper fluido el feed y el visor de fotos.",
    time: "10:32",
    timestamp: Date.now() - 3400000,
    isRead: true
  }
];

export const userProfile = defaultUsers[0];

export const photoGallery = [
  "https://www.w3schools.com/w3images/lights.jpg",
  "https://www.w3schools.com/w3images/nature.jpg",
  "https://www.w3schools.com/w3images/mountains.jpg",
  "https://www.w3schools.com/w3images/forest.jpg",
  "https://www.w3schools.com/w3images/people.jpg"
];

export const sampleVideos = [
  {
    id: "v1",
    title: "Naturaleza y Paisajes",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://www.w3schools.com/w3images/nature.jpg"
  },
  {
    id: "v2",
    title: "Tecnología y Futuro",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://www.w3schools.com/w3images/lights.jpg"
  }
];

export const interestsList = [
  { id: 1, label: "CareLibro", badgeClass: "w3-theme-d5" },
  { id: 2, label: "Noticias", badgeClass: "w3-theme-d4" },
  { id: 3, label: "Tecnología", badgeClass: "w3-theme-d3" },
  { id: 4, label: "Juegos", badgeClass: "w3-theme-d2" },
  { id: 5, label: "Amigos", badgeClass: "w3-theme-d1" },
  { id: 6, label: "Comunidad", badgeClass: "w3-theme" },
  { id: 7, label: "Diseño UI", badgeClass: "w3-theme-l1" },
  { id: 8, label: "Fotografía", badgeClass: "w3-theme-l2" },
  { id: 9, label: "Música", badgeClass: "w3-theme-l3" },
  { id: 10, label: "Arte", badgeClass: "w3-theme-l4" },
  { id: 11, label: "React", badgeClass: "w3-theme-l5" }
];

export const initialPosts = [
  {
    id: "post-pocheche-welcome",
    author: "CareLibro Oficial",
    avatar: "https://www.w3schools.com/w3images/avatar3.png",
    time: "Hace 5 min",
    heading: "🎉 ¡Bienvenidos a CareLibro! 🚀📖",
    content: "¡Estamos emocionados de darles la bienvenida a CareLibro! Una plataforma diseñada para conectar personas, compartir tus mejores momentos, fotografías en alta resolución, vídeos y debatir en comunidad. ¡Explora, reacciona y comparte con todos!",
    images: [
      "https://www.w3schools.com/w3images/lights.jpg",
      "https://www.w3schools.com/w3images/nature.jpg"
    ],
    video: null,
    likes: 48,
    isLiked: true,
    sharesCount: 16,
    isShared: false,
    comments: [
      {
        id: "comm-pocheche-1",
        author: "Juan Pérez",
        avatar: "https://www.w3schools.com/w3images/avatar2.png",
        time: "Hace 3 min",
        content: "¡Excelente diseño y experiencia de usuario! Bienvenidos a todos a CareLibro 👏",
        likes: 9,
        isLiked: true,
        replies: [
          {
            id: "reply-pocheche-1-1",
            author: "Juana de Arco",
            avatar: "https://www.w3schools.com/w3images/avatar5.png",
            time: "Hace 1 min",
            content: "¡Me fascina la fluidez y cómo se aprecian las fotos en el visor! Gran trabajo del equipo.",
            likes: 5,
            isLiked: true
          }
        ]
      }
    ]
  },
  {
    id: "post-init-1",
    author: "Juan Pérez",
    avatar: "https://www.w3schools.com/w3images/avatar2.png",
    time: "Hace 25 min",
    content: "¡Hola a todos en CareLibro! Comparto algunas fotografías de mi última excursión a las auroras boreales. ¡La naturaleza nos regala vistas increíbles!",
    images: [
      "https://www.w3schools.com/w3images/lights.jpg",
      "https://www.w3schools.com/w3images/nature.jpg"
    ],
    video: null,
    likes: 14,
    isLiked: false,
    sharesCount: 3,
    isShared: false,
    comments: [
      {
        id: "comm-1-1",
        author: "Juana de Arco",
        avatar: "https://www.w3schools.com/w3images/avatar5.png",
        time: "Hace 10 min",
        content: "¡Qué fotos tan espectaculares! Me encantaría visitar ese lugar pronto.",
        likes: 3,
        isLiked: false,
        replies: [
          {
            id: "reply-1-1-1",
            author: "Juan Pérez",
            avatar: "https://www.w3schools.com/w3images/avatar2.png",
            time: "Hace 5 min",
            content: "¡Totalmente recomendado Juana! Te paso las coordenadas por mensaje.",
            likes: 1,
            isLiked: false
          }
        ]
      }
    ]
  },
  {
    id: "post-init-2",
    author: "Juana de Arco",
    avatar: "https://www.w3schools.com/w3images/avatar5.png",
    time: "Hace 45 min",
    content: "🎥 Les comparto este vídeo en alta definición sobre paisajes naturales. ¡Miren los detalles y el movimiento del fuego y la naturaleza!",
    images: [],
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "https://www.w3schools.com/w3images/nature.jpg"
    },
    likes: 27,
    isLiked: false,
    sharesCount: 8,
    isShared: false,
    comments: [
      {
        id: "comm-2-1",
        author: "Angie López",
        avatar: "https://www.w3schools.com/w3images/avatar6.png",
        time: "Hace 20 min",
        content: "La calidad del vídeo es impresionante 👏 ¡Gracias por compartir!",
        likes: 2,
        isLiked: false,
        replies: []
      }
    ]
  },
  {
    id: "post-init-3",
    author: "Angie López",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    time: "Hace 2 horas",
    heading: "¿Han visto esto?",
    content: "La tranquilidad del bosque siempre ayuda a renovar energías. Les deseo a todos en CareLibro una excelente semana llena de éxitos y nuevos aprendizajes.",
    images: [
      "https://www.w3schools.com/w3images/forest.jpg"
    ],
    video: null,
    likes: 8,
    isLiked: false,
    sharesCount: 1,
    isShared: false,
    comments: []
  }
];

export const upcomingEvent = {
  title: "Lanzamiento CareLibro",
  time: "Viernes 18:00",
  image: "https://www.w3schools.com/w3images/forest.jpg"
};

export const initialFriendRequests = [
  {
    id: 1,
    name: "Juana de Arco",
    avatar: "https://www.w3schools.com/w3images/avatar6.png"
  }
];

export const notificationsList = [
  "Una nueva solicitud de amistad",
  "Juan Pérez publicó en tu muro",
  "A Juana le gusta tu publicación"
];
