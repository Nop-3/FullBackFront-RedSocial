const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Registro de peticiones
require('dotenv').config();

// Importar rutas
const usuariosRoutes = require('./src/routes/usuarios');
const publicacionesRoutes = require('./src/routes/publicaciones');
const gruposRoutes = require('./src/routes/grupos');
const mensajesRoutes = require('./src/routes/mensajes');
const authRoutes = require('./src/routes/auth');

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // Permite que el Frontend se conecte
app.use(morgan('dev')); // Imprime en consola: GET /api/publicaciones 200 5ms
app.use(express.json({ limit: '5mb' })); // Permite recibir perfiles con imágenes comprimidas

// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/mensajes', mensajesRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'carelibro-api' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal en el servidor de CareLibro.' });
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ msg: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor CareLibro listo en http://localhost:${PORT}`);
  console.log(`📝 Modo de desarrollo activo con Morgan y Nodemon`);
});