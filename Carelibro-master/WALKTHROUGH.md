# Walkthrough: PochecheBook con Rutas de Páginas (Nota 4.5), Rutas Restringidas (Nota 5.0) y Privacidad

Este documento detalla la solución completa para la integración de todas las páginas de la carpeta **`Paginas RedSocial_app`**, la configuración del sistema de navegación con **React Router** (*Nota 4.5*), la arquitectura de seguridad con **Rutas Restringidas / Protegidas** (*Nota 5.0*), la nueva pantalla de **Acceso Incorrecto** y el aislamiento de privacidad para no-amigos.

---

## 🎯 Cumplimiento de los Criterios de Evaluación

### 1. Agregar las Rutas a las Páginas de la RedSocial (Nota 4.5)
Se convirtieron todos los archivos estáticos de la carpeta `Paginas RedSocial_app` en vistas y componentes modulares de React gobernados por `react-router-dom`:

| Archivo Original en `Paginas RedSocial_app` | Componente React Creado | Ruta Asignada | Descripción y Funcionalidad |
| :--- | :--- | :--- | :--- |
| `plantilla-RedSocial.html` | `FeedPage.jsx` | `/` | Feed principal estilo Facebook con publicaciones multimedia, visor lightbox y 3 columnas. |
| `perfil.html` | `ProfilePage.jsx` | `/perfil` | Portada, biografía, detalles personales, fotos destacadas y publicaciones propias del usuario. |
| `chat.html` | `ChatPage.jsx` | `/mensajes` | Mensajería instantánea en tiempo real con lista de amigos confirmados, ventana activa y respuesta simulada. |
| `grupos.html` | `GroupsPage.jsx` | `/grupos` | Explorador de grupos: "Mis grupos", "Grupos sugeridos", buscador en vivo y modal para crear comunidades. |
| `configuracion.html` | `SettingsPage.jsx` | `/configuracion` | Panel de control con pestañas de General, Privacidad y Notificaciones con persistencia de cambios. |
| `login.html` | `LoginPage.jsx` | `/login` | Pantalla de inicio de sesión con correo/contraseña, acceso rápido en 1 clic y enlace a registro. |
| `registro.html` | `RegisterPage.jsx` | `/registro` | Formulario completo de registro con subida de avatar, género y fecha de nacimiento. |
| *(Control de acceso)* | `AccessDeniedPage.jsx` | Rutas protegidas | Pantalla de **Acceso Incorrecto: no puedes ver esta página** con botón directo al login. |
| *(Control de errores)* | `NotFoundPage.jsx` | `*` | Página 404 personalizada con botón de retorno al inicio. |

- **Navegación SPA**: En `Navbar.jsx` los enlaces estáticos fueron reemplazados por componentes `<NavLink>`, iluminando la pestaña activa y permitiendo navegar sin recargar la página.

---

### 2. Crear Rutas Restringidas / Protegidas (Nota 5.0) y Privacidad
Para asegurar que únicamente los usuarios que han iniciado sesión puedan ver el contenido privado de la red social:

1. **Guardián `<ProtectedRoute>` (`src/components/Auth/ProtectedRoute.jsx`)**:
   - Evalúa `isAuthenticated` consumido del contexto global `useSocial()`.
   - **Acceso denegado**: Si el visitante no está autenticado, muestra la pantalla dedicada **`AccessDeniedPage`** con mensaje informativo *"Acceso incorrecto: no puedes ver esta página"* e indicador de la ruta protegida solicitada, junto con un botón prominente para **Iniciar Sesión**.
   - **Acceso permitido**: Si el usuario está autenticado, renderiza la página solicitada de forma limpia y sin barras intrusivas.

2. **Guardián `<PublicOnlyRoute>` (`src/components/Auth/PublicOnlyRoute.jsx`)**:
   - Protege las rutas `/login` y `/registro`. Si un usuario que ya inició sesión intenta ingresar a ellas, lo redirige al feed principal (`/`).

3. **Privacidad Estricta de Amistades (Juana de Arco)**:
   - Si una persona no es amiga confirmada (se encuentra en estado de solicitud pendiente), el usuario **no puede ver sus publicaciones, ni sus comentarios, ni sus respuestas, ni sus chats**.
   - Al aceptar la solicitud de amistad en la tarjeta lateral (*Solicitud de Amistad*), las publicaciones y comentarios de Juana de Arco se cargan reactiva e inmediatamente.

4. **Experiencia de Usuario en Navbar y Notificaciones**:
   - El botón superior ahora dice permanentemente **"Perfil"** en color blanco puro `#ffffff` visible en todo momento.
   - Las notificaciones cuentan con alto contraste permanente `#050505` y fondo adecuado, impidiendo que el texto desaparezca al interactuar o seleccionar.

