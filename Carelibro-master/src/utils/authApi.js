const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

const request = async (path, data) => {
  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    throw new Error('No se pudo conectar con el backend. Verifica que esté iniciado en http://localhost:3000.');
  }

  const body = await response.text();
  let payload;
  try {
    payload = body ? JSON.parse(body) : null;
  } catch {
    throw new Error(`El backend respondió con un formato no válido (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(payload?.msg || payload?.error || `Error del servidor (HTTP ${response.status}).`);
  }

  return payload;
};

const toCarelibroUser = (user) => {
  if (!user || user.id === undefined || !user.email) {
    throw new Error('El backend no devolvió los datos del usuario.');
  }

  return {
    id: user.id,
    name: user.nombre,
    username: user.email.split('@')[0],
    email: user.email,
    avatar: user.avatar || 'https://www.w3schools.com/w3images/avatar2.png',
    currentUserAvatar: user.avatar || 'https://www.w3schools.com/w3images/avatar2.png',
    role: user.biografia || 'Miembro de CareLibro',
    location: user.ciudad || 'Colombia / Internacional',
    birthDate: user.fecha_nacimiento || '',
    gender: user.genero || '',
    friends: [],
    requestsSent: [],
    requestsReceived: []
  };
};

export const registerWithApi = async (userData) => {
  const response = await request('/auth/register', {
    nombre: userData.name,
    email: userData.email,
    contrasena: userData.password,
    fecha_nacimiento: userData.birthDate || null,
    genero: userData.gender || null,
    biografia: userData.role || '',
    ciudad: userData.location || '',
    avatar: userData.avatar || ''
  });

  return toCarelibroUser(response?.usuario);
};

export const loginWithApi = async (email, password) => {
  const response = await request('/auth/login', {
    email,
    contrasena: password
  });

  return toCarelibroUser(response?.usuario);
};
