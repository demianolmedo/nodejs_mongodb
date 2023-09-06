const express = require('express');
const router = express.Router();
const interaccionesController = require('../controllers/interaccionesController')

//api/formularios
router.post('/', interaccionesController.crearInteracciones);
router.get('/', interaccionesController.obtenerInteracciones);
router.get('/:id', interaccionesController.buscarInteracciones);
router.post('/:id', interaccionesController.actualizaLlamada);
router.post('/inter/:id', interaccionesController.actualizaInteracciones)

module.exports = router