---

## 💻 Instrucciones para Probar el Proyecto

### 1. Iniciar el servidor
```bash
npm run dev
```

### 2. Verificar Rutas de las Páginas (Nota 4.5)
- Haz clic en los iconos de la barra superior:
  - **Inicio** (`/`): Muro general con publicaciones estilo Facebook.
  - **Perfil** (`/perfil`): Vista de perfil con portada y datos personales.
  - **Mensajes** (`/mensajes`): Conversaciones con amigos confirmados y envío con respuestas simuladas.
  - **Grupos** (`/grupos`): Prueba el buscador de grupos y el botón "+ Unirse".
  - **Configuración** (`/configuracion`): Cambia tu nombre, correo o contraseña y presiona "Guardar cambios".

### 3. Verificar Pantalla de Acceso Incorrecto (Nota 5.0)
1. Despliega el menú **"Perfil"** en la esquina superior derecha y presiona **"Cerrar sesión"**.
2. Intenta ingresar directamente en la barra de URL a `http://localhost:5173/perfil` o `http://localhost:5173/mensajes`.
3. Observarás la pantalla de **"Acceso incorrecto: no puedes ver esta página"** con el candado rojo y el botón **"Iniciar Sesión en PochecheBook"**.
4. Haz clic en el botón de iniciar sesión y accederás a `/login`.

### 4. Verificar la Privacidad de Juana de Arco
1. Estando conectado con la cuenta predeterminada, revisa el Feed: la publicación con vídeo de Juana de Arco está oculta y no aparece ningún comentario de ella.
2. En la columna derecha, ubica el widget **"Solicitud de Amistad"** donde Juana de Arco solicita ser tu amiga.
3. Haz clic en el botón azul **"Aceptar"**.
4. Inmediatamente el feed incluirá la publicación de Juana de Arco y sus comentarios se volverán visibles.

### 5. Verificar Verificación de Login y Cambio de Contraseña
1. Dirígete a `/configuracion` y selecciona la pestaña **Privacidad**.
2. En el campo "Cambiar contraseña", escribe `nueva123` y haz clic en **Actualizar privacidad**.
3. Cierra sesión desde el menú superior **Perfil** -> **Cerrar sesión**.
4. En `/login`, intenta ingresar con la clave anterior `123456`: el sistema denegará el acceso mostrando la alerta de error.
5. Ingresa la clave `nueva123`: el inicio de sesión se completará exitosamente.

### 6. Verificar Chat Bidireccional
1. Entra a `/mensajes` y selecciona a un amigo de la lista izquierda (ej. María Gómez).
2. Escribe un mensaje en el campo inferior y presiona **Enviar**.
3. En la barra superior de réplica, escribe un texto en *"Responder como María Gómez"* y presiona **Responder**: el mensaje aparecerá al instante como un mensaje recibido.

### 7. Opciones de Perfil Siempre Visibles y Margen Superior
1. Entra a `/perfil`: verás las pestañas fijas **Publicaciones**, **Información**, **Amigos** y **Fotos** con texto oscuro nítido y legible en todo momento.
2. Observa el inicio: el feed tiene un margen holgado de 62px respecto al navbar superior fijo, impidiendo que el contenido superior se corte.

### 8. Alerta en la Campana e Icono de Mensajes
1. En `/mensajes`, escribe una respuesta simulada con la barra de réplica (ej. *"Responder como Juan Pérez"*).
2. Se desplegará una alerta flotante (*Toast*) en pantalla notificando el mensaje entrante.
3. En la barra superior, el icono del sobre (`/mensajes`) y la campana de notificaciones mostrarán el contador de mensajes sin leer. Al hacer clic en la campana, se muestra la tarjeta de aviso que conduce al chat.

### 9. Cambio de Portada y Diseño Espacioso de Grupos
1. En `/perfil`, haz clic en **"Editar portada"**: ahora podrás subir una imagen propia desde tu ordenador o elegir entre las fotos de muestra. Al guardar, la portada se actualiza y persiste.
2. En `/grupos`, el diseño presenta amplios márgenes, una barra de encabezado espaciosa y el botón *"Crear nuevo grupo"* tanto en la cabecera como al pie de *"Mis grupos"*.

---

## 🚀 Comandos para Subir a Git

```bash
git add .
git commit -m "PochecheBook: Alertas de chat en campana, cambio de portada, diseno espacioso de grupos y privacidad en login"
git push origin main
```


