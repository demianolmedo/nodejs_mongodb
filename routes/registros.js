const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registros')

//api/formularios
router.get('/:instancia', registrosController.buscarRegistros);
router.put('/', registrosController.buscarBusqueda);
//router.get('/:id', interaccionesController.buscarInteracciones);

module.exports = router