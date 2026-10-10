# 🚀 Backend de CareLibro

Bienvenido al taller de desarrollo de APIs con Node.js y MySQL. Este proyecto ya cuenta con un sistema de inicialización automática para que te enfoques en programar los controladores y rutas.

## 📋 Requisitos Previos
1. Tener instalado **Node.js** (versión 24 o superior).
2. Tener activo **XAMPP** o un servidor MySQL local.
3. Modificar el archivo llamado `.env` en la raíz con tus credenciales de ser necesario de MySQL (User, Password, Host).:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   PORT=3000
   ```

## 🛠️ Configuración Rápida
1. **abrir la consola CMD**
2. **Dependencias**: Ejecuta `npm install`.
3. **Preparar la base de datos por primera vez**: Ejecuta `npm run init-db`. Este comando elimina y vuelve a crear `red_social_db`; guarda antes cualquier dato que quieras conservar.
4. **Actualizar una base ya existente**: Ejecuta `npm run migrate-db`. Agrega los campos requeridos para el registro sin eliminar usuarios ni datos.
5. **Ejecutar la API**: Ejecuta `npm run dev`.

El servidor queda disponible por defecto en `http://localhost:3000`. CareLibro usa esta dirección para consultar el directorio de usuarios. Si el backend corre en otra dirección, configura `VITE_API_URL` en el frontend (por ejemplo, `http://localhost:3000/api`).

## Endpoints principales

- `GET /api/health`: comprueba que el servidor está respondiendo.
- `GET /api/usuarios`: lista hasta 50 usuarios sin exponer contraseñas.
- `GET /api/usuarios?buscar=ana`: busca por nombre, ciudad o biografía; admite varias palabras en cualquier orden.
- `GET /api/usuarios/:id` y `PUT /api/usuarios/:id`: perfil y actualización.
- `POST /api/auth/register` y `POST /api/auth/login`: registro e inicio de sesión.
- `/api/publicaciones`, `/api/grupos` y `/api/mensajes`: publicaciones, grupos y chat.

El buscador de CareLibro consulta el backend mientras se escribe y conserva las sugerencias locales cuando el backend no está disponible; el error de conexión se muestra en el buscador.