const searchableUserFields = ['name', 'username', 'email', 'role', 'location'];

export const normalizeSearchText = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();

export const matchesUserSearch = (user, query) => {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return false;

  const fields = searchableUserFields
    .map(field => normalizeSearchText(user[field] || ''))
    .filter(Boolean);

  return terms.every(term => fields.some(field => field.includes(term)));
};

export const searchUsers = async (query, signal) => {
  const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');
  const params = new URLSearchParams({ buscar: query });
  const response = await fetch(`${apiBaseUrl}/usuarios?${params}`, { signal });
  const body = await response.text();
  let payload;

  try {
    payload = body ? JSON.parse(body) : null;
  } catch {
    throw new Error(`El servidor respondió con un formato no válido (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(payload?.msg || payload?.error || `Error del servidor (HTTP ${response.status}).`);
  }
  if (!Array.isArray(payload)) {
    throw new Error('La búsqueda recibió una respuesta no válida del servidor.');
  }

  return payload;
};
