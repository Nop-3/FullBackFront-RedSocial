const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.obtenerPerfil);
router.put('/:id', usuariosController.actualizarConfiguracion);

module.exports = router